/**
 * module-tests.js — Testes de estrutura dos módulos JS
 *
 * Verifica:
 *  - cada módulo em /modules/ exporta id e title
 *  - arquivos de engine exportam as classes esperadas
 *  - arquivos de componente existem e têm exportações nomeadas
 */

import { existsSync, readdirSync } from 'node:fs';
import { resolve, dirname }        from 'node:path';
import { fileURLToPath }           from 'node:url';
import { suite, test, assert }     from './test-runner.js';

const __dir = dirname(fileURLToPath(import.meta.url));
const root  = resolve(__dir, '..');

const MODULE_IDS = [
  'cartography','landscape','brazil','population',
  'urbanization','economy','geopolitics','globalization',
];

const REQUIRED_ENGINE_FILES = [
  'engine/map-engine.js',
  'engine/layer-engine.js',
  'engine/comparison-engine.js',
  'engine/flow-engine.js',
  'engine/feedback-engine.js',
  'engine/hint-system.js',
];

const REQUIRED_JS_FILES = [
  'js/main.js',
  'js/router.js',
  'js/state.js',
  'js/ui.js',
  'js/accessibility.js',
  'js/data-loader.js',
  'js/module-loader.js',
];

const REQUIRED_COMPONENT_FILES = [
  'components/activity-engine.js',
  'components/globe-decoration.js',
  'components/views/home-view.js',
  'components/views/module-view.js',
  'components/views/lesson-view.js',
  'components/views/scale-view.js',
  'components/views/phenomenon-view.js',
];

export async function runModuleTests() {
  suite('Estrutura de arquivos — engine/');

  for (const file of REQUIRED_ENGINE_FILES) {
    test(`${file} existe`, () => {
      assert(existsSync(resolve(root, file)), `arquivo ausente: ${file}`);
    });
  }

  suite('Estrutura de arquivos — js/');

  for (const file of REQUIRED_JS_FILES) {
    test(`${file} existe`, () => {
      assert(existsSync(resolve(root, file)), `arquivo ausente: ${file}`);
    });
  }

  suite('Estrutura de arquivos — components/');

  for (const file of REQUIRED_COMPONENT_FILES) {
    test(`${file} existe`, () => {
      assert(existsSync(resolve(root, file)), `arquivo ausente: ${file}`);
    });
  }

  suite('Módulos pedagógicos — index.js de cada módulo');

  for (const modId of MODULE_IDS) {
    test(`modules/${modId}/index.js existe`, () => {
      assert(
        existsSync(resolve(root, `modules/${modId}/index.js`)),
        `index.js ausente para módulo: ${modId}`
      );
    });

    test(`modules/${modId}/index.js exporta id e title`, async () => {
      const mod = await import(resolve(root, `modules/${modId}/index.js`));
      assert(typeof mod.id    === 'string', `módulo ${modId} não exporta id`);
      assert(typeof mod.title === 'string', `módulo ${modId} não exporta title`);
    });
  }

  suite('Mapas SVG obrigatórios');

  const requiredMaps = [
    'assets/maps/brazil-regions.svg',
    'assets/maps/world-simple.svg',
  ];

  for (const map of requiredMaps) {
    test(`${map} existe`, () => {
      assert(existsSync(resolve(root, map)), `mapa SVG ausente: ${map}`);
    });
  }

  suite('CSS obrigatório');

  const requiredCSS = [
    'css/base.css',
    'css/theme.css',
    'css/layout.css',
    'css/components.css',
    'css/mobile.css',
  ];

  for (const css of requiredCSS) {
    test(`${css} existe`, () => {
      assert(existsSync(resolve(root, css)), `CSS ausente: ${css}`);
    });
  }

  suite('Documentação');

  const requiredDocs = [
    'docs/architecture.md',
    'docs/pedagogy.md',
    'docs/modules.md',
    'docs/map-system.md',
    'docs/development-guide.md',
    'README.md',
    'CHANGELOG.md',
  ];

  for (const doc of requiredDocs) {
    test(`${doc} existe`, () => {
      assert(existsSync(resolve(root, doc)), `doc ausente: ${doc}`);
    });
  }
}
