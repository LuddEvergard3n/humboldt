/**
 * module-view.js — Renderizador de módulo pedagógico
 *
 * Lista as lições do módulo usando o índice leve data/lessons/index.json.
 * Não carrega o corpo completo de cada lição.
 */

import { loadJSON, loadLessonsIndex } from '../../js/data-loader.js';
import { LocalProgress } from '../../js/local-progress.js';

export async function renderModule({ moduleId }, state, router) {
  const [modulesData, lessonsIndex] = await Promise.all([
    loadJSON('data/modules.json'),
    loadLessonsIndex(),
  ]);

  const mod = modulesData?.modules?.find(m => m.id === moduleId);

  if (!mod) {
    const el = document.createElement('div');
    el.className = 'system-state system-state--error';
    el.innerHTML = `<h2>Módulo não encontrado</h2>
                    <a href="#home" class="btn btn-outline">← Início</a>`;
    return el;
  }

  /* Módulos de Ensino Superior usam article-view, não lesson list */
  if (mod.format === 'article') {
    if (router && typeof router.navigate === 'function') {
      router.navigate(`article/${moduleId}`);
    } else {
      window.location.hash = `article/${moduleId}`;
    }
    return document.createElement('div'); /* retorna vazio — router re-renderiza */
  }

  // Lições deste módulo, na ordem do índice
  const moduleLessons = Object.entries(lessonsIndex)
    .filter(([, meta]) => meta.moduleId === moduleId)
    .map(([id, meta]) => ({ id, ...meta }));
  const completed = new Set(new LocalProgress().read().completed);
  const completedCount = moduleLessons.filter(lesson => completed.has(lesson.id)).length;

  const el = document.createElement('div');
  el.className = 'view-module';

  el.innerHTML = `
    <nav class="breadcrumb" aria-label="Localização">
      <a href="#home">Início</a>
      <span class="breadcrumb-sep">›</span>
      <span class="breadcrumb-current">${mod.title}</span>
    </nav>

    <header class="module-header">
      <div>
        <p class="eyebrow">${mod.scales.join(' · ')}</p>
        <h1>${mod.title}</h1>
        <p class="lead">${mod.tagline}</p>
      </div>
      <div class="module-meta">
        <span class="module-meta-item">${mod.lessons} lições</span>
        <span class="module-meta-item">${mod.estimatedTime || ''}</span>
        <span class="module-meta-item">${completedCount} concluída${completedCount === 1 ? '' : 's'}</span>
      </div>
    </header>

    <div class="module-objective">
      <p class="step-label">Objetivo</p>
      <p>${mod.objective}</p>
    </div>

    <!-- Caixa professor -->
    <div class="teacher-box teacher-only">
      <p class="teacher-box-label">Modo Professor — ${mod.title}</p>
      <p>${mod.objective}</p>
    </div>

    <section class="module-lessons-section">
      <p class="section-eyebrow">Lições</p>
      <div class="lessons-list" id="lessons-list"></div>
    </section>
  `;

  const list = el.querySelector('#lessons-list');

  if (moduleLessons.length === 0) {
    list.innerHTML = `<p class="muted-message">
      Nenhuma lição disponível ainda para este módulo.</p>`;
  } else {
    moduleLessons.forEach((lesson, idx) => {
      const card = document.createElement('a');
      card.href = `#lesson/${moduleId}/${lesson.id}`;
      const isCompleted = completed.has(lesson.id);
      card.className = `lesson-card${isCompleted ? ' is-complete' : ''}`;
      card.innerHTML = `
        <span class="lesson-card-number">${isCompleted ? '✓' : String(idx + 1).padStart(2,'0')}</span>
        <div class="lesson-card-body">
          <strong class="lesson-card-title">${lesson.title}</strong>
          <p class="lesson-card-summary">${lesson.summary}</p>
        </div>
        <span class="lesson-card-type">${lesson.activityType}</span>`;
      list.appendChild(card);
    });
  }

  return el;
}
