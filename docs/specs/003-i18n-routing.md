# Spec [003]: i18n Routing Structure

**Feature ID**: `003-i18n-routing`

## Overview

Configure the site to support multiple languages (Russian as default, Belarusian, English). This needs to be done early so we don't have to rewrite URLs later.

## Implementation Tasks

- [ ] Configure `astro.config.mjs` for i18n (`ru` default without prefix, `/be/`, `/en/`).
- [ ] Setup UI translation dictionaries (`src/i18n/locales/`).
- [ ] Build a Language Switcher dropdown component for the Header.
- [ ] Create utility functions for generating localized paths.
