/**
 * comparison-engine.js — Slider de comparação temporal (antes/depois)
 *
 * Renderiza dois SVGs/imagens lado a lado com divisor arrastável.
 * Funciona com mouse e touch.
 *
 * Estrutura DOM gerada:
 *   .compare-container
 *     .compare-before  (camada completa — visível)
 *     .compare-after   (camada com clip-path)
 *     .compare-divider (linha vertical branca)
 *     .compare-handle  (círculo arrastável)
 *     .compare-label.compare-label-before
 *     .compare-label.compare-label-after
 */

export class ComparisonEngine {
  /**
   * @param {HTMLElement} container
   * @param {Object}      options
   * @param {string}      options.beforeContent  - HTML/SVG da cena "antes"
   * @param {string}      options.afterContent   - HTML/SVG da cena "depois"
   * @param {string}      [options.beforeLabel]  - ex: "1950"
   * @param {string}      [options.afterLabel]   - ex: "2024"
   * @param {number}      [options.initialPos]   - 0..1, padrão 0.5
   */
  constructor(container, options = {}) {
    this._container = container;
    this._options   = {
      beforeLabel: 'Antes',
      afterLabel:  'Depois',
      initialPos:  0.5,
      ...options,
    };

    this._pos      = this._options.initialPos;
    this._dragging = false;
    this._els      = {};
  }

  /** Constrói o DOM e ativa os eventos de drag. */
  mount() {
    this._container.innerHTML = `
      <div class="compare-container" style="aspect-ratio:16/9;position:relative;">
        <div class="compare-before">${this._options.beforeContent}</div>
        <div class="compare-after">${this._options.afterContent}</div>
        <div class="compare-divider"></div>
        <div class="compare-handle" role="slider" aria-label="Dividir antes e depois"
             aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" tabindex="0"></div>
        <span class="compare-label compare-label-before">${this._options.beforeLabel}</span>
        <span class="compare-label compare-label-after">${this._options.afterLabel}</span>
      </div>`;

    const wrap = this._container.querySelector('.compare-container');
    this._els = {
      wrap,
      before:   wrap.querySelector('.compare-before'),
      after:    wrap.querySelector('.compare-after'),
      divider:  wrap.querySelector('.compare-divider'),
      handle:   wrap.querySelector('.compare-handle'),
    };

    this._applyPosition(this._pos);
    this._bindEvents(wrap);
  }

  /**
   * Atualiza a posição do divisor.
   * @param {number} ratio - 0..1
   */
  _applyPosition(ratio) {
    const pct = `${(ratio * 100).toFixed(1)}%`;
    this._els.after.style.clipPath     = `inset(0 ${(100 - ratio * 100).toFixed(1)}% 0 0)`;
    this._els.divider.style.left       = pct;
    this._els.handle.style.left        = pct;
    this._els.handle.setAttribute('aria-valuenow', Math.round(ratio * 100));
  }

  /** Conecta eventos de mouse, touch e teclado. */
  _bindEvents(wrap) {
    // Mouse
    this._els.handle.addEventListener('mousedown', e => {
      e.preventDefault();
      this._dragging = true;
    });

    wrap.addEventListener('mousemove', e => {
      if (!this._dragging) return;
      this._updateFromEvent(e, wrap);
    });

    document.addEventListener('mouseup', () => { this._dragging = false; });

    // Touch
    this._els.handle.addEventListener('touchstart', e => {
      e.preventDefault();
      this._dragging = true;
    }, { passive: false });

    wrap.addEventListener('touchmove', e => {
      if (!this._dragging) return;
      e.preventDefault();
      this._updateFromTouch(e, wrap);
    }, { passive: false });

    document.addEventListener('touchend', () => { this._dragging = false; });

    // Teclado — setas ajustam em 5%
    this._els.handle.addEventListener('keydown', e => {
      const step = 0.05;
      if (e.key === 'ArrowLeft')  this._pos = Math.max(0, this._pos - step);
      if (e.key === 'ArrowRight') this._pos = Math.min(1, this._pos + step);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        this._applyPosition(this._pos);
      }
    });

    // Click na área inteira move o divisor
    wrap.addEventListener('click', e => {
      if (e.target === this._els.handle) return;
      this._updateFromEvent(e, wrap);
    });
  }

  /** @param {MouseEvent} e */
  _updateFromEvent(e, wrap) {
    const rect  = wrap.getBoundingClientRect();
    this._pos   = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    this._applyPosition(this._pos);
  }

  /** @param {TouchEvent} e */
  _updateFromTouch(e, wrap) {
    const touch = e.touches[0];
    const rect  = wrap.getBoundingClientRect();
    this._pos   = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    this._applyPosition(this._pos);
  }

  unmount() {
    this._container.innerHTML = '';
  }
}
