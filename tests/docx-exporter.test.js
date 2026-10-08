import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DocxExporter } from '../js/services/docx-exporter.js';
import { MODULES_DATA } from '../js/data/modules-content.js';

test('DocxExporter - Genera bytes válidos de archivo Office Open XML (.docx)', () => {
  const mod5 = MODULES_DATA[5];
  const submission = mod5.submissionBlueprint;

  const fichaData = {
    competencyName: 'Sistema Operativo Empresarial (EOS®)',
    company: 'Apex Logistics Solutions',
    type: 'Ficha Maestra de Implementación EOS',
    date: '2026-10-07',
    definition: submission.definition,
    levels: submission.levels,
    executionSections: submission.executionSections
  };

  const bytes = DocxExporter.generateDocxBytes(fichaData);

  assert.ok(bytes instanceof Uint8Array);
  assert.ok(bytes.length > 500, 'El archivo DOCX debe contener estructuras mínimas');

  // Firma mágica de archivo ZIP / OOXML: 'PK\x03\x04' (0x50, 0x4B, 0x03, 0x04)
  assert.strictEqual(bytes[0], 0x50);
  assert.strictEqual(bytes[1], 0x4B);
  assert.strictEqual(bytes[2], 0x03);
  assert.strictEqual(bytes[3], 0x04);

  // Verificación de entradas OpenXML obligatorias dentro de la estructura ZIP
  const binStr = Buffer.from(bytes).toString('latin1');
  assert.ok(binStr.includes('[Content_Types].xml'), 'Debe contener [Content_Types].xml');
  assert.ok(binStr.includes('_rels/.rels'), 'Debe contener _rels/.rels');
  assert.ok(binStr.includes('word/document.xml'), 'Debe contener word/document.xml');
  assert.ok(binStr.includes('Apex Logistics Solutions'), 'Debe contener el contenido empresarial');
});

test('DocxExporter - Genera documento Markdown estructurado con secciones EOS', () => {
  const mod5 = MODULES_DATA[5];
  const submission = mod5.submissionBlueprint;

  const fichaData = {
    competencyName: 'Sistema Operativo Empresarial (EOS®)',
    company: 'Apex Logistics Solutions',
    type: 'Ficha Maestra de Implementación',
    definition: submission.definition,
    levels: submission.levels,
    executionSections: submission.executionSections
  };

  const md = DocxExporter.generateMarkdown(fichaData);

  assert.strictEqual(typeof md, 'string');
  assert.match(md, /FICHA MAESTRA DE IMPLEMENTACIÓN/);
  assert.match(md, /Gino Wickman/);
  assert.match(md, /Enfoque Medular y Estrategia de Mercadeo/);
  assert.match(md, /Organigrama de Rendición de Cuentas & Calibración GWC/);
  assert.match(md, /Scorecard Semanal, Rocas de 90 Días & Agenda L10/);
  assert.match(md, /Integrador/);
  assert.match(md, /Ventas y Mercadeo/);
  assert.match(md, /Operaciones/);
  assert.match(md, /Finanzas y Admin/);
});

test('DocxExporter - Soporta datos vacíos de forma resiliente', () => {
  const bytes = DocxExporter.generateDocxBytes({});
  assert.ok(bytes instanceof Uint8Array);
  assert.strictEqual(bytes[0], 0x50);
  assert.strictEqual(bytes[1], 0x4B);

  const md = DocxExporter.generateMarkdown({});
  assert.strictEqual(typeof md, 'string');
  assert.match(md, /Sin definición especificada/);
});
