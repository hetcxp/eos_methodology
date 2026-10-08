import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RubricEvaluator, evaluateCapstoneSubmission } from '../js/services/rubric-evaluator.js';
import { CourseStore } from '../js/core/store.js';
import { MODULES_DATA } from '../js/data/modules-content.js';

test('RubricEvaluator - Criterio 1: Enfoque Medular V/TO sin clichés', () => {
  const evaluator = new RubricEvaluator();

  // Caso inválido: cliché "los mejores"
  const badDef1 = 'Somos los mejores transportistas del país con el precio más barato para cualquier cliente.';
  const resBad1 = evaluator.evaluateCriterion1(badDef1);
  assert.strictEqual(resBad1.passed, false);
  assert.match(resBad1.feedback, /clichés genéricos/);

  // Caso inválido: insuficiente detalle
  const badDef2 = 'Distribución rápida.';
  const resBad2 = evaluator.evaluateCriterion1(badDef2);
  assert.strictEqual(resBad2.passed, false);

  // Caso inválido artificial detectado en auditoría
  const artificialDef = 'Eliminar un servicio 300 con garantía 24.';
  const resArt = evaluator.evaluateCriterion1(artificialDef);
  assert.strictEqual(resArt.passed, false);
  assert.match(resArt.feedback, /insuficiente|propósito|nicho/i);

  // Caso válido: propósito + nicho + únicas y garantía
  const cleanDef = 'Propósito: Eliminar la incertidumbre logística en cadenas críticas con precisión militar. Nicho: Distribución Just-In-Time para componentes de manufactura industrial en un radio de 300 km. 3 Únicas: Telemetría GPS con SLA < 15 min, custodia certificada cero mermas, y garantía de flete bonificado si hay retraso.';
  const resClean = evaluator.evaluateCriterion1(cleanDef);
  assert.strictEqual(resClean.passed, true);

  // Booleano directo ya no evade la evaluación
  assert.strictEqual(evaluator.evaluateCriterion1(true).passed, false);
  assert.strictEqual(evaluator.evaluateCriterion1(false).passed, false);
});

test('RubricEvaluator - Criterio 2: Organigrama de Rendición de Cuentas & GWC', () => {
  const evaluator = new RubricEvaluator();

  // Caso inválido: co-liderazgo / roles compartidos
  const badLevels1 = 'Integrador: Marcos. Ventas: Gonzalo y Esteban co-directores con responsabilidad compartida. Operaciones: Lucía. Finanzas: Tomás. GWC evaluado.';
  const resBad1 = evaluator.evaluateCriterion2(badLevels1);
  assert.strictEqual(resBad1.passed, false);
  assert.match(resBad1.feedback, /co-liderazgo|responsabilidad compartida/);

  // Caso inválido: falta filtro GWC
  const badLevels2 = 'Integrador: Marcos Valdés con LMA. Ventas y Mercadeo: Gonzalo R. Operaciones: Lucía M. Finanzas y Admin: Tomás S.';
  const resBad2 = evaluator.evaluateCriterion2(badLevels2);
  assert.strictEqual(resBad2.passed, false);
  assert.match(resBad2.feedback, /GWC/);

  // Caso artificial incompleto
  const artificialLevels = 'Marcos: Integrador. Ventas, Operaciones, Finanzas. GWC.';
  const resArt2 = evaluator.evaluateCriterion2(artificialLevels);
  assert.strictEqual(resArt2.passed, false);

  // Caso válido: Integrador + 3 funciones + un solo dueño + filtro GWC
  const validLevels = 'Integrador (Marcos Valdés): LMA y P&L (GWC: Sí/Sí/Sí). Ventas y Mercadeo (Gonzalo R.): prospección y cuota (GWC: Sí/Sí/Sí). Operaciones (Lucía M.): despacho y SLA (GWC: Sí/Sí/Sí). Finanzas y Admin (Tomás S.): flujo de caja (GWC: Sí/Sí/Sí).';
  const resValid = evaluator.evaluateCriterion2(validLevels);
  assert.strictEqual(resValid.passed, true);
});

test('RubricEvaluator - Criterio 3: Cuadro de Indicadores Predictivo (Scorecard)', () => {
  const evaluator = new RubricEvaluator();

  // Caso inválido: sólo métricas tardías o sin metas/dueños
  const badScorecard = 'Revisaremos la utilidad neta a fin de año y el balance general cuando el contador termine.';
  const resBad = evaluator.evaluateCriterion3(badScorecard);
  assert.strictEqual(resBad.passed, false);

  // Caso artificial incompleto
  const artificialScorecard = 'Prospectos y entregas semanales con meta 10 y dueño Ana.';
  const resArt3 = evaluator.evaluateCriterion3(artificialScorecard);
  assert.strictEqual(resArt3.passed, false);

  // Caso válido: métricas predictivas leading semanales con metas y dueños individuales
  const validScorecard = 'Scorecard Semanal: 1. Prospectos calificados (Meta: >= 15 / sem, Dueño: Gonzalo). 2. Cotizaciones presentadas (Meta: >= 12, Dueño: Gonzalo). 3. Entregas a tiempo SLA (Meta: >= 98.5%, Dueño: Lucía). 4. Días de cobro DSO (Meta: <= 32 días, Dueño: Tomás).';
  const resValid = evaluator.evaluateCriterion3(validScorecard);
  assert.strictEqual(resValid.passed, true);
});

test('RubricEvaluator - Criterio 4: Rocas SMART de 90 Días & Agenda L10', () => {
  const evaluator = new RubricEvaluator();

  // Caso inválido: tareas vagas o continuas
  const badRocks = 'Rocas: Seguir trabajando duro y hacer lo posible por mejorar las ventas con reuniones cuando se pueda.';
  const resBad = evaluator.evaluateCriterion4(badRocks);
  assert.strictEqual(resBad.passed, false);
  assert.match(resBad.feedback, /expresiones difusas/);

  // Caso artificial incompleto
  const artificialRocks = 'Rocas: implementar proyecto concreto (dueño Ana). Reunión L10 con IDS.';
  const resArt4 = evaluator.evaluateCriterion4(artificialRocks);
  assert.strictEqual(resArt4.passed, false);

  // Caso válido: 90 días, dueños únicos y agenda L10 de 90 min con IDS
  const validRocks = 'Rocas de 90 Días: Roca 1: Implementar corte de pedidos 08:30 AM (Dueño: Lucía). Roca 2: Cerrar 5 contratos corporativos (Dueño: Gonzalo). Roca 3: Automatizar facturación electrónica en 24h (Dueño: Tomás). Reunión Nivel 10 semanal (L10 de 90 min): Seg-Noticias (5m), Scorecard (5m), Rocas (5m), Titulares (5m), To-Dos (5m), IDS resolviendo asuntos raíz (60m), Conclusión y calificación (5m).';
  const resValid = evaluator.evaluateCriterion4(validRocks);
  assert.strictEqual(resValid.passed, true);
});

test('evaluateCapstoneSubmission - Certificación 100% Pass y Sincronización con Store', () => {
  const store = new CourseStore();
  const mod5 = MODULES_DATA[5];
  const submission = mod5.submissionBlueprint;

  const result = evaluateCapstoneSubmission(submission, { store });

  assert.strictEqual(result.allPassed, true);
  assert.strictEqual(result.passed, true);
  assert.strictEqual(result.score, 100);
  assert.strictEqual(result.checklist.length, 4);
  assert.strictEqual(result.checklist.every(c => c.passed), true);
  assert.match(result.feedback, /Certificación Exitosa/);

  // Verificar sincronización en Store
  const state = store.getState();
  assert.deepEqual(state.capstoneRubric, {
    c1: true,
    c2: true,
    c3: true,
    c4: true
  });
});

test('evaluateCapstoneSubmission - Auditoría con fallos parciales calcula score proporcional', () => {
  const partialSubmission = {
    definition: 'Propósito: Eliminar la incertidumbre logística en cadenas industriales con precisión militar. Nicho: Distribución industrial de manufactura en un radio de 300 km. 3 Únicas: Telemetría GPS con SLA, custodia cero mermas y garantía de entrega.',
    levels: 'Co-directores de ventas con responsabilidad compartida.',
    scorecard: 'Utilidad neta histórica.',
    rocks: 'Seguir trabajando duro sin horario de reunión.'
  };

  const result = evaluateCapstoneSubmission(partialSubmission);

  assert.strictEqual(result.allPassed, false);
  assert.strictEqual(result.passed, false);
  assert.strictEqual(result.criteria.c1.passed, true);
  assert.strictEqual(result.criteria.c2.passed, false);
  assert.strictEqual(result.criteria.c3.passed, false);
  assert.strictEqual(result.criteria.c4.passed, false);
  assert.strictEqual(result.score, 25);
});

test('RubricEvaluator - Rechazo adversarial estricto de atajos sintéticos y bypass', () => {
  const evaluator = new RubricEvaluator();

  // Adversarial C1: palabras clave pegadas sin sustancia ni 3 únicas estructuradas
  const advC1 = 'Nuestro propósito nicho es vender flete con garantía en 300 km y usar gps para monitoreo de camiones.';
  const resAdv1 = evaluator.evaluateCriterion1(advC1);
  assert.strictEqual(resAdv1.passed, false, 'Adversarial C1 debe ser rechazado');

  // Adversarial C2: sólo una respuesta "Sí" para GWC
  const advC2 = 'Integrador: Marcos Valdés con LMA y P&L. Ventas: Gonzalo R. Operaciones: Lucía M. Finanzas: Tomás S. Evaluación GWC: Sí.';
  const resAdv2 = evaluator.evaluateCriterion2(advC2);
  assert.strictEqual(resAdv2.passed, false, 'Adversarial C2 con un solo Sí debe ser rechazado');

  // Adversarial C3: metas sin números reales ("meta alta") y un solo dueño para todo
  const advC3 = 'Scorecard Semanal: 1. Llamadas de prospección (Meta: meta alta, Dueño: Gonzalo). 2. Cotizaciones (Meta: muchas, Dueño: Gonzalo). 3. Entregas (Meta: excelente, Dueño: Gonzalo). 4. DSO (Meta: rápido, Dueño: Gonzalo).';
  const resAdv3 = evaluator.evaluateCriterion3(advC3);
  assert.strictEqual(resAdv3.passed, false, 'Adversarial C3 sin números y con un solo dueño debe ser rechazado');

  // Adversarial C4: sólo dos Rocas en vez de 3
  const advC4 = 'Rocas de 90 Días: Roca 1: Implementar corte de pedidos (Dueño: Lucía). Roca 2: Cerrar 5 contratos (Dueño: Gonzalo). Reunión Nivel 10 semanal de 90 min con IDS.';
  const resAdv4 = evaluator.evaluateCriterion4(advC4);
  assert.strictEqual(resAdv4.passed, false, 'Adversarial C4 con solo 2 Rocas debe ser rechazado');

  // Intento de sumisión adversarial combinada
  const advSubmission = {
    vtoFocus: advC1,
    accountabilityChart: advC2,
    scorecardWeekly: advC3,
    rocksAndL10: advC4
  };
  const result = evaluateCapstoneSubmission(advSubmission);
  assert.strictEqual(result.allPassed, false, 'La sumisión adversarial combinada debe ser RECHAZADA');
  assert.strictEqual(result.score, 0, 'Score debe ser 0 ante bypass adversarial');
});

test('RubricEvaluator - Rechazo adversarial de casos borde detectados por Codex', () => {
  const evaluator = new RubricEvaluator();

  // 1. C1 Bypass con tokens aislados (1. gps 2. sla 3. custodia) sin frases sustantivas
  const c1Tokens = 'Propósito: Eliminar la incertidumbre logística en cadenas críticas con precisión militar. Nicho: Distribución industrial de manufactura en un radio de 300 km. 3 Únicas: 1. gps 2. sla 3. custodia.';
  const resC1Tokens = evaluator.evaluateCriterion1(c1Tokens);
  assert.strictEqual(resC1Tokens.passed, false, 'C1 debe rechazar tokens aislados sin sustancia (cada única debe tener >= 15 chars)');

  // 1b. C1 Bypass con inundación de caracteres artificiales
  const c1Flooding = 'Propósito: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Nicho: yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy 3 Únicas: 1. gps 2. sla 3. custodia.';
  const resC1Flooding = evaluator.evaluateCriterion1(c1Flooding);
  assert.strictEqual(resC1Flooding.passed, false, 'C1 debe rechazar repetición artificial de caracteres');

  // 2. C2 Bypass con todos los asientos asignados a Gonzalo y otros nombres mencionados como observadores
  const c2SingleHolder = 'Integrador: Gonzalo con LMA de las 3 funciones y P&L. Ventas: Gonzalo. Operaciones: Gonzalo. Finanzas: Gonzalo. Evaluación GWC (Comprender, Desear, Capacidad: Sí, Sí, Sí). Observadores: Marcos y Tomás.';
  const resC2Single = evaluator.evaluateCriterion2(c2SingleHolder);
  assert.strictEqual(resC2Single.passed, false, 'C2 debe rechazar asignación donde todos los asientos recaen en la misma persona');

  // 3. C3 Bypass con métrica sin meta numérica
  const c3NoTarget = 'Scorecard Semanal: 1. Prospectos calificados (Meta: >= 15 / sem, Dueño: Gonzalo). 2. Cotizaciones presentadas (Meta: >= 12 / sem, Dueño: Gonzalo). 3. Entregas a tiempo SLA (Meta: >= 98.5%, Dueño: Lucía). 4. Paradas de camiones en patio (Dueño: Lucía).';
  const resC3NoTarget = evaluator.evaluateCriterion3(c3NoTarget);
  assert.strictEqual(resC3NoTarget.passed, false, 'C3 debe rechazar scorecard si alguna métrica carece de meta cuantitativa numérica');

  // 3b. C3 Bypass con todas las métricas asignadas al mismo dueño aunque haya otro nombre al inicio
  const c3SingleOwner = 'Scorecard Semanal supervisado por Marcos: 1. Prospectos calificados (Meta: >= 15 / sem, Dueño: Gonzalo). 2. Cotizaciones presentadas (Meta: >= 12 / sem, Dueño: Gonzalo). 3. Entregas a tiempo SLA (Meta: >= 98.5%, Dueño: Gonzalo). 4. Días DSO (Meta: <= 32 días, Dueño: Gonzalo).';
  const resC3SingleOwner = evaluator.evaluateCriterion3(c3SingleOwner);
  assert.strictEqual(resC3SingleOwner.passed, false, 'C3 debe rechazar scorecard si todas las métricas pertenecen al mismo dueño');

  // 4. C4 Bypass con todas las Rocas asignadas a la misma persona
  const c4SingleOwner = 'Rocas de 90 Días: Roca 1: Implementar corte de pedidos 08:30 AM (Dueño: Gonzalo). Roca 2: Cerrar 5 contratos corporativos (Dueño: Gonzalo). Roca 3: Automatizar facturación electrónica (Dueño: Gonzalo). Reunión Nivel 10 semanal de 90 min con IDS. Líder consultor: Tomás.';
  const resC4SingleOwner = evaluator.evaluateCriterion4(c4SingleOwner);
  assert.strictEqual(resC4SingleOwner.passed, false, 'C4 debe rechazar Rocas si todas recaen en un único dueño');

  // 4b. C4 Bypass con sólo 2 Rocas
  const c4TwoRocks = 'Rocas de 90 Días: Roca 1: Implementar corte de pedidos 08:30 AM (Dueño: Lucía). Roca 2: Cerrar 5 contratos corporativos (Dueño: Gonzalo). Reunión Nivel 10 semanal de 90 min con IDS (60m).';
  const resC4TwoRocks = evaluator.evaluateCriterion4(c4TwoRocks);
  assert.strictEqual(resC4TwoRocks.passed, false, 'C4 debe rechazar con menos de 3 Rocas');

  // 5. C1 Bypass con adjetivos genéricos no operativos
  const c1GenericAdjectives = 'Propósito: Eliminar la incertidumbre logística en cadenas críticas con precisión militar. Nicho: Distribución industrial de manufactura en un radio de 300 km. 3 Únicas: trato cordial diario, imagen clara constante, tono estable cercano.';
  const resC1Gen = evaluator.evaluateCriterion1(c1GenericAdjectives);
  assert.strictEqual(resC1Gen.passed, false, 'C1 debe rechazar adjetivos abstractos sin atributos operativos');

  // 5b. C1 Bypass con flooding de tokens repetidos
  const c1TokenFlooding = 'Propósito: Eliminar la incertidumbre logística en cadenas críticas con precisión militar. Nicho: Distribución industrial de manufactura en un radio de 300 km. 3 Únicas: foo foo foo foo foo, bar bar bar bar bar, baz baz baz baz baz.';
  const resC1Flood = evaluator.evaluateCriterion1(c1TokenFlooding);
  assert.strictEqual(resC1Flood.passed, false, 'C1 debe rechazar flooding de palabras repetidas');

  // 6. C2 Bypass con un solo GWC global en vez de GWC por asiento
  const c2GlobalGwc = 'Integrador: Marcos Valdés con LMA y P&L. Ventas y Mercadeo: Gonzalo R. Operaciones: Lucía M. Finanzas y Admin: Tomás S. Nota al pie: GWC evaluado Sí/Sí/Sí.';
  const resC2Global = evaluator.evaluateCriterion2(c2GlobalGwc);
  assert.strictEqual(resC2Global.passed, false, 'C2 debe rechazar si GWC no está explícito en los asientos estructurales');

  // 7. C3 Bypass con métricas idénticas repetidas 4 veces
  const c3DuplicateMetrics = 'Scorecard Semanal: 1. Prospectos calificados (Meta: >= 15 / sem, Dueño: Gonzalo). 2. Prospectos calificados (Meta: >= 20 / sem, Dueño: Lucía). 3. Prospectos calificados (Meta: >= 25 / sem, Dueño: Tomás). 4. Prospectos calificados (Meta: >= 30 / sem, Dueño: Gonzalo).';
  const resC3Dup = evaluator.evaluateCriterion3(c3DuplicateMetrics);
  assert.strictEqual(resC3Dup.passed, false, 'C3 debe rechazar scorecard con métricas duplicadas');

  // 8. C4 Bypass con Rocas sin parámetro cuantitativo SMART
  const c4VagueOutcomes = 'Rocas de 90 Días: Roca 1: Implementar iniciativa operativa (Dueño: Lucía). Roca 2: Cerrar iniciativa comercial (Dueño: Gonzalo). Roca 3: Automatizar iniciativa financiera (Dueño: Tomás). Reunión Nivel 10 semanal de 90 min con agenda (Scorecard, Rocas, IDS 60 min).';
  const resC4Vague = evaluator.evaluateCriterion4(c4VagueOutcomes);
  assert.strictEqual(resC4Vague.passed, false, 'C4 debe rechazar Rocas que carecen de parámetro cuantitativo SMART');

  // 8b. C4 Bypass sin 60 min de IDS en agenda L10
  const c4No60MinIds = 'Rocas de 90 Días: Roca 1: Implementar corte 08:30 AM (Dueño: Lucía). Roca 2: Cerrar 5 contratos (Dueño: Gonzalo). Roca 3: Automatizar facturación en 24h (Dueño: Tomás). Reunión Nivel 10 semanal de 90 min con IDS.';
  const resC4No60m = evaluator.evaluateCriterion4(c4No60MinIds);
  assert.strictEqual(resC4No60m.passed, false, 'C4 debe rechazar si falta la especificación de 60 min para IDS');

  // 9a. C1: 3 cualidades idénticas o no diferenciadas
  const c1IdenticalUniques = 'Propósito: Eliminar la incertidumbre logística en cadenas industriales con precisión operativa. Nicho: Distribución industrial de manufactura en un radio de 300 km. 3 Únicas: telemetría GPS con SLA 15 min, telemetría GPS con SLA 15 min, telemetría GPS con SLA 15 min';
  assert.strictEqual(evaluator.evaluateCriterion1(c1IdenticalUniques).passed, false, 'C1 debe rechazar cualidades únicas idénticas');

  const c1SameGenericAttr = 'Propósito: Eliminar la incertidumbre logística en cadenas industriales con precisión operativa. Nicho: Distribución industrial de manufactura en un radio de 300 km. 3 Únicas: despacho eficiente con GPS, custodia excelente con GPS, factura impecable con GPS';
  assert.strictEqual(evaluator.evaluateCriterion1(c1SameGenericAttr).passed, false, 'C1 debe rechazar mismo atributo genérico repetido sin métricas diferenciadoras');

  // 9b. C1: Garantía con penalización vaga sin beneficio económico cuantificado
  const c1VagueCompensation = 'Propósito: Eliminar la incertidumbre logística en cadenas industriales con precisión operativa. Nicho: Distribución industrial de manufactura en un radio de 300 km. Garantía: ante desvío de más de 30 minutos habrá una penalización y compensación administrativa.';
  assert.strictEqual(evaluator.evaluateCriterion1(c1VagueCompensation).passed, false, 'C1 debe rechazar garantía sin compensación económica explícita');

  // 9c. C2: GWC en 3 de los 4 asientos pero no en los 4
  const c2GwcIn3Seats = 'Integrador (Marcos Valdés): LMA y P&L (GWC: Sí/Sí/Sí). Ventas y Mercadeo (Gonzalo R.): cuota (GWC: Sí/Sí/Sí). Operaciones (Lucía M.): despacho SLA (GWC: Sí/Sí/Sí). Finanzas y Admin (Tomás S.): flujo de caja.';
  assert.strictEqual(evaluator.evaluateCriterion2(c2GwcIn3Seats).passed, false, 'C2 debe exigir GWC en la totalidad (4) de los asientos');

  // 9d. C2: Co-liderazgo agnóstico sin depender de nombres fijos
  const c2AgnosticCoLeadership = 'Integrador: Marcos con LMA y P&L (GWC: Sí/Sí/Sí). Ventas y Mercadeo: Gonzalo R. con cuota (GWC: Sí/Sí/Sí). Operaciones: Lucía / Carlos con despacho (GWC: Sí/Sí/Sí). Finanzas y Admin: Tomás S. con tesorería (GWC: Sí/Sí/Sí).';
  assert.strictEqual(evaluator.evaluateCriterion2(c2AgnosticCoLeadership).passed, false, 'C2 debe rechazar dobles titulares agnósticos (Lucía / Carlos)');

  // 9e. C3: Métrica con número temporal pero sin campo de meta u operador
  const c3NoExplicitMeta = 'Scorecard Semanal: 1. Prospectos en 15 días (Dueño: Gonzalo). 2. Cotizaciones en 10 días (Dueño: Gonzalo). 3. Entregas en 20 días (Dueño: Lucía). 4. DSO en 30 días (Dueño: Tomás).';
  assert.strictEqual(evaluator.evaluateCriterion3(c3NoExplicitMeta).passed, false, 'C3 debe exigir que el número cuantitativo sea una meta con operador o en campo Meta');

  // 9f. C3: Mención informal "de Gonzalo" sin campo explícito de dueño
  const c3InformalOwner = 'Scorecard Semanal: 1. Prospectos de Gonzalo (Meta: >= 15 / sem). 2. Cotizaciones de Gonzalo (Meta: >= 12). 3. Entregas de Lucía (Meta: >= 98.5%). 4. DSO de Tomás (Meta: <= 32 días).';
  assert.strictEqual(evaluator.evaluateCriterion3(c3InformalOwner).passed, false, 'C3 debe exigir campo explícito Dueño/Responsable y rechazar referencias preposicionales');

  // 9g. C4: Mención "con apoyo de" en lugar de titular responsable explícito
  const c4WithSupportOf = 'Rocas de 90 Días: Roca 1: Implementar corte 08:30 AM con apoyo de Lucía. Roca 2: Cerrar 5 contratos con apoyo de Gonzalo. Roca 3: Automatizar facturación en 24h con apoyo de Tomás. Reunión Nivel 10 semanal de 90 min con agenda (Scorecard, Rocas, Titulares, IDS 60 min).';
  assert.strictEqual(evaluator.evaluateCriterion4(c4WithSupportOf).passed, false, 'C4 debe rechazar colaboradores informales y exigir campo explícito Dueño');

  // 9h. C4: Agenda sin denominación L10/Nivel 10 o sin bloques estructurados
  const c4MissingL10Name = 'Rocas de 90 Días: Roca 1: Implementar corte 08:30 AM (Dueño: Lucía). Roca 2: Cerrar 5 contratos (Dueño: Gonzalo). Roca 3: Automatizar facturación en 24h (Dueño: Tomás). Reunión semanal de 90 min con IDS 60 min.';
  assert.strictEqual(evaluator.evaluateCriterion4(c4MissingL10Name).passed, false, 'C4 debe exigir denominación L10/Nivel 10 y bloques de agenda');

  // 10a. C3: Manejo seguro de métricas cortas sin lanzar ReferenceError
  const c3ShortMetric = 'Scorecard Semanal: 1. A (Meta: >= 1, Dueño: Gonzalo). 2. B (Meta: >= 2, Dueño: Gonzalo). 3. C (Meta: >= 3, Dueño: Lucía). 4. D (Meta: >= 4, Dueño: Tomás).';
  assert.doesNotThrow(() => evaluator.evaluateCriterion3(c3ShortMetric));

  // 10b. C3: Rechazo de metas circunstanciales temporales (ej: "Meta: en 15 días")
  const c3TemporalCircumstance = 'Scorecard Semanal: 1. Prospectos (Meta: en 15 días, Dueño: Gonzalo). 2. Cotizaciones (Meta: >= 12, Dueño: Gonzalo). 3. Entregas SLA (Meta: >= 98.5%, Dueño: Lucía). 4. DSO (Meta: <= 32 días, Dueño: Tomás).';
  assert.strictEqual(evaluator.evaluateCriterion3(c3TemporalCircumstance).passed, false, 'C3 debe rechazar metas circunstanciales como "Meta: en 15 días"');

  // 10c. C3: Dobles dueños en campos separados
  const c3SplitOwners = 'Scorecard Semanal: 1. Prospectos (Meta: >= 15 / sem, Dueño: Ana, Responsable: Zoe). 2. Cotizaciones (Meta: >= 12, Dueño: Gonzalo). 3. Entregas SLA (Meta: >= 98.5%, Dueño: Lucía). 4. DSO (Meta: <= 32 días, Dueño: Tomás).';
  assert.strictEqual(evaluator.evaluateCriterion3(c3SplitOwners).passed, false, 'C3 debe rechazar dobles dueños en campos separados');

  // 10d. C2: Dobles titulares en campos separados
  const c2SplitHolders = 'Integrador: Marcos con LMA y P&L (GWC: Sí/Sí/Sí). Ventas y Mercadeo: Gonzalo R. con cuota (GWC: Sí/Sí/Sí). Operaciones: Beatriz. Responsable: Zoe con despacho (GWC: Sí/Sí/Sí). Finanzas y Admin: Tomás S. con tesorería (GWC: Sí/Sí/Sí).';
  assert.strictEqual(evaluator.evaluateCriterion2(c2SplitHolders).passed, false, 'C2 debe rechazar dobles titulares en campos separados');

  // 10e. C2: GWC con un solo "Sí" genérico en vez de calibración de 3 dimensiones
  const c2SingleYesGwc = 'Integrador (Marcos Valdés): LMA y P&L (GWC: Sí). Ventas y Mercadeo (Gonzalo R.): cuota (GWC: Sí). Operaciones (Lucía M.): despacho SLA (GWC: Sí). Finanzas y Admin (Tomás S.): flujo de caja (GWC: Sí).';
  assert.strictEqual(evaluator.evaluateCriterion2(c2SingleYesGwc).passed, false, 'C2 debe rechazar un solo "Sí" genérico y exigir calibración completa de 3 dimensiones Sí/Sí/Sí');

  // 10f. C4: Rechazo de colaboradores informales "con apoyo de"
  const c4WithInformalSupport = 'Rocas de 90 Días: Roca 1: Implementar corte 08:30 AM (Dueño: Lucía; con apoyo de Carlos). Roca 2: Cerrar 5 contratos (Dueño: Gonzalo). Roca 3: Automatizar facturación en 24h (Dueño: Tomás). Reunión Nivel 10 semanal de 90 min con agenda (Scorecard, Rocas, Titulares, IDS 60 min).';
  assert.strictEqual(evaluator.evaluateCriterion4(c4WithInformalSupport).passed, false, 'C4 debe rechazar colaboradores informales');

  // 10g. C4: Dobles titulares en campos separados en la misma Roca
  const c4SplitRockHolders = 'Rocas de 90 Días: Roca 1: Implementar corte 08:30 AM (Dueño: Lucía, Responsable: Zoe). Roca 2: Cerrar 5 contratos (Dueño: Gonzalo). Roca 3: Automatizar facturación en 24h (Dueño: Tomás). Reunión Nivel 10 semanal de 90 min con agenda (Scorecard, Rocas, Titulares, IDS 60 min).';
  assert.strictEqual(evaluator.evaluateCriterion4(c4SplitRockHolders).passed, false, 'C4 debe rechazar dobles titulares en campos separados en una Roca');

  // 10h. C4: Agenda con suma incorrecta de bloques de tiempo
  const c4IncorrectSumAgenda = 'Rocas de 90 Días: Roca 1: Implementar corte 08:30 AM (Dueño: Lucía). Roca 2: Cerrar 5 contratos (Dueño: Gonzalo). Roca 3: Automatizar facturación en 24h (Dueño: Tomás). Reunión Nivel 10 semanal de 90 min con agenda: Noticias (5m), Scorecard (5m), Rocas (5m), Titulares (5m), To-Dos (5m), IDS (40m), Conclusión (5m).';
  assert.strictEqual(evaluator.evaluateCriterion4(c4IncorrectSumAgenda).passed, false, 'C4 debe rechazar agendas cuyos sub-bloques no sumen exactamente 90 min (suma 70 min)');

  // 10i. C1: Compensación económica ubicada fuera de la cláusula de Garantía
  const c1CompensationOutsideGuarantee = 'Propósito: Eliminar la incertidumbre logística en cadenas industriales con precisión operativa. Nicho: Distribución industrial de manufactura en un radio de 300 km. Cláusula comercial: Ofrecemos flete 100% gratuito en promociones de bienvenida. Garantía: ante desvío de más de 30 minutos habrá penalización.';
  assert.strictEqual(evaluator.evaluateCriterion1(c1CompensationOutsideGuarantee).passed, false, 'C1 debe rechazar si la compensación económica está fuera del bloque de Garantía');
});
