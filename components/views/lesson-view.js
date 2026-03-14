/**
 * lesson-view.js — Renderizador de lição completa
 *
 * Carrega a lição de data/lessons/{lessonId}.json (arquivo individual).
 * O índice de módulos vem de data/modules.json (para breadcrumb e título).
 */

import { loadLesson, loadJSON }  from '../../js/data-loader.js';
import { ActivityEngine }         from '../activity-engine.js';
import { HintSystem }             from '../../engine/hint-system.js';

export async function renderLesson({ moduleId, lessonId }, state, router) {
  const [lesson, modulesData] = await Promise.all([
    loadLesson(lessonId).catch(() => null),
    loadJSON('data/modules.json'),
  ]);

  const modDef = modulesData?.modules?.find(m => m.id === moduleId);

  if (!lesson) {
    const el = document.createElement('div');
    el.style.cssText = 'padding:3rem;text-align:center;';
    el.innerHTML = `<h2>Lição não encontrada: ${lessonId}</h2>
                    <a href="#module/${moduleId}" class="btn btn-outline">Voltar ao módulo</a>`;
    return el;
  }

  const el = document.createElement('div');
  el.className = 'view-lesson';

  // --- Área principal ---
  const main = document.createElement('div');
  main.className = 'lesson-main';
  main.innerHTML = `
    <nav class="breadcrumb" aria-label="Localização">
      <a href="#home">Início</a>
      <span class="breadcrumb-sep">›</span>
      <a href="#module/${moduleId}">${modDef?.title || moduleId}</a>
      <span class="breadcrumb-sep">›</span>
      <span class="breadcrumb-current">${lesson.title}</span>
    </nav>

    <div class="lesson-progress">
      <div class="progress-bar">
        <div class="progress-fill" id="progress-fill" style="width:14%"></div>
      </div>
      <span class="progress-label" id="progress-label">1 / 7</span>
    </div>

    <!-- 01 Fenômeno -->
    <section class="lesson-step" id="step-01">
      <p class="step-label">01 — Fenômeno</p>
      <h1 class="step-title">${lesson.title}</h1>
      <div class="phenomenon-box">
        <p class="phenomenon-title">${lesson.phenomenon.title}</p>
        <p>${lesson.phenomenon.text}</p>
      </div>
    </section>

    <!-- 02 Visualização -->
    <section class="lesson-step" id="step-02">
      <p class="step-label">02 — Visualização</p>
      <div id="map-area"></div>
    </section>

    <!-- 03 Leitura guiada -->
    <section class="lesson-step" id="step-03">
      <p class="step-label">03 — Leitura guiada</p>
      <h2>${lesson.guided?.title || ''}</h2>
      <p>${lesson.guided?.text || ''}</p>
      ${lesson.guided?.points ? `<ul>${lesson.guided.points.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
    </section>

    <!-- 04 Relação -->
    <section class="lesson-step" id="step-04">
      <p class="step-label">04 — Relação entre fatores</p>
      <div class="case-study-box">
        <p class="case-study-title">${lesson.relations?.title || ''}</p>
        <p>${lesson.relations?.text || ''}</p>
      </div>
    </section>

    <!-- 05 Estudo de caso -->
    <section class="lesson-step" id="step-05">
      <p class="step-label">05 — Estudo de caso</p>
      <div class="case-study-box">
        <p class="case-study-title">${lesson.caseStudy?.title || ''}</p>
        <p>${lesson.caseStudy?.text || ''}</p>
      </div>
    </section>

    <!-- 06 Aplicação -->
    <section class="lesson-step" id="step-06">
      <p class="step-label">06 — Aplicação</p>
      <div class="application-box">
        <p>${lesson.application || ''}</p>
      </div>
    </section>

    <!-- 07 Atividade -->
    <section class="lesson-step" id="step-07">
      <p class="step-label">07 — Atividade</p>
      <div id="activity-area" class="activity-area"></div>
      <div id="feedback-area" class="feedback-msg"></div>
    </section>

    <!-- Caixa do professor -->
    <div class="teacher-box teacher-only">
      <p class="teacher-box-label">Modo Professor</p>
      <dl>
        <dt>Objetivo</dt>    <dd>${lesson.teacher?.objective || '—'}</dd>
        <dt>Observe</dt>     <dd>${lesson.teacher?.observe   || '—'}</dd>
        <dt>Resposta</dt>    <dd>${lesson.teacher?.answer    || '—'}</dd>
        <dt>Mediação</dt>    <dd>${lesson.teacher?.mediation || '—'}</dd>
        <dt>Tempo</dt>       <dd>${lesson.teacher?.time      || '—'}</dd>
      </dl>
    </div>

    <!-- Navegação de lição -->
    <div class="lesson-nav">
      <a href="#module/${moduleId}" class="btn btn-outline btn-sm">← Módulo</a>
    </div>
  `;

  // --- Sidebar ---
  const sidebar = document.createElement('aside');
  sidebar.className = 'lesson-sidebar';

  // Metadata do módulo — sempre visível
  sidebar.innerHTML = `
    <div class="sidebar-meta">
      <p class="sidebar-module-label">${modDef?.title || moduleId}</p>
      <p class="sidebar-lesson-title">${lesson.title}</p>
    </div>

    <nav class="sidebar-steps" aria-label="Passos da lição">
      <p class="sidebar-section-label">Passos</p>
      <ol class="sidebar-step-list">
        <li><a href="#step-01" class="sidebar-step-link">01 — Fenômeno</a></li>
        <li><a href="#step-02" class="sidebar-step-link">02 — Visualização</a></li>
        <li><a href="#step-03" class="sidebar-step-link">03 — Leitura guiada</a></li>
        <li><a href="#step-04" class="sidebar-step-link">04 — Relação</a></li>
        <li><a href="#step-05" class="sidebar-step-link">05 — Estudo de caso</a></li>
        <li><a href="#step-06" class="sidebar-step-link">06 — Aplicação</a></li>
        <li><a href="#step-07" class="sidebar-step-link">07 — Atividade</a></li>
      </ol>
    </nav>`;

  // Legenda (se houver)
  if (lesson.legend?.length) {
    const legendEl = document.createElement('div');
    legendEl.className = 'map-legend';
    legendEl.innerHTML = `
      <p class="sidebar-section-label">Legenda</p>
      <ul class="legend-list">
        ${lesson.legend.map(l => `
          <li class="legend-item">
            <span class="legend-swatch" style="background:${l.color}"></span>
            <span>${l.label}</span>
          </li>`).join('')}
      </ul>`;
    sidebar.appendChild(legendEl);
  }

  // Controles de camada — visíveis para todos os alunos (não teacher-only)
  if (lesson.layers?.length) {
    const layerControls = document.createElement('div');
    layerControls.className = 'layer-controls';
    layerControls.innerHTML = `
      <p class="sidebar-section-label">Camadas</p>
      ${lesson.layers.map(l => `
        <label class="layer-toggle">
          <input type="checkbox" data-layer-id="${l.id}" ${l.visible ? 'checked' : ''}/>
          <span class="layer-swatch" style="background:${l.color}"></span>
          <span>${l.label}</span>
        </label>`).join('')}`;
    sidebar.appendChild(layerControls);
  }

  el.appendChild(main);
  el.appendChild(sidebar);

  // --- Montar motores após injeção no DOM ---
  requestAnimationFrame(() => {
    const hintEl    = main.querySelector('#feedback-area');
    const actEl     = main.querySelector('#activity-area');
    const feedbackEl= main.querySelector('#feedback-area');

    if (!actEl || !feedbackEl || !lesson.activity) return;

    const hintSystem = new HintSystem(
      hintEl,
      lesson.activity.hints || [],
      null
    );

    const engine = new ActivityEngine(actEl, feedbackEl, hintSystem, lesson, state);
    engine.mount();

    // Progresso dos passos + highlight na sidebar
    const steps = main.querySelectorAll('.lesson-step');
    const fill  = main.querySelector('#progress-fill');
    const label = main.querySelector('#progress-label');
    const stepLinks = sidebar.querySelectorAll('.sidebar-step-link');
    const total = steps.length;

    const observer = new IntersectionObserver(entries => {
      let visible = 0;
      steps.forEach((s, i) => {
        if (s.getBoundingClientRect().top < window.innerHeight * 0.7) visible = i + 1;
      });
      const pct = Math.round((visible / total) * 100);
      if (fill)  fill.style.width  = `${pct}%`;
      if (label) label.textContent = `${visible} / ${total}`;

      // Atualiza link ativo na sidebar
      const activeIdx = visible > 0 ? visible - 1 : 0;
      stepLinks.forEach((link, i) => {
        link.classList.toggle('sidebar-step-link--active', i === activeIdx);
      });
    }, { threshold: 0.1 });

    steps.forEach(s => observer.observe(s));

    // Scroll suave nos links da sidebar
    sidebar.querySelectorAll('.sidebar-step-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').replace('#', '');
        const target = main.querySelector(`#${targetId}`);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  });

  return el;
}
