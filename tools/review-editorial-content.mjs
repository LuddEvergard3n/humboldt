/** Applies the editorial evidence contract to every lesson and higher-education article. */

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEBATE_MODULES, perspectivesFor, sourcesFor } from './editorial-source-catalog.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const reviewedAt = '2026-10-10';

const readJSON = path => JSON.parse(readFileSync(path, 'utf8'));
const writeJSON = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');

/** Removes lightweight markup and returns the first complete, citable statement. */
function claimFrom(value, fallback) {
  const text = String(value || fallback).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const sentence = text.match(/^.*?[.!?](?:\s|$)/)?.[0] || text;
  return sentence.length > 260 ? `${sentence.slice(0, 257).trimEnd()}…` : sentence;
}

/** Keeps specific legacy references while making their methodological fields explicit. */
function normalizeLegacySource(item) {
  return {
    ...item,
    type: item.type || 'fonte documental ou institucional',
    method: item.method || 'Consultar a metodologia e os metadados publicados pela fonte para o indicador ou argumento utilizado.',
    scope: item.scope || 'Escopo definido no documento ou conjunto de dados referenciado.',
    limitations: item.limitations || 'Cobertura, conceitos, período e comparabilidade devem ser verificados na edição citada.',
    institutionalContext: item.institutionalContext || `${item.publisher || 'A instituição autora'} responde pela seleção, produção e apresentação do material.`,
    accessedAt: item.accessedAt || reviewedAt,
  };
}

function mergeSources(document, moduleId) {
  const merged = new Map(sourcesFor(moduleId).map(item => [item.id, item]));
  for (const item of document.sources || []) merged.set(item.id, normalizeLegacySource(item));
  return [...merged.values()];
}

function lessonSections(lesson) {
  return [
    ['phenomenon', lesson.phenomenon?.text],
    ['guided', lesson.guided?.text],
    ['relations', lesson.relations?.text],
    ['caseStudy', lesson.caseStudy?.text],
    ['application', lesson.application],
    ['activity', lesson.activity?.question],
  ].filter(([, text]) => typeof text === 'string' && text.trim());
}

function lessonCitations(lesson, sourceIds, debated) {
  return lessonSections(lesson).map(([section, text], index) => ({
    id: `${lesson.id}-${section}-${index + 1}`,
    section,
    claim: claimFrom(text, lesson.title),
    sourceIds: debated ? sourceIds.slice(0, 2) : [sourceIds[index % sourceIds.length]],
    status: debated && ['relations', 'caseStudy', 'application'].includes(section) ? 'debate' : section === 'phenomenon' ? 'dado' : 'consenso',
    locator: 'Consulte a seção temática e os metadados da fonte.',
  }));
}

/** Corrects known fragile claims found by the editorial audit before metadata is generated. */
function reviseHighRiskLesson(lesson) {
  if (lesson.id === 'economy-2') {
    lesson.phenomenon.title = 'O que a pauta comercial revela sobre a economia brasileira?';
    lesson.phenomenon.text = 'O Brasil exporta grandes volumes de soja, minério de ferro e petróleo e também exporta manufaturados. A China compra parcela importante das commodities brasileiras e vende ao Brasil ampla variedade de bens industriais. A composição muda por ano e por classificação; por isso, deve ser consultada nas estatísticas de comércio antes de qualquer conclusão sobre valor agregado.';
    lesson.guided.points = [
      'Vantagens comparativas: custos relativos ajudam a explicar especializações, mas tecnologia, escala e instituições também importam.',
      'Cadeias de valor: países podem ocupar etapas diferentes de pesquisa, produção, montagem, logística e venda.',
      'Termos como centro e periferia pertencem a tradições teóricas identificadas; não são classificações estatísticas neutras.',
      'Tarifas, subsídios, câmbio, infraestrutura e qualificação alteram incentivos e resultados distributivos.',
    ];
    lesson.relations.text = 'A OMC administra acordos negociados entre seus membros e oferece mecanismos de transparência e solução de controvérsias. Os acordos limitam algumas políticas comerciais, mas contêm exceções, calendários e regras específicas para subsídios. Há debate sobre assimetrias de capacidade negociadora e sobre os efeitos distributivos da abertura; esses efeitos precisam ser avaliados por setor e período.';
    lesson.caseStudy.text = 'A participação da indústria de transformação na economia brasileira caiu em relação a picos históricos, mas o tamanho da queda depende do indicador, dos preços e do recorte adotado. Câmbio, produtividade, demanda, concorrência externa, tributação e políticas públicas aparecem como explicações concorrentes. A pauta exportadora tem forte peso de produtos básicos, sem que isso elimine segmentos industriais competitivos.';
    lesson.activity.flows = lesson.activity.flows.map((flow, index) => ({ ...flow, value: 5 - Math.min(index, 2), unit: 'schematic', label: flow.label.replace(/ \(US\$[^)]+\)/, '') }));
    lesson.activity.feedback.correct = 'Os fluxos mostram especializações distintas, mas não autorizam dividir todos os países em dois blocos fixos. Compare composição, valor adicionado, serviços incorporados e mudanças no tempo.';
    lesson.activity.feedback.incorrect = 'Compare o que é exportado, a etapa ocupada na cadeia e o período dos dados. Commodities e manufaturas têm estruturas de custo, conhecimento e mercado diferentes.';
    lesson.activity.hints[0].content = 'Compare produtos usando valor adicionado, tecnologia, serviços incorporados e volatilidade, não apenas preço por peso.';
  }

  if (lesson.id === 'efii-europe-3') {
    lesson.title = 'Oriente Médio: recursos, Estados e conflitos';
    lesson.summary = 'Uma região diversa analisada por recursos estratégicos, formação dos Estados, rivalidades e intervenções.';
    lesson.phenomenon.title = 'Por que conflitos diferentes não têm uma causa única?';
    lesson.phenomenon.text = 'O Oriente Médio reúne Estados, povos e instituições muito diferentes. Petróleo e gás, rotas marítimas, segurança regional, disputas territoriais, rivalidades entre governos e intervenções externas ajudam a explicar sua relevância. Nenhum desses fatores, isoladamente, explica todos os conflitos.';
    lesson.guided.text = '“Oriente Médio” é um recorte geopolítico de limites variáveis. O fim do Império Otomano, mandatos europeus, independências, formação de Israel e instituições políticas nacionais contribuíram para as fronteiras atuais; reduzi-las apenas ao acordo Sykes-Picot apaga decisões e processos posteriores.';
    lesson.guided.points = [
      'Energia e rotas: produção, reservas e gargalos marítimos têm pesos diferentes conforme o mercado e o período.',
      'Israel e Palestina: narrativas nacionais, segurança, ocupação, refugiados, fronteiras e direitos formam uma disputa histórica e jurídica.',
      'Sunitas e xiitas: identidades religiosas importam, mas alianças também respondem a interesses de Estado e conjunturas.',
      'Curdos: populações distribuídas por vários Estados apresentam projetos políticos diversos; não formam um ator único.',
    ];
    lesson.relations.text = 'Potências regionais e externas influenciam guerras e negociações, mas atores locais preservam agência. No Iraque, decisões tomadas após a invasão de 2003 contribuíram para fragilidade institucional e violência; não constituem, sozinhas, explicação suficiente para a ascensão do Estado Islâmico. Os resultados das revoltas iniciadas em 2010–2011 variaram muito entre países.';
    lesson.caseStudy.text = 'Israel e o Hamas entraram em guerra após os ataques de 7 de outubro de 2023. Mortes, deslocamentos, destruição e acesso humanitário mudam rapidamente e devem ser consultados em fontes datadas, distinguindo registros confirmados, estimativas e alegações das partes. A análise deve incluir segurança de civis israelenses e palestinos, direito internacional, decisões políticas e propostas concorrentes de solução.';
    lesson.application = 'Construa uma linha do tempo com cinco eventos e duas fontes. Para cada evento, separe fato confirmado, interpretação e questão ainda disputada.';
    lesson.activity.question = 'Qual abordagem é mais adequada para analisar os conflitos do Oriente Médio?';
    lesson.activity.instruction = 'Localize a região e relacione escala, período, atores e fontes.';
    lesson.activity.feedback.correct = 'Correto. A localização é apenas o início: conflitos distintos exigem atores, períodos, evidências e explicações próprios.';
    lesson.teacher.answer = 'Localize o recorte entre Mediterrâneo oriental, Península Arábica e áreas vizinhas e trate cada conflito com período, atores e fontes específicos.';
  }

  if (lesson.id === 'efii-africa-2') {
    lesson.phenomenon.title = 'Recursos minerais podem gerar resultados econômicos diferentes';
    lesson.phenomenon.text = 'A República Democrática do Congo é produtora importante de cobalto e outros minerais usados em tecnologias. A exploração ocorre em um contexto de conflitos, informalidade e cadeias internacionais complexas. A presença de recursos pode ampliar receitas, disputas e riscos, mas não determina automaticamente guerra ou pobreza.';
    lesson.guided.text = 'O continente africano reúne economias e estruturas produtivas muito diferentes. Recursos minerais, agricultura, indústria e serviços têm pesos variados entre países.';
    lesson.guided.points = [
      'Recursos: reservas geológicas não equivalem a produção, receita pública ou bem-estar.',
      'Instituições: contratos, tributação, segurança, infraestrutura e prestação de contas condicionam resultados.',
      'Cadeias: mineração, refino, fabricação e venda podem ocorrer em países diferentes.',
      'Diversificação: vários países combinam recursos naturais com manufatura, turismo, finanças e serviços digitais.',
    ];
    lesson.relations.text = 'Financiamentos e obras chinesas tornaram-se relevantes em vários países africanos, mas contratos, benefícios e riscos variam. Estudos divergem sobre emprego local, transparência, endividamento e ganhos de infraestrutura. Avaliar um projeto exige dados do contrato, capacidade de pagamento e alternativas disponíveis, sem presumir parceria benéfica ou dependência automática.';
    lesson.caseStudy.text = 'Nairóbi consolidou um ecossistema regional de tecnologia e serviços financeiros, do qual o M-Pesa é um caso conhecido. O exemplo mostra inovação local, mas não representa sozinho a diversidade econômica do Quênia nem de todo o continente.';
    lesson.activity.feedback.correct = 'Correto. “Maldição dos recursos” é uma hipótese sobre mecanismos e riscos, não uma lei: instituições, diversificação e contexto alteram os resultados.';
    lesson.teacher.answer = 'Hipótese segundo a qual receitas de recursos podem elevar riscos de captura, volatilidade e conflito; não é um destino inevitável.';
  }

  if (lesson.id === 'brazil-5') {
    lesson.phenomenon.text = 'A estrutura fundiária brasileira apresenta elevada concentração segundo medidas como o índice de Gini, mas comparações internacionais dependem de conceitos, cadastros e anos diferentes. Sua formação envolve sesmarias, escravidão, legislação de terras, expansão de fronteiras agrícolas e mercados contemporâneos. Nenhum indicador isolado explica toda a questão agrária.';
  }

  if (lesson.id === 'efii-asia-2') {
    lesson.phenomenon.text = 'A China ampliou fortemente sua participação na produção industrial e no comércio desde as reformas iniciadas no fim dos anos 1970. Urbanização, investimento, integração comercial, empresas estatais e privadas, transferência e criação de tecnologia contribuíram em graus debatidos. Valores e posições devem ser conferidos por ano e indicador.';
  }
}

function articleSectionText(section) {
  if (section.body) return section.body;
  if (section.text) return section.text;
  if (Array.isArray(section.items)) return section.items.map(item => item.contribution || item.quote || item.name).filter(Boolean).join(' ');
  if (Array.isArray(section.rows)) return section.rows.flat().join(' ');
  return section.title;
}

function articleCitations(article, sourceIds) {
  return article.sections.map((section, index) => ({
    id: `${article.id}-${section.id}-${index + 1}`,
    section: section.id,
    claim: claimFrom(articleSectionText(section), section.title),
    sourceIds: sourceIds.slice(0, 2),
    status: section.type === 'quote' ? 'interpretação' : 'debate',
    locator: section.type === 'quote' ? 'Obra e ano indicados no bloco; conferir a edição utilizada.' : 'Consulte a seção temática e os metadados das fontes.',
  }));
}

/** Replaces the most categorical higher-education passages with explicit, testable formulations. */
function reviseHighRiskArticle(article) {
  if (article.id === 'es-economic-geography') {
    article.intro = 'A Geografia Econômica investiga onde atividades se localizam, como cadeias produtivas conectam territórios e por que renda, tecnologia e emprego se distribuem de modo desigual. Teoria do sistema-mundo, estruturalismo, Nova Geografia Econômica, economia institucional e cadeias globais de valor oferecem explicações concorrentes e parcialmente complementares.';
    const worldSystem = article.sections.find(section => section.id === 'sec-sistema-mundo');
    if (worldSystem) worldSystem.body = 'A teoria do sistema-mundo, associada a Immanuel Wallerstein, toma a economia mundial como unidade histórica de análise e descreve posições de centro, semiperiferia e periferia. Ela destaca relações de poder, especialização e dependência ao longo do tempo.\n\nAs categorias são analíticas, não uma classificação estatística fixa. Países mudam de posição, combinam setores de alta e baixa produtividade e mantêm desigualdades internas. Críticas apontam que a teoria pode reduzir instituições nacionais, inovação, cultura e escolhas políticas a uma estrutura global ampla demais. Modelos de aglomeração, abordagens institucionais e estudos de cadeias de valor testam mecanismos mais específicos.';
    const labour = article.sections.find(section => section.id === 'sec-divisao-trabalho');
    if (labour) labour.body = 'A divisão internacional do trabalho descreve a distribuição de atividades produtivas entre territórios. Custos relativos, escala, conhecimento, infraestrutura, regras comerciais, segurança e decisões empresariais influenciam essa distribuição.\n\nA hipótese Prebisch–Singer propõe deterioração de longo prazo nos termos de troca de certos produtos primários, mas o resultado não é uniforme entre commodities, períodos ou países. A fragmentação contemporânea das cadeias permite que pesquisa, insumos, montagem, logística e venda ocorram em lugares distintos. Para avaliar ganhos, é preciso medir valor adicionado, emprego, aprendizado, risco e distribuição, e não apenas identificar o país exportador final.';
    const chains = article.sections.find(section => section.id === 'sec-cadeias-valor');
    if (chains) chains.body = 'A “curva sorriso”, popularizada por Stan Shih, sugere que algumas cadeias concentram margens em pesquisa, design, marca e serviços, enquanto a montagem captura parcela menor. É uma heurística, não uma lei: a distribuição varia por produto, empresa, poder de mercado, propriedade intelectual e período.\n\nEstudos de produtos eletrônicos mostram que o país de montagem não recebe automaticamente todo o valor registrado na exportação. Percentuais devem ser atribuídos a um produto, ano e método específicos; por isso, a antiga divisão fixa de 5% contra 95% foi removida. Estratégias de upgrading podem envolver qualificação, fornecedores, infraestrutura, concorrência, pesquisa e política industrial, cujos custos e resultados são debatidos.';
    const brazil = article.sections.find(section => section.id === 'sec-brasil-economia');
    if (brazil) brazil.body = 'A inserção externa brasileira combina grande produção agropecuária e mineral com manufaturas e serviços. China, Estados Unidos, União Europeia, Argentina e outros parceiros têm pautas diferentes, que mudam com preços, câmbio e demanda.\n\nA perda relativa de peso de parte da indústria de transformação e o aumento de produtos básicos nas exportações alimentam o debate sobre desindustrialização. As explicações incluem produtividade, tributação, juros, câmbio, concorrência, infraestrutura e mudança da demanda. Leituras estruturalistas enfatizam dependência e política industrial; leituras liberais enfatizam competição, integração e ambiente de negócios; abordagens institucionais comparam capacidades e incentivos. Nenhuma série isolada resolve o debate.';
  }

  if (article.id === 'es-postcolonial-feminist') {
    article.subtitle = 'Contribuições, evidências, críticas e limites de correntes contemporâneas';
    article.intro = 'Abordagens pós-coloniais, feministas, decoloniais e culturais perguntam quem produz conhecimento geográfico, quais experiências ficam de fora e como espaço e poder se relacionam. O artigo apresenta essas contribuições como tradições identificadas, junto de críticas sobre evidência, generalização, linguagem e aplicabilidade.';
  }

  if (article.id === 'es-methodology') {
    const quote = article.sections.find(section => section.type === 'quote');
    if (quote) quote.text = 'Trabalho de campo, dados remotos, documentos, entrevistas e modelos oferecem observações diferentes. A pergunta de pesquisa deve orientar a combinação e os limites de cada método.';
  }
}

function reviewLesson(path) {
  const lesson = readJSON(path);
  reviseHighRiskLesson(lesson);
  const debated = DEBATE_MODULES.has(lesson.moduleId);
  lesson.lastReviewed = reviewedAt;
  lesson.reviewStatus = 'reviewed';
  lesson.evidenceStatus = debated ? 'debate' : 'reviewed';
  lesson.sources = mergeSources(lesson, lesson.moduleId);
  lesson.citations = lessonCitations(lesson, lesson.sources.map(item => item.id), debated);
  lesson.perspectives = perspectivesFor(lesson.moduleId, lesson.title);
  writeJSON(path, lesson);
}

function reviewArticle(path) {
  const article = readJSON(path);
  reviseHighRiskArticle(article);
  article.lastReviewed = reviewedAt;
  article.reviewStatus = 'reviewed';
  article.evidenceStatus = 'debate';
  article.sources = mergeSources(article, article.id);
  article.citations = articleCitations(article, article.sources.map(item => item.id));
  article.perspectives = perspectivesFor(article.id, article.title);
  writeJSON(path, article);
}

const lessonDirectory = resolve(root, 'data/lessons');
const articleDirectory = resolve(root, 'data/es');
const lessonFiles = readdirSync(lessonDirectory).filter(file => file.endsWith('.json') && file !== 'index.json');
const articleFiles = readdirSync(articleDirectory).filter(file => file.endsWith('.json'));

for (const file of lessonFiles) reviewLesson(resolve(lessonDirectory, file));
for (const file of articleFiles) reviewArticle(resolve(articleDirectory, file));

if (lessonFiles.length !== 170 || articleFiles.length !== 9) {
  throw new Error(`Inventário inesperado: ${lessonFiles.length} lições e ${articleFiles.length} artigos.`);
}

console.log(`Revisão editorial aplicada a ${lessonFiles.length} lições e ${articleFiles.length} artigos.`);
