# Humboldt — Atlas Interativo de Geografia

**Humboldt** é uma ferramenta educacional web para ensinar o aluno a **ver o espaço, ler mapas, interpretar relações** e perceber que vive dentro da Geografia — não apenas diante dela.

Faz parte de um ecossistema educacional que inclui:
[Heródoto](https://luddevergard3n.github.io/Herodoto/) · [Euclides](https://luddevergard3n.github.io/euclides/) · [Quintiliano](https://luddevergard3n.github.io/quintiliano/) · [Johnson English](https://luddevergard3n.github.io/johnson-english/)

---

## Objetivo Pedagógico

A maior dor da Geografia escolar é que ela fala do mundo real mas é ensinada como lista morta de nomes, climas, capitais e definições. O Humboldt resolve isso transformando Geografia em algo visual, relacional, concreto e escalável por nível.

O aluno deve conseguir entender, por exemplo:
- por que certos bairros alagam
- por que alimentos encarecem
- por que povos migram
- por que há guerra por território
- por que certas regiões concentram riqueza
- por que cidade, relevo, água e trabalho não são temas separados

---

## Stack

| Tecnologia   | Uso                             |
|--------------|---------------------------------|
| HTML5        | Estrutura e semântica           |
| CSS3         | Estilo, layout, responsividade  |
| JavaScript ES2022 | Lógica modular, sem framework |
| SVG          | Mapas interativos e fluxos      |
| JSON         | Separação de conteúdo e motor   |
| Node.js 18+  | Testes automatizados            |

**Sem React. Sem Vue. Sem Angular. Sem bundler. Sem backend.**

---

## Módulos Disponíveis

| # | Módulo                     | Escalas                  |
|---|----------------------------|--------------------------|
| 1 | Cartografia Viva           | local → global           |
| 2 | Paisagem e Transformação   | local, regional          |
| 3 | Brasil Espacial            | regional, nacional       |
| 4 | População e Migração       | regional → global        |
| 5 | Cidade, Campo e Trabalho   | local → nacional         |
| 6 | Economia e Globalização    | nacional, global         |
| 7 | Geopolítica                | regional → global        |
| 8 | Redes e Globalização       | global                   |

---

## Rodando Localmente

Requer um servidor HTTP local (ES modules não funcionam com `file://`):

```bash
# Python 3
python3 -m http.server 8080

# Node.js
npx serve .
```

Acesse `http://localhost:8080`.

---

## Testes

```bash
node tests/test-runner.js
```

Verifica integridade dos JSONs, presença de arquivos obrigatórios e lógica dos motores. Sem dependências externas.

---

## Estrutura do Projeto

```
humboldt/
├── index.html
├── css/           ← base, theme, layout, components, mobile
├── js/            ← main, router, state, ui, accessibility, loaders
├── engine/        ← map, layer, comparison, flow, feedback, hint
├── components/    ← activity-engine, views/
├── modules/       ← 8 módulos pedagógicos
├── data/          ← modules.json, lessons.json
├── assets/maps/   ← SVGs cartográficos
├── tests/         ← test-runner, data-tests, module-tests, ui-tests
└── docs/          ← architecture, pedagogy, modules, map-system, development-guide
```

Ver `/docs/architecture.md` para documentação técnica completa.

---

## Deploy

Compatível com **GitHub Pages** sem configuração adicional. Todos os arquivos são estáticos. Não há build step.

---

## Documentação

| Documento                      | Conteúdo                                      |
|--------------------------------|-----------------------------------------------|
| `docs/architecture.md`         | Arquitetura, fluxo de inicialização, roteamento |
| `docs/pedagogy.md`             | Filosofia, estrutura de lição, modo professor |
| `docs/modules.md`              | Schema JSON, referência de módulos e lições   |
| `docs/map-system.md`           | SVGs, camadas, fluxos, convenções visuais     |
| `docs/development-guide.md`    | Setup, deploy, convenções de código           |
| `CHANGELOG.md`                 | Histórico de versões                          |

---

## Licença

MIT. Ver `LICENSE`.
