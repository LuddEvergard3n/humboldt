# Humboldt — Referência dos Módulos

## Inventário atual

| Nível | Módulos | Lições | Formato |
|-------|---------|--------|---------|
| EFI   | 4       | 18     | lesson  |
| EFII  | 12      | 58     | lesson  |
| EM    | 9       | 39     | lesson  |
| ES    | 6       | 0      | article |
| **Total** | **31** | **115** | — |

---

## Estrutura de um módulo (`modules.json`)

```json
{
  "id":          "string — slug único (ex: cartography, em-climatology)",
  "order":       "number — ordem de exibição na home",
  "title":       "string — nome exibido",
  "tagline":     "string — descrição curta (uma linha)",
  "level":       "\"efi\" | \"efii\" | \"em\" | \"es\"",
  "format":      "\"lesson\" (default, omissível) | \"article\"",
  "lessons":     "number — 0 para módulos article",
  "scales":      "string[]",
  "phenomena":   "string[]"
}
```

O campo `format` distingue dois tipos de módulo:
- `"lesson"` (ou ausente): lista de lições com atividades. Rota: `#module/{id}`.
- `"article"`: documento longo sem atividades. Rota: `#article/{id}`. Dados em `data/es/{id}.json`.

---

## Módulos por nível

### EFI — Ensino Fundamental I

| id | Título | Lições |
|----|--------|--------|
| `efi-place` | O Lugar Onde Vivemos | 5 |
| `efi-landscape` | Paisagem e Observação | 4 |
| `efi-society` | Sociedade e Espaço | 5 |
| `efi-brazil` | Conhecendo o Brasil | 4 |

### EFII — Ensino Fundamental II

| id | Título | Lições |
|----|--------|--------|
| `efii-concepts` | Conceitos Geográficos | 5 |
| `cartography` | Cartografia Viva | 5 |
| `efii-physical` | Geografia Física | 5 |
| `brazil` | Brasil Espacial | 6 |
| `efii-americas` | As Américas | 5 |
| `efii-africa` | África | 4 |
| `efii-europe` | Europa | 5 |
| `geopolitics` | Geopolítica | 4 |
| `population` | População e Migração | 4 |
| `landscape` | Paisagem e Transformação | 5 |
| `urbanization` | Urbanização | 5 |
| `globalization` | Globalização | 5 |

### EM — Ensino Médio

| id | Título | Lições |
|----|--------|--------|
| `economy` | Economia e Globalização | 4 |
| `em-environment` | Meio Ambiente e Sustentabilidade | 4 |
| `em-geopolitics` | Geopolítica Contemporânea | 4 |
| `em-urban-regional` | Urbanização e Desenvolvimento Regional | 5 |
| `em-cartography` | Cartografia Avançada | 5 |
| `em-brazil-challenges` | Brasil: Desafios do Século XXI | 4 |
| `em-climatology` | Climatologia | 5 |
| `em-health-geo` | Geografia da Saúde | 4 |
| `em-natural-resources` | Recursos Naturais e Conflitos | 4 |

### ES — Ensino Superior (formato article)

| id | Título | Seções |
|----|--------|--------|
| `es-epistemology` | Correntes do Pensamento Geográfico | 7 |
| `es-space-theory` | Teoria do Espaço Geográfico | 6 |
| `es-geopolitics-classic` | Geopolítica Clássica e Contemporânea | 7 |
| `es-cartography-critic` | Cartografia Crítica | 7 |
| `es-economic-geography` | Geografia Econômica | 7 |
| `es-methodology` | Metodologia em Geografia | 6 |

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
  "layers":       [{ "id": "string", "label": "string", "color": "string", "visible": true }],
  "activity": {
    "type":     "string",
    "question": "string",
    "correct":  "string — omitido para: layer-toggle|flow-map|before-after|map-click|compass|scale",
    "options":  [{ "value": "string", "label": "string" }],
    "feedback": { "correct": "string", "incorrect": "string" },
    "hints":    [{ "type": "text|layer", "content": "string", "layerId": "string?" }]
  },
  "legend":  [{ "color": "string", "label": "string" }],
  "teacher": {
    "objective": "string", "observe": "string",
    "answer":    "string", "mediation": "string", "time": "string"
  }
}
```

## Schema de artigo ES (`data/es/{id}.json`)

```json
{
  "id":          "string",
  "title":       "string",
  "subtitle":    "string",
  "intro":       "string",
  "readingTime": "string",
  "sections": [{
    "id":    "string (ex: sec-fundadores)",
    "title": "string",
    "type":  "text | thinkers | timeline | quote | compare-table",
    "..."
  }]
}
```

### Tipos de seção

| type | Campos adicionais |
|------|-------------------|
| `text` | `body: string` — parágrafos separados por `\n\n` |
| `quote` | `text, author, work, year` |
| `thinkers` | `items: [{name, dates, tradition, contribution, quote, quoteWork}]` |
| `timeline` | `events: [{period, label, description}]` |
| `compare-table` | `columns: string[]`, `rows: string[][]` |

---

## Adicionando um módulo (lesson)

1. Entrada em `data/modules.json`
2. `modules/{id}/index.js` exportando `id` e `level`
3. Lições individuais: `data/lessons/{moduleId}-N.json`
4. Entrada em `data/lessons/index.json`
5. Registro em `js/module-loader.js`
6. SVGs em `assets/maps/` se necessário (ver `docs/map-system.md`)
7. `node tests/test-runner.js` — todos os testes devem passar

## Adicionando um módulo (article / ES)

1. Entrada em `data/modules.json` com `format: "article"` e `lessons: 0`
2. `modules/{id}/index.js` exportando `id`, `level`, `format`
3. Conteúdo em `data/es/{id}.json`
4. Registro em `js/module-loader.js`
5. **Não** adicionar ao `data/lessons/index.json`
6. `node tests/test-runner.js` — todos os testes devem passar
