# Tuncay Ünal — Portfolio

A personal software engineering portfolio spanning backend systems, full-stack products, AI-supported learning and real-time 3D.

## Stack

- Astro static generation and TypeScript
- React islands for the event pipeline, scheduler preview and concept map
- Custom CSS, native Web Animations and SVG diagrams
- Three.js, dynamically imported when the spatial section is visible on capable desktop devices, or explicitly requested on other devices
- Self-hosted Manrope and IBM Plex Mono fonts

No database, API keys, analytics, paid service or backend is needed. The scheduler is a local, illustrative preview, not a second deployed scheduling service.

## Local development

Requires Node.js 22.12+ and npm. `.nvmrc` selects Node 22.

```sh
npm ci
npm run dev
```

Open the local address printed by Astro. The development server uses port 4173.

```sh
npm run check
npm run build
npm run preview
```

The production build runs Astro/TypeScript checks and generates static files in `dist/`.

## Deployment: GitHub → Cloudflare Pages

Connect this repository to **Cloudflare Pages** with these settings:

| Setting                | Value               |
| ---------------------- | ------------------- |
| Production branch      | `main`              |
| Framework preset       | Astro               |
| Root directory         | Repository root     |
| Build command          | `npm run build`     |
| Build output directory | `dist`              |
| Node version           | `22` (via `.nvmrc`) |

Use the Pages free plan and the project's assigned `*.pages.dev` address. Pushes to `main` trigger production builds once Git integration is connected. No Worker, SSR adapter, function, database or secret is required.

Astro uses `SITE_URL` when supplied, otherwise Cloudflare's build-time `CF_PAGES_URL`, for canonical and Open Graph URLs. After the project receives its stable production domain, set `SITE_URL` to that full HTTPS address in Pages' build environment. For a custom domain later, attach it in Pages and update `SITE_URL`; the application architecture stays the same.

`public/_headers` defines security headers and immutable caching for fingerprinted assets. `src/pages/404.astro` produces a real static 404 page.

Official reference: <https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/>

## Content and source structure

```text
src/pages/index.astro             Portfolio content and sections
src/components/SystemDiagram.astro   Lightweight SVG hero
src/components/ProjectLab.tsx     React project demonstrations
src/components/SpatialLab.astro   Accessible 3D fallback and controls
src/scripts/spatial.ts           Optional Three.js scene
src/scripts/site.ts              Motion and lazy loading
src/styles/global.css           Visual system and responsive layouts
public/Tuncay_Unal_Resume.pdf    Supplied résumé
docs/content-sources.md          Factual sources and scope boundaries
```

The résumé remains the source of truth for dates and quantified accomplishments. Do not present the product roadmap as shipped functionality. Keep all scheduler preview data fictional and explicitly labelled.

## Accessibility and performance

Semantic navigation and headings, a skip link, visible keyboard focus and direct contact links are available in the static HTML. Important content does not depend on WebGL or scrolling animations. Motion follows `prefers-reduced-motion`; an additional pause control is available to visitors who allow motion. Three.js is split from the initial page and uses a capped pixel ratio. Its animation pauses offscreen or in a background tab. An SVG renderer keeps the same scene interactive without WebGL, and a static coordinate diagram remains if the 3D module cannot load.

Fonts are served locally. No third-party font requests, tracking scripts, embedded videos or camera permissions are used.

## Attribution

The design references informed the visual direction only; their code and artwork were not copied. Font licenses are distributed with the font packages. Third-party code remains under its respective package licenses.
