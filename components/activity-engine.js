/**
 * activity-engine.js — Motor de atividades interativas
 *
 * Recebe a definição de uma lição e renderiza a atividade
 * correspondente ao seu tipo. Tipos implementados:
 *
 *   compass       — rosa dos ventos interativa
 *   scale         — slider de escala cartográfica
 *   layer-toggle  — ligar/desligar camadas num mapa
 *   before-after  — comparação temporal (slider)
 *   flow-map      — mapa de fluxos animados
 *   map-click     — clicar em região do mapa
 *   single-choice — pergunta de múltipla escolha (uma resposta)
 *
 * Adicionalmente, renderiza controles de camada e legenda para a sidebar.
 */

import { MapEngine }        from '../engine/map-engine.js';
import { LayerEngine }      from '../engine/layer-engine.js';
import { ComparisonEngine } from '../engine/comparison-engine.js';
import { FlowEngine }       from '../engine/flow-engine.js';
import { FeedbackEngine }   from '../engine/feedback-engine.js';
import { loadSVG }          from '../js/data-loader.js';

export class ActivityEngine {
  /**
   * @param {HTMLElement}  contentEl   - container da atividade
   * @param {HTMLElement}  feedbackEl  - .feedback-msg
   * @param {HintSystem}   hintSystem
   * @param {Object}       lesson      - dados da lição
   * @param {State}        state
   */
  constructor(contentEl, feedbackEl, hintSystem, lesson, state) {
    this._el       = contentEl;
    this._feedback = new FeedbackEngine(feedbackEl, hintSystem);
    this._hints    = hintSystem;
    this._lesson   = lesson;
    this._state    = state;
    this._layers   = null;   // LayerEngine (se aplicável)
    this._layerDefs = [];    // definições de camadas para a sidebar
  }

  /** Monta a atividade correta conforme lesson.activityType. */
  async mount() {
    const type = this._lesson.activityType;

    switch (type) {
      case 'compass':       await this._mountCompass();       break;
      case 'scale':         await this._mountScale();         break;
      case 'layer-toggle':  await this._mountLayerToggle();   break;
      case 'before-after':  await this._mountBeforeAfter();   break;
      case 'flow-map':      await this._mountFlowMap();       break;
      case 'map-click':     await this._mountMapClick();      break;
      case 'single-choice': this._mountSingleChoice();        break;
      default:              this._mountFallback();
    }
  }

  // -------------------------------------------------------
  // 1. Compass — Rosa dos ventos interativa
  // -------------------------------------------------------
  async _mountCompass() {
    this._el.innerHTML = `
      <p style="margin-bottom:var(--space-4);">
        ${this._lesson.activity?.instruction || 'Observe a rosa dos ventos e responda.'}
      </p>
      <div id="compass-wrap" style="display:flex;justify-content:center;margin:var(--space-6) 0;">
        ${COMPASS_SVG}
      </div>`;

    // Inicia a questão de escolha simples (se houver)
    if (this._lesson.activity) this._mountSingleChoice();
  }

  // -------------------------------------------------------
  // 2. Scale — Slider de escala
  // -------------------------------------------------------
  async _mountScale() {
    const config = this._lesson.activity?.scaleConfig || {};
    this._el.innerHTML = `
      <p style="margin-bottom:var(--space-4);">
        ${this._lesson.activity?.instruction || 'Ajuste a escala e observe como o mapa muda.'}
      </p>
      <div style="margin:var(--space-6) 0;">
        <label style="font-family:var(--font-mono);font-size:var(--size-xs);
                       letter-spacing:var(--tracking-wider);text-transform:uppercase;
                       color:var(--color-text-muted);display:block;margin-bottom:var(--space-3);">
          Escala
        </label>
        <input type="range" id="scale-slider"
               min="${config.min || 1}" max="${config.max || 10}" value="${config.initial || 5}"
               style="width:100%;" />
        <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);
                     font-size:var(--size-xs);color:var(--color-text-muted);margin-top:var(--space-2);">
          <span>1:${config.labelMin || '50.000.000'} (menor detalhe)</span>
          <span>1:${config.labelMax || '5.000'} (maior detalhe)</span>
        </div>
        <p id="scale-desc" style="margin-top:var(--space-4);font-size:var(--size-sm);
                                   color:var(--color-text-mid);min-height:3em;"></p>
      </div>`;

    const slider = this._el.querySelector('#scale-slider');
    const desc   = this._el.querySelector('#scale-desc');
    const steps  = config.steps || [];

    const update = () => {
      const v = Number(slider.value);
      const step = steps.find(s => v >= s.min && v <= s.max);
      desc.textContent = step?.description || '';
    };

    slider.addEventListener('input', update);
    update();

    if (this._lesson.activity) this._mountSingleChoice();
  }

  // -------------------------------------------------------
  // 3. Layer toggle — mapa com camadas
  // -------------------------------------------------------
  async _mountLayerToggle() {
    const mapId = this._lesson.activity?.mapId;
    if (!mapId) { this._mountFallback(); return; }

    const svgContent = await loadSVG(`assets/maps/${mapId}.svg`);
    if (!svgContent) { this._mountFallback(); return; }

    const mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    mapContainer.style.marginBottom = 'var(--space-6)';
    this._el.appendChild(mapContainer);

    const mapEngine = new MapEngine(mapContainer, { svgContent });
    mapEngine.mount();

    const svg = mapContainer.querySelector('svg');
    if (svg) {
      this._layers = new LayerEngine(svg, this._state);
      this._layers.discoverLayers();
      this._layerDefs = this._lesson.layers || [];

      // Estado inicial: apenas camadas marcadas como visíveis
      const initialVisible = this._layerDefs
        .filter(l => l.visible)
        .map(l => l.id);
      this._layers.setVisible(initialVisible);
    }

    if (this._lesson.activity) this._mountSingleChoice();
  }

  // -------------------------------------------------------
  // 4. Before / After — comparação temporal
  // -------------------------------------------------------
  async _mountBeforeAfter() {
    const config = this._lesson.activity?.compareConfig || {};
    const wrap = document.createElement('div');
    wrap.style.marginBottom = 'var(--space-6)';
    this._el.appendChild(wrap);

    const before = config.beforeSvg || PLACEHOLDER_SVG('Antes', '#c4a35a');
    const after  = config.afterSvg  || PLACEHOLDER_SVG('Depois', '#4a7aaa');

    const engine = new ComparisonEngine(wrap, {
      beforeContent: before,
      afterContent:  after,
      beforeLabel:   config.beforeLabel || 'Antes',
      afterLabel:    config.afterLabel  || 'Depois',
    });
    engine.mount();

    if (this._lesson.activity) this._mountSingleChoice();
  }

  // -------------------------------------------------------
  // 5. Flow map — mapa de fluxos
  // -------------------------------------------------------
  async _mountFlowMap() {
    const mapId = this._lesson.activity?.mapId;
    const flows = this._lesson.activity?.flows || [];

    const svgContent = mapId
      ? await loadSVG(`assets/maps/${mapId}.svg`)
      : null;

    const mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    mapContainer.style.marginBottom = 'var(--space-6)';
    this._el.appendChild(mapContainer);

    const mapEngine = new MapEngine(mapContainer, {
      svgContent: svgContent || PLACEHOLDER_SVG('Mapa de Fluxos', '#e8e2d4'),
    });
    mapEngine.mount();

    if (flows.length > 0) {
      const svg = mapContainer.querySelector('svg');
      if (svg) {
        const flowEngine = new FlowEngine(svg, flows);
        flowEngine.mount();
      }
    }

    if (this._lesson.activity) this._mountSingleChoice();
  }

  // -------------------------------------------------------
  // 6. Map click — clicar na região correta
  // -------------------------------------------------------
  async _mountMapClick() {
    const mapId = this._lesson.activity?.mapId;
    if (!mapId) { this._mountFallback(); return; }

    const svgContent = await loadSVG(`assets/maps/${mapId}.svg`);
    if (!svgContent) { this._mountFallback(); return; }

    const question = document.createElement('p');
    question.textContent = this._lesson.activity?.instruction || 'Clique na região correta.';
    question.style.marginBottom = 'var(--space-4)';
    this._el.appendChild(question);

    const mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    this._el.appendChild(mapContainer);

    const mapEngine = new MapEngine(mapContainer, {
      svgContent,
      onRegionClick: (id, name) => {
        this._feedback.validate(this._lesson.activity, id);
      },
    });
    mapEngine.mount();
  }

  // -------------------------------------------------------
  // 7. Single choice — pergunta de escolha simples
  // -------------------------------------------------------
  _mountSingleChoice() {
    const act = this._lesson.activity;
    if (!act || !act.question) return;

    const wrap = document.createElement('div');
    wrap.style.marginTop = 'var(--space-6)';
    wrap.innerHTML = `
      <p style="font-size:var(--size-md);font-weight:600;margin-bottom:var(--space-4);">
        ${act.question}
      </p>
      <div style="display:flex;flex-direction:column;gap:var(--space-2);">
        ${(act.options || []).map(opt => `
          <button class="btn btn-outline"
                  data-option="${opt.value}"
                  style="text-align:left;justify-content:flex-start;">
            ${opt.label}
          </button>`).join('')}
      </div>`;

    wrap.querySelectorAll('[data-option]').forEach(btn => {
      btn.addEventListener('click', () => {
        this._feedback.validate(act, btn.dataset.option);
      });
    });

    this._el.appendChild(wrap);
  }

  // -------------------------------------------------------
  // Fallback — tipo não implementado
  // -------------------------------------------------------
  _mountFallback() {
    this._el.innerHTML = `
      <p style="color:var(--color-text-muted);font-style:italic;">
        Atividade em desenvolvimento.
      </p>`;
  }

  // -------------------------------------------------------
  // Sidebar: controles de camada
  // -------------------------------------------------------
  renderLayerControls(container) {
    if (!container) return;

    if (!this._layers || this._layerDefs.length === 0) {
      container.innerHTML = `<p style="font-size:var(--size-sm);color:var(--color-text-muted);">
        Sem camadas nesta lição.</p>`;
      return;
    }

    this._layerDefs.forEach(layerDef => {
      const label = document.createElement('label');
      label.className = 'layer-toggle';

      const checkbox = document.createElement('input');
      checkbox.type    = 'checkbox';
      checkbox.checked = layerDef.visible !== false;
      checkbox.setAttribute('aria-label', layerDef.label);

      checkbox.addEventListener('change', () => {
        this._layers.toggle(layerDef.id);
      });

      const swatch = document.createElement('span');
      swatch.className       = 'layer-swatch';
      swatch.style.background = layerDef.color || '#aaa';

      const text = document.createElement('span');
      text.className   = 'layer-label';
      text.textContent = layerDef.label;

      label.appendChild(checkbox);
      label.appendChild(swatch);
      label.appendChild(text);
      container.appendChild(label);
    });
  }

  // Sidebar: legenda
  renderLegend(container) {
    if (!container) return;

    const items = this._lesson.legend || [];
    if (items.length === 0) {
      container.innerHTML = `<p style="font-size:var(--size-sm);color:var(--color-text-muted);">
        Sem legenda nesta lição.</p>`;
      return;
    }

    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'legend-item';
      row.innerHTML = `
        <span class="legend-swatch" style="background:${item.color || '#aaa'};"></span>
        <span>${item.label}</span>`;
      container.appendChild(row);
    });
  }
}

// -------------------------------------------------------
// Constantes SVG auxiliares (inline, sem fetch)
// -------------------------------------------------------

const COMPASS_SVG = `
<svg viewBox="0 0 200 200" width="200" height="200"
     aria-label="Rosa dos ventos" role="img"
     style="max-width:200px;">
  <circle cx="100" cy="100" r="90" fill="var(--map-bg)" stroke="var(--color-border)" stroke-width="2"/>
  <circle cx="100" cy="100" r="4" fill="var(--color-primary)"/>
  <!-- Norte -->
  <polygon points="100,20 92,100 108,100" fill="var(--color-accent)"/>
  <text x="100" y="14" text-anchor="middle" font-family="var(--font-mono)"
        font-size="14" font-weight="bold" fill="var(--color-accent)">N</text>
  <!-- Sul -->
  <polygon points="100,180 92,100 108,100" fill="var(--color-primary)"/>
  <text x="100" y="196" text-anchor="middle" font-family="var(--font-mono)"
        font-size="12" fill="var(--color-primary)">S</text>
  <!-- Leste -->
  <polygon points="180,100 100,92 100,108" fill="var(--color-primary)"/>
  <text x="192" y="104" text-anchor="middle" font-family="var(--font-mono)"
        font-size="12" fill="var(--color-primary)">L</text>
  <!-- Oeste -->
  <polygon points="20,100 100,92 100,108" fill="var(--color-primary)"/>
  <text x="8" y="104" text-anchor="middle" font-family="var(--font-mono)"
        font-size="12" fill="var(--color-primary)">O</text>
</svg>`;

/**
 * Gera um SVG placeholder colorido com texto centralizado.
 * @param {string} label
 * @param {string} color
 * @returns {string}
 */
function PLACEHOLDER_SVG(label, color) {
  return `<svg viewBox="0 0 600 340" width="600" height="340"
               style="width:100%;height:auto;background:${color}22;"
               aria-label="${label}">
    <rect width="600" height="340" fill="${color}22" rx="4"/>
    <text x="300" y="180" text-anchor="middle"
          font-family="Georgia,serif" font-size="24"
          fill="${color}" opacity="0.6">${label}</text>
  </svg>`;
}
