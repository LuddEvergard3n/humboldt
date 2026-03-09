/**
 * globe-decoration.js — Globo SVG decorativo com projeção ortográfica real
 *
 * Projeta coordenadas [longitude, latitude] reais usando a fórmula
 * ortográfica centrada no Atlântico (lon=−20°, lat=10°).
 * Sem dependências externas.
 *
 * @returns {SVGElement}
 */

// Centro da projeção
const LON0_DEG = -20;
const LAT0_DEG =  10;
const R        = 170; // raio em pixels
const CX       = 210;
const CY       = 210;

const LON0 = LON0_DEG * Math.PI / 180;
const LAT0 = LAT0_DEG * Math.PI / 180;

/**
 * Projeta [lon, lat] em graus para [x, y] em pixels (projeção ortográfica).
 * Retorna null se o ponto está no hemisfério traseiro.
 * @param {number} lonDeg
 * @param {number} latDeg
 * @returns {{x:number, y:number}|null}
 */
function project(lonDeg, latDeg) {
  const lon = lonDeg * Math.PI / 180;
  const lat = latDeg * Math.PI / 180;
  const dlon = lon - LON0;

  // Verifica visibilidade (hemisfério frontal)
  const cosC = Math.sin(LAT0) * Math.sin(lat) + Math.cos(LAT0) * Math.cos(lat) * Math.cos(dlon);
  if (cosC < 0) return null;

  const x = CX + R * Math.cos(lat) * Math.sin(dlon);
  const y = CY - R * (Math.cos(LAT0) * Math.sin(lat) - Math.sin(LAT0) * Math.cos(lat) * Math.cos(dlon));
  return { x, y };
}

/**
 * Converte array de [lon,lat] pares em string de path SVG.
 * Pula pontos no hemisfério traseiro sem quebrar o path.
 * @param {[number,number][]} coords
 * @returns {string}
 */
function toPath(coords) {
  let d = '';
  let drawing = false;
  for (const [lon, lat] of coords) {
    const pt = project(lon, lat);
    if (!pt) { drawing = false; continue; }
    if (!drawing) { d += `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)} `; drawing = true; }
    else           { d += `L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)} `; }
  }
  if (drawing) d += 'Z';
  return d;
}

// ─── Continentes: polígonos simplificados mas reconhecíveis ───────────────────

// América do Norte (simplificada)
const NORTH_AMERICA = [
  [-168,60],[-160,60],[-145,60],[-137,59],[-130,55],[-124,49],
  [-110,49],[-95,49],[-82,46],[-75,45],[-67,47],[-64,44],
  [-67,42],[-70,42],[-75,35],[-80,32],[-82,28],
  [-90,19],[-88,15],[-83,10],[-77,8],
  [-78,8],[-77,9],[-80,9],[-80,15],
  [-88,20],[-90,21],[-104,23],[-109,23],[-117,32],
  [-124,37],[-124,49],
  [-130,55],[-140,60],[-160,60],[-168,60],
];

// América do Sul
const SOUTH_AMERICA = [
  [-78,8],[-73,12],[-62,11],[-60,8],[-51,4],[-50,0],
  [-49,-1],[-35,-5],[-35,-9],[-39,-14],[-40,-20],[-44,-23],
  [-48,-28],[-52,-33],[-58,-38],[-62,-42],[-65,-47],[-67,-55],
  [-68,-54],[-66,-51],[-72,-50],[-75,-40],[-75,-30],
  [-80,-10],[-80,0],[-80,8],[-78,8],
];

// Europa Ocidental + Península Ibérica
const EUROPE = [
  [-9,44],[-8,39],[-6,36],[-5,36],[-2,37],[0,39],[3,42],
  [3,44],[2,43],[-2,44],[-2,47],[0,47],[2,48],[2,51],
  [0,51],[0,52],[2,52],[5,53],[5,54],[8,55],[8,58],
  [5,58],[5,61],[10,63],[13,65],[15,69],[20,70],[25,70],
  [28,71],[30,70],[28,68],[25,65],[24,60],[26,58],[24,57],
  [20,55],[18,55],[14,54],[10,55],[8,55],[5,54],[2,52],
  [2,51],[0,51],[0,50],[-2,48],[-5,47],[-9,44],
];

// África
const AFRICA = [
  [-17,15],[-16,12],[-15,10],[-15,5],[-10,5],[-5,5],
  [0,5],[5,5],[10,5],[8,4],[9,1],[8,-4],
  [10,-5],[15,-5],[18,-5],[20,-4],[24,-5],[28,-5],
  [32,-5],[35,-5],[39,0],[41,2],[43,10],[43,15],
  [40,20],[37,22],[38,24],[36,22],[32,30],[28,30],
  [24,31],[20,37],[15,38],[10,37],[5,37],
  [0,30],[-5,32],[-10,30],[-15,24],[-17,20],[-17,15],
];

// Groenlândia (ajuda a reconhecer o hemisfério)
const GREENLAND = [
  [-55,77],[-45,80],[-30,83],[-15,82],[-20,77],[-30,75],
  [-40,72],[-45,70],[-50,66],[-53,68],[-55,72],[-55,77],
];

// Graus de latitude para elipses do graticule
const PARALLELS  = [-60, -30, 0, 30, 60];
const MERIDIANS  = [-90, -60, -30, 0, 30, 60];
const GRATICULE_PTS = 64;

/** Gera SVG path de um paralelo (latitude fixa, lon variando) */
function parallelPath(lat) {
  const pts = [];
  for (let i = 0; i <= GRATICULE_PTS; i++) {
    const lon = -180 + (360 * i / GRATICULE_PTS);
    const pt  = project(lon, lat);
    if (pt) pts.push(pt);
  }
  if (pts.length < 2) return '';
  return 'M ' + pts.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ');
}

/** Gera SVG path de um meridiano (longitude fixa, lat variando) */
function meridianPath(lon) {
  const pts = [];
  for (let i = 0; i <= GRATICULE_PTS; i++) {
    const lat = -90 + (180 * i / GRATICULE_PTS);
    const pt  = project(lon, lat);
    if (pt) pts.push(pt);
  }
  if (pts.length < 2) return '';
  return 'M ' + pts.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ');
}

// ─── Build SVG ───────────────────────────────────────────────────────────────

export function createGlobeDecoration() {
  const NS  = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 420 420');
  svg.setAttribute('width',   '360');
  svg.setAttribute('height',  '360');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'max-width:100%;display:block;margin:0 auto;';

  // Graticule paths computados
  const graticulePaths = [
    ...PARALLELS.map(parallelPath),
    ...MERIDIANS.map(meridianPath),
  ].filter(Boolean).join(' ');

  // Continent paths computados
  const nAm   = toPath(NORTH_AMERICA);
  const sAm   = toPath(SOUTH_AMERICA);
  const eu    = toPath(EUROPE);
  const af    = toPath(AFRICA);
  const green = toPath(GREENLAND);

  svg.innerHTML = `
    <defs>
      <clipPath id="globe-clip">
        <circle cx="${CX}" cy="${CY}" r="${R + 2}"/>
      </clipPath>
      <radialGradient id="ocean-grad" cx="35%" cy="30%" r="65%">
        <stop offset="0%"   stop-color="#c8dff0"/>
        <stop offset="50%"  stop-color="#6fa8c4"/>
        <stop offset="100%" stop-color="#3a6a85"/>
      </radialGradient>
      <radialGradient id="shine-grad" cx="30%" cy="25%" r="50%">
        <stop offset="0%"   stop-color="rgba(255,255,255,0.45)"/>
        <stop offset="60%"  stop-color="rgba(255,255,255,0.05)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
      <filter id="globe-shadow" x="-5%" y="-5%" width="110%" height="115%">
        <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="rgba(30,58,95,0.25)"/>
      </filter>
    </defs>

    <!-- Sombra -->
    <circle cx="${CX}" cy="${CY}" r="${R}" fill="rgba(30,58,95,0.18)"
            transform="translate(0,8)" filter="url(#globe-shadow)"/>

    <!-- Oceano -->
    <circle cx="${CX}" cy="${CY}" r="${R}" fill="url(#ocean-grad)"/>

    <!-- Graticule -->
    <g clip-path="url(#globe-clip)"
       stroke="rgba(255,255,255,0.22)" stroke-width="0.6" fill="none">
      <path d="${graticulePaths}"/>
    </g>

    <!-- Equador em destaque -->
    <path d="${parallelPath(0)}"
          clip-path="url(#globe-clip)"
          stroke="rgba(255,255,255,0.4)" stroke-width="1" fill="none"
          stroke-dasharray="4 3"/>

    <!-- Continentes -->
    <g clip-path="url(#globe-clip)"
       fill="#d4c99a" stroke="#b0a070" stroke-width="0.8" stroke-linejoin="round">
      <path d="${nAm}"/>
      <path d="${sAm}"/>
      <path d="${eu}"/>
      <path d="${af}"/>
      <path d="${green}" opacity="0.85"/>
    </g>

    <!-- Brilho superficial -->
    <circle cx="${CX}" cy="${CY}" r="${R}"
            fill="url(#shine-grad)" clip-path="url(#globe-clip)"/>

    <!-- Anel exterior -->
    <circle cx="${CX}" cy="${CY}" r="${R}"
            fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  `;

  return svg;
}
