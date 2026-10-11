# Tuncay Ünal — Portfolio

My personal software engineering portfolio covering backend systems, full-stack products, AI-supported learning, and real-time 3D applications.

**Live site:** https://tuncay-portfolio.pages.dev/

## Tech stack

- Astro
- TypeScript
- React
- Three.js
- Custom CSS
- Cloudflare Pages

The site follows a static-first architecture. React is used selectively for interactive project demonstrations, while Three.js is loaded only when needed for the spatial experience.

## Local development

Requires Node.js 22+ and npm.

```bash
npm ci
npm run dev
```

Useful commands:

```bash
npm run check
npm run build
npm run preview
```

The production build is generated in `dist/`.

## Project structure

```text
src/
├── components/     Reusable UI and interactive project components
├── data/           Project media metadata
├── pages/          Portfolio pages
├── scripts/        Site interactions and 3D behaviour
└── styles/         Global and media-specific styles

public/
├── media/          Optimized project images and demo videos
└── Tuncay_Unal_Resume.pdf

docs/               Supporting content and media documentation
```

## Accessibility and performance

The portfolio is designed to remain usable without relying on heavy client-side behaviour.

It includes:

- semantic HTML and keyboard-accessible navigation
- visible focus states
- `prefers-reduced-motion` support
- responsive and lazy-loaded media
- self-hosted fonts
- accessible fallbacks for the interactive 3D experience
- selectively loaded JavaScript and Three.js

Project videos are user-initiated rather than autoplayed, and important content remains accessible even when WebGL or motion is unavailable.

## Deployment

The portfolio is statically built with Astro and automatically deployed to Cloudflare Pages from the `main` branch.

GitHub Pages independently builds and deploys the same branch through `.github/workflows/pages.yml` at https://tunc0x.github.io/tuncay-portfolio/. In the repository's Pages settings, the publishing source must be **GitHub Actions**.

The GitHub Pages workflow sets `GITHUB_PAGES=true`, selecting `https://tunc0x.github.io` and the `/tuncay-portfolio` base path. Cloudflare keeps its existing build command, root base path and `SITE_URL` / `CF_PAGES_URL` settings. Canonical URLs, social-preview URLs and public asset paths follow the selected deployment.

To build the GitHub Pages version locally:

```bash
GITHUB_PAGES=true npm run build
```

## Attribution

External design references were used only as visual inspiration. The portfolio implementation, layouts, interactions, and project presentation are original. Third-party libraries and fonts remain under their respective licenses.
