# Humboldt — Atlas Interativo de Geografia

**Humboldt** é uma ferramenta educacional web para ensinar o aluno a **ver o espaço, ler mapas, interpretar relações** e perceber que vive dentro da Geografia — não apenas diante dela.

Faz parte de um ecossistema educacional que inclui:
[Heródoto](https://luddevergard3n.github.io/Herodoto/) · [Euclides](https://luddevergard3n.github.io/euclides/) · [Quintiliano](https://luddevergard3n.github.io/quintiliano/) · [Johnson English](https://luddevergard3n.github.io/johnson-english/)

---

## Objetivo Pedagógico

A maior dor da Geografia escolar é que ela fala do mundo real mas é ensinada como lista morta de nomes, climas, capitais e definições. O Humboldt resolve isso transformando Geografia em algo visual, relacional, concreto e escalável por nível.

O aluno deve conseguir entender, por exemplo:
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

| Nível | Módulos | Lições |
|-------|---------|--------|
| EFI   | 4       | 18     |
| EFII  | 12      | 58     |
| EM    | 6       | 26     |
| **Total** | **22** | **102** |

### Módulos por nível

#### Ensino Fundamental I (EFI)
| # | Módulo | Lições |
|---|--------|--------|
| 1 | O Lugar onde Vivemos | 5 |
| 2 | Paisagem e Ambiente | 4 |
| 3 | Sociedade e Espaço | 5 |
| 4 | Brasil: meu país | 4 |

#### Ensino Fundamental II (EFII)
| # | Módulo | Lições |
|---|--------|--------|
| 5 | Conceitos Geográficos | 5 |
| 6 | Cartografia Viva | 5 |
| 7 | Geografia Física | 5 |
| 8 | Brasil Espacial | 6 |
| 9 | As Américas | 5 |
| 10 | África | 4 |
| 11 | Europa | 5 |
| 12 | Geopolítica | 4 |
| 13 | População e Migração | 4 |
| 14 | Paisagem e Transformação | 5 |
| 15 | Urbanização | 5 |
| 16 | Globalização | 5 |

#### Ensino Médio (EM)
| # | Módulo | Lições |
|---|--------|--------|
| 17 | Economia e Globalização | 4 |
| 18 | Meio Ambiente e Crise Climática | 4 |
| 19 | Geopolítica Contemporânea | 4 |
| 20 | Espaço Urbano-Regional | 5 |
| 21 | Cartografia Crítica | 5 |
| 22 | Brasil no Século XXI | 4 |

### Tipos de atividade

| Tipo | Descrição | Lições |
|------|-----------|--------|
| `single-choice` | Múltipla escolha com feedback e dica | 72 |
| `layer-toggle` | Ligar/desligar camadas no mapa | 9 |
| `map-click` | Clicar em regiões do mapa | 6 |
| `flow-map` | Mapa de fluxos animados | 6 |
| `before-after` | Comparação temporal com slider | 6 |
| `compass` | Rosa dos ventos interativa | 2 |
| `scale` | Slider de escala cartográfica | 1 |

### Fenômenos cobertos

Cada módulo declara os fenômenos geográficos que cobre — usados na navegação "Por Fenômeno":

`water` · `climate` · `migration` · `energy` · `border` · `inequality` · `transport` · `city`

---

## Estrutura de Arquivos

```
humboldt/
├── index.html
├── css/
│   ├── base.css          # reset, tipografia, tokens
│   ├── theme.css         # paleta de cores
│   ├── layout.css        # estrutura de página e sections
│   ├── components.css    # cards, botões, lesson cards
│   └── mobile.css        # breakpoints responsivos
├── js/
│   ├── main.js           # bootstrap e init
│   ├── state.js          # store reativo centralizado
│   ├── router.js         # roteamento por hash (#home, #module/id, etc.)
│   ├── ui.js             # controles de UI (acessibilidade, modo professor)
│   ├── accessibility.js  # anúncios, foco, preferências
│   ├── data-loader.js    # fetch com cache em memória
│   └── module-loader.js  # registro dos 22 módulos
├── engine/
│   ├── map-engine.js         # renderização de mapas SVG
│   ├── layer-engine.js       # camadas ligáveis
│   ├── comparison-engine.js  # slider before/after
│   ├── flow-engine.js        # fluxos animados
│   ├── feedback-engine.js    # validação de respostas
│   └── hint-system.js        # sistema de dicas progressivas
├── components/
│   ├── activity-engine.js    # despachante de atividades por tipo
│   ├── globe-decoration.js   # globo decorativo da hero (PNG + SVG overlay)
│   └── views/
│       ├── home-view.js
│       ├── module-view.js
│       ├── lesson-view.js
│       ├── scale-view.js     # views de escala e fenômeno
│       └── phenomenon-view.js
├── data/
│   ├── modules.json          # 22 módulos com metadados
│   └── lessons/
│       ├── index.json        # índice plano { id: { moduleId, title, summary, activityType } }
│       └── {id}.json         # 96 arquivos individuais de lição
├── assets/
│   ├── globe.png             # globo base para hero
│   └── maps/                 # SVGs de mapas
├── docs/
│   ├── architecture.md
│   ├── pedagogy.md
│   ├── modules.md
│   ├── map-system.md
│   └── development-guide.md
└── tests/
    ├── test-runner.js
    ├── data-tests.js
    ├── module-tests.js
    └── ui-tests.js
```

---

## Roteamento

Hash-based (compatível com GitHub Pages sem configuração de servidor):

| Hash | View |
|------|------|
| `#home` | Página inicial |
| `#modules` | Lista de módulos |
| `#module/{id}` | Página do módulo |
| `#lesson/{id}` | Lição individual |
| `#scale/{level}` | Módulos por escala geográfica |
| `#phenomenon/{slug}` | Módulos por fenômeno |

---

## Schema de Lição

```json
{
  "id": "cartography-1",
  "moduleId": "cartography",
  "title": "Título da lição",
  "summary": "Descrição curta",
  "activityType": "single-choice",
  "phenomenon": { "title": "...", "text": "..." },
  "guided": { "title": "...", "text": "...", "points": ["..."] },
  "relations": { "title": "...", "text": "..." },
  "caseStudy": { "title": "...", "text": "..." },
  "application": "Atividade prática aberta",
  "activity": {
    "question": "...",
    "type": "single-choice",
    "correct": "valor-correto",
    "options": [{ "value": "...", "label": "..." }],
    "feedback": { "correct": "...", "incorrect": "..." },
    "hints": [{ "type": "text", "content": "..." }]
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

Para `layer-toggle`, `flow-map`, `before-after` e `map-click`, o campo `activity.correct` é opcional — o feedback é contextual, não binário.

---

## Rodando Localmente

Requer servidor HTTP local (ES modules não funcionam via `file://`):

```bash
# Python 3
python3 -m http.server 8080

# Node.js
npx serve .

# Acesse
open http://localhost:8080
```

---

## Testes

```bash
node tests/test-runner.js
```

Validações cobertas: estrutura de JSON, campos obrigatórios por tipo de atividade, integridade do índice de lições, referências de módulo válidas, existência de arquivos de engine e CSS, exports dos módulos JS.

---

## Modo Professor

Ative pelo botão "Modo Professor" no header. Revela:
- Objetivo pedagógico da lição
- Gabarito com justificativa
- Mediação sugerida
- Observações sobre erros comuns
- Tempo estimado

Implementado via `body.teacher-mode` + `.teacher-only { display: none }` em CSS.

---

## Design

- **Paleta**: `--color-bg: #f2ede3`, `--color-primary: #1e3a5f`, `--color-accent: #8b5e2e`, `--color-accent-lt: #c4a35a`
- **Tipografia**: Playfair Display (display), Source Serif 4 (corpo), DM Mono (mono)
- **Mobile-first**: breakpoints em 768px e 1024px
- **Sem scroll horizontal**: todos os layouts com `max-width` e padding responsivo

---

## Licença

MIT
