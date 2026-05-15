# Randonneurs Belarus (rbelby) Website

Welcome to the source repository for the official website of Randonneurs Belarus!

This site is statically generated using **Astro**, styled with **Tailwind CSS 4** and **Preline UI**, and its entire content is managed without a traditional database. Instead, data lives in this repository as Markdown/JSON files (managed via **Obsidian**) and is synchronized with a **Notion Headless CMS**.

This README provides instructions for two main audiences:

1. **Content Editors & Authors** (who write articles and add events).
2. **Developers & AI Agents** (who build the site's functionality).

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

The Randonneurs Belarus website is built with a **Static-First Architecture** emphasizing performance, SEO, and simplicity.

### Tech Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS 4
- **UI Components**: Preline UI (Vanilla JavaScript plugins only)
- **Database**: The `rbelby/` folder (Markdown/JSON)
- **CMS Automation**: GitHub Actions + Notion API + Crowdin
- **Hosting**: Cloudflare Pages

### 🛑 Strict Architectural Rules

- **No React/Vue/Svelte**: The project relies exclusively on `.astro` components. Client-side interactivity must be handled by Vanilla JavaScript or Preline UI's native JS plugins.
- **Content as Data**: Do not hardcode content into components. Content must flow from the `rbelby/` directory via Astro Content Collections (`src/content.config.ts`).
- **Single Source of Truth**: Read `docs/CONSTITUTION.md` for the full architectural rules.

### Local Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the development server**:
   ```bash
   npm run dev
   ```
   _The site will be available at `http://localhost:4321`._

### Code Quality & Workflows

Before committing any code, ensure you run the formatter to maintain a consistent codebase:

```bash
npm run format
```

If you are an AI Agent (like Gemini) or a developer using one, please refer to our workflow guide:

- 📖 **Workflow Guide**: `docs/WORKFLOW.md`
- 🏗️ **Architecture Rules**: `docs/CONSTITUTION.md`
- 🗺️ **Roadmap & Milestones**: `docs/ROADMAP.md`
- 📝 **Active Specs**: `docs/specs/`

### Deployment

This site is automatically deployed via **Cloudflare Pages**. Pushes to the `main` branch trigger a production build (`npm run build`).

---

_Developed with ❤️ and Gemini CLI._
