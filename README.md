# Humboldt

![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=111111)
![SVG](https://img.shields.io/badge/SVG-Interactive_Maps-FFB13B?logo=svg&logoColor=111111)
![Lessons](https://img.shields.io/badge/Lessons-146-7C3AED)
![Tests](https://img.shields.io/badge/Tests-488-2563EB)

Interactive geography atlas designed to connect maps, spatial scales, human systems, and real-world geographic processes.

## Educational scope

Humboldt treats geography as a system of relationships rather than a list of locations and definitions. Its 41 content groups and 146 lessons move across physical geography, cities, population, economics, environment, geopolitics, and higher-education articles.

Learners can investigate questions such as why neighborhoods flood, why food prices change, why populations migrate, and how territory, water, relief, labor, and wealth interact.

## Technology

| Layer | Technology |
|---|---|
| Interface | Semantic HTML5 and responsive CSS3 |
| Application | Native JavaScript ES2022 modules |
| Maps and flows | SVG |
| Content | JSON |
| Tests | Node.js 18 or later |

## Features

- Interactive maps across multiple spatial scales.
- Lesson, article, glossary, activity, and feedback engines.
- Lazy loading for 39 modules.
- Teacher mode with objectives, answers, mediation prompts, and timing.
- Keyboard-accessible interactions and responsive layouts.
- Static deployment with no backend.

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Tests

```bash
node tests/test-runner.js
```

Expected result: 488 passing checks and no failures.

## Structure

```text
css/          Layout, typography, design tokens, and responsive rules
js/           Router, state, UI, loaders, and interaction engines
data/         Modules, lessons, articles, maps, and exercises
tests/        Dependency-free automated checks
docs/         Content and architecture guidance
```

Content schemas define lessons, higher-education articles, and SVG interaction contracts independently from their renderers. This keeps new material auditable and avoids embedding curriculum data in UI code.

## Live version

[luddevergard3n.github.io/humboldt](https://luddevergard3n.github.io/humboldt/)

## License

See [LICENSE](LICENSE).
