# Randonneurs Belarus Website

https://rbel.by

Welcome to the source repository for the official website of Randonneurs Belarus!

This site is statically generated using **Astro**, styled with **Tailwind CSS 4** and **Preline UI**, and its entire content is managed without a traditional database. Instead, data lives in this repository as Markdown/JSON files (managed via **Obsidian**) and is synchronized with a **Notion Headless CMS**.

## 🚀 The Vision

Our goal is to build a "ready, alive website" that minimizes technical debt and maximizes content velocity. To achieve this, we treat **Content as Data** and the **Site as a Static Viewer**. Content editors manage markdown files seamlessly, Astro securely compiles those files into a blazing-fast static site, and Artificial Intelligence (via Gemini) accelerates our development workflow. 

By avoiding heavy databases and complex client-side frameworks, we ensure the project is easily maintainable by the open-source community for years to come.

---

## ✍️ For Content Editors & Authors

You don't need to know how to code to add content to the site. We offer two ways to contribute, depending on your technical comfort level.

_Note: A detailed, step-by-step guide with screenshots is available on the website itself at `/how-to-contribute`._

### Option A: The Easy Way (Notion CMS)

For writing Journal articles or Event announcements, we use Notion as our CMS.

1. **Get Access**: Request an invite to the official Randonneurs Belarus Notion Workspace.
2. **Draft**: Create a new page in the `Events` or `Journal` database. Write your text and fill in the required properties (Date, Distance, etc.).
3. **Review**: Change the page status to `Review`. Our automated bot will create a preview link and paste it into the Notion page so you can see how it looks on the site.
4. **Publish**: Once approved by an admin, the status changes to `Published`, and the content goes live. Translation links (Crowdin) will automatically appear in Notion.

### Option B: The Technical Way (Obsidian & Git)

For managing complex data (like GPS Routes, Clubs, or deep site structure), or if you prefer local Markdown tools:

1. **Get the Repository**: Clone this repository to your computer using Git or GitHub Desktop.
2. **Open the Vault**: Install [Obsidian](https://obsidian.md/) and open the `rbelby` folder as your vault.
3. **Edit and Commit**: Create/edit Markdown files. Ensure your YAML frontmatter is correct. Commit and push your changes to the `main` branch.

---

## 💻 For Developers & AI Agents

The site uses a **Static-First Architecture**. If you want to contribute code, please read our **[CONTRIBUTING.md](CONTRIBUTING.md)** guide.

**Tech Stack Summary**: Astro 6.x, Tailwind CSS 4, Preline UI (Vanilla JS), and a Flat-File CMS (`rbelby/`).

### 🛑 Strict Architectural Rules

- **No React/Vue/Svelte**: The project relies exclusively on `.astro` components. Interactivity must use Vanilla JS.
- **Content as Data**: Do not hardcode content into components.
- **Single Source of Truth**: Read our **[Constitution](docs/CONSTITUTION.md)** for the absolute architectural rules.

### Resources

- 🤖 **AI Instructions**: [`GEMINI.md`](GEMINI.md)
- 🤝 **Contributing & Workflow**: [`CONTRIBUTING.md`](CONTRIBUTING.md)
- 🏗️ **Architecture Rules**: [`docs/CONSTITUTION.md`](docs/CONSTITUTION.md)
- 🗺️ **Roadmap & Milestones**: [`docs/ROADMAP.md`](docs/ROADMAP.md)
- 📝 **Active Specs**: `docs/specs/`

### Deployment

This site is automatically deployed via **Cloudflare Pages**. Pushes to the `main` branch trigger a production build (`npm run build`).

---

_Developed with ❤️ and Gemini CLI._
