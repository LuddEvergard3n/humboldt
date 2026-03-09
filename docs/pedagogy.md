# Humboldt — Filosofia e Estrutura Pedagógica

## O Problema que o Humboldt Resolve

A maior dor da Geografia escolar é que ela fala do mundo real mas é frequentemente ensinada como lista morta: capitais, climas, nomes de rios, definições decoradas.

O Humboldt parte de um diagnóstico simples: **o aluno não precisa memorar o mundo — ele precisa aprender a lê-lo.**

## As Quatro Operações Cognitivas

O sistema organiza toda a experiência de aprendizagem em torno de quatro operações:

### 1. Ver
Observar mapas, imagens, paisagens, fluxos, gráficos e escalas. Antes de qualquer interpretação, o aluno precisa desenvolver o hábito de olhar com atenção e sem pressa.

### 2. Ler
Interpretar legenda, direção, densidade, localização, proporção, rede e fronteira. Ver sem ler é passivo. Ler é decodificar o sistema de signos do mapa e da imagem geográfica.

### 3. Relacionar
Conectar fatores físicos e humanos. Ligar clima, relevo, economia, cidade, migração, guerra, energia, água e território. A separação entre "geografia física" e "geografia humana" é uma convenção didática que o Humboldt recusa: o espaço é integrado.

### 4. Aplicar
Trazer a Geografia para a vida real do aluno. Responder perguntas concretas do cotidiano: por que o bairro alaga? Por que o alimento ficou mais caro? Por que há guerra por aquele território?

## Estrutura de Cada Lição

Toda lição segue a mesma sequência de 7 passos:

| Passo | Nome              | Descrição                                                     |
|-------|-------------------|---------------------------------------------------------------|
| 01    | Fenômeno          | Começa com situação concreta, imagem ou pergunta real         |
| 02    | Visualização      | Mapa, imagem comparativa, fluxo ou gráfico interativo         |
| 03    | Leitura Guiada    | Instrução explícita sobre o que e como observar               |
| 04    | Relação           | Conexão entre fatores físicos, humanos, econômicos            |
| 05    | Estudo de Caso    | Exemplo real e concreto que ilustra o fenômeno                |
| 06    | Aplicação         | O fenômeno no cotidiano do aluno                              |
| 07    | Atividade Final   | Interação que exige aplicação do raciocínio — não memorização |

**Regra fundamental:** a lição nunca começa com definição abstrata. Sempre começa pelo fenômeno.

## Sistema de Dicas

As dicas não entregam a resposta — elas **focam o raciocínio**:

- `text`: Faz uma pergunta ou aponta uma direção de raciocínio
- `layer`: Ativa uma camada do mapa que o aluno não estava vendo
- `focus`: Destaca visualmente a região relevante no mapa
- `reduce`: Remove alternativas claramente incorretas

Dicas são ativadas automaticamente após um número configurável de erros (`hintAfter`).

## Modo Professor

O Modo Professor revela, em cada lição:

- Objetivo pedagógico específico
- O que observar na interação do aluno
- Resposta/critério da atividade
- Sugestão de mediação
- Tempo estimado

O modo professor não é uma opção secundária — é parte do design do sistema. O Humboldt é uma ferramenta de sala de aula, não apenas de estudo individual.

## O que o Humboldt Recusa

- Banco de questões de múltipla escolha puro
- Apostila digital (texto longo sem interação)
- Mapas estáticos sem camadas
- Separação artificial entre geografia física e humana
- Começar pela definição
- Ignorar o cotidiano do aluno
- Infantilizar o conteúdo

## Princípio de Escalabilidade Pedagógica

Cada módulo tem um atributo `scales` que indica em que escalas ele opera (local, regional, nacional, global). Cada fenômeno tem um atributo `phenomena` que permite navegação transversal. Isso significa que o mesmo conceito de "migração" pode ser encontrado navegando pelo módulo, pela escala ou pelo fenômeno — sem duplicação de conteúdo.
