/**
 * Módulos del Curso - Sistema Operativo Empresarial (EOS) • Metodología Tracción
 * Basado en "Tracción: Domina Tu Negocio con el Sistema Operativo Empresarial" por Gino Wickman.
 *
 * Layer: DATA (Inmutable / Frozen Objects)
 */

export const MODULES_DATA = Object.freeze([
  // =========================================================================
  // MÓDULO 0: CONTRATO ANDRAGÓGICO & SISTEMA OPERATIVO EOS
  // =========================================================================
  Object.freeze({
    id: 'mod-0',
    number: 0,
    title: 'Sistema Operativo Empresarial (EOS®) y Contrato Andragógico',
    subtitle: 'Las 5 frustraciones del líder, el modelo de 6 componentes y la dinámica Dual-Track',
    leadIntro: 'Todo negocio estancado sufre una de cinco frustraciones crónicas. EOS proporciona un marco holístico y autosostenible para transformar el caos de 100 preocupaciones en el dominio de Seis Componentes Clave.',
    badge: 'Módulo 0 • Orientación Sistémica EOS',
    duration: '5 min',
    theoryId: 'mod-0-theory',
    objective: 'Identificar las 5 frustraciones del negocio, dominar el mapa de los 6 componentes clave de EOS y autogestionar la ruta formativa Dual-Track (práctica 100% autónoma o fundamentos teóricos on-demand).',
    overview: `
      Bienvenido al programa interactivo de alta dirección en el Sistema Operativo Empresarial (EOS®).
      Este módulo introductorio establece las reglas del contrato andragógico, presenta las 5 capacidades operativas
      que certificarás a lo largo del curso y te orienta para navegar la arquitectura Dual-Track.
    `,
    introData: Object.freeze({
      questions: Object.freeze([
        Object.freeze({
          id: 'q1-purpose',
          number: 1,
          question: '¿Por qué estás aquí?',
          title: 'El Dolor Real del Negocio',
          icon: '🎯',
          summary: 'Erradicar las 5 frustraciones universales del líder empresarial.',
          details: `
            <p>
              En miles de empresas en crecimiento ($2M a $50M), los líderes experimentan las mismas cinco frustraciones crónicas:
            </p>
            <ul style="padding-left: 1.25rem; line-height: 1.6; margin: 0.5rem 0;">
              <li><strong>1. Falta de Control:</strong> El negocio es dueño de tu vida en lugar de tú ser dueño del negocio.</li>
              <li><strong>2. Personas:</strong> Desalineación, falta de compromiso, personas que no escuchan o no rinden cuentas.</li>
              <li><strong>3. Ganancias:</strong> Crecimiento en facturación pero márgenes estancados o decrecientes.</li>
              <li><strong>4. El Techo:</strong> La empresa deja de crecer y choca contra una barrera invisible de complejidad.</li>
              <li><strong>5. Nada Funciona:</strong> Iniciativas de moda y remedios rápidos que generan cinismo en el personal.</li>
            </ul>
            <div class="rise-callout-metric" style="background: var(--mint-light); border-left: 4px solid var(--mint-dark); padding: 0.85rem 1.15rem; margin: 0.75rem 0; border-radius: 6px;">
              <strong>Misión Formativa:</strong> Habilitarte como <strong>Implementador Interno de EOS</strong>,
              capaz de construir el V/TO, estructurar el Organigrama de Rendición de Cuentas, gobernar con el Scorecard semanal,
              resolver problemas de raíz con la Vía IDS y fijar la tracción con Rocas de 90 días y Reuniones Nivel 10.
            </div>
          `
        }),
        Object.freeze({
          id: 'q2-objectives',
          number: 2,
          question: '¿Qué lograrás al terminar?',
          title: 'Compendio de Competencias y Capacidades EOS',
          icon: '🏆',
          summary: 'Cinco capacidades operativas listas para transferir al puesto de trabajo.',
          details: `
            <p>Al finalizar los módulos prácticos, habrás certificado las siguientes capacidades técnicas:</p>
            <div class="rise-roadmap-grid" style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 0.75rem 1rem;">
                <strong style="color: var(--mint-dark);">Módulo 1 • Diagnóstico de Complejidad:</strong>
                <p style="margin: 0.25rem 0 0; font-size: 0.88rem; color: var(--slate-700);">Identificar la causa raíz del estancamiento operativo y aplicar las 5 habilidades de liderazgo (Simplificar, Delegar, Predecir, Sistematizar y Estructurar) para romper el techo.</p>
              </div>
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 0.75rem 1rem;">
                <strong style="color: var(--mint-dark);">Módulo 2 • Ingeniería Estratégica V/TO:</strong>
                <p style="margin: 0.25rem 0 0; font-size: 0.88rem; color: var(--slate-700);">Construir el Organizador Visión/Tracción en 2 páginas respondiendo a las 8 preguntas maestras, delimitando el Enfoque Medular y las 3 Cualidades Únicas.</p>
              </div>
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 0.75rem 1rem;">
                <strong style="color: var(--mint-dark);">Módulo 3 • Calibración de Personas &amp; GWC:</strong>
                <p style="margin: 0.25rem 0 0; font-size: 0.88rem; color: var(--slate-700);">Diseñar el Organigrama de Rendición de Cuentas y auditar a los colaboradores mediante el Analizador de Personas bajo el estándar GWC (Comprenderlo, Desearlo, Capacidad).</p>
              </div>
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 0.75rem 1rem;">
                <strong style="color: var(--mint-dark);">Módulo 4 • Datos Predictivos &amp; Protocolo IDS:</strong>
                <p style="margin: 0.25rem 0 0; font-size: 0.88rem; color: var(--slate-700);">Construir un Scorecard de 5-15 métricas predictivas y resolver incidentes críticos directivos aplicando la Vía IDS (Identificar, Discutir, Solucionar).</p>
              </div>
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 0.75rem 1rem;">
                <strong style="color: var(--mint-dark);">Módulo 5 • Capstone Studio &amp; Certificación EOS:</strong>
                <p style="margin: 0.25rem 0 0; font-size: 0.88rem; color: var(--slate-700);">Estandarizar procesos 20/80, fijar la disciplina de Rocas y la agenda de 90 minutos de la Reunión Nivel 10, certificando la Ficha Maestra con rúbrica binaria (100% Pass).</p>
              </div>
            </div>
          `
        }),
        Object.freeze({
          id: 'q3-methodology',
          number: 3,
          question: '¿Por qué Reto Invertido y Fallo Productivo?',
          title: 'El Método Pedagógico de Alto Impacto',
          icon: '⚡',
          summary: 'Aprender mediante la confrontación con crisis reales antes de la teoría.',
          details: `
            <p>
              Los líderes adultos aprenden con mayor profundidad cuando su intuición habitual se pone a prueba y experimentan
              las consecuencias directas de decisiones erróneas en un entorno controlado.
            </p>
            <p>
              Cada módulo se abre con una <strong>crisis operativa de alta tensión</strong> en una empresa simulada
              (<em>Apex Logistics Solutions</em>). Deberás tomar decisiones inmediatas; si caes en antipatrones habituales
              (e.g., micromanagement o planes estratégicos de 50 páginas), el simulador te mostrará las consecuencias a 6 meses.
              Tras el quiebre cognitivo, se desbloquea la píldora metodológica pura de EOS para aplicar la solución correcta.
            </p>
          `
        }),
        Object.freeze({
          id: 'q4-dualtrack',
          number: 4,
          question: '¿Cómo funciona la Dinámica Dual-Track?',
          title: 'Autonomía Total: Práctica vs. Teoría',
          icon: '🧭',
          summary: 'Avanza por la Columna Vertebral o consulta los fundamentos off-canvas.',
          details: `
            <p>
              La arquitectura del programa desacopla de forma tajante la acción práctica del respaldo académico:
            </p>
            <ul style="padding-left: 1.25rem; line-height: 1.6; margin: 0.5rem 0;">
              <li><strong>Columna Vertebral (Spine):</strong> Es la ruta crítica de acción. Resolver retos, clasificar casos y construir artefactos te permite completar el 100% del curso y certificar sin tocar la teoría.</li>
              <li><strong>Espinas Teóricas (Fishbone Drawers):</strong> Paneles laterales (accesibles mediante el botón 📖 o el atajo <code>Alt + T</code>) que contienen los papers seminales y modelos de autores consagrados (Larry Greiner, Michael Porter, Jim Collins, Elliott Jaques, Edwards Deming, Peter Drucker). Consultar la teoría desbloquea insignias de rigor analítico pero nunca frena tu avance.</li>
            </ul>
          `
        })
      ]),
      pathways: Object.freeze({
        title: 'Elige Tu Ruta de Entrada al Curso',
        practiceChoice: Object.freeze({
          title: 'Ruta 1: Ir Directo al Reto de Gestión',
          description: 'Sumérgete de inmediato en la crisis de Apex Logistics Solutions y experimenta el diagnóstico de complejidad en el Módulo 1.',
          targetModuleIndex: 1
        }),
        theoryChoice: Object.freeze({
          title: 'Ruta 2: Estudiar el Fundamento Sistémico',
          description: 'Consulta primero la Espina Teórica 0.E sobre el holismo operativo de Wickman y los principios andragógicos de Knowles.',
          theoryId: 'mod-0-theory'
        })
      })
    })
  }),

  // =========================================================================
  // MÓDULO 1: SOLTANDO LA LIANA & ATRAVESAR EL TECHO
  // =========================================================================
  Object.freeze({
    id: 'mod-1',
    number: 1,
    title: 'Romper el Techo y Soltar la Liana',
    subtitle: 'Diagnóstico del cuello de botella estructural y las 5 habilidades de liderazgo',
    leadIntro: 'Crecer no es lineal. Toda empresa choca inevitablemente contra el techo de complejidad en tres niveles: organizacional, departamental e individual. La supervivencia depende de la capacidad del fundador para soltar la liana.',
    badge: 'Módulo 1 • Diagnóstico de Complejidad',
    duration: '10 min',
    theoryId: 'mod-1-theory',
    objective: 'Diagnosticar la causa raíz del estancamiento operativo en una empresa en crecimiento y aplicar las 5 habilidades de liderazgo (Simplificar, Delegar y Elevar, Predecir, Sistematizar y Estructurar) para superar el techo de complejidad.',
    challenge: Object.freeze({
      id: 'challenge-1',
      moduleId: 'mod-1',
      badge: 'Reto Invertido • Caso Apex Logistics',
      title: 'El Colapso del Fundador Orquesta',
      visualAsset: Object.freeze({
        src: 'assets/img/diagrams/soltando-liana-techo.svg',
        alt: 'Atravesar el Techo de Complejidad y las 5 Habilidades de Liderazgo',
        caption: 'Figura 1.1: El salto de fe: de la dictadura operativa a las 5 habilidades de liderazgo para romper el techo.'
      }),
      context: `
        <div class="rise-scenario-briefing">
          <p>
            <strong>Apex Logistics Solutions</strong> ha escalado con éxito de $2.5M a $8.2M en ingresos y 48 empleados en tres años.
            Sin embargo, la empresa se encuentra al borde del abismo:
          </p>
          <div class="rise-metrics-panel" style="background: var(--slate-100); padding: 1rem; border-radius: 6px; margin: 0.75rem 0; font-size: 0.9rem;">
            <ul style="margin: 0; padding-left: 1.25rem; line-height: 1.5;">
              <li><strong>Jornada del Fundador (Marcos):</strong> 85 horas semanales; aprueba cada compra mayor a $200 y atiende 6 reuniones diarias.</li>
              <li><strong>Métricas Operativas:</strong> Las entregas a destiempo aumentaron un 34% en el último semestre.</li>
              <li><strong>Rentabilidad:</strong> El margen neto cayó drásticamente del 18.5% al 5.2%.</li>
              <li><strong>Clima &amp; Rotación:</strong> La rotación en mandos medios alcanzó el 28%; los coordinadores reportan sentirse "maniatados".</li>
            </ul>
          </div>
          <p>
            Marcos convocó a una reunión de emergencia y anunció: <em>"La gente no tiene compromiso. A partir de hoy yo revisaré personalmente cada despacho antes de salir y todo el equipo trabajará los sábados."</em>
          </p>
        </div>
      `,
      question: '¿Cuál es la causa raíz técnica de la crisis de Apex y qué decisión debe tomar Marcos?',
      choices: Object.freeze([
        Object.freeze({
          id: 'c1-opt-a',
          key: 'A',
          text: 'Centralizar la toma de decisiones e instalar telemetría de monitoreo por hora; Marcos asume la supervisión directa de cada despacho para erradicar las fallas operativas y restablecer la disciplina interna.',
          isCorrect: false,
          consequence: 'A los 6 meses: Marcos sufre un colapso por estrés, renuncian tres gerentes clave y las ventas caen un 22% por lentitud burocrática.',
          feedback: 'Antipatrón de microgestión intensiva. Intentar controlar más detalles aumenta la complejidad y ahoga el crecimiento de la organización.'
        }),
        Object.freeze({
          id: 'c1-opt-b',
          key: 'B',
          text: 'Incrementar agresivamente la inversión publicitaria y contratar 8 ejecutivos de ventas; forzar una rápida expansión comercial para compensar la caída de rentabilidad y diluir los costos fijos de la operación.',
          isCorrect: false,
          consequence: 'A los 6 meses: La avalancha de nuevos clientes satura la operación rota; los errores de despacho suben al 42% y clientes históricos cancelan contratos.',
          feedback: 'Antipatrón de crecimiento forzado externo. Intentar crecer externamente antes de ordenar las operaciones internas destruye la reputación del negocio.'
        }),
        Object.freeze({
          id: 'c1-opt-c',
          key: 'C',
          text: 'Reconocer que la empresa chocó contra el techo de complejidad; Marcos debe "soltar la liana", delegar y elevar su rol a su mejor uso, y estructurar un equipo de liderazgo que asuma la responsabilidad operativa total.',
          isCorrect: true,
          consequence: 'A los 6 meses: Se distribuye la rendición de cuentas, las operaciones se estabilizan, Marcos reduce su jornada a 42h estratégicas y los márgenes se recuperan al 15%.',
          feedback: '¡Patrón de Oro EOS! Topar contra el techo es inevitable. La única solución es simplificar, delegar y elevar, y gobernar mediante un equipo de liderazgo cohesivo.'
        })
      ]),
      jitPill: Object.freeze({
        title: 'Píldora Just-in-Time: Las 5 Habilidades de Liderazgo para Romper el Techo',
        content: `
          <p>
            Para superar el techo de complejidad natural derivado del crecimiento, el líder debe abandonar la dictadura y aplicar cinco habilidades no negociables:
          </p>
          <ol style="padding-left: 1.25rem; line-height: 1.6; margin: 0.5rem 0;">
            <li><strong>Simplificar (KISS):</strong> Menos es más. Diseñar reglas, procesos y mensajes directos. Las organizaciones complejas no escalan.</li>
            <li><strong>Delegar y Elevar:</strong> Desprenderse de las tareas que ya superaste (aprobar facturas, resolver quejas diarias) para operar exclusivamente en tu mayor y mejor uso.</li>
            <li><strong>Predecir:</strong> A largo plazo (&gt;90 días, escalando el árbol para ver el rumbo) y a corto plazo (resolviendo problemas diarios/semanales de raíz para que no vuelvan jamás).</li>
            <li><strong>Sistematizar:</strong> Identificar y documentar el 20% de los procesos medulares que genera el 80% de los resultados ("Tu Manera" de operar).</li>
            <li><strong>Estructurar:</strong> Diseñar el Organigrama de Rendición de Cuentas en función de lo que la empresa necesita para el siguiente nivel, jamás para acomodar egos o personalidades existentes.</li>
          </ol>
        `,
        takeaways: Object.freeze([
          'Tú no eres tu empresa; tu empresa debe convertirse en una entidad autosostenible e independiente.',
          'No puedes construir una organización que trascienda tu vida si está diseñada para derrumbarse al apartarte.',
          'Como vaya el equipo de liderazgo, así irá la empresa completa: se requiere un frente 100% unido.'
        ])
      })
    })
  }),

  // =========================================================================
  // MÓDULO 2: EL COMPONENTE DE LA VISIÓN (EL V/TO)
  // =========================================================================
  Object.freeze({
    id: 'mod-2',
    number: 2,
    title: 'El Componente de la Visión: El Organizador Visión/Tracción (V/TO)',
    subtitle: 'Las 8 preguntas maestras de EOS y la eliminación de planes estratégicos estériles',
    leadIntro: 'Una visión que no es compartida por todos es solo una alucinación. El V/TO simplifica la estrategia empresarial a un documento de 2 páginas que alinea a toda la organización como un rayo láser.',
    badge: 'Módulo 2 • Ingeniería Estratégica V/TO',
    duration: '15 min',
    theoryId: 'mod-2-theory',
    objective: 'Formular el Organizador Visión/Tracción (V/TO) respondiendo a las 8 preguntas maestras de EOS, delimitando el Enfoque Medular y ensamblando la Estrategia de Mercadeo diferenciada.',
    challenge: Object.freeze({
      id: 'challenge-2',
      moduleId: 'mod-2',
      badge: 'Reto Invertido • Auditoría Estratégica',
      title: 'La Trampa del Plan Estratégico de 50 Páginas',
      visualAsset: Object.freeze({
        src: 'assets/img/diagrams/vto-organizador-vision-traccion.svg',
        alt: 'Estructura del Organizador Visión/Tracción VTO de 2 Páginas',
        caption: 'Figura 2.1: El V/TO de dos páginas: 8 preguntas que transforman la visión en tracción medible.'
      }),
      context: `
        <div class="rise-scenario-briefing">
          <p>
            Al revisar los archivos de Apex Logistics, el equipo directivo encuentra una carpeta titulada
            <em>"Plan Estratégico Quinquenal Corporativo"</em> de 58 páginas redactada por una consultora externa hace dos años.
          </p>
          <div class="rise-dialogue-box" style="background: var(--slate-100); padding: 1rem; border-radius: 6px; margin: 0.75rem 0;">
            <p><strong>Misión declarada:</strong> <em>"Ser líderes globales reconocidos por nuestra excelencia holística, compromiso humano y sinergia transversal innovadora."</em></p>
            <p><strong>Metas:</strong> Contiene 24 objetivos anuales en simultáneo, desde abrir sucursales en tres países hasta implementar inteligencia artificial en RRHH.</p>
          </div>
          <p>
            Al interrogar a los mandos medios, <strong>ningún empleado recuerda la misión</strong> y los choferes persiguen clientes
            fuera del radio de cobertura que consumen recursos y dejan margen negativo.
          </p>
        </div>
      `,
      question: '¿Qué acción metodológica debe implementar el equipo de liderazgo con respecto a la visión?',
      choices: Object.freeze([
        Object.freeze({
          id: 'c2-opt-a',
          key: 'A',
          text: 'Mantener el plan de 58 páginas pero lanzar una intensa campaña de difusión interna con cartelería en pasillos, tarjetas de bolsillo y premios a los colaboradores que logren memorizar la misión y metas corporativas.',
          isCorrect: false,
          consequence: 'A los 6 meses: Los colaboradores memorizan frases vacías por el premio, pero continúan operando con desalineación total; cinismo generalizado.',
          feedback: 'Antipatrón de marketing interno. Un documento complejo y desconectado de la realidad no se vuelve operativo por repetirlo en carteles.'
        }),
        Object.freeze({
          id: 'c2-opt-b',
          key: 'B',
          text: 'Contratar una firma de consultoría estratégica para ampliar el diagnóstico mediante matrices FODA multicriterio por división, análisis de brechas de mercado y un tablero ampliado de control con 50 indicadores clave.',
          isCorrect: false,
          consequence: 'A los 6 meses: Gasto de $45,000 en un documento de 120 páginas que termina guardado en el mismo cajón; parálisis por análisis.',
          feedback: 'Antipatrón de sobre-ingeniería. Agregar más páginas y complejidad técnica aleja al equipo directivo de la acción ejecutable.'
        }),
        Object.freeze({
          id: 'c2-opt-c',
          key: 'C',
          text: 'Desechar el documento obsoleto y sintetizar la visión completa en el V/TO de 2 páginas respondiendo a las 8 preguntas maestras: Enfoque Medular, Meta a 10 Años, Estrategia de Mercadeo (3 Únicas) y Plan a 1 Año con metas claras.',
          isCorrect: true,
          consequence: 'A los 6 meses: Toda la empresa conoce exactamente a dónde va el negocio; se rechazan clientes no rentables y el equipo se enfoca como un rayo láser.',
          feedback: '¡Patrón de Oro EOS! El V/TO de dos páginas elimina la complejidad. Cuando la visión es simple, clara y compartida por todos, genera tracción real.'
        })
      ]),
      jitPill: Object.freeze({
        title: 'Píldora Just-in-Time: Las 8 Preguntas Clave del V/TO',
        content: `
          <p>El Organizador Visión/Tracción (V/TO) divide la estrategia en dos páginas inmutables:</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 0.75rem 0;">
            <div style="background: #F0FDFA; padding: 0.75rem; border-radius: 6px; border-left: 3px solid #0F766E;">
              <strong>Página 1: VISIÓN</strong>
              <ol style="margin: 0.35rem 0 0; padding-left: 1.25rem; font-size: 0.88rem;">
                <li>Valores Medulares (3-7)</li>
                <li>Enfoque Medular (Propósito + Nicho)</li>
                <li>Meta a 10 Años (BHAG)</li>
                <li>Estrategia de Mercadeo (Público + 3 Únicas + Proceso + Garantía)</li>
              </ol>
            </div>
            <div style="background: #F8FAFC; padding: 0.75rem; border-radius: 6px; border-left: 3px solid #64748B;">
              <strong>Página 2: TRACCIÓN</strong>
              <ol start="5" style="margin: 0.35rem 0 0; padding-left: 1.25rem; font-size: 0.88rem;">
                <li>Panorama a 3 Años</li>
                <li>Plan a 1 Año (3-7 Metas)</li>
                <li>Rocas (Trimestrales a 90 días)</li>
                <li>Lista de Asuntos (Obstáculos)</li>
              </ol>
            </div>
          </div>
        `,
        takeaways: Object.freeze([
          'Tu Enfoque Medular es tu "punto ideal" (sweet spot): protege a la empresa de perseguir "cosas que brillan".',
          'Tus 3 Cualidades Únicas no tienen que ser exclusivas individualmente; su combinación entrelazada debe ser única.',
          'Una garantía sólida desarma el freno del cliente al comprar y obliga a tus operaciones a no fallar jamás.'
        ])
      })
    }),
    exerciseTransition: Object.freeze({
      badge: 'Práctica Deliberada • Constructor de V/TO',
      title: 'Taller de Ensamblado: Enfoque Medular y Estrategia de Mercadeo',
      lead: 'La estrategia consiste en elegir qué NO hacer. Vamos a calibrar los componentes del V/TO de Apex Logistics.',
      description: 'Selecciona la opción metodológicamente correcta para cada uno de los 3 bloques estratégicos de Apex.',
      focus: 'Aislar el Propósito/Causa genuino, el Nicho operativo de alta rentabilidad y las 3 Cualidades Únicas diferenciadas.'
    }),
    practiceBuilder: Object.freeze({
      title: 'Taller de Ensamblado: Enfoque Medular y Estrategia de Mercadeo de Apex',
      instructions: 'Construye la definición estratégica pura combinando los 3 bloques canónicos de EOS:',
      sections: Object.freeze([
        Object.freeze({
          id: 'sec-purpose',
          name: '1. Propósito / Causa / Pasión (El "Por Qué")',
          options: Object.freeze([
            Object.freeze({ id: 'pur-1', text: 'Eliminar la incertidumbre logística en cadenas de producción críticas con precisión operativa militar', isCorrect: true }),
            Object.freeze({ id: 'pur-2', text: 'Maximizar el margen de utilidad neta y convertirnos en el operador logístico más rentable del mercado', isCorrect: false }),
            Object.freeze({ id: 'pur-3', text: 'Deleitar a cada uno de nuestros clientes con un servicio cálido, amable y apasionado en cada entrega', isCorrect: false })
          ])
        }),
        Object.freeze({
          id: 'sec-niche',
          name: '2. Nicho Operativo (Tu "Punto Ideal")',
          options: Object.freeze([
            Object.freeze({ id: 'nic-1', text: 'Distribución Just-In-Time para componentes industriales de manufactura en un radio operativo de 300 km', isCorrect: true }),
            Object.freeze({ id: 'nic-2', text: 'Servicios integrales de carga seca, paquetería urbana y mudanzas corporativas sin límite de cobertura', isCorrect: false }),
            Object.freeze({ id: 'nic-3', text: 'Transporte multimodal internacional de carga marítima y aérea para grandes corporaciones farmacéuticas', isCorrect: false })
          ])
        }),
        Object.freeze({
          id: 'sec-uniques',
          name: '3. Las 3 Cualidades Únicas (Diferenciación)',
          options: Object.freeze([
            Object.freeze({ id: 'uni-1', text: '1. Monitoreo GPS en tiempo real con SLA < 15 min, 2. Custodia certificada cero mermas, 3. Facturación consolidada en 24h', isCorrect: true }),
            Object.freeze({ id: 'uni-2', text: '1. Calidad total garantizada en cada envío, 2. Servicio al cliente de clase mundial, 3. Personal altamente capacitado', isCorrect: false }),
            Object.freeze({ id: 'uni-3', text: '1. Tarifas más económicas del mercado nacional, 2. Flota de camiones modernos de agencia, 3. Cobertura de oficinas locales', isCorrect: false })
          ])
        })
      ]),
      goldenDefinition: 'Propósito: Eliminar incertidumbre en cadenas críticas + Nicho: Distribución JIT industrial en radio de 300 km + 3 Únicas: Rastreo SLA <15m, Custodia cero mermas y Factura 24h.'
    })
  }),

  // =========================================================================
  // MÓDULO 3: EL COMPONENTE DE LAS PERSONAS (GWC & ANALIZADOR)
  // =========================================================================
  Object.freeze({
    id: 'mod-3',
    number: 3,
    title: 'El Componente de las Personas: Estructura, Rendición de Cuentas y Calibración GWC',
    subtitle: 'Organigrama de Rendición de Cuentas vs Organigrama de Títulos y el Analizador de Personas',
    leadIntro: 'Para construir una gran empresa necesitas a las personas correctas en los puestos correctos. EOS desmantela los títulos de vanidad y organiza la empresa en torno a la rendición de cuentas unívoca y el filtro GWC.',
    badge: 'Módulo 3 • Calibración de Estructura y GWC',
    duration: '15 min',
    theoryId: 'mod-3-theory',
    objective: 'Estructurar el Organigrama de Rendición de Cuentas, distinguir la dualidad Visionario/Integrador, y calibrar a los colaboradores con el Analizador de Personas bajo el estándar GWC (Comprenderlo, Desearlo, Capacidad).',
    challenge: Object.freeze({
      id: 'challenge-3',
      moduleId: 'mod-3',
      badge: 'Reto Invertido • Dilema de Personas',
      title: 'El Caso del "Vendedor Estrella Intocable"',
      visualAsset: Object.freeze({
        src: 'assets/img/diagrams/organigrama-rendicion-cuentas.svg',
        alt: 'Organigrama de Rendición de Cuentas y Filtro GWC',
        caption: 'Figura 3.1: Estructura por funciones con rendición de cuentas unívoca (1 solo cuello por asiento).'
      }),
      context: `
        <div class="rise-scenario-briefing">
          <p>
            En Apex Logistics, Gonzalo es el Director Comercial y el vendedor estrella: genera el <strong>38% de los ingresos totales</strong>.
            Sin embargo, el equipo de liderazgo enfrenta una crisis severa con él:
          </p>
          <div class="rise-dialogue-box" style="background: var(--slate-100); padding: 1rem; border-radius: 6px; margin: 0.75rem 0;">
            <p><strong>Valores Medulares de Apex:</strong> 1. Ayudar Primero, 2. Transparencia Abierta, 3. Humildad y Trabajo en Equipo, 4. Disciplina de Compromiso.</p>
            <p><strong>Conducta de Gonzalo:</strong> Grita a los despachadores, oculta información a Operaciones, no asiste a las reuniones semanales y se burla de las normas internas frente al personal novato.</p>
          </div>
          <p>
            El Gerente de Operaciones y la Jefa de Finanzas exigen su salida, pero Marcos (Fundador) duda:
            <em>"Si despedimos a Gonzalo, perderemos de inmediato el 38% de la facturación y entraremos en pérdidas este trimestre."</em>
          </p>
        </div>
      `,
      question: '¿Qué diagnóstico y acción establece la metodología EOS frente a Gonzalo?',
      choices: Object.freeze([
        Object.freeze({
          id: 'c3-opt-a',
          key: 'A',
          text: 'Mantener a Gonzalo en la dirección comercial pero asignarle un asistente que amortigüe su trato con el equipo y prohibirle el contacto directo con Operaciones, protegiendo así el 38% de facturación sin confrontar su conducta.',
          isCorrect: false,
          consequence: 'A los 6 meses: La cultura se desintegra por completo; el personal concluye que los valores medulares son una farsa y renuncian los mejores talentos.',
          feedback: 'Antipatrón de tolerancia del "Terrorista Productivo". Nadie es indispensable. Tolerar la violación de los valores destruye la organización desde adentro.'
        }),
        Object.freeze({
          id: 'c3-opt-b',
          key: 'B',
          text: 'Promover a Gonzalo a socio ejecutivo comercial con mayor autoridad y participación en ganancias, asumiendo que al reconocer su estatus y aportación financiera se sentirá motivado a mejorar voluntariamente la relación con sus pares.',
          isCorrect: false,
          consequence: 'A los 6 meses: El caos se expande a toda la empresa; renuncias masivas en Operaciones y Finanzas; huelga de transportistas.',
          feedback: 'Antipatrón de apaciguamiento por ego. Premiar la indisciplina cultural con mayor poder acelera el colapso organizativo.'
        }),
        Object.freeze({
          id: 'c3-opt-c',
          key: 'C',
          text: 'Identificar a Gonzalo como "Persona Incorrecta en el Puesto Correcto"; aplicar la regla de 3 advertencias en 30 días para exigir alineación estricta a los Valores Medulares, y si no cambia, desvincularlo para proteger la cultura.',
          isCorrect: true,
          consequence: 'A los 6 meses: Gonzalo no acepta las reglas y sale de la empresa; el resto del equipo comercial asume sus cuentas con alivio y las ventas crecen un 14% en un ambiente sano.',
          feedback: '¡Patrón de Oro EOS! Gonzalo tiene GWC (capacidades de venta) pero falla en los Valores Medulares (-). Una persona que viola la cultura corrompe a todo el equipo.'
        })
      ]),
      jitPill: Object.freeze({
        title: 'Píldora Just-in-Time: El Analizador de Personas y el Filtro GWC (CDC)',
        content: `
          <p>EOS define que un gran equipo se compone de dos verdades simultáneas:</p>
          <ul style="padding-left: 1.25rem; line-height: 1.6; margin: 0.5rem 0;">
            <li><strong>Personas Correctas:</strong> Aquellas que comparten tus Valores Medulares al 100% (evaluadas con +, -, o +/-; la barra mínima no tolera negativos).</li>
            <li><strong>Puestos Correctos:</strong> Evaluados mediante el filtro <strong>CDC / GWC</strong>:
              <br/>• <strong>Comprenderlo (Get it):</strong> Entender intrínsecamente el rol, su flujo y sus matices (cerebro / cableado natural).
              <br/>• <strong>Desearlo (Want it):</strong> Tener la pasión, el deseo genuino y la chispa interna para hacer el trabajo día a día.
              <br/>• <strong>Capacidad para hacerlo (Capacity to do it):</strong> Tener el tiempo, conocimiento, intelecto y habilidades físicas/emocionales.
            </li>
          </ul>
          <p style="margin-top: 0.5rem; font-weight: 600; color: var(--mint-dark);">
            Regla de Oro: GWC debe ser Sí, Sí y Sí. Si uno es "No", la persona no está en el puesto correcto.
          </p>
        `,
        takeaways: Object.freeze([
          'En el Organigrama de Rendición de Cuentas sólo existen tres funciones base: Ventas/Marketing, Operaciones y Finanzas/Admin.',
          'El Integrador amarra las tres funciones, ejecuta el P&L y lidera con LMA (Liderar, Manejar y Rendir Cuentas).',
          'Regla de un solo cuello: Si dos personas son responsables de una misma función, nadie es responsable.'
        ])
      })
    }),
    exerciseTransition: Object.freeze({
      badge: 'Práctica Deliberada • Analizador de Personas',
      title: 'Clasificador Taxonómico: Calibración GWC y Valores Medulares',
      lead: 'Calibremos 8 colaboradores reales en las 4 zonas del Analizador de Personas.',
      description: 'Arrastra o selecciona cada colaborador a su cuadrante exacto de acuerdo a su evaluación cultural y GWC.',
      focus: 'Diferenciar entre Persona Correcta/Incorrecta y Puesto Correcto/Incorrecto para aplicar la remediación EOS.'
    }),
    sortingActivity: Object.freeze({
      competencyName: 'Analizador de Personas y Calibración GWC (CDC)',
      instructions: 'Clasifica los 8 casos de colaboradores en los 4 cuadrantes del Analizador de Personas:',
      slots: Object.freeze([
        Object.freeze({ id: 'slot-a', level: 'A', title: 'Persona Correcta en Puesto Correcto (Cultura + / GWC Sí)', badgeClass: 'rise-level-badge--a' }),
        Object.freeze({ id: 'slot-b', level: 'B', title: 'Persona Correcta en Puesto Incorrecto (Cultura + / GWC No)', badgeClass: 'rise-level-badge--b' }),
        Object.freeze({ id: 'slot-c', level: 'C', title: 'Persona Incorrecta en Puesto Correcto (Terrorista Productivo)', badgeClass: 'rise-level-badge--c' }),
        Object.freeze({ id: 'slot-d', level: 'D', title: 'Persona Incorrecta en Puesto Incorrecto (Despido Inmediato)', badgeClass: 'rise-level-badge--d' })
      ]),
      items: Object.freeze([
        Object.freeze({
          id: 'sort-1',
          level: 'A',
          targetSlot: 'slot-a',
          text: 'Lucía (Jefa de Operaciones): Modela los 4 valores medulares (+), comprende el flujo logístico a la perfección, ama el trabajo de piso y tiene maestría técnica (GWC: Sí, Sí, Sí).',
          feedback: 'Correcto. Jugadora A ejemplar: mantener, reconocer y empoderar con autonomía total.'
        }),
        Object.freeze({
          id: 'sort-2',
          level: 'C',
          targetSlot: 'slot-c',
          text: 'Rodrigo (Ventas Clave): Cumple el 150% de su cuota de ventas (GWC: Sí, Sí, Sí), pero humilla a sus colegas, oculta comisiones y viola la transparencia de la empresa (- en Valores).',
          feedback: 'Correcto. El clásico "Terrorista Productivo". Debe alinearse en 30 días o salir de la organización.'
        }),
        Object.freeze({
          id: 'sort-3',
          level: 'B',
          targetSlot: 'slot-b',
          text: 'Tomás (Contador): Persona íntegra, querida por todos, encarna los valores (+), pero fue promovido a Director de Finanzas y no comprende la modelación de flujo ni tiene capacidad analítica compleja (GWC: No en Capacidad).',
          feedback: 'Correcto. Persona Correcta en Puesto Incorrecto: no despedir; reubicar a una posición acorde a su set de habilidades.'
        }),
        Object.freeze({
          id: 'sort-4',
          level: 'D',
          targetSlot: 'slot-d',
          text: 'Esteban (Despachador): Llega tarde a diario, se queja de la empresa en redes sociales (- en Valores), y comete errores constantes en las guías de carga porque no entiende el software (GWC: No).',
          feedback: 'Correcto. Falla cultural y técnica total. Aplicar la regla de salida inmediata en 30 días.'
        }),
        Object.freeze({
          id: 'sort-5',
          level: 'A',
          targetSlot: 'slot-a',
          text: 'Carla (Coordinadora de Flota): Resuelve imprevistos con humildad y ayuda proactiva (+), le fascina la gestión de choferes y tiene capacidad demostrada de ruteo eficiente (GWC: Sí, Sí, Sí).',
          feedback: 'Correcto. Persona correcta en el puesto correcto: cimiento para el crecimiento operativo.'
        }),
        Object.freeze({
          id: 'sort-6',
          level: 'B',
          targetSlot: 'slot-b',
          text: 'Martín (Atención al Cliente): Ama la empresa, honesto y transparente (+), pero fue puesto a liderar el equipo de ventas outbound; sufre con la prospección en frío y confiesa que no le gusta vender (GWC: No lo Desea).',
          feedback: 'Correcto. Carece de "Deseo" (Want it). Reubicar a servicio al cliente o retención donde su empatía brille.'
        }),
        Object.freeze({
          id: 'sort-7',
          level: 'C',
          targetSlot: 'slot-c',
          text: 'Javier (Desarrollador Senior): Es un genio del código y resuelve bugs críticos en minutos (GWC: Sí), pero sabotea las reuniones, ignora al Integrador y rehúsa documentar sus procesos (- en Trabajo en Equipo).',
          feedback: 'Correcto. Terrorista productivo técnico. La genialidad técnica jamás justifica el sabotaje cultural.'
        }),
        Object.freeze({
          id: 'sort-8',
          level: 'D',
          targetSlot: 'slot-d',
          text: 'Patricia (Auxiliar Administrativo): Filtra información confidencial de sueldos a terceros (-), y no logra cuadrar las facturas simples tras tres meses de capacitación continua (GWC: No).',
          feedback: 'Correcto. Falla en valores y capacidad. Desvinculación limpia y objetiva.'
        })
      ])
    })
  }),

  // =========================================================================
  // MÓDULO 4: EL COMPONENTE DE DATOS & ASUNTOS (SCORECARD & IDS)
  // =========================================================================
  Object.freeze({
    id: 'mod-4',
    number: 4,
    title: 'Datos & Asuntos: El Scorecard Predictivo y el Protocolo de Resolución IDS',
    subtitle: 'Métricas predictivas de pulso semanal y la erradicación de causas raíz en comité directivo',
    leadIntro: 'Los líderes débiles administran por sensaciones, egos y estados financieros del mes pasado. Con EOS, gobiernas con un Cuadro de Indicadores de 5 a 15 números predictivos y atacas los problemas con el protocolo quirúrgico IDS.',
    badge: 'Módulo 4 • Datos Predictivos & Resolución Crítica IDS',
    duration: '20 min',
    theoryId: 'mod-4-theory',
    objective: 'Construir y monitorear un Scorecard semanal con métricas predictivas (leading indicators), y aplicar el protocolo IDS (Identificar causa raíz, Discutir, Solucionar) en incidentes críticos directivos.',
    challenge: Object.freeze({
      id: 'challenge-4',
      moduleId: 'mod-4',
      badge: 'Reto Invertido • Dilema de Datos',
      title: 'El Espejo Retrovisor Contable',
      visualAsset: Object.freeze({
        src: 'assets/img/diagrams/ids-embudo-resolucion.svg',
        alt: 'El Embudo de Resolución de Asuntos IDS',
        caption: 'Figura 4.1: Vía IDS: El 80% del tiempo se invierte en Identificar la Causa Raíz real vs síntomas.'
      }),
      context: `
        <div class="rise-scenario-briefing">
          <p>
            En la reunión mensual de Apex, el equipo directivo analiza el Estado de Resultados cerrado con fecha 25 del mes siguiente:
          </p>
          <div class="rise-dialogue-box" style="background: var(--slate-100); padding: 1rem; border-radius: 6px; margin: 0.75rem 0;">
            <p><strong>Finanzas:</strong> <em>"En junio perdimos $38,000 en el balance contable por costos de fletes de emergencia y horas extras."</em></p>
            <p><strong>Marcos:</strong> <em>"¡Pero ya estamos a 26 de julio! ¿Cómo no supimos esto hace cuatro semanas? Llevamos todo julio operando exactamente igual."</em></p>
          </div>
          <p>
            El Director de Operaciones propone: <em>"Eliminemos las reuniones semanales y hagamos una auditoría trimestral exhaustiva de 3 días con los contadores externos."</em>
          </p>
        </div>
      `,
      question: '¿Cuál es la corrección técnica que impone EOS para gobernar con datos en tiempo real?',
      choices: Object.freeze([
        Object.freeze({
          id: 'c4-opt-a',
          key: 'A',
          text: 'Aceptar la propuesta de Operaciones e incorporar una auditoría contable externa exhaustiva que revise cada balance trimestral para fiscalizar con precisión forense las desviaciones de costos y horas extras incurridas.',
          isCorrect: false,
          consequence: 'A los 6 meses: Las pérdidas se acumulan durante tres meses ciegos; la empresa descubre un déficit de $180,000 demasiado tarde.',
          feedback: 'Antipatrón de retraso. Esperar a la auditoría trimestral es conducir a toda velocidad mirando exclusivamente por el espejo retrovisor.'
        }),
        Object.freeze({
          id: 'c4-opt-b',
          key: 'B',
          text: 'Diseñar un macro-tablero de control con 85 indicadores diarios que cada área deba registrar en tiempo real antes de finalizar la jornada, garantizando que ninguna variable operativa o comercial quede fuera de reporte.',
          isCorrect: false,
          consequence: 'A los 6 meses: Los empleados pasan 1 hora al día llenando planillas; la información se vuelve ruidosa, falsa y nadie la lee.',
          feedback: 'Antipatrón de sobrecarga de datos. Demasiados números generan ceguera informativa. Nadie puede sentir el pulso de 85 variables diarias.'
        }),
        Object.freeze({
          id: 'c4-opt-c',
          key: 'C',
          text: 'Implementar un Cuadro de Indicadores (Scorecard) semanal con 5 a 15 métricas predictivas (leading indicators), cada una con una meta numérica clara y un único dueño responsable que rinda cuentas de su pulso cada 7 días.',
          isCorrect: true,
          consequence: 'A los 6 meses: Cualquier desviación operativa o comercial se detecta en la semana 1, se corrige de inmediato y la empresa cierra con utilidades récord.',
          feedback: '¡Patrón de Oro EOS! El Scorecard semanal mide actividades predictivas (e.g., llamadas de venta, quejas de entrega, horas de parada) permitiendo corregir antes del cierre contable.'
        })
      ]),
      jitPill: Object.freeze({
        title: 'Píldora Just-in-Time: El Scorecard y la Vía de Resolución IDS',
        content: `
          <p>La combinación de Datos y Asuntos crea una máquina de resolución de alta precisión:</p>
          <ul style="padding-left: 1.25rem; line-height: 1.6; margin: 0.5rem 0;">
            <li><strong>Scorecard Semanal:</strong> 5 a 15 números medibles que permiten sentir el pulso del negocio desde cualquier lugar. Métricas operativas predictivas (leading), jamás solo financieras históricas (lagging).</li>
            <li><strong>Cuantificables Individuales:</strong> Cada persona en la organización tiene al menos un número por el cual rinde cuentas semanalmente.</li>
            <li><strong>Vía de Resolución de Asuntos (IDS™):</strong>
              <br/>• <strong>I - Identificar (80% del tiempo):</strong> Cavar hondo para desenterrar la causa raíz real; nunca conformarse con el síntoma visible ni con quejas superficiales.
              <br/>• <strong>D - Discutir:</strong> Cada miembro opina una sola vez de forma abierta, sin rodeos ni politiquería corporativa.
              <br/>• <strong>S - Solucionar:</strong> Acordar un plan de acción concreto que produce un <em>Pendiente (To-Do)</em> para los próximos 7 días, con un único dueño y fecha límite.
            </li>
          </ul>
        `,
        takeaways: Object.freeze([
          'La mayoría de las empresas gastan todo su tiempo discutiendo soluciones para el síntoma equivocado.',
          'El consenso no siempre es posible: si el equipo se estanca, el Integrador tiene la responsabilidad de decidir la solución.',
          'Un problema resuelto con IDS debe desaparecer de la Lista de Asuntos para siempre.'
        ])
      })
    }),
    exerciseTransition: Object.freeze({
      badge: 'Práctica Deliberada • Simulador Conversacional',
      title: 'Comité Directivo de Alta Tensión: Desarmando Síntomas con IDS',
      lead: 'Asume el rol del Integrador en la reunión semanal directiva de Apex Logistics.',
      description: 'El Director de Operaciones exige dinero para comprar camiones. Tu misión es aplicar la "I" de IDS: indagar con precisión hasta aislar la causa raíz real.',
      focus: 'Neutralizar pedidos de gasto apresurados, desarmar síntomas superficiales y generar un To-Do semanal accionable.'
    }),
    chatSimulator: Object.freeze({
      candidate: Object.freeze({
        name: 'Roberto Silva',
        role: 'Director de Operaciones • Apex Logistics',
        avatarText: 'RS'
      }),
      initialDialogue: Object.freeze({
        text: '¡Equipo, la situación en despachos es insostenible! Los clientes están furiosos porque las entregas cayeron 18% esta semana. Necesitamos autorización inmediata para comprar 3 camiones nuevos y contratar 6 choferes por $150,000.'
      }),
      turns: Object.freeze([
        Object.freeze({
          id: 'turn-1',
          prompt: 'Turno 1: Roberto exige $150,000 para comprar camiones. Como Integrador aplicando IDS, ¿cuál es tu intervención?',
          options: Object.freeze([
            Object.freeze({
              id: 'opt-1a',
              key: 'A',
              text: 'Roberto, entiendo la urgencia ante la queja de clientes. Finanzas, tramita hoy mismo la línea de crédito y la orden de compra por los $150,000 para sumar los 3 camiones de inmediato.',
              isCorrect: false,
              feedback: 'Error grave. Saltaste directo a solucionar el síntoma sin investigar la causa raíz del retraso.',
              candidateResponse: '¡Excelente! Aunque tardarán 60 días en entregarnos los camiones... mientras tanto seguiremos igual.'
            }),
            Object.freeze({
              id: 'opt-1b',
              key: 'B',
              text: 'Roberto, antes de comprometer $150,000 de capital, revisemos los datos del Scorecard: ¿cuál es la tasa de utilización y cuántas horas efectivas de rodaje tienen los 12 camiones actuales?',
              isCorrect: true,
              feedback: '¡Excelente intervención IDS! Preguntas por datos objetivos de utilización de flota antes de aceptar una solución costosa.',
              candidateResponse: 'Bueno... estuve revisando la telemetría y los camiones están rodando apenas 4.2 horas por turno de 8 horas. Pasan casi 4 horas parados en el patio de carga.'
            }),
            Object.freeze({
              id: 'opt-1c',
              key: 'C',
              text: 'Roberto, comprar más flota no solucionará el problema. La falla está en la falta de supervisión y exigencia con tus choferes en el patio; necesitas elevar la disciplina antes de pedir dinero.',
              isCorrect: false,
              feedback: 'Ataque personal que destruye la confianza y bloquea la resolución del problema.',
              candidateResponse: '¡Si crees que es tan fácil, ponte tú el chaleco reflectante y ven a manejar los camiones a ver si puedes!'
            })
          ])
        }),
        Object.freeze({
          id: 'turn-2',
          prompt: 'Turno 2: Roberto revela que los camiones pasan 4 horas diarios parados en el patio. ¿Cómo profundizas en la causa raíz?',
          options: Object.freeze([
            Object.freeze({
              id: 'opt-2a',
              key: 'A',
              text: 'Si los camiones pasan 4 horas inactivos, implementemos sanciones económicas y actas disciplinarias a los choferes por cada 15 minutos de demora al salir del patio de maniobras.',
              isCorrect: false,
              feedback: 'Asumes culpabilidad individual sin verificar el proceso operativo que detiene los camiones.',
              candidateResponse: 'Los choferes no tienen la culpa; se quedan parados porque el almacén central no les entrega los pallets para cargar.'
            }),
            Object.freeze({
              id: 'opt-2b',
              key: 'B',
              text: 'Entendido, los camiones están subutilizados al 50%. ¿Qué está ocurriendo exactamente en el proceso de picking y carga en el almacén que retiene a los camiones 4 horas?',
              isCorrect: true,
              feedback: '¡Sondeo quirúrgico impecable! Desplazas el foco del síntoma (camiones) hacia el cuello de botella del proceso (almacén y carga).',
              candidateResponse: 'El equipo de almacén no empieza a preparar los pedidos hasta las 10:30 AM porque Ventas sigue cargando cambios de pedidos en el software hasta media mañana sin horario de corte.'
            }),
            Object.freeze({
              id: 'opt-2c',
              key: 'C',
              text: 'Para resolver esta lentitud de patio, contratemos una firma de consultoría externa que elabore un estudio exhaustivo de tiempos y movimientos de carga durante el próximo trimestre.',
              isCorrect: false,
              feedback: 'Patear el problema a consultoría externa cuando el equipo de liderazgo tiene la información en la mesa.',
              candidateResponse: 'Eso tomará tres meses y los clientes se nos van a ir esta misma semana si no actuamos.'
            })
          ])
        }),
        Object.freeze({
          id: 'turn-3',
          prompt: 'Turno 3: Has llegado a la causa raíz real: Ventas no tiene horario de corte y altera los pedidos sobre la marcha. ¿Cuál es la Solución (S) ejecutiva?',
          options: Object.freeze([
            Object.freeze({
              id: 'opt-3a',
              key: 'A',
              text: 'Solución unilateral inmediata: 1) Bloquear cambios en el sistema a las 08:00 AM y prohibir excepciones. 2) Forzar un plazo fijo de entrega de 48 horas a los clientes. 3) To-Do: Finanzas redacta la política de cobro por pedidos urgentes.',
              isCorrect: false,
              feedback: 'Solución dictatorial extrema que destruye la experiencia comercial y el servicio al cliente.',
              candidateResponse: 'Eso provocará que los clientes cancelen sus cuentas por rigidez innecesaria.'
            }),
            Object.freeze({
              id: 'opt-3b',
              key: 'B',
              text: 'Solución acordada de causa raíz: 1) Fijar hora de corte estricta de pedidos a las 08:30 AM. 2) Gonzalo (Ventas) capacita hoy a los clientes clave en el nuevo horario. 3) To-Do: Roberto y Gonzalo prueban el nuevo flujo mañana con meta de despacho a las 09:15 AM.',
              isCorrect: true,
              feedback: '¡Solución pura IDS! Causa raíz erradicada con plan de acción, dueños únicos (Roberto y Gonzalo), fecha límite inmediata y ahorro de $150,000.',
              candidateResponse: '¡De acuerdo al 100%! Si Ventas corta a las 08:30 AM, los camiones salen a las 09:15 AM, duplicamos la capacidad con la flota actual y no necesitamos gastar un solo dólar en camiones.'
            }),
            Object.freeze({
              id: 'opt-3c',
              key: 'C',
              text: 'Acuerdo preliminar de seguimiento: 1) Formar un comité semanal entre Almacén y Ventas para consensuar despachos. 2) Exhortar a Ventas a no ingresar pedidos tardíos. 3) To-Do: Evaluar los indicadores de entregas en la próxima reunión directiva mensual.',
              isCorrect: false,
              feedback: 'Falta de disciplina ejecutiva. Los asuntos se resuelven y se matan en la reunión.',
              candidateResponse: 'Si no lo resolvemos hoy, el viernes volveremos a tener entregas tardías y reclamos masivos.'
            })
          ])
        })
      ])
    })
  }),

  // =========================================================================
  // MÓDULO 5: TRACCIÓN OPERATIVA, PROCESOS & CAPSTONE STUDIO
  // =========================================================================
  Object.freeze({
    id: 'mod-5',
    number: 5,
    title: 'Tracción Operativa, Procesos Medulares & Capstone Studio EOS',
    subtitle: 'Procesos 20/80, Rocas trimestrales, Reunión Nivel 10 (L10) y Ficha Maestra de Certificación',
    leadIntro: 'La visión sin tracción es solo una alucinación. En este módulo integrador estandarizas los procesos medulares "A Tu Manera", institucionalizas la disciplina de Rocas a 90 días, dominas la agenda de 90 minutos de la Reunión Nivel 10 y certificas la Ficha Maestra de Implementación EOS.',
    badge: 'Módulo 5 • Tracción & Certificación Maestra EOS',
    duration: '25 min',
    theoryId: 'mod-5-theory',
    objective: 'Estandarizar los procesos medulares bajo la regla 20/80, implementar el pulso de la Reunión Semanal Nivel 10 (L10), y producir la Ficha Maestra de Implementación EOS certificada por rúbrica binaria (100% Pass) con exportación a Word y Markdown.',
    capstoneCase: Object.freeze({
      company: 'Apex Logistics Solutions',
      type: 'Ficha Maestra de Implementación Integral EOS®',
      competencyName: 'Sistema Operativo Empresarial Completo',
      businessContext: `
        Apex Logistics Solutions ($8.2M anuales, 48 colaboradores) necesita consolidar su transformación definitiva.
        El equipo de liderazgo debe integrar en una única Ficha Maestra los pilares de la metodología EOS:
        1) El Enfoque Medular y Diferenciación del V/TO,
        2) La estructura funcional unívoca del Organigrama de Rendición de Cuentas con filtro GWC,
        3) El Cuadro de Indicadores Semanal (Scorecard) con 5 métricas operativas predictivas, y
        4) El Plan de Rocas Trimestrales (90 días) con la disciplina sagrada de la Reunión Semanal Nivel 10 (L10).
      `
    }),
    rubricCriteria: Object.freeze([
      Object.freeze({
        id: 'c1',
        name: 'Criterio 1: Enfoque Medular Puro (V/TO)',
        question: '¿Define con claridad el Propósito/Causa y delimita el Nicho Operativo sin ambigüedades genéricas?',
        requirement: 'Prohibido usar clichés vacíos como "ser los mejores", "calidad superior" o "hacer ganar dinero". Debe definir el por qué y el nicho acotado donde la empresa destaca.'
      }),
      Object.freeze({
        id: 'c2',
        name: 'Criterio 2: Rendición de Cuentas Unívoca & Filtro GWC',
        question: '¿Estructura las funciones clave con un solo responsable por asiento y calibra los 4 roles clave bajo GWC?',
        requirement: 'Prohibido co-liderazgo o duplicidad de dueños en una función. Debe diferenciar Integrador de las 3 funciones base y verificar Comprenderlo, Desearlo y Capacidad (Sí/Sí/Sí).'
      }),
      Object.freeze({
        id: 'c3',
        name: 'Criterio 3: Cuadro de Indicadores Predictivo (Scorecard)',
        question: '¿Establece métricas semanales de actividad operativa (leading indicators) con meta numérica y dueño individual?',
        requirement: 'Prohibido limitarse a reportes contables cerrados históricos (EBITDA o balance del mes anterior). Debe contener indicadores semanales de pulso operativo.'
      }),
      Object.freeze({
        id: 'c4',
        name: 'Criterio 4: Rocas SMART de 90 Días & Disciplina L10',
        question: '¿Formula prioridades trimestrales específicas y medibles, con un solo dueño y agenda L10 invariable de 90 minutos?',
        requirement: 'Prohibido redactar tareas continuas o difusas. Cada roca debe tener resultado binario a 90 días, un único responsable y seguir la agenda L10.'
      })
    ]),
    submissionBlueprint: Object.freeze({
      vtoFocus: 'Enfoque Medular: Propósito: "Eliminar la incertidumbre en cadenas logísticas críticas con precisión militar" + Nicho: "Distribución Just-In-Time para componentes de manufactura industrial en un radio de 300 km" + 3 Únicas: 1. Telemetría GPS con SLA <15 min, 2. Custodia certificada cero mermas, 3. Facturación consolidada en 24h con garantía de flete bonificado si hay desvío >30 min.',
      accountabilityChart: Object.freeze({
        A: 'Integrador (Marcos Valdés): LMA de las 3 funciones medulares, P&L integral, remoción de trabas operativas y filtro de visión (GWC: Sí/Sí/Sí).',
        B: 'Ventas y Mercadeo (Gonzalo R.): LMA de ventas, generación de prospectos calificados en nicho JIT, cuota semanal (GWC: Sí/Sí/Sí).',
        C: 'Operaciones (Lucía M.): LMA de despacho y almacén, SLA de entrega >98%, custodia cero mermas (GWC: Sí/Sí/Sí).',
        D: 'Finanzas y Admin (Tomás S.): LMA de tesorería, flujo de caja semanal, facturación en 24h y Scorecard a tiempo (GWC: Sí/Sí/Sí).'
      }),
      scorecardWeekly: 'Scorecard Semanal: 1. Llamadas de prospección comercial (Meta: >= 60 / sem, Dueño: Gonzalo). 2. Cotizaciones presentadas (Meta: >= 12 / sem, Dueño: Gonzalo). 3. Entregas a tiempo SLA (Meta: >= 98.5%, Dueño: Lucía). 4. Horas de parada de camiones en patio (Meta: <= 1.0 h/turno, Dueño: Lucía). 5. Días de cobro DSO (Meta: <= 32 días, Dueño: Tomás).',
      rocksAndL10: 'Rocas de 90 Días y Agenda L10: Roca 1: Implementar horario de corte de pedidos 08:30 AM y software de sincronización de almacén (Dueño: Lucía - Plazo: 90 días). Roca 2: Cerrar 5 contratos corporativos anuales de distribución JIT en radio de 300 km (Dueño: Gonzalo - Plazo: 90 días). Roca 3: Automatizar facturación electrónica en 24h post-entrega (Dueño: Tomás - Plazo: 90 días). Agenda Reunión Nivel 10 (90 min exactos, lunes 08:30 AM): Seg-Buena Noticia (5m), Scorecard (5m), Rocas (5m), Titulares (5m), Pendientes To-Dos (5m), IDS (60m resolviendo los 3 asuntos de mayor impacto), Conclusión y Calificación (5m, meta >= 8).',
      definition: 'Enfoque Medular: Propósito: "Eliminar la incertidumbre en cadenas logísticas críticas con precisión militar" + Nicho: "Distribución Just-In-Time para componentes de manufactura industrial en un radio de 300 km" + 3 Únicas: 1. Telemetría GPS con SLA <15 min, 2. Custodia certificada cero mermas, 3. Facturación consolidada en 24h con garantía de flete bonificado si hay desvío >30 min.',
      levels: Object.freeze({
        A: 'Integrador (Marcos Valdés): LMA de las 3 funciones medulares, P&L integral, remoción de trabas operativas y filtro de visión (GWC: Sí/Sí/Sí).',
        B: 'Ventas y Mercadeo (Gonzalo R.): LMA de ventas, generación de prospectos calificados en nicho JIT, cuota semanal (GWC: Sí/Sí/Sí).',
        C: 'Operaciones (Lucía M.): LMA de despacho y almacén, SLA de entrega >98%, custodia cero mermas (GWC: Sí/Sí/Sí).',
        D: 'Finanzas y Admin (Tomás S.): LMA de tesorería, flujo de caja semanal, facturación en 24h y Scorecard a tiempo (GWC: Sí/Sí/Sí).'
      }),
      executionSections: Object.freeze([
        'Scorecard Semanal: 1. Llamadas de prospección comercial (Meta: >= 60 / sem, Dueño: Gonzalo). 2. Cotizaciones presentadas (Meta: >= 12 / sem, Dueño: Gonzalo). 3. Entregas a tiempo SLA (Meta: >= 98.5%, Dueño: Lucía). 4. Horas de parada de camiones en patio (Meta: <= 1.0 h/turno, Dueño: Lucía). 5. Días de cobro DSO (Meta: <= 32 días, Dueño: Tomás).',
        'Rocas de 90 Días: Roca 1: Implementar horario de corte de pedidos 08:30 AM y software de sincronización de almacén (Dueño: Lucía - Plazo: 90 días). Roca 2: Cerrar 5 contratos corporativos anuales de distribución JIT en radio de 300 km (Dueño: Gonzalo - Plazo: 90 días). Roca 3: Automatizar facturación electrónica en 24h post-entrega (Dueño: Tomás - Plazo: 90 días).',
        'Agenda Reunión Nivel 10 (90 min exactos, lunes 08:30 AM): Seg-Buena Noticia (5m), Scorecard (5m), Rocas (5m), Titulares (5m), Pendientes To-Dos (5m), IDS (60m resolviendo los 3 asuntos de mayor impacto), Conclusión y Calificación (5m, meta >= 8).'
      ])
    }),
    referenceModel: Object.freeze({
      positionTitle: 'Apex Logistics Solutions • Ficha Maestra de Implementación EOS®',
      vtoFocus: 'ENFOQUE MEDULAR DEL V/TO:\n• Propósito / Causa: Eliminar la incertidumbre logística en cadenas de producción críticas con precisión operativa militar.\n• Nicho Operativo: Distribución Just-In-Time para componentes industriales de manufactura en un radio de 300 km.\n• 3 Cualidades Únicas: 1. Rastreo GPS en tiempo real con SLA < 15 min, 2. Custodia certificada cero mermas, 3. Facturación unificada en 24 horas.\n• Garantía: Si la entrega se desvía más de 30 minutos del horario acordado, el flete es 100% gratuito.',
      accountabilityChart: 'ORGANIGRAMA DE RENDICIÓN DE CUENTAS & GWC:\n• Integrador: Marcos Valdés (LMA de las 3 funciones, P&L, resolución de trabas operativas - GWC: Sí/Sí/Sí).\n• Ventas y Mercadeo: Gonzalo R. (LMA de ventas, prospección en nicho industrial, cierre de contratos - GWC: Sí/Sí/Sí).\n• Operaciones: Lucía M. (LMA de almacén y transporte, cumplimiento de SLA > 98%, seguridad de flota - GWC: Sí/Sí/Sí).\n• Finanzas / Admin: Tomás S. (LMA de finanzas, flujo de caja semanal, facturación y Scorecard - GWC: Sí/Sí/Sí).\n• Regla de oro cumplida: Un único cuello por función, cero puestos compartidos.',
      scorecardWeekly: 'CUADRO DE INDICADORES SEMANAL (SCORECARD):\n1. Nuevos prospectos calificados en nicho JIT (Meta: >= 15 / sem, Dueño: Gonzalo)\n2. Tasa de conversión de cotizaciones (Meta: >= 35%, Dueño: Gonzalo)\n3. Porcentaje de despachos a tiempo SLA (Meta: >= 98.5%, Dueño: Lucía)\n4. Horas promedio de parada de camiones en patio (Meta: <= 1.0 h / día, Dueño: Lucía)\n5. Días promedio de cobranza DSO (Meta: <= 32 días, Dueño: Tomás)\nTodas las métricas son indicadores predictivos (leading) de actividad semanal directa.',
      rocksAndL10: 'PLAN DE TRACCIÓN A 90 DÍAS & AGENDA L10:\n• Roca Institucional 1: Estandarizar y documentar el Proceso de Despacho JIT (20/80) asegurando que sea Seguido por Todos (Dueño: Lucía - Plazo: 90 días).\n• Roca Institucional 2: Migrar el 100% de la facturación a emisión automática consolidada en 24h (Dueño: Tomás - Plazo: 90 días).\n• Roca Institucional 3: Certificar a 12 nuevos choferes en el protocolo de custodia cero mermas (Dueño: Lucía - Plazo: 90 días).\n• Pulso de Reunión Nivel 10: Cada lunes de 08:30 a 10:00 AM puntual: 5m Noticias, 5m Scorecard, 5m Rocas, 5m Titulares, 5m To-Dos (meta >= 90% cumplimiento), 60m IDS enfocado en los 3 asuntos clave, 5m Conclusión y calificación.'
    })
  })
]);

export function getModulesData() {
  return MODULES_DATA;
}
