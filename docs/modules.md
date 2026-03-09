# Humboldt — Referência dos Módulos

## Estrutura de um Módulo (modules.json)

```json
{
  "id":            "string — identificador único (slug)",
  "order":         "number — ordem de exibição",
  "title":         "string — nome do módulo",
  "tagline":       "string — descrição curta (uma linha)",
  "objective":     "string — objetivo pedagógico completo",
  "concepts":      "string[] — conceitos-chave abordados",
  "scales":        "string[] — escalas: local|regional|nacional|global",
  "phenomena":     "string[] — fenômenos: water|climate|migration|energy|border|inequality|transport|city",
  "lessons":       "number — quantidade de lições",
  "estimatedTime": "string — tempo estimado para o módulo completo"
}
```

## Os 8 Módulos

### 01 — Cartografia Viva
**Objetivo:** Ensinar a ler mapa como linguagem.
**Conceitos:** orientação, escala, legenda, coordenadas, projeções.
**Escalas:** local, regional, nacional, global.
**Atividades:** rosa dos ventos, slider de escala, toggle de camadas.

### 02 — Paisagem e Transformação
**Objetivo:** Ensinar que paisagem é processo, não fotografia.
**Conceitos:** paisagem natural, paisagem humanizada, uso do solo, transformação.
**Escalas:** local, regional.
**Atividades:** antes/depois, análise de imagem.

### 03 — Brasil Espacial
**Objetivo:** Compreender o território brasileiro como sistema vivo.
**Conceitos:** regiões, biomas, rede urbana, desigualdade regional, agronegócio.
**Escalas:** regional, nacional.
**Atividades:** mapa clicável de regiões, toggle de camadas de biomas.

### 04 — População e Migração
**Objetivo:** Ensinar dinâmica populacional e fluxos humanos.
**Conceitos:** crescimento populacional, migração, refugiados, estrutura etária.
**Escalas:** regional, nacional, global.
**Atividades:** mapas de fluxo, pirâmide etária.

### 05 — Cidade, Campo e Trabalho
**Objetivo:** Mostrar como espaço, produção e sociedade se organizam.
**Conceitos:** urbanização, periferização, mobilidade urbana, trabalho.
**Escalas:** local, regional, nacional.
**Atividades:** expansão urbana antes/depois, relação transporte-habitação.

### 06 — Economia e Globalização
**Objetivo:** Explicar circulação, rede, comércio e desigualdade global.
**Conceitos:** blocos econômicos, DIT, fluxos comerciais, corporações.
**Escalas:** nacional, global.
**Atividades:** mapas de fluxo comercial, redes globais.

### 07 — Geopolítica
**Objetivo:** Ensinar território, fronteira, guerra, energia e poder.
**Conceitos:** Estado, soberania, fronteira, conflito, recursos.
**Escalas:** regional, nacional, global.
**Atividades:** mapa de fluxos de recursos, estudos de caso.

### 08 — Redes e Globalização
**Objetivo:** Compreender a globalização como processo desigual.
**Conceitos:** rede, tecnologia, informação, mundialização, desigualdade.
**Escalas:** global.
**Atividades:** mapas de redes, comparações.

## Estrutura de uma Lição (lessons.json)

```json
{
  "id":           "string — moduleId-N (ex: cartography-1)",
  "moduleId":     "string — referência ao módulo",
  "title":        "string",
  "summary":      "string — descrição curta para listagem",
  "activityType": "compass|scale|layer-toggle|before-after|flow-map|map-click|single-choice",
  "phenomenon":   { "title": "string", "text": "string" },
  "guided":       { "title": "string", "text": "string", "points": ["string"] },
  "relations":    { "title": "string", "text": "string" },
  "caseStudy":    { "title": "string", "text": "string" },
  "application":  "string",
  "layers":       [{ "id": "string", "label": "string", "color": "string", "visible": boolean }],
  "activity":     { ... varia por tipo ... },
  "legend":       [{ "color": "string", "label": "string" }],
  "teacher":      {
    "objective":  "string",
    "observe":    "string",
    "answer":     "string",
    "mediation":  "string",
    "time":       "string"
  }
}
```

## Adicionando um Novo Módulo

1. Adicionar entrada em `data/modules.json`
2. Criar `modules/{id}/index.js` exportando `id`, `title`, `lessonIds`
3. Adicionar lições em `data/lessons.json` com `moduleId` correspondente
4. Adicionar o import no mapa de `js/module-loader.js`
5. Criar SVGs necessários em `assets/maps/`
6. Executar `node tests/test-runner.js` — todos os testes devem passar
