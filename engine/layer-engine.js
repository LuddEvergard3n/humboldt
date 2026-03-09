/**
 * layer-engine.js — Motor de gerenciamento de camadas SVG
 *
 * Cada "camada" é um <g id="layer-{id}"> dentro de um SVG.
 * Este motor controla visibilidade, opacidade e interação.
 *
 * Contrato esperado no SVG:
 *   <g id="layer-bioma-cerrado" data-layer="bioma-cerrado" ...>
 */

export class LayerEngine {
  /**
   * @param {SVGElement|HTMLElement} svgOrContainer - SVG ou container que o contém
   * @param {import('../js/state.js').State} state
   */
  constructor(svgOrContainer, state) {
    this._state = state;
    this._svg   = svgOrContainer instanceof SVGElement
      ? svgOrContainer
      : svgOrContainer.querySelector('svg');

    /** @type {Map<string, SVGElement>} id → elemento */
    this._layers = new Map();
  }

  /**
   * Registra todas as camadas encontradas no SVG.
   * Deve ser chamado após o SVG estar no DOM.
   */
  discoverLayers() {
    if (!this._svg) return;
    this._svg.querySelectorAll('[data-layer]').forEach(el => {
      this._layers.set(el.dataset.layer, el);
    });
  }

  /**
   * Torna uma camada visível.
   * @param {string} layerId
   */
  show(layerId) {
    const el = this._layers.get(layerId);
    if (!el) return;
    el.classList.remove('map-layer-hidden');

    const active = this._state.get('activeLayers');
    if (!active.includes(layerId)) {
      this._state.set('activeLayers', [...active, layerId]);
    }
  }

  /**
   * Torna uma camada invisível.
   * @param {string} layerId
   */
  hide(layerId) {
    const el = this._layers.get(layerId);
    if (!el) return;
    el.classList.add('map-layer-hidden');

    const active = this._state.get('activeLayers');
    this._state.set('activeLayers', active.filter(id => id !== layerId));
  }

  /**
   * Alterna visibilidade de uma camada.
   * @param {string} layerId
   * @returns {boolean} visível após o toggle
   */
  toggle(layerId) {
    const el = this._layers.get(layerId);
    if (!el) return false;

    const hidden = el.classList.contains('map-layer-hidden');
    if (hidden) { this.show(layerId); return true; }
    else        { this.hide(layerId); return false; }
  }

  /**
   * Define exatamente quais camadas ficam visíveis.
   * Oculta todas as outras registradas.
   * @param {string[]} visibleIds
   */
  setVisible(visibleIds) {
    this._layers.forEach((el, id) => {
      if (visibleIds.includes(id)) this.show(id);
      else                         this.hide(id);
    });
  }

  /** Exibe todas as camadas registradas. */
  showAll() {
    this._layers.forEach((_, id) => this.show(id));
  }

  /** Oculta todas as camadas registradas. */
  hideAll() {
    this._layers.forEach((_, id) => this.hide(id));
  }

  /**
   * Retorna os ids de todas as camadas registradas.
   * @returns {string[]}
   */
  getLayerIds() {
    return Array.from(this._layers.keys());
  }

  /**
   * Verifica se uma camada está visível.
   * @param {string} layerId
   * @returns {boolean}
   */
  isVisible(layerId) {
    const el = this._layers.get(layerId);
    if (!el) return false;
    return !el.classList.contains('map-layer-hidden');
  }
}
