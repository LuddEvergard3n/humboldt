# Política editorial do Humboldt

## Objetivo

O Humboldt apresenta conhecimentos geográficos de forma factual, comparativa e
pluralista. O projeto não adota uma escola teórica como explicação exclusiva e
não substitui um viés político por outro.

## Tipos de afirmação

Todo conteúdo contemporâneo, político ou econômico deve identificar a natureza
da afirmação quando ela não for evidente pelo contexto:

- `data`: medida, série estatística ou localização verificável;
- `consensus`: síntese apoiada por evidência convergente;
- `interpretation`: explicação associada a uma abordagem identificada;
- `debate`: questão com interpretações concorrentes relevantes.

Estimativas devem informar fonte, ano, unidade e território. Conteúdos sujeitos
a mudança recebem `lastReviewed` no formato ISO `AAAA-MM-DD`.

## Pluralismo comparativo

Em controvérsias, a apresentação deve distinguir:

1. tese central;
2. evidências empregadas;
3. autores ou instituições associados;
4. críticas documentadas;
5. limitações metodológicas;
6. interpretações alternativas.

Correntes marxistas, liberais, institucionalistas, realistas, feministas,
pós-coloniais, quantitativas, demográficas, ambientais e culturais podem ser
estudadas. Cada corrente deve ser nomeada e situada, sem ser apresentada como
verdade única.

## Hierarquia de fontes

Priorizar, nesta ordem:

1. institutos estatísticos e órgãos públicos responsáveis pelo dado;
2. organismos multilaterais e documentação técnica oficial;
3. artigos revisados por pares e livros acadêmicos identificados;
4. fontes secundárias apenas quando agregarem contexto indispensável.

Uma fonte registra `title`, `publisher`, `url`, `year` e `accessedAt`. O campo
`note` explica limites ou o uso específico da referência quando necessário.

## Revisão e correção

- Conteúdo novo deve ser revisado antes da publicação.
- Conteúdo legado sem auditoria completa recebe `reviewStatus: pending`.
- Alterações quantitativas devem preservar a fonte anterior no histórico Git.
- Erros factuais têm prioridade sobre ajustes de estilo.
- A interface deve exibir fontes, data de revisão e o marcador editorial sem
  transformar o selo em argumento de autoridade.

## Privacidade

O Humboldt não exige conta. Progresso, favoritos, filtros e preferências de
acessibilidade permanecem no navegador por meio de `localStorage` e não são
enviados a terceiros.
