/**
 * Adds the six Atlas 2.0 modules and their lesson documents.
 *
 * The operation is idempotent: existing unrelated modules and lessons are
 * preserved, while records owned by this file are updated deterministically.
 * Run with `node tools/expand-atlas-content.mjs` from the repository root.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const REVIEW_DATE = '2026-10-09';

const sources = {
  population: [{ id: 'un-wpp', title: 'World Population Prospects', publisher: 'United Nations DESA', url: 'https://population.un.org/wpp/', year: 2024, accessedAt: REVIEW_DATE }],
  land: [{ id: 'fao-tenure', title: 'Governance of Land Tenure', publisher: 'FAO', url: 'https://www.fao.org/tenure/en', year: 2026, accessedAt: REVIEW_DATE }],
  oceans: [{ id: 'unclos', title: 'United Nations Convention on the Law of the Sea', publisher: 'United Nations', url: 'https://www.un.org/depts/los/convention_agreements/convention_overview_convention.htm', year: 1982, accessedAt: REVIEW_DATE }],
  risks: [{ id: 'undrr-resilience', title: 'Definition: Resilience', publisher: 'UNDRR', url: 'https://www.undrr.org/terminology/resilience', year: 2017, accessedAt: REVIEW_DATE }],
  institutions: [{ id: 'world-bank-wgi', title: 'Worldwide Governance Indicators', publisher: 'World Bank', url: 'https://www.worldbank.org/en/publication/worldwide-governance-indicators', year: 2026, accessedAt: REVIEW_DATE, note: 'Indicadores compostos baseados em múltiplas fontes; devem ser lidos como estimativas, não como avaliações definitivas.' }],
  quantitative: [{ id: 'qgis-manual', title: 'QGIS User Guide', publisher: 'QGIS Project', url: 'https://docs.qgis.org/latest/en/docs/user_manual/', year: 2026, accessedAt: REVIEW_DATE }],
};

const modules = [
  { id: 'em-demography', title: 'Demografia e Transição Populacional', tagline: 'Estrutura etária, fecundidade, mortalidade e migração sem determinismos.', objective: 'Analisar mudanças populacionais, seus indicadores e implicações territoriais.', order: 44, level: 'em', scales: ['nacional', 'global'], phenomena: ['migration', 'inequality'], sourceKey: 'population' },
  { id: 'em-agriculture-land', title: 'Agricultura, Alimentos e Propriedade da Terra', tagline: 'Produção, produtividade, segurança alimentar e regimes de posse.', objective: 'Comparar sistemas agrícolas e instituições fundiárias, distinguindo produtividade, distribuição e sustentabilidade.', order: 45, level: 'em', scales: ['local', 'nacional', 'global'], phenomena: ['inequality', 'water'], sourceKey: 'land' },
  { id: 'em-oceans', title: 'Oceanos e Geografia Marítima', tagline: 'Rotas, recursos, jurisdições e ecossistemas que conectam o planeta.', objective: 'Interpretar o espaço marítimo por suas dimensões física, econômica, jurídica e estratégica.', order: 46, level: 'em', scales: ['regional', 'global'], phenomena: ['water', 'transport', 'border'], sourceKey: 'oceans' },
  { id: 'em-risks-resilience', title: 'Riscos Naturais e Resiliência', tagline: 'Perigo, exposição, vulnerabilidade e capacidade de resposta.', objective: 'Avaliar riscos sem tratar desastres como eventos puramente naturais.', order: 47, level: 'em', scales: ['local', 'regional', 'global'], phenomena: ['climate', 'water', 'city'], sourceKey: 'risks' },
  { id: 'es-institutions-development', title: 'Instituições, Desenvolvimento e Liberdade Econômica', tagline: 'Regras, incentivos, capacidades estatais e limites dos indicadores.', objective: 'Comparar explicações institucionais, históricas, geográficas e econômicas do desenvolvimento.', order: 48, level: 'es', scales: ['nacional', 'global'], phenomena: ['inequality'], sourceKey: 'institutions' },
  { id: 'es-quantitative-geography', title: 'Geografia Quantitativa e Análise Espacial', tagline: 'Medir padrões territoriais sem perder contexto, escala e incerteza.', objective: 'Aplicar conceitos de dados espaciais, autocorrelação, acessibilidade e comunicação cartográfica.', order: 49, level: 'es', scales: ['local', 'regional', 'global'], phenomena: [], sourceKey: 'quantitative' },
].map(module => ({
  ...module,
  lessons: 4,
  estimatedTime: '4 aulas de 50 min',
  format: 'lesson',
  lastReviewed: REVIEW_DATE,
  reviewStatus: 'reviewed',
  evidenceStatus: 'consensus',
  sources: sources[module.sourceKey],
}));

const lessonDefinitions = {
  'em-demography': [
    ['Indicadores demográficos e suas escalas', 'Taxas, estoques e pirâmides etárias descrevem dimensões diferentes da população.', 'Por que dois territórios com a mesma população podem ter necessidades distintas?', 'Indicadores precisam de denominador, período e território; números absolutos isolados raramente bastam.', 'Compare uma pirâmide jovem com uma envelhecida e identifique demandas prováveis de educação, trabalho e saúde.', 'indicadores'],
    ['Transição demográfica: modelo e variações', 'O modelo descreve mudanças históricas de mortalidade e fecundidade, mas ritmos e causas variam.', 'A transição demográfica é uma lei universal?', 'Ela é um modelo comparativo útil, não uma sequência automática nem uma explicação única.', 'Explique por que políticas públicas, renda, urbanização e escolhas familiares podem alterar o ritmo da transição.', 'modelo'],
    ['Envelhecimento, trabalho e proteção social', 'Mudanças na estrutura etária afetam cuidados, previdência e mercado de trabalho.', 'Envelhecimento populacional significa necessariamente declínio econômico?', 'Resultados dependem de produtividade, saúde, participação no trabalho, migração e desenho institucional.', 'Proponha duas políticas com objetivos diferentes: elevar produtividade e ampliar o cuidado de longa duração.', 'politicas'],
    ['Migração e distribuição da população', 'Migração redistribui pessoas e competências entre territórios sem causa única.', 'Como separar fatores de expulsão, atração e redes migratórias?', 'Decisões combinam renda, segurança, família, políticas, ambiente e informação.', 'Classifique causas de um fluxo migratório hipotético sem reduzir a decisão a um único fator.', 'multicausal'],
  ],
  'em-agriculture-land': [
    ['Sistemas agrícolas e produtividade', 'Agricultura familiar, empresarial, intensiva e extensiva são categorias que podem se sobrepor.', 'Tamanho da propriedade determina sozinho a produtividade?', 'Tecnologia, solo, crédito, infraestrutura, gestão e produto cultivado também importam.', 'Compare dois estabelecimentos com tamanhos diferentes e liste variáveis necessárias para avaliar eficiência.', 'variaveis'],
    ['Segurança alimentar e cadeias de abastecimento', 'Produzir alimentos não garante acesso regular a alimentação adequada.', 'Por que pode haver insegurança alimentar em regiões produtoras?', 'Renda, preços, logística, perdas, conflitos e políticas influenciam o acesso.', 'Monte uma cadeia do campo ao consumidor e identifique três pontos de risco.', 'acesso'],
    ['Propriedade, posse e governança da terra', 'Regimes privados, públicos, coletivos, indígenas e costumeiros organizam direitos e deveres distintos.', 'Existe um único regime fundiário eficiente para todos os contextos?', 'Segurança jurídica, legitimidade, capacidade administrativa e contexto local alteram resultados.', 'Compare benefícios e riscos de dois regimes sem presumir superioridade universal.', 'contexto'],
    ['Questão agrária: evidências e propostas', 'Concentração, reforma, regularização e mercados de terra são debatidos por escolas concorrentes.', 'Como avaliar uma política agrária sem usar apenas sua intenção declarada?', 'Devem ser medidos acesso, produtividade, renda, conflitos, ambiente e segurança da posse.', 'Crie uma matriz de avaliação com indicadores econômicos, sociais, jurídicos e ambientais.', 'avaliacao'],
  ],
  'em-oceans': [
    ['O oceano como sistema físico', 'Correntes, relevo submarino e trocas de calor conectam atmosfera, continentes e mares.', 'Por que fenômenos oceânicos produzem efeitos longe de sua origem?', 'Água e energia circulam em escalas planetárias e interagem com a atmosfera.', 'Trace uma cadeia causal entre temperatura do oceano, circulação e clima costeiro.', 'conexoes'],
    ['Direito do mar e zonas marítimas', 'Mar territorial, zona econômica exclusiva e alto-mar atribuem direitos diferentes.', 'Soberania e direito de exploração significam a mesma coisa?', 'A jurisdição varia conforme a distância da costa e o tipo de atividade previsto no direito internacional.', 'Associe cada atividade à zona marítima e justifique pelo tipo de direito exercido.', 'jurisdicao'],
    ['Rotas, portos e gargalos estratégicos', 'Estreitos, canais e portos concentram fluxos e riscos da economia mundial.', 'Por que um ponto pequeno no mapa pode ter importância global?', 'A concentração de rotas cria eficiência, mas também dependência e vulnerabilidade.', 'Compare uma rota curta por canal com uma rota alternativa mais longa em custo e resiliência.', 'gargalo'],
    ['Recursos marinhos e conservação', 'Pesca, energia, mineração e conservação disputam usos no mesmo espaço.', 'Como conciliar uso econômico e renovação dos ecossistemas?', 'Regras eficazes dependem de informação, fiscalização, incentivos e cooperação entre jurisdições.', 'Desenhe um zoneamento marinho com áreas de uso, proteção e monitoramento.', 'zoneamento'],
  ],
  'em-risks-resilience': [
    ['Perigo, exposição e vulnerabilidade', 'Desastre resulta da interação entre fenômeno perigoso, pessoas expostas e condições de vulnerabilidade.', 'Um terremoto intenso sempre produz um grande desastre?', 'Densidade, construção, preparação e resposta alteram fortemente os impactos.', 'Compare dois cenários com o mesmo perigo e vulnerabilidades diferentes.', 'interacao'],
    ['Mapeamento e comunicação de risco', 'Mapas de risco combinam dados físicos e sociais, mas carregam incerteza.', 'Como um mapa pode informar sem criar falsa precisão?', 'Classes, data, resolução, limites e cenários precisam estar explícitos.', 'Escreva uma legenda que comunique probabilidade, período e incerteza.', 'incerteza'],
    ['Prevenção, adaptação e resposta', 'Obras, regulação urbana, alerta e educação atuam em momentos e escalas diferentes.', 'Qual medida isolada elimina o risco?', 'Nenhuma; estratégias robustas combinam prevenção, preparação, resposta e recuperação.', 'Monte um portfólio de medidas e indique responsável, prazo e limite de cada uma.', 'portfolio'],
    ['Resiliência e reconstrução', 'Recuperar funções essenciais não significa reconstruir vulnerabilidades anteriores.', 'Voltar ao estado anterior é sempre o melhor resultado?', 'Transformação pode ser necessária quando o padrão anterior produzia exposição recorrente.', 'Compare reconstrução idêntica e reconstrução adaptativa em um bairro sujeito a enchentes.', 'transformacao'],
  ],
  'es-institutions-development': [
    ['Instituições e incentivos', 'Regras formais e informais moldam expectativas, cooperação e investimento.', 'Instituições explicam sozinhas as diferenças de desenvolvimento?', 'Elas interagem com história, geografia, tecnologia, demografia e relações internacionais.', 'Construa duas explicações concorrentes para o mesmo resultado e indique como testá-las.', 'pluralismo'],
    ['Capacidade estatal e bens públicos', 'Arrecadação, informação, coordenação e execução condicionam serviços e infraestrutura.', 'Estado maior significa necessariamente Estado mais capaz?', 'Tamanho, capacidade, legitimidade e qualidade do gasto são dimensões distintas.', 'Avalie um serviço público usando cobertura, qualidade, custo, equidade e confiança.', 'dimensoes'],
    ['Liberdade econômica: conceitos e índices', 'Direitos de propriedade, abertura, regulação e estabilidade são agregados de maneiras diferentes por cada índice.', 'Um ranking resume adequadamente a liberdade econômica?', 'Índices facilitam comparação, mas escolhas de pesos e dados incorporam decisões normativas.', 'Audite um índice hipotético: definição, variáveis, pesos, lacunas e margem de erro.', 'indice'],
    ['Desenvolvimento: teorias e evidências', 'Abordagens institucional, liberal, estruturalista, geográfica e cultural enfatizam mecanismos distintos.', 'Como comparar teorias sem transformar correlação em causa?', 'Hipóteses devem gerar previsões, considerar casos divergentes e explicitar limitações.', 'Produza uma tabela com tese, evidência, crítica e limite de três abordagens.', 'comparacao'],
  ],
  'es-quantitative-geography': [
    ['Dados espaciais, escala e unidade de análise', 'Pontos, linhas, polígonos e rasters representam fenômenos com perdas diferentes.', 'A mesma análise produz o mesmo resultado em qualquer recorte?', 'Agregação e zoneamento podem alterar padrões e correlações observadas.', 'Reagrupe dados hipotéticos em dois zoneamentos e explique a mudança do resultado.', 'escala'],
    ['Autocorrelação e padrões espaciais', 'Valores próximos podem ser semelhantes por difusão, contexto compartilhado ou construção do dado.', 'Um agrupamento espacial prova causalidade?', 'Não; ele identifica estrutura espacial que exige hipótese e teste adicionais.', 'Diferencie padrão, mecanismo proposto e evidência necessária em um mapa de clusters.', 'causalidade'],
    ['Acessibilidade, redes e localização', 'Distância em rede, tempo, custo e barreiras descrevem acesso melhor que linha reta em muitos problemas.', 'O equipamento mais próximo é sempre o mais acessível?', 'Capacidade, horário, transporte, custo e fronteiras administrativas podem mudar a escolha.', 'Crie uma medida de acesso a hospitais com pelo menos quatro variáveis.', 'acessibilidade'],
    ['Incerteza e ética na análise espacial', 'Dados incompletos, geocodificação e modelos introduzem erros que afetam territórios e pessoas.', 'Quando não publicar um mapa detalhado?', 'Privacidade, estigmatização e risco de reidentificação podem superar o benefício analítico.', 'Defina uma política de generalização para dados sensíveis e justifique seus limites.', 'etica'],
  ],
};

/**
 * Creates a complete lesson document from a compact reviewed definition.
 * @param {object} module Module metadata.
 * @param {number} index Zero-based lesson index.
 * @param {string[]} definition Reviewed lesson fields.
 * @returns {object} Serializable lesson document.
 */
function createLesson(module, index, definition) {
  const [title, summary, question, explanation, application, correct] = definition;
  const id = `${module.id}-${index + 1}`;
  return {
    id,
    moduleId: module.id,
    title,
    summary,
    lastReviewed: REVIEW_DATE,
    reviewStatus: 'reviewed',
    evidenceStatus: index === 3 ? 'debate' : 'consensus',
    estimatedDuration: 50,
    durationUnit: 'minutes',
    scales: module.scales,
    sources: sources[module.sourceKey],
    perspectives: index === 3 ? [{ name: 'Comparativa', thesis: explanation, evidence: 'Comparação de mecanismos, casos e indicadores.', criticism: 'Resultados dependem da seleção de casos e da qualidade dos dados.', limitations: 'Não substitui estudos locais nem demonstra causalidade isoladamente.' }] : [],
    phenomenon: { title: question, text: summary },
    guided: { title: 'Conceito guiado', text: explanation, points: ['Defina o fenômeno.', 'Identifique a escala.', 'Separe descrição, mecanismo e julgamento.'] },
    relations: { title: 'Relações', text: 'Analise fatores físicos, sociais, econômicos, institucionais e culturais sem presumir uma causa única.' },
    caseStudy: { title: 'Estudo comparativo', text: 'Aplique o conceito a dois territórios e registre localização, período, evidência e limites da comparação.', location: 'Definida pelo professor ou estudante', period: 'Contemporâneo, com ano explicitado na atividade' },
    application,
    activityType: 'single-choice',
    activity: {
      question,
      type: 'single-choice',
      correct,
      options: [
        { value: correct, label: explanation },
        { value: 'unica-causa', label: 'O fenômeno pode ser explicado por uma causa única em qualquer território.' },
        { value: 'sem-escala', label: 'A escala e o período não alteram a interpretação.' },
      ],
      hintAfter: 1,
      feedback: { correct: 'Correto. A resposta distingue o conceito, a escala e os limites da evidência.', incorrect: 'Revise o conceito guiado e procure a alternativa que não transforme uma relação contextual em regra universal.' },
      hints: [{ type: 'text', content: 'Procure a alternativa que reconhece múltiplas variáveis e limites de comparação.' }],
    },
    teacher: { objective: module.objective, observe: 'Verifique se descrição, interpretação e juízo de valor permanecem separados.', answer: explanation, mediation: 'Peça evidências para cada mecanismo proposto e compare ao menos duas explicações.', time: '50 minutos' },
  };
}

const modulesPath = resolve(ROOT, 'data/modules.json');
const indexPath = resolve(ROOT, 'data/lessons/index.json');
const moduleData = JSON.parse(await readFile(modulesPath, 'utf8'));
const lessonIndex = JSON.parse(await readFile(indexPath, 'utf8'));
const ownedIds = new Set(modules.map(module => module.id));

moduleData.modules = moduleData.modules
  .filter(module => !ownedIds.has(module.id))
  .map(module => ({ ...module, lastReviewed: module.reviewStatus === 'reviewed' ? module.lastReviewed : null, reviewStatus: module.reviewStatus ?? 'pending' }))
  .concat(modules);

for (const module of modules) {
  const definitions = lessonDefinitions[module.id];
  for (const [index, definition] of definitions.entries()) {
    const lesson = createLesson(module, index, definition);
    await writeFile(resolve(ROOT, `data/lessons/${lesson.id}.json`), `${JSON.stringify(lesson, null, 2)}\n`, 'utf8');
    lessonIndex[lesson.id] = { moduleId: lesson.moduleId, title: lesson.title, summary: lesson.summary, activityType: lesson.activityType, lastReviewed: lesson.lastReviewed, evidenceStatus: lesson.evidenceStatus };
  }
}

const sortedIndex = Object.fromEntries(Object.entries(lessonIndex).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(modulesPath, `${JSON.stringify(moduleData, null, 2)}\n`, 'utf8');
await writeFile(indexPath, `${JSON.stringify(sortedIndex, null, 2)}\n`, 'utf8');

console.log(`Atlas content ready: ${moduleData.modules.length} modules and ${Object.keys(sortedIndex).length} lessons.`);
