/**
 * scale-view.js — Navegação por escala (local / regional / nacional / global)
 * phenomenon-view.js — Navegação por fenômeno (água, clima, migração…)
 *
 * Ambas exportadas neste arquivo por serem estruturalmente similares.
 */

import { loadJSON } from '../../js/data-loader.js';

// -------------------------------------------------------
// Scale View
// -------------------------------------------------------

/** @param {Object} params - { level: string } */
export async function renderScale({ level }, _state, _router) {
  const modulesData = await loadJSON('data/modules.json');

  const scales = {
    local:     'Local — bairro, cidade, município',
    regional:  'Regional — estado, região, bacia',
    nacional:  'Nacional — país, território',
    global:    'Global — continentes, fluxos mundiais',
  };

  const label = scales[level] || level;

  // Filtra módulos que cobrem esta escala
  const relevant = (modulesData?.modules || []).filter(m =>
    (m.scales || []).some(s => s.toLowerCase() === level)
  );

  const el = document.createElement('div');
  el.className = 'view-module animate-fade-up';
  el.innerHTML = `
    <nav class="breadcrumb">
      <a href="#home">Início</a>
      <span class="breadcrumb-sep">&#8250;</span>
      <span class="breadcrumb-current">Escala: ${label}</span>
    </nav>
    <header class="module-header">
      <div>
        <p style="font-family:var(--font-mono);font-size:var(--size-xs);
                   letter-spacing:var(--tracking-wider);text-transform:uppercase;
                   color:var(--color-accent);margin-bottom:var(--space-3);">
          Navegação por Escala
        </p>
        <h1 style="margin-bottom:var(--space-4);">${label}</h1>
        <p style="font-size:var(--size-md);color:var(--color-text-mid);">
          Conteúdos que trabalham esta escala geográfica.
        </p>
      </div>
    </header>

    <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-8);flex-wrap:wrap;">
      ${Object.entries(scales).map(([key, val]) => `
        <a href="#scale/${key}"
           class="btn ${key === level ? 'btn-primary' : 'btn-outline'} btn-sm">
          ${val.split(' — ')[0]}
        </a>`).join('')}
    </div>

    <section>
      <p class="modules-section-title">Módulos nesta escala</p>
      <div class="modules-grid stagger" id="scale-grid"></div>
    </section>
  `;

  const grid = el.querySelector('#scale-grid');
  if (relevant.length === 0) {
    grid.innerHTML = `<p style="color:var(--color-text-muted);font-style:italic;">
      Nenhum módulo registrado para esta escala ainda.</p>`;
  } else {
    relevant.forEach(mod => {
      const card = document.createElement('a');
      card.href      = `#module/${mod.id}`;
      card.className = 'module-card animate-fade-up';
      card.innerHTML = `
        <span class="module-card-number">${String(mod.order).padStart(2, '0')}</span>
        <span class="module-card-title">${mod.title}</span>
        <span class="module-card-desc">${mod.tagline}</span>`;
      grid.appendChild(card);
    });
  }

  return el;
}

// -------------------------------------------------------
// Phenomenon View
// -------------------------------------------------------

const PHENOMENON_LABELS = {
  water:       'Água — hidrografia, chuva, seca, enchentes',
  climate:     'Clima — temperatura, biomas, mudanças climáticas',
  migration:   'Migração — fluxos humanos, refúgio, mobilidade',
  energy:      'Energia — fontes, matrizes, conflito',
  border:      'Fronteira — Estado, soberania, conflito',
  inequality:  'Desigualdade — renda, acesso, periferização',
  transport:   'Transporte — redes, mobilidade, logística',
  city:        'Cidade — urbanização, metropolização',
};

/** @param {Object} params - { slug: string } */
export async function renderPhenomenon({ slug }, _state, _router) {
  const modulesData = await loadJSON('data/modules.json');
  const label = PHENOMENON_LABELS[slug] || slug;

  // Filtra módulos que mencionam este fenômeno
  const relevant = (modulesData?.modules || []).filter(m =>
    (m.phenomena || []).includes(slug)
  );

  const el = document.createElement('div');
  el.className = 'view-module animate-fade-up';
  el.innerHTML = `
    <nav class="breadcrumb">
      <a href="#home">Início</a>
      <span class="breadcrumb-sep">&#8250;</span>
      <span class="breadcrumb-current">Fenômeno: ${label.split(' — ')[0]}</span>
    </nav>
    <header class="module-header">
      <div>
        <p style="font-family:var(--font-mono);font-size:var(--size-xs);
                   letter-spacing:var(--tracking-wider);text-transform:uppercase;
                   color:var(--color-accent);margin-bottom:var(--space-3);">
          Navegação por Fenômeno
        </p>
        <h1 style="margin-bottom:var(--space-4);">${label}</h1>
      </div>
    </header>

    <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-8);flex-wrap:wrap;">
      ${Object.entries(PHENOMENON_LABELS).map(([key, val]) => `
        <a href="#phenomenon/${key}"
           class="btn ${key === slug ? 'btn-primary' : 'btn-outline'} btn-sm">
          ${val.split(' — ')[0]}
        </a>`).join('')}
    </div>

    <section>
      <p class="modules-section-title">Módulos relacionados</p>
      <div class="modules-grid stagger" id="phenomenon-grid"></div>
    </section>
  `;

  const grid = el.querySelector('#phenomenon-grid');
  if (relevant.length === 0) {
    grid.innerHTML = `<p style="color:var(--color-text-muted);font-style:italic;">
      Nenhum módulo registrado para este fenômeno ainda.</p>`;
  } else {
    relevant.forEach(mod => {
      const card = document.createElement('a');
      card.href      = `#module/${mod.id}`;
      card.className = 'module-card animate-fade-up';
      card.innerHTML = `
        <span class="module-card-number">${String(mod.order).padStart(2, '0')}</span>
        <span class="module-card-title">${mod.title}</span>
        <span class="module-card-desc">${mod.tagline}</span>`;
      grid.appendChild(card);
    });
  }

  return el;
}
