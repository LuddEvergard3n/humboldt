/** Builds lightweight, accessible SVG maps from audited Natural Earth and IBGE GeoJSON. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const target = resolve(root, 'assets', 'maps');
const source = resolve(import.meta.dirname, 'cartography-source');
await mkdir(target, { recursive: true });

const world = JSON.parse(await readFile(resolve(source, 'natural-earth-countries-110m.geojson'), 'utf8'));
const brazil = JSON.parse(await readFile(resolve(source, 'ibge-brazil-states.geojson'), 'utf8'));
const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const round = value => Number(value.toFixed(1));
const worldProject = ([lon, lat]) => [round((lon + 180) * (960 / 360)), round((90 - lat) * (480 / 180) + 30)];
const brazilProject = ([lon, lat]) => [round(130 + (lon + 75) * (700 / 45)), round(40 + (6 - lat) * (460 / 41))];

function ringPath(ring, project) {
  let previous = null;
  return ring.map((point, index) => {
    const projected = project(point);
    const jump = previous && Math.abs(projected[0] - previous[0]) > 480;
    previous = projected;
    return `${index === 0 || jump ? 'M' : 'L'}${projected[0]} ${projected[1]}`;
  }).join(' ') + ' Z';
}

function geometryPath(geometry, project) {
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  return polygons.map(polygon => polygon.map(ring => ringPath(ring, project)).join(' ')).join(' ');
}

function worldLand(fill = '#d6c58b') {
  return `<g id="layer-base" fill="${fill}" stroke="#183650" stroke-width="0.75" stroke-linejoin="round">${world.features.map(feature => {
    const iso = feature.properties.ADM0_A3 || feature.properties.SOV_A3;
    const name = feature.properties.NAME_PT || feature.properties.NAME || iso;
    return `<path id="country-${esc(iso.toLowerCase())}" class="map-territory" data-territory="${esc(iso)}" aria-label="${esc(name)}" tabindex="0" d="${geometryPath(feature.geometry, worldProject)}"/>`;
  }).join('')}</g>`;
}

function brazilLand(fillByRegion = false) {
  const regions = { '1': '#6e9b68', '2': '#d7aa58', '3': '#c6a77a', '4': '#829fbd', '5': '#91a67b' };
  return `<g id="layer-base" stroke="#173650" stroke-width="1.25" stroke-linejoin="round">${brazil.features.map(feature => {
    const code = feature.properties.codarea;
    return `<path id="state-${code}" class="map-territory" data-territory="${code}" aria-label="Unidade da Federação ${code}" tabindex="0" fill="${fillByRegion ? regions[code[0]] : '#d6c58b'}" d="${geometryPath(feature.geometry, brazilProject)}"/>`;
  }).join('')}</g>`;
}

const lonLat = (lon, lat) => worldProject([lon, lat]).join(' ');
function route(id, points, className = 'map-route') {
  return `<path id="${id}" class="${className}" d="${points.map((point, index) => `${index ? 'L' : 'M'}${lonLat(...point)}`).join(' ')}"/>`;
}

const baseStyle = `<style>
  .map-territory{transition:filter 160ms ease,fill 160ms ease}.map-territory:hover,.map-territory:focus{filter:brightness(1.08);stroke:#b66a32;stroke-width:1.7;outline:none}
  .map-route{fill:none;stroke:#b65f32;stroke-width:3;stroke-linecap:round;stroke-dasharray:7 7}.map-flow{fill:none;stroke:#173650;stroke-width:2.5;stroke-linecap:round;opacity:.8}
  @media(prefers-reduced-motion:reduce){.map-territory{transition:none}}
</style>`;

function svg(title, description, sourceName, body) {
  const scaleLabel = sourceName.startsWith('IBGE') ? 'Referência territorial' : 'Escala aproximada';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" role="img" tabindex="0" aria-labelledby="map-title map-desc">
  <title id="map-title">${esc(title)}</title><desc id="map-desc">${esc(description)}</desc>
  <metadata data-source="${esc(sourceName)}" data-reviewed="2026-10-09" data-kind="geographic"/>
  ${baseStyle}<rect id="layer-water" width="960" height="540" rx="12" fill="#9fc9d7"/>
  <g id="layer-graticule" opacity=".22" stroke="#f7f1e5" stroke-width="1">${[120,240,360,480,600,720,840].map(x => `<path d="M${x} 30V510"/>`).join('')}${[110,190,270,350,430].map(y => `<path d="M0 ${y}H960"/>`).join('')}</g>
  <g id="layer-theme">${body}</g><g id="layer-labels"></g>
  <g id="map-decoration" aria-hidden="true">
    <g transform="translate(884 92)"><circle r="31" fill="#fffaf0" fill-opacity=".9" stroke="#173650"/><path d="M0-24L7 0 0-6-7 0Z" fill="#d4bb6f" stroke="#173650"/><path d="M0 24L6 0 0 6-6 0Z" fill="#173650"/><text y="-36" text-anchor="middle" font-family="DM Mono,monospace" font-size="13" font-weight="700" fill="#173650">N</text></g>
    <g transform="translate(52 486)" font-family="DM Mono,monospace" font-size="11" fill="#173650"><text y="-10">${scaleLabel}</text><path d="M0 0H120M0-5V5M60-5V5M120-5V5" stroke="#173650" stroke-width="3"/><text x="60" y="20" text-anchor="middle">leitura comparativa</text></g>
  </g>
</svg>\n`;
}

const physicalRelief = `<defs><linearGradient id="relief" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#8da978"/><stop offset=".55" stop-color="#d4be7b"/><stop offset="1" stop-color="#a57655"/></linearGradient></defs>${worldLand('url(#relief)')}<g fill="none" stroke="#8b5e3c" stroke-width="4" opacity=".78">${route('andes',[[-76,9],[-73,-12],[-69,-31],[-71,-48]],'map-flow')}${route('rockies',[[-123,54],[-116,42],[-108,31]],'map-flow')}${route('himalaya',[[68,34],[83,29],[99,30]],'map-flow')}</g>`;
const climateBands = `<g id="layer-climate" opacity=".34"><rect y="30" width="960" height="80" fill="#eef7f8"/><rect y="110" width="960" height="115" fill="#8fac82"/><rect y="225" width="960" height="90" fill="#e0ae58"/><rect y="315" width="960" height="115" fill="#8fac82"/><rect y="430" width="960" height="80" fill="#eef7f8"/></g>`;
const circles = (items, prefix, fill) => `<g fill="${fill}" opacity=".68">${items.map(([lon,lat,r],i)=>{const [x,y]=worldProject([lon,lat]);return `<circle id="${prefix}-${i+1}" cx="${x}" cy="${y}" r="${r}"/>`}).join('')}</g>`;

const assets = {
  'world-political.svg': svg('Mundo político', 'Países do mundo em geometria simplificada de pequena escala.', 'Natural Earth 1:110m, versão 5.1.1', worldLand()),
  'world-physical.svg': svg('Mundo físico', 'Continentes, relevo relativo e grandes cadeias montanhosas.', 'Natural Earth 1:110m; síntese Humboldt', physicalRelief),
  'brazil-political.svg': svg('Brasil político', 'Unidades da Federação com limites oficiais simplificados.', 'IBGE Malhas, qualidade mínima', brazilLand()),
  'brazil-physical-biomes.svg': svg('Brasil: regiões e biomas', 'Base estadual oficial agrupada por macrorregião; cores usadas como aproximação didática.', 'IBGE Malhas, qualidade mínima; síntese Humboldt', brazilLand(true)),
  'oceans-routes.svg': svg('Oceanos e rotas', 'Base mundial real com rotas marítimas transoceânicas selecionadas.', 'Natural Earth 1:110m; rotas esquemáticas Humboldt', `${worldLand('#d8cc9b')}<g id="layer-routes">${route('south-atlantic',[[-47,-24],[-15,-8],[18,-34]])}${route('north-atlantic',[[-74,40],[-35,48],[4,52]])}${route('indian',[[18,-34],[55,-21],[104,1]])}${route('pacific',[[104,1],[140,20],[179,35]])}</g>`),
  'population.svg': svg('População', 'Base mundial real com concentrações populacionais relativas, sem escala quantitativa.', 'Natural Earth 1:110m; síntese Humboldt', `${worldLand('#d7cc9f')}${circles([[116,35,30],[78,23,28],[10,50,18],[-46,-23,14],[7,9,14],[-75,40,12]],'population','#9d4d39')}`),
  'climate.svg': svg('Clima', 'Base mundial real sob faixas climáticas latitudinais de referência.', 'Natural Earth 1:110m; síntese Humboldt', `${worldLand('#d8cc9b')}${climateBands}<path d="M0 270H960" stroke="#9d4d39" stroke-width="2" stroke-dasharray="7 6"/>`),
  'energy.svg': svg('Energia', 'Base mundial real com regiões produtoras e fluxos energéticos selecionados.', 'Natural Earth 1:110m; síntese Humboldt', `${worldLand('#d8cc9b')}${circles([[-102,32,10],[48,27,10],[61,56,10],[116,39,10],[-43,-22,10]],'energy','#a95d32')}<g>${route('energy-flow-1',[[48,27],[25,37],[5,52]],'map-flow')}${route('energy-flow-2',[[61,56],[35,52],[10,50]],'map-flow')}</g>`),
  'trade-transport.svg': svg('Comércio e transportes', 'Base mundial real com portos e corredores comerciais selecionados.', 'Natural Earth 1:110m; rotas esquemáticas Humboldt', `${worldLand('#d8cc9b')}<g>${route('trade-1',[[-118,34],[-45,42],[4,52]])}${route('trade-2',[[4,52],[55,28],[121,31]])}${route('trade-3',[[121,31],[104,1],[18,-34],[-46,-24]])}</g>${circles([[-118,34,7],[4,52,7],[104,1,7],[121,31,7],[-46,-24,7]],'hub','#173650')}`),
};

for (const [name, content] of Object.entries(assets)) await writeFile(resolve(target, name), content, 'utf8');
if (Object.keys(assets).length !== 9 || world.features.length < 170 || brazil.features.length !== 27) throw new Error('Cartographic source validation failed.');
console.log(`Generated ${Object.keys(assets).length} geographic SVG maps from ${world.features.length} countries and ${brazil.features.length} Brazilian units.`);
