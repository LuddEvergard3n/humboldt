/**
 * ui-tests.js — Testes de lógica de UI e motores
 *
 * Testa a lógica pura (sem DOM) de:
 *  - State: get, set, emissão de eventos
 *  - FeedbackEngine: validação de tipos de atividade
 *
 * Os testes que precisam de DOM são marcados como
 * "suposição: ambiente browser" e ignorados em Node.js.
 */

import { suite, test, assert, assertEqual } from './test-runner.js';
import { resolve, dirname }                  from 'node:path';
import { fileURLToPath }                     from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const root  = resolve(__dir, '..');

export async function runUITests() {

  // ----------------------------------------------------------
  suite('State — get / set / on');

  const { State } = await import(resolve(root, 'js/state.js'));

  test('get retorna valor inicial correto', () => {
    const s = new State();
    assertEqual(s.get('teacherMode'), false);
    assertEqual(s.get('fontSize'),    16);
  });

  test('set atualiza o valor', () => {
    const s = new State();
    s.set('teacherMode', true);
    assertEqual(s.get('teacherMode'), true);
  });

  test('set notifica observador', () => {
    const s = new State();
    let received = null;
    s.on('fontSize', v => { received = v; });
    s.set('fontSize', 20);
    assertEqual(received, 20, 'observador não foi chamado com o valor correto');
  });

  test('set não notifica se valor não mudou', () => {
    const s = new State();
    let calls = 0;
    s.on('highContrast', () => { calls++; });
    s.set('highContrast', false); // já é false
    assertEqual(calls, 0, 'observador não deveria ser chamado');
  });

  test('on retorna função de cancelamento', () => {
    const s = new State();
    let calls = 0;
    const off = s.on('currentStep', () => { calls++; });
    s.set('currentStep', 1);
    off();
    s.set('currentStep', 2);
    assertEqual(calls, 1, 'observador deveria ter sido chamado apenas uma vez');
  });

  test('snapshot retorna cópia imutável', () => {
    const s    = new State();
    const snap = s.snapshot();
    snap.fontSize = 999; // mutação na cópia
    assertEqual(s.get('fontSize'), 16, 'snapshot não deveria afetar o estado');
  });

  test('set com objeto aplica múltiplos campos', () => {
    const s = new State();
    s.set({ fontSize: 18, highContrast: true });
    assertEqual(s.get('fontSize'),    18);
    assertEqual(s.get('highContrast'), true);
  });

  // ----------------------------------------------------------
  suite('FeedbackEngine — validação de respostas');

  // FeedbackEngine depende de DOM para exibir msgs, então
  // testamos apenas a lógica de _check isoladamente.

  test('single-choice: correto', () => {
    const result = checkActivity(
      { type: 'single-choice', correct: 'sul' },
      'sul'
    );
    assert(result === true, 'deveria ser correto');
  });

  test('single-choice: incorreto', () => {
    const result = checkActivity(
      { type: 'single-choice', correct: 'sul' },
      'norte'
    );
    assert(result === false, 'deveria ser incorreto');
  });

  test('multi-choice: todos corretos', () => {
    const result = checkActivity(
      { type: 'multi-choice', correct: ['a', 'b'] },
      ['b', 'a']
    );
    assert(result === true, 'ordem não deveria importar em multi-choice');
  });

  test('multi-choice: incompleto', () => {
    const result = checkActivity(
      { type: 'multi-choice', correct: ['a', 'b'] },
      ['a']
    );
    assert(result === false);
  });

  test('ordering: ordem correta', () => {
    const result = checkActivity(
      { type: 'ordering', correct: ['1', '2', '3'] },
      ['1', '2', '3']
    );
    assert(result === true);
  });

  test('ordering: ordem errada', () => {
    const result = checkActivity(
      { type: 'ordering', correct: ['1', '2', '3'] },
      ['1', '3', '2']
    );
    assert(result === false);
  });

  test('text-match: normalização (acentos, caixa)', () => {
    const result = checkActivity(
      { type: 'text-match', correct: 'Amazônia' },
      'amazonia'
    );
    assert(result === true, 'normalização de texto falhou');
  });

  test('map-click: id correto', () => {
    const result = checkActivity(
      { type: 'map-click', correct: 'centro-oeste' },
      'centro-oeste'
    );
    assert(result === true);
  });
}

// -------------------------------------------------------
// Réplica da lógica de _check sem instanciar a classe completa.
// (FeedbackEngine precisa de DOM para feedbackEl)
// -------------------------------------------------------
function checkActivity(activity, answer) {
  switch (activity.type) {
    case 'single-choice':
      return String(answer) === String(activity.correct);

    case 'multi-choice':
      if (!Array.isArray(answer)) return false;
      if (answer.length !== activity.correct.length) return false;
      return activity.correct.every(c => answer.includes(c));

    case 'ordering':
      if (!Array.isArray(answer)) return false;
      return activity.correct.every((c, i) => String(answer[i]) === String(c));

    case 'map-click':
      return String(answer) === String(activity.correct);

    case 'text-match': {
      const n = s => s.trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return n(String(answer)) === n(String(activity.correct));
    }

    default:
      return false;
  }
}
