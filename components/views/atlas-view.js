/** Responsive Atlas with shareable filters, thematic legends and native SVG navigation. */
import { MapEngine } from '../../engine/map-engine.js';
import { loadJSON, loadSVG } from '../../js/data-loader.js';
import { LocalProgress } from '../../js/local-progress.js';
import { MAP_CATALOG, mapAssetPath, mapEntries } from '../../js/map-catalog.js';

/** @param {string|null} requested @returns {string} */
export function resolveAtlasMapId(requested) {
  return requested && MAP_CATALOG[requested] ? requested : 'world-political';
}

/** @param {string} value @returns {string} */
function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

function legendHTML(meta) {
  return `<ul class="atlas-map-legend-list">${meta.legend.map(([symbol, color, label]) => `<li><i class="atlas-legend-symbol atlas-legend-symbol--${symbol}" style="--legend-color:${color}"></i><span>${escapeHTML(label)}</span></li>`).join('')}</ul>`;
}

function panelHTML(slot) {
  return `<figure class="atlas-map-panel" data-map-slot="${slot}">
    <header class="atlas-map-panel__header">
      <div><p class="atlas-map-panel__extent"></p><figcaption></figcaption><span class="atlas-map-panel__subtitle"></span></div>
      <button class="atlas-expand-map" type="button" aria-label="Ampliar mapa">Ampliar</button>
    </header>
    <div class="atlas-map-shell">
      <div class="atlas-map"></div>
    </div>
    <footer class="atlas-map-panel__footer">
      <details class="atlas-map-legend" open><summary>Legenda</summary><div class="atlas-map-legend__content"></div></details>
      <details class="atlas-map-method"><summary>Como ler</summary><p></p></details>
      <p class="atlas-map-source"></p>
    </footer>
  </figure>`;
}

/** @param {{query?:URLSearchParams}} params @param {import('../../js/state.js').State} state @returns {Promise<HTMLElement>} */
export async function renderAtlas({ query = new URLSearchParams() }, state) {
  const progress = new LocalProgress();
  const savedFilters = progress.read().recentFilters?.atlas || {};
  const initialMapId = resolveAtlasMapId(query.get('map') || savedFilters.map);
  const { modules } = await loadJSON('data/modules.json');
  const options = mapEntries().map(([value, meta]) => `<option value="${value}">${escapeHTML(meta.title)}</option>`).join('');
  const root = document.createElement('section');
  root.className = 'atlas-view';
  root.innerHTML = `
    <header class="atlas-header">
      <div><p class="hero-eyebrow">Atlas</p><h1>Leia o território por camadas</h1></div>
      <div class="atlas-header-actions"><button class="btn btn-outline atlas-filter-toggle" id="atlas-filter-toggle" type="button" aria-expanded="false" aria-controls="atlas-filters">Filtros</button><button class="btn btn-outline" id="share-atlas" type="button">Copiar link desta visão</button></div>
    </header>
    <div class="atlas-layout">
      <aside class="atlas-filters" id="atlas-filters" aria-label="Filtros do atlas">
        <div class="atlas-panel-heading"><span>Explorar camadas</span><button id="atlas-filter-close" type="button" aria-label="Fechar filtros">Fechar</button></div>
        <label class="field-label" for="atlas-map">Mapa</label><select id="atlas-map">${options}</select>
        <label class="field-label" for="atlas-level">Nível</label><select id="atlas-level"><option value="">Todos</option><option value="efi">Fundamental I</option><option value="efii">Fundamental II</option><option value="em">Ensino Médio</option><option value="es">Ensino Superior</option></select>
        <label class="field-label" for="atlas-scale">Escala</label><select id="atlas-scale"><option value="">Todas</option><option value="local">Local</option><option value="regional">Regional</option><option value="nacional">Nacional</option><option value="global">Global</option></select>
        <label class="field-label" for="atlas-phenomenon">Fenômeno</label><select id="atlas-phenomenon"><option value="">Todos</option><option value="water">Água</option><option value="climate">Clima</option><option value="migration">Migração</option><option value="inequality">Desigualdade</option><option value="energy">Energia</option><option value="transport">Transportes</option><option value="border">Fronteiras</option></select>
        <label class="compare-switch"><input id="atlas-compare-enabled" type="checkbox"><span>Comparar dois mapas</span></label>
        <div class="compare-control" hidden><label class="field-label" for="atlas-compare-map">Segundo mapa</label><select id="atlas-compare-map">${options}</select></div>
        <div class="source-note" id="atlas-source-note"></div>
      </aside>
      <div class="atlas-stage">
        <p class="sr-only" id="atlas-status" aria-live="polite"></p>
        <div class="atlas-map-grid">${panelHTML('primary')}${panelHTML('comparison')}</div>
        <section class="atlas-modules" aria-live="polite"></section>
      </div>
    </div>
    <dialog class="atlas-map-dialog" aria-labelledby="atlas-dialog-title">
      <header><div><p>Visualização ampliada</p><h2 id="atlas-dialog-title"></h2></div><button type="button" class="atlas-dialog-close" aria-label="Fechar mapa ampliado">Fechar</button></header>
      <div class="atlas-dialog-map"></div>
      <div class="atlas-dialog-legend"></div>
    </dialog>`;

  const controls = {
    map: root.querySelector('#atlas-map'),
    level: root.querySelector('#atlas-level'),
    scale: root.querySelector('#atlas-scale'),
    phenomenon: root.querySelector('#atlas-phenomenon'),
  };
  for (const [key, control] of Object.entries(controls)) control.value = key === 'map' ? initialMapId : (query.get(key) || savedFilters[key] || '');
  const compareEnabled = root.querySelector('#atlas-compare-enabled');
  const compareControl = root.querySelector('.compare-control');
  const compareMap = root.querySelector('#atlas-compare-map');
  compareEnabled.checked = (query.get('compare') || savedFilters.compare) === '1';
  compareMap.value = resolveAtlasMapId(query.get('compareMap') || savedFilters.compareMap || 'climate');
  const results = root.querySelector('.atlas-modules');
  const status = root.querySelector('#atlas-status');
  const dialog = root.querySelector('.atlas-map-dialog');
  let engines = [];
  let dialogEngine = null;
  let updateVersion = 0;

  const announce = message => { status.textContent = ''; requestAnimationFrame(() => { status.textContent = message; }); };
  const mountPanel = (panel, mapId, svgContent) => {
    const meta = MAP_CATALOG[mapId];
    panel.dataset.mapId = mapId;
    panel.querySelector('figcaption').textContent = meta.title;
    panel.querySelector('.atlas-map-panel__extent').textContent = meta.extent;
    panel.querySelector('.atlas-map-panel__subtitle').textContent = meta.subtitle;
    panel.querySelector('.atlas-map-legend__content').innerHTML = legendHTML(meta);
    panel.querySelector('.atlas-map-method p').textContent = meta.notice;
    panel.querySelector('.atlas-map-source').textContent = `Fonte: ${meta.source} · ${meta.period}`;
    const engine = new MapEngine(panel.querySelector('.atlas-map'), { svgContent, zoomable: true, label: `${meta.title}: ${meta.subtitle}`, onStatus: announce }).mount();
    engines.push(engine);
  };

  const update = async () => {
    const version = ++updateVersion;
    const filtered = modules.filter(module => (!controls.level.value || module.level === controls.level.value)
      && (!controls.scale.value || module.scales?.includes(controls.scale.value))
      && (!controls.phenomenon.value || module.phenomena?.includes(controls.phenomenon.value)));
    results.innerHTML = `<div class="atlas-results-head"><h2>Módulos relacionados</h2><span>${filtered.length}</span></div>${filtered.slice(0, 12).map(module => `<a class="atlas-module-link" href="${module.format === 'article' ? '#article/' : '#module/'}${escapeHTML(module.id)}"><strong>${escapeHTML(module.title)}</strong><span>${escapeHTML(module.tagline || '')}</span></a>`).join('') || '<p>Nenhum módulo corresponde aos filtros.</p>'}`;
    const params = new URLSearchParams();
    for (const [key, control] of Object.entries(controls)) if (control.value) params.set(key, control.value);
    if (compareEnabled.checked) { params.set('compare', '1'); params.set('compareMap', compareMap.value); }
    history.replaceState(null, '', `#atlas${params.size ? `?${params}` : ''}`);
    state.set('atlasFilters', Object.fromEntries(params));
    progress.update({ recentFilters: { ...progress.read().recentFilters, atlas: Object.fromEntries(params) } });

    const mapId = resolveAtlasMapId(controls.map.value);
    const compareId = resolveAtlasMapId(compareMap.value);
    const requests = [loadSVG(mapAssetPath(mapId))];
    if (compareEnabled.checked) requests.push(loadSVG(mapAssetPath(compareId)));
    const [primarySVG, comparisonSVG] = await Promise.all(requests);
    if (version !== updateVersion) return;
    engines.forEach(engine => engine.unmount());
    engines = [];
    const primaryPanel = root.querySelector('[data-map-slot="primary"]');
    const comparisonPanel = root.querySelector('[data-map-slot="comparison"]');
    mountPanel(primaryPanel, mapId, primarySVG);
    comparisonPanel.hidden = !compareEnabled.checked;
    root.querySelector('.atlas-map-grid').classList.toggle('is-comparing', compareEnabled.checked);
    compareControl.hidden = !compareEnabled.checked;
    if (compareEnabled.checked) mountPanel(comparisonPanel, compareId, comparisonSVG);
    const meta = MAP_CATALOG[mapId];
    root.querySelector('#atlas-source-note').innerHTML = `<strong>${escapeHTML(meta.kind)}</strong><span>${escapeHTML(meta.subtitle)}</span><small>${escapeHTML(meta.source)} · ${escapeHTML(meta.period)}</small>`;
    announce(`${meta.title} carregado${compareEnabled.checked ? ` em comparação com ${MAP_CATALOG[compareId].title}` : ''}`);
  };

  Object.values(controls).forEach(control => control.addEventListener('change', () => { void update(); }));
  compareEnabled.addEventListener('change', () => { void update(); });
  compareMap.addEventListener('change', () => { void update(); });

  root.querySelector('.atlas-map-grid').addEventListener('click', async event => {
    const button = event.target.closest('.atlas-expand-map');
    if (!button) return;
    const panel = button.closest('.atlas-map-panel');
    const mapId = panel.dataset.mapId;
    const meta = MAP_CATALOG[mapId];
    const svgContent = await loadSVG(mapAssetPath(mapId));
    dialog.querySelector('#atlas-dialog-title').textContent = meta.title;
    dialog.querySelector('.atlas-dialog-legend').innerHTML = legendHTML(meta);
    dialogEngine?.unmount();
    dialogEngine = new MapEngine(dialog.querySelector('.atlas-dialog-map'), { svgContent, zoomable: true, label: `${meta.title}: visualização ampliada`, onStatus: announce }).mount();
    document.body.classList.add('has-map-dialog');
    dialog.showModal();
  });
  dialog.querySelector('.atlas-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.classList.remove('has-map-dialog'); dialogEngine?.unmount(); dialogEngine = null; });

  const filters = root.querySelector('#atlas-filters');
  const filterToggle = root.querySelector('#atlas-filter-toggle');
  const setFiltersOpen = open => {
    filters.classList.toggle('is-open', open);
    filterToggle.setAttribute('aria-expanded', String(open));
    if (open) root.querySelector('#atlas-filter-close').focus();
    else filterToggle.focus();
  };
  filterToggle.addEventListener('click', () => setFiltersOpen(!filters.classList.contains('is-open')));
  root.querySelector('#atlas-filter-close').addEventListener('click', () => setFiltersOpen(false));
  filters.addEventListener('keydown', event => { if (event.key === 'Escape') setFiltersOpen(false); });
  root.querySelector('#share-atlas').addEventListener('click', async event => {
    try { await navigator.clipboard.writeText(location.href); event.currentTarget.textContent = 'Link copiado'; }
    catch { event.currentTarget.textContent = 'Use a URL do navegador'; }
  });
  await update();
  return root;
}
