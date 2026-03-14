/**
 * module-loader.js — Lazy import dos módulos pedagógicos
 *
 * Todos os módulos EFI, EFII e EM são carregados sob demanda.
 * Adicionar um módulo novo: incluir entrada no mapa abaixo.
 */

const MODULE_MAP = {
  // EFI
  'efi-place':           () => import('../modules/efi-place/index.js'),
  'efi-landscape':       () => import('../modules/efi-landscape/index.js'),
  'efi-society':         () => import('../modules/efi-society/index.js'),
  'efi-brazil':          () => import('../modules/efi-brazil/index.js'),
  // EFII
  'efii-concepts':       () => import('../modules/efii-concepts/index.js'),
  'cartography':         () => import('../modules/cartography/index.js'),
  'efii-physical':       () => import('../modules/efii-physical/index.js'),
  'brazil':              () => import('../modules/brazil/index.js'),
  'efii-americas':       () => import('../modules/efii-americas/index.js'),
  'efii-africa':         () => import('../modules/efii-africa/index.js'),
  'efii-europe':         () => import('../modules/efii-europe/index.js'),
  'efii-asia':           () => import('../modules/efii-asia/index.js'),
  'geopolitics':         () => import('../modules/geopolitics/index.js'),
  'population':          () => import('../modules/population/index.js'),
  'landscape':           () => import('../modules/landscape/index.js'),
  'urbanization':        () => import('../modules/urbanization/index.js'),
  'globalization':       () => import('../modules/globalization/index.js'),
  // EM
  'economy':             () => import('../modules/economy/index.js'),
  'em-environment':      () => import('../modules/em-environment/index.js'),
  'em-geopolitics':      () => import('../modules/em-geopolitics/index.js'),
  'em-urban-regional':   () => import('../modules/em-urban-regional/index.js'),
  'em-cartography':      () => import('../modules/em-cartography/index.js'),
  'em-brazil-challenges':   () => import('../modules/em-brazil-challenges/index.js'),
  'em-climatology':         () => import('../modules/em-climatology/index.js'),
  'em-health-geo':          () => import('../modules/em-health-geo/index.js'),
  'em-natural-resources':   () => import('../modules/em-natural-resources/index.js'),
  'em-asia-pacific':        () => import('../modules/em-asia-pacific/index.js'),
  'em-africa':              () => import('../modules/em-africa/index.js'),
  'em-latin-america':       () => import('../modules/em-latin-america/index.js'),
  'em-migration':           () => import('../modules/em-migration/index.js'),
  'em-energy':              () => import('../modules/em-energy/index.js'),
  'em-transport':           () => import('../modules/em-transport/index.js'),

  // Ensino Superior — formato article (sem lições)
  'es-epistemology':        () => import('../modules/es-epistemology/index.js'),
  'es-space-theory':        () => import('../modules/es-space-theory/index.js'),
  'es-geopolitics-classic': () => import('../modules/es-geopolitics-classic/index.js'),
  'es-cartography-critic':  () => import('../modules/es-cartography-critic/index.js'),
  'es-economic-geography':  () => import('../modules/es-economic-geography/index.js'),
  'es-methodology':         () => import('../modules/es-methodology/index.js'),
  'es-urban-geography':     () => import('../modules/es-urban-geography/index.js'),
  'es-physical-geography':  () => import('../modules/es-physical-geography/index.js'),
  'es-postcolonial-feminist': () => import('../modules/es-postcolonial-feminist/index.js'),
};

export async function loadModule(id) {
  const loader = MODULE_MAP[id];
  if (!loader) throw new Error(`Módulo desconhecido: ${id}`);
  return loader();
}

export function listModuleIds() {
  return Object.keys(MODULE_MAP);
}
