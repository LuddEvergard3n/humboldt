/** Search and filter view backed entirely by the local lesson index. */
import { loadJSON, loadLessonsIndex } from '../../js/data-loader.js';
import { LocalProgress } from '../../js/local-progress.js';

const LEVELS = { efi: 'Fundamental I', efii: 'Fundamental II', em: 'Ensino Médio', es: 'Ensino Superior' };

/** @param {string} value @returns {string} */
function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

/** @param {{query?:URLSearchParams}} params @returns {Promise<HTMLElement>} */
export async function renderSearch({ query = new URLSearchParams() }) {
  const [{ modules }, index] = await Promise.all([loadJSON('data/modules.json'), loadLessonsIndex()]);
  const progress = new LocalProgress();
  const savedFilters = progress.read().recentFilters?.search || {};
  const moduleById = new Map(modules.map(module => [module.id, module]));
  const initialTerm = query.get('q') ?? savedFilters.q ?? '';
  const initialLevel = query.get('level') ?? savedFilters.level ?? '';
  const root = document.createElement('section');
  root.className = 'explore-view';
  root.innerHTML = `
    <header class="explore-header">
      <p class="hero-eyebrow">Busca e filtros</p>
      <h1>Encontre um tema, território ou conceito</h1>
      <p>Todo o índice é pesquisado no seu navegador. Nenhum termo é enviado para um servidor.</p>
    </header>
    <form class="search-panel" role="search">
      <label class="field-label" for="global-search">Buscar</label>
      <div class="search-row">
        <input id="global-search" name="q" type="search" value="${escapeHTML(initialTerm)}" placeholder="Ex.: migração, oceanos, território" autocomplete="off">
        <select id="level-filter" name="level" aria-label="Filtrar por nível">
          <option value="">Todos os níveis</option>
          ${Object.entries(LEVELS).map(([value, label]) => `<option value="${value}" ${value === initialLevel ? 'selected' : ''}>${label}</option>`).join('')}
        </select>
      </div>
    </form>
    <p class="results-count" aria-live="polite"></p>
    <div class="results-grid"></div>`;

  const input = root.querySelector('#global-search');
  const level = root.querySelector('#level-filter');
  const count = root.querySelector('.results-count');
  const grid = root.querySelector('.results-grid');

  const update = () => {
    const term = input.value.trim().toLocaleLowerCase('pt-BR');
    const selectedLevel = level.value;
    const results = Object.entries(index).filter(([, lesson]) => {
      const module = moduleById.get(lesson.moduleId);
      const text = `${lesson.title} ${lesson.summary} ${module?.title || ''}`.toLocaleLowerCase('pt-BR');
      return (!term || text.includes(term)) && (!selectedLevel || module?.level === selectedLevel);
    });
    count.textContent = `${results.length} resultado${results.length === 1 ? '' : 's'}`;
    grid.innerHTML = results.length ? results.slice(0, 60).map(([id, lesson]) => {
      const module = moduleById.get(lesson.moduleId);
      return `<article class="result-card">
        <span class="editorial-marker">${escapeHTML(lesson.evidenceStatus || 'conteúdo')}</span>
        <h2><a href="#lesson/${escapeHTML(lesson.moduleId)}/${escapeHTML(id)}">${escapeHTML(lesson.title)}</a></h2>
        <p>${escapeHTML(lesson.summary)}</p>
        <small>${escapeHTML(module?.title || lesson.moduleId)} · ${escapeHTML(LEVELS[module?.level] || module?.level || '')}</small>
      </article>`;
    }).join('') : '<div class="empty-state"><h2>Nenhum resultado</h2><p>Remova um filtro ou tente um termo mais amplo.</p></div>';
    const params = new URLSearchParams();
    if (input.value.trim()) params.set('q', input.value.trim());
    if (selectedLevel) params.set('level', selectedLevel);
    history.replaceState(null, '', `#search${params.size ? `?${params}` : ''}`);
    progress.update({ recentFilters: { ...progress.read().recentFilters, search: Object.fromEntries(params) } });
  };
  input.addEventListener('input', update);
  level.addEventListener('change', update);
  update();
  return root;
}
