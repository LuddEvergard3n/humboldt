# Humboldt — Sistema de Mapas

## Filosofia

Os mapas do Humboldt são SVGs inline ou carregados via fetch. Não há biblioteca cartográfica externa. Isso mantém o projeto leve, controlável e sem dependências.

Os mapas são **esquemáticos** — não são mapas de alta precisão topográfica. São instrumentos pedagógicos que priorizam legibilidade e interatividade sobre exatidão geométrica.

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

Após `mount()`, todos os elementos com `data-name` recebem:
- Tooltip ao hover
- Handler de click
- `tabindex="0"` para navegação por teclado
- `role="button"` para leitores de tela

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
