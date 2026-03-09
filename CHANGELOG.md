# Changelog — Humboldt

Todas as alterações significativas do projeto são documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

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
