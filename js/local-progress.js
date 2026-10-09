/**
 * Stores private study state in the current browser only.
 * No data is transmitted and invalid persisted values are ignored.
 */
export class LocalProgress {
  /**
   * @param {Storage|null} storage Storage-compatible implementation.
   */
  constructor(storage = globalThis.localStorage ?? null) {
    this._storage = storage;
    this._key = 'humboldt:atlas:v2';
  }

  /** @returns {{completed:string[], favorites:string[], lastLesson:string|null, recentFilters:object, accessibility:object}} */
  read() {
    const fallback = { completed: [], favorites: [], lastLesson: null, recentFilters: {}, accessibility: {} };
    if (!this._storage) return fallback;
    try {
      const value = JSON.parse(this._storage.getItem(this._key) || 'null');
      if (!value || typeof value !== 'object') return fallback;
      return {
        completed: this._strings(value.completed),
        favorites: this._strings(value.favorites),
        lastLesson: typeof value.lastLesson === 'string' ? value.lastLesson : null,
        recentFilters: this._object(value.recentFilters),
        accessibility: this._object(value.accessibility),
      };
    } catch {
      return fallback;
    }
  }

  /** @param {Partial<ReturnType<LocalProgress['read']>>} patch @returns {object} */
  update(patch) {
    const next = { ...this.read(), ...patch };
    if (this._storage) this._storage.setItem(this._key, JSON.stringify(next));
    return next;
  }

  /** @param {string} lessonId @param {boolean} completed @returns {object} */
  setCompleted(lessonId, completed = true) {
    const current = new Set(this.read().completed);
    completed ? current.add(lessonId) : current.delete(lessonId);
    return this.update({ completed: [...current].sort(), lastLesson: lessonId });
  }

  /** @param {string} lessonId @returns {object} */
  toggleFavorite(lessonId) {
    const current = new Set(this.read().favorites);
    current.has(lessonId) ? current.delete(lessonId) : current.add(lessonId);
    return this.update({ favorites: [...current].sort() });
  }

  /** @param {unknown} value @returns {string[]} */
  _strings(value) {
    return Array.isArray(value) ? [...new Set(value.filter(item => typeof item === 'string'))] : [];
  }

  /** @param {unknown} value @returns {object} */
  _object(value) {
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  }
}
