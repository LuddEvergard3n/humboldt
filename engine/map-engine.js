/**
 * Native SVG map renderer with accessible regions, bounded zoom and opt-in pan.
 * It has no runtime dependency and is shared by lessons and the Atlas.
 */
/** @param {number} value @returns {number} */
export function clampMapScale(value) { return Math.max(1, Math.min(4, value)); }

export class MapEngine {
  /**
   * @param {HTMLElement} container
   * @param {{svgContent:string,onRegionClick?:Function,zoomable?:boolean,label?:string,onStatus?:Function}} options
   */
  constructor(container, options = {}) {
    this._container = container;
    this._options = { onRegionClick: null, onStatus: null, zoomable: false, label: 'Mapa interativo', ...options };
    this._scale = 1;
    this._x = 0;
    this._y = 0;
    this._panEnabled = false;
    this._drag = null;
    this._tooltip = null;
    this._viewport = null;
    this._svg = null;
    this._abort = new AbortController();
  }

  /** Render the SVG and connect its controls. @returns {MapEngine} */
  mount() {
    this._container.classList.add('map-container');
    this._container.innerHTML = `<div class="map-viewport" tabindex="0" aria-label="${this._options.label}">${this._options.svgContent}</div>`;
    this._viewport = this._container.querySelector('.map-viewport');
    this._svg = this._viewport?.querySelector('svg') || null;
    if (!this._svg) return this;

    this._svg.setAttribute('aria-label', this._options.label);
    this._svg.setAttribute('role', 'img');
    this._buildTooltip();
    this._connectRegions();
    if (this._options.zoomable) this._initNavigation();
    return this;
  }

  _buildTooltip() {
    this._tooltip = document.createElement('div');
    this._tooltip.className = 'map-tooltip';
    this._tooltip.setAttribute('aria-hidden', 'true');
    this._container.appendChild(this._tooltip);
  }

  _connectRegions() {
    this._svg.querySelectorAll('[data-name],[data-territory]').forEach(element => {
      const name = element.dataset.name || element.getAttribute('aria-label') || element.dataset.territory;
      const id = element.dataset.id || element.dataset.territory || name;
      element.classList.add('map-path');
      element.setAttribute('tabindex', '0');
      element.setAttribute('role', 'button');
      element.setAttribute('aria-label', name);
      element.addEventListener('mouseenter', event => this._showTooltip(event, element, name), { signal: this._abort.signal });
      element.addEventListener('mousemove', event => this._moveTooltip(event), { signal: this._abort.signal });
      element.addEventListener('mouseleave', () => this._hideTooltip(element), { signal: this._abort.signal });
      element.addEventListener('focus', event => this._showTooltip(event, element, name), { signal: this._abort.signal });
      element.addEventListener('blur', () => this._hideTooltip(element), { signal: this._abort.signal });
      element.addEventListener('click', () => this._options.onRegionClick?.(id, name), { signal: this._abort.signal });
      element.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        this._options.onRegionClick?.(id, name);
      }, { signal: this._abort.signal });
    });
  }

  _showTooltip(event, element, name) {
    element.classList.add('is-focused');
    this._tooltip.textContent = name;
    this._tooltip.classList.add('visible');
    this._tooltip.setAttribute('aria-hidden', 'false');
    if ('clientX' in event && event.clientX) this._moveTooltip(event);
    else {
      const elementRect = element.getBoundingClientRect();
      const containerRect = this._container.getBoundingClientRect();
      this._tooltip.style.left = `${elementRect.left - containerRect.left + elementRect.width / 2}px`;
      this._tooltip.style.top = `${Math.max(8, elementRect.top - containerRect.top - 34)}px`;
    }
  }

  _moveTooltip(event) {
    const rect = this._container.getBoundingClientRect();
    this._tooltip.style.left = `${event.clientX - rect.left + 12}px`;
    this._tooltip.style.top = `${event.clientY - rect.top - 28}px`;
  }

  _hideTooltip(element) {
    element?.classList.remove('is-focused');
    this._tooltip?.classList.remove('visible');
    this._tooltip?.setAttribute('aria-hidden', 'true');
  }

  _initNavigation() {
    const controls = document.createElement('div');
    controls.className = 'map-zoom-controls';
    controls.setAttribute('aria-label', 'Controles do mapa');
    controls.innerHTML = `
      <button type="button" data-map-action="in" aria-label="Ampliar mapa">+</button>
      <button type="button" data-map-action="out" aria-label="Reduzir mapa">−</button>
      <button type="button" data-map-action="pan" aria-label="Ativar movimento do mapa" aria-pressed="false">Mover</button>
      <button type="button" data-map-action="reset" aria-label="Redefinir mapa">↺</button>`;
    this._container.appendChild(controls);
    controls.addEventListener('click', event => {
      const action = event.target.closest('[data-map-action]')?.dataset.mapAction;
      if (!action) return;
      if (action === 'in') this._setScale(this._scale * 1.3);
      if (action === 'out') this._setScale(this._scale / 1.3);
      if (action === 'reset') this.reset();
      if (action === 'pan') {
        this._panEnabled = !this._panEnabled;
        event.target.setAttribute('aria-pressed', String(this._panEnabled));
        this._viewport.classList.toggle('is-pan-enabled', this._panEnabled);
        this._announce(this._panEnabled ? 'Movimento do mapa ativado' : 'Movimento do mapa desativado');
      }
    }, { signal: this._abort.signal });

    this._viewport.addEventListener('pointerdown', event => {
      if (!this._panEnabled || this._scale === 1) return;
      this._drag = { pointerId: event.pointerId, x: event.clientX - this._x, y: event.clientY - this._y };
      this._viewport.setPointerCapture(event.pointerId);
      this._viewport.classList.add('is-panning');
      event.preventDefault();
    }, { signal: this._abort.signal });
    this._viewport.addEventListener('pointermove', event => {
      if (!this._drag || this._drag.pointerId !== event.pointerId) return;
      this._x = event.clientX - this._drag.x;
      this._y = event.clientY - this._drag.y;
      this._applyTransform();
    }, { signal: this._abort.signal });
    const stopDrag = () => { this._drag = null; this._viewport.classList.remove('is-panning'); };
    this._viewport.addEventListener('pointerup', stopDrag, { signal: this._abort.signal });
    this._viewport.addEventListener('pointercancel', stopDrag, { signal: this._abort.signal });
    this._viewport.addEventListener('keydown', event => {
      if (!this._panEnabled || this._scale === 1 || !event.key.startsWith('Arrow')) return;
      event.preventDefault();
      const step = event.shiftKey ? 40 : 16;
      if (event.key === 'ArrowLeft') this._x -= step;
      if (event.key === 'ArrowRight') this._x += step;
      if (event.key === 'ArrowUp') this._y -= step;
      if (event.key === 'ArrowDown') this._y += step;
      this._applyTransform();
    }, { signal: this._abort.signal });
  }

  _setScale(value) {
    this._scale = clampMapScale(value);
    if (this._scale === 1) { this._x = 0; this._y = 0; }
    this._applyTransform();
    this._announce(`Zoom ${Math.round(this._scale * 100)} por cento`);
  }

  _applyTransform() {
    this._svg.style.transform = `translate(${this._x}px, ${this._y}px) scale(${this._scale})`;
    this._svg.style.transformOrigin = 'center';
  }

  _announce(message) { this._options.onStatus?.(message); }

  /** Return the map to its initial extent. */
  reset() {
    this._scale = 1;
    this._x = 0;
    this._y = 0;
    this._applyTransform();
    this._announce('Mapa redefinido');
  }

  /** Remove listeners and generated markup. */
  unmount() {
    this._abort.abort();
    this._container.innerHTML = '';
    this._tooltip = null;
    this._viewport = null;
    this._svg = null;
  }
}
