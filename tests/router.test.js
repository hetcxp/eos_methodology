import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CourseRouter } from '../js/ui/router.js';
import { CourseStore } from '../js/core/store.js';

test('CourseRouter - Instanciación, módulos y acceso a theoryData', () => {
  const store = new CourseStore();
  const router = new CourseRouter({ store, container: null });

  assert.strictEqual(router.modules.length, 6, 'Debe cargar los 6 módulos');
  assert.ok(router.theoryData, 'Debe exponer theoryData');
  assert.strictEqual(Object.keys(router.theoryData).length, 6, 'Debe contener las 6 espinas teóricas');
  assert.ok(router.theoryData['mod-0-theory']);
  assert.ok(router.theoryData['mod-5-theory']);

  router.destroy();
});

test('CourseRouter - Reentrada de init() cancela suscripción previa sin fugar memoria', () => {
  const store = new CourseStore();
  let subscribeCallCount = 0;
  let unsubscribeCallCount = 0;

  const originalSubscribe = store.subscribe.bind(store);
  store.subscribe = (fn) => {
    subscribeCallCount += 1;
    const unsub = originalSubscribe(fn);
    return () => {
      unsubscribeCallCount += 1;
      unsub();
    };
  };

  const mockContainer = {
    set innerHTML(v) {},
    get innerHTML() { return ''; },
    querySelectorAll: () => [],
    querySelector: () => null
  };

  // Constructor con container ejecuta init() por primera vez
  const router = new CourseRouter({ store, container: mockContainer });
  assert.strictEqual(subscribeCallCount, 1);
  assert.strictEqual(unsubscribeCallCount, 0);

  // Segunda inicialización manual (reentrada)
  router.init();
  assert.strictEqual(subscribeCallCount, 2);
  assert.strictEqual(unsubscribeCallCount, 1, 'Debe haber cancelado la suscripción anterior antes de crear la nueva');

  // Tercera inicialización
  router.init();
  assert.strictEqual(subscribeCallCount, 3);
  assert.strictEqual(unsubscribeCallCount, 2);

  // Destrucción limpia
  router.destroy();
  assert.strictEqual(unsubscribeCallCount, 3, 'destroy() debe cancelar la última suscripción activa');
  assert.strictEqual(router._storeUnsubscribe, null);
});

test('CourseRouter - render() genera estructura DOM Rise Mint sin lanzar excepciones', () => {
  const store = new CourseStore();
  let renderedHtml = '';
  const mockContainer = {
    set innerHTML(val) { renderedHtml = val; },
    get innerHTML() { return renderedHtml; },
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {}
  };

  const router = new CourseRouter({ store, container: mockContainer });
  router.render();

  assert.ok(renderedHtml.length > 500, 'El HTML renderizado debe ser sustantivo');
  assert.match(renderedHtml, /Sistema Operativo Empresarial/i);
  assert.match(renderedHtml, /rise-nav-list/i);
  assert.match(renderedHtml, /rise-theory-badges-box/i);

  // Navegar a Módulo 1 con caso Apex Logistics
  router.navigateTo(1, true);
  assert.match(renderedHtml, /Apex Logistics/i);

  router.destroy();
});

test('CourseRouter - Reentrada de init() destruye TheoryDrawer previo para evitar fuga de listeners', () => {
  const store = new CourseStore();
  const mockContainer = {
    set innerHTML(v) {},
    get innerHTML() { return ''; },
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {}
  };

  const router = new CourseRouter({ store, container: mockContainer });
  let drawerDestroyCalled = 0;
  router.theoryDrawer = {
    destroy: () => { drawerDestroyCalled += 1; },
    setLanguage: () => {}
  };

  // Re-inicialización
  router.init();
  assert.strictEqual(drawerDestroyCalled, 1, 'init() debe invocar destroy() en el theoryDrawer previo si existía');

  router.destroy();
});

test('CourseRouter - destroy() y _cleanupView() destruyen componentes activos y abortan listeners', () => {
  const store = new CourseStore();
  const mockContainer = {
    set innerHTML(v) {},
    get innerHTML() { return ''; },
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {}
  };

  const router = new CourseRouter({ store, container: mockContainer });
  let comp1Destroyed = false;
  let comp2Destroyed = false;

  router._activeComponents.push({
    destroy: () => { comp1Destroyed = true; }
  });
  router._activeComponents.push({
    destroy: () => { comp2Destroyed = true; }
  });

  const controller = router._abortController;
  assert.ok(controller, 'Debe haber un AbortController activo tras render');
  assert.strictEqual(controller.signal.aborted, false);

  router.destroy();

  assert.strictEqual(comp1Destroyed, true, 'Componente 1 debe ser destruido');
  assert.strictEqual(comp2Destroyed, true, 'Componente 2 debe ser destruido');
  assert.strictEqual(router._activeComponents.length, 0, 'La lista de componentes debe vaciarse');
  assert.strictEqual(controller.signal.aborted, true, 'El AbortController debe ser abortado');
});
