/**
 * home-view.js — Renderizador da página inicial
 */

import { loadJSON }             from '../../js/data-loader.js';
import { createGlobeDecoration } from '../globe-decoration.js';

export async function renderHome(_params, state, router) {
  const modulesData = await loadJSON('data/modules.json');

  const el = document.createElement('div');
  el.className = 'view-home';

  el.innerHTML = `
    <!-- Hero -->
    <section class="home-hero animate-fade-up">
      <div class="home-hero-text">
        <p class="eyebrow">Atlas Interativo de Geografia</p>
        <h1>Humboldt</h1>
        <p class="lead">
          Uma ferramenta para ensinar o aluno a ver o espaço,
          ler mapas, interpretar relações e perceber que vive
          dentro da Geografia — não apenas diante dela.
        </p>
        <div class="hero-ctas">
          <a href="#module/cartography" class="btn btn-primary btn-lg">
            Começar: Cartografia Viva
          </a>
          <a href="#module/brazil" class="btn btn-outline btn-lg">
            Brasil Espacial
          </a>
        </div>
      </div>
      <div class="home-hero-visual" id="globe-container"></div>
    </section>

    <!-- Escala cartográfica — navegação por zoom conceitual -->
    <section class="home-scale-strip animate-fade-up">
      <div class="scale-strip-inner">
        <span class="scale-strip-label">Navegar por escala</span>
        <div class="scale-strip-levels">
          <a href="#scale/local"    class="scale-level">
            <span class="scale-level-name">Local</span>
            <span class="scale-level-eg">bairro · cidade</span>
          </a>
          <span class="scale-level-arrow">›</span>
          <a href="#scale/regional" class="scale-level">
            <span class="scale-level-name">Regional</span>
            <span class="scale-level-eg">estado · bacia</span>
          </a>
          <span class="scale-level-arrow">›</span>
          <a href="#scale/nacional" class="scale-level">
            <span class="scale-level-name">Nacional</span>
            <span class="scale-level-eg">país · território</span>
          </a>
          <span class="scale-level-arrow">›</span>
          <a href="#scale/global"   class="scale-level">
            <span class="scale-level-name">Global</span>
            <span class="scale-level-eg">continente · planeta</span>
          </a>
        </div>
        <a href="#phenomenon/water" class="scale-strip-phenomena">
          Navegar por fenômeno:
          <span>água</span><span>clima</span><span>migração</span><span>energia</span><span>fronteira</span>
        </a>
      </div>
    </section>

    <!-- Quatro operações -->
    <section class="home-ops animate-fade-up">
      <p class="section-eyebrow">Quatro operações do pensamento geográfico</p>
      <div class="ops-grid stagger" id="ops-grid"></div>
    </section>

    <!-- Módulos -->
    <section class="home-modules animate-fade-up">
      <p class="section-eyebrow">Módulos</p>
      <div class="modules-grid stagger" id="modules-grid"></div>
    </section>
  `;

  // Globo
  const globeContainer = el.querySelector('#globe-container');
  if (globeContainer) globeContainer.appendChild(createGlobeDecoration());

  // Quatro operações
  const ops = [
    { n: '01', t: 'Ver', d: 'Observar mapas, imagens, paisagens e fluxos com atenção e método.' },
    { n: '02', t: 'Ler', d: 'Interpretar legenda, escala, localização, proporção e fronteira.' },
    { n: '03', t: 'Relacionar', d: 'Conectar clima, relevo, economia, cidade, migração e poder.' },
    { n: '04', t: 'Aplicar', d: 'Trazer a Geografia para perguntas concretas do cotidiano.' },
  ];

  const opsGrid = el.querySelector('#ops-grid');
  ops.forEach(op => {
    const card = document.createElement('div');
    card.className = 'op-card animate-fade-up';
    card.innerHTML = `
      <span class="op-number">${op.n}</span>
      <strong class="op-title">${op.t}</strong>
      <p class="op-desc">${op.d}</p>`;
    opsGrid.appendChild(card);
  });

  // Módulos
  const grid = el.querySelector('#modules-grid');
  if (modulesData?.modules) {
    modulesData.modules.forEach(mod => {
      const card = document.createElement('a');
      card.href      = `#module/${mod.id}`;
      card.className = 'module-card animate-fade-up';
      card.innerHTML = `
        <span class="module-card-number">${String(mod.order).padStart(2, '0')}</span>
        <span class="module-card-title">${mod.title}</span>
        <span class="module-card-desc">${mod.tagline}</span>
        <div class="module-card-meta">
          <span>${mod.lessons} lições</span>
          <span>${mod.scales.join(' · ')}</span>
        </div>`;
      grid.appendChild(card);
    });
  }

  return el;
}
