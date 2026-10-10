/** Renders traceable citations, source caveats and comparative perspectives. */

const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

/** @param {Object} documentData @param {string} section @returns {string} */
export function renderCitations(documentData, section) {
  const citations = (documentData.citations || []).filter(citation => citation.section === section);
  if (!citations.length) return '';
  const sourceMap = new Map((documentData.sources || []).map(source => [source.id, source]));
  return `<aside class="editorial-citations" aria-label="Evidências deste bloco"><ol>${citations.map(citation => {
    const links = citation.sourceIds.map(sourceId => {
      const source = sourceMap.get(sourceId);
      return source ? `<a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.publisher)}</a>` : escapeHTML(sourceId);
    }).join(', ');
    return `<li id="citation-${escapeHTML(citation.id)}"><span class="editorial-status editorial-status--${escapeHTML(citation.status)}">${escapeHTML(citation.status)}</span><span>${escapeHTML(citation.claim)}</span><small>${links}${citation.locator ? ` · ${escapeHTML(citation.locator)}` : ''}</small></li>`;
  }).join('')}</ol></aside>`;
}

/** @param {Object[]} sources @returns {string} */
export function renderSources(sources = []) {
  if (!sources.length) return '<p>Conteúdo com revisão de fontes pendente.</p>';
  return `<ul class="source-list">${sources.map(source => `<li id="source-${escapeHTML(source.id)}"><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title)}</a><span>${escapeHTML(source.publisher)} · ${escapeHTML(source.year)}</span><details class="source-caveat"><summary>Método e ressalvas</summary><dl><dt>Natureza</dt><dd>${escapeHTML(source.type)}</dd><dt>Método</dt><dd>${escapeHTML(source.method)}</dd><dt>Escopo</dt><dd>${escapeHTML(source.scope)}</dd><dt>Limitações</dt><dd>${escapeHTML(source.limitations)}</dd><dt>Contexto institucional</dt><dd>${escapeHTML(source.institutionalContext)}</dd><dt>Acesso</dt><dd>${escapeHTML(source.accessedAt)}</dd></dl></details></li>`).join('')}</ul>`;
}

/** @param {Object[]} perspectives @returns {string} */
export function renderPerspectives(perspectives = []) {
  if (!perspectives.length) return '';
  return `<section class="perspective-matrix" aria-labelledby="perspective-matrix-title"><h3 id="perspective-matrix-title">Matriz de perspectivas</h3><div class="perspective-grid">${perspectives.map(item => `<article><h4>${escapeHTML(item.name)}</h4><p><strong>Tese:</strong> ${escapeHTML(item.thesis)}</p><p><strong>Evidência:</strong> ${escapeHTML(item.evidence)}</p><p><strong>Crítica:</strong> ${escapeHTML(item.criticism)}</p><p><strong>Limite:</strong> ${escapeHTML(item.limitations)}</p>${item.alternatives ? `<p><strong>Alternativas:</strong> ${escapeHTML(item.alternatives)}</p>` : ''}</article>`).join('')}</div></section>`;
}
