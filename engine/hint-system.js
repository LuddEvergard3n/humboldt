/**
 * hint-system.js — Sistema de dicas progressivas
 *
 * As dicas são reveladas uma a uma conforme o aluno erra.
 * Cada dica foca o raciocínio — não entrega a resposta.
 *
 * Tipos de dica (do JSON da lição):
 *   { type: 'text',   content: 'string' }
 *   { type: 'layer',  layerId: 'string', label: 'string' }
 *   { type: 'focus',  regionId: 'string', label: 'string' }
 *   { type: 'reduce', removeOptions: ['a', 'b'] }
 */

export class HintSystem {
  /**
   * @param {HTMLElement}             hintEl   - elemento .hint-bubble
   * @param {Object[]|undefined}      hints    - lista de dicas da lição
   * @param {import('../engine/layer-engine.js').LayerEngine} [layerEngine]
   */
  constructor(hintEl, hints, layerEngine) {
    this._el     = hintEl;
    this._hints  = hints || [];
    this._layers = layerEngine || null;
    this._index  = -1;
  }

  /**
   * Revela a próxima dica disponível.
   * Chamado automaticamente pelo FeedbackEngine após N erros.
   */
  show() {
    this._index++;
    if (this._index >= this._hints.length) return;

    const hint = this._hints[this._index];
    this._execute(hint);
  }

  /**
   * Executa a ação da dica conforme o tipo.
   * @param {Object} hint
   */
  _execute(hint) {
    switch (hint.type) {
      case 'text':
        this._showBubble(hint.content);
        break;

      case 'layer':
        if (this._layers) this._layers.show(hint.layerId);
        this._showBubble(hint.label || `Ative a camada: ${hint.layerId}`);
        break;

      case 'focus':
        this._focusRegion(hint.regionId);
        this._showBubble(hint.label || `Observe esta região com atenção.`);
        break;

      case 'reduce':
        this._reduceOptions(hint.removeOptions || []);
        this._showBubble(hint.label || 'Elimine as opções que claramente não se aplicam.');
        break;

      default:
        this._showBubble(String(hint.content || ''));
    }
  }

  /**
   * Exibe a bolha de dica com o texto fornecido.
   * @param {string} text
   */
  _showBubble(text) {
    if (!this._el) return;
    this._el.textContent = `Dica: ${text}`;
    this._el.classList.add('visible');

    if (window._humboldtAnnounce) {
      window._humboldtAnnounce(`Dica: ${text}`);
    }
  }

  /**
   * Pulsa visualmente uma região do mapa para atrair atenção.
   * @param {string} regionId - valor do data-id no SVG
   */
  _focusRegion(regionId) {
    const el = document.querySelector(`[data-id="${regionId}"]`);
    if (!el) return;

    el.style.animation = 'pulse-border 1s ease 3';
    el.addEventListener('animationend', () => {
      el.style.animation = '';
    }, { once: true });
  }

  /**
   * Remove alternativas incorretas de um exercício de escolha.
   * @param {string[]} ids - valores dos options a remover
   */
  _reduceOptions(ids) {
    ids.forEach(id => {
      const el = document.querySelector(`[data-option="${id}"]`);
      if (el) {
        el.style.opacity = '0.3';
        el.style.pointerEvents = 'none';
        el.setAttribute('aria-disabled', 'true');
      }
    });
  }

  /** Reseta o sistema para uma nova atividade. */
  reset() {
    this._index = -1;
    if (this._el) {
      this._el.textContent = '';
      this._el.classList.remove('visible');
    }
  }
}
