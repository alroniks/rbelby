// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { remarkModifiedTime } from './src/plugins/remark-modified-time.mjs';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ['ru', 'be', 'en'],
    defaultLocale: 'ru',
    fallback: {
      be: 'ru',
      en: 'ru',
    },
  },
  prefetch: {
    prefetchAll: true,
  },
  integrations: [react()],
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
