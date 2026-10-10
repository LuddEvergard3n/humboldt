# Humboldt — Sistema de Mapas

## Mapa editorial da página inicial

A abertura usa `assets/maps/world-robinson-public-domain.png`, uma reprodução local do mapa político compacto em projeção Robinson disponibilizado em domínio público pelo Wikimedia Commons. A camada de rotas é apenas editorial e não representa fluxos quantitativos. Os mapas analíticos continuam separados em `assets/maps/*.svg`.

## Filosofia

Os mapas do Humboldt são SVGs inline ou carregados via fetch. Não há biblioteca cartográfica externa. Isso mantém o projeto leve, controlável e sem dependências.

As bases do Atlas são geradas localmente a partir do Natural Earth 1:110m
(mundo), da malha de Unidades da Federação do IBGE e dos polígonos de biomas do
IBGE na escala 1:5.000.000. Os arquivos-fonte ficam em
`tools/cartography-source/`; a versão publicada consome apenas SVGs estáticos e
não depende de rede, API ou biblioteca cartográfica em execução.

A fonte oficial dos biomas é `Biomas_5000mil.zip`, publicada no diretório de
vetores ambientais do IBGE. O utilitário `tools/import-ibge-biomes.mjs` converte
os arquivos SHP e DBF para o GeoJSON versionado, sem dependência externa. O
gerador `tools/generate-map-assets.mjs` usa somente os seis biomas continentais;
as quatro classes de água presentes na base não são apresentadas como biomas.

Os mapas temáticos são sínteses pedagógicas sobre geometrias geográficas reais.
Eles priorizam legibilidade e interatividade e não devem ser usados para
navegação ou medição precisa.

## Convenções SVG

### Regiões Interativas

Todo elemento clicável deve ter:

```svg
<path
  data-id="centro-oeste"
  data-name="Centro-Oeste"
  class="region"
  ...
/>
```

- `data-id`: valor que será comparado com `activity.correct`
- `data-name`: texto exibido no tooltip
- `class="region"` (ou qualquer classe): para estilo CSS

### Camadas (`data-layer`)

Grupos que podem ser ocultados pelo `LayerEngine`:

```svg
<g id="layer-rios" data-layer="rios">
  <!-- elementos da camada de rios -->
</g>
```

O `LayerEngine.discoverLayers()` encontra todos os elementos com `data-layer` e os registra.

### Fluxos (`FlowEngine`)

O `FlowEngine` injeta um `<g id="flow-layer">` no SVG com as setas animadas. O SVG base precisa ter um `viewBox` definido.

Coordenadas de fluxos são em **porcentagem do viewBox** (0..100), para que funcionem independentemente do tamanho do SVG:

```json
{ "from": [62, 42], "to": [28, 48], "value": 80 }
```

## MapEngine

O `MapEngine` espera receber o conteúdo SVG como string:

```js
const svgContent = await loadSVG('assets/maps/brazil-regions.svg');
const engine = new MapEngine(container, {
  svgContent,
  onRegionClick: (id, name) => { /* ... */ },
  zoomable: false,
});
engine.mount();
```

No Atlas, o motor habilita zoom entre 100% e 400%, movimento opcional por
ponteiro ou setas do teclado, redefinição e mensagens em região `aria-live`.
O movimento precisa ser ativado explicitamente para não capturar a rolagem
vertical em telas sensíveis ao toque.

Após `mount()`, todos os elementos com `data-name` recebem:
- Tooltip ao hover
- Handler de click
- `tabindex="0"` para navegação por teclado
- `role="button"` para leitores de tela

Elementos gerados pelo Atlas podem usar `data-territory` e `aria-label` no lugar
de `data-name`. Títulos, fontes, avisos metodológicos e legendas ficam no catálogo
central `js/map-catalog.js`.

## LayerEngine

```js
const layers = new LayerEngine(svg, state);
layers.discoverLayers();
layers.setVisible(['biomas', 'rios']); // oculta todas as outras
layers.toggle('desmatamento');
layers.isVisible('desmatamento'); // → boolean
```

## ComparisonEngine (antes/depois)

```js
const engine = new ComparisonEngine(container, {
  beforeContent: '<svg>...</svg>',
  afterContent:  '<svg>...</svg>',
  beforeLabel:   '1970',
  afterLabel:    '2024',
  initialPos:    0.5,
});
engine.mount();
```

O divisor é arrastável com mouse, touch e teclado (setas).

## FlowEngine

```js
const flows = [
  { from: [62, 42], to: [28, 48], value: 80, label: 'Oriente Médio → Europa', color: '#8b5e2e' }
];
const engine = new FlowEngine(svg, flows, { minWidth: 2, maxWidth: 18 });
engine.mount();
```

A largura de cada seta é proporcional ao `value` relativo ao maior valor do array.

## Adicionando um Novo Mapa SVG

1. Criar o arquivo em `assets/maps/{id}.svg`
2. Adicionar `viewBox` obrigatório
3. Usar `data-id` e `data-name` nos elementos clicáveis
4. Usar `data-layer` nos grupos de camadas
5. Referenciar o `mapId` na lição em `data/lessons.json`
6. Executar os testes: `node tests/test-runner.js`

## Convenções Visuais

| Elemento             | Cor padrão       |
|----------------------|------------------|
| Oceano               | `#b3d4e8`        |
| Terra (neutra)       | `#d4c99a`        |
| Bordas               | `#c8bfa8`        |
| Hover de região      | `opacity: 0.75`  |
| Graticule            | `rgba(30,58,95,0.1)` |
| Rosa dos ventos: N   | `#c4a35a` (ouro) |
| Rosa dos ventos: base| `#1e3a5f` (navy) |
