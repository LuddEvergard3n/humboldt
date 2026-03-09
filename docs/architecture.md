# Humboldt — Arquitetura do Sistema

## Visão Geral

Humboldt é uma aplicação web estática, 100% client-side, sem backend, sem build step obrigatório. Roda diretamente no GitHub Pages via arquivos HTML, CSS e JavaScript ES2022 modules.

## Camadas do Sistema

```
┌─────────────────────────────────────┐
│         Camada de Navegação         │  Router, hash-based SPA
├─────────────────────────────────────┤
│       Camada de Interpretação       │  Map Engine, Layer Engine,
│                                     │  Comparison Engine, Flow Engine
├─────────────────────────────────────┤
│        Camada de Aplicação          │  Activity Engine, Feedback,
│                                     │  Hint System
└─────────────────────────────────────┘
```

## Estrutura de Diretórios

```
humboldt/
├── index.html               # Ponto de entrada único
├── css/                     # Estilos por responsabilidade
│   ├── base.css             # Reset, variáveis CSS, tipografia
│   ├── theme.css            # Tema, alto contraste, modo professor
│   ├── layout.css           # Header, footer, regiões de layout
│   ├── components.css       # Componentes reutilizáveis
│   └── mobile.css           # Responsividade e breakpoints
├── js/                      # Núcleo da aplicação
│   ├── main.js              # Ponto de entrada; orquestra subsistemas
│   ├── router.js            # Roteador por hash (SPA)
│   ├── state.js             # Estado global com notificação
│   ├── ui.js                # Chrome da interface (header, nav)
│   ├── accessibility.js     # Painel a11y, preferências persistidas
│   ├── data-loader.js       # Fetch com cache de JSON e SVG
│   └── module-loader.js     # Import dinâmico de módulos pedagógicos
├── engine/                  # Motores de visualização e interação
│   ├── map-engine.js        # Renderização SVG, tooltip, zoom
│   ├── layer-engine.js      # Visibilidade de camadas no SVG
│   ├── comparison-engine.js # Slider antes/depois
│   ├── flow-engine.js       # Setas animadas de fluxo
│   ├── feedback-engine.js   # Validação de atividades
│   └── hint-system.js       # Dicas progressivas
├── components/
│   ├── activity-engine.js   # Orquestra atividades por tipo
│   ├── globe-decoration.js  # SVG decorativo da home
│   └── views/               # Renderers de views pelo router
│       ├── home-view.js
│       ├── module-view.js
│       ├── lesson-view.js
│       └── scale-view.js    # Também exporta renderPhenomenon
├── modules/                 # Índices dos módulos pedagógicos
│   ├── cartography/index.js
│   ├── landscape/index.js
│   └── ... (8 módulos)
├── data/                    # Conteúdo separado do motor
│   ├── modules.json
│   └── lessons.json
├── assets/
│   └── maps/                # SVGs cartográficos
└── tests/                   # Testes automatizados Node.js
    ├── test-runner.js
    ├── data-tests.js
    ├── module-tests.js
    └── ui-tests.js
```

## Fluxo de Inicialização

```
DOMContentLoaded
  └── main.js::init()
       ├── new State()          → estado global
       ├── new Router(state)    → roteador
       ├── new UI(state,router) → bindings do chrome
       ├── new Accessibility()  → a11y + preferências
       └── router.start()
            └── _route()        → lê hash → renderer → injeta no DOM
```

## Roteamento

O roteador usa `window.location.hash`. Todas as rotas são prefixadas com `#`:

| Hash                      | View              |
|---------------------------|-------------------|
| `#home`                   | Home              |
| `#module/cartography`     | Módulo            |
| `#lesson/brazil/brazil-1` | Lição             |
| `#scale/regional`         | Navegação escala  |
| `#phenomenon/water`       | Navegação fenômeno|

## Estado Global (State)

O `State` é um store simples sem Proxy. Toda mudança passa por `state.set(key, value)` e notifica callbacks registrados via `state.on(key, fn)`. Sem imutabilidade forçada — simplicidade intencional.

## Separação Motor / Conteúdo

Todo conteúdo educacional está em `data/*.json`. O motor (engine/, components/, js/) não contém texto de lição. Isso permite:

- Adicionar lições sem tocar no código
- Traduzir conteúdo sem refatorar
- Testar o motor independentemente do conteúdo
