# Humboldt — Atlas Interativo de Geografia

**Humboldt** é uma ferramenta educacional web para ensinar o aluno a **ver o espaço, ler mapas, interpretar relações** e perceber que vive dentro da Geografia — não apenas diante dela.

Faz parte de um ecossistema educacional que inclui:

| Projeto | Disciplina | Repositório | Site |
|---------|-----------|-------------|------|
| Heródoto | História | [github](https://github.com/LuddEvergard3n/Herodoto) | [site](https://luddevergard3n.github.io/Herodoto/index.html) |
| Euclides | Matemática | [github](https://github.com/LuddEvergard3n/euclides) | [site](https://luddevergard3n.github.io/euclides/) |
| Quintiliano | Língua Portuguesa | [github](https://github.com/LuddEvergard3n/quintiliano) | [site](https://luddevergard3n.github.io/quintiliano/) |
| Lavoisier | Ciências / Química | [github](https://github.com/LuddEvergard3n/lavoisier) | [site](https://luddevergard3n.github.io/lavoisier/) |
| **Humboldt** | **Geografia** | [github](https://github.com/LuddEvergard3n/humboldt) | [site](https://luddevergard3n.github.io/humboldt/) |
| Archimedes | Física | [github](https://github.com/LuddEvergard3n/archimedes) | [site](https://luddevergard3n.github.io/archimedes/) |
| Johnson | Inglês | [github](https://github.com/LuddEvergard3n/johnson-english) | [site](https://luddevergard3n.github.io/johnson-english/) |
| Aristóteles | Filosofia | [github](https://github.com/LuddEvergard3n/aristoteles) | [site](https://luddevergard3n.github.io/aristoteles/) |
| Darwin | Biologia | [github](https://github.com/LuddEvergard3n/darwin) | [site](https://luddevergard3n.github.io/darwin/) |

---

## Objetivo Pedagógico

A maior dor da Geografia escolar é que ela fala do mundo real mas é ensinada como lista morta de nomes, climas, capitais e definições. O Humboldt resolve isso transformando Geografia em algo visual, relacional, concreto e escalável por nível.

O aluno deve conseguir entender:
- por que certos bairros alagam
- por que alimentos encarecem
- por que povos migram
- por que há guerra por território
- por que certas regiões concentram riqueza
- por que cidade, relevo, água e trabalho não são temas separados

---

## Stack

| Tecnologia        | Uso                              |
|-------------------|----------------------------------|
| HTML5             | Estrutura e semântica            |
| CSS3              | Estilo, layout, responsividade   |
| JavaScript ES2022 | Lógica modular, sem framework    |
| SVG               | Mapas interativos e fluxos       |
| JSON              | Separação de conteúdo e motor    |
| Node.js 18+       | Testes automatizados             |

**Sem React. Sem Vue. Sem Angular. Sem bundler. Sem backend.**

---

## Conteúdo

### Visão geral

| Nível | Módulos | Lições | Formato |
|-------|---------|--------|---------|
| EFI   | 4       | 18     | lição   |
| EFII  | 13      | 63     | lição   |
| EM    | 15      | 65     | lição   |
| ES    | 9       | —      | artigo  |
| **Total** | **41** | **146** | |

### Módulos por nível

#### Ensino Fundamental I (EFI)

| # | Módulo | Lições |
|---|--------|--------|
| 1 | Espaço Vivido e Orientação | 5 |
| 2 | Paisagem e Ambiente | 4 |
| 3 | Sociedade e Trabalho | 5 |
| 4 | Brasil: Meu País | 4 |

#### Ensino Fundamental II (EFII)

| #  | Módulo | Lições |
|----|--------|--------|
| 5  | Conceitos Geográficos Fundamentais | 5 |
| 6  | Cartografia Viva | 5 |
| 7  | Geografia Física | 5 |
| 8  | Brasil Espacial | 6 |
| 9  | As Américas | 5 |
| 10 | África | 4 |
| 11 | Europa e Oceania | 5 |
| 12 | Geopolítica e Mundo | 4 |
| 13 | População e Migrações | 4 |
| 14 | Paisagem e Transformação | 5 |
| 15 | Urbanização | 5 |
| 16 | Globalização | 5 |
| 17 | Ásia | 5 |

#### Ensino Médio (EM)

| #  | Módulo | Lições |
|----|--------|--------|
| 1  | Geografia Econômica | 4 |
| 2  | Meio Ambiente e Crise Climática | 4 |
| 3  | Geopolítica Avançada | 4 |
| 4  | Geografia Urbana e Regional | 5 |
| 5  | Cartografia Avançada e SIG | 6 |
| 6  | Brasil no Século XXI | 4 |
| 7  | Climatologia | 6 |
| 8  | Geografia da Saúde | 4 |
| 9  | Recursos Naturais e Conflitos | 4 |
| 10 | Indo-Pacífico: Geopolítica do Século XXI | 4 |
| 11 | África Contemporânea | 4 |
| 12 | América Latina | 4 |
| 13 | Migrações Contemporâneas | 4 |
| 14 | Energia e Geopolítica | 4 |
| 15 | Logística e Território | 4 |

#### Ensino Superior (ES) — formato artigo

Sem atividades. Foco em leitura longa com TOC sticky, citações, linha do tempo e tabela comparativa de correntes.

| # | Módulo |
|---|--------|
| 1 | Correntes do Pensamento Geográfico |
| 2 | Teoria do Espaço Geográfico |
| 3 | Geopolítica Clássica e Contemporânea |
| 4 | Cartografia Crítica |
| 5 | Geografia Econômica |
| 6 | Metodologia em Geografia |
| 7 | Geografia Urbana e Direito à Cidade |
| 8 | Sistemas Físicos da Terra |
| 9 | Geografias Pós-Coloniais e Feministas |

### Tipos de atividade

| Tipo | Descrição | Lições |
|------|-----------|--------|
| `single-choice` | Múltipla escolha com feedback e dica progressiva | 91 |
| `flow-map` | Mapa de fluxos animados com setas proporcionais | 16 |
| `map-click` | Clicar em região do mapa SVG | 13 |
| `layer-toggle` | Ligar/desligar camadas temáticas | 10 |
| `before-after` | Comparação temporal com slider arrastável | 11 |
| `compass` | Rosa dos ventos interativa | 3 |
| `scale` | Slider de escala cartográfica com perguntas por faixa | 2 |

### Fenômenos cobertos

Cada módulo declara os fenômenos que cobre — usados na navegação "Por Fenômeno":

`water` · `climate` · `migration` · `energy` · `border` · `inequality` · `transport` · `city`

---

## Estrutura de Arquivos

```
humboldt/
├── index.html
├── css/
│   ├── base.css          # reset, tipografia, tokens de espaçamento
│   ├── theme.css         # paleta de cores e variáveis CSS
│   ├── layout.css        # estrutura de página, header, footer
│   ├── components.css    # cards, botões, lesson cards, article view
│   └── mobile.css        # breakpoints responsivos (1024px, 768px, 480px)
├── js/
│   ├── main.js           # bootstrap: inicializa State, Router, UI, Accessibility
│   ├── state.js          # store reativo com notificação por callbacks
│   ├── router.js         # roteamento hash-based SPA
│   ├── ui.js             # chrome: hamburguer, modo professor, dropdowns
│   ├── accessibility.js  # painel a11y, live region, persistência localStorage
│   ├── data-loader.js    # fetch com cache em memória (JSON e SVG)
│   └── module-loader.js  # registro lazy dos 39 módulos
├── engine/
│   ├── map-engine.js         # SVG interativo: tooltip, zoom, teclado
│   ├── layer-engine.js       # visibilidade de camadas [data-layer]
│   ├── comparison-engine.js  # slider antes/depois (mouse, touch, teclado)
│   ├── flow-engine.js        # setas animadas com largura proporcional ao valor
│   ├── feedback-engine.js    # validação de respostas e exibição de feedback
│   └── hint-system.js        # dicas progressivas (text, layer, focus, reduce)
├── components/
│   ├── activity-engine.js    # despachante de atividades por activityType
│   ├── globe-decoration.js   # globo decorativo da hero
│   └── views/
│       ├── home-view.js
│       ├── module-view.js
│       ├── lesson-view.js
│       ├── article-view.js   # artigo ES com TOC sticky e Intersection Observer
│       ├── scale-view.js
│       └── phenomenon-view.js
├── data/
│   ├── modules.json          # 39 módulos com metadados
│   ├── es/                   # 9 artigos de Ensino Superior
│   │   └── {moduleId}.json
│   └── lessons/
│       ├── index.json        # índice plano { id: { moduleId, title, summary, activityType } }
│       └── {id}.json         # 138 arquivos individuais de lição
├── assets/
│   ├── globe.png
│   └── maps/
│       ├── brazil-regions.svg   # 5 regiões clicáveis [data-id]
│       ├── brazil-layers.svg    # biomas com camadas [data-layer]
│       └── world-simple.svg     # 10 regiões mundiais clicáveis [data-id]
├── modules/
│   └── {id}/index.js         # 39 stubs (lazy import)
└── tests/
    ├── test-runner.js
    ├── data-tests.js
    ├── module-tests.js
    └── ui-tests.js
```

---

## Roteamento

| Hash | View |
|------|------|
| `#home` | Página inicial |
| `#module/{id}` | Lista de lições do módulo |
| `#lesson/{moduleId}/{lessonId}` | Lição individual |
| `#article/{moduleId}` | Artigo de Ensino Superior |
| `#scale/{level}` | Módulos por escala geográfica |
| `#phenomenon/{slug}` | Módulos por fenômeno |

---

## Arquitetura de Dados

### Schema de lição

```json
{
  "id": "cartography-1",
  "moduleId": "cartography",
  "title": "Título da lição",
  "summary": "Descrição curta",
  "activityType": "single-choice",
  "phenomenon": { "title": "...", "text": "..." },
  "guided":     { "title": "...", "text": "...", "points": ["..."] },
  "relations":  { "title": "...", "text": "..." },
  "caseStudy":  { "title": "...", "text": "..." },
  "application": "Atividade prática aberta",
  "activity": {
    "type": "single-choice",
    "question": "...",
    "correct": "valor-correto",
    "options": [{ "value": "...", "label": "..." }],
    "feedback": { "correct": "...", "incorrect": "..." },
    "hints": [{ "type": "text", "content": "..." }],
    "hintAfter": 2
  },
  "teacher": {
    "objective": "...",
    "observe": "...",
    "answer": "...",
    "mediation": "...",
    "time": "50 minutos"
  }
}
```

**Convenções importantes:**

- `activity.correct` é opcional em `layer-toggle`, `flow-map`, `before-after` — o feedback é contextual
- `activityType` determina o renderer; `activity.type` determina a validação. Para `compass`, `activityType="compass"` e `activity.type="single-choice"`
- `layer-toggle` requer `activity.mapId` e campo raiz `layers[]`
- `scale` com perguntas por faixa: cada step em `scaleConfig.steps` pode ter `question`, `correct`, `options`, `feedback`, `hints` — a pergunta troca automaticamente conforme o slider muda de faixa

### Schema de artigo ES

```json
{
  "title": "...", "subtitle": "...", "intro": "...", "readingTime": "20 min",
  "sections": [
    { "id": "sec-1", "type": "text",          "title": "...", "body": "..." },
    { "id": "sec-2", "type": "quote",         "text": "...", "author": "...", "work": "...", "year": "..." },
    { "id": "sec-3", "type": "thinkers",      "title": "...", "items": [...] },
    { "id": "sec-4", "type": "timeline",      "title": "...", "events": [...] },
    { "id": "sec-5", "type": "compare-table", "title": "...", "columns": [...], "rows": [...] }
  ]
}
```

### Contratos SVG

| SVG | `data-id` disponíveis |
|-----|-----------------------|
| `brazil-regions.svg` | `norte` `nordeste` `centro-oeste` `sudeste` `sul` |
| `world-simple.svg` | `america-norte` `america-sul` `europa` `africa` `oriente-medio` `russia` `asia-meridional` `asia-oriental` `sudeste-asiatico` `oceania` |
| `brazil-layers.svg` | camadas: `biomas` `cidades` `rios` `rodovias` `desmatamento` |

- `MapEngine` usa `[data-name]` para tooltip e `data-id` para callbacks de clique
- `LayerEngine` controla visibilidade via `[data-layer]` e classe `.map-layer-hidden`

---

## Motores

### ActivityEngine

Despachante central — lê `lesson.activityType` e monta o widget correto:

| `activityType` | Widget | Validação |
|----------------|--------|-----------|
| `single-choice` | Botões de opção | `single-choice` |
| `compass` | Rosa dos ventos + single-choice | `single-choice` |
| `scale` | Slider de escala + perguntas por faixa | `single-choice` por step |
| `layer-toggle` | SVG com checkboxes de camadas | `single-choice` |
| `before-after` | ComparisonEngine + single-choice | `single-choice` |
| `flow-map` | FlowEngine sobre SVG + single-choice | `single-choice` |
| `map-click` | MapEngine com callback de clique | `map-click` |

### FeedbackEngine

Tipos suportados: `single-choice`, `compass` (alias), `scale` (alias), `map-click`, `multi-choice`, `ordering`, `text-match`.

### HintSystem

Tipos de dica: `text`, `layer` (ativa camada SVG), `focus` (pulsa região no mapa), `reduce` (desabilita opções incorretas).

---

## Design System

- **Paleta:** `--color-bg: #f2ede3` · `--color-primary: #1e3a5f` · `--color-accent: #8b5e2e` · `--color-accent-lt: #c4a35a` · `--color-water: #6fa8c4`
- **Tipografia:** Playfair Display · Source Serif 4 · DM Mono
- **Tokens de espaçamento válidos:** `--space-1` a `--space-4`, `--space-6`, `--space-8`, `--space-12`, `--space-16`, `--space-24`
- **Mobile-first:** breakpoints 1024px, 768px, 480px
- `html { font-size: 16px }` fixo — slider de acessibilidade afeta apenas `#main-content`

---

## Rodando Localmente

```bash
python3 -m http.server 8080
# ou
npx serve .

open http://localhost:8080
```

---

## Testes

```bash
node tests/test-runner.js
# Resultado: 488 ok  0 falhou
```

---

## Modo Professor

Ative pelo botão "Modo Professor" no header. Revela objetivo pedagógico, gabarito, mediação sugerida, observações sobre erros comuns e tempo estimado. Implementado via `body.teacher-mode` + `.teacher-only` em CSS.

---

## Licença

MIT
