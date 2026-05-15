# Spec [016]: CMS Automation (Notion -> GitHub)

**Feature ID**: `016-notion-cms`

## Overview

Build the unidirectional sync from Notion to GitHub to lower the barrier for content editors.

## Implementation Tasks

- [ ] **Create the target Notion**: Create the target Notion Databases (Events, Journal) with Status properties.
- [ ] **Write the Node**: Write the Node.js script to fetch 'Review'/'Published' pages and convert them to Markdown.
- [ ] **Write the Git**: Write the Git logic to create branches and PRs automatically via GitHub Actions.
- [ ] **Implement Notion callbacks to**: Implement Notion callbacks to write PR Links, Preview Links, and Crowdin Links back to the Notion page.
