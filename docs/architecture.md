# Humboldt — Arquitetura

## Visão geral

Aplicação web estática, 100% client-side, sem backend, sem build step.
Roda diretamente no GitHub Pages via arquivos HTML, CSS e JavaScript ES2022 modules.

```
index.html            — shell HTML principal
sobre.html            — sobre o projeto e o ecossistema
guia-professor.html   — guia pedagógico completo
plano-aula.html       — gerador de planos de aula (BNCC)

css/
  base.css            — reset, tokens de espaçamento, largura e tipografia
  theme.css           — cores, alto contraste, animações, modo professor
  layout.css          — estrutura de página, header, footer, responsividade
  components.css      — todos os componentes: cards, atividades, artigos, sidebar
  mobile.css          — stub (responsividade consolidada em layout.css)

js/
  main.js             — bootstrap: instancia State, Router, UI, Accessibility
  state.js            — store reativo simples (get/set/on), sem proxies
  router.js           — roteamento hash-based (#home, #module/id, etc.)
  ui.js               — interações globais (nav, font-size, teacher-mode)
  accessibility.js    — preferências de acessibilidade (localStorage)
  data-loader.js      — fetch + cache em memória para JSON e SVG
  module-loader.js    — mapa de lazy imports dos módulos legados com código próprio

engine/
  map-engine.js         — renderiza SVG, tooltip, clique em [data-name]
  layer-engine.js       — controla visibilidade de camadas [data-layer]
  comparison-engine.js  — before/after com slider (mouse, touch, teclado)
  flow-engine.js        — mapas de fluxo animados
  feedback-engine.js    — valida respostas e exibe feedback contextual
  hint-system.js        — sistema de dicas progressivas (text/layer/focus/reduce)

components/
  activity-engine.js    — orquestra todos os tipos de atividade
  globe-decoration.js   — globo decorativo da hero (Canvas 2D)
  views/
    home-view.js        — página inicial
    module-view.js      — lista de lições do módulo
    lesson-view.js      — lição: 7 passos com sidebar de navegação
    article-view.js     — artigo ES com TOC sticky
    scale-view.js       — navegação por escala geográfica
    phenomenon-view.js  — re-exporta renderPhenomenon de scale-view

data/
  modules.json          — 47 módulos com metadados
  lessons/
    index.json          — índice plano { id: { moduleId, title, summary, activityType } }
    {id}.json           — 146 arquivos individuais de lição
  es/
    {moduleId}.json     — 9 artigos de Ensino Superior

modules/
  {id}/index.js         — 41 stubs de módulo (lazy import)

assets/
  globe.png
  maps/
    brazil-regions.svg  — 5 regiões clicáveis [data-id]
    brazil-layers.svg   — biomas com camadas [data-layer]
    world-simple.svg    — 10 regiões mundiais clicáveis [data-id]

tests/
  test-runner.js        — executor sem dependências externas
  data-tests.js         — integridade de JSONs e índices
  module-tests.js       — presença de arquivos e exports
  ui-tests.js           — lógica de State e FeedbackEngine
```

---

## Sistema de tokens CSS

### Espaçamento

| Token | Valor |
|-------|-------|
| `--space-1` | 0.25rem (4px) |
| `--space-2` | 0.5rem (8px) |
| `--space-3` | 0.75rem (12px) |
| `--space-4` | 1rem (16px) |
| `--space-5` | 1.25rem (20px) |
| `--space-6` | 1.5rem (24px) |
| `--space-8` | 2rem (32px) |
| `--space-10` | 2.5rem (40px) |
| `--space-12` | 3rem (48px) |
| `--space-16` | 4rem (64px) |
| `--space-20` | 5rem (80px) |
| `--space-24` | 6rem (96px) |

### Sistema de larguras

| Token | Valor | Uso |
|-------|-------|-----|
| `--container-max` | 1280px | wrapper principal de todas as seções |
| `--content-max` | 760px | colunas de conteúdo longo |
| `--reading-max` | 70ch | largura de prosa |
| `--gutter` | `--space-8` | padding horizontal uniforme |
| `--section-pad` | `--space-20` | padding-block das seções |
| `--section-gap` | `--space-16` | gap interno entre blocos |

### Paleta

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#f2ede3` | fundo geral |
| `--color-primary` | `#1e3a5f` | navy — header, títulos, botões primários |
| `--color-accent` | `#8b5e2e` | bronze — destaques, labels |
| `--color-accent-lt` | `#c4a35a` | ouro — hover, links ativos |
| `--color-water` | `#6fa8c4` | azul água — mapas |

---

## Fluxo de renderização

```
hashchange
  └─ Router._route()
       └─ Router._render(rendererFn, params)
            ├─ State.set({ currentModule, currentLesson, ... })
            ├─ viewContainer.innerHTML = ''
            ├─ node = await rendererFn(params, state, router)
            ├─ viewContainer.appendChild(node)
            └─ emit('view:ready')
```

### Padrão de renderer

Todo renderer segue a assinatura:

```js
export async function renderX(params, state, router) → Promise<Node>
```

O router espera receber um `Node` — nunca uma string de HTML.

---

## Roteamento

| Hash | Renderer | Params |
|------|----------|--------|
| `#home` | `renderHome` | — |
| `#module/{id}` | `renderModule` | `{ moduleId }` |
| `#lesson/{moduleId}/{id}` | `renderLesson` | `{ moduleId, lessonId }` |
| `#article/{moduleId}` | `renderArticle` | `{ moduleId }` |
| `#scale/{level}` | `renderScale` | `{ level }` |
| `#phenomenon/{slug}` | `renderPhenomenon` | `{ slug }` |

---

## Carregamento de dados

`data-loader.js` expõe duas funções com cache em memória:

```js
loadJSON(path)  → Promise<Object>   // usado por todos os módulos de view
loadSVG(path)   → Promise<string>   // usado pelos engines de mapa
```

O cache evita re-fetches ao navegar entre views. É limpo apenas quando a página é recarregada.

---

## Ecossistema

O Humboldt faz parte de uma plataforma de aplicativos educacionais estáticos:

| Projeto | Disciplina | Site |
|---------|-----------|------|
| Heródoto | História | https://luddevergard3n.github.io/Herodoto/index.html |
| Euclides | Matemática | https://luddevergard3n.github.io/euclides/ |
| Quintiliano | Língua Portuguesa | https://luddevergard3n.github.io/quintiliano/ |
| Lavoisier | Ciências / Química | https://luddevergard3n.github.io/lavoisier/ |
| **Humboldt** | **Geografia** | https://luddevergard3n.github.io/humboldt/ |
| Archimedes | Física | https://luddevergard3n.github.io/archimedes/ |
| Johnson | Inglês | https://luddevergard3n.github.io/johnson-english/ |
| Aristóteles | Filosofia | https://luddevergard3n.github.io/aristoteles/ |
