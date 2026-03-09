/**
 * flow-engine.js — Motor de mapas de fluxo (setas animadas)
 *
 * Renderiza fluxos em SVG como setas com largura proporcional
 * ao volume e animação de dash-offset para indicar direção.
 *
 * Cada fluxo:
 *   { from: [x, y], to: [x, y], value: number, label: string, color: string }
 *
 * Coordenadas em % do viewBox (0..100).
 */

export class FlowEngine {
  /**
   * @param {SVGElement} svg     - SVG base (deve ter viewBox definido)
   * @param {Object[]}   flows   - array de fluxos
   * @param {Object}     [opts]
   * @param {number}     [opts.minWidth]  - espessura mínima de seta (default 2)
   * @param {number}     [opts.maxWidth]  - espessura máxima de seta (default 18)
   * @param {number}     [opts.animSpeed] - velocidade da animação em segundos (default 2)
   */
  constructor(svg, flows, opts = {}) {
    this._svg    = svg;
    this._flows  = flows;
    this._opts   = { minWidth: 2, maxWidth: 18, animSpeed: 2, ...opts };
    this._group  = null;
  }

  /** Renderiza os fluxos no SVG. */
  mount() {
    this._group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this._group.setAttribute('id', 'flow-layer');
    this._group.setAttribute('data-layer', 'flows');

    const vb   = this._svg.viewBox.baseVal;
    const maxV = Math.max(...this._flows.map(f => f.value), 1);

    this._flows.forEach((flow, i) => {
      this._renderFlow(flow, i, vb, maxV);
    });

    this._svg.appendChild(this._group);
  }

  /**
   * Renderiza um fluxo individual como path com marcador de seta.
   * @param {Object}   flow
   * @param {number}   idx
   * @param {DOMRect}  vb
   * @param {number}   maxV
   */
  _renderFlow(flow, idx, vb, maxV) {
    const toX  = f => (f / 100) * vb.width;
    const toY  = f => (f / 100) * vb.height;

    const x1 = toX(flow.from[0]), y1 = toY(flow.from[1]);
    const x2 = toX(flow.to[0]),   y2 = toY(flow.to[1]);

    // Largura da seta proporcional ao valor
    const width = this._opts.minWidth +
      ((flow.value / maxV) * (this._opts.maxWidth - this._opts.minWidth));

    // Curva bezier para fluxos mais naturais
    const cpX = (x1 + x2) / 2 + (y2 - y1) * 0.15;
    const cpY = (y1 + y2) / 2 - (x2 - x1) * 0.15;

    const markerId = `arrow-${idx}`;
    this._addArrowMarker(markerId, flow.color || '#1e3a5f', width);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`);
    path.setAttribute('stroke', flow.color || '#1e3a5f');
    path.setAttribute('stroke-width', width);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-opacity', '0.65');
    path.setAttribute('marker-end', `url(#${markerId})`);

    // Animação de fluxo (dash-offset)
    const len = 120;
    path.setAttribute('stroke-dasharray', `${len * 0.6} ${len * 0.4}`);
    path.style.animation =
      `flow-anim-${idx} ${this._opts.animSpeed}s linear infinite`;

    // Injeta keyframe dinamicamente
    this._injectKeyframe(`flow-anim-${idx}`, len);

    // Tooltip de label
    if (flow.label) {
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = `${flow.label}: ${flow.value}`;
      path.appendChild(title);
    }

    this._group.appendChild(path);
  }

  /**
   * Adiciona um marcador de seta (arrowhead) ao <defs> do SVG.
   * @param {string} id
   * @param {string} color
   * @param {number} size
   */
  _addArrowMarker(id, color, size) {
    let defs = this._svg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      this._svg.insertBefore(defs, this._svg.firstChild);
    }

    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id',          id);
    marker.setAttribute('markerWidth',  '8');
    marker.setAttribute('markerHeight', '6');
    marker.setAttribute('refX',         '7');
    marker.setAttribute('refY',         '3');
    marker.setAttribute('orient',       'auto');

    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', '0 0, 8 3, 0 6');
    poly.setAttribute('fill', color);
    poly.setAttribute('opacity', '0.7');

    marker.appendChild(poly);
    defs.appendChild(marker);
  }

  /**
   * Injeta um @keyframes de animação de dash no <head>.
   * Cada fluxo tem animação independente.
   * @param {string} name
   * @param {number} len
   */
  _injectKeyframe(name, len) {
    const styleId = `ks-${name}`;
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent =
      `@keyframes ${name} { from { stroke-dashoffset: ${len}; } to { stroke-dashoffset: 0; } }`;
    document.head.appendChild(style);
  }

  /** Remove os fluxos do SVG. */
  unmount() {
    if (this._group && this._group.parentNode) {
      this._group.parentNode.removeChild(this._group);
    }
    this._group = null;
  }
}
