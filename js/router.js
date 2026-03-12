/**
 * router.js — Roteador por hash do Humboldt
 *
 * Usa window.location.hash para navegação sem servidor.
 * Compatível com GitHub Pages (sem necessidade de _redirects).
 *
 * Rotas suportadas:
 *   #home                      → view home
 *   #module/:id                → view do módulo
 *   #lesson/:moduleId/:id      → view de lição
 *   #scale/:level              → navegação por escala
 *   #phenomenon/:slug          → navegação por fenômeno
 */

import { renderHome }       from '../components/views/home-view.js';
import { renderModule }     from '../components/views/module-view.js';
import { renderLesson }     from '../components/views/lesson-view.js';
import { renderScale }      from '../components/views/scale-view.js';
import { renderPhenomenon } from '../components/views/phenomenon-view.js';
import { renderArticle }    from '../components/views/article-view.js';

export class Router {
  /**
   * @param {import('./state.js').State} state
   */
  constructor(state) {
    this._state    = state;
    this._handlers = {};   // evento → [callbacks]
    this._container = document.getElementById('view-container');
  }

  /**
   * Registra um callback de evento do roteador.
   * @param {string}   event  - ex: 'view:ready'
   * @param {Function} fn
   */
  on(event, fn) {
    if (!this._handlers[event]) this._handlers[event] = [];
    this._handlers[event].push(fn);
  }

  /** @param {string} event */
  _emit(event, payload) {
    const list = this._handlers[event];
    if (list) list.forEach(fn => fn(payload));
  }

  /**
   * Inicia o roteador: rota inicial + listener de mudança de hash.
   */
  start() {
    window.addEventListener('hashchange', () => this._route());
    this._route(); // rota inicial
  }

  /**
   * Navega para um novo hash programaticamente.
   * @param {string} hash  - sem o '#' inicial
   */
  navigate(hash) {
    window.location.hash = hash;
  }

  /**
   * Analisa o hash corrente e chama o renderer adequado.
   */
  async _route() {
    const raw  = window.location.hash.replace(/^#\/?/, '') || 'home';
    const parts = raw.split('/');
    const view  = parts[0];

    // Rola ao topo da área de conteúdo
    document.getElementById('main-content').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      switch (view) {
        case 'home':
        case '':
          await this._render(renderHome, {}, 'home', null);
          break;

        case 'module':
          await this._render(renderModule, { moduleId: parts[1] }, parts[1], null);
          break;

        case 'lesson':
          await this._render(
            renderLesson,
            { moduleId: parts[1], lessonId: parts[2] },
            parts[1],
            parts[2]
          );
          break;

        case 'scale':
          await this._render(renderScale, { level: parts[1] }, null, null);
          break;

        case 'phenomenon':
          await this._render(renderPhenomenon, { slug: parts[1] }, null, null);
          break;

        case 'article':
          await this._render(renderArticle, { moduleId: parts[1] }, parts[1], null);
          break;

        default:
          await this._render(renderHome, {}, 'home', null);
      }
    } catch (err) {
      console.error('[router] erro ao renderizar rota:', err);
      this._container.innerHTML = `
        <div style="padding:3rem;text-align:center">
          <h2 style="color:var(--color-primary)">Erro ao carregar</h2>
          <p style="margin:1rem 0;color:var(--color-text-mid)">${err.message}</p>
          <a href="#home" class="btn btn-outline">Voltar ao início</a>
        </div>`;
    }
  }

  /**
   * Executa o renderer e notifica quando pronto.
   * @param {Function} rendererFn
   * @param {Object}   params
   * @param {string|null} moduleId
   * @param {string|null} lessonId
   */
  async _render(rendererFn, params, moduleId, lessonId) {
    this._state.set({
      currentModule: moduleId,
      currentLesson: lessonId,
      currentStep:   0,
      activeLayers:  [],
    });

    this._container.innerHTML = '';

    const node = await rendererFn(params, this._state, this);
    if (node instanceof Node) {
      this._container.appendChild(node);
    } else if (typeof node === 'string') {
      this._container.innerHTML = node;
    }

    this._emit('view:ready');
    this._updateActiveNav(moduleId);
  }

  /**
   * Marca o link de navegação ativo no header.
   * @param {string|null} moduleId
   */
  _updateActiveNav(moduleId) {
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.removeAttribute('aria-current');
    });

    const hash = window.location.hash.replace(/^#\/?/, '');
    const view = hash.split('/')[0];

    if (view === 'home' || view === '') {
      const el = document.querySelector('[data-nav="home"]');
      if (el) el.setAttribute('aria-current', 'page');
    }
  }
}
