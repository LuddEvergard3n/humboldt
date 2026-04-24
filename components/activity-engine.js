/**
 * activity-engine.js — Motor de atividades interativas
 *
 * Tipos implementados:
 *   compass       — rosa dos ventos interativa
 *   scale         — slider de escala cartográfica
 *   layer-toggle  — ligar/desligar camadas num mapa
 *   before-after  — comparação temporal (slider)
 *   flow-map      — mapa de fluxos animados
 *   map-click     — clicar em região do mapa
 *   single-choice — múltipla escolha (uma resposta)
 */

import { MapEngine }        from '../engine/map-engine.js';
import { LayerEngine }      from '../engine/layer-engine.js';
import { ComparisonEngine } from '../engine/comparison-engine.js';
import { FlowEngine }       from '../engine/flow-engine.js';
import { FeedbackEngine }   from '../engine/feedback-engine.js';
import { loadSVG }          from '../js/data-loader.js';

export class ActivityEngine {
  constructor(contentEl, feedbackEl, hintSystem, lesson, state) {
    this._el      = contentEl;
    this._feedback = new FeedbackEngine(feedbackEl, hintSystem);
    this._lesson   = lesson;
    this._state    = state;
    this._layers   = null;
  }

  /** Monta a atividade correta conforme lesson.activityType. */
  async mount() {
    const type = this._lesson.activityType;
    switch (type) {
      case 'compass':       await this._mountCompass();      break;
      case 'scale':         await this._mountScale();        break;
      case 'layer-toggle':  await this._mountLayerToggle();  break;
      case 'before-after':  await this._mountBeforeAfter();  break;
      case 'flow-map':      await this._mountFlowMap();      break;
      case 'map-click':     await this._mountMapClick();     break;
      case 'single-choice': this._mountSingleChoice();       break;
      default:              this._mountFallback();
    }
  }

  // ── Helpers ──────────────────────────────────────────────

  /** Cria e retorna um div.map-container com o SVG montado. */
  async _buildMap(mapId, options = {}) {
    const svgContent = await loadSVG(`assets/maps/${mapId}.svg`);
    if (!svgContent) return null;
    const wrap = document.createElement('div');
    wrap.className = 'map-container activity-map-wrap';
    new MapEngine(wrap, { svgContent, ...options }).mount();
    return wrap;
  }

  /** Appenda a pergunta de escolha simples, se existir. */
  _appendSingleChoice() {
    if (this._lesson.activity?.question) this._mountSingleChoice();
  }

  // ── 1. Compass ───────────────────────────────────────────

  async _mountCompass() {
    const instruction = this._lesson.activity?.instruction
      || 'Observe a rosa dos ventos e responda.';
    this._el.innerHTML =
      `<p class="activity-compass-instruction">${instruction}</p>` +
      `<div class="activity-compass-globe">${COMPASS_SVG}</div>`;
    this._appendSingleChoice();
  }

  // ── 2. Scale ─────────────────────────────────────────────

  async _mountScale() {
    const act    = this._lesson.activity || {};
    const cfg    = act.scaleConfig || {};
    const steps  = cfg.steps || [];
    const hasPerStep = steps.some(s => s.question);

    this._el.innerHTML =
      `<p class="activity-compass-instruction">${act.instruction || 'Ajuste a escala e observe como o mapa muda.'}</p>
       <div class="activity-map-wrap">
         <label class="activity-scale-label">Escala</label>
         <input type="range" id="scale-slider"
                min="${cfg.min || 1}" max="${cfg.max || 10}" value="${cfg.initial || 5}"
                style="width:100%;" />
         <div class="activity-scale-limits">
           <span>1:${cfg.labelMin || '50.000.000'} (menor detalhe)</span>
           <span>1:${cfg.labelMax || '5.000'} (maior detalhe)</span>
         </div>
         <p id="scale-desc" class="activity-scale-desc"></p>
       </div>
       ${hasPerStep ? '<div id="scale-question"></div>' : ''}`;

    const slider = this._el.querySelector('#scale-slider');
    const desc   = this._el.querySelector('#scale-desc');
    const qWrap  = this._el.querySelector('#scale-question');
    let _activeIdx = -1;

    const renderStep = (step, idx) => {
      if (!qWrap || !step?.question || idx === _activeIdx) return;
      _activeIdx = idx;
      const stepAct = {
        question:  step.question,
        correct:   step.correct,
        options:   step.options  || [],
        feedback:  step.feedback || act.feedback || {},
        hints:     step.hints    || act.hints    || [],
        hintAfter: step.hintAfter ?? act.hintAfter ?? 2,
      };
      qWrap.innerHTML =
        `<p class="activity-step-question">${stepAct.question}</p>
         <div class="activity-options-list">
           ${stepAct.options.map(o =>
             `<button class="btn btn-outline scale-opt" data-option="${o.value}"
                      style="text-align:left;justify-content:flex-start;">${o.label}</button>`
           ).join('')}
         </div>`;
      qWrap.querySelectorAll('.scale-opt').forEach(btn =>
        btn.addEventListener('click', () => this._feedback.validate(stepAct, btn.dataset.option))
      );
    };

    const update = () => {
      const v   = Number(slider.value);
      const idx = steps.findIndex(s => v >= s.min && v <= s.max);
      if (desc) desc.textContent = steps[idx]?.description || '';
      if (hasPerStep) renderStep(steps[idx], idx);
    };

    slider.addEventListener('input', update);
    update();

    if (!hasPerStep) this._appendSingleChoice();
  }

  // ── 3. Layer toggle ──────────────────────────────────────

  async _mountLayerToggle() {
    const mapId = this._lesson.activity?.mapId;
    if (!mapId) { this._mountFallback(); return; }

    const wrap = await this._buildMap(mapId);
    if (!wrap) { this._mountFallback(); return; }
    this._el.appendChild(wrap);

    const svg = wrap.querySelector('svg');
    if (svg) {
      this._layers = new LayerEngine(svg, this._state);
      this._layers.discoverLayers();
      this._layers.setVisible(
        (this._lesson.layers || []).filter(l => l.visible).map(l => l.id)
      );
    }
    this._appendSingleChoice();
  }

  // ── 4. Before / After ────────────────────────────────────

  async _mountBeforeAfter() {
    const cfg  = this._lesson.activity?.compareConfig || {};
    const wrap = document.createElement('div');
    wrap.className = 'activity-map-wrap';
    this._el.appendChild(wrap);

    new ComparisonEngine(wrap, {
      beforeContent: cfg.beforeSvg  || PLACEHOLDER_SVG('Antes',  '#c4a35a'),
      afterContent:  cfg.afterSvg   || PLACEHOLDER_SVG('Depois', '#4a7aaa'),
      beforeLabel:   cfg.beforeLabel || 'Antes',
      afterLabel:    cfg.afterLabel  || 'Depois',
    }).mount();

    this._appendSingleChoice();
  }

  // ── 5. Flow map ──────────────────────────────────────────

  async _mountFlowMap() {
    const { mapId, flows = [] } = this._lesson.activity || {};
    const svgContent = mapId ? await loadSVG(`assets/maps/${mapId}.svg`) : null;

    const wrap = document.createElement('div');
    wrap.className = 'map-container activity-map-wrap';
    this._el.appendChild(wrap);

    new MapEngine(wrap, {
      svgContent: svgContent || PLACEHOLDER_SVG('Mapa de Fluxos', '#e8e2d4'),
    }).mount();

    if (flows.length) {
      const svg = wrap.querySelector('svg');
      if (svg) new FlowEngine(svg, flows).mount();
    }

    this._appendSingleChoice();
  }

  // ── 6. Map click ─────────────────────────────────────────

  async _mountMapClick() {
    const { mapId, instruction } = this._lesson.activity || {};
    if (!mapId) { this._mountFallback(); return; }

    const p = document.createElement('p');
    p.className = 'activity-map-instruction';
    p.textContent = instruction || 'Clique na região correta.';
    this._el.appendChild(p);

    const wrap = await this._buildMap(mapId, {
      onRegionClick: (id) => this._feedback.validate(this._lesson.activity, id),
    });
    if (!wrap) { this._mountFallback(); return; }
    this._el.appendChild(wrap);
  }

  // ── 7. Single choice ─────────────────────────────────────

  _mountSingleChoice() {
    const act = this._lesson.activity;
    if (!act?.question) return;

    const wrap = document.createElement('div');
    wrap.className = 'activity-question-wrap';
    wrap.innerHTML =
      `<p class="activity-question-text">${act.question}</p>
       <div class="activity-options-list">
         ${(act.options || []).map(o =>
           `<button class="btn btn-outline" data-option="${o.value}"
                    style="text-align:left;justify-content:flex-start;">${o.label}</button>`
         ).join('')}
       </div>`;

    wrap.querySelectorAll('[data-option]').forEach(btn =>
      btn.addEventListener('click', () => this._feedback.validate(act, btn.dataset.option))
    );
    this._el.appendChild(wrap);
  }

  // ── Fallback ─────────────────────────────────────────────

  _mountFallback() {
    this._el.innerHTML = '<p class="activity-empty">Atividade em desenvolvimento.</p>';
  }
}

// ── SVG inline auxiliares ─────────────────────────────────

const COMPASS_SVG =
  `<svg viewBox="0 0 200 200" width="200" height="200"
       aria-label="Rosa dos ventos" role="img" style="max-width:200px;">
    <circle cx="100" cy="100" r="90" fill="var(--map-bg)" stroke="var(--color-border)" stroke-width="2"/>
    <circle cx="100" cy="100" r="4"  fill="var(--color-primary)"/>
    <polygon points="100,20 92,100 108,100"  fill="var(--color-accent)"/>
    <text x="100" y="14"  text-anchor="middle" font-family="var(--font-mono)" font-size="14" font-weight="bold" fill="var(--color-accent)">N</text>
    <polygon points="100,180 92,100 108,100" fill="var(--color-primary)"/>
    <text x="100" y="196" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--color-primary)">S</text>
    <polygon points="180,100 100,92 100,108" fill="var(--color-primary)"/>
    <text x="192" y="104" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--color-primary)">L</text>
    <polygon points="20,100 100,92 100,108"  fill="var(--color-primary)"/>
    <text x="8"   y="104" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--color-primary)">O</text>
  </svg>`;

function PLACEHOLDER_SVG(label, color) {
  return `<svg viewBox="0 0 600 340" style="width:100%;height:auto;background:${color}22;" aria-label="${label}">
    <rect width="600" height="340" fill="${color}22" rx="4"/>
    <text x="300" y="180" text-anchor="middle" font-family="Georgia,serif"
          font-size="24" fill="${color}" opacity="0.6">${label}</text>
  </svg>`;
}
