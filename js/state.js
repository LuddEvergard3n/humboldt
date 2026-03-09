/**
 * state.js — Estado global do Humboldt
 *
 * Padrão: store simples com notificação por callbacks registrados.
 * Sem dependências externas. Sem proxies.
 *
 * Responsabilidades:
 *  - manter o estado corrente da aplicação
 *  - notificar observadores quando um campo muda
 *  - não conter lógica de negócio
 */

export class State {
  constructor() {
    /** @type {Object} Estado interno */
    this._data = {
      currentModule:   null,   // string: 'cartography' | 'brazil' | ...
      currentLesson:   null,   // string: id da lição
      currentStep:     0,      // índice do passo na lição
      activeLayers:    [],     // string[]: ids de camadas ativas no mapa
      teacherMode:     false,  // boolean
      highContrast:    false,  // boolean
      fontSize:        16,     // number: tamanho base em px
      comparePosition: 0.5,    // number: 0..1, posição do slider de comparação
      hintVisible:     false,  // boolean
      activityState:   null,   // any: estado da atividade corrente
    };

    /** @type {Map<string, Function[]>} */
    this._listeners = new Map();
  }

  /**
   * Lê um valor do estado.
   * @param {string} key
   * @returns {any}
   */
  get(key) {
    return this._data[key];
  }

  /**
   * Atualiza um ou mais valores e notifica observadores.
   * @param {string|Object} keyOrPatch  - chave ou objeto {key: val}
   * @param {any} [value]               - valor (quando keyOrPatch é string)
   */
  set(keyOrPatch, value) {
    const patch = (typeof keyOrPatch === 'string')
      ? { [keyOrPatch]: value }
      : keyOrPatch;

    for (const [k, v] of Object.entries(patch)) {
      const previous = this._data[k];
      if (previous === v) continue; // sem mudança — não notifica

      this._data[k] = v;
      this._emit(k, v, previous);
    }
  }

  /**
   * Registra um callback para mudanças em uma chave específica.
   * @param {string}   key
   * @param {Function} fn  - fn(newValue, previousValue)
   * @returns {Function}   - função de cancelamento de registro
   */
  on(key, fn) {
    if (!this._listeners.has(key)) {
      this._listeners.set(key, []);
    }
    this._listeners.get(key).push(fn);

    return () => {
      const list = this._listeners.get(key);
      if (list) {
        const idx = list.indexOf(fn);
        if (idx !== -1) list.splice(idx, 1);
      }
    };
  }

  /**
   * Notifica todos os observadores de uma chave.
   * @param {string} key
   * @param {any}    newVal
   * @param {any}    prevVal
   */
  _emit(key, newVal, prevVal) {
    const list = this._listeners.get(key);
    if (!list || list.length === 0) return;
    for (const fn of list) {
      try { fn(newVal, prevVal); }
      catch (err) { console.error(`State listener error [${key}]:`, err); }
    }
  }

  /**
   * Retorna snapshot imutável do estado atual.
   * @returns {Object}
   */
  snapshot() {
    return { ...this._data, activeLayers: [...this._data.activeLayers] };
  }
}
