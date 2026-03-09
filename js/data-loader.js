/**
 * data-loader.js — Utilitários de carregamento de dados
 *
 * loadJSON(path)       — carrega qualquer JSON com cache em memória
 * loadSVG(path)        — carrega SVG como string com cache em memória
 * loadLesson(id)       — carrega lição de data/lessons/{id}.json
 * loadLessonsIndex()   — carrega o índice leve data/lessons/index.json
 * invalidateCache(path)— remove entrada do cache
 *
 * Todos os paths são relativos à raiz do servidor.
 * O cache é por processo (tab): recarregar a página limpa o cache.
 */

/** @type {Map<string, any>} */
const _cache = new Map();

/**
 * Carrega JSON de qualquer path, com cache em memória.
 * @param   {string} path  - relativo à raiz do servidor
 * @returns {Promise<any>}
 */
export async function loadJSON(path) {
  if (_cache.has(path)) return _cache.get(path);
  const res = await fetch(path);
  if (!res.ok) throw new Error(`loadJSON: HTTP ${res.status} — ${path}`);
  const data = await res.json();
  _cache.set(path, data);
  return data;
}

/**
 * Carrega SVG como string, com cache em memória.
 * @param   {string} path
 * @returns {Promise<string>}
 */
export async function loadSVG(path) {
  if (_cache.has(path)) return _cache.get(path);
  const res = await fetch(path);
  if (!res.ok) throw new Error(`loadSVG: HTTP ${res.status} — ${path}`);
  const text = await res.text();
  _cache.set(path, text);
  return text;
}

/**
 * Carrega uma lição individual de data/lessons/{id}.json.
 * @param   {string} id  - ex: "cartography-1"
 * @returns {Promise<Object>}
 */
export async function loadLesson(id) {
  return loadJSON(`data/lessons/${id}.json`);
}

/**
 * Carrega o índice leve de lições (sem corpo completo).
 * Útil para listar lições de um módulo sem carregar todos os JSONs.
 * @returns {Promise<Object>} — mapa { id: { moduleId, title, summary, activityType } }
 */
export async function loadLessonsIndex() {
  return loadJSON('data/lessons/index.json');
}

/**
 * Remove uma entrada do cache (útil em desenvolvimento).
 * @param {string} path
 */
export function invalidateCache(path) {
  _cache.delete(path);
}
