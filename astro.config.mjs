// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://acurruco.com',
  trailingSlash: 'always',
  integrations: [sitemap({ changefreq: 'daily', lastmod: new Date() })],
  build: { format: 'directory' },
});
