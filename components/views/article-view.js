/**
 * article-view.js — Renderizador de artigo longo (módulos de Ensino Superior)
 *
 * Rota: #article/:moduleId
 * Dados: data/es/{moduleId}.json
 *
 * Layout: TOC sticky à esquerda (240px) + conteúdo principal (flex:1)
 * Tipos de seção: text | thinkers | timeline | quote | compare-table
 *
 * Sem atividade, sem quiz, sem pontuação — foco em leitura e exploração.
 * Intersection Observer rastreia a seção visível para highlight no TOC.
 */

import { loadJSON } from '../../js/data-loader.js';

/* ------------------------------------------------------------------ */
/* Entrada pública                                                      */
/* ------------------------------------------------------------------ */

export async function renderArticle({ moduleId }, _state, router) {
  const article = await loadJSON(`data/es/${moduleId}.json`).catch(() => null);

  if (!article) {
    const el = document.createElement('div');
    el.style.cssText = 'padding:3rem;text-align:center';
    el.innerHTML = `<h2>Artigo não encontrado: ${moduleId}</h2>
                    <a href="#home" class="btn btn-outline">← Início</a>`;
    return el;
  }

  const root = document.createElement('div');
  root.className = 'view-article';
  root.innerHTML = _buildShell(article, moduleId);

  /* Renderiza cada seção */
  const contentEl = root.querySelector('.article-content');
  for (const sec of article.sections) {
    contentEl.appendChild(_renderSection(sec));
  }

  /* Ativa Intersection Observer após inserção no DOM */
  requestAnimationFrame(() => _initTOC(root));

  /* Link "voltar" */
  root.querySelector('.article-back')?.addEventListener('click', e => {
    e.preventDefault();
    router.navigate('home');
  });

  return root;
}

/* ------------------------------------------------------------------ */
/* Shell HTML                                                           */
/* ------------------------------------------------------------------ */

function _buildShell(article, moduleId) {
  const tocItems = article.sections
    .map(s => `
      <li>
        <a class="toc-link" href="#sec-${s.id}" data-target="${s.id}">
          ${s.title}
        </a>
      </li>`)
    .join('');

  return `
    <nav class="breadcrumb article-breadcrumb" aria-label="Localização">
      <a href="#home" class="article-back">Início</a>
      <span class="breadcrumb-sep">›</span>
      <span class="breadcrumb-current">Ensino Superior</span>
      <span class="breadcrumb-sep">›</span>
      <span class="breadcrumb-current">${article.title}</span>
    </nav>

    <div class="article-layout">

      <!-- TOC sidebar -->
      <aside class="article-toc" aria-label="Índice do artigo">
        <div class="toc-inner">
          <p class="toc-label">Neste artigo</p>
          <ul class="toc-list" role="list">
            ${tocItems}
          </ul>
          <div class="toc-meta">
            <span class="toc-reading-time">${article.readingTime}</span>
          </div>
        </div>
      </aside>

      <!-- Conteúdo principal -->
      <article class="article-content" aria-label="${article.title}">

        <header class="article-header">
          <div class="article-level-tag">Ensino Superior</div>
          <h1 class="article-title">${article.title}</h1>
          <p class="article-subtitle">${article.subtitle}</p>
          <p class="article-intro">${article.intro}</p>
        </header>

      </article>
    </div>`;
}

/* ------------------------------------------------------------------ */
/* Renderizadores por tipo de seção                                     */
/* ------------------------------------------------------------------ */

function _renderSection(sec) {
  const wrapper = document.createElement('section');
  wrapper.className = `article-section article-section--${sec.type}`;
  wrapper.id = sec.id;
  wrapper.setAttribute('aria-labelledby', `${sec.id}-title`);

  /* Título da seção — omitido apenas em 'quote' */
  if (sec.type !== 'quote') {
    const h2 = document.createElement('h2');
    h2.className = 'section-title';
    h2.id = `${sec.id}-title`;
    h2.textContent = sec.title;
    wrapper.appendChild(h2);
  }

  switch (sec.type) {
    case 'text':          wrapper.appendChild(_renderText(sec));         break;
    case 'thinkers':      wrapper.appendChild(_renderThinkers(sec));     break;
    case 'timeline':      wrapper.appendChild(_renderTimeline(sec));     break;
    case 'quote':         wrapper.appendChild(_renderQuote(sec));        break;
    case 'compare-table': wrapper.appendChild(_renderCompareTable(sec)); break;
    default: {
      const fallback = document.createElement('p');
      fallback.style.cssText = 'color:var(--color-text-muted);font-style:italic';
      fallback.textContent = `[Tipo de seção desconhecido: ${sec.type}]`;
      wrapper.appendChild(fallback);
    }
  }

  return wrapper;
}

/* --- text ----------------------------------------------------------  */
function _renderText(sec) {
  const el = document.createElement('div');
  el.className = 'section-text';
  /* Parágrafos separados por \n\n */
  const paras = sec.body.split('\n\n').filter(Boolean);
  el.innerHTML = paras
    .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('');
  return el;
}

/* --- quote ---------------------------------------------------------  */
function _renderQuote(sec) {
  const el = document.createElement('div');
  el.className = 'section-quote-wrap';
  el.innerHTML = `
    <blockquote class="article-blockquote" cite="${sec.author}">
      <p class="blockquote-text">${sec.text}</p>
      <footer class="blockquote-footer">
        <cite class="blockquote-author">${sec.author}</cite>
        <span class="blockquote-work">${sec.work}, ${sec.year}</span>
      </footer>
    </blockquote>`;
  return el;
}

/* --- thinkers ------------------------------------------------------  */
function _renderThinkers(sec) {
  const grid = document.createElement('div');
  grid.className = 'thinkers-grid';

  for (const t of sec.items) {
    const card = document.createElement('article');
    card.className = 'thinker-card';
    card.innerHTML = `
      <div class="thinker-header">
        <div class="thinker-avatar" aria-hidden="true">
          ${_initials(t.name)}
        </div>
        <div class="thinker-meta">
          <h3 class="thinker-name">${t.name}</h3>
          <p class="thinker-dates">${t.dates}</p>
          <p class="thinker-tradition">${t.tradition}</p>
        </div>
      </div>
      <p class="thinker-contribution">${t.contribution}</p>
      <blockquote class="thinker-quote">
        <p>${t.quote}</p>
        <footer><cite>${t.quoteWork}</cite></footer>
      </blockquote>`;
    grid.appendChild(card);
  }
  return grid;
}

/* --- timeline ------------------------------------------------------  */
function _renderTimeline(sec) {
  const container = document.createElement('div');
  container.className = 'timeline';
  container.setAttribute('role', 'list');

  for (const ev of sec.events) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.setAttribute('role', 'listitem');
    item.innerHTML = `
      <div class="timeline-marker" aria-hidden="true"></div>
      <div class="timeline-body">
        <span class="timeline-period">${ev.period}</span>
        <h3 class="timeline-label">${ev.label}</h3>
        <p class="timeline-desc">${ev.description}</p>
      </div>`;
    container.appendChild(item);
  }
  return container;
}

/* --- compare-table -------------------------------------------------  */
function _renderCompareTable(sec) {
  const wrapper = document.createElement('div');
  wrapper.className = 'compare-table-wrap';
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', sec.title || 'Tabela comparativa');

  const table = document.createElement('table');
  table.className = 'compare-table';

  const thead = document.createElement('thead');
  thead.innerHTML = `<tr>${sec.columns.map(c => `<th scope="col">${c}</th>`).join('')}</tr>`;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  for (const row of sec.rows) {
    const tr = document.createElement('tr');
    tr.innerHTML = row.map((cell, i) =>
      i === 0
        ? `<th scope="row">${cell}</th>`
        : `<td>${cell}</td>`
    ).join('');
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  wrapper.appendChild(table);
  return wrapper;
}

/* ------------------------------------------------------------------ */
/* TOC: Intersection Observer para highlight ativo                     */
/* ------------------------------------------------------------------ */

function _initTOC(root) {
  const links   = root.querySelectorAll('.toc-link');
  const sections = root.querySelectorAll('.article-section');

  if (!links.length || !sections.length) return;

  /* Marca o primeiro como ativo por padrão */
  links[0]?.classList.add('toc-link--active');

  const obs = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        links.forEach(l => {
          const active = l.dataset.target === id;
          l.classList.toggle('toc-link--active', active);
        });
      }
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  );

  sections.forEach(s => obs.observe(s));

  /* Scroll suave para seções ao clicar nos links do TOC */
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = root.querySelector(`#${link.dataset.target}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ------------------------------------------------------------------ */
/* Utilidade                                                            */
/* ------------------------------------------------------------------ */

function _initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}
