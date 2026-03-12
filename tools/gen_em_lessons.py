#!/usr/bin/env python3
"""Gera as 13 lições restantes dos 3 novos módulos EM."""
import json, os

OUT = os.path.join(os.path.dirname(__file__), '..', 'data', 'lessons')

LESSONS = [

# ── em-climatology-3 ────────────────────────────────────────────────
{
  "id": "em-climatology-3",
  "moduleId": "em-climatology",
  "title": "Mudanças climáticas: causas e evidências",
  "summary": "O aquecimento global antropogênico: mecanismos, dados e projeções.",
  "activityType": "single-choice",
  "phenomenon": {
    "title": "1,1°C em 150 anos",
    "text": "A temperatura média global aumentou 1,1°C desde o período pré-industrial (1850–1900). Parece pouco. Mas esse valor é a média de todo o planeta: os polos aqueceram até 4°C; os oceanos absorveram 90% do calor excedente. A consequência não é um planeta levemente mais quente — é um sistema climático em desequilíbrio, com eventos extremos mais intensos e frequentes."
  },
  "guided": {
    "title": "O efeito estufa: natural e amplificado",
    "text": "O efeito estufa é um fenômeno natural e essencial: sem ele, a temperatura média da Terra seria −18°C. O problema é sua amplificação antropogênica. A queima de combustíveis fósseis, o desmatamento e a pecuária intensiva elevam a concentração de CO₂, metano e óxido nitroso na atmosfera, intensificando a retenção de calor.",
    "points": [
      "CO₂: principal gás de efeito estufa. Concentração passou de 280 ppm (pré-industrial) para 422 ppm (2024).",
      "Metano (CH₄): 80× mais potente que CO₂ no curto prazo. Fontes: pecuária, arrozais, aterros, vazamentos de gás.",
      "Retroalimentações positivas: derretimento do permafrost libera mais metano; degelo do Ártico reduz o albedo.",
      "O IPCC (Painel Intergovernamental sobre Mudanças Climáticas) reúne e sintetiza o consenso científico global."
    ]
  },
  "relations": {
    "title": "Impactos no Brasil",
    "text": "As projeções para o Brasil incluem aridização do semiárido nordestino (−20% de precipitação até 2050), intensificação das chuvas no Sudeste e Sul, branqueamento de corais na costa nordestina e deslocamento dos biomas. O Brasil é simultaneamente vítima das mudanças climáticas e responsável por cerca de 3% das emissões globais — em grande parte pelo desmatamento."
  },
  "caseStudy": {
    "title": "O Acordo de Paris e as metas brasileiras",
    "text": "O Acordo de Paris (2015) estabeleceu o objetivo de limitar o aquecimento a 1,5°C acima dos níveis pré-industriais. O Brasil comprometeu-se a reduzir emissões em 50% até 2030 e alcançar neutralidade climática até 2050. O desafio central é o desmatamento: cerca de 50% das emissões brasileiras vêm do desmatamento e uso do solo — o que torna as políticas de proteção florestal centrais para a meta climática do país."
  },
  "application": "Calcule sua pegada de carbono usando uma calculadora online (Akatu ou WWF Brasil). Identifique os 3 fatores que mais contribuem. O que seria necessário mudar para reduzi-los?",
  "activity": {
    "question": "Qual é a principal fonte das emissões brasileiras de gases de efeito estufa?",
    "type": "single-choice",
    "correct": "desmatamento",
    "options": [
      { "value": "transporte",    "label": "Transporte e mobilidade urbana" },
      { "value": "industria",     "label": "Indústria e geração de energia" },
      { "value": "desmatamento",  "label": "Desmatamento e uso do solo" },
      { "value": "agropecuaria",  "label": "Agropecuária intensiva (pecuária e grãos)" }
    ],
    "feedback": {
      "correct": "Correto. Diferentemente dos países industrializados, o Brasil emite mais pela perda de cobertura florestal do que pela queima de combustíveis fósseis. Isso torna a política ambiental o eixo central da agenda climática brasileira.",
      "incorrect": "O Brasil possui uma matriz elétrica predominantemente renovável. A maior fonte de emissões está no que acontece com as florestas, não com as usinas."
    },
    "hints": [
      { "type": "text", "content": "O Brasil tem uma das matrizes energéticas mais limpas do mundo. A maior ameaça climática vem da perda de cobertura vegetal." }
    ]
  },
  "teacher": {
    "objective": "O aluno compreende os mecanismos do aquecimento global e analisa as especificidades do Brasil no contexto da crise climática.",
    "observe": "Atente para possíveis ideias negacionistas. Reforce que o consenso científico é sólido e baseado em múltiplas linhas de evidência independentes.",
    "answer": "Desmatamento e uso do solo. Aproximadamente 50% das emissões brasileiras vêm do desflorestamento, principalmente na Amazônia e no Cerrado.",
    "mediation": "Proponha: 'Se o Brasil tem uma das matrizes energéticas mais limpas do mundo, como ainda tem responsabilidade climática relevante?'",
    "time": "50 minutos"
  }
},

# ── em-climatology-4 ────────────────────────────────────────────────
{
  "id": "em-climatology-4",
  "moduleId": "em-climatology",
  "title": "Eventos climáticos extremos e vulnerabilidade social",
  "summary": "Secas, enchentes e ondas de calor: como o clima afeta populações de forma desigual.",
  "activityType": "single-choice",
  "phenomenon": {
    "title": "Catástrofe ou construção social?",
    "text": "Em fevereiro de 2022, Petrópolis (RJ) registrou 258 mm de chuva em seis horas — o equivalente a um mês de precipitação. Resultado: 232 mortos. Em 2024, as enchentes no Rio Grande do Sul afetaram 2 milhões de pessoas e mataram mais de 150. Esses eventos são fenômenos naturais amplificados pelas mudanças climáticas — mas quem morre não é escolhido pelo clima: é escolhido pela desigualdade."
  },
  "guided": {
    "title": "Eventos extremos e risco climático",
    "text": "Eventos climáticos extremos são fenômenos que ocorrem fora da variabilidade histórica normal — intensidade ou frequência incomuns. As mudanças climáticas não criam novos tipos de fenômenos, mas tornam os existentes mais intensos e mais frequentes.",
    "points": [
      "Secas: déficit hídrico prolongado. Amazônia (2010, 2023), Norte de Minas (2012–2016).",
      "Enchentes e deslizamentos: precipitação extrema sobre encostas e várzeas ocupadas.",
      "Ondas de calor: temperaturas muito acima da média por dias consecutivos; risco à saúde de idosos e trabalhadores externos.",
      "Ciclones extratropicais: raros no Brasil (Catarina, 2004), tendem a aumentar com o aquecimento do Atlântico Sul."
    ]
  },
  "relations": {
    "title": "Vulnerabilidade social como fator de risco",
    "text": "O impacto de um evento extremo não depende apenas de sua intensidade, mas da vulnerabilidade social da população afetada. Os mortos de Petrópolis viviam em encostas irregulares porque não tinham acesso à moradia formal. Os mais afetados pelas enchentes gaúchas eram trabalhadores rurais sem seguro e moradores de várzeas historicamente ocupadas pela ausência de alternativas. A desigualdade não apenas precede os desastres — ela os fabrica."
  },
  "caseStudy": {
    "title": "A seca de 2010–2016 no Norte de Minas",
    "text": "Por seis anos consecutivos, o semiárido mineiro sofreu a pior seca em décadas: açudes secaram, culturas falharam, o êxodo rural se intensificou. A crise revelou uma assimetria importante: onde havia cisternas comunitárias (tecnologia social simples), os impactos foram menores. Onde havia apenas açudes municipais (que secaram), populações ficaram sem água. O evento demonstrou que adaptar-se ao semiárido é possível — mas exige políticas de longo prazo, não apenas socorro em emergências."
  },
  "application": "Pesquise um evento climático extremo que afetou seu estado nos últimos 5 anos. Identifique: qual fenômeno foi? Quem foram os mais afetados? Quais condições de vulnerabilidade preexistentes explicam os impactos?",
  "activity": {
    "question": "A maior parte das vítimas de desastres climáticos no Brasil habita:",
    "type": "single-choice",
    "correct": "areas-risco",
    "options": [
      { "value": "areas-risco",  "label": "Encostas e várzeas ocupadas pela ausência de alternativas habitacionais" },
      { "value": "rural-isolado","label": "Zonas rurais isoladas sem acesso a alertas meteorológicos" },
      { "value": "litoral-rico", "label": "Zonas costeiras de alto valor imobiliário" },
      { "value": "industria",    "label": "Entornos de distritos industriais sem infraestrutura de drenagem" }
    ],
    "feedback": {
      "correct": "Correto. Os desastres climáticos brasileiros afetam desproporcionalmente populações em vulnerabilidade habitacional — em áreas de risco porque eram os únicos espaços acessíveis. Isso demonstra que o risco climático é também um problema de desigualdade estrutural.",
      "incorrect": "Os impactos climáticos são socialmente seletivos. Pense em quem vive nas áreas mais expostas e por que não está em outro lugar."
    },
    "hints": [
      { "type": "text", "content": "Quem escolhe morar numa encosta instável? Em geral, não é escolha — é a única opção para quem não tem acesso ao mercado imobiliário formal." }
    ]
  },
  "teacher": {
    "objective": "O aluno articula vulnerabilidade social e risco climático, reconhecendo que desastres têm causas sociais além das físicas.",
    "observe": "Monitore a tendência de culpar vítimas ('quem mandou morar lá'). Redirecione para análise estrutural.",
    "answer": "Populações em situação de vulnerabilidade habitacional, sem acesso à moradia formal, que ocupam encostas e várzeas. A seletividade social dos desastres é a dimensão central.",
    "mediation": "Proponha: 'O que precisaria mudar — na política habitacional, no planejamento urbano ou no clima — para reduzir as mortes em desastres?'",
    "time": "50 minutos"
  }
},

# ── em-climatology-5 ────────────────────────────────────────────────
{
  "id": "em-climatology-5",
  "moduleId": "em-climatology",
  "title": "El Niño, La Niña e teleconexões climáticas",
  "summary": "Oscilações climáticas globais e seus impactos regionais no Brasil.",
  "activityType": "single-choice",
  "phenomenon": {
    "title": "Um oceano que governa chuvas a 10.000 km",
    "text": "Em 1983 e 1997, o sertão nordestino sofreu secas devastadoras enquanto o Sul do Brasil era inundado. O mecanismo não estava no continente — estava no Oceano Pacífico. O aquecimento anômalo das águas do Pacífico equatorial, o El Niño, reorganiza a circulação atmosférica global e reescreve o regime de chuvas em múltiplos continentes simultaneamente."
  },
  "guided": {
    "title": "ENOS: El Niño–Oscilação Sul",
    "text": "O ENOS (El Niño–Oscilação Sul) é a principal fonte de variabilidade climática interanual do planeta. É um acoplamento oceano-atmosfera no Pacífico equatorial que oscila entre duas fases: El Niño (aquecimento) e La Niña (resfriamento), com ciclos de 2 a 7 anos.",
    "points": [
      "El Niño: águas quentes no Pacífico central e leste; enfraquecimento dos alísios; reorganização da circulação de Walker.",
      "La Niña: padrão oposto; resfriamento do Pacífico; intensificação dos alísios.",
      "Teleconexões: o ENOS afeta o clima de regiões distantes por meio de padrões de ondas atmosféricas (teleconexões).",
      "No Brasil: El Niño tende a secar o Nordeste e trazer mais chuvas ao Sul; La Niña tem efeito oposto."
    ]
  },
  "relations": {
    "title": "Impactos no Brasil por região",
    "text": "Os impactos do El Niño no Brasil não são uniformes. O Nordeste semiárido é o mais afetado negativamente: El Niño inibe a formação da Zona de Convergência Intertropical sobre a região, reduzindo drasticamente as chuvas. A Amazônia ocidental e o Norte sofrem secas. O Sul e Sudeste recebem mais chuvas — o que pode significar enchentes. A La Niña inverte o padrão: seca no Sul, chuvas acima do normal no Nordeste. Compreender o ENOS permite projeções climáticas sazonais que orientam política agrícola, gestão de reservatórios e planejamento de emergências."
  },
  "caseStudy": {
    "title": "El Niño 2023–2024: o mais intenso em décadas",
    "text": "O El Niño de 2023–2024 foi classificado como 'muito forte' — o mais intenso desde 1997–1998. No Brasil, seus efeitos foram regionalmente contraditórios: a Amazônia enfrentou a pior seca da história registrada (2023), com o Rio Negro atingindo nível mínimo histórico em outubro; o Nordeste teve chuvas abaixo da média na estação; o Sul registrou os eventos extremos de 2024 (enchentes do RS), que — embora influenciados pelo El Niño — foram amplificados pelas mudanças climáticas de longo prazo. O evento ilustrou que ENOS e aquecimento global interagem, com os extremos tornando-se progressivamente mais intensos."
  },
  "application": "Pesquise o estado atual do ENOS (El Niño ou La Niña?) no site do INMET ou NOAA. Qual é a previsão para os próximos meses? Como isso deve afetar o clima da sua região?",
  "activity": {
    "question": "Durante um evento de El Niño, o efeito mais típico sobre o Nordeste brasileiro é:",
    "type": "single-choice",
    "correct": "seca",
    "options": [
      { "value": "seca",    "label": "Secas mais intensas, com redução das chuvas na estação chuvosa" },
      { "value": "cheias",  "label": "Chuvas acima da média e risco de enchentes" },
      { "value": "frio",    "label": "Queda de temperatura com ondas de frio polar" },
      { "value": "neutro",  "label": "Sem impacto significativo; o Nordeste é imune ao ENOS" }
    ],
    "feedback": {
      "correct": "Correto. El Niño inibe a ZCIT sobre o Nordeste, reduzindo as chuvas da estação chuvosa (fevereiro–maio). Os efeitos são mais severos no sertão, onde a variabilidade interanual já é muito alta.",
      "incorrect": "Lembre-se: El Niño aquece o Pacífico equatorial e reorganiza a circulação atmosférica. No Nordeste, isso significa inibição das chuvas convectivas, não sua intensificação."
    },
    "hints": [
      { "type": "text", "content": "El Niño desloca a convecção atmosférica para o Pacífico central. O Atlântico equatorial — fonte de umidade para o Nordeste — fica em segundo plano." }
    ]
  },
  "teacher": {
    "objective": "O aluno compreende o mecanismo do ENOS e analisa seus impactos diferenciados sobre as regiões brasileiras.",
    "observe": "Verifique se o aluno distingue variabilidade climática interanual (ENOS) de tendência de longo prazo (aquecimento global). São fenômenos distintos que interagem.",
    "answer": "Secas mais intensas. El Niño inibe a formação da ZCIT, principal mecanismo de chuvas do semiárido nordestino.",
    "mediation": "Pergunte: 'Se o El Niño sempre existiu, por que os seus impactos parecem piores hoje do que há 50 anos?' (resposta: interação com o aquecimento de base).",
    "time": "50 minutos"
  }
},

# ── em-health-geo-1 ─────────────────────────────────────────────────
{
  "id": "em-health-geo-1",
  "moduleId": "em-health-geo",
  "title": "Epidemiologia espacial: onde a doença acontece",
  "summary": "Como a distribuição geográfica de doenças revela desigualdades e condicionantes socioambientais.",
  "activityType": "single-choice",
  "phenomenon": {
    "title": "O mapa que salvou vidas",
    "text": "Em 1854, uma epidemia de cólera matou 616 pessoas no bairro de Soho, em Londres. O médico John Snow mapeou cada caso sobre uma planta do bairro e identificou que todos convergiam para uma única bomba d'água na Broad Street. Ao remover a alça da bomba, a epidemia cessou. Snow não conhecia o vibrio cholerae — o mapa foi suficiente. Nasceu ali a epidemiologia espacial."
  },
  "guided": {
    "title": "Espaço como determinante de saúde",
    "text": "A epidemiologia espacial estuda como a distribuição geográfica de doenças, fatores de risco e serviços de saúde se relaciona com as características do espaço — físicas, sociais e históricas. A pergunta central não é apenas 'quem adoece', mas 'onde adoece, e por quê ali'.",
    "points": [
      "Vetores ambientais: dengue, malária e leishmaniose têm distribuição ligada a ecossistemas específicos (áreas úmidas, floresta, periurbano).",
      "Saneamento básico: mortalidade por doenças diarreicas é inversamente proporcional ao acesso a esgoto tratado.",
      "Violência e saúde: taxas de homicídio têm distribuição geográfica marcada — periferias urbanas, fronteiras, territórios de disputa.",
      "Acesso a serviços: desertos de saúde (áreas sem cobertura adequada) concentram-se em periferias e interior rural."
    ]
  },
  "relations": {
    "title": "Determinantes sociais da saúde",
    "text": "A Organização Mundial da Saúde define determinantes sociais da saúde como as condições em que as pessoas nascem, crescem, vivem, trabalham e envelhecem. Renda, escolaridade, moradia, saneamento, alimentação e violência determinam mais a saúde de uma população do que acesso a médicos e remédios. A geografia é o palco onde essas condições se materializam: bairros ricos têm mais verde, menos poluição, serviços de saúde próximos e comida saudável. Bairros pobres têm o oposto."
  },
  "caseStudy": {
    "title": "Desertos alimentares e obesidade no Brasil",
    "text": "No Brasil, 38 milhões de pessoas vivem em 'desertos alimentares' — áreas sem supermercados ou feiras a distância razoável, onde só há acesso a ultraprocessados em mercadinhos de bairro. A obesidade no país é paradoxalmente mais prevalente em regiões mais pobres: não porque pobres comem mais, mas porque comem pior — com mais açúcar, gordura trans e sódio, e menos frutas e vegetais. A distribuição espacial dos equipamentos alimentares é uma política de saúde pública disfarçada de zoneamento urbano."
  },
  "application": "Mapeie os serviços de saúde a até 2 km da sua casa ou escola: UBS, hospital, pronto-socorro, farmácia. Compare com um bairro de nível socioeconômico diferente. O que a diferença diz sobre equidade em saúde?",
  "activity": {
    "question": "A concentração de casos de dengue em bairros periurbanos com lotes abandonados e saneamento precário é exemplo de:",
    "type": "single-choice",
    "correct": "determinante",
    "options": [
      { "value": "acaso",       "label": "Distribuição aleatória — doenças infecciosas não têm padrão geográfico" },
      { "value": "determinante","label": "Determinante socioambiental — o espaço cria condições para proliferação do vetor" },
      { "value": "genetico",    "label": "Fator genético — populações periféricas têm maior susceptibilidade" },
      { "value": "cultural",    "label": "Fator cultural — hábitos de limpeza variam por classe social" }
    ],
    "feedback": {
      "correct": "Correto. Lotes abandonados acumulam água, saneamento precário não elimina criadouros, e a ausência do poder público reduz o controle vetorial. O espaço geográfico produz condições objetivas para a dengue — não é uma questão de comportamento individual.",
      "incorrect": "A dengue tem um vetor (Aedes aegypti) que precisa de condições ambientais específicas. A distribuição dessas condições no espaço urbano não é aleatória — é produto do planejamento (ou da falta dele)."
    },
    "hints": [
      { "type": "text", "content": "O mosquito precisa de água parada. Onde há mais água parada sem controle: em bairros com coleta de lixo e saneamento ou sem?" }
    ]
  },
  "teacher": {
    "objective": "O aluno compreende o conceito de determinante socioambiental da saúde e aplica a perspectiva espacial à análise de doenças.",
    "observe": "Monitore explicações que individualizem a responsabilidade pela doença ('descuido pessoal'). Redirecione para condições estruturais.",
    "answer": "Determinante socioambiental. A distribuição espacial da dengue segue a distribuição espacial da precariedade urbana — não é aleatória.",
    "mediation": "Proponha: 'Se a dengue fosse uma questão de cuidado individual, por que ela é tão mais prevalente em algumas regiões do que em outras?'",
    "time": "50 minutos"
  }
},

# ── em-health-geo-2 ─────────────────────────────────────────────────
{
  "id": "em-health-geo-2",
  "moduleId": "em-health-geo",
  "title": "Saneamento básico e saúde: a geografia da água",
  "summary": "Acesso à água potável e esgoto como determinante central de saúde pública.",
  "activityType": "single-choice",
  "phenomenon": {
    "title": "Cada R$ 1 em saneamento economiza R$ 4 em saúde",
    "text": "O Brasil tem 35 milhões de pessoas sem acesso à água tratada e 100 milhões sem coleta de esgoto — números da PNAD 2022. As doenças de veiculação hídrica (diarreia, hepatite A, leptospirose, cólera) matam principalmente crianças menores de 5 anos. A estimativa do Instituto Trata Brasil é que cada R$ 1 investido em saneamento básico economiza R$ 4 em gastos de saúde pública. É uma das políticas de saúde com melhor custo-benefício conhecida."
  },
  "guided": {
    "title": "O acesso desigual ao saneamento",
    "text": "No Brasil, o saneamento é desigualmente distribuído no espaço: capitais têm cobertura maior que municípios do interior; Sul e Sudeste têm cobertura maior que Norte e Nordeste; bairros ricos têm esgoto tratado, bairros pobres têm fossas sépticas ou nada.",
    "points": [
      "Água: 85% dos domicílios brasileiros têm acesso à rede de distribuição. Mas qualidade e continuidade variam muito.",
      "Esgoto: apenas 55% dos domicílios têm coleta de esgoto — dos coletados, nem todo é tratado.",
      "Norte: pior situação do país. Manaus, com 2 milhões de habitantes, lança esgoto bruto no Rio Negro.",
      "Marco do Saneamento (2020): estabeleceu meta de universalização até 2033. Progresso lento."
    ]
  },
  "relations": {
    "title": "Saneamento e desigualdade racial",
    "text": "No Brasil, a falta de saneamento não é apenas geográfica — é racializada. Domicílios chefiados por pessoas negras têm taxa de acesso ao saneamento 20 pontos percentuais menor do que os chefiados por pessoas brancas. Favelas e comunidades periféricas — com alta população negra — concentram os déficits. Isso não é coincidência: é produto de um processo histórico de urbanização que excluiu negros e pobres das cidades formais, relegando-os a territórios sem infraestrutura."
  },
  "caseStudy": {
    "title": "Leptospirose no pós-enchente: um ciclo previsível",
    "text": "Toda vez que o Brasil enfrenta enchentes — Teresópolis (2011), São Sebastião (2023), Rio Grande do Sul (2024) — os casos de leptospirose explodem semanas depois. A doença é transmitida pela urina de ratos contaminados que contamina água de enchente. Basta contato com a pele. As vítimas são invariavelmente trabalhadores que limpam casas e ruas sem equipamento de proteção. A leptospirose é uma doença de desastre e de pobreza: quem pode, evacua e não volta antes da limpeza profissional."
  },
  "application": "Acesse o site do Sistema Nacional de Informações sobre Saneamento (SNIS) e compare os índices de cobertura de água e esgoto do seu município com a média nacional e com o município vizinho mais próximo.",
  "activity": {
    "question": "A disparidade de acesso ao saneamento básico entre Norte/Nordeste e Sul/Sudeste do Brasil é explicada principalmente por:",
    "type": "single-choice",
    "correct": "historico",
    "options": [
      { "value": "natural",   "label": "Condições naturais — o clima tropical dificulta a implantação de redes" },
      { "value": "historico", "label": "Processo histórico de urbanização e investimento público desigual" },
      { "value": "cultural",  "label": "Diferenças culturais em valorização da higiene por região" },
      { "value": "tamanho",   "label": "O Norte e Nordeste têm municípios menores, inviabilizando redes coletivas" }
    ],
    "feedback": {
      "correct": "Correto. A distribuição do saneamento segue o padrão histórico de investimento público: regiões que concentraram capital industrial (Sul/Sudeste) receberam mais infraestrutura. Não é resultado de clima ou cultura, mas de escolhas políticas acumuladas.",
      "incorrect": "O clima tropical não impede redes de saneamento — Singapura e várias cidades tropicais têm saneamento universal. A explicação está na história das políticas de investimento."
    },
    "hints": [
      { "type": "text", "content": "Cidades tropicais com recursos (Cingapura, partes do Japão) têm saneamento exemplar. O problema não é o clima — é a história dos investimentos públicos." }
    ]
  },
  "teacher": {
    "objective": "O aluno articula a desigualdade de acesso ao saneamento com o processo histórico de urbanização e com os impactos sobre a saúde.",
    "observe": "Verifique se o aluno não naturaliza a precariedade do Norte/Nordeste. Redirecione para análise histórica das políticas de investimento.",
    "answer": "Processo histórico de urbanização e investimento público desigual. O Sul/Sudeste concentrou a industrialização e recebeu mais infraestrutura ao longo do século XX.",
    "mediation": "Proponha: 'Se o governo federal decidisse universalizar o saneamento até 2033, onde deveria concentrar os recursos? Que impactos na saúde seriam esperados?'",
    "time": "50 minutos"
  }
},

# ── em-health-geo-3 ─────────────────────────────────────────────────
{
  "id": "em-health-geo-3",
  "moduleId": "em-health-geo",
  "title": "Doenças tropicais negligenciadas e territórios vulneráveis",
  "summary": "Malária, dengue, leishmaniose: a geografia das doenças invisíveis.",
  "activityType": "single-choice",
  "phenomenon": {
    "title": "Doenças que só existem onde a pobreza existe",
    "text": "A leishmaniose visceral mata mais de 20.000 pessoas por ano no mundo. A malária infecta 240 milhões. A dengue afeta 400 milhões. Nenhuma dessas doenças tem vacina amplamente disponível, nenhuma tem cura barata e fácil, e nenhuma afeta os países ricos o suficiente para justificar bilhões em pesquisa. Elas são chamadas 'negligenciadas' não por serem raras — mas por afetarem populações sem poder de compra."
  },
  "guided": {
    "title": "Doenças tropicais negligenciadas (DTNs)",
    "text": "A OMS reconhece 20 doenças tropicais negligenciadas — afecções parasitárias, bacterianas e virais que afetam principalmente populações pobres em regiões tropicais. No Brasil, as mais relevantes são: dengue (e seus primos chikungunya e zika), malária (concentrada na Amazônia), leishmaniose (periurbano e rural nordestino), doença de Chagas (domicílios com barbeiro no semiárido) e esquistossomose (zona da mata nordestina e vales de rios).",
    "points": [
      "Dengue: urbana, periurbana. Expansão vinculada ao crescimento irregular, lotes abandonados, saneamento precário.",
      "Malária: concentrada na Amazônia Legal. Expansão do garimpo é fator de aumento recente.",
      "Leishmaniose: vetor (mosquito palha) em matas e periurbano. Avança com o desmatamento.",
      "Chagas: domicílios de adobe sem reboco no semiárido. Em declínio com melhoria habitacional."
    ]
  },
  "relations": {
    "title": "Expansão do garimpo e malária",
    "text": "Entre 2019 e 2022, os casos de malária em Yanomami (RR) explodiram. O mecanismo é direto: o garimpo ilegal cria piscinas de água parada (buracos de extração), ambiente ideal para o Anopheles, vetor da malária. Garimpeiros doentes transmitem ao contato com comunidades indígenas sem imunidade adquirida. A operação de retirada dos garimpeiros em 2023 foi simultânea à crise humanitária de desnutrição e malária nas aldeias. O caso demonstra como decisões econômicas e políticas (tolerância ao garimpo ilegal) têm consequências epidemiológicas mensuráveis."
  },
  "caseStudy": {
    "title": "Esquistossomose na zona da mata nordestina",
    "text": "A esquistossomose (xistose) é causada por um parasita que parte de seu ciclo de vida em caramujos de água doce. Afeta cerca de 1,5 milhão de brasileiros, concentrados na zona da mata de PE, AL, SE e BA — região de cana-de-açúcar, onde trabalhadores rurais entram em contato com rios e riachos contaminados. A doença causa dano hepático progressivo. É prevenível com saneamento básico e educação em saúde. Sua persistência nessa região específica é inseparável da história de exploração agrária do Nordeste — monocultura, precariedade habitacional, ausência de infraestrutura."
  },
  "application": "Pesquise o mapa de distribuição de dengue no Brasil no DataSUS ou no InfoDengue. Identifique os municípios com maior incidência. O que eles têm em comum em termos de tamanho, localização e condições urbanas?",
  "activity": {
    "question": "A expansão recente dos casos de malária em territórios indígenas de Roraima está associada principalmente a:",
    "type": "single-choice",
    "correct": "garimpo",
    "options": [
      { "value": "clima",   "label": "Mudanças climáticas que aqueceram a região e favoreceram o vetor" },
      { "value": "garimpo", "label": "Expansão do garimpo ilegal, que cria criadouros e introduz o parasita" },
      { "value": "imune",   "label": "Queda da imunidade natural das populações indígenas com o envelhecimento" },
      { "value": "desmate", "label": "Desmatamento que destruiu habitat do vetor, forçando-o às aldeias" }
    ],
    "feedback": {
      "correct": "Correto. O garimpo ilegal cria buracos de extração que acumulam água parada — criadouros perfeitos para o Anopheles. Além disso, garimpeiros doentes transmitem a malária ao contato com comunidades indígenas. É uma cadeia direta entre atividade econômica ilegal e epidemia.",
      "incorrect": "O garimpo ilegal é o fator central documentado: cria criadouros, introduz vetores e parasitas, e desestrutura o sistema de saúde local."
    },
    "hints": [
      { "type": "text", "content": "O Anopheles precisa de água parada para reproduzir. Que atividade humana cria grandes quantidades de água parada na floresta?" }
    ]
  },
  "teacher": {
    "objective": "O aluno compreende a distribuição geográfica das DTNs e articula fatores econômicos, ambientais e sociais como determinantes.",
    "observe": "Verifique se o aluno vai além da explicação ambiental (clima, vector) para incluir causas socioeconômicas.",
    "answer": "Expansão do garimpo ilegal. O garimpo cria criadouros do Anopheles e introduz o parasita em territórios sem imunidade adquirida. A conexão entre economia e epidemia é direta.",
    "mediation": "Proponha: 'Se o garimpo fosse erradicado amanhã, quanto tempo levaria para os casos de malária voltarem aos níveis anteriores?'",
    "time": "50 minutos"
  }
},

# ── em-health-geo-4 ─────────────────────────────────────────────────
{
  "id": "em-health-geo-4",
  "moduleId": "em-health-geo",
  "title": "Sistemas de saúde e equidade territorial",
  "summary": "Distribuição de serviços de saúde, desertos assistenciais e o SUS no território.",
  "activityType": "single-choice",
  "phenomenon": {
    "title": "Nascer num lugar é uma loteria de saúde",
    "text": "No Brasil, a mortalidade infantil em Alagoas é 4× maior do que em Santa Catarina. Um bebê que nasce em Maceió tem 4× mais chance de morrer antes do primeiro aniversário do que um bebê nascido em Florianópolis. Não é genética, não é cultura: é distribuição desigual de serviços de saúde, renda, saneamento e educação. O lugar onde se nasce determina o acesso à saúde — e, portanto, as chances de sobrevivência."
  },
  "guided": {
    "title": "O SUS e a cobertura territorial",
    "text": "O Sistema Único de Saúde (SUS), criado pela Constituição de 1988, é um dos maiores sistemas públicos de saúde do mundo — com 6.780 hospitais, 46.000 Unidades Básicas de Saúde (UBS) e cobertura formal de 100% do território. Mas cobertura formal não é cobertura real: municípios do interior amazônico têm UBS sem médico, sem remédio e sem equipamento. A distribuição de médicos segue o dinheiro — não a necessidade.",
    "points": [
      "Médicos por 1.000 habitantes: São Paulo (4,5) vs. Maranhão (0,9). A escassez é geográfica, não nacional.",
      "Mais Médicos (2013): programa que levou médicos (inclusive cubanos) a regiões remotas e periferias. Reduziu o deserto assistencial mas foi descontinuado em 2018.",
      "IDSUS (Índice de Desempenho do SUS): ranking municipal de cobertura e qualidade. Evidencia disparidades.",
      "Planos privados: usados por 25% da população, concentrados no Sudeste. Criam sistema paralelo de qualidade."
    ]
  },
  "relations": {
    "title": "Desertos de saúde e populações invisíveis",
    "text": "Desertos de saúde são áreas geográficas com cobertura assistencial insuficiente em relação à população. No Brasil, ocorrem em dois tipos de territórios: municípios pequenos do interior (menos de 10.000 hab.) sem hospital de referência, e periferias urbanas densas onde a rede de UBS não cresceu no mesmo ritmo que a população. As populações invisíveis nesses desertos incluem: indígenas em terras demarcadas, quilombolas, ribeirinhos, populações em situação de rua e trabalhadores rurais sem registro."
  },
  "caseStudy": {
    "title": "O programa Mais Médicos e o interior amazônico",
    "text": "Em 2013, o programa Mais Médicos levou 18.240 médicos a municípios prioritários, principalmente no interior amazônico, semiárido nordestino e periferias das grandes cidades. Em 3 anos, a cobertura da Atenção Básica aumentou 11 pontos percentuais nas áreas do programa. A mortalidade infantil caiu significativamente nos municípios beneficiados. Em 2018, a saída dos médicos cubanos (reação ao governo Bolsonaro) criou vácuo assistencial imediato em centenas de municípios. O episódio demonstrou que a cobertura territorial de saúde é frágil quando depende de programas e não de estrutura permanente."
  },
  "application": "Acesse o site do IBGE Cidades e pesquise quantos médicos por 1.000 habitantes têm o seu município e dois municípios vizinores. Compare com a média nacional (2,3/1.000). O que explica as diferenças?",
  "activity": {
    "question": "A principal causa da distribuição desigual de médicos no território brasileiro é:",
    "type": "single-choice",
    "correct": "mercado",
    "options": [
      { "value": "formacao",  "label": "Insuficiência de vagas nas faculdades de medicina" },
      { "value": "mercado",   "label": "Concentração dos médicos onde há maior renda e infraestrutura" },
      { "value": "distancia", "label": "Dificuldade de deslocamento até regiões remotas" },
      { "value": "preferencia","label": "Preferência cultural dos médicos por cidades grandes" }
    ],
    "feedback": {
      "correct": "Correto. Médicos, como outros profissionais de mercado, se concentram onde há maior renda (maior faturamento em clínicas privadas), infraestrutura hospitalar e qualidade de vida urbana. Sem incentivos ou obrigações, o mercado concentra profissionais de saúde exatamente onde a população já está melhor servida.",
      "incorrect": "A distribuição segue a lógica econômica: médicos se estabelecem onde podem faturar mais, que é onde há mais renda — não onde há mais necessidade."
    },
    "hints": [
      { "type": "text", "content": "Um médico recém-formado vai escolher entre um consultório em São Paulo e uma UBS no interior do Pará. O que influencia essa decisão além da vocação?" }
    ]
  },
  "teacher": {
    "objective": "O aluno compreende a distribuição territorial dos serviços de saúde no Brasil e analisa as causas estruturais das desigualdades.",
    "observe": "Verifique se o aluno distingue cobertura formal (existe UBS) de cobertura real (UBS funcionando com médico, remédio e equipamento).",
    "answer": "Concentração dos médicos onde há maior renda e infraestrutura. A lógica de mercado distribui profissionais de saúde inversamente à necessidade.",
    "mediation": "Proponha: 'Que políticas públicas poderiam redistribuir médicos para onde há mais necessidade? Que incentivos seriam necessários?'",
    "time": "50 minutos"
  }
},

# ── em-natural-resources-1 ──────────────────────────────────────────
{
  "id": "em-natural-resources-1",
  "moduleId": "em-natural-resources",
  "title": "Recursos naturais: conceitos e classificação",
  "summary": "Renováveis, não-renováveis e a lógica econômica da exploração de recursos.",
  "activityType": "single-choice",
  "phenomenon": {
    "title": "Quando o recurso acaba",
    "text": "O pico do petróleo — o momento em que a produção global máxima é atingida e começa a declinar — foi previsto para as décadas de 1970, 1980, 1990, 2000 e 2010. Nenhuma previsão se confirmou: novas tecnologias (fracking, exploração em águas profundas) sempre encontraram novas reservas. Mas o argumento não desapareceu — apenas mudou de forma: o problema não é mais quando o petróleo acaba fisicamente, mas quando o mundo para de usá-lo por questão climática. A transição energética é uma versão política do pico do petróleo."
  },
  "guided": {
    "title": "Tipos de recursos naturais",
    "text": "Recursos naturais são elementos da natureza que as sociedades utilizam para produzir bens, energia e serviços. A classificação mais relevante distingue pela capacidade de renovação.",
    "points": [
      "Renováveis: se regeneram em escala de tempo humana — água, solo, florestas, peixes. Podem tornar-se não-renováveis se explorados além da taxa de renovação.",
      "Não-renováveis: formados em escalas geológicas e esgotados pela exploração — petróleo, gás, carvão, minérios metálicos.",
      "Virtualmente inesgotáveis: solar, eólico, geotérmico, maré. Limitados pela tecnologia de aproveitamento, não pela disponibilidade.",
      "A distinção renovável/não-renovável é dinâmica: um aquífero fóssil (água que levou milênios para se acumular) é, na prática, não-renovável."
    ]
  },
  "relations": {
    "title": "Brasil: um país de recursos",
    "text": "O Brasil está entre os países com maior dotação de recursos naturais do mundo: 13% da água doce superficial do planeta, maior biodiversidade, 17% das reservas mundiais de minério de ferro, petróleo do pré-sal, terras agrícolas e energia hídrica. Essa abundância é uma bênção geográfica e uma armadilha política — a 'maldição dos recursos': países ricos em recursos tendem a ter instituições mais frágeis, economias menos diversificadas e maior desigualdade. A Holanda cunhou o termo 'doença holandesa' para descrever como a descoberta de gás natural destruiu sua indústria manufatureira."
  },
  "caseStudy": {
    "title": "O Aquífero Guarani: recurso ou mercadoria?",
    "text": "O Aquífero Guarani é o maior reservatório de água subterrânea transfronteiriço do mundo — 1,2 milhão de km², espalhados por Brasil, Argentina, Paraguai e Uruguai. Abastece mais de 15 milhões de pessoas e é explorado por centenas de municípios. O desafio é que sua taxa de recarga natural é lenta: em algumas áreas, a água que se extrai hoje levou dezenas de milhares de anos para se acumular. Exploração excessiva pode fazer com que esse recurso 'renovável' se comporte como um não-renovável. O Acordo do Aquífero Guarani (2010) é o primeiro tratado internacional de gestão compartilhada de águas subterrâneas — mas sem mecanismos de enforcement efetivos."
  },
  "application": "Pesquise a matriz energética do Brasil. Quais são as principais fontes de energia? Que proporção é renovável? Compare com a matriz da Alemanha ou dos Estados Unidos.",
  "activity": {
    "question": "Um aquífero fóssil — formado há dezenas de milhares de anos com taxa de recarga mínima — deve ser classificado como:",
    "type": "single-choice",
    "correct": "pratico-nao-renovavel",
    "options": [
      { "value": "renovavel",            "label": "Renovável — água sempre se renova no ciclo hidrológico" },
      { "value": "pratico-nao-renovavel","label": "Praticamente não-renovável — a taxa de extração supera em muito a de recarga" },
      { "value": "inesgotavel",          "label": "Virtualmente inesgotável — os volumes são imensos" },
      { "value": "depende",             "label": "Depende exclusivamente do uso: pode ser gerido como renovável" }
    ],
    "feedback": {
      "correct": "Correto. A classificação de um recurso como renovável ou não-renovável depende da relação entre taxa de exploração e taxa de renovação — não apenas de sua natureza. Um aquífero fóssil com recarga mínima, explorado intensamente, é na prática não-renovável: extraído hoje, não se recuperará em escalas humanas.",
      "incorrect": "A classificação de renovável/não-renovável não é absoluta — depende da taxa de uso em relação à taxa de renovação. Água pode ser não-renovável se explorada mais rápido do que se regenera."
    },
    "hints": [
      { "type": "text", "content": "Pense na relação entre velocidade de uso e velocidade de renovação. Se você retira 1.000 litros por dia e o aquífero repõe 1 litro por dia, ele é efetivamente renovável?" }
    ]
  },
  "teacher": {
    "objective": "O aluno compreende a classificação de recursos naturais e aplica o conceito de taxa de renovação para avaliar sustentabilidade.",
    "observe": "Verifique se o aluno entende que a classificação renovável/não-renovável é contextual (depende da taxa de uso), não absoluta.",
    "answer": "Praticamente não-renovável. A taxa de extração supera a de recarga por fator de milhares. O Aquífero Guarani é exemplo: é água renovável geologicamente, mas não-renovável na prática humana.",
    "mediation": "Proponha: 'Como um país deveria decidir a taxa de extração de um recurso renovável de recarga lenta? Que critérios usar?'",
    "time": "50 minutos"
  }
},

# ── em-natural-resources-2 ──────────────────────────────────────────
{
  "id": "em-natural-resources-2",
  "moduleId": "em-natural-resources",
  "title": "Conflitos por água no século XXI",
  "summary": "Escassez hídrica, geopolítica da água e disputas territoriais pelo acesso à água.",
  "activityType": "single-choice",
  "phenomenon": {
    "title": "A próxima guerra será pela água?",
    "text": "Em 2011, o ex-secretário-geral da ONU Boutros Boutros-Ghali declarou: 'A próxima guerra no Oriente Médio será pela água, não pela política.' A Síria passou por uma seca severa entre 2007 e 2010 — a pior em 900 anos — que deslocou 1,5 milhão de camponeses para as cidades antes do início da guerra civil. O nexo entre escassez de recursos naturais, migração forçada e conflito não é automático, mas é documentado e crescente."
  },
  "guided": {
    "title": "Dimensões da crise hídrica",
    "text": "A crise da água é ao mesmo tempo física (escassez absoluta em regiões áridas), econômica (distribuição desigual do acesso) e geopolítica (disputas entre países por rios e aquíferos compartilhados). Cerca de 2 bilhões de pessoas vivem em regiões com estresse hídrico; 785 milhões não têm acesso à água potável segura.",
    "points": [
      "Escassez física: regiões áridas e semiáridas com precipitação inferior à evapotranspiração — Oriente Médio, Saara, semiárido brasileiro.",
      "Escassez econômica: água existe, mas falta infraestrutura ou renda para acessá-la — comum na África Subsaariana.",
      "Rios internacionais: 276 bacias hidrográficas atravessam fronteiras nacionais, criando interdependência e potencial de conflito.",
      "Privatização da água: debates sobre a mercantilização da água e o reconhecimento como direito humano (ONU, 2010)."
    ]
  },
  "relations": {
    "title": "O Nilo e a Etiópia: conflito em curso",
    "text": "O Nilo alimenta Egito, Sudão e Etiópia — mas o Egito concentrou historicamente o controle do rio. Em 2011, a Etiópia iniciou a construção da Barragem do Renascimento (GERD), a maior hidrelétrica da África. O Egito vê a barragem como ameaça existencial: se a Etiópia reduzir o fluxo para encher o reservatório, o Egito — com 97% do território no deserto — pode enfrentar déficit hídrico severo. As negociações fracassaram; em 2020, o Egito ameaçou ação militar. O conflito do Nilo é o exemplo contemporâneo mais claro de geopolítica da água."
  },
  "caseStudy": {
    "title": "A transposição do Rio São Francisco",
    "text": "O Projeto de Integração do Rio São Francisco com as Bacias Hidrográficas do Nordeste Setentrional (PISF) é a maior obra de infraestrutura hídrica do Brasil: 477 km de canais, 13 aquedutos, 9 túneis. Inaugurado parcialmente em 2017, o projeto leva água do São Francisco a Ceará, Rio Grande do Norte, Paraíba e Pernambuco. O debate foi intenso: governos do Nordeste defendiam como solução ao semiárido; ambientalistas alertavam para o impacto no São Francisco, já degradado; o governo da Bahia opôs-se por anos. O projeto ilustra como soluções hídricas envolvem simultaneamente engenharia, política regional, ecologia e direitos."
  },
  "application": "Pesquise a situação hídrica de um grande reservatório próximo a você (Cantareira em SP, Castanhão no CE, Sobradinho na BA). Qual é o nível atual? Quais usos dependem dele? Há conflitos de uso?",
  "activity": {
    "question": "O conflito entre Etiópia e Egito pela Barragem do Renascimento no Nilo é um exemplo de:",
    "type": "single-choice",
    "correct": "geopolitica-agua",
    "options": [
      { "value": "fronteir",        "label": "Conflito de fronteira territorial — disputa pelo controle do leito do rio" },
      { "value": "geopolitica-agua","label": "Geopolítica da água — controle do fluxo de recurso hídrico compartilhado" },
      { "value": "energia",         "label": "Conflito energético — disputa pelo mercado de energia elétrica africano" },
      { "value": "etnico",          "label": "Conflito étnico-religioso com pretexto hídrico" }
    ],
    "feedback": {
      "correct": "Correto. O conflito não é sobre a fronteira em si, mas sobre quem controla o fluxo do Nilo — e, portanto, o acesso à água de 100 milhões de egípcios. É o exemplo contemporâneo mais claro de geopolítica da água.",
      "incorrect": "A questão central é o controle do recurso hídrico, não a fronteira ou a energia. O Egito não precisa da eletricidade da barragem — precisa da água do rio."
    },
    "hints": [
      { "type": "text", "content": "O Egito tem 97% do território no deserto. Qual é sua fonte de água? Agora pense: o que significa outra nação controlar parte desse fluxo?" }
    ]
  },
  "teacher": {
    "objective": "O aluno compreende as dimensões geopolíticas dos conflitos por água e analisa casos contemporâneos.",
    "observe": "Verifique se o aluno distingue escassez física de escassez econômica e geopolítica ao analisar conflitos hídricos.",
    "answer": "Geopolítica da água. O Egito depende do Nilo para 90% de seu abastecimento. A barragem etíope altera o regime de fluxo e cria dependência. É uma disputa pelo controle de recurso vital compartilhado.",
    "mediation": "Proponha: 'Como um tratado internacional poderia distribuir o fluxo do Nilo de forma equitativa entre três países com necessidades diferentes?'",
    "time": "50 minutos"
  }
},

# ── em-natural-resources-3 ──────────────────────────────────────────
{
  "id": "em-natural-resources-3",
  "moduleId": "em-natural-resources",
  "title": "Mineração, território e conflitos",
  "summary": "Extração mineral, royalties, impactos socioambientais e a maldição dos recursos.",
  "activityType": "single-choice",
  "phenomenon": {
    "title": "Brumadinho: a barragem que não deveria existir",
    "text": "Em 25 de janeiro de 2019, a barragem de rejeitos B1 da mina de Córrego do Feijão (Vale S.A.), em Brumadinho (MG), rompeu e liberou 12 milhões de m³ de lama de minério sobre o Vale do Paraopeba. Resultado: 272 mortos. Era a maior tragédia de trabalho da história brasileira. Três anos antes, Mariana (MG) havia sofrido o rompimento da barragem de Fundão (Samarco), com 19 mortos e o rio Doce destruído por 650 km. Dois desastres, mesma região, mesmo tipo de infraestrutura, mesmo tipo de empresa. Não é coincidência — é modelo."
  },
  "guided": {
    "title": "A cadeia produtiva da mineração",
    "text": "A mineração extrai recursos do subsolo, processa e vende como matéria-prima para a indústria global. O Brasil é um dos maiores produtores mundiais de minério de ferro, bauxita, nióbio e cobre. A cadeia envolve: exploração (pesquisa geológica), extração, beneficiamento, transporte e exportação.",
    "points": [
      "Minério de ferro: o Brasil exporta principalmente para a China (siderurgia). Vale S.A. é a maior mineradora do mundo.",
      "Nióbio: 92% das reservas mundiais estão no Brasil (Araxá, MG). Usado em ligas de aço especiais — aviones, carros, satélites.",
      "Bauxita/alumínio: Pará concentra as maiores reservas. Hidrelétricas da Amazônia existem em parte para alimentar a produção de alumínio.",
      "Royalties: compensação financeira pela exploração de recursos naturais. Distribuição entre municípios, estados e União — fonte de conflito político."
    ]
  },
  "relations": {
    "title": "A maldição dos recursos no contexto brasileiro",
    "text": "A 'maldição dos recursos' (resource curse) descreve a tendência de países ricos em recursos naturais de apresentar crescimento econômico menor, instituições mais frágeis e maior desigualdade do que países sem essa abundância. O mecanismo principal é a doença holandesa: a exportação de commodities valoriza a moeda, tornando as exportações industriais não competitivas e desindustrializando a economia. O Brasil viveu isso intensamente no ciclo das commodities (2002–2012) e na crise de desindustrialização subsequente."
  },
  "caseStudy": {
    "title": "Carajás: a maior mina de ferro do mundo",
    "text": "A Floresta Nacional de Carajás (PA) abriga a maior jazida de minério de ferro do mundo — 7,2 bilhões de toneladas. A Vale extrai cerca de 200 milhões de toneladas por ano e exporta principalmente para a China. O PIB de municípios próximos é elevado pelos royalties, mas os indicadores sociais (IDH, mortalidade infantil, violência) permanecem abaixo da média nacional. A estrada de ferro Carajás cortou a Amazônia de Marabá ao porto de São Luís, gerando pressão sobre terras indígenas e florestas ao longo dos 892 km. O caso ilustra como riqueza mineral não se converte automaticamente em desenvolvimento humano."
  },
  "application": "Pesquise o município de Parauapebas (PA) ou Itabira (MG): qual é o PIB per capita? Qual é o IDH? Que proporção da receita municipal vem de royalties de mineração? O que os dados dizem sobre a relação entre mineração e desenvolvimento local?",
  "activity": {
    "question": "O rompimento das barragens de Mariana (2015) e Brumadinho (2019) revelou principalmente:",
    "type": "single-choice",
    "correct": "regulacao",
    "options": [
      { "value": "acidente",  "label": "Eventos imprevisíveis — qualquer estrutura pode falhar inesperadamente" },
      { "value": "natureza",  "label": "Vulnerabilidade ao clima — chuvas extremas causaram os rompimentos" },
      { "value": "regulacao", "label": "Falhas sistemáticas de regulação, fiscalização e responsabilidade corporativa" },
      { "value": "tecnologia","label": "Obsolescência tecnológica das barragens construídas nos anos 1970" }
    ],
    "feedback": {
      "correct": "Correto. Ambas as barragens tinham laudos de estabilidade recentes emitidos por empresas contratadas pelas próprias mineradoras. Mariana e Brumadinho revelaram falhas no modelo de autorregulação, na captura regulatória do Estado pelas empresas e na ausência de responsabilização efetiva. Não foram acidentes imprevisíveis — foram previstos e tolerados.",
      "incorrect": "Brumadinho rompeu num dia de sol, sem chuvas. Mariana teve causas geológicas e estruturais conhecidas antecipadamente. Os laudos de estabilidade foram emitidos por empresas pagas pela Vale. Não é acidente nem natureza."
    },
    "hints": [
      { "type": "text", "content": "Brumadinho rompeu em dia de sol. Mariana tinha laudos de estabilidade aprovados por empresa contratada pela própria Vale. O que isso diz sobre o sistema de fiscalização?" }
    ]
  },
  "teacher": {
    "objective": "O aluno analisa criticamente os impactos socioambientais da mineração e as falhas de regulação que permitem desastres.",
    "observe": "Verifique se o aluno atribui responsabilidade estrutural (regulação, modelo empresarial) e não apenas individual ('negligência do engenheiro').",
    "answer": "Falhas sistemáticas de regulação e fiscalização. A autorregulação — empresas contratando seus próprios auditores — e a captura do Estado pelas mineradoras criaram condições para os desastres.",
    "mediation": "Proponha: 'Como um sistema de regulação poderia evitar conflitos de interesse nas auditorias de segurança de barragens?'",
    "time": "50 minutos"
  }
},

# ── em-natural-resources-4 ──────────────────────────────────────────
{
  "id": "em-natural-resources-4",
  "moduleId": "em-natural-resources",
  "title": "Transição energética e geopolítica dos minerais críticos",
  "summary": "Lítio, cobalto e terras raras: a nova geopolítica dos recursos na era verde.",
  "activityType": "single-choice",
  "phenomenon": {
    "title": "O carro elétrico precisa de mineração",
    "text": "Um carro elétrico usa 6× mais minerais que um carro a combustão. A bateria de um EV médio contém: 8 kg de lítio, 35 kg de níquel, 20 kg de manganês, 14 kg de cobalto, 11 kg de grafite. A transição energética — necessária para o clima — cria uma nova demanda explosiva por minerais específicos, cuja extração tem seus próprios impactos ambientais e concentração geográfica. Sai a dependência do petróleo do Oriente Médio; entra a dependência do lítio da América do Sul e do cobalto do Congo."
  },
  "guided": {
    "title": "Minerais críticos para a transição energética",
    "text": "Minerais críticos são aqueles essenciais para tecnologias de baixo carbono (baterias, painéis solares, turbinas eólicas, veículos elétricos) e com cadeia de suprimento concentrada em poucos países, criando risco geopolítico.",
    "points": [
      "Lítio: 60% das reservas na América do Sul (triângulo do lítio: Bolívia, Chile, Argentina). Demanda deve triplicar até 2030.",
      "Cobalto: 70% da produção no Congo (RDC), muitas vezes em garimpo artesanal com trabalho infantil.",
      "Terras raras: 60% da produção na China, que também processa 85% do total mundial. Monopólio estratégico.",
      "Níquel: Indonésia e Filipinas dominam. Brasil tem reservas significativas (Pará e Goiás)."
    ]
  },
  "relations": {
    "title": "Brasil no mapa dos minerais críticos",
    "text": "O Brasil tem reservas significativas de vários minerais críticos: nióbio (92% do mundo), lítio (5ª maior reserva mundial, principalmente em MG), grafite (2ª reserva mundial), terras raras (Minas Gerais) e cobalto (PA). A transição energética global cria uma janela de oportunidade — mas o histórico brasileiro com commodities sugere cautela: riqueza mineral não se converte automaticamente em desenvolvimento industrial e social sem políticas deliberadas de agregação de valor."
  },
  "caseStudy": {
    "title": "O lítio brasileiro e a corrida de aquisições",
    "text": "A região de Araçuaí–Itinga, no Vale do Jequitinhonha (MG), concentra uma das maiores reservas de lítio do mundo. Empresas australianas, canadenses, chinesas e americanas compraram ou licenciaram áreas na região desde 2015. Comunidades quilombolas e indígenas locais relatam pressão por terra e impactos sobre rios. O debate político em torno de uma possível 'PETROBRAS do lítio' — empresa nacional para controlar a cadeia — ecoa o debate do petróleo dos anos 1950. A diferença: o tempo disponível é menor, a janela de oportunidade da transição energética é de décadas, não séculos."
  },
  "application": "Pesquise onde está o maior depósito de lítio do Brasil (Araçuaí, MG). Quais são as comunidades que vivem lá? Quais empresas têm licenças de pesquisa mineral na região? O que elas planejam fazer com o recurso?",
  "activity": {
    "question": "A concentração da produção de terras raras na China representa principalmente:",
    "type": "single-choice",
    "correct": "dependencia",
    "options": [
      { "value": "geologico",  "label": "Dado geológico — as terras raras só ocorrem em território chinês" },
      { "value": "dependencia","label": "Dependência geopolítica estratégica — controle de insumo crítico para tecnologias globais" },
      { "value": "mercado",    "label": "Vantagem de mercado temporária — outros países podem competir facilmente" },
      { "value": "ambiente",   "label": "Escolha ambiental — a China aceita impactos que outros países rejeitam" }
    ],
    "feedback": {
      "correct": "Correto. Terras raras existem em outros países (EUA, Austrália, Brasil), mas a China dominou o processamento e tornou-se indispensável. Em 2010, durante um conflito com o Japão, a China cortou exportações de terras raras — mostrando ao mundo que esse é um recurso estratégico, não apenas uma commodity.",
      "incorrect": "Terras raras existem em vários países, inclusive EUA e Brasil. O que a China controla é o processamento — uma vantagem construída por décadas de política industrial deliberada, não um dado geológico."
    },
    "hints": [
      { "type": "text", "content": "Em 2010, a China cortou exportações de terras raras para o Japão durante um conflito diplomático. O que isso revelou sobre o poder de quem controla esse recurso?" }
    ]
  },
  "teacher": {
    "objective": "O aluno compreende a nova geopolítica dos minerais críticos e analisa a posição do Brasil nesse contexto.",
    "observe": "Verifique se o aluno percebe a contradição da transição energética: necessária para o clima, mas dependente de mineração com seus próprios impactos.",
    "answer": "Dependência geopolítica estratégica. A China controla o processamento — não apenas a extração. Cortou exportações em 2010 como pressão diplomática. É recurso de poder.",
    "mediation": "Proponha: 'Um país que queira produzir carros elétricos precisaria de lítio, cobalto e terras raras. Como garante o fornecimento sem criar novas dependências?'",
    "time": "50 minutos"
  }
}

]

def write(lesson):
    path = os.path.join(OUT, f'{lesson["id"]}.json')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(lesson, f, ensure_ascii=False, indent=2)
    return lesson['id']

if __name__ == '__main__':
    for l in LESSONS:
        lid = write(l)
        # quick validation
        with open(os.path.join(OUT, f'{lid}.json')) as f:
            d = json.load(f)
        assert d['id'] == lid
        assert d['moduleId']
        assert d['phenomenon']['title']
        assert d['activity']
        assert d['teacher']['objective']
        print(f'  OK  {lid}')
    print(f'\n{len(LESSONS)} lições geradas.')
