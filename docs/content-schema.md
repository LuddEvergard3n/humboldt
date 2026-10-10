# Contrato editorial dos dados

## Metadados comuns

Módulos e lições usam:

- `lastReviewed`: data ISO da última revisão;
- `reviewStatus`: `reviewed` para todo conteúdo publicável;
- `sources`: lista de fontes estruturadas;
- `perspectives`: lista de interpretações comparáveis, quando aplicável;
- `evidenceStatus`: `reviewed`, `consensus` ou `debate` no documento;
- `citations`: alegações ligadas aos blocos e às fontes do próprio documento.

Uma estatística deve usar um objeto com `value`, `unit`, `year`, `territory` e
`sourceId`. Estudos de caso devem informar `location` e `period`.

## Fonte

```json
{
  "id": "undrr-resilience",
  "title": "Definition: Resilience",
  "publisher": "UNDRR",
  "url": "https://www.undrr.org/terminology/resilience",
  "year": 2017,
  "type": "glossário técnico institucional",
  "method": "Definição consolidada a partir da terminologia da instituição.",
  "scope": "Redução de risco de desastres em escala internacional.",
  "limitations": "A aplicação depende do perigo, do território e do indicador.",
  "institutionalContext": "Escritório da ONU para redução de risco de desastres.",
  "accessedAt": "2026-10-09"
}
```

## Citação

```json
{
  "id": "lesson-1-phenomenon-1",
  "section": "phenomenon",
  "claim": "Risco combina perigo, exposição e vulnerabilidade.",
  "sourceIds": ["undrr-resilience", "national-monitoring"],
  "status": "consenso",
  "locator": "Terminology: disaster risk"
}
```

`section` usa um bloco existente da lição (`phenomenon`, `guided`, `relations`,
`caseStudy`, `application` ou `activity`) ou o `id` de uma seção do artigo.
Todo `sourceId` deve existir no mesmo documento. Citações `debate` exigem ao
menos duas fontes.

## Perspectiva

```json
{
  "name": "Institucional",
  "thesis": "Instituições inclusivas e previsíveis reduzem custos de coordenação.",
  "evidence": "Indicadores comparativos, estudos históricos e avaliações de política.",
  "criticism": "Indicadores agregados podem ocultar diferenças locais e causalidade reversa.",
  "limitations": "Comparabilidade e mensuração variam por país e período."
}
```

O contrato é obrigatório nas 170 lições e nos nove artigos superiores. Os
testes locais rejeitam revisão pendente, fontes incompletas, IDs duplicados,
citações órfãs, debates sem duas fontes e estatísticas estruturadas sem valor,
unidade, ano, território ou fonte.
