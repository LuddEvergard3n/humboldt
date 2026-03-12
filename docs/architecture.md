# Humboldt — Arquitetura

## Visão geral

Aplicação web estática, 100% client-side, sem backend, sem build step obrigatório.
Roda diretamente no GitHub Pages via arquivos HTML, CSS e JavaScript ES2022 modules.

```
index.html          → shell HTML principal
sobre.html          → sobre o projeto
guia-professor.html → guia pedagógico
plano-aula.html     → gerador de planos de aula (BNCC)

css/
  base.css        → reset, tokens, tipografia, utilitários globais
  theme.css       → variáveis de cor e espaçamento
  layout.css      → estrutura de página (header, nav, main)
  components.css  → todos os componentes: cards, mapas, artigos, atividades
  mobile.css      → breakpoints responsivos

js/
  main.js         → bootstrap: instancia State, Router, UI, Accessibility
  state.js        → store reativo simples (get/set/on)
  router.js       → roteamento hash-based (#home, #module/id, etc.)
  ui.js           → interações globais (nav, font-size, teacher-mode)
  accessibility.js → preferências de acessibilidade (localStorage)
  data-loader.js  → fetch + cache em memória para JSON e SVG
  module-loader.js → mapa de lazy imports de todos os módulos

engine/
  map-engine.js       → renderiza SVG, tooltip, clique em [data-name]
  layer-engine.js     → controla visibilidade de camadas [data-layer]
  comparison-engine.js → before/after com slider
  flow-engine.js      → mapas de fluxo animados
  feedback-engine.js  → valida respostas das atividades
  hint-system.js      → sistema de dicas progressivas

components/
  activity-engine.js  → orquestra todos os tipos de atividade
  globe-decoration.js → decoração animada da home
  views/
    home-view.js       → tela inicial com grid de módulos por nível
    module-view.js     → lista de lições de um módulo
    lesson-view.js     → lição completa com atividade
    article-view.js    → artigo longo para módulos ES
    scale-view.js      → explorador de escalas
    phenomenon-view.js → explorador de fenômenos

modules/{id}/index.js → stub exportando id, level, [format]

data/
  modules.json          → manifesto de todos os módulos
  lessons/index.json    → índice leve das 115 lições (flat object)
  lessons/{id}.json     → lição individual completa
  es/{id}.json          → artigo completo para módulos ES

assets/
  maps/
    brazil-regions.svg  → 5 macrorregiões clicáveis (data-id)
    world-simple.svg    → regiões mundiais clicáveis
    brazil-layers.svg   → Brasil com 5 camadas temáticas (data-layer)
  globe.png
```

---

## Roteamento

Hash-based para compatibilidade com GitHub Pages (sem servidor).

| Hash | View | Parâmetros |
|------|------|------------|
| `#home` | home-view | — |
| `#module/{id}` | module-view | moduleId |
| `#lesson/{moduleId}/{lessonId}` | lesson-view | moduleId, lessonId |
| `#article/{id}` | article-view | moduleId (ES apenas) |
| `#scale/{level}` | scale-view | level |
| `#phenomenon/{slug}` | phenomenon-view | slug |

`module-view` detecta `format === "article"` no módulo e redireciona automaticamente para `#article/{id}`.

---

## Dois formatos de módulo

### Módulo pedagógico (lesson)
- Dados: `data/modules.json` + `data/lessons/index.json` + `data/lessons/{id}.json`
- Renderer: `module-view.js` → `lesson-view.js`
- Suporta 7 tipos de atividade interativa

### Módulo artigo (article — ES)
- Dados: `data/modules.json` + `data/es/{id}.json`
- Renderer: `article-view.js`
- Layout: TOC sticky 220px + conteúdo principal
- TOC com Intersection Observer para highlight da seção ativa
- 5 tipos de seção: text, quote, thinkers, timeline, compare-table
- Sem atividade, sem progresso — foco em leitura

---

## Contratos SVG

### Mapa com regiões clicáveis (map-engine)
Cada região interativa precisa de:
```xml
<path data-id="centro-oeste" data-name="Centro-Oeste"
      tabindex="0" role="button" aria-label="Centro-Oeste" .../>
```
- `data-id`: valor comparado com `activity.correct` nas lições
- `data-name`: exibido no tooltip
- `tabindex="0"` + `role="button"`: navegação por teclado

### Mapa com camadas (layer-engine)
Cada camada é um `<g>` com:
```xml
<g data-layer="biomas">...</g>
<g data-layer="cidades" class="map-layer-hidden">...</g>
```
- `data-layer`: id usado em `LayerEngine.show/hide/toggle`
- `.map-layer-hidden`: `display:none !important` (base.css)

---

## Estado global (`state.js`)

```js
state.get('key')             // lê
state.set('key', value)      // escreve e notifica
state.set({ k1: v1, k2: v2 }) // batch
state.on('key', cb)          // observa mudanças
state.snapshot()             // cópia imutável
```

Campos padrão:
- `currentModule`, `currentLesson`, `teacherMode`, `activeLayers`
- `fontSize`, `highContrast`, `reduceMotion`

---

## Cache de dados

`data-loader.js` mantém cache em memória (`Map`) para todas as respostas de `fetch`.
Chave: URL relativa. Sem expiração — os dados não mudam durante uma sessão.

```js
loadJSON('data/modules.json')         // módulos
loadLessonsIndex()                    // data/lessons/index.json
loadLesson('cartography-1')           // data/lessons/cartography-1.json
loadSVG('assets/maps/brazil-regions.svg')
```

---

## Testes

```bash
node tests/test-runner.js
```

380 testes (base) cobrindo:
- Integridade de `data/modules.json` (ids únicos, campos obrigatórios)
- Integridade de `data/lessons/index.json` (moduleIds válidos)
- Cada `data/lessons/{id}.json` (schema completo, `activity.correct` obrigatório exceto nos tipos sem resposta)
- Existência de todos os arquivos de engine, JS, CSS e docs
- Exportações dos módulos stub
- Lógica do `feedback-engine` e do `state`

M�dulos ES (`data/es/*.json`) não são validados pelos testes automatizados — são conteúdo livre e não têm schema obrigatório além dos campos de `sections`.
