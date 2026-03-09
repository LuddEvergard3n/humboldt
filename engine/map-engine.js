/**
 * map-engine.js — Motor de renderização de mapas SVG
 *
 * Responsabilidades:
 *  - inserir um SVG de mapa em um container
 *  - gerenciar pan e zoom leve (CSS transform)
 *  - tooltip ao hover sobre regiões com [data-name]
 *  - callbacks de clique em regiões
 *
 * Não depende de bibliotecas externas.
 */

export class MapEngine {
  /**
   * @param {HTMLElement}  container  - elemento que receberá o mapa
   * @param {Object}       options
   * @param {string}       options.svgContent     - string SVG completo
   * @param {Function}     [options.onRegionClick] - (regionId, regionName) => void
   * @param {boolean}      [options.zoomable]      - habilitar zoom (default: false)
   */
  constructor(container, options = {}) {
    this._container = container;
    this._options   = {
      onRegionClick: null,
      zoomable:      false,
      ...options,
    };

    this._scale  = 1;
    this._tooltip = null;
    this._wrapper = null;
  }

  /** Renderiza o SVG e conecta os eventos. */
  mount() {
    this._container.classList.add('map-container');
    this._container.innerHTML = this._options.svgContent;

    const svg = this._container.querySelector('svg');
    if (!svg) return;

    svg.setAttribute('aria-label', 'Mapa interativo');
    svg.setAttribute('role', 'img');

    this._buildTooltip();
    this._connectRegions(svg);

    if (this._options.zoomable) {
      this._initZoom(svg);
    }
  }

  /** Cria o elemento de tooltip flutuante. */
  _buildTooltip() {
    this._tooltip = document.createElement('div');
    this._tooltip.className = 'map-tooltip';
    this._tooltip.setAttribute('aria-hidden', 'true');
    this._container.appendChild(this._tooltip);
  }

  /**
   * Conecta hover e click a todos os elementos com [data-name].
   * @param {SVGElement} svg
   */
  _connectRegions(svg) {
    svg.querySelectorAll('[data-name]').forEach(el => {
      el.classList.add('map-path');
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', el.dataset.name);

      // Hover — mostra tooltip
      el.addEventListener('mouseenter', e => this._showTooltip(e, el.dataset.name));
      el.addEventListener('mousemove',  e => this._moveTooltip(e));
      el.addEventListener('mouseleave', () => this._hideTooltip());

      // Click
      el.addEventListener('click', () => {
        if (this._options.onRegionClick) {
          this._options.onRegionClick(el.dataset.id || el.dataset.name, el.dataset.name);
        }
      });

      // Teclado
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (this._options.onRegionClick) {
            this._options.onRegionClick(el.dataset.id || el.dataset.name, el.dataset.name);
          }
        }
      });
    });
  }

  /**
   * Exibe o tooltip com o nome da região.
   * @param {MouseEvent} e
   * @param {string}     name
   */
  _showTooltip(e, name) {
    if (!this._tooltip) return;
    this._tooltip.textContent = name;
    this._tooltip.classList.add('visible');
    this._moveTooltip(e);
  }

  /** @param {MouseEvent} e */
  _moveTooltip(e) {
    if (!this._tooltip) return;
    const rect = this._container.getBoundingClientRect();
    const x = e.clientX - rect.left + 12;
    const y = e.clientY - rect.top  - 28;
    this._tooltip.style.left = `${x}px`;
    this._tooltip.style.top  = `${y}px`;
  }

  _hideTooltip() {
    if (this._tooltip) this._tooltip.classList.remove('visible');
  }

  /**
   * Zoom mínimo via botões — não drag, para manter simplicidade.
   * @param {SVGElement} svg
   */
  _initZoom(svg) {
    const btnGroup = document.createElement('div');
    btnGroup.className = 'map-zoom-controls';
    btnGroup.innerHTML = `
      <button class="btn btn-sm" data-zoom="in"  aria-label="Ampliar">+</button>
      <button class="btn btn-sm" data-zoom="out" aria-label="Reduzir">−</button>
      <button class="btn btn-sm" data-zoom="reset" aria-label="Resetar zoom">&#8635;</button>
    `;
    this._container.appendChild(btnGroup);

    btnGroup.addEventListener('click', e => {
      const action = e.target.dataset.zoom;
      if (!action) return;

      if (action === 'in')    this._scale = Math.min(4, this._scale * 1.3);
      if (action === 'out')   this._scale = Math.max(1, this._scale / 1.3);
      if (action === 'reset') this._scale = 1;

      svg.style.transform       = `scale(${this._scale})`;
      svg.style.transformOrigin = 'center center';
      svg.style.transition      = 'transform 200ms ease';
    });
  }

  /** Desmonta e limpa o mapa. */
  unmount() {
    this._container.innerHTML = '';
    this._tooltip = null;
  }
}
