import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ScormAdapter } from '../js/core/scorm-adapter.js';

test('ScormAdapter - Fallback / Standalone Mode (In-Memory)', () => {
  const adapter = new ScormAdapter({ windowObj: null, storage: null });
  assert.strictEqual(adapter.init(), true);
  assert.strictEqual(adapter.version, 'fallback');

  assert.strictEqual(adapter.getStatus(), 'incomplete');

  // Asignar y leer valores
  adapter.setValue('cmi.core.lesson_location', 'mod-1');
  assert.strictEqual(adapter.getValue('cmi.core.lesson_location'), 'mod-1');

  // Status y Score
  adapter.setScore(95, 0, 100);
  assert.strictEqual(adapter.getValue('cmi.core.score.raw'), '95');

  adapter.setStatus('passed');
  assert.strictEqual(adapter.getStatus(), 'passed');

  // Telemetría opcional en suspend_data sin alterar score o status
  adapter.recordTheoreticalExploration('mod-0', 'badge-theory-mod-0');
  const suspendRaw = adapter.getValue('cmi.suspend_data');
  assert.ok(suspendRaw.includes('badge-theory-mod-0'));
  assert.strictEqual(adapter.getStatus(), 'passed');
  assert.strictEqual(adapter.getValue('cmi.core.score.raw'), '95');

  // No duplicación de badges
  adapter.recordTheoreticalExploration('mod-0', 'badge-theory-mod-0');
  const parsed = JSON.parse(adapter.getValue('cmi.suspend_data'));
  assert.strictEqual(parsed.theoryExplored.length, 1);

  assert.strictEqual(adapter.finish(), true);
});

test('ScormAdapter - Fallback con Mock Storage', () => {
  const mockStorageMap = {};
  const mockStorage = {
    getItem(k) { return mockStorageMap[k] || null; },
    setItem(k, v) { mockStorageMap[k] = String(v); },
    removeItem(k) { delete mockStorageMap[k]; }
  };

  const adapter1 = new ScormAdapter({ windowObj: null, storage: mockStorage });
  adapter1.init();
  adapter1.setValue('cmi.core.lesson_location', 'mod-2');
  adapter1.setStatus('incomplete');
  adapter1.commit();

  // Instanciar segundo adapter sobre el mismo storage
  const adapter2 = new ScormAdapter({ windowObj: null, storage: mockStorage });
  adapter2.init();
  assert.strictEqual(adapter2.getValue('cmi.core.lesson_location'), 'mod-2');
  assert.strictEqual(adapter2.getStatus(), 'incomplete');
});

test('ScormAdapter - Integración con API SCORM 1.2 del LMS', () => {
  const lmsStore = {};
  let committed = false;
  let finished = false;

  const mockApi12 = {
    LMSInitialize(arg) { return 'true'; },
    LMSGetValue(key) { return lmsStore[key] || ''; },
    LMSSetValue(key, val) { lmsStore[key] = String(val); return 'true'; },
    LMSCommit(arg) { committed = true; return 'true'; },
    LMSFinish(arg) { finished = true; return 'true'; },
    LMSGetLastError() { return '0'; },
    LMSGetErrorString(code) { return 'No error'; },
    LMSGetDiagnostic(code) { return 'No diagnostic'; }
  };

  const mockWin = { API: mockApi12 };
  const adapter = new ScormAdapter({ windowObj: mockWin, storage: null });

  assert.strictEqual(adapter.init(), true);
  assert.strictEqual(adapter.version, '1.2');

  adapter.setValue('cmi.core.lesson_location', 'mod-3');
  assert.strictEqual(lmsStore['cmi.core.lesson_location'], 'mod-3');

  adapter.setScore(100);
  assert.strictEqual(lmsStore['cmi.core.score.raw'], '100');

  adapter.setStatus('passed');
  assert.strictEqual(lmsStore['cmi.core.lesson_status'], 'passed');

  adapter.commit();
  assert.strictEqual(committed, true);

  adapter.finish();
  assert.strictEqual(finished, true);
});

test('ScormAdapter - Integración con API SCORM 2004', () => {
  const lmsStore2004 = {};
  let committed = false;
  let terminated = false;

  const mockApi2004 = {
    Initialize(arg) { return 'true'; },
    GetValue(key) { return lmsStore2004[key] || ''; },
    SetValue(key, val) { lmsStore2004[key] = String(val); return 'true'; },
    Commit(arg) { committed = true; return 'true'; },
    Terminate(arg) { terminated = true; return 'true'; },
    GetLastError() { return '0'; },
    GetErrorString(code) { return 'No error'; },
    GetDiagnostic(code) { return 'No diagnostic'; }
  };

  const mockWin = { API_1484_11: mockApi2004 };
  const adapter = new ScormAdapter({ windowObj: mockWin, storage: null });

  assert.strictEqual(adapter.init(), true);
  assert.strictEqual(adapter.version, '2004');

  adapter.setValue('cmi.location', 'mod-4');
  assert.strictEqual(lmsStore2004['cmi.location'], 'mod-4');

  adapter.setScore(100);
  assert.strictEqual(lmsStore2004['cmi.score.raw'], '100');

  adapter.setStatus('passed');
  assert.strictEqual(lmsStore2004['cmi.completion_status'], 'completed');
  assert.strictEqual(lmsStore2004['cmi.success_status'], 'passed');

  adapter.commit();
  assert.strictEqual(committed, true);

  adapter.finish();
  assert.strictEqual(terminated, true);
});

test('ScormAdapter - finish() invoca LMSFinish aunque LMSCommit falle y degrade a fallback', () => {
  let finishCalls = 0;
  const mockApi12FailingCommit = {
    LMSInitialize() { return 'true'; },
    LMSGetValue() { return ''; },
    LMSSetValue() { return 'true'; },
    LMSCommit() { return 'false'; }, // Commit falla intencionalmente
    LMSFinish() { finishCalls += 1; return 'true'; },
    LMSGetLastError() { return '101'; }
  };

  const mockWin = { API: mockApi12FailingCommit };
  const adapter = new ScormAdapter({ windowObj: mockWin, storage: null });

  assert.strictEqual(adapter.init(), true);
  assert.strictEqual(adapter.version, '1.2');

  // Finish debe invocar LMSFinish a pesar del fallo en commit
  const finishResult = adapter.finish();
  assert.strictEqual(finishCalls, 1, 'LMSFinish DEBE ser llamado obligatoriamente para cerrar la sesión LMS');
  assert.strictEqual(finishResult, true);
});

test('ScormAdapter - finish() invoca LMSFinish garantizadamente incluso si commit() lanza una excepción', () => {
  let finishCalls = 0;
  const mockApiThrowing = {
    LMSInitialize() { return 'true'; },
    LMSGetValue() { return ''; },
    LMSSetValue() { return 'true'; },
    LMSCommit() { throw new Error('Network crash during commit'); },
    LMSFinish() { finishCalls += 1; return 'true'; },
    LMSGetLastError() { return '0'; }
  };

  const mockWin = { API: mockApiThrowing };
  const adapter = new ScormAdapter({ windowObj: mockWin, storage: null });

  assert.strictEqual(adapter.init(), true);
  assert.strictEqual(adapter.version, '1.2');

  const finishResult = adapter.finish();
  assert.strictEqual(finishCalls, 1, 'LMSFinish DEBE ser invocado incluso si commit lanzó una excepción');
  assert.strictEqual(finishResult, true);
  assert.strictEqual(adapter.initialized, false);
});
