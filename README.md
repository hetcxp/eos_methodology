# Sistema Operativo Empresarial (EOS®) • Metodología Tracción
## Gino Wickman: Domina Tu Negocio con el Sistema Operativo Empresarial

Paquete interactivo SCORM 1.2 (motor runtime con compatibilidad SCORM 1.2 y SCORM 2004) y Single Page Application (SPA) para la formación directiva y de alta gerencia en la implementación del Sistema Operativo Empresarial (EOS®), eliminación de las 5 frustraciones del líder, formulación del V/TO, estructura unívoca en el Organigrama de Rendición de Cuentas, gobernanza por Scorecard semanal, resolución de causa raíz con IDS y tracción de 90 días mediante Rocas y Reunión Nivel 10.

### Fuente Seminal Primaria:
* **Gino Wickman (2011/2018):** *Tracción: Domina Tu Negocio con el Sistema Operativo Empresarial (Traction: Get a Grip on Your Business)*. BenBella Books, Inc.

---

### Arquitectura Pedagógica Dual-Track (Spine & Fishbone)
* **Columna Vertebral (Spine):** 6 módulos de acción 100% autónoma estructurados bajo Action Mapping (Kathy Moore) y Reto Invertido (Challenge-First con fallo productivo).
  * **Módulo 0:** Contrato Andragógico & Orientación Sistémica EOS (Las 5 Frustraciones del Negocio).
  * **Módulo 1:** Romper el Techo y Soltar la Liana (Caso Apex Logistics y las 5 Habilidades de Liderazgo).
  * **Módulo 2:** Visión y Enfoque Medular: El V/TO en 2 Páginas (Constructor de Enfoque y Diferenciación).
  * **Módulo 3:** Personas y Organigrama de Rendición de Cuentas (Analizador de Personas & Calibrador GWC).
  * **Módulo 4:** Datos & Asuntos: Scorecard Semanal Predictivo y Protocolo IDS (Chat Simulator de Alta Tensión).
  * **Módulo 5:** Capstone Studio: Ficha Maestra de Implementación EOS (Rúbrica Binaria 100% Pass).
* **Espinas Teóricas (Fishbone Drawers):** Paneles laterales off-canvas accesibles vía botón o atajo `Alt + T` con papers y autores seminales:
  * **0.E:** Arquitectura Sistémica de Gestión & Andragogía (Wickman / Michael Gerber / Malcolm Knowles).
  * **1.E:** Ley de Greiner y Complejidad Organizacional (Larry E. Greiner, 1972 / Ichak Adizes, 1988).
  * **2.E:** Parsimonia Estratégica y Concepto del Erizo (Jim Collins, 2001 / Michael Porter, 1996 / Al Ries, 1996).
  * **3.E:** Organización Requerida y Disfunciones de Equipo (Elliott Jaques, 1989 / Patrick Lencioni, 2002).
  * **4.E:** Cibernética Organizacional y Diagnóstico Causal (W. Edwards Deming, 1986 / Herbert Simon, 1960 / Eliyahu Goldratt, 1984).
  * **5.E:** Cadencia de Ejecución y Hábitos Operativos (Chris McChesney & Sean Covey, 2012 / Henry Mintzberg, 1983 / Peter Drucker, 1967).

---

### Documentación y Diseño Instruccional
* **Blueprint Pedagógico Completo:** [`docs/EOS_TRACTION_INSTRUCTIONAL_BLUEPRINT.md`](docs/EOS_TRACTION_INSTRUCTIONAL_BLUEPRINT.md)

---

### Verificación y Tests Locales
Ejecutar la suite de tests unitarios:
```bash
npm test
# o directamente con Node.js:
node --test tests/*.test.js
```

### Empaquetado SCORM
Generar el archivo ZIP validado:
```bash
npm run build:scorm
# o vía python:
python3 scripts/build_scorm.py
```

