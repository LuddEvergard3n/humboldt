# Changelog — Humboldt

Todas as alterações significativas do projeto são documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).


## [0.7.0] — 2025-03-11

### Adicionado

**Conteúdo — 16 novas lições (80 → 96 total):**
- `efii-africa-3`: Urbanização africana — Lagos, Cairo, Kinshasa e o crescimento mais acelerado do planeta (activity: `layer-toggle`)
- `efii-africa-4`: África e as mudanças climáticas — injustiça climática e impactos no continente menos poluidor
- `population-3`: Transição demográfica — fases do ciclo e envelhecimento populacional
- `population-4`: Refugiados e deslocados — 100 milhões fora de casa, fluxos e o sistema internacional (activity: `flow-map`)
- `efii-americas-4`: América Central e Caribe — Triângulo Norte, migração e influência norte-americana (activity: `map-click`)
- `efii-americas-5`: Amazônia e Patagônia — rios voadores, Atacama e a Corrente de Humboldt
- `efii-europe-4`: União Europeia — integração, Brexit e a crise grega (activity: `map-click`)
- `efii-europe-5`: Europa e imigração — envelhecimento, rotas mediterrânea e balcânica (activity: `flow-map`)
- `efii-concepts-4`: Território — poder, soberania e atores não-estatais
- `efii-concepts-5`: Redes e fluxos — cabos submarinos, Pix e o espaço invisível
- `urbanization-4`: Metrópoles globais — hierarquia urbana e São Paulo em perspectiva (activity: `before-after`)
- `urbanization-5`: Segregação urbana — periferização, gentrificação e desigualdade racial
- `globalization-4`: Cadeias produtivas globais — do coltan ao iPhone (activity: `flow-map`)
- `globalization-5`: Resistências à globalização — Slow Food, glocalização e soberania alimentar
- `landscape-4`: Paisagem cultural — palimpsesto, Brasília e identidade territorial
- `landscape-5`: Paisagem e tempo geológico — relevo, recursos e o Pantanal (activity: `layer-toggle`)

**Diversificação de atividades — 3 lições convertidas:**
- `efii-physical-3`: `single-choice` → `layer-toggle` (biomas × clima × altitude)
- `brazil-2`: `single-choice` → `layer-toggle` (regiões × PIB × IDH × densidade)
- `population-1`: `single-choice` → `before-after` (pirâmide etária 1980 × 2020)

**Fenômenos — campo `phenomena` adicionado a todos os 22 módulos:**
- Mapeamento completo: 8 fenômenos × 18 módulos com cobertura relevante
- `inequality`: 11 módulos · `migration`: 9 · `water/city/border/energy/transport`: 6 · `climate`: 4

### Corrigido

- Views de escala e fenômeno: removido `modules-inner` como container (causava double-padding)
- Views de escala e fenômeno: substituído `--space-10` (token inexistente) por `--space-12`
- `lesson-card`: `gap: var(--space-5)` → `gap: var(--space-4)` (token inexistente zerava o gap)
- `.lesson-card-type { display: none }` — rótulos em inglês removidos da listagem de lições
- `index.json`: formato corrigido de `{ lessons: [] }` para `{ id: { moduleId, title... } }` (esperado pelos testes)
- `data-tests.js`: validação de `activity.correct` agora ignora tipos sem resposta binária (`layer-toggle`, `flow-map`, `before-after`, `map-click`, `compass`, `scale`)

### Alterado

- `modules.json`: contagem de lições atualizada em 8 módulos expandidos
- `data/lessons/index.json`: 96 entradas (era 80)
- `README.md`: tabelas de conteúdo, schema de lição e estrutura de arquivos atualizados para refletir estado atual

---

---

## [1.0.1] — 2025-03-08

### Corrigido
- Removidas propriedades CSS inválidas `text-size-adjust` e `font-smooth` que causavam avisos no Firefox/Chrome
- Criado arquivo `phenomenon-view.js` ausente que impedia o router de carregar (tela presa em "Carregando atlas...")
- Painel de acessibilidade agora fecha ao clicar fora ou pressionar Escape

### Melhorado
- Globo SVG da home reescrito com continentes reconhecíveis (América do Sul, Europa, África, Ásia, Oceania)
- Página inicial reestruturada: seção de navegação rápida (por Escala / Fenômeno / Módulo), grid de quatro operações cognitivas, módulos com maior hierarquia visual
- Painel de acessibilidade ganhou título e botão de fechar explícito (×)

---

## [1.0.0] — 2025-03-08

### Adicionado

**Infraestrutura**
- Estrutura completa do projeto: HTML, CSS, JS, engine, components, data, assets, tests, docs
- Roteador hash-based SPA compatível com GitHub Pages
- Sistema de estado global (`State`) com notificação por callbacks
- Carregador de dados JSON e SVG com cache em memória (`data-loader.js`)
- Carregador dinâmico de módulos pedagógicos (`module-loader.js`)
- Painel de acessibilidade: tamanho de fonte ajustável, alto contraste
- Persistência de preferências de acessibilidade via `localStorage`
- Modo Professor: overlay com objetivos, mediação e resposta

**Motores**
- `MapEngine`: renderização de SVG, tooltip ao hover, zoom por botões, navegação por teclado
- `LayerEngine`: controle de visibilidade de camadas SVG
- `ComparisonEngine`: slider antes/depois com suporte a mouse, touch e teclado
- `FlowEngine`: setas animadas de fluxo com largura proporcional ao valor
- `FeedbackEngine`: validação de atividades (single-choice, multi-choice, ordering, map-click, text-match)
- `HintSystem`: dicas progressivas por tipo (text, layer, focus, reduce)

**Interface**
- Tema cartográfico com paleta navy/terra/ouro
- Tipografia: Playfair Display (display) + Source Serif 4 (corpo) + DM Mono (mono)
- Layout responsivo mobile-first com breakpoints 1024px, 768px, 480px
- Globo SVG decorativo animado na página inicial
- Breadcrumb, barra de progresso da lição

**Módulos Pedagógicos** (estrutura e dados)
- Cartografia Viva (3 lições)
- Paisagem e Transformação (1 lição)
- Brasil Espacial (2 lições)
- População e Migração (1 lição)
- Geopolítica (2 lições)

**Mapas SVG**
- `brazil-regions.svg`: cinco regiões do Brasil, clicáveis
- `world-simple.svg`: mapa mundial simplificado para mapas de fluxo

**Testes**
- `test-runner.js`: executor de testes sem dependências externas
- `data-tests.js`: 12 verificações de integridade dos JSONs
- `module-tests.js`: 25+ verificações de presença de arquivos
- `ui-tests.js`: 12 testes de lógica do State e FeedbackEngine

**Documentação**
- `docs/architecture.md`
- `docs/pedagogy.md`
- `docs/modules.md`
- `docs/map-system.md`
- `docs/development-guide.md`
- `README.md`
- `CHANGELOG.md`
- `.gitignore`

### Suposições desta versão

- Os mapas SVG são esquemáticos (não de precisão cartográfica) — aceitável para o propósito pedagógico
- O campo `activityType` da lição e o campo `type` dentro de `activity` coexistem; `activityType` determina o renderer principal, `type` dentro de `activity` determina a validação
- Lições sem mapa SVG correspondente em `assets/maps/` recaem no fallback do ActivityEngine

---

## [Próximas versões — backlog]

- Lições restantes para todos os 8 módulos
- Mapas SVG adicionais: biomas do Brasil, mapa de migração interna, mapa político mundial
- Pirâmide etária interativa (módulo Population)
- Comparação temporal de paisagens com imagens reais
- Modo offline (Service Worker)
- Exportação de notas pelo professor (PDF estático)
