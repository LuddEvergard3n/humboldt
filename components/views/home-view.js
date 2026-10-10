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

import { loadJSON }               from '../../js/data-loader.js';
import { loadLessonsIndex }       from '../../js/data-loader.js';
import { LocalProgress }          from '../../js/local-progress.js';

const LEVEL_LABEL = {
  efi:  'Ensino Fundamental I',
  efii: 'Ensino Fundamental II',
  em:   'Ensino Médio',
  es:   'Ensino Superior',
};

const SCALE_ITEMS = [
  { id: 'local',    name: 'Local',    desc: 'bairro, cidade' },
  { id: 'regional', name: 'Regional', desc: 'estado, região' },
  { id: 'nacional', name: 'Nacional', desc: 'país' },
  { id: 'global',   name: 'Global',   desc: 'mundo' },
];

export async function renderHome(_params, _state, router) {
  const [{ modules }, lessonIndex] = await Promise.all([loadJSON('data/modules.json'), loadLessonsIndex()]);
  const saved = new LocalProgress().read();
  const lastLesson = saved.lastLesson ? lessonIndex[saved.lastLesson] : null;

  const container = document.createElement('div');
  container.className = 'home-root atlas2-home';

  const featuredIds = ['em-oceans', 'em-demography', 'em-risks-resilience', 'es-institutions-development'];
  const featured = featuredIds.map(id => modules.find(module => module.id === id)).filter(Boolean);
  const levelCounts = Object.fromEntries(Object.keys(LEVEL_LABEL).map(level => [level, modules.filter(module => module.level === level).length]));

  container.innerHTML = `
    <section class="atlas2-hero" aria-labelledby="home-title">
      <div class="atlas2-hero-copy">
        <p class="atlas2-kicker">Humboldt · Atlas Interativo 2.0</p>
        <h1 id="home-title">Geografia para ver relações, não decorar listas.</h1>
        <p class="atlas2-lead">Explore territórios, compare evidências e acompanhe como fenômenos físicos, humanos e institucionais se conectam em diferentes escalas.</p>
        <form class="home-search atlas2-search" action="#search" role="search">
          <label class="sr-only" for="home-search-input">Buscar no atlas</label>
          <input id="home-search-input" type="search" placeholder="Busque por migração, clima, energia, cidade...">
          <button type="submit">Buscar</button>
        </form>
        <div class="atlas2-hero-actions">
          <button class="atlas2-primary-action" data-nav="#atlas">Abrir o Atlas</button>
          <span>${modules.length} módulos</span><span>${Object.keys(lessonIndex).length} lições</span><span>dados locais</span>
        </div>
      </div>
      <div class="atlas2-map-card" aria-label="Entrada visual para o Atlas">
        <div class="atlas2-map-toolbar"><span>Visão global</span><span>Fonte e ano em cada camada</span></div>
        <div class="atlas2-world" role="img" aria-label="Mapa político do mundo em projeção Robinson, com rotas temáticas ilustrativas">
          <img src="assets/maps/world-robinson-public-domain.png" alt="" width="1280" height="567">
          <svg class="atlas2-world-routes" viewBox="0 0 1280 567" aria-hidden="true">
            <path d="M278 246C420 140 573 149 671 223S897 337 1052 213"/>
            <path d="M444 389C520 337 616 353 690 435"/>
            <g><circle cx="278" cy="246" r="7"/><circle cx="671" cy="223" r="7"/><circle cx="1052" cy="213" r="7"/><circle cx="444" cy="389" r="7"/><circle cx="690" cy="435" r="7"/></g>
          </svg>
        </div>
        <div class="atlas2-map-caption"><strong>Camadas que contam uma história</strong><span>população · clima · energia · transportes</span></div>
      </div>
    </section>

    <section class="atlas2-resume" aria-label="Retomar estudo">
      <div><p class="atlas2-section-label">Seu percurso neste dispositivo</p>${lastLesson ? `<h2>${lastLesson.title}</h2><p>${lastLesson.summary}</p>` : '<h2>Comece por uma pergunta</h2><p>Seu progresso fica apenas neste navegador.</p>'}</div>
      <a class="atlas2-resume-link" href="${lastLesson ? `#lesson/${lastLesson.moduleId}/${saved.lastLesson}` : '#search'}">${lastLesson ? 'Retomar lição' : 'Escolher tema'} <span aria-hidden="true">→</span></a>
    </section>

    <section class="atlas2-section" aria-labelledby="levels-title">
      <div class="atlas2-section-head"><div><p class="atlas2-section-label">Percursos</p><h2 id="levels-title">Escolha a profundidade</h2></div><p>O mesmo mundo, perguntas adequadas a cada etapa.</p></div>
      <div class="atlas2-level-grid">
        ${Object.entries(LEVEL_LABEL).map(([level, label], index) => `<button data-nav="#search?level=${level}" class="atlas2-level-card"><span>0${index + 1}</span><strong>${label}</strong><small>${levelCounts[level]} módulos</small></button>`).join('')}
      </div>
    </section>

    <section class="atlas2-section atlas2-section--tint" aria-labelledby="featured-title">
      <div class="atlas2-section-head"><div><p class="atlas2-section-label">Coleções em destaque</p><h2 id="featured-title">Questões para o presente</h2></div><a href="#search">Ver todo o acervo</a></div>
      <div class="atlas2-feature-grid">
        ${featured.map((module, index) => `<article class="atlas2-feature-card atlas2-feature-card--${index + 1}"><div class="atlas2-feature-index">${String(index + 1).padStart(2, '0')}</div><div class="atlas2-feature-visual" aria-hidden="true"><span class="atlas2-feature-coordinate">${['23°S · 43°W', '1°N · 38°E', '35°N · 139°E', '52°N · 13°E'][index]}</span></div><p>${module.level === 'es' ? 'Ensino Superior' : 'Ensino Médio'}</p><h3>${module.title}</h3><span>${module.tagline}</span><a href="#module/${module.id}">Explorar módulo <span aria-hidden="true">→</span></a></article>`).join('')}
      </div>
    </section>

    <section class="atlas2-section" aria-labelledby="scale-title">
      <div class="atlas2-section-head"><div><p class="atlas2-section-label">Escala muda a resposta</p><h2 id="scale-title">Do bairro ao planeta</h2></div></div>
      <div class="atlas2-scale-row">${SCALE_ITEMS.map(item => `<button data-nav="#scale/${item.id}"><strong>${item.name}</strong><span>${item.desc}</span></button>`).join('')}</div>
    </section>
  `;

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

  const searchForm = container.querySelector('.home-search');
  searchForm?.addEventListener('submit', event => {
    event.preventDefault();
    const term = searchForm.querySelector('input').value.trim();
    router.navigate(`search${term ? `?q=${encodeURIComponent(term)}` : ''}`);
  });

  return container;
}
