import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
const githubPages = process.env.GITHUB_PAGES === 'true';
export default defineConfig({
  site: githubPages
    ? 'https://tunc0x.github.io'
    : process.env.SITE_URL ||
      process.env.CF_PAGES_URL ||
      'https://tuncay-portfolio.pages.dev',
  base: githubPages ? '/tuncay-portfolio' : '/',
  output: 'static',
  integrations: [react()],
  devToolbar: { enabled: false },
  server: { host: '0.0.0.0', port: 4173, allowedHosts: ['terminal.local'] },
  vite: { build: { assetsInlineLimit: 0 } },
});
