import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CourseStore, createCourseStore } from '../js/core/store.js';
import { ScormAdapter } from '../js/core/scorm-adapter.js';

test('CourseStore - Inicialización y estado por defecto', () => {
  const store = createCourseStore();
  const state = store.getState();

  assert.strictEqual(state.currentModule, 0);
  assert.deepEqual(state.completedModules, []);
  assert.deepEqual(state.challengesState, {});
  assert.deepEqual(state.activitiesState, {});
  assert.deepEqual(state.theoryDrawersViewed, []);
  assert.deepEqual(state.capstoneRubric, { c1: false, c2: false, c3: false, c4: false });
  assert.strictEqual(state.finalScore, 0);
  assert.strictEqual(state.courseStatus, 'incomplete');
});

test('CourseStore - Suscripciones reactivas y dispatch de acciones', () => {
  const adapter = new ScormAdapter({ windowObj: null, storage: null });
  const store = createCourseStore(adapter);

  const events = [];
  const unsubscribe = store.subscribe((newState, action) => {
    events.push({ actionType: action.type, mod: newState.currentModule });
  });

  // 1. Navegar a módulo 1
  store.dispatchAction('NAVIGATE_MODULE', { moduleId: 1 });
  assert.strictEqual(store.getState().currentModule, 1);
  assert.strictEqual(adapter.getValue('cmi.core.lesson_location'), 'mod-1');

  // 2. Registrar intento fallido de reto
  store.dispatchAction('RECORD_CHALLENGE_ATTEMPT', {
    moduleId: 'mod-1',
    choiceId: 'opt-micro-manage',
    passed: false,
    feedback: 'Fallo productivo detectado'
  });

  let state = store.getState();
  assert.strictEqual(state.challengesState['mod-1'].attempts, 1);
  assert.strictEqual(state.challengesState['mod-1'].passed, false);
  assert.deepEqual(state.challengesState['mod-1'].choices, ['opt-micro-manage']);

  // 3. Segundo intento exitoso
  store.dispatchAction('RECORD_CHALLENGE_ATTEMPT', {
    moduleId: 'mod-1',
    choiceId: 'opt-let-go',
    passed: true,
    feedback: 'Soltar la liana aplicado'
  });

  state = store.getState();
  assert.strictEqual(state.challengesState['mod-1'].attempts, 2);
  assert.strictEqual(state.challengesState['mod-1'].passed, true);
  assert.strictEqual(state.challengesState['mod-1'].choices.length, 2);

  // 4. Completar módulo
  store.dispatchAction('COMPLETE_MODULE', { moduleId: 1 });
  assert.deepEqual(store.getState().completedModules, [1]);

  unsubscribe();
  // Verificar que ya no recibe eventos tras desuscribir
  store.dispatchAction('NAVIGATE_MODULE', { moduleId: 2 });
  assert.strictEqual(events.length, 4); // Navigate 1, Attempt 1, Attempt 2, Complete 1
});

test('CourseStore - Espina Teórica Opcional no penaliza ni aprueba el curso', () => {
  const adapter = new ScormAdapter({ windowObj: null, storage: null });
  adapter.init();
  const store = createCourseStore(adapter);

  // Consultar espina teórica 0.E
  store.dispatchAction('UNLOCK_THEORY_BADGE', {
    moduleId: 'mod-0',
    badgeId: 'badge-theory-mod-0'
  });

  const state = store.getState();
  assert.deepEqual(state.theoryDrawersViewed, ['badge-theory-mod-0']);
  assert.strictEqual(state.courseStatus, 'incomplete');
  assert.strictEqual(state.finalScore, 0);
  assert.strictEqual(adapter.getStatus(), 'incomplete');
});

test('CourseStore - Certificación binaria de Capstone 100% Pass', () => {
  const adapter = new ScormAdapter({ windowObj: null, storage: null });
  const store = createCourseStore(adapter);

  // Aprobar 3 de 4 criterios
  store.dispatchAction('UPDATE_CAPSTONE_RUBRIC', {
    rubric: { c1: true, c2: true, c3: true, c4: false }
  });

  let state = store.getState();
  assert.strictEqual(state.finalScore, 75);
  assert.strictEqual(state.courseStatus, 'incomplete');
  assert.strictEqual(adapter.getValue('cmi.core.lesson_status'), 'incomplete');
  assert.strictEqual(adapter.getValue('cmi.core.score.raw'), '75');

  // Aprobar el 4to criterio (100% pass)
  store.dispatchAction('UPDATE_CAPSTONE_RUBRIC', {
    rubric: { c1: true, c2: true, c3: true, c4: true }
  });

  state = store.getState();
  assert.strictEqual(state.finalScore, 100);
  assert.strictEqual(state.courseStatus, 'passed');
  assert.strictEqual(state.completedModules.includes(5), true);
  assert.strictEqual(adapter.getValue('cmi.core.lesson_status'), 'passed');
  assert.strictEqual(adapter.getValue('cmi.core.score.raw'), '100');
});

test('CourseStore - Suspend data respeta límite estricto de SCORM 1.2 (<= 4096 caracteres)', () => {
  const adapter = new ScormAdapter({ windowObj: null, storage: null });
  const store = createCourseStore(adapter);

  // Simular un curso intensivo con muchos intentos y módulos
  for (let m = 0; m <= 5; m++) {
    store.dispatchAction('NAVIGATE_MODULE', { moduleId: m });
    store.dispatchAction('RECORD_CHALLENGE_ATTEMPT', {
      moduleId: `mod-${m}`,
      choiceId: `choice-${m}-1`,
      passed: false
    });
    store.dispatchAction('RECORD_CHALLENGE_ATTEMPT', {
      moduleId: `mod-${m}`,
      choiceId: `choice-${m}-2`,
      passed: true
    });
    store.dispatchAction('COMPLETE_MODULE', { moduleId: m });
    store.dispatchAction('UNLOCK_THEORY_BADGE', {
      moduleId: `mod-${m}`,
      badgeId: `badge-theory-mod-${m}`
    });
  }

  store.dispatchAction('UPDATE_CAPSTONE_RUBRIC', {
    rubric: { c1: true, c2: true, c3: true, c4: true }
  });

  const suspendData = adapter.getValue('cmi.suspend_data');
  assert.ok(suspendData, 'Debe haber suspend_data sincronizado');
  assert.ok(suspendData.length <= 4096, `suspend_data excede límite SCORM 1.2: ${suspendData.length} chars`);
});
