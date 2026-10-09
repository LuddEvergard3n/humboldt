# Humboldt — Referência dos Módulos

## Inventário atual

| Nível | Módulos | Lições | Formato |
|-------|---------|--------|---------|
| EFI   | 4       | 18     | lesson  |
| EFII  | 13      | 63     | lesson  |
| EM    | 15      | 65     | lesson  |
| ES    | 9       | —      | article |
| **Total** | **41** | **146** | — |

---

## Estrutura de um módulo (`modules.json`)

```json
{
  "id":            "string — slug único (ex: cartography, em-energy)",
  "order":         "number — ordem de exibição na home",
  "title":         "string — nome exibido",
  "tagline":       "string — descrição curta (uma linha)",
  "level":         "\"efi\" | \"efii\" | \"em\" | \"es\"",
  "format":        "\"lesson\" (default, omissível) | \"article\"",
  "lessons":       "number — 0 para módulos article",
  "estimatedTime": "string — ex: \"4 aulas de 50 min\"",
  "objective":     "string — objetivo pedagógico geral do módulo",
  "scales":        "string[] — [\"local\", \"regional\", \"nacional\", \"global\"]",
  "phenomena":     "string[] — [\"water\", \"climate\", \"migration\", \"energy\", \"border\", \"inequality\", \"transport\", \"city\"]"
}
```

O campo `format` distingue dois tipos:
- `"lesson"`: lista de lições com atividades. Rota `#module/{id}`.
- `"article"`: documento longo sem atividades. Rota `#article/{id}`. Dados em `data/es/{id}.json`.

---

## Módulos por nível

### EFI — Ensino Fundamental I

| id | Título | Lições |
|----|--------|--------|
| `efi-place` | Espaço Vivido e Orientação | 5 |
| `efi-landscape` | Paisagem e Ambiente | 4 |
| `efi-society` | Sociedade e Trabalho | 5 |
| `efi-cartography-intro` | Brasil: Meu País | 4 |

### EFII — Ensino Fundamental II

| id | Título | Lições |
|----|--------|--------|
| `efii-concepts` | Conceitos Geográficos Fundamentais | 5 |
| `cartography` | Cartografia Viva | 5 |
| `efii-physical` | Geografia Física | 5 |
| `brazil` | Brasil Espacial | 6 |
| `efii-americas` | As Américas | 5 |
| `efii-africa` | África | 4 |
| `efii-europe` | Europa e Oceania | 5 |
| `geopolitics` | Geopolítica e Mundo | 4 |
| `population` | População e Migrações | 4 |
| `landscape` | Paisagem e Transformação | 5 |
| `urbanization` | Urbanização | 5 |
| `globalization` | Globalização | 5 |
| `efii-asia` | Ásia | 5 |

### EM — Ensino Médio

| id | Título | Lições |
|----|--------|--------|
| `economy` | Geografia Econômica | 4 |
| `em-environment` | Meio Ambiente e Crise Climática | 4 |
| `em-geopolitics` | Geopolítica Avançada | 4 |
| `em-urban-regional` | Geografia Urbana e Regional | 5 |
| `em-cartography` | Cartografia Avançada e SIG | 6 |
| `em-brazil-challenges` | Brasil no Século XXI | 4 |
| `em-climatology` | Climatologia | 6 |
| `em-health-geo` | Geografia da Saúde | 4 |
| `em-natural-resources` | Recursos Naturais e Conflitos | 4 |
| `em-asia-pacific` | Indo-Pacífico: Geopolítica do Século XXI | 4 |
| `em-africa` | África Contemporânea | 4 |
| `em-latin-america` | América Latina | 4 |
| `em-migration` | Migrações Contemporâneas | 4 |
| `em-energy` | Energia e Geopolítica | 4 |
| `em-transport` | Logística e Território | 4 |

### ES — Ensino Superior (formato article)

| id | Título |
|----|--------|
| `es-epistemology` | Correntes do Pensamento Geográfico |
| `es-space-theory` | Teoria do Espaço Geográfico |
| `es-geopolitics-classic` | Geopolítica Clássica e Contemporânea |
| `es-cartography-critic` | Cartografia Crítica |
| `es-economic-geography` | Geografia Econômica |
| `es-methodology` | Metodologia em Geografia |
| `es-urban-geography` | Geografia Urbana e Direito à Cidade |
| `es-physical-geography` | Sistemas Físicos da Terra |
| `es-postcolonial-feminist` | Abordagens Contemporâneas e Debates |

---

## Schema de lição (`data/lessons/{id}.json`)

```json
{
  "id":           "moduleId-N",
  "moduleId":     "string",
  "title":        "string",
  "summary":      "string",
  "activityType": "compass|scale|layer-toggle|before-after|flow-map|map-click|single-choice",
  "phenomenon":   { "title": "string", "text": "string" },
  "guided":       { "title": "string", "text": "string", "points": ["string"] },
  "relations":    { "title": "string", "text": "string" },
  "caseStudy":    { "title": "string", "text": "string" },
  "application":  "string",
  "layers": [{ "id": "string", "label": "string", "color": "string", "visible": true }],
  "activity": {
    "type":     "single-choice (mesmo quando activityType é compass)",
    "question": "string",
    "correct":  "string — omitido em: layer-toggle | flow-map | before-after",
    "options":  [{ "value": "string", "label": "string" }],
    "feedback": { "correct": "string", "incorrect": "string" },
    "hints":    [{ "type": "text|layer|focus|reduce", "content": "string" }],
    "hintAfter": 2,
    "mapId":    "string — obrigatório em layer-toggle e map-click",
    "flows":    [{ "from": [x, y], "to": [x, y], "value": 0, "label": "string", "color": "string" }],
    "compareConfig": { "beforeSvg": "string", "afterSvg": "string", "beforeLabel": "string", "afterLabel": "string" },
    "scaleConfig": {
      "min": 1, "max": 10, "initial": 5,
      "labelMin": "50.000.000", "labelMax": "5.000",
      "steps": [{ "min": 1, "max": 3, "description": "string", "question": "string", "correct": "string", "options": [], "feedback": {} }]
    }
  },
  "legend":  [{ "color": "string", "label": "string" }],
  "teacher": {
    "objective": "string", "observe": "string",
    "answer":    "string", "mediation": "string", "time": "string"
  }
}
```

**Convenção `activityType` vs `activity.type`:** `activityType` seleciona o renderer no `ActivityEngine`; `activity.type` é usado pelo `FeedbackEngine` para validação. Para `compass`, `activityType = "compass"` e `activity.type = "single-choice"`.

### Scale com perguntas por faixa

Se qualquer `step` em `scaleConfig.steps` possuir `question`, o motor entra em modo per-step: a pergunta, opções e feedback trocam automaticamente conforme o slider muda de faixa. Modo legado (pergunta global) é mantido quando nenhum step tem `question`.

---

## Schema de artigo ES (`data/es/{id}.json`)

```json
{
  "title": "string", "subtitle": "string", "intro": "string", "readingTime": "string",
  "sections": [{
    "id": "string", "title": "string",
    "type": "text | thinkers | timeline | quote | compare-table",
    "..."
  }]
}
```

| type | Campos adicionais |
|------|-------------------|
| `text` | `body: string` — parágrafos separados por `\n\n` |
| `quote` | `text, author, work, year` |
| `thinkers` | `items: [{name, dates, tradition, contribution, quote, quoteWork}]` |
| `timeline` | `events: [{period, label, description}]` |
| `compare-table` | `columns: string[]`, `rows: string[][]` |

---

## Adicionando um módulo (lesson)

1. Entrada em `data/modules.json` com todos os campos obrigatórios
2. `modules/{id}/index.js` exportando `moduleId`
3. Lições em `data/lessons/{moduleId}-N.json`
4. Entradas em `data/lessons/index.json` (objeto plano)
5. Registro em `js/module-loader.js`
6. SVGs em `assets/maps/` se necessário
7. `node tests/test-runner.js` — todos os testes devem passar

## Adicionando um módulo (article / ES)

1. Entrada em `data/modules.json` com `format: "article"` e `lessons: 0`
2. `modules/{id}/index.js` exportando `moduleId`
3. Conteúdo em `data/es/{id}.json`
4. Registro em `js/module-loader.js`
5. **Não** adicionar ao `data/lessons/index.json`
6. `node tests/test-runner.js` — todos os testes devem passar
