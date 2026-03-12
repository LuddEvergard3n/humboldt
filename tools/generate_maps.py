#!/usr/bin/env python3
"""
generate_maps.py
Gera os 3 SVGs de mapas para o projeto Humboldt.

Mapas produzidos:
  brazil-regions.svg  — 5 macrorregiões clicáveis (data-id corretos para lições)
  world-simple.svg    — regiões mundiais clicáveis (inclui oriente-medio)
  brazil-layers.svg   — camadas: biomas, cidades, rios, rodovias, desmatamento

Projeção: plana simples (lon/lat → pixel linear).
Não usa dependências externas.
"""

import os, textwrap

OUT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'maps')
os.makedirs(OUT, exist_ok=True)

# ── helpers de projeção ──────────────────────────────────────────────

def make_proj(lon_min, lat_max, lon_span, lat_span, w, h):
    """Retorna função (lon, lat) -> (x, y) para um viewport específico."""
    def proj(lon, lat):
        x = (lon - lon_min) / lon_span * w
        y = (lat_max - lat) / lat_span * h
        return round(x, 1), round(y, 1)
    return proj

def pts_to_path(proj, pts):
    pairs = ' '.join(f'{proj(lo,la)[0]},{proj(lo,la)[1]}' for lo, la in pts)
    return f'M {pairs} Z'

def pts_to_line(proj, pts):
    return ' '.join(f'{proj(lo,la)[0]},{proj(lo,la)[1]}' for lo, la in pts)

# ── Brasil ──────────────────────────────────────────────────────────
# lon: -74.0 → -28.5  (45.5°)
# lat:  +5.5 → -34.0  (39.5°)
# viewBox: 0 0 560 610

BZ = make_proj(-74.0, 5.5, 45.5, 39.5, 560, 610)

# Pontos de junção compartilhados entre regiões adjacentes:
# J1 = (-46.5,  1.5)  Norte / Nordeste – costa leste do Pará
# J2 = (-46.5,-12.5)  Norte / Nordeste / CO – sul do Tocantins
# J3 = (-44.5,-15.0)  Nordeste / CO / Sudeste – tripl. GO/MG/BA
# J4 = (-44.5,-19.0)  Nordeste / Sudeste – border BA/MG interior
# J5 = (-41.5,-21.0)  Nordeste / Sudeste – extremo sul da Bahia (costa)
# JP = (-50.5,-24.5)  CO / Sudeste / Sul – tripl. MS/SP/PR
# J7 = (-54.5,-26.5)  CO / Sul – borda MS/PR

NORTE_PTS = [
    (-73.9,  2.5),  # NO, fronteira Peru/Colômbia
    (-70.5,  5.3),  # N, Roraima
    (-60.5,  5.3),  # N, Amapá
    (-51.5,  4.0),  # NE, costa Pará/Amapá
    (-46.5,  1.5),  # J1 – costa Pará/Maranhão
    (-46.5,-12.5),  # J2 – sul do Tocantins
    (-50.0,-10.5),  # S interior
    (-54.0, -6.0),  # S, PA/MT
    (-60.0, -5.5),  # S, AM/MT
    (-65.5, -9.0),  # SO, RO/BO
    (-73.9, -5.0),  # O, Acre/Peru
]

NORDESTE_PTS = [
    (-46.5,  1.5),  # J1
    (-44.0,  3.0),  # NO
    (-37.0,  5.3),  # N, Maranhão/Piauí/Ceará
    (-34.8, -0.5),  # NE, costa (Fortaleza)
    (-34.8,-12.0),  # E, costa
    (-37.5,-14.5),  # SE, costa Bahia
    (-39.5,-18.0),  # S, costa Bahia
    (-41.5,-21.0),  # J5 – extremo sul Bahia
    (-44.5,-19.0),  # J4
    (-44.5,-15.0),  # J3
    (-46.5,-12.5),  # J2
]

CO_PTS = [
    (-60.0, -5.5),  # N
    (-54.0, -6.0),  # N
    (-50.0,-10.5),  # NE
    (-46.5,-12.5),  # J2
    (-44.5,-15.0),  # J3
    (-47.0,-20.5),  # E, borda CO/SE interior
    (-50.5,-24.5),  # JP
    (-54.5,-26.5),  # J7
    (-57.5,-20.0),  # S
    (-60.5,-15.0),  # SO
    (-68.0,-13.0),  # O, Bolívia
    (-65.5, -9.0),  # NO
]

SUDESTE_PTS = [
    (-44.5,-15.0),  # J3
    (-44.5,-19.0),  # J4
    (-41.5,-21.0),  # J5
    (-40.0,-22.5),  # E, costa RJ
    (-41.5,-25.5),  # SE, costa SP
    (-50.5,-24.5),  # JP
    (-47.0,-20.5),  # O, borda CO/SE
]

SUL_PTS = [
    (-50.5,-24.5),  # JP
    (-41.5,-25.5),  # NE, costa PR
    (-48.5,-29.0),  # E, costa RS
    (-52.0,-34.0),  # S, RS/Uruguai
    (-57.5,-31.5),  # SO, RS/Argentina
    (-54.5,-26.5),  # J7
]

REGIOES_BZ = [
    # (data-id, label, fill, pontos, label_lon, label_lat)
    ('norte',        'Norte',        '#4d7a4d', NORTE_PTS,    -62.0, -2.0),
    ('nordeste',     'Nordeste',     '#bf771e', NORDESTE_PTS, -40.0, -8.5),
    ('centro-oeste', 'Centro-Oeste', '#7a2e2e', CO_PTS,       -54.5,-14.0),
    ('sudeste',      'Sudeste',      '#1a568a', SUDESTE_PTS,  -44.5,-20.0),
    ('sul',          'Sul',          '#5a2e8a', SUL_PTS,      -51.5,-29.5),
]

def gen_brazil_regions():
    paths, labels = [], []
    for did, name, fill, pts, llon, llat in REGIOES_BZ:
        lx, ly = BZ(llon, llat)
        d = pts_to_path(BZ, pts)
        paths.append(
            f'  <path class="region" data-id="{did}" data-name="{name}"\n'
            f'        fill="{fill}" d="{d}"\n'
            f'        tabindex="0" role="button" aria-label="{name}"/>'
        )
        labels.append(f'  <text class="rlabel" x="{lx}" y="{ly}">{name.upper()}</text>')

    body = '\n'.join(paths) + '\n\n' + '\n'.join(labels)

    # Escala: ~1000 km ≈ 68px nesta projeção
    # Rosa: canto inferior direito
    return textwrap.dedent(f'''\
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 610"
         role="img" aria-label="Mapa das macrorregiões do Brasil">
      <title>Macrorregiões do Brasil</title>
      <desc>Cinco macrorregiões brasileiras: Norte, Nordeste, Centro-Oeste, Sudeste e Sul. Cada região é clicável.</desc>
      <defs>
        <style>
          .region {{ stroke:#f2ede3; stroke-width:1.2; cursor:pointer;
                     transition:opacity .15s,filter .15s; }}
          .region:hover,.region:focus {{ opacity:.75; filter:brightness(1.15); outline:none; }}
          .region:focus-visible {{ outline:2px solid #c4a35a; outline-offset:3px; }}
          .rlabel {{ font-family:"DM Mono",monospace; font-size:10px; font-weight:700;
                     fill:rgba(242,237,227,.95); text-anchor:middle; pointer-events:none; }}
          .graticule {{ stroke:rgba(30,58,95,.12); stroke-width:.6; fill:none; stroke-dasharray:3,5; }}
        </style>
      </defs>

      <!-- Oceano -->
      <rect width="560" height="610" fill="#8dbdd1"/>

      <!-- Graticule leve: equador e trópico de Capricórnio -->
      <line class="graticule" x1="0" y1="{BZ(0,0)[1]}" x2="560" y2="{BZ(0,0)[1]}"/>
      <line class="graticule" x1="0" y1="{BZ(0,-23.4)[1]}" x2="560" y2="{BZ(0,-23.4)[1]}"/>
      <text x="5" y="{BZ(0,0)[1]-3}" font-family="monospace" font-size="7" fill="rgba(30,58,95,.5)">Equador</text>
      <text x="5" y="{BZ(0,-23.4)[1]-3}" font-family="monospace" font-size="7" fill="rgba(30,58,95,.5)">Trópico de Capricórnio</text>

    {body}

      <!-- Rosa dos ventos -->
      <g transform="translate(500,555)">
        <circle r="26" fill="rgba(242,237,227,.9)" stroke="#c8bfa8" stroke-width="1"/>
        <polygon points="0,-19 -4,-5 4,-5" fill="#c4a35a"/>
        <polygon points="0,19 -4,5 4,5"   fill="#1e3a5f" opacity=".55"/>
        <line x1="-19" y1="0" x2="19" y2="0" stroke="#1e3a5f" stroke-width="1" opacity=".4"/>
        <text text-anchor="middle" y="-21" font-family="monospace" font-size="9"
              font-weight="700" fill="#c4a35a">N</text>
      </g>

      <!-- Escala gráfica (68px ≈ 1000 km) -->
      <g transform="translate(22,582)">
        <rect width="34" height="5" fill="#1e3a5f" opacity=".75"/>
        <rect x="34" width="34" height="5" fill="#f2ede3" stroke="#1e3a5f" stroke-width=".5" opacity=".75"/>
        <text x="0" y="15" font-family="monospace" font-size="8" fill="#1e3a5f">0</text>
        <text x="48" y="15" font-family="monospace" font-size="8" fill="#1e3a5f">1000 km</text>
      </g>
    </svg>
    ''')

# ── Mundo ────────────────────────────────────────────────────────────
# lon: -180 → 180  (360°)
# lat:  +88 → -60  (148°)  (corta Antártica)
# viewBox: 0 0 900 462

WLD = make_proj(-180, 88, 360, 148, 900, 462)

# Regiões mundiais — polígonos simplificados
# Ordem: define sobreposição (último desenhado por cima)
WORLD_REGIONS = [
    ('america-norte', 'América do Norte', '#c8b878', [
        (-168, 73), (-55, 83), (-52, 47), (-80, 26), (-88, 16),
        (-87, 10), (-78, 9), (-105, 20), (-117, 33), (-125, 49),
        (-138, 60), (-168, 62),
    ]),
    ('america-sul', 'América do Sul', '#bca860', [
        (-80, 12), (-60, 12), (-35, -5), (-34, -13), (-38, -25),
        (-50, -35), (-68, -56), (-75, -52), (-80, -35), (-80, 0),
    ]),
    ('europa', 'Europa', '#98afc0', [
        (-25, 72), (38, 72), (40, 46), (36, 36), (25, 36),
        (15, 37), (-5, 36), (-10, 38), (-22, 48), (-10, 53),
        (-24, 65),
    ]),
    ('africa', 'África', '#c4a050', [
        (-18, 37), (37, 37), (55, 12), (52,  0), (42, -12),
        (34, -20), (17, -35),  (0, -35), (-18, -20), (-18, 12),
    ]),
    ('oriente-medio', 'Oriente Médio', '#d8b864', [
        (36, 38), (40, 42), (62, 42), (65, 36), (62, 22),
        (56, 14), (44, 12), (32, 22), (32, 30), (26, 31), (30, 38),
    ]),
    ('russia', 'Rússia / Ásia Central', '#aabba0', [
        (38, 72), (180, 72), (180, 50), (145, 42), (100, 50),
        (62, 50), (40, 46), (38, 55), (38, 72),
    ]),
    ('asia-meridional', 'Ásia Meridional', '#ccb070', [
        (62, 37), (80, 38), (98, 28), (100,  8), (80,  0),
        (70,  8), (66, 22), (62, 28), (56, 26), (56, 14), (62, 22),
    ]),
    ('asia-oriental', 'Ásia Oriental', '#a0c09a', [
        (100, 50), (145, 55), (145, 34), (122, 22),
        (100, 20), (98, 28), (100, 50),
    ]),
    ('sudeste-asiatico', 'Sudeste Asiático', '#b0b878', [
        (98, 28), (122, 22), (120, 5), (105, 0), (100, 8),
    ]),
    ('oceania', 'Oceania', '#c0ae8a', [
        (112, -16), (155, -16), (155, -45), (145, -50),
        (115, -40), (112, -32),
    ]),
]

def gen_world():
    paths, labels = [], []
    for did, name, fill, pts in WORLD_REGIONS:
        d = pts_to_path(WLD, pts)
        cx, cy = WLD(
            sum(p[0] for p in pts) / len(pts),
            sum(p[1] for p in pts) / len(pts),
        )
        paths.append(
            f'  <path class="region" data-id="{did}" data-name="{name}"\n'
            f'        fill="{fill}" d="{d}"\n'
            f'        tabindex="0" role="button" aria-label="{name}"/>'
        )
        # Rótulo apenas para regiões maiores
        if did not in ('sudeste-asiatico',):
            labels.append(
                f'  <text class="rlabel" x="{cx}" y="{cy}">'
                f'{name.upper()[:12]}</text>'
            )

    # Linhas de graticule: equador, trópicos, ártico
    lines = []
    for lat, dash, label in [
        (0,   '4,4', 'Equador'),
        (-23.4, '2,6', 'Trp. Capricórnio'),
        (23.4,  '2,6', 'Trp. Câncer'),
        (66.5,  '1,8', ''),
    ]:
        y = WLD(0, lat)[1]
        lines.append(
            f'  <line class="graticule" x1="0" y1="{y}" x2="900" y2="{y}"'
            f' stroke-dasharray="{dash}"/>'
        )
        if label:
            lines.append(
                f'  <text x="5" y="{y-3}" font-family="monospace" font-size="7"'
                f' fill="rgba(30,58,95,.45)">{label}</text>'
            )

    body = '\n'.join(paths) + '\n\n' + '\n'.join(labels) + '\n\n' + '\n'.join(lines)

    return textwrap.dedent(f'''\
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 462"
         role="img" aria-label="Mapa mundial simplificado">
      <title>Mapa Mundial Simplificado</title>
      <desc>Regiões mundiais simplificadas: Américas, Europa, África, Oriente Médio, Rússia, Ásia e Oceania.</desc>
      <defs>
        <style>
          .region {{ stroke:#c8bfa8; stroke-width:.8; cursor:pointer;
                     transition:opacity .15s,filter .15s; }}
          .region:hover,.region:focus {{ opacity:.75; filter:brightness(1.12); outline:none; }}
          .region:focus-visible {{ outline:2px solid #c4a35a; outline-offset:2px; }}
          .rlabel {{ font-family:"DM Mono",monospace; font-size:8px; font-weight:600;
                     fill:rgba(30,58,95,.8); text-anchor:middle; pointer-events:none; }}
          .graticule {{ stroke:rgba(30,58,95,.15); stroke-width:.5; fill:none; }}
        </style>
      </defs>

      <!-- Oceano -->
      <rect width="900" height="462" fill="#8dbdd1"/>

    {body}

      <!-- Rosa dos ventos -->
      <g transform="translate(855,420)">
        <circle r="22" fill="rgba(242,237,227,.9)" stroke="#c8bfa8" stroke-width="1"/>
        <polygon points="0,-16 -3,-4 3,-4" fill="#c4a35a"/>
        <polygon points="0,16 -3,4 3,4"   fill="#1e3a5f" opacity=".5"/>
        <text text-anchor="middle" y="-18" font-family="monospace" font-size="8"
              font-weight="700" fill="#c4a35a">N</text>
      </g>
    </svg>
    ''')

# ── Brazil Layers ────────────────────────────────────────────────────

# Contorno geral do Brasil (união aproximada das 5 regiões)
BRAZIL_OUTLINE = [
    (-73.9, 2.5), (-70.5, 5.3), (-60.5, 5.3), (-51.5, 4.0),
    (-46.5, 1.5), (-44.0, 3.0), (-37.0, 5.3), (-34.8, -0.5),
    (-34.8,-12.0), (-37.5,-14.5), (-39.5,-18.0), (-41.5,-21.0),
    (-40.0,-22.5), (-41.5,-25.5), (-48.5,-29.0), (-52.0,-34.0),
    (-57.5,-31.5), (-54.5,-26.5), (-57.5,-20.0), (-60.5,-15.0),
    (-68.0,-13.0), (-65.5, -9.0), (-73.9, -5.0),
]

# Biomas — polígonos aproximados
BIOMAS = [
    # (nome, cor, pontos)
    ('Amazônia',    '#2d6b2d', [
        (-73.9, 2.5), (-70.5, 5.3), (-60.5, 5.3), (-51.5, 4.0),
        (-46.5, 1.5), (-46.5,-12.5), (-50.0,-10.5), (-54.0,-6.0),
        (-60.0,-5.5), (-65.5,-9.0), (-73.9,-5.0),
    ]),
    ('Cerrado',     '#a09040', [
        (-60.0,-5.5), (-54.0,-6.0), (-50.0,-10.5), (-46.5,-12.5),
        (-44.5,-15.0), (-47.0,-20.5), (-50.5,-24.5), (-54.5,-26.5),
        (-57.5,-20.0), (-60.5,-15.0), (-65.5,-9.0),
    ]),
    ('Caatinga',    '#c4905a', [
        (-46.5,-12.5), (-44.5,-15.0), (-44.5,-19.0),
        (-39.5,-18.0), (-34.8,-12.0), (-34.8,-0.5), (-37.0,5.3),
        (-44.0,3.0), (-46.5,1.5),
    ]),
    ('Mata Atlântica','#3a7a3a', [
        (-44.5,-15.0), (-44.5,-19.0), (-41.5,-21.0),
        (-40.0,-22.5), (-41.5,-25.5), (-50.5,-24.5), (-47.0,-20.5),
    ]),
    ('Pampa',       '#7aaa5a', [
        (-50.5,-24.5), (-41.5,-25.5), (-48.5,-29.0),
        (-52.0,-34.0), (-57.5,-31.5), (-54.5,-26.5),
    ]),
    ('Pantanal',    '#5a8a7a', [
        (-57.5,-20.0), (-54.5,-16.0), (-58.0,-16.0), (-60.5,-18.0), (-60.5,-22.0), (-57.5,-22.0),
    ]),
]

# Cidades principais: (nome, lon, lat)
CIDADES = [
    ('Manaus',         -60.0,  -3.1),
    ('Belém',          -48.5,  -1.5),
    ('Macapá',         -51.0,   0.0),
    ('Boa Vista',      -60.7,   2.8),
    ('Porto Velho',    -63.9,  -8.8),
    ('Rio Branco',     -67.8,  -9.9),
    ('Palmas',         -48.3, -10.2),
    ('São Luís',       -44.3,  -2.5),
    ('Fortaleza',      -38.5,  -3.7),
    ('Teresina',       -42.8,  -5.1),
    ('Natal',          -35.2,  -5.8),
    ('João Pessoa',    -34.9,  -7.1),
    ('Recife',         -35.0,  -8.1),
    ('Maceió',         -35.7,  -9.7),
    ('Aracaju',        -37.1, -10.9),
    ('Salvador',       -38.5, -13.0),
    ('Brasília',       -47.9, -15.8),
    ('Goiânia',        -49.3, -16.7),
    ('Cuiabá',         -56.1, -15.6),
    ('Campo Grande',   -54.6, -20.4),
    ('Belo Horizonte', -44.0, -19.9),
    ('Vitória',        -40.3, -20.3),
    ('Rio de Janeiro', -43.2, -22.9),
    ('São Paulo',      -46.6, -23.5),
    ('Curitiba',       -49.3, -25.4),
    ('Florianópolis',  -48.5, -27.6),
    ('Porto Alegre',   -51.2, -30.0),
]

# Capitais (subconjunto de cidades com símbolo diferente)
CAPITAIS = {'Brasília'}

# Rios principais: (nome, pontos)
RIOS = [
    ('Amazonas', [
        (-73.5,-3.0), (-70.0,-3.2), (-65.0,-3.0), (-60.0,-3.1),
        (-55.0,-2.0), (-52.0,-1.8), (-48.5,-1.5),
    ]),
    ('Solimões', [
        (-73.5,-3.0), (-70.0,-3.2), (-65.0,-3.0), (-60.5,-3.4),
    ]),
    ('Negro', [
        (-65.0,-1.5), (-62.5,-1.8), (-60.0,-3.1),
    ]),
    ('Tocantins', [
        (-48.0,-13.0), (-48.3,-10.2), (-48.2,-6.0), (-48.5,-1.5),
    ]),
    ('São Francisco', [
        (-47.0,-14.5), (-43.0,-18.0), (-40.5,-15.0),
        (-38.0,-11.5), (-36.5,-10.5),
    ]),
    ('Paraná', [
        (-51.0,-17.0), (-54.5,-22.0), (-57.5,-26.0), (-57.5,-30.0),
    ]),
    ('Paraguai', [
        (-58.0,-14.0), (-57.5,-18.0), (-57.5,-24.0),
    ]),
    ('Araguaia', [
        (-51.5,-16.0), (-50.5,-12.0), (-49.5,-8.0), (-48.5,-5.5),
    ]),
    ('Xingu', [
        (-53.0,-10.0), (-52.5,-7.0), (-51.5,-3.0),
    ]),
    ('Tapajós', [
        (-57.5,-10.0), (-56.0,-7.5), (-55.0,-4.0), (-54.5,-2.5),
    ]),
    ('Madeira', [
        (-65.5,-9.5), (-63.5,-8.0), (-61.0,-5.5), (-58.5,-3.5),
    ]),
]

# Rodovias simplificadas: (nome, pontos)
RODOVIAS = [
    ('BR-101', [
        (-37.0,5.3), (-35.0,-8.0), (-38.5,-13.0),
        (-40.5,-22.0), (-43.2,-22.9), (-48.5,-26.0),
        (-51.2,-30.0), (-52.0,-34.0),
    ]),
    ('BR-116', [
        (-38.5,-3.7), (-40.0,-13.0), (-43.5,-20.0),
        (-46.6,-23.5), (-49.3,-25.4), (-51.2,-30.0),
    ]),
    ('BR-364', [
        (-47.9,-15.8), (-54.6,-20.4), (-60.0,-10.0),
        (-63.9,-8.8), (-67.8,-9.9),
    ]),
    ('BR-230', [
        (-48.5,-1.5), (-55.0,-6.0), (-63.9,-8.8),
    ]),
]

# Áreas de desmatamento: arco do desmatamento (PA/MT/RO)
DESMATAMENTO_AREAS = [
    [(-58.0,-8.0), (-55.0,-8.0), (-54.0,-11.0), (-56.0,-13.0), (-58.5,-11.0)],
    [(-54.0,-6.0), (-51.0,-8.0), (-50.5,-10.5), (-53.0,-9.0)],
    [(-63.5,-8.0), (-60.0,-8.0), (-60.5,-11.0), (-63.0,-11.0)],
]

def gen_brazil_layers():
    # Biomas
    bioma_paths = []
    for bname, bcolor, bpts in BIOMAS:
        d = pts_to_path(BZ, bpts)
        bioma_paths.append(
            f'    <path data-name="{bname}" fill="{bcolor}" opacity=".85"'
            f' stroke="none" d="{d}"/>'
        )

    # Cidades
    city_els = []
    for cname, clon, clat in CIDADES:
        cx, cy = BZ(clon, clat)
        r = '6' if cname in CAPITAIS else '4'
        sym = '★' if cname in CAPITAIS else '●'
        city_els.append(
            f'    <circle cx="{cx}" cy="{cy}" r="{r}" class="city-dot"'
            f' data-name="{cname}"/>'
        )
        city_els.append(
            f'    <text x="{cx+7}" y="{cy+4}" class="city-label">{cname}</text>'
        )

    # Rios
    rio_paths = []
    for rname, rpts in RIOS:
        pl = pts_to_line(BZ, rpts)
        rio_paths.append(
            f'    <polyline data-name="{rname}" class="rio-line" points="{pl}"/>'
        )

    # Rodovias
    rod_paths = []
    for rdname, rdpts in RODOVIAS:
        pl = pts_to_line(BZ, rdpts)
        rod_paths.append(
            f'    <polyline data-name="{rdname}" class="rod-line" points="{pl}"/>'
        )

    # Desmatamento
    desm_paths = []
    for dpts in DESMATAMENTO_AREAS:
        d = pts_to_path(BZ, dpts)
        desm_paths.append(
            f'    <path fill="#d40000" opacity=".45" stroke="#d40000"'
            f' stroke-width=".8" d="{d}"/>'
        )

    outline_d = pts_to_path(BZ, BRAZIL_OUTLINE)

    return textwrap.dedent(f'''\
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 610"
         role="img" aria-label="Mapa do Brasil com camadas temáticas">
      <title>Brasil — Camadas Temáticas</title>
      <desc>Mapa interativo com camadas: biomas, cidades, rios, rodovias e desmatamento.</desc>
      <defs>
        <style>
          .map-layer-hidden {{ display:none; }}
          .city-dot {{ fill:#e05a00; stroke:#f2ede3; stroke-width:.8; cursor:pointer;
                       transition:r .1s; }}
          .city-dot:hover {{ r:6; }}
          .city-label {{ font-family:"DM Mono",monospace; font-size:7px; fill:#1e3a5f;
                         pointer-events:none; }}
          .rio-line {{ fill:none; stroke:#3a80a0; stroke-width:1.4;
                       stroke-linecap:round; stroke-linejoin:round; }}
          .rod-line {{ fill:none; stroke:#8b5e2e; stroke-width:1; stroke-dasharray:5,3;
                       stroke-linecap:round; stroke-linejoin:round; }}
          .graticule {{ stroke:rgba(30,58,95,.1); stroke-width:.5; fill:none; stroke-dasharray:3,5; }}
        </style>
      </defs>

      <!-- Oceano -->
      <rect width="560" height="610" fill="#8dbdd1"/>

      <!-- Graticule -->
      <line class="graticule" x1="0" y1="{BZ(0,0)[1]}" x2="560" y2="{BZ(0,0)[1]}"/>
      <line class="graticule" x1="0" y1="{BZ(0,-23.4)[1]}" x2="560" y2="{BZ(0,-23.4)[1]}"/>

      <!-- Contorno do país -->
      <path fill="#e8dfc8" stroke="#8b7d68" stroke-width="1"
            d="{outline_d}"/>

      <!-- ── Camada: Biomas ─────────────────────────── -->
      <g data-layer="biomas">
    {chr(10).join(bioma_paths)}
      </g>

      <!-- ── Camada: Cidades ────────────────────────── -->
      <g data-layer="cidades" class="map-layer-hidden">
    {chr(10).join(city_els)}
      </g>

      <!-- ── Camada: Rios ───────────────────────────── -->
      <g data-layer="rios" class="map-layer-hidden">
    {chr(10).join(rio_paths)}
      </g>

      <!-- ── Camada: Rodovias ───────────────────────── -->
      <g data-layer="rodovias" class="map-layer-hidden">
    {chr(10).join(rod_paths)}
      </g>

      <!-- ── Camada: Desmatamento ───────────────────── -->
      <g data-layer="desmatamento" class="map-layer-hidden">
    {chr(10).join(desm_paths)}
        <!-- Legenda interna da camada -->
        <rect x="18" y="18" width="120" height="20" rx="3"
              fill="rgba(242,237,227,.9)" stroke="#d40000" stroke-width="1"/>
        <rect x="24" y="24" width="10" height="8" fill="#d40000" opacity=".45"/>
        <text x="40" y="31" font-family="monospace" font-size="8" fill="#d40000">
          Área desmatada
        </text>
      </g>

      <!-- Rosa dos ventos -->
      <g transform="translate(500,555)">
        <circle r="26" fill="rgba(242,237,227,.9)" stroke="#c8bfa8" stroke-width="1"/>
        <polygon points="0,-19 -4,-5 4,-5" fill="#c4a35a"/>
        <polygon points="0,19 -4,5 4,5"   fill="#1e3a5f" opacity=".55"/>
        <line x1="-19" y1="0" x2="19" y2="0" stroke="#1e3a5f" stroke-width="1" opacity=".4"/>
        <text text-anchor="middle" y="-21" font-family="monospace" font-size="9"
              font-weight="700" fill="#c4a35a">N</text>
      </g>
    </svg>
    ''')

# ── Gravar arquivos ──────────────────────────────────────────────────

def write(filename, content):
    path = os.path.join(OUT, filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    size = os.path.getsize(path)
    print(f'  {filename}: {size} bytes')

if __name__ == '__main__':
    print('Gerando mapas...')
    write('brazil-regions.svg', gen_brazil_regions())
    write('world-simple.svg',   gen_world())
    write('brazil-layers.svg',  gen_brazil_layers())
    print('Concluído.')
