/**
 * main.js — Ponto de entrada do Humboldt
 *
 * Inicializa o roteador, estado global, UI e acessibilidade.
 * Não contém lógica de domínio — apenas orquestra os módulos.
 *
 * Ordem de inicialização:
 *  1. State (sem dependências)
 *  2. Router (depende de State)
 *  3. UI (depende de State + Router)
 *  4. Accessibility (depende de State)
 *  5. Router.start() — dispara a rota inicial
 */

import { State }         from './state.js';
import { Router }        from './router.js';
import { UI }            from './ui.js';
import { Accessibility } from './accessibility.js';

/**
 * Esconde a tela de carregamento após o primeiro render.
 * @param {HTMLElement} el
 */
function hideLoading(el) {
  el.classList.add('hidden');
  setTimeout(() => { el.style.display = 'none'; }, 400);
}

/**
 * Ponto de inicialização — chamado após DOMContentLoaded.
 */
async function init() {
  const loadingEl = document.getElementById('loading-screen');

  // 1. Estado global
  const state = new State();

  // 2. Roteador
  const router = new Router(state);

  // 3. Interface
  const ui = new UI(state, router);
  ui.init();

  // 4. Acessibilidade
  const a11y = new Accessibility(state);
  a11y.init();

  // 5. Inicia a rota
  //    O roteador lê o hash atual e renderiza a view.
  //    Quando a view estiver pronta, esconde o loading.
  router.on('view:ready', () => hideLoading(loadingEl));
  router.start();

  // Expor estado em desenvolvimento (facilita depuração via console)
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    window.__HUMBOLDT__ = { state, router, ui, a11y };
  }
}

// Garante que o DOM está disponível
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
