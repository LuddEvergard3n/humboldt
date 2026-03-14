# Changelog — Humboldt

Todas as alterações significativas do projeto são documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [1.3.0] — 2026-03-13

### Adicionado

**Módulo `em-energy` — Energia e Geopolítica (order 42, 4 lições):**
- `em-energy-1`: Matrizes energéticas globais — quem produz, quem consome, dependência e vulnerabilidade (`flow-map`: fluxos de petróleo e gás no world-simple)
- `em-energy-2`: Petróleo e geopolítica — maldição dos recursos, OPEP, doença holandesa, Noruega como exceção (`single-choice`)
- `em-energy-3`: Transição energética — custo das renováveis, novos minerais críticos, hidrogênio verde, Brasil no cenário global (`before-after`: matrizes 2000 vs. 2023)
- `em-energy-4`: Pobreza energética — 800 milhões sem eletricidade, fumaça de biomassa, Bangladesh como caso de sucesso (`single-choice`)

**Módulo `em-transport` — Logística e Território (order 43, 4 lições):**
- `em-transport-1`: Logística global — container, rotas oceânicas, pontos de estrangulamento (Suez, Malaca, Panamá), hubs portuários (`flow-map`)
- `em-transport-2`: Rodoviarismo no Brasil — custo logístico, multimodalidade, Ferrogrão e os dilemas da infraestrutura amazônica (`map-click`: Região Norte)
- `em-transport-3`: Megaprojetos de infraestrutura — Belt and Road, IIRSA, diplomacia da dívida, Estrada Interoceânica (`flow-map`: BRI no world-simple)
- `em-transport-4`: Mobilidade urbana — periferização, tempo de deslocamento como indicador de desigualdade, BRT, tarifa zero (`single-choice`)

### Alterado

- `modules.json`: 39 → 41 módulos; `em-energy` e `em-transport` registrados com todos os campos
- `module-loader.js`: `em-energy` e `em-transport` registrados para lazy import
- `data/lessons/index.json`: 138 → 146 entradas
- `README.md`: tabelas de conteúdo atualizadas (41 módulos, 146 lições, EM com 15 módulos/65 lições)
- Fenômenos `energy` e `transport` agora têm módulos dedicados além de serem cobertos transversalmente

### Testes

- 512 ok / 0 falhou (era 488)

---

## [1.2.0] — 2026-03-13

### Adicionado

**Conteúdo — 26 novas lições e 2 novos artigos ES (112 → 138 lições):**

Módulo `em-africa` (4 lições — novo):
- `em-africa-1`: Descolonização e heranças do colonialismo — Conferência de Berlim e fronteiras artificiais (`before-after`)
- `em-africa-2`: Conflitos do Sahel e a crise do Estado — Lago Chade, jihadismo e Wagner (`single-choice`)
- `em-africa-3`: A China em África — fluxos comerciais e dívida (`flow-map`)
- `em-africa-4`: União Africana e o pan-africanismo — da OUA à AfCFTA (`single-choice`)

Módulo `em-latin-america` (4 lições — novo):
- `em-latin-america-1`: América Latina, desigualdade e teoria da dependência (`map-click`)
- `em-latin-america-2`: Ciclo progressista e neoextrativismo (`single-choice`)
- `em-latin-america-3`: Narcotráfico, Estado e território — cadeia global da cocaína (`flow-map`)
- `em-latin-america-4`: Mercosul, ALBA e a integração regional (`single-choice`)

Módulo `em-migration` (4 lições — novo):
- `em-migration-1`: Refugiados e deslocados — categorias jurídicas e non-refoulement (`single-choice`)
- `em-migration-2`: Muros, fronteiras e externalização — o Mediterrâneo Central (`flow-map`)
- `em-migration-3`: Migração climática — vazio jurídico e Bangladesh (`single-choice`)
- `em-migration-4`: Imigração, xenofobia e percepção distorcida (`single-choice`)

Módulo `efii-asia` (5 lições — novo):
- `efii-asia-1`: Monsões e diversidade asiática (`single-choice`)
- `efii-asia-2`: China: a fábrica do mundo (`flow-map`)
- `efii-asia-3`: Índia: diversidade e desigualdade (`single-choice`)
- `efii-asia-4`: Sudeste Asiático: entre potências (`map-click`)
- `efii-asia-5`: Japão e Coreia do Sul — pirâmide etária (`before-after`)

Módulo `em-asia-pacific` (4 lições — novo):
- `em-asia-pacific-1`: Indo-Pacífico, QUAD, AUKUS, Taiwan (`map-click`)
- `em-asia-pacific-2`: Semicondutores e guerra tecnológica (`flow-map`)
- `em-asia-pacific-3`: Mar do Sul da China e UNCLOS (`single-choice`)
- `em-asia-pacific-4`: ASEAN — expansão e Singapura (`before-after`)

Expansão `em-climatology` (5 → 6 lições):
- `em-climatology-6`: Circulação geral da atmosfera e ventos planetários — células de Hadley, Ferrel e Polar; efeito Coriolis (`compass`)

Expansão `em-cartography` (5 → 6 lições):
- `em-cartography-6`: Análise multiescalar do desmatamento amazônico — três perguntas encadeadas por faixa de escala (`scale`)

Artigo `es-urban-geography` (novo):
- 8 seções: Lefebvre, Harvey, Castells, Davis, Maricato; metropolização; segregação socioespacial; timeline urbanização Brasil; compare-table de cinco abordagens do urbanismo

Artigo `es-physical-geography` (novo):
- 8 seções: tectônica de placas, ciclos biogeoquímicos, pensadores (Wegener, Lovelock, Wilson, Humboldt), biogeografia, Antropoceno, timeline geológica, compare-table de sistemas físicos

Artigo `es-postcolonial-feminist` (novo):
- 7 seções: crítica pós-colonial, pensadores (Fanon, Spivak, Massey, Rose, Quijano, Mbembe), geografia feminista, epistemologias do Sul, timeline crítica, compare-table de tradições

### Alterado

**`efii-europe` renomeado e corrigido:**
- Título: "Europa, Ásia e Oceania" → "Europa e Oceania" (Ásia agora é módulo próprio)
- `efii-europe-2`: substituído por Oceania — crise climática e ilhas que desaparecem (`single-choice`)
- `efii-europe-3`: substituído por Oriente Médio — petróleo, conflitos e religião (`map-click`)

**Motor `activity-engine.js` — `_mountScale` refatorado:**
- Novo modo per-step: quando qualquer `step` em `scaleConfig.steps` possui campo `question`, a pergunta, opções e feedback trocam automaticamente conforme o slider entra em nova faixa
- Modo legado (pergunta global única) preservado integralmente — retrocompatível
- `_mountSingleChoice` só é chamado após o slider quando não há perguntas por step

**`modules.json`:** 9 módulos novos registrados; `objective` e `estimatedTime` adicionados aos 9 módulos que os não tinham.

**`module-loader.js`:** 8 novos módulos registrados (`em-africa`, `em-latin-america`, `em-migration`, `em-asia-pacific`, `efii-asia`, `es-physical-geography`, `es-postcolonial-feminist`, `es-urban-geography`).

### Corrigido

- `em-climatology-6`: `activity.type` corrigido de `"compass"` para `"single-choice"` — `activityType` seleciona o renderer; `activity.type` determina a validação pelo `FeedbackEngine`
- `efi-brazil-2`: `activity.type` corrigido de `"single-choice"` para `"map-click"` — inconsistência entre activityType e activity.type
- `feedback-engine.js`: adicionados aliases `"compass"` e `"scale"` no switch de `_check()` — evitam `console.warn` e `return false` silencioso quando atividades desses tipos são validadas
- `module-loader.js`: removido comentário órfão `// EFII — adicionado em v0.9` fora de qualquer bloco
- `ui.js`: removida variável `scale` declarada mas nunca usada em `_bindStateSync`
- `modules.json`: adicionados campos `objective` e `estimatedTime` a 9 módulos que os não tinham (necessários para `module-view.js` renderizar sem `undefined`)

### Testes

- 488 ok / 0 falhou (era 446 antes das sessões de expansão)

---

## [1.1.0] — 2026-03-12

### Adicionado

**Conteúdo — correção de 6 módulos all-single-choice (102 → 112 lições):**

- `efi-landscape-1`: `single-choice` → `before-after` (mata original vs. área urbanizada)
- `efi-society-2`: `single-choice` → `flow-map` (fluxos campo→cidade)
- `efii-concepts-3`: `single-choice` → `map-click` (escala global do petróleo — Oriente Médio)
- `em-climatology-2`: `single-choice` → `layer-toggle` (biomas + desmatamento no brazil-layers.svg)
- `em-health-geo-2`: `single-choice` → `map-click` (Região Norte — menor saneamento)
- `em-natural-resources-2`: `single-choice` → `flow-map` (água virtual na soja: Brasil → China/UE)

**Módulo `es-urban-geography`** (artigo — rota `#article/es-urban-geography`):
- 8 seções: Lefebvre e o direito à cidade, metropolização, pensadores (Lefebvre, Harvey, Castells, Davis, Maricato), segregação socioespacial, timeline urbanização Brasil, urbanismo periférico, compare-table de 5 abordagens

**`article-view.js`** (nova view):
- Layout CSS Grid: TOC sticky 220px + conteúdo flex:1
- Intersection Observer para highlight do item ativo no TOC
- Tipos de seção: `text`, `quote`, `thinkers`, `timeline`, `compare-table`
- Rota: `#article/:moduleId` — dados em `data/es/{moduleId}.json`
- `module-view.js` redireciona automaticamente quando `mod.format === 'article'`

**`router.js`:** nova rota `case 'article'` → `renderArticle`

**CSS (`components.css`):** estilos para `.view-article`, `.article-layout`, `.article-toc`, `.article-content`, `.toc-link`, `.thinkers-grid`, `.thinker-card`, `.timeline`, `.compare-table`

### Alterado

- `modules.json`: campo `format: "article"` adicionado aos módulos ES; `es-urban-geography` registrado
- `module-loader.js`: `es-urban-geography` registrado
- `data/es/es-urban-geography.json`: criado

---

## [0.8.0] — 2025-03-11

### Adicionado

**Conteúdo — 6 novas lições (96 → 102 total):**
- `efi-society-4`: Festa, tradição e identidade cultural
- `efi-society-5`: Direitos e deveres — cidadania e espaços públicos
- `em-urban-regional-4`: Mobilidade urbana (`layer-toggle`)
- `em-urban-regional-5`: Desenvolvimento regional desigual (`flow-map`)
- `em-cartography-4`: Sensoriamento remoto (`before-after`)
- `em-cartography-5`: Mapa como argumento — cartografia crítica e poder

**Conversão de 8 lições do EM:**
- `economy-2` → `flow-map`, `economy-3` → `layer-toggle`
- `em-environment-2` → `layer-toggle`, `em-environment-4` → `before-after`
- `em-geopolitics-2` → `map-click`, `em-geopolitics-4` → `map-click`
- `em-brazil-challenges-1` → `layer-toggle`, `em-brazil-challenges-3` → `before-after`

### Alterado

- `modules.json`: `efi-society` 3→5, `em-urban-regional` 3→5, `em-cartography` 3→5
- `data/lessons/index.json`: 102 entradas

---

## [0.7.0] — 2025-03-11

### Adicionado

**Conteúdo — 16 novas lições (80 → 96 total):**
- EFII: `efii-africa-3/4`, `population-3/4`, `efii-americas-4/5`, `efii-europe-4/5`, `efii-concepts-4/5`, `urbanization-4/5`, `globalization-4/5`, `landscape-4/5`

**Diversificação de 3 atividades:**
- `efii-physical-3` → `layer-toggle`, `brazil-2` → `layer-toggle`, `population-1` → `before-after`

**Campo `phenomena`** adicionado a todos os 22 módulos então existentes.

### Corrigido

- Views de escala e fenômeno: token `--space-10` inexistente → `--space-12`
- `lesson-card`: `gap: var(--space-5)` → `--space-4`
- `index.json`: formato `{ lessons: [] }` → `{ id: { moduleId, title... } }`
- `data-tests.js`: validação de `activity.correct` ignora tipos sem resposta binária

---

## [1.0.1] — 2025-03-08

### Corrigido
- Propriedades CSS inválidas `text-size-adjust` e `font-smooth`
- `phenomenon-view.js` ausente — impedia carregamento do roteador
- Painel de acessibilidade: fecha ao clicar fora ou pressionar Escape

### Melhorado
- Globo SVG da home reescrito com continentes reconhecíveis
- Página inicial reestruturada: escala, operações cognitivas, módulos
- Painel de acessibilidade com botão de fechar explícito

---

## [1.0.0] — 2025-03-08

### Adicionado

**Infraestrutura completa:**
- SPA hash-based compatível com GitHub Pages
- `State` reativo, `Router`, `UI`, `Accessibility`
- `data-loader.js` com cache em memória
- `module-loader.js` com lazy import

**Motores:**
- `MapEngine`, `LayerEngine`, `ComparisonEngine`, `FlowEngine`
- `FeedbackEngine` (single-choice, multi-choice, ordering, map-click, text-match)
- `HintSystem` (text, layer, focus, reduce)

**Interface:**
- Tema cartográfico navy/terra/ouro
- Tipografia: Playfair Display + Source Serif 4 + DM Mono
- Layout responsivo mobile-first

**Mapas SVG:**
- `brazil-regions.svg`: 5 regiões clicáveis
- `world-simple.svg`: 10 regiões mundiais

**Testes sem dependências externas:**
- `data-tests.js`, `module-tests.js`, `ui-tests.js`

**Módulos iniciais:** Cartografia Viva, Paisagem, Brasil Espacial, População, Geopolítica
