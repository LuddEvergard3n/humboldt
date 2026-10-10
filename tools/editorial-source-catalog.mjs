/** Curated, auditable sources used by the deterministic editorial migration. */

const accessedAt = '2026-10-10';

const source = (id, title, publisher, url, year, type, method, scope, limitations, institutionalContext) => ({
  id, title, publisher, url, year, type, method, scope, limitations, institutionalContext, accessedAt,
});

export const SOURCES = {
  'ibge-atlas': source('ibge-atlas', 'Atlas Geográfico Escolar', 'IBGE', 'https://www.ibge.gov.br/geociencias/atlas/nacional/2402-np-atlas-geografico-escolar/16633-atlas-geografico-escolar.html', 2024, 'atlas institucional', 'Síntese cartográfica e estatística baseada em levantamentos do IBGE e fontes identificadas.', 'Brasil e mundo; séries com períodos distintos.', 'Mapas e sínteses escolares simplificam fenômenos e devem ser lidos com a data de cada camada.', 'Instituto público brasileiro responsável por estatísticas oficiais e geociências.'),
  'ibge-censo': source('ibge-censo', 'Censo Demográfico 2022', 'IBGE', 'https://censo2022.ibge.gov.br/', 2022, 'censo oficial', 'Enumeração domiciliar nacional, tratamento estatístico e divulgação territorial conforme documentação do censo.', 'Brasil; referência em 1º de agosto de 2022.', 'Revisões, não resposta, imputação e diferenças conceituais afetam comparações com pesquisas amostrais.', 'Instituto público com mandato legal para produzir estatísticas nacionais.'),
  'ibge-agro': source('ibge-agro', 'Censo Agropecuário 2017', 'IBGE', 'https://censoagro2017.ibge.gov.br/', 2017, 'censo oficial', 'Levantamento censitário de estabelecimentos agropecuários com conceitos e período de referência próprios.', 'Brasil; estabelecimentos agropecuários; ano-base 2017.', 'Não descreve automaticamente propriedade jurídica, poder político ou mudanças posteriores a 2017.', 'Instituto público com mandato legal para produzir estatísticas agropecuárias.'),
  'un-wpp': source('un-wpp', 'World Population Prospects 2024', 'United Nations DESA', 'https://population.un.org/wpp/', 2024, 'estimativa demográfica internacional', 'Harmonização de censos, registros e pesquisas; estimativas e projeções por coorte.', 'Países e territórios; séries históricas e projeções até 2100.', 'Estimativas são revisadas; qualidade e cobertura das fontes nacionais variam.', 'Divisão de População da ONU; produz estimativas comparáveis para uso internacional.'),
  'unsd-census': source('unsd-census', 'Principles and Recommendations for Population and Housing Censuses', 'United Nations Statistics Division', 'https://unstats.un.org/unsd/demographic-social/census/', 2025, 'padrão metodológico', 'Recomendações internacionais aprovadas pela Comissão de Estatística para planejar e avaliar censos.', 'Aplicação internacional; rodada censitária de 2030.', 'Recomendações precisam ser adaptadas aos sistemas legais, recursos e conceitos de cada país.', 'Órgão técnico da ONU que coordena padrões estatísticos internacionais.'),
  'world-bank-wdi': source('world-bank-wdi', 'World Development Indicators: Sources and Methods', 'World Bank', 'https://datatopics.worldbank.org/world-development-indicators/sources-and-methods.html', 2026, 'base de indicadores', 'Compilação e harmonização de fontes nacionais e internacionais, com metadados por indicador.', 'Economias e agregados mundiais; séries com cobertura variável.', 'Definições, cobertura e qualidade diferem; comparabilidade plena não é garantida.', 'Instituição financeira multilateral; seleção e agregação de indicadores refletem convenções institucionais.'),
  'wto-stats': source('wto-stats', 'Trade Profiles and Statistics', 'World Trade Organization', 'https://www.wto.org/english/res_e/statis_e/trade_profiles_list_e.htm', 2026, 'estatística de comércio', 'Compilação de comércio de bens e serviços segundo notas técnicas e dados de membros e organismos parceiros.', 'Membros da OMC; anos variam por indicador.', 'Reexportações, valoração, defasagem e diferenças nacionais afetam comparações.', 'Organização intergovernamental que administra acordos comerciais; dados não avaliam sozinhos efeitos distributivos.'),
  'imf-weo': source('imf-weo', 'World Economic Outlook Database: Assumptions and Data Conventions', 'International Monetary Fund', 'https://www.imf.org/en/Publications/WEO/weo-database/assumptions-and-data-conventions', 2026, 'estimativa macroeconômica', 'Séries nacionais harmonizadas e projeções elaboradas por equipes do FMI.', 'Economias membros e agregados; histórico e projeções semestrais.', 'Inclui estimativas e projeções; pode divergir de fontes nacionais e sofrer revisões.', 'Instituição financeira multilateral; análises seguem seu mandato macroeconômico.'),
  'unctad-stat': source('unctad-stat', 'UNCTADstat Data Centre', 'UN Trade and Development', 'https://unctadstat.unctad.org/', 2026, 'base de comércio e desenvolvimento', 'Compilação de comércio, investimento, economia marítima e desenvolvimento com metadados temáticos.', 'Países e agregados; séries e cobertura variam.', 'Agregados dependem das fontes nacionais e das classificações escolhidas.', 'Organismo intergovernamental da ONU voltado a comércio e desenvolvimento.'),
  'ipcc-ar6': source('ipcc-ar6', 'AR6 Synthesis Report', 'Intergovernmental Panel on Climate Change', 'https://www.ipcc.ch/report/ar6/syr/', 2023, 'avaliação científica', 'Síntese revisada de literatura científica, com linguagem calibrada de confiança e probabilidade.', 'Sistema climático global, impactos e respostas; literatura disponível até os cortes do AR6.', 'Não produz observações originais; resultados dependem dos estudos avaliados e de cenários.', 'Painel intergovernamental científico; governos aprovam o resumo, sem reescrever os capítulos técnicos.'),
  'inpe-terrabrasilis': source('inpe-terrabrasilis', 'TerraBrasilis: PRODES e DETER', 'INPE', 'https://terrabrasilis.dpi.inpe.br/', 2026, 'monitoramento por sensoriamento remoto', 'Classificação e interpretação de imagens orbitais conforme metodologias PRODES e DETER.', 'Amazônia Legal e outros biomas conforme produto; períodos próprios.', 'Resolução, cobertura de nuvens e definição de corte raso limitam a leitura; DETER é alerta, não taxa anual.', 'Instituto público brasileiro de pesquisa espacial.'),
  'fao-methods': source('fao-methods', 'Methods and Standards for Food and Agriculture Statistics', 'FAO', 'https://www.fao.org/statistics/methods-and-standards/agriculture/en', 2026, 'padrão estatístico', 'Conceitos, classificações e orientações para censos, pesquisas e estimativas agroalimentares.', 'Aplicação internacional; agricultura, alimentos e uso da terra.', 'Qualidade e periodicidade dependem dos sistemas estatísticos nacionais.', 'Agência especializada da ONU para alimentação e agricultura.'),
  'who-gho': source('who-gho', 'Global Health Observatory', 'World Health Organization', 'https://www.who.int/data/gho/info/about-the-observatory', 2026, 'base de saúde pública', 'Compilação e modelagem de dados nacionais para indicadores comparáveis.', 'Países e territórios; cobertura temporal varia por indicador.', 'Estimativas podem diferir das cifras nacionais e são revisadas quando surgem novos dados.', 'Agência especializada da ONU para saúde; métodos seguem mandatos de vigilância e comparabilidade.'),
  'unhcr-methods': source('unhcr-methods', 'Refugee Data Finder: Methodology', 'UNHCR', 'https://www.unhcr.org/refugee-statistics/methodology/', 2026, 'estatística humanitária', 'Registros administrativos, dados governamentais, estimativas e pesquisas, documentados por população.', 'Deslocamento forçado internacional e interno; cobertura por país e ano.', 'Registros incompletos, mudanças de definição e crises em curso geram revisões e subcontagem.', 'Agência da ONU com mandato de proteção de refugiados; categorias seguem definições jurídicas e operacionais.'),
  'iom-wmr': source('iom-wmr', 'World Migration Report 2024', 'International Organization for Migration', 'https://worldmigrationreport.iom.int/wmr-2024-interactive/', 2024, 'relatório de síntese', 'Síntese de bases internacionais e literatura, distinguindo estoques, fluxos e deslocamentos.', 'Migração internacional e interna em escala mundial.', 'Dados migratórios têm lacunas, definições nacionais diferentes e defasagem.', 'Organização intergovernamental da ONU voltada à migração.'),
  'iea-data': source('iea-data', 'Data and Statistics', 'International Energy Agency', 'https://www.iea.org/data-and-statistics', 2026, 'estatística energética', 'Balanços energéticos nacionais harmonizados e séries por fonte, setor e fluxo.', 'Países e agregados; cobertura depende da série e da participação institucional.', 'Revisões, conversões energéticas e diferenças de cobertura afetam comparações.', 'Organização intergovernamental ligada à OCDE; análise reflete mandato de segurança e transição energética.'),
  'epe-ben': source('epe-ben', 'Balanço Energético Nacional', 'Empresa de Pesquisa Energética', 'https://www.epe.gov.br/pt/publicacoes-dados-abertos/publicacoes/balanco-energetico-nacional-ben', 2025, 'balanço energético oficial', 'Contabilidade anual da oferta, transformação e consumo de energia por fonte e setor.', 'Brasil; ano-base anterior à edição.', 'Conversões, autoprodução e revisões metodológicas precisam ser consideradas em séries longas.', 'Empresa pública vinculada ao Ministério de Minas e Energia.'),
  'undrr-gar': source('undrr-gar', 'Global Assessment Report on Disaster Risk Reduction', 'UNDRR', 'https://www.undrr.org/gar', 2025, 'avaliação de risco', 'Síntese de evidências sobre perigo, exposição, vulnerabilidade e capacidade de resposta.', 'Global e estudos de caso; períodos variáveis.', 'Perdas e exposição são subnotificadas e modelos incorporam incertezas.', 'Escritório da ONU para redução de risco de desastres.'),
  'cemaden': source('cemaden', 'Monitoramento e Alertas de Desastres Naturais', 'CEMADEN', 'https://www.gov.br/cemaden/pt-br', 2026, 'monitoramento operacional', 'Integração de dados meteorológicos, hidrológicos, geotécnicos e de exposição para alertas.', 'Municípios monitorados no Brasil; atualização operacional.', 'Alerta expressa probabilidade e não garante ocorrência; cobertura instrumental é desigual.', 'Unidade de pesquisa pública federal responsável por monitoramento e alertas.'),
  'unclos': source('unclos', 'United Nations Convention on the Law of the Sea', 'United Nations', 'https://www.un.org/depts/los/convention_agreements/texts/unclos/unclos_e.pdf', 1982, 'tratado internacional', 'Texto jurídico que define zonas marítimas, direitos e deveres dos Estados.', 'Oceanos e Estados-partes; vigência conforme ratificação e direito internacional aplicável.', 'Disputas dependem de fatos, jurisprudência e acordos; o texto não resolve toda delimitação.', 'Tratado multilateral depositado na ONU.'),
  'un-charter': source('un-charter', 'Charter of the United Nations', 'United Nations', 'https://www.un.org/en/about-us/un-charter/full-text', 1945, 'tratado internacional', 'Texto constitutivo que estabelece princípios, órgãos e competências da ONU.', 'Relações internacionais entre Estados-membros.', 'Prática estatal, resoluções e jurisprudência condicionam a aplicação; não mede poder material.', 'Documento fundador de organização intergovernamental.'),
  'sipri-data': source('sipri-data', 'SIPRI Databases', 'Stockholm International Peace Research Institute', 'https://www.sipri.org/databases', 2026, 'base de pesquisa', 'Compilação documentada de gastos militares, transferências de armas e conflitos a partir de fontes abertas.', 'Países e conflitos; cobertura varia por base e período.', 'Sigilo, conversões cambiais e estimativas limitam precisão e comparabilidade.', 'Instituto independente de pesquisa financiado por fontes públicas e filantrópicas.'),
  'un-habitat-wcr': source('un-habitat-wcr', 'World Cities Report', 'UN-Habitat', 'https://unhabitat.org/wcr/', 2024, 'relatório urbano', 'Síntese de dados urbanos, estudos de caso e literatura internacional.', 'Cidades e sistemas urbanos globais; recortes variáveis.', 'Definições de urbano e limites metropolitanos diferem entre países.', 'Programa da ONU para assentamentos humanos.'),
  'ilo-ilostat': source('ilo-ilostat', 'ILOSTAT: Sources and Methods', 'International Labour Organization', 'https://rshiny.ilo.org/dataexplorer34/?lang=en', 2026, 'base de trabalho', 'Harmonização de censos, pesquisas domiciliares e registros administrativos com metadados por indicador.', 'Mercados de trabalho nacionais e agregados; cobertura variável.', 'Informalidade, conceitos de emprego e desenho amostral afetam comparações.', 'Agência tripartite da ONU com representação de governos, empregadores e trabalhadores.'),
  'world-bank-wgi': source('world-bank-wgi', 'Worldwide Governance Indicators: Documentation', 'World Bank', 'https://www.worldbank.org/en/publication/worldwide-governance-indicators/documentation', 2025, 'indicador composto', 'Agregação de fontes de percepção e experiência por modelo estatístico de componentes não observados.', 'Mais de 200 economias; série anual.', 'Margens de erro são substanciais; percepções não equivalem diretamente a desempenho institucional.', 'Instituição financeira multilateral; a escolha de dimensões é normativa e metodológica.'),
  'vdem-method': source('vdem-method', 'V-Dem Methodology', 'V-Dem Institute', 'https://www.v-dem.net/about/v-dem-project/methodology/', 2026, 'base acadêmica', 'Codificação por especialistas, agregação bayesiana e divulgação de incerteza.', 'Países e territórios; série histórica ampla.', 'Julgamentos de especialistas e cobertura desigual introduzem incerteza; índices dependem da conceituação.', 'Consórcio acadêmico internacional sediado na Universidade de Gotemburgo.'),
  'natural-earth': source('natural-earth', 'Natural Earth Data', 'Natural Earth', 'https://www.naturalearthdata.com/about/terms-of-use/', 2026, 'base cartográfica pública', 'Generalização cartográfica colaborativa em escalas pequenas, com dados físicos e culturais.', 'Mundo; escalas 1:10m, 1:50m e 1:110m.', 'Generalização e disputas de fronteira tornam a base inadequada para cadastro ou delimitação legal.', 'Projeto cartográfico público mantido por colaboradores; dados em domínio público.'),
  'harley-maps': source('harley-maps', 'Deconstructing the Map', 'Cartographica / University of Toronto Press', 'https://doi.org/10.3138/E635-7827-1757-9T53', 1989, 'artigo acadêmico', 'Ensaio historiográfico que aplica análise textual e crítica à cartografia.', 'História e teoria da cartografia ocidental.', 'É uma interpretação teórica influente, não demonstra que todo mapa tenha a mesma função política.', 'Periódico acadêmico revisado por pares; o argumento pertence à cartografia crítica.'),
  'krugman-geography': source('krugman-geography', 'Increasing Returns and Economic Geography', 'Journal of Political Economy', 'https://doi.org/10.1086/261763', 1991, 'artigo acadêmico', 'Modelo formal de localização com rendimentos crescentes, custos de transporte e mobilidade.', 'Economia espacial teórica com ilustrações estilizadas.', 'Resultados dependem de hipóteses simplificadoras e não explicam sozinhos trajetórias históricas.', 'Artigo revisado por pares ligado à Nova Geografia Econômica.'),
  'mackinder-pivot': source('mackinder-pivot', 'The Geographical Pivot of History', 'The Geographical Journal', 'https://doi.org/10.2307/1775498', 1904, 'artigo acadêmico histórico', 'Argumento estratégico baseado na geografia política e tecnológica do início do século XX.', 'Eurásia e equilíbrio imperial no contexto de 1904.', 'É uma interpretação datada; tecnologia, Estados e economia mudaram profundamente.', 'Texto clássico da tradição geopolítica britânica, não uma lei territorial.'),
  'creswell-design': source('creswell-design', 'Research Design', 'SAGE Publications', 'https://us.sagepub.com/en-us/nam/research-design/book270550', 2023, 'manual acadêmico', 'Comparação de abordagens qualitativas, quantitativas e de métodos mistos.', 'Pesquisa social; aplicações dependem do campo e do desenho.', 'Manual geral; não substitui protocolos específicos, ética ou conhecimento local.', 'Editora acadêmica; autores apresentam uma taxonomia metodológica entre várias possíveis.'),
  'sauer-landscape': source('sauer-landscape', 'The Morphology of Landscape', 'University of California Publications in Geography', 'https://archive.org/details/morphologyofland00saue', 1925, 'ensaio acadêmico histórico', 'Formulação histórico-cultural da paisagem a partir de formas, processos e área.', 'Teoria geográfica do início do século XX.', 'Vocabulário e pressupostos refletem seu período; tradições posteriores revisaram natureza e cultura.', 'Texto clássico da geografia cultural norte-americana.'),
  'un-habitat-rights': source('un-habitat-rights', 'World Cities Report 2022: Envisaging the Future of Cities', 'UN-Habitat', 'https://unhabitat.org/wcr/', 2022, 'relatório urbano', 'Síntese comparativa de tendências urbanas e políticas com estudos de caso.', 'Cidades globais; dados disponíveis até a preparação do relatório.', 'Definições urbanas e evidência causal variam; propostas de política não são consenso automático.', 'Programa intergovernamental da ONU para assentamentos humanos.'),
};

const groups = {
  foundations: ['ibge-atlas', 'natural-earth'],
  brazil: ['ibge-censo', 'ibge-atlas'],
  population: ['un-wpp', 'unsd-census'],
  economy: ['wto-stats', 'world-bank-wdi', 'unctad-stat'],
  macroeconomy: ['imf-weo', 'world-bank-wdi'],
  climate: ['ipcc-ar6', 'inpe-terrabrasilis'],
  agriculture: ['ibge-agro', 'fao-methods'],
  health: ['who-gho', 'ibge-censo'],
  migration: ['unhcr-methods', 'iom-wmr'],
  energy: ['epe-ben', 'iea-data'],
  risk: ['undrr-gar', 'cemaden'],
  oceans: ['unclos', 'unctad-stat'],
  geopolitics: ['un-charter', 'sipri-data'],
  urban: ['un-habitat-wcr', 'ibge-censo'],
  labour: ['ilo-ilostat', 'world-bank-wdi'],
  institutions: ['world-bank-wgi', 'vdem-method'],
};

const MODULE_GROUPS = {
  'efi-place': 'foundations', 'efi-landscape': 'foundations', 'efi-society': 'labour', 'efi-brazil': 'brazil',
  'efii-concepts': 'foundations', cartography: 'foundations', 'efii-physical': 'climate', brazil: 'brazil',
  'efii-americas': 'population', 'efii-africa': 'economy', 'efii-europe': 'geopolitics', 'efii-asia': 'economy',
  geopolitics: 'geopolitics', population: 'population', landscape: 'climate', urbanization: 'urban',
  globalization: 'economy', economy: 'economy', 'em-environment': 'climate', 'em-geopolitics': 'geopolitics',
  'em-urban-regional': 'urban', 'em-cartography': 'foundations', 'em-brazil-challenges': 'brazil',
  'em-climatology': 'climate', 'em-health-geo': 'health', 'em-natural-resources': 'climate',
  'em-asia-pacific': 'geopolitics', 'em-africa': 'economy', 'em-latin-america': 'macroeconomy',
  'em-migration': 'migration', 'em-energy': 'energy', 'em-transport': 'economy', 'em-demography': 'population',
  'em-agriculture-land': 'agriculture', 'em-oceans': 'oceans', 'em-risks-resilience': 'risk',
  'es-institutions-development': 'institutions', 'es-quantitative-geography': 'foundations',
  'es-epistemology': 'foundations', 'es-space-theory': 'foundations', 'es-geopolitics-classic': 'geopolitics',
  'es-cartography-critic': 'foundations', 'es-economic-geography': 'economy', 'es-methodology': 'foundations',
  'es-urban-geography': 'urban', 'es-physical-geography': 'climate', 'es-postcolonial-feminist': 'institutions',
};

const MODULE_EXTRAS = {
  'es-cartography-critic': ['harley-maps'],
  'es-economic-geography': ['krugman-geography'],
  'es-geopolitics-classic': ['mackinder-pivot'],
  'es-methodology': ['creswell-design'],
  'es-epistemology': ['sauer-landscape'],
  'es-space-theory': ['sauer-landscape'],
  'es-urban-geography': ['un-habitat-rights'],
};

/** Returns independent sources suited to a module without mutating the catalog. */
export function sourcesFor(moduleId) {
  const ids = [...(MODULE_EXTRAS[moduleId] || []), ...groups[MODULE_GROUPS[moduleId] || 'foundations']];
  return ids.map(id => structuredClone(SOURCES[id]));
}

export const DEBATE_MODULES = new Set([
  'economy', 'globalization', 'geopolitics', 'efii-africa', 'efii-americas', 'efii-asia', 'efii-europe',
  'em-geopolitics', 'em-brazil-challenges', 'em-natural-resources',
  'em-asia-pacific', 'em-africa', 'em-latin-america', 'em-migration', 'em-energy', 'em-agriculture-land',
  'es-institutions-development', 'es-epistemology', 'es-space-theory', 'es-geopolitics-classic',
  'es-cartography-critic', 'es-economic-geography', 'es-methodology', 'es-urban-geography',
  'es-postcolonial-feminist', 'es-physical-geography',
]);

/** Neutral comparison template; the document title supplies the concrete object. */
export function perspectivesFor(moduleId, title) {
  if (!DEBATE_MODULES.has(moduleId)) return [];
  return [
    {
      name: 'Abordagem institucional e empírica',
      thesis: `Explica “${title}” por regras, incentivos, capacidades estatais e resultados observáveis.`,
      evidence: 'Indicadores documentados, comparação histórica e avaliação de políticas.',
      criticism: 'Indicadores podem incorporar escolhas normativas e reduzir processos históricos complexos.',
      limitations: 'Associação estatística não demonstra causalidade sem desenho de pesquisa adequado.',
      alternatives: 'Abordagens históricas, culturais, críticas e geopolíticas.',
    },
    {
      name: 'Abordagem histórica e crítica',
      thesis: `Interpreta “${title}” a partir de trajetória, distribuição de poder e conflitos de interesse.`,
      evidence: 'Arquivos, estudos de caso, mudanças institucionais e efeitos distributivos.',
      criticism: 'Pode generalizar casos, subestimar variação local ou atribuir causalidade ampla demais.',
      limitations: 'Interpretações dependem do recorte temporal, da escala e da seleção de casos.',
      alternatives: 'Modelos quantitativos, análise institucional e explicações culturais.',
    },
  ];
}
