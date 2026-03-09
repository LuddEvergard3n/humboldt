# Humboldt — Guia de Desenvolvimento

## Requisitos

- Node.js >= 18 (para testes — `node:fs`, `node:path`, ESM nativo)
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+)
- Sem build step obrigatório para desenvolvimento

## Rodando Localmente

O projeto usa ES modules (`type="module"`) que exigem um servidor HTTP. Não funciona com `file://` diretamente.

**Opção 1 — Python (sem instalação extra):**
```bash
cd humboldt
python3 -m http.server 8080
# Acesse: http://localhost:8080
```

**Opção 2 — Node.js com npx:**
```bash
cd humboldt
npx serve .
# Acesse: http://localhost:3000
```

**Opção 3 — VS Code Live Server:**
Instale a extensão Live Server e clique em "Open with Live Server" no `index.html`.

## Rodando os Testes

```bash
cd humboldt
node tests/test-runner.js
```

Os testes verificam:
- Integridade dos JSONs (`data-tests.js`)
- Presença de todos os arquivos obrigatórios (`module-tests.js`)
- Lógica do State e FeedbackEngine sem DOM (`ui-tests.js`)

Exit code 0 = todos passaram. Exit code 1 = algum falhou.

## Deploy no GitHub Pages

1. Fazer push do projeto para um repositório GitHub
2. Em Settings > Pages, selecionar `main` branch e pasta `/ (root)`
3. O site estará em `https://{usuario}.github.io/{repo}/`

Não há build necessário. Todos os arquivos são estáticos.

## Adicionando Conteúdo

### Nova lição em módulo existente

1. Abrir `data/lessons.json`
2. Adicionar objeto de lição seguindo o schema em `docs/modules.md`
3. O campo `moduleId` deve corresponder a um módulo existente
4. Executar `node tests/test-runner.js` — se passar, está ok

### Novo módulo

1. Adicionar ao `data/modules.json`
2. Criar `modules/{id}/index.js` (copiar de um existente)
3. Adicionar import em `js/module-loader.js`
4. Adicionar lições em `data/lessons.json`
5. Criar SVGs em `assets/maps/` se necessário
6. Executar testes

### Novo tipo de atividade

1. Adicionar o tipo em `components/activity-engine.js` (novo `case` no `mount()`)
2. Criar o método privado `_mount{Tipo}()`
3. Documentar o contrato da atividade em `docs/modules.md`
4. Adicionar testes de validação em `tests/ui-tests.js`

## Convenções de Código

- **Sem frameworks**. HTML, CSS e JavaScript puro (ES2022).
- **Módulos ES**: sempre `import/export`, nunca `require`.
- **Sem TypeScript**: JSDoc para documentar tipos onde relevante.
- **Sem bundler**: os arquivos são servidos diretamente pelo servidor.
- **Comentários em português**: público-alvo é brasileiro.
- **JSDoc em inglês**: convenção internacional de código.
- **Uma responsabilidade por arquivo**: arquivos longos devem ser divididos.

## Variáveis CSS

Todas as cores, fontes, espaçamentos e sombras estão definidos como variáveis CSS em `css/base.css`. **Nunca usar valores hardcoded em CSS** — sempre referenciar as variáveis.

```css
/* Correto */
color: var(--color-primary);
padding: var(--space-4);

/* Incorreto */
color: #1e3a5f;
padding: 1rem;
```

## Acessibilidade

- Todo elemento interativo deve ter `tabindex` e `role` adequados
- Imagens devem ter `alt` ou `aria-label`
- Mapas SVG devem ter `role="img"` e `aria-label`
- Feedback de atividades deve ser anunciado via `window._humboldtAnnounce()`
- Testar com teclado (Tab, Enter, Space, Esc, Setas)

## Changelog

Toda alteração significativa deve ser registrada em `CHANGELOG.md` seguindo o formato:

```markdown
## [versão] — AAAA-MM-DD
### Adicionado
- Descrição da novidade

### Corrigido
- Descrição do bug corrigido

### Alterado
- Descrição da mudança em funcionalidade existente
```
