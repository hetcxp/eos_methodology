import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const courseRoot = path.resolve(__dirname, '..');

/**
 * Extrae nombres de entradas de un archivo ZIP de forma nativa sin dependencias externas
 * @param {Buffer} buf
 * @returns {string[]}
 */
function getZipEntryNames(buf) {
  const names = [];
  for (let i = 0; i < buf.length - 46; i++) {
    if (buf[i] === 0x50 && buf[i+1] === 0x4B && buf[i+2] === 0x01 && buf[i+3] === 0x02) {
      const nameLen = buf.readUInt16LE(i + 28);
      const extraLen = buf.readUInt16LE(i + 30);
      const commentLen = buf.readUInt16LE(i + 32);
      const name = buf.toString('utf8', i + 46, i + 46 + nameLen);
      names.push(name);
      i += 45 + nameLen + extraLen + commentLen;
    }
  }
  return names;
}

test('SCORM Package - Correspondencia biyectiva 1:1 entre imsmanifest.xml y curso_scorm_eos_traccion.zip', () => {
  const manifestPath = path.join(courseRoot, 'imsmanifest.xml');
  const zipPath = path.join(courseRoot, 'curso_scorm_eos_traccion.zip');

  assert.ok(fs.existsSync(manifestPath), 'imsmanifest.xml debe existir');
  assert.ok(fs.existsSync(zipPath), 'curso_scorm_eos_traccion.zip debe existir');

  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  assert.match(manifestContent, /<manifest/);
  assert.match(manifestContent, /<schemaversion>1\.2<\/schemaversion>/);

  // Extraer todos los hrefs de file
  const fileRegex = /<file\s+href="([^"]+)"/g;
  const declaredFiles = [];
  let match;
  while ((match = fileRegex.exec(manifestContent)) !== null) {
    declaredFiles.push(match[1]);
  }

  assert.strictEqual(declaredFiles.length, 21, 'Deben declararse exactamente 21 recursos web');
  assert.strictEqual(new Set(declaredFiles).size, 21, 'Cero rutas duplicadas en imsmanifest.xml');

  // Verificar todos los archivos en disco
  for (const relPath of declaredFiles) {
    const fullPath = path.join(courseRoot, relPath);
    assert.ok(fs.existsSync(fullPath), `El recurso declarado ${relPath} debe existir en el disco`);
    assert.ok(fs.statSync(fullPath).size > 0, `El recurso ${relPath} no puede estar vacío`);
  }

  // Verificar correspondencia biyectiva exacta con el paquete ZIP
  const zipBuffer = fs.readFileSync(zipPath);
  const zipEntries = getZipEntryNames(zipBuffer);

  assert.strictEqual(zipEntries.length, 22, 'El ZIP debe contener exactamente 22 archivos (21 recursos + imsmanifest.xml)');

  const expectedSet = new Set([...declaredFiles, 'imsmanifest.xml']);
  const actualSet = new Set(zipEntries);

  assert.deepEqual(actualSet, expectedSet, 'El conjunto de ficheros en el ZIP debe coincidir exactamente 1:1 con los declarados más el manifiesto');
  assert.strictEqual(actualSet.has('manifest-template.xml'), false, 'El ZIP no debe contener artefactos no declarados');
});
