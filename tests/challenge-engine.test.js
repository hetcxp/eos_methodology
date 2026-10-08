import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ChallengeEngine } from '../js/services/challenge-engine.js';
import { createCourseStore } from '../js/core/store.js';

const MOCK_EOS_CHALLENGE = {
  id: 'mod-1-ch1',
  moduleId: 'mod-1',
  badge: 'Reto Crítico',
  title: 'El Colapso del Fundador en Apex Logistics',
  context: 'Apex Logistics factura $8M pero el fundador trabaja 85 horas por semana.',
  question: '¿Qué decisión estructural debe tomar el fundador para romper el techo?',
  choices: [
    {
      id: 'opt-micromanage',
      key: 'A',
      text: 'Centralizar más decisiones operativas y revisar cada ruta de transporte personalmente.',
      isCorrect: false,
      consequence: 'A los 6 meses: El fundador sufre agotamiento extremo, 3 clientes clave cancelan contratos.',
      feedback: 'Antipatrón de microgestión: intentar controlar más detalles aumenta la complejidad y ahoga el negocio.'
    },
    {
      id: 'opt-let-go',
      key: 'B',
      text: 'Soltar la liana: estructurar el Organigrama de Rendición de Cuentas y nombrar un Integrador con LMA.',
      isCorrect: true,
      consequence: null,
      feedback: '¡Exacto! Romper el techo exige soltar la liana y delegar la rendición de cuentas.'
    }
  ],
  jitPill: {
    title: 'Principio EOS: Soltar la Liana',
    content: '<p>Para que la empresa crezca más allá de la capacidad de su fundador, este debe delegar o perecer.</p>'
  }
};

test('ChallengeEngine - Evaluación de Fallo Productivo (Consecuencia Organizacional)', () => {
  const engine = new ChallengeEngine();

  // Intento 1: opción errónea
  const eval1 = engine.evaluate(MOCK_EOS_CHALLENGE, 'opt-micromanage');

  assert.strictEqual(eval1.isCorrect, false);
  assert.strictEqual(eval1.resolved, false);
  assert.strictEqual(eval1.attempts, 1);
  assert.ok(eval1.consequence.includes('A los 6 meses'));
  assert.strictEqual(eval1.jitPill, null, 'No debe desbloquear JIT Pill en fallo');
  assert.strictEqual(engine.getAttempts('mod-1-ch1'), 1);
  assert.deepEqual(engine.getHistory('mod-1-ch1'), ['opt-micromanage']);
  assert.strictEqual(engine.isResolved('mod-1-ch1'), false);
});

test('ChallengeEngine - Resolución exitosa y desbloqueo de Píldora JIT', () => {
  const engine = new ChallengeEngine();

  // Intento 1 fallido
  engine.evaluate(MOCK_EOS_CHALLENGE, 'opt-micromanage');

  // Intento 2 exitoso
  const eval2 = engine.evaluate(MOCK_EOS_CHALLENGE, 'opt-let-go');

  assert.strictEqual(eval2.isCorrect, true);
  assert.strictEqual(eval2.resolved, true);
  assert.strictEqual(eval2.attempts, 2);
  assert.strictEqual(eval2.consequence, null);
  assert.ok(eval2.jitPill, 'Debe desbloquear la píldora JIT');
  assert.match(eval2.jitPill.title, /Soltar la Liana/);
  assert.strictEqual(engine.isResolved('mod-1-ch1'), true);
});

test('ChallengeEngine - Sincronización con CourseStore reactivo', () => {
  const store = createCourseStore();
  const engine = new ChallengeEngine({ store });

  engine.evaluate(MOCK_EOS_CHALLENGE, 'opt-let-go');

  const state = store.getState();
  assert.ok(state.challengesState['mod-1']);
  assert.strictEqual(state.challengesState['mod-1'].passed, true);
  assert.strictEqual(state.challengesState['mod-1'].attempts, 1);
});
