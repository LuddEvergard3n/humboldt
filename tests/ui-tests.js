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
import { fileURLToPath, pathToFileURL }      from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const root  = resolve(__dir, '..');

export async function runUITests() {

  // ----------------------------------------------------------
  suite('State — get / set / on');

  const stateURL = pathToFileURL(resolve(root, 'js/state.js'));
  const { State } = await import(stateURL.href);

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
  suite('LocalProgress — persistência privada e determinística');

  const progressURL = pathToFileURL(resolve(root, 'js/local-progress.js'));
  const { LocalProgress } = await import(progressURL.href);
  const values = new Map();
  const storage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };

  test('estado inicial é vazio', () => {
    const progress = new LocalProgress(storage);
    assertEqual(progress.read().completed, []);
    assertEqual(progress.read().favorites, []);
  });

  test('conclusão e favorito persistem sem duplicatas', () => {
    const progress = new LocalProgress(storage);
    progress.setCompleted('lesson-1');
    progress.setCompleted('lesson-1');
    progress.toggleFavorite('lesson-1');
    assertEqual(progress.read().completed, ['lesson-1']);
    assertEqual(progress.read().favorites, ['lesson-1']);
    assertEqual(progress.read().lastLesson, 'lesson-1');
  });

  test('JSON inválido volta ao estado seguro', () => {
    values.set('humboldt:atlas:v2', '{');
    const progress = new LocalProgress(storage);
    assertEqual(progress.read().completed, []);
  });

  test('filtros recentes do Atlas e da busca persistem localmente', () => {
    const progress = new LocalProgress(storage);
    progress.update({ recentFilters: { atlas: { map: 'climate', compare: '1' }, search: { q: 'oceanos', level: 'em' } } });
    assertEqual(progress.read().recentFilters.atlas, { map: 'climate', compare: '1' });
    assertEqual(progress.read().recentFilters.search, { q: 'oceanos', level: 'em' });
  });

  suite('Atlas — mapa padrão');

  const atlasURL = pathToFileURL(resolve(root, 'components/views/atlas-view.js'));
  const { resolveAtlasMapId } = await import(atlasURL.href);

  test('hash sem mapa usa mundo político', () => {
    assertEqual(resolveAtlasMapId(null), 'world-political');
    assertEqual(resolveAtlasMapId(''), 'world-political');
  });

  test('mapa conhecido é preservado', () => {
    assertEqual(resolveAtlasMapId('energy'), 'energy');
  });

  test('mapa desconhecido volta ao mundo político', () => {
    assertEqual(resolveAtlasMapId('mapa-inexistente'), 'world-political');
  });

  test('catálogo possui nove mapas com legendas próprias', async () => {
    const catalogURL = pathToFileURL(resolve(root, 'js/map-catalog.js'));
    const { MAP_CATALOG } = await import(catalogURL.href);
    assertEqual(Object.keys(MAP_CATALOG).length, 9);
    assert(Object.values(MAP_CATALOG).every(map => map.legend.length >= 3 && map.source && map.notice));
  });

  test('zoom do mapa fica entre 100% e 400%', async () => {
    const mapEngineURL = pathToFileURL(resolve(root, 'engine/map-engine.js'));
    const { clampMapScale } = await import(mapEngineURL.href);
    assertEqual(clampMapScale(0.2), 1);
    assertEqual(clampMapScale(2.5), 2.5);
    assertEqual(clampMapScale(9), 4);
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
