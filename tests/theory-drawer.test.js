import { test } from 'node:test';
import assert from 'node:assert/strict';
import { THEORY_DATA, getTheoryData } from '../js/data/theory-drawers.js';

test('THEORY_DATA - 6 Espinas Teóricas con Citas Seminales Rigurosas', () => {
  const expectedKeys = [
    'mod-0-theory',
    'mod-1-theory',
    'mod-2-theory',
    'mod-3-theory',
    'mod-4-theory',
    'mod-5-theory'
  ];

  assert.strictEqual(Object.keys(THEORY_DATA).length, 6);
  assert.strictEqual(Object.isFrozen(THEORY_DATA), true);

  expectedKeys.forEach(k => {
    const th = THEORY_DATA[k];
    assert.ok(th, `Debe existir ${k}`);
    assert.strictEqual(Object.isFrozen(th), true);
    assert.strictEqual(typeof th.title, 'string');
    assert.strictEqual(typeof th.author, 'string');
    assert.strictEqual(typeof th.citation, 'string');
    assert.strictEqual(typeof th.html, 'string');
    assert.ok(th.html.length > 200, `El contenido HTML de ${k} debe ser sustantivo`);
  });
});

test('THEORY_DATA - Autores Seminales Fundamentales EOS', () => {
  // 0.E: Wickman, Gerber, Knowles
  assert.match(THEORY_DATA['mod-0-theory'].author, /Wickman/i);
  assert.match(THEORY_DATA['mod-0-theory'].author, /Gerber/i);

  // 1.E: Greiner, Adizes
  assert.match(THEORY_DATA['mod-1-theory'].author, /Greiner/i);
  assert.match(THEORY_DATA['mod-1-theory'].author, /Adizes/i);

  // 2.E: Collins, Porter, Ries
  assert.match(THEORY_DATA['mod-2-theory'].author, /Collins/i);
  assert.match(THEORY_DATA['mod-2-theory'].author, /Porter/i);

  // 3.E: Jaques, Lencioni
  assert.match(THEORY_DATA['mod-3-theory'].author, /Jaques/i);
  assert.match(THEORY_DATA['mod-3-theory'].author, /Lencioni/i);

  // 4.E: Deming, Simon, Goldratt
  assert.match(THEORY_DATA['mod-4-theory'].author, /Deming/i);
  assert.match(THEORY_DATA['mod-4-theory'].author, /Simon/i);

  // 5.E: McChesney, Mintzberg, Drucker
  assert.match(THEORY_DATA['mod-5-theory'].author, /McChesney/i);
  assert.match(THEORY_DATA['mod-5-theory'].author, /Drucker/i);
});

test('getTheoryData - Búsqueda por ID existente e inexistente', () => {
  const found = getTheoryData('mod-1-theory');
  assert.ok(found);
  assert.strictEqual(found.id, 'mod-1-theory');

  const notFound = getTheoryData('mod-99-theory');
  assert.strictEqual(notFound, null);

  // Soporte de idiomas retorna colección completa
  assert.strictEqual(getTheoryData('es'), THEORY_DATA);
  assert.strictEqual(getTheoryData('en'), THEORY_DATA);
  assert.strictEqual(getTheoryData(), THEORY_DATA);
});

test('TheoryDrawer - destroy() cuando está cerrado no dispara onClose erróneamente', async () => {
  const { TheoryDrawer } = await import('../js/ui/theory-drawer.js');

  let closeCalled = false;
  const drawer = new TheoryDrawer({
    onClose: () => { closeCalled = true; }
  });

  assert.strictEqual(drawer.isOpen(), false);
  drawer.destroy();
  assert.strictEqual(closeCalled, false, 'destroy() en estado cerrado no debe disparar onClose');
});

test('TheoryDrawer - destroy() cuando está abierto ejecuta close y limpia el estado', async () => {
  const { TheoryDrawer } = await import('../js/ui/theory-drawer.js');

  let closeCalled = false;
  const mockClassList = new Set(['is-open']);
  const mockDrawerEl = {
    classList: {
      contains: (cls) => mockClassList.has(cls),
      remove: (cls) => mockClassList.delete(cls),
      add: (cls) => mockClassList.add(cls)
    },
    setAttribute: () => {},
    querySelector: () => null,
    addEventListener: () => {},
    removeEventListener: () => {}
  };
  const mockOverlayEl = {
    classList: {
      contains: () => false,
      remove: () => {},
      add: () => {}
    },
    setAttribute: () => {},
    addEventListener: () => {},
    removeEventListener: () => {}
  };

  const drawer = new TheoryDrawer({
    drawerElement: mockDrawerEl,
    overlayElement: mockOverlayEl,
    onClose: () => { closeCalled = true; }
  });

  assert.strictEqual(drawer.isOpen(), true);
  drawer.destroy();
  assert.strictEqual(closeCalled, true, 'destroy() en estado abierto debe invocar close()');
  assert.strictEqual(drawer.isOpen(), false, 'destroy() debe haber removido la clase is-open');
});

test('TheoryDrawer - inicializa _abortController y lo aborta en destroy()', async () => {
  const { TheoryDrawer } = await import('../js/ui/theory-drawer.js');
  const drawer = new TheoryDrawer({});
  assert.ok(drawer._abortController, 'Debe inicializar _abortController');
  assert.strictEqual(drawer._abortController.signal.aborted, false, 'No debe estar abortado al crearse');
  drawer.destroy();
  assert.strictEqual(drawer._abortController, null, '_abortController debe limpiarse a null tras destroy()');
});
