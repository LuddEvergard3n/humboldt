/**
 * ui.js — Controlador de interface global
 *
 * Gerencia:
 *  - toggle do menu mobile
 *  - dropdown de módulos no desktop
 *  - ativação/desativação do Modo Professor
 *  - sincronização de estado com classes no <body>
 *
 * Não renderiza views — apenas manipula o chrome da aplicação.
 */

export class UI {
  /**
   * @param {import('./state.js').State}   state
   * @param {import('./router.js').Router} router
   */
  constructor(state, router) {
    this._state  = state;
    this._router = router;
  }

  /** Inicializa todos os bindings do chrome. */
  init() {
    this._bindNavToggle();
    this._bindTeacherMode();
    this._bindDropdowns();
    this._bindStateSync();
    this._router.on('view:ready', () => this._syncRoute());
  }

  /** Botão hamburguer (mobile). */
  _bindNavToggle() {
    const btn   = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!btn || !links) return;

    const setOpen = open => {
      links.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', String(open));
      if (open) links.querySelector('a, button')?.focus();
    };

    btn.addEventListener('click', () => setOpen(!links.classList.contains('open')));

    // Fecha ao clicar em qualquer link da nav
    links.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        setOpen(false);
      }
    });

    // Fecha ao pressionar Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        setOpen(false);
        btn.focus();
      }
    });
  }

  /** Mantém rota ativa e nome da view disponíveis para CSS e leitores de tela. */
  _syncRoute() {
    const view = window.location.hash.replace(/^#\/?/, '').split(/[/?]/)[0] || 'home';
    document.body.dataset.view = view;
    document.querySelectorAll('[data-nav]').forEach(item => item.removeAttribute('aria-current'));
    const target = document.querySelector(`[data-nav="${view}"]`);
    target?.setAttribute('aria-current', 'page');
  }

  /** Modo Professor: toggle via botão e via estado. */
  _bindTeacherMode() {
    const btn = document.getElementById('teacher-mode-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const next = !this._state.get('teacherMode');
      this._state.set('teacherMode', next);
    });

    this._state.on('teacherMode', active => {
      document.body.classList.toggle('teacher-mode', active);
      btn.setAttribute('aria-pressed', String(active));
      btn.textContent = active ? 'Sair do Modo Prof.' : 'Modo Professor';
    });
  }

  /** Dropdown de módulos no desktop (click para mobile aberto). */
  _bindDropdowns() {
    document.querySelectorAll('.nav-dropdown-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.has-dropdown');
        if (!parent) return;

        const open = parent.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });

    // Fecha dropdowns ao clicar fora
    document.addEventListener('click', e => {
      if (!e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.has-dropdown.open').forEach(el => {
          el.classList.remove('open');
          const btn = el.querySelector('.nav-dropdown-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  /**
   * Sincroniza classes no <body> com o estado global.
   * Evita ter lógica de apresentação espalhada pelos módulos.
   */
  _bindStateSync() {
    this._state.on('highContrast', active => {
      document.body.classList.toggle('high-contrast', active);
    });

    this._state.on('fontSize', size => {
      // Escala conteúdo principal via zoom CSS (não afeta rem da interface)
      document.getElementById('main-content').style.fontSize = `${size}px`;
    });
  }
}
