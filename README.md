# Randonneurs Belarus Website

https://rbel.by

Welcome to the source repository for the official website of Randonneurs Belarus!

The site is built with **Astro** and **Tailwind CSS 4**. Brevets, clubs, results and riders come live from [Brevly](https://brevly.app), where Belarusian clubs run their events; rbel.by is the region's public home for that data. Learn pages and site settings live in this repository as Markdown/JSON (managed via **Obsidian**).

## 🚀 The Vision

A "ready, alive website" with no rebuild lag: an organizer saves an event in Brevly and it shows on rbel.by right away. Registration and rider accounts stay on Brevly; rbel.by adds the region's own story, rules and guides. See [ADR-0003](docs/adr/0003-live-data-from-brevly.md).

---

## ✍️ For Content Editors & Authors

- **Events and clubs**: edited by club organizers in Brevly (`brevly.app/dash`), not here.
- **Learn pages and site settings**: Markdown/JSON in the `rbelby/` folder. Clone the repository, open `rbelby` as an [Obsidian](https://obsidian.md/) vault, edit, and open a pull request. Translations go through Crowdin.

---

## 💻 For Developers & AI Agents

Pages are prerendered by default; live data renders on demand on Cloudflare Workers. If you want to contribute code, please read our **[CONTRIBUTING.md](CONTRIBUTING.md)** guide.

**Tech Stack Summary**: Astro 6.x on Cloudflare Workers, Tailwind CSS 4, vanilla JS, Brevly public API (ConnectRPC), and a flat-file vault (`rbelby/`).

### 🛑 Strict Architectural Rules

- **No React/Vue/Svelte**: The project relies exclusively on `.astro` components. Interactivity must use Vanilla JS.
- **Content as Data**: Do not hardcode content into components. Live data only through `src/lib/brevly/`.
- **Single Source of Truth**: Read our **[Constitution](docs/CONSTITUTION.md)** for the absolute architectural rules.

### Resources

- 🤖 **AI Instructions**: [`GEMINI.md`](GEMINI.md)
- 🤝 **Contributing & Workflow**: [`CONTRIBUTING.md`](CONTRIBUTING.md)
- 🏗️ **Architecture Rules**: [`docs/CONSTITUTION.md`](docs/CONSTITUTION.md)
- 🗺️ **Specs & Milestones**: [`docs/specs/README.md`](docs/specs/README.md)
- 🔁 **Workflow**: [`docs/agents/workflow.md`](docs/agents/workflow.md)

### Deployment

Today the site deploys via **Cloudflare Pages** when a GitHub release is published. Spec 0018 moves it to **Cloudflare Workers** (`wrangler deploy`). The Brevly API endpoint is set with `BREVLY_API_URL`.

---

_Developed with ❤️ and Gemini CLI._
