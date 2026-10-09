/**
 * data-tests.js — Testes de integridade dos arquivos JSON
 *
 * Verifica:
 *  - modules.json: campos obrigatórios, unicidade de ids
 *  - data/lessons/index.json: campos mínimos, referência a módulo válido
 *  - data/lessons/{id}.json (individuais): campos obrigatórios por lição
 */

import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname }          from 'node:path';
import { fileURLToPath }             from 'node:url';
import { suite, test, assert, assertEqual } from './test-runner.js';

const __dir  = dirname(fileURLToPath(import.meta.url));
const root   = resolve(__dir, '..');

function readJSON(rel) {
  return JSON.parse(readFileSync(resolve(root, rel), 'utf-8'));
}

export async function runDataTests() {
  suite('data/modules.json');

  let modules;

  test('arquivo é válido JSON', () => {
    modules = readJSON('data/modules.json');
    assert(modules !== null);
  });

  test('possui propriedade "modules" como array', () => {
    assert(Array.isArray(modules.modules));
  });

  test('cada módulo tem id, title, tagline, order, lessons, scales', () => {
    for (const m of modules.modules) {
      assert(typeof m.id      === 'string',  `sem id: ${JSON.stringify(m)}`);
      assert(typeof m.title   === 'string',  `sem title: ${m.id}`);
      assert(typeof m.order   === 'number',  `sem order: ${m.id}`);
      assert(typeof m.lessons === 'number',  `sem lessons: ${m.id}`);
      assert(Array.isArray(m.scales),        `sem scales: ${m.id}`);
    }
  });

  test('ids dos módulos são únicos', () => {
    const ids = modules.modules.map(m => m.id);
    assertEqual(new Set(ids).size, ids.length, 'ids duplicados');
  });

  test('Atlas 2.0 possui 47 módulos', () => {
    assertEqual(modules.modules.length, 47);
  });

  test('possui os 8 módulos obrigatórios', () => {
    const required = ['cartography','landscape','brazil','population',
                      'urbanization','economy','geopolitics','globalization'];
    const ids = modules.modules.map(m => m.id);
    for (const r of required) {
      assert(ids.includes(r), `módulo obrigatório ausente: ${r}`);
    }
  });

  // ----------------------------------------------------------
  suite('data/lessons/index.json');

  const validModuleIds = modules?.modules?.map(m => m.id) ?? [];
  let index;

  test('arquivo existe e é válido JSON', () => {
    index = readJSON('data/lessons/index.json');
    assert(index !== null);
  });

  test('cada entrada tem moduleId, title, summary, activityType', () => {
    for (const [id, meta] of Object.entries(index)) {
      assert(typeof meta.moduleId     === 'string', `sem moduleId: ${id}`);
      assert(typeof meta.title        === 'string', `sem title: ${id}`);
      assert(typeof meta.activityType === 'string', `sem activityType: ${id}`);
    }
  });

  test('todo moduleId no índice referencia um módulo existente', () => {
    for (const [id, meta] of Object.entries(index)) {
      assert(validModuleIds.includes(meta.moduleId),
             `lição "${id}" tem moduleId inválido: "${meta.moduleId}"`);
    }
  });

  test('Atlas 2.0 possui 170 lições indexadas', () => {
    assertEqual(Object.keys(index).length, 170);
  });

  test('novos módulos possuem data, fontes e quatro lições', () => {
    const newIds = ['em-demography', 'em-agriculture-land', 'em-oceans',
      'em-risks-resilience', 'es-institutions-development', 'es-quantitative-geography'];
    for (const id of newIds) {
      const module = modules.modules.find(item => item.id === id);
      assert(module, `módulo ausente: ${id}`);
      assert(/^\d{4}-\d{2}-\d{2}$/.test(module.lastReviewed), `data inválida: ${id}`);
      assertEqual(module.lessons, 4, `quantidade de lições inválida: ${id}`);
      assert(Array.isArray(module.sources) && module.sources.length > 0, `sem fontes: ${id}`);
      for (const source of module.sources) {
        assert(/^https:\/\//.test(source.url), `URL de fonte inválida: ${id}`);
      }
    }
  });

  // ----------------------------------------------------------
  suite('data/lessons/{id}.json — arquivos individuais');

  const lessonFiles = readdirSync(resolve(root, 'data/lessons'))
    .filter(f => f.endsWith('.json') && f !== 'index.json');

  test(`existem ${lessonFiles.length} arquivos de lição`, () => {
    assertEqual(lessonFiles.length, 170, 'inventário de lições divergente');
  });

  for (const file of lessonFiles) {
    const id = file.replace('.json', '');

    test(`${file} é JSON válido`, () => {
      readJSON(`data/lessons/${file}`);
    });

    test(`${file} tem id, moduleId, title, phenomenon, activity, teacher`, () => {
      const l = readJSON(`data/lessons/${file}`);
      assertEqual(l.id, id, `id no JSON (${l.id}) difere do nome do arquivo (${id})`);
      assert(typeof l.moduleId === 'string',   `sem moduleId: ${id}`);
      assert(typeof l.title    === 'string',   `sem title: ${id}`);
      assert(l.phenomenon?.title,              `sem phenomenon.title: ${id}`);
      assert(l.phenomenon?.text,               `sem phenomenon.text: ${id}`);
      assert(l.activity,                       `sem activity: ${id}`);
      const noCorrect = ['layer-toggle','flow-map','before-after','map-click','compass','scale'];
      if (!noCorrect.includes(l.activityType)) {
        assert(l.activity.correct !== undefined, `sem activity.correct: ${id}`);
      }
      assert(l.teacher?.objective,             `sem teacher.objective: ${id}`);
      assert(l.teacher?.answer,                `sem teacher.answer: ${id}`);
    });

    test(`${file} está listado no index.json`, () => {
      assert(index && index[id], `"${id}" ausente no index.json`);
    });
  }
}
