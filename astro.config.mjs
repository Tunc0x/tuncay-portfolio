import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
export default defineConfig({
  site: process.env.SITE_URL || process.env.CF_PAGES_URL || undefined,
  output: 'static',
  integrations: [react()],
  devToolbar: { enabled: false },
  server: { host: '0.0.0.0', port: 4173, allowedHosts: ['terminal.local'] },
  vite: { build: { assetsInlineLimit: 0 } },
});
