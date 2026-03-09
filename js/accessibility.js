/**
 * accessibility.js — Controlador de acessibilidade
 *
 * Responsabilidades:
 *  - painel de acessibilidade (tamanho de fonte, alto contraste)
 *  - persistência das preferências via localStorage
 *  - live region para anúncios de navegação
 */

const STORAGE_KEY = 'humboldt:a11y';

export class Accessibility {
  constructor(state) {
    this._state = state;
    this._panelOpen = false;
  }

  init() {
    this._restorePreferences();
    this._bindPanelToggle();
    this._bindFontControl();
    this._bindContrastControl();
    this._initLiveRegion();
  }

  _restorePreferences() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const prefs = JSON.parse(raw);
      if (typeof prefs.fontSize === 'number') {
        this._state.set('fontSize', prefs.fontSize);
        const ctrl = document.getElementById('font-size-control');
        if (ctrl) ctrl.value = prefs.fontSize;
      }
      if (typeof prefs.highContrast === 'boolean') {
        this._state.set('highContrast', prefs.highContrast);
        const ctrl = document.getElementById('high-contrast-control');
        if (ctrl) ctrl.checked = prefs.highContrast;
      }
    } catch { /* ignora */ }
  }

  _savePreferences() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        fontSize:     this._state.get('fontSize'),
        highContrast: this._state.get('highContrast'),
      }));
    } catch { /* ignora */ }
  }

  _bindPanelToggle() {
    const btn      = document.getElementById('a11y-toggle');
    const controls = document.getElementById('a11y-controls');
    if (!btn || !controls) return;

    const openPanel = () => {
      controls.hidden   = false;
      this._panelOpen   = true;
      btn.setAttribute('aria-expanded', 'true');
    };

    const closePanel = () => {
      controls.hidden   = true;
      this._panelOpen   = false;
      btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this._panelOpen ? closePanel() : openPanel();
    });

    // Botão X dentro do painel
    const closeBtn = document.getElementById('a11y-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closePanel();
        btn.focus();
      });
    }

    document.addEventListener('click', (e) => {
      if (!this._panelOpen) return;
      const panel = document.getElementById('a11y-panel');
      if (panel && !panel.contains(e.target)) closePanel();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._panelOpen) {
        closePanel();
        btn.focus();
      }
    });
  }

  _bindFontControl() {
    const ctrl = document.getElementById('font-size-control');
    if (!ctrl) return;
    ctrl.addEventListener('input', () => {
      const size = Number(ctrl.value);
      this._state.set('fontSize', size);
      this._savePreferences();
      this._announce(`Tamanho do texto: ${size}px`);
    });
  }

  _bindContrastControl() {
    const ctrl = document.getElementById('high-contrast-control');
    if (!ctrl) return;
    ctrl.addEventListener('change', () => {
      this._state.set('highContrast', ctrl.checked);
      this._savePreferences();
      this._announce(ctrl.checked ? 'Alto contraste ativado' : 'Alto contraste desativado');
    });
  }

  _initLiveRegion() {
    const region = document.createElement('div');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    region.id = 'a11y-live';
    document.body.appendChild(region);
    window._humboldtAnnounce = (msg) => this._announce(msg);
  }

  _announce(msg) {
    const region = document.getElementById('a11y-live');
    if (!region) return;
    region.textContent = '';
    requestAnimationFrame(() => { region.textContent = msg; });
  }
}
