/**
 * feedback-engine.js — Validação e feedback de atividades
 *
 * Responsabilidades:
 *  - validar respostas de diferentes tipos de atividade
 *  - renderizar feedback visual (correto / incorreto / dica)
 *  - contabilizar tentativas para acionar dicas progressivas
 *
 * Tipos suportados:
 *   'single-choice'   — uma alternativa correta entre N
 *   'multi-choice'    — N alternativas corretas entre M
 *   'ordering'        — ordenar elementos na sequência certa
 *   'map-click'       — clicar na região correta do mapa
 *   'text-match'      — comparação de texto normalizado
 */

export class FeedbackEngine {
  /**
   * @param {HTMLElement}              feedbackEl - elemento .feedback-msg
   * @param {import('./hint-system.js').HintSystem} hintSystem
   */
  constructor(feedbackEl, hintSystem) {
    this._el        = feedbackEl;
    this._hints     = hintSystem;
    this._attempts  = 0;
    this._solved    = false;
  }

  /**
   * Valida uma resposta e exibe o feedback adequado.
   *
   * @param {Object} activity   - definição da atividade (do JSON)
   * @param {any}    answer     - resposta fornecida pelo aluno
   * @returns {boolean}         - true se correto
   */
  validate(activity, answer) {
    if (this._solved) return true;

    this._attempts++;
    const correct = this._check(activity, answer);

    if (correct) {
      this._solved = true;
      this._show('correct', activity.feedback?.correct || 'Correto. Bem observado.');
    } else {
      if (this._attempts >= (activity.hintAfter ?? 2)) {
        this._hints.show();
      }
      this._show('incorrect', activity.feedback?.incorrect || 'Tente novamente. Observe com mais atenção.');
    }

    return correct;
  }

  /**
   * Lógica de verificação por tipo de atividade.
   * @param {Object} activity
   * @param {any}    answer
   * @returns {boolean}
   */
  _check(activity, answer) {
    switch (activity.type) {
      case 'compass':   // falls through — same validation as single-choice
      case 'scale':      // falls through
      case 'single-choice':
        return String(answer) === String(activity.correct);

      case 'multi-choice':
        if (!Array.isArray(answer)) return false;
        if (answer.length !== activity.correct.length) return false;
        return activity.correct.every(c => answer.includes(c));

      case 'ordering': {
        if (!Array.isArray(answer)) return false;
        return activity.correct.every((c, i) => String(answer[i]) === String(c));
      }

      case 'map-click':
        return String(answer) === String(activity.correct);

      case 'text-match': {
        const normalize = s => s.trim().toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return normalize(String(answer)) === normalize(String(activity.correct));
      }

      default:
        console.warn(`FeedbackEngine: tipo desconhecido "${activity.type}"`);
        return false;
    }
  }

  /**
   * Exibe a mensagem de feedback com o estilo adequado.
   * @param {'correct'|'incorrect'|'hint'} type
   * @param {string}                        msg
   */
  _show(type, msg) {
    if (!this._el) return;
    this._el.className = `feedback-msg ${type} visible`;
    this._el.textContent = msg;

    if (window._humboldtAnnounce) {
      window._humboldtAnnounce(msg);
    }
  }

  /** Reseta o estado para uma nova atividade. */
  reset() {
    this._attempts = 0;
    this._solved   = false;
    if (this._el) {
      this._el.className = 'feedback-msg';
      this._el.textContent = '';
    }
  }

  /** Retorna o número de tentativas acumuladas. */
  get attempts() { return this._attempts; }

  /** Retorna se a atividade foi resolvida. */
  get solved() { return this._solved; }
}
