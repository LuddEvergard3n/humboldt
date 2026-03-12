# Humboldt — Fundamentos Pedagógicos

## Princípio central

Cada lição parte de um fenômeno observável — algo que o aluno já viveu ou pode observar — e constrói o conceito a partir dessa experiência. A sequência é invariável:

1. **Fenômeno** — O que você observa? Por que isso acontece?
2. **Conceito guiado** — Explicação estruturada com pontos de ancoragem
3. **Relações** — Conexão com outros conceitos e escalas
4. **Estudo de caso** — Aplicação em contexto real e concreto
5. **Aplicação** — Tarefa aberta para o aluno fazer fora do atlas
6. **Atividade** — Interação que exige decisão, não memorização

## Tipos de atividade

| Tipo | Descrição | Requer `correct` |
|------|-----------|-----------------|
| `single-choice` | Múltipla escolha com feedback contextual e dicas progressivas | Sim |
| `map-click` | Clique numa região do mapa SVG | Sim (data-id da região) |
| `layer-toggle` | Ligar/desligar camadas num mapa temático | Não |
| `flow-map` | Identificar ou traçar fluxos no espaço | Não |
| `before-after` | Slider de comparação temporal ou temática | Não |
| `compass` | Orientação com rosa dos ventos | Não |
| `scale` | Slider de escala cartográfica | Não |

Os tipos sem `correct` são exploratórios: o aluno interage e a resposta emerge da exploração, não da seleção de uma opção.

## Dois formatos de módulo

### Módulos pedagógicos (EFI, EFII, EM)
Estruturados em lições com a sequência de 6 etapas acima. Cada lição é independente — pode ser usada isoladamente em uma aula de 50 minutos.

### Módulos artigo (ES — Ensino Superior)
Documentos longos de leitura ativa, sem atividades gamificadas. Voltados para estudantes universitários e professores. Estrutura com TOC navegável, citações de autores, linhas do tempo e tabelas comparativas. Tipos de seção disponíveis:

| Tipo | Uso |
|------|-----|
| `text` | Texto expositivo em parágrafos |
| `quote` | Epígrafe de referência teórica |
| `thinkers` | Cards de pensadores com citação e tradição |
| `timeline` | Linha do tempo de correntes ou eventos |
| `compare-table` | Comparação sistemática entre abordagens |

## Modo professor

Ativado por `body.teacher-mode` (toggle na interface ou tecla `T`). Revela:
- Campo `teacher.objective`: o que o aluno deve aprender
- Campo `teacher.observe`: o que o professor deve monitorar durante a atividade
- Campo `teacher.answer`: resposta completa e justificada
- Campo `teacher.mediation`: sugestão de mediação para aprofundamento
- Campo `teacher.time`: tempo estimado para a lição

## Acessibilidade

- Todas as regiões de mapas têm `tabindex="0"`, `role="button"` e `aria-label`
- Preferências persistidas: tamanho de fonte, alto contraste, redução de movimento
- Anúncios de feedback via `window._humboldtAnnounce()` (aria-live)
- Navegação por teclado em toda a aplicação

## Critérios de qualidade para lições

Toda lição deve satisfazer:
1. O fenômeno deve ser observável pelo aluno (não apenas descrito)
2. O estudo de caso deve ser real, nomeado e datado
3. A atividade deve exigir raciocínio geográfico, não memorização de nomenclatura
4. O feedback deve ser explicativo, não apenas "certo/errado"
5. A mediação do professor deve propor uma pergunta aberta de aprofundamento
