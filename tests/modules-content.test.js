import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MODULES_DATA, getModulesData } from '../js/data/modules-content.js';

test('MODULES_DATA - Invariante de 6 módulos y estructura inmutable (Frozen)', () => {
  assert.strictEqual(Array.isArray(MODULES_DATA), true);
  assert.strictEqual(MODULES_DATA.length, 6);
  assert.strictEqual(Object.isFrozen(MODULES_DATA), true);

  MODULES_DATA.forEach((mod, idx) => {
    assert.strictEqual(mod.number, idx);
    assert.strictEqual(mod.id, `mod-${idx}`);
    assert.strictEqual(Object.isFrozen(mod), true);
    assert.strictEqual(typeof mod.title, 'string');
    assert.strictEqual(typeof mod.objective, 'string');
    assert.strictEqual(typeof mod.theoryId, 'string');
  });
});

test('MODULES_DATA - Módulo 0: Contrato Andragógico, 5 Frustraciones y 4 Preguntas Clave', () => {
  const mod0 = MODULES_DATA[0];
  assert.ok(mod0.introData);
  assert.strictEqual(mod0.introData.questions.length, 4);
  assert.ok(mod0.introData.pathways);
  assert.ok(mod0.introData.pathways.practiceChoice);
  assert.ok(mod0.introData.pathways.theoryChoice);
});

test('MODULES_DATA - Módulo 1: Soltar la Liana / Caso Apex Logistics', () => {
  const mod1 = MODULES_DATA[1];
  assert.ok(mod1.challenge);
  assert.strictEqual(mod1.challenge.choices.length, 3);
  const correctChoice = mod1.challenge.choices.find(c => c.isCorrect);
  assert.ok(correctChoice);
  assert.match(correctChoice.text, /soltar la liana/i);
  assert.ok(mod1.challenge.jitPill);
  assert.ok(mod1.challenge.choices.some(c => !c.isCorrect && c.consequence));
});

test('MODULES_DATA - Módulo 2: Visión V/TO y Formula Builder', () => {
  const mod2 = MODULES_DATA[2];
  assert.ok(mod2.challenge);
  assert.ok(mod2.practiceBuilder);
  assert.strictEqual(mod2.practiceBuilder.sections.length, 3);
  assert.strictEqual(typeof mod2.practiceBuilder.goldenDefinition, 'string');
  assert.match(mod2.practiceBuilder.goldenDefinition, /industrial/i);
});

test('MODULES_DATA - Módulo 3: Personas, Organigrama de Rendición de Cuentas & Sorting GWC', () => {
  const mod3 = MODULES_DATA[3];
  assert.ok(mod3.challenge);
  assert.ok(mod3.sortingActivity);
  assert.strictEqual(mod3.sortingActivity.slots.length, 4);
  assert.strictEqual(mod3.sortingActivity.items.length, 8);
  mod3.sortingActivity.items.forEach(item => {
    assert.ok(item.id);
    assert.ok(['A', 'B', 'C', 'D'].includes(item.level));
    assert.ok(item.targetSlot);
    assert.ok(item.text);
    assert.ok(item.feedback);
  });
});

test('MODULES_DATA - Módulo 4: Datos & Asuntos (Scorecard & Simulación IDS)', () => {
  const mod4 = MODULES_DATA[4];
  assert.ok(mod4.challenge);
  assert.ok(mod4.chatSimulator);
  assert.strictEqual(mod4.chatSimulator.turns.length, 3);
  mod4.chatSimulator.turns.forEach(t => {
    assert.strictEqual(t.options.length, 3);
    const correctOptions = t.options.filter(o => o.isCorrect);
    assert.strictEqual(correctOptions.length, 1);
  });
});

test('MODULES_DATA - Módulo 5: Tracción, Rocas de 90 Días, L10 & Capstone Studio', () => {
  const mod5 = MODULES_DATA[5];
  assert.ok(mod5.capstoneCase);
  assert.strictEqual(mod5.rubricCriteria.length, 4);
  assert.ok(mod5.submissionBlueprint);
  assert.ok(mod5.referenceModel);
  assert.ok(mod5.submissionBlueprint.definition);
  assert.ok(mod5.submissionBlueprint.levels.A);
  assert.ok(mod5.submissionBlueprint.executionSections.length >= 3);
});

test('getModulesData - Retorna colección congelada', () => {
  const data = getModulesData();
  assert.strictEqual(data, MODULES_DATA);
  assert.strictEqual(Object.isFrozen(data), true);
});
