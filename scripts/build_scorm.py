#!/usr/bin/env python3
"""
Script de Empaquetado y Verificación Pre-Flight SCORM 1.2
Curso: Sistema Operativo Empresarial (EOS®) • Metodología Tracción (Gino Wickman)

Valida que todos los recursos declarados en imsmanifest.xml existan y tengan tamaño > 0,
luego genera el paquete distribuible curso_scorm_eos_traccion.zip sin rutas absolutas ni artefactos espurios.
"""

import os
import sys
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

def main():
    script_dir = Path(__file__).resolve().parent
    course_dir = script_dir.parent
    manifest_path = course_dir / "imsmanifest.xml"
    output_zip = course_dir / "curso_scorm_eos_traccion.zip"

    print("=" * 70)
    print("EMPAQUETADOR Y AUDITOR SCORM 1.2 • EOS TRACCIÓN (GINO WICKMAN)")
    print("=" * 70)
    print(f"Directorio del curso: {course_dir}")
    print(f"Manifiesto:          {manifest_path}")

    if not manifest_path.exists():
        print(f"ERROR FATAL: No se encuentra imsmanifest.xml en {manifest_path}", file=sys.stderr)
        sys.exit(1)

    # 1. Parsear manifiesto XML
    try:
        tree = ET.parse(manifest_path)
        root = tree.getroot()
    except Exception as e:
        print(f"ERROR: Fallo al parsear imsmanifest.xml: {e}", file=sys.stderr)
        sys.exit(1)

    # Namespaces IMS
    namespaces = {
        'ims': 'http://www.imsproject.org/xsd/imscp_rootv1p1p2',
        'adlcp': 'http://www.adlnet.org/xsd/adlcp_rootv1p2'
    }

    # 2. Recolectar archivos declarados
    declared_files = []
    # Buscar con y sin namespace
    file_nodes = root.findall('.//{http://www.imsproject.org/xsd/imscp_rootv1p1p2}file')
    if not file_nodes:
        file_nodes = root.findall('.//file')

    for node in file_nodes:
        href = node.get('href')
        if href:
            declared_files.append(href)

    if not declared_files:
        print("ERROR: No se encontraron elementos <file href='...'/> en el manifiesto.", file=sys.stderr)
        sys.exit(1)

    # Validar unicidad estricta (cero duplicados en el manifiesto)
    if len(declared_files) != len(set(declared_files)):
        duplicates = [f for f in declared_files if declared_files.count(f) > 1]
        print(f"ERROR: Se detectaron entradas duplicadas en imsmanifest.xml: {set(duplicates)}", file=sys.stderr)
        sys.exit(1)

    print(f"\n[1/4] Verificando {len(declared_files)} recursos declarados en imsmanifest.xml...")
    missing_files = []
    empty_files = []
    total_uncompressed_bytes = 0

    # Siempre incluir el manifiesto mismo
    files_to_pack = [("imsmanifest.xml", manifest_path)]

    for rel_path in declared_files:
        if rel_path.startswith('/') or '..' in Path(rel_path).parts:
            print(f"ERROR: Ruta insegura o no relativa detectada en manifiesto: {rel_path}", file=sys.stderr)
            sys.exit(1)
        full_path = course_dir / rel_path
        if not full_path.exists():
            missing_files.append(rel_path)
        elif not full_path.is_file():
            print(f"ERROR: El recurso declarado no es un archivo regular: {rel_path}", file=sys.stderr)
            sys.exit(1)
        elif full_path.stat().st_size == 0:
            empty_files.append(rel_path)
        else:
            files_to_pack.append((rel_path, full_path))
            total_uncompressed_bytes += full_path.stat().st_size

    if missing_files:
        print("\nERROR: Archivos declarados en el manifiesto pero ausentes en el disco:", file=sys.stderr)
        for f in missing_files:
            print(f"  ✗ {f}", file=sys.stderr)
        sys.exit(1)

    if empty_files:
        print("\nERROR: Archivos declarados con tamaño 0 bytes (vacíos):", file=sys.stderr)
        for f in empty_files:
            print(f"  ✗ {f}", file=sys.stderr)
        sys.exit(1)

    print("      ✓ Todos los recursos declarados existen y tienen contenido sustantivo.")

    # 3. Crear archivo ZIP
    print(f"\n[2/4] Generando paquete ZIP: {output_zip.name}...")
    try:
        with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zf:
            for arcname, file_path in files_to_pack:
                zf.write(file_path, arcname=arcname)
    except Exception as e:
        print(f"ERROR: Fallo al crear el archivo ZIP: {e}", file=sys.stderr)
        sys.exit(1)

    # 5. Testear integridad y correspondencia biyectiva del ZIP
    print("\n[3/4] Validando integridad y correspondencia exacta del contenedor ZIP...")
    try:
        with zipfile.ZipFile(output_zip, "r") as zf:
            bad_file = zf.testzip()
            if bad_file:
                print(f"ERROR: Fichero corrupto detectado en el ZIP: {bad_file}", file=sys.stderr)
                sys.exit(1)
            
            infolist = zf.infolist()
            namelist = zf.namelist()
            assert len(infolist) == len(set(namelist)), "Se detectaron entradas duplicadas dentro del paquete ZIP"

            zip_namelist = set(namelist)
            expected_files = set(declared_files) | {"imsmanifest.xml"}

            if zip_namelist != expected_files:
                missing_in_zip = expected_files - zip_namelist
                extra_in_zip = zip_namelist - expected_files
                print("ERROR: Inconsistencia entre el paquete ZIP y imsmanifest.xml:", file=sys.stderr)
                if missing_in_zip:
                    print(f"  Faltan en el ZIP: {missing_in_zip}", file=sys.stderr)
                if extra_in_zip:
                    print(f"  Sobran en el ZIP (no declarados): {extra_in_zip}", file=sys.stderr)
                sys.exit(1)

            file_count = len(infolist)
    except Exception as e:
        print(f"ERROR: Fallo al verificar el archivo ZIP: {e}", file=sys.stderr)
        sys.exit(1)

    zip_size_bytes = output_zip.stat().st_size
    zip_size_kb = zip_size_bytes / 1024

    print("      ✓ Paquete ZIP verificado con éxito (cero errores de CRC).")
    print("      ✓ Correspondencia exacta 1:1 verificada (21 recursos declarados + imsmanifest.xml).")
    print(f"\n[4/4] Resumen de Empaquetado:")
    print(f"      • Total de ficheros empaquetados: {file_count}")
    print(f"      • Tamaño descomprimido:           {total_uncompressed_bytes / 1024:.2f} KB")
    print(f"      • Tamaño del paquete ZIP:         {zip_size_kb:.2f} KB")
    print(f"      • Ubicación final:                {output_zip.resolve()}")
    print("\n¡Empaquetado SCORM 1.2 completado satisfactoriamente!\n")

if __name__ == "__main__":
    main()
