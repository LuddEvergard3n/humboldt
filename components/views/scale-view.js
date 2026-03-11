/**
 * scale-view.js — Navegação por escala e por fenômeno
 *
 * renderScale(params, state, router)     → mostra módulos por escala geográfica
 * renderPhenomenon(params, state, router) → mostra módulos por fenômeno, agrupados por nível
 */

import { loadJSON } from '../../js/data-loader.js';

const LEVEL_LABEL = {
  efi:  'Ensino Fundamental I',
  efii: 'Ensino Fundamental II',
  em:   'Ensino Médio',
};

const SCALES = {
  local:    'Local — bairro, cidade, município',
  regional: 'Regional — estado, região, bacia',
  nacional: 'Nacional — país, território',
  global:   'Global — continentes, fluxos mundiais',
};

const PHENOMENA = {
  water:      'Água — hidrografia, chuva, seca, enchentes',
  climate:    'Clima — temperatura, biomas, mudanças climáticas',
  migration:  'Migração — fluxos humanos, refúgio, mobilidade',
  energy:     'Energia — fontes, matrizes, conflito',
  border:     'Fronteira — Estado, soberania, conflito',
  inequality: 'Desigualdade — renda, acesso, periferização',
  transport:  'Transporte — redes, mobilidade, logística',
  city:       'Cidade — urbanização, metropolização',
};

/** Cria um module-card article. */
function makeCard(mod) {
  const article = document.createElement('article');
  article.className = 'module-card';
  article.setAttribute('role', 'button');
  article.setAttribute('tabindex', '0');
  article.dataset.nav = '#module/' + mod.id;
  article.innerHTML =
    '<h4 class="module-card-title">' + mod.title + '</h4>' +
    '<p class="module-card-tagline">' + mod.tagline + '</p>' +
    '<div class="module-card-meta">' +
      '<span class="module-card-count">' + mod.lessons + (mod.lessons === 1 ? ' lição' : ' lições') + '</span>' +
      '<span class="module-card-scales">' + (mod.scales || []).join(' · ') + '</span>' +
    '</div>';

  article.addEventListener('click', () => { window.location.hash = '#module/' + mod.id; });
  article.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); article.click(); }
  });
  return article;
}

/** Renderiza grupo de módulos agrupados por nível. */
function renderGroups(container, modules) {
  if (!modules.length) {
    container.innerHTML = '<p style="color:var(--color-text-muted);font-style:italic;">Nenhum módulo registrado ainda.</p>';
    return;
  }
  ['efi', 'efii', 'em'].forEach(level => {
    const mods = modules.filter(m => m.level === level);
    if (!mods.length) return;

    const group = document.createElement('div');
    group.className = 'modules-level';
    group.innerHTML = '<span class="level-tag">' + LEVEL_LABEL[level] + '</span>';

    const grid = document.createElement('div');
    grid.className = 'modules-grid';
    mods.forEach(m => grid.appendChild(makeCard(m)));
    group.appendChild(grid);
    container.appendChild(group);
  });
}

// ── Scale View ─────────────────────────────────────────────────────────────

export async function renderScale({ level }, _state, _router) {
  const { modules } = await loadJSON('data/modules.json');
  const label = SCALES[level] || level;
  const relevant = modules.filter(m => (m.scales || []).some(s => s.toLowerCase() === level));

  const el = document.createElement('div');
  el.className = 'view-module animate-fade-up';
  el.innerHTML =
    '<nav class="breadcrumb">' +
      '<a href="#home">Início</a>' +
      '<span class="breadcrumb-sep">&#8250;</span>' +
      '<span class="breadcrumb-current">Escala: ' + label.split(' — ')[0] + '</span>' +
    '</nav>' +
    '<header class="module-header"><div>' +
      '<p style="font-family:var(--font-mono);font-size:var(--size-xs);letter-spacing:var(--tracking-wider);text-transform:uppercase;color:var(--color-accent);margin-bottom:var(--space-3);">Navegação por Escala</p>' +
      '<h1 style="margin-bottom:var(--space-4);">' + label + '</h1>' +
    '</div></header>' +
    '<div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-12);flex-wrap:wrap;">' +
      Object.entries(SCALES).map(([key, val]) =>
        '<a href="#scale/' + key + '" class="btn btn-sm ' + (key === level ? 'btn-primary' : 'btn-outline') + '">' +
          val.split(' — ')[0] + '</a>').join('') +
    '</div>' +
    '<section id="scale-groups" style="border-top:1px solid var(--color-border);padding-top:var(--space-8);"></section>';

  renderGroups(el.querySelector('#scale-groups'), relevant);
  return el;
}

// ── Phenomenon View ─────────────────────────────────────────────────────────

export async function renderPhenomenon({ slug }, _state, _router) {
  const { modules } = await loadJSON('data/modules.json');
  const label = PHENOMENA[slug] || slug;
  const relevant = modules.filter(m => (m.phenomena || []).includes(slug));

  const el = document.createElement('div');
  el.className = 'view-module animate-fade-up';
  el.innerHTML =
    '<nav class="breadcrumb">' +
      '<a href="#home">Início</a>' +
      '<span class="breadcrumb-sep">&#8250;</span>' +
      '<span class="breadcrumb-current">Fenômeno: ' + label.split(' — ')[0] + '</span>' +
    '</nav>' +
    '<header class="module-header"><div>' +
      '<p style="font-family:var(--font-mono);font-size:var(--size-xs);letter-spacing:var(--tracking-wider);text-transform:uppercase;color:var(--color-accent);margin-bottom:var(--space-3);">Navegação por Fenômeno</p>' +
      '<h1 style="margin-bottom:0;">' + label + '</h1>' +
    '</div></header>' +
    '<div style="display:flex;gap:var(--space-2);margin:var(--space-8) 0 var(--space-12);flex-wrap:wrap;">' +
      Object.entries(PHENOMENA).map(([key, val]) =>
        '<a href="#phenomenon/' + key + '" class="btn btn-sm ' + (key === slug ? 'btn-primary' : 'btn-outline') + '">' +
          val.split(' — ')[0] + '</a>').join('') +
    '</div>' +
    '<section id="phen-groups" style="border-top:1px solid var(--color-border);padding-top:var(--space-8);"></section>';

  renderGroups(el.querySelector('#phen-groups'), relevant);
  return el;
}
