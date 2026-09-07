// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Astro 7 — Tango Untitled rebuild
// Reads ASTRO_SITE / ASTRO_BASE from env so the same source can build for
// GH Pages subpath (preview) and root-domain CF Pages (production).
export default defineConfig({
  site: process.env.ASTRO_SITE || 'https://www.tangountitled.com',
  base: process.env.ASTRO_BASE || '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
