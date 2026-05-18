# rbelby

## 0.2.0

### Minor Changes

- 6613030: **Finish setuping global layout, implement the proper theme switching**
- e3d5de3: **Multi-language support and routing structure**

  This commit implements the specifications for i18n routing, providing a
  full structure for Russian (default), Belarusian, and English content.
  - Disabled default locale prefixing in Astro config and established
    directory proxies.
  - Setup translation dictionaries (`ru.json`, `be.json`, `en.json`) for
    the homepage, navigation, and footer.
  - Added robust path translation utility (`useTranslatedPath`).
  - Moved the language switcher to a more stable location next to the
    theme toggle to avoid layout shifting.
  - Resolved TypeScript errors in Navbar.
  - Updated agent instructions for manual commit control.

- 3f9e979: **Implement i18n and massive design updates**

### Patch Changes

- 49fda27: **Setup and configure design.md spec for the project, update logo and fonts**

## 0.1.0

### Minor Changes

- Implement core architecture including Astro 6, Tailwind 4, Preline, and setup Changesets for tracking semantic pull request changes.
