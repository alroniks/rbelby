# Spec [002]: Global Layout & Theming

**Feature ID**: `002-global-layout`

## Overview

Build the global App shell (`Layout.astro`) that will wrap every page on the site. This includes the global Header (Navigation), Footer, and the crucial Dark/Light theme switcher.

## Implementation Tasks

- [ ] **Create `src/layouts/Layout**: Create `src/layouts/Layout.astro` with proper HTML structure.
- [ ] **Build the global Header**: Build the global Header component (Desktop and Mobile drawer navigation).
- [ ] **Build the global Footer component**: Build the global Footer component.
- [ ] **Implement the Theme Switcher**: Implement the Theme Switcher toggle in the Header (Vanilla JS, reading/writing to `localStorage`, applying Tailwind `dark:` classes).
- [ ] **Ensure the Vanilla JS**: Ensure the Vanilla JS theme script works with Astro View Transitions (listen to `astro:page-load`).
