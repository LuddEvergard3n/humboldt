/** Single source of truth for Atlas labels, sources and thematic legends. */
export const MAP_CATALOG = Object.freeze({
  'world-political': {
    title: 'Mundo político', subtitle: 'Países e fronteiras', extent: 'Global', source: 'Natural Earth 1:110m', period: 'versão 5.1.1', kind: 'Mapa-base', notice: 'Limites generalizados para leitura em pequena escala.',
    legend: [['area', '#d6c58b', 'Países'], ['line', '#183650', 'Fronteiras'], ['area', '#9fc9d7', 'Oceanos']],
  },
  'world-physical': {
    title: 'Mundo físico', subtitle: 'Relevo relativo e grandes cadeias', extent: 'Global', source: 'Natural Earth 1:110m; síntese Humboldt', period: 'revisão 2026', kind: 'Mapa físico', notice: 'Cores e linhas indicam relações físicas, não altitude mensurável.',
    legend: [['gradient', '#8da978', 'Relevo relativo'], ['line', '#8b5e3c', 'Cadeias montanhosas'], ['area', '#9fc9d7', 'Oceanos']],
  },
  'brazil-political': {
    title: 'Brasil político', subtitle: 'Unidades da Federação', extent: 'Brasil', source: 'IBGE Malhas', period: 'qualidade mínima; revisão 2026', kind: 'Divisão política', notice: 'Limites estaduais simplificados para visualização digital.',
    legend: [['area', '#d6c58b', 'Unidades federativas'], ['line', '#173650', 'Limites estaduais'], ['area', '#9fc9d7', 'Entorno']],
  },
  'brazil-physical-biomes': {
    title: 'Brasil físico e regiões', subtitle: 'Macrorregiões e limites estaduais', extent: 'Brasil', source: 'IBGE Malhas; síntese Humboldt', period: 'revisão 2026', kind: 'Mapa regional', notice: 'As cores representam macrorregiões, não polígonos oficiais de biomas.',
    legend: [['area', '#6e9b68', 'Norte'], ['area', '#d7aa58', 'Nordeste'], ['area', '#c6a77a', 'Centro-Oeste'], ['area', '#829fbd', 'Sudeste'], ['area', '#91a67b', 'Sul'], ['line', '#173650', 'Limites estaduais']],
  },
  'oceans-routes': {
    title: 'Oceanos e rotas', subtitle: 'Corredores marítimos selecionados', extent: 'Global', source: 'Natural Earth; síntese Humboldt', period: 'revisão 2026', kind: 'Rede qualitativa', notice: 'Rotas esquemáticas, sem volume ou frequência associados.',
    legend: [['area', '#9fc9d7', 'Oceanos'], ['area', '#d8cc9b', 'Terra'], ['dash', '#b65f32', 'Corredores marítimos']],
  },
  population: {
    title: 'População', subtitle: 'Concentrações populacionais relativas', extent: 'Global', source: 'Natural Earth; síntese Humboldt', period: 'referência didática 2026', kind: 'Distribuição qualitativa', notice: 'Os círculos não possuem escala quantitativa.',
    legend: [['circle', '#9d4d39', 'Maior concentração relativa'], ['area', '#d7cc9f', 'Base territorial'], ['area', '#9fc9d7', 'Oceanos']],
  },
  climate: {
    title: 'Clima', subtitle: 'Zonas climáticas latitudinais', extent: 'Global', source: 'Natural Earth; síntese Humboldt', period: 'revisão 2026', kind: 'Zonas aproximadas', notice: 'Faixas generalizadas; climas reais variam com relevo, correntes e continentalidade.',
    legend: [['area', '#eef7f8', 'Polar'], ['area', '#8fac82', 'Temperada'], ['area', '#e0ae58', 'Tropical'], ['dash', '#9d4d39', 'Equador']],
  },
  energy: {
    title: 'Energia', subtitle: 'Centros e fluxos selecionados', extent: 'Global', source: 'Natural Earth; síntese Humboldt', period: 'referência didática 2026', kind: 'Rede qualitativa', notice: 'Sem valores de produção ou comércio; consultar as fontes das lições.',
    legend: [['circle', '#a95d32', 'Centro produtor'], ['line', '#173650', 'Fluxo selecionado'], ['area', '#d8cc9b', 'Base territorial']],
  },
  'trade-transport': {
    title: 'Comércio e transportes', subtitle: 'Portos e corredores globais', extent: 'Global', source: 'Natural Earth; síntese Humboldt', period: 'referência didática 2026', kind: 'Rede qualitativa', notice: 'Corredores selecionados, sem volume comercial associado.',
    legend: [['circle', '#173650', 'Hub logístico'], ['dash', '#b65f32', 'Corredor comercial'], ['area', '#d8cc9b', 'Base territorial']],
  },
});

export const mapAssetPath = mapId => `assets/maps/${mapId}.svg`;
export const mapEntries = () => Object.entries(MAP_CATALOG);
