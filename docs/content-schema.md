# Contrato editorial dos dados

## Metadados comuns

Módulos e lições usam:

- `lastReviewed`: data ISO da última revisão;
- `reviewStatus`: `reviewed`, `partial` ou `pending`;
- `sources`: lista de fontes estruturadas;
- `perspectives`: lista de interpretações comparáveis, quando aplicável;
- `evidenceStatus`: `data`, `consensus`, `interpretation` ou `debate`.

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
  "accessedAt": "2026-10-09"
}
```

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

O contrato é progressivo: conteúdo legado pode permanecer `pending`, mas uma
lição marcada como `reviewed` não pode omitir fontes em temas contemporâneos,
políticos ou econômicos.
