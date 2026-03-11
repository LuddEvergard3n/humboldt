/**
 * home-view.js — Página inicial do Humboldt
 *
 * Assinatura: renderHome(params, state, router) → Promise<HTMLElement>
 *
 * Convenção de classes (canônica):
 *   Hero:        .home-hero > .hero-inner > .hero-text | .hero-globe
 *                .hero-eyebrow, .hero-title, .hero-lead, .hero-actions
 *   Scale strip: .home-scale-strip > .scale-strip-inner
 *                .scale-strip-label, .scale-grid > .scale-item
 *                .scale-item-name, .scale-item-desc
 *   Ops:         .home-ops > .ops-inner
 *                .ops-heading, .ops-grid > .ops-card
 *                .ops-symbol, .ops-card-title, .ops-card-desc
 *   Módulos:     .home-modules > .modules-inner
 *                .modules-heading, .modules-level > .level-tag, .modules-grid
 *                .module-card (definido em components.css)
 */

import { createGlobeDecoration } from '../globe-decoration.js';
import { loadJSON }               from '../../js/data-loader.js';

const LEVEL_LABEL = {
  efi:  'Ensino Fundamental I',
  efii: 'Ensino Fundamental II',
  em:   'Ensino Médio',
};

const COG_OPS = [
  { symbol: '◎', title: 'Observar',    desc: 'Ler o espaço com atenção analítica.' },
  { symbol: '⇄', title: 'Comparar',    desc: 'Encontrar semelhanças e diferenças entre lugares.' },
  { symbol: '↗', title: 'Relacionar',  desc: 'Conectar fenômenos em diferentes escalas.' },
  { symbol: '◈', title: 'Interpretar', desc: 'Construir explicações fundamentadas.' },
];

const SCALE_ITEMS = [
  { id: 'local',    name: 'Local',    desc: 'bairro, cidade' },
  { id: 'regional', name: 'Regional', desc: 'estado, região' },
  { id: 'nacional', name: 'Nacional', desc: 'país' },
  { id: 'global',   name: 'Global',   desc: 'mundo' },
];

export async function renderHome(_params, _state, router) {
  const { modules } = await loadJSON('data/modules.json');

  const container = document.createElement('div');
  container.className = 'home-root';

  container.innerHTML = `

    <!-- ── Hero ── -->
    <section class="home-hero" aria-label="Introdução">
      <div class="hero-inner">
        <div class="hero-text">
          <p class="hero-eyebrow">Atlas Interativo de Geografia</p>
          <h1 class="hero-title">O espaço explica<br>o mundo.</h1>
          <p class="hero-lead">
            Atlas interativo para o Ensino Fundamental e Médio.
            Fenômenos, mapas e análise geográfica em múltiplas escalas.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary" data-nav="#module/efi-place">
              Começar pelo EFI
            </button>
            <button class="btn btn-outline" data-nav="#module/efii-concepts">
              Começar pelo EFII
            </button>
          </div>
        </div>
        <div class="hero-globe" id="globe-slot" aria-hidden="true"></div>
      </div>
    </section>

    <!-- ── Faixa de escalas ── -->
    <section class="home-scale-strip" aria-label="Escalas geográficas">
      <div class="scale-strip-inner">
        <p class="scale-strip-label">Escalas de análise</p>
        <div class="scale-grid" role="list">
          ${SCALE_ITEMS.map(s => `
            <div class="scale-item" data-nav="#scale/${s.id}"
                 role="listitem button" tabindex="0"
                 aria-label="Escala ${s.name}: ${s.desc}">
              <span class="scale-item-name">${s.name}</span>
              <span class="scale-item-desc">${s.desc}</span>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- ── Operações cognitivas ── -->
    <section class="home-ops" aria-label="Pensamento geográfico">
      <div class="ops-inner">
        <div class="ops-header">
          <span class="ops-eyebrow">Pensamento geográfico</span>
          <h2 class="ops-heading">Pensar geograficamente</h2>
        </div>
        <div class="ops-grid">
          ${COG_OPS.map(op => `
            <div class="ops-card">
              <span class="ops-symbol" aria-hidden="true">${op.symbol}</span>
              <h3 class="ops-card-title">${op.title}</h3>
              <p class="ops-card-desc">${op.desc}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- ── Módulos por nível ── -->
    <section class="home-modules" aria-label="Módulos de estudo">
      <div class="modules-inner">
        <h2 class="modules-heading">Módulos</h2>
        ${['efi', 'efii', 'em'].map(level => {
          const mods = modules.filter(m => m.level === level && m.lessons > 0);
          if (!mods.length) return '';
          return `
            <div class="modules-level">
              <span class="level-tag">${LEVEL_LABEL[level]}</span>
              <div class="modules-grid">
                ${mods.map(m => `
                  <article class="module-card" data-nav="#module/${m.id}"
                           role="button" tabindex="0">
                    <h4 class="module-card-title">${m.title}</h4>
                    <p class="module-card-tagline">${m.tagline}</p>
                    <div class="module-card-meta">
                      <span class="module-card-count">${m.lessons} lição${m.lessons !== 1 ? 'ões' : ''}</span>
                      <span class="module-card-scales">${(m.scales || []).join(' · ')}</span>
                    </div>
                  </article>`).join('')}
              </div>
            </div>`;
        }).join('')}
      </div>
    </section>

  `;

  // Globo decorativo
  const slot = container.querySelector('#globe-slot');
  if (slot) slot.appendChild(createGlobeDecoration());

  // Navegação por data-nav
  container.querySelectorAll('[data-nav]').forEach(el => {
    const dest = el.dataset.nav;
    const go = () => {
      if (router && typeof router.navigate === 'function') {
        router.navigate(dest);
      } else {
        window.location.hash = dest;
      }
    };
    el.addEventListener('click', go);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });

  return container;
}
