import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://raquelescuderovr.github.io/CV/',
  base: process.env.BASE_PATH ?? '/CV',
  output: 'static',
  integrations: [sitemap()],
});
