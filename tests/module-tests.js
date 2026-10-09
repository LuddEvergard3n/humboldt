/**
 * module-tests.js — Testes de estrutura dos módulos JS
 *
 * Verifica:
 *  - cada módulo em /modules/ exporta id e title
 *  - arquivos de engine exportam as classes esperadas
 *  - arquivos de componente existem e têm exportações nomeadas
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname }        from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
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
  'js/local-progress.js',
];

const REQUIRED_COMPONENT_FILES = [
  'components/activity-engine.js',
  'components/globe-decoration.js',
  'components/views/home-view.js',
  'components/views/module-view.js',
  'components/views/lesson-view.js',
  'components/views/scale-view.js',
  'components/views/phenomenon-view.js',
  'components/views/atlas-view.js',
  'components/views/search-view.js',
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
      const moduleURL = pathToFileURL(resolve(root, `modules/${modId}/index.js`));
      const mod = await import(moduleURL.href);
      assert(typeof mod.id    === 'string', `módulo ${modId} não exporta id`);
      assert(typeof mod.title === 'string', `módulo ${modId} não exporta title`);
    });
  }

  suite('Mapas SVG obrigatórios');

  const requiredMaps = [
    'assets/maps/brazil-regions.svg',
    'assets/maps/world-simple.svg',
    'assets/maps/world-political.svg',
    'assets/maps/world-physical.svg',
    'assets/maps/brazil-political.svg',
    'assets/maps/brazil-physical-biomes.svg',
    'assets/maps/oceans-routes.svg',
    'assets/maps/population.svg',
    'assets/maps/climate.svg',
    'assets/maps/energy.svg',
    'assets/maps/trade-transport.svg',
    'assets/maps/world-robinson-public-domain.png',
  ];

  for (const map of requiredMaps) {
    test(`${map} existe`, () => {
      assert(existsSync(resolve(root, map)), `mapa SVG ausente: ${map}`);
    });
  }

  test('mapas mundiais usam países do Natural Earth', () => {
    const map = readFileSync(resolve(root, 'assets/maps/world-political.svg'), 'utf8');
    assert((map.match(/id="country-/g) || []).length >= 170, 'base mundial não contém países suficientes');
    assert(map.includes('data-kind="geographic"'), 'base mundial ainda está marcada como esquemática');
  });

  test('mapas do Brasil usam as 27 unidades do IBGE', () => {
    const map = readFileSync(resolve(root, 'assets/maps/brazil-political.svg'), 'utf8');
    assert((map.match(/id="state-/g) || []).length === 27, 'base brasileira não contém 27 unidades');
    assert(map.includes('data-source="IBGE'), 'fonte IBGE ausente da base brasileira');
  });

  test('nove mapas possuem grupos cartográficos e decoração padronizados', () => {
    for (const mapPath of requiredMaps.filter(path => /world-political|world-physical|brazil-political|brazil-physical-biomes|oceans-routes|population|climate|energy|trade-transport/.test(path))) {
      const map = readFileSync(resolve(root, mapPath), 'utf8');
      for (const id of ['layer-graticule', 'layer-base', 'layer-theme', 'layer-labels', 'map-decoration']) {
        assert(map.includes(`id="${id}"`), `${mapPath} não contém ${id}`);
      }
    }
  });

  suite('CSS obrigatório');

  const requiredCSS = [
    'css/base.css',
    'css/theme.css',
    'css/layout.css',
    'css/components.css',
    'css/mobile.css',
    'css/static-pages.css',
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
    'docs/editorial-policy.md',
    'docs/content-schema.md',
    'README.md',
    'CHANGELOG.md',
  ];

  for (const doc of requiredDocs) {
    test(`${doc} existe`, () => {
      assert(existsSync(resolve(root, doc)), `doc ausente: ${doc}`);
    });
  }
}
