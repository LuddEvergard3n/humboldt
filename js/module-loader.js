/**
 * module-loader.js — Carregamento dinâmico de módulos pedagógicos
 *
 * Cada módulo em /modules/{id}/index.js exporta:
 *   { id, title, lessons: Lesson[] }
 *
 * O carregamento é lazy: o módulo só é importado quando acessado.
 * O resultado é cacheado em memória para a sessão.
 */

/** Cache: moduleId → módulo importado */
const _moduleCache = new Map();

/**
 * Mapa de ids conhecidos para caminhos de importação.
 * Necessário porque import() com string dinâmica pura
 * não funciona em todos os ambientes estáticos.
 */
const MODULE_PATHS = {
  cartography:  () => import('../modules/cartography/index.js'),
  landscape:    () => import('../modules/landscape/index.js'),
  brazil:       () => import('../modules/brazil/index.js'),
  population:   () => import('../modules/population/index.js'),
  urbanization: () => import('../modules/urbanization/index.js'),
  economy:      () => import('../modules/economy/index.js'),
  geopolitics:  () => import('../modules/geopolitics/index.js'),
  globalization:() => import('../modules/globalization/index.js'),
};

/**
 * Carrega (e cacheia) o módulo pedagógico pelo id.
 *
 * @param {string} moduleId
 * @returns {Promise<Object|null>} módulo importado ou null
 */
export async function loadModule(moduleId) {
  if (_moduleCache.has(moduleId)) return _moduleCache.get(moduleId);

  const importer = MODULE_PATHS[moduleId];
  if (!importer) {
    console.warn(`loadModule: módulo desconhecido "${moduleId}"`);
    return null;
  }

  try {
    const mod = await importer();
    _moduleCache.set(moduleId, mod);
    return mod;
  } catch (err) {
    console.warn(`loadModule: falha ao importar "${moduleId}":`, err.message);
    return null;
  }
}
