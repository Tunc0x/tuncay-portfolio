# Validation and release status

24 September 2026.

## Completed

- Production Astro build and TypeScript diagnostics: passed, zero errors or warnings in the type check.
- Static homepage and 404 output generated.
- Browser review at desktop, 1024px laptop, 768px tablet and 390/360px mobile iframe viewports.
- Axe checks for WCAG 2 A/AA, WCAG 2.1 AA and best practices: no violations at 360, 390, 1024 or 1440px in the checked states. This is an automated check, not a formal accessibility certification.
- Checked event pipeline selection and timed replay, scheduler list/week switching and category filtering, concept-map expansion, motion pause, and keyboard rotation/reset.
- Three.js scene works through the SVG renderer in the available browser, where WebGL is disabled. The WebGL path is implemented and type-checked but cannot be visually verified in this environment.
- Static 3D fallback and graceful rendering failure were observed during testing.
- Internal anchors and local linked files resolve. GitHub repositories verified through the connector. OpsReplay and the scheduler's existing live pages opened successfully. Email and LinkedIn destinations match the résumé.
- Initial page script is about 1.5 KiB gzip, React runtime about 67 KiB gzip, project demonstrations about 2.7 KiB gzip. The separate spatial module is about 121 KiB gzip and is not preloaded with the hero.
- Source scan found no private keys, API credentials or service-role secrets.
- Motion preferences are handled through the standard `prefers-reduced-motion` CSS and JavaScript queries. Manual pause was tested; OS preference emulation was not available in this browser API.

- Enlarged text at 200%, 360px viewport: no overflowing text or elements; 345px document width matches available width after the scrollbar; zero axe violations.

## Expansion verification — 25 September 2026

- Preserved the original four flagship sections, interactive demonstrations and visual system. Added real media, three expandable case studies and a distinct internship contribution disclosure.
- Checked expanded layouts at 1440, 1024, 768 and 390 CSS-pixel iframe widths, plus 360px with 200% root text size. Document widths equal the available viewport after scrollbars; no unintended horizontal overflow or broken internal anchors. The mobile WebAR sequence intentionally scrolls inside its own focusable region and responds to arrow keys.
- Axe WCAG 2 A/AA, WCAG 2.1 AA and best-practice checks found zero violations in the expanded states at those widths. Manual visual review checked media, captions, hierarchy and reflow. Automated results are not a formal accessibility certification.
- Verified pipeline replay through all five stages, scheduler list/week and category filtering with appointment selection, concept-map disclosure, spatial keyboard rotation/reset, project deep links, native keyboard disclosures and the internship expansion.
- Played all three native MP4 excerpts: 21, 25 and 30 seconds, without media errors. Closing a disclosure pauses its video; starting another pauses the previous one. Manual motion pause sets the page-wide state. MP4 requests are absent before user playback; lazy images load as their content comes into view.
- Reviewed explicit image dimensions, alternative text, captions, new-tab labels, video descriptions, responsive variants and file sizes. `ffprobe` confirms H.264/yuv420p video with no audio tracks. The largest media file is 4.62 MiB. See `media.md` for encoding and selection.
- The inherited production React environment caused a development-only hydration error. The dev command now explicitly sets `NODE_ENV=development`; React interactions were rechecked successfully. Production dependency versions and build settings are unchanged.
- Final `npm run build`: 13 checked files, zero errors/warnings/hints from Astro diagnostics; homepage and 404 generated. Vite still reports the existing large optional Three.js chunk, which is dynamically loaded rather than part of the initial page.
- Temporary accessibility/review tools are excluded from the published source and build. Browser-extension console messages are unrelated to site code.

Limitations remain: WebGL is unavailable in the review browser, so the interactive SVG fallback was inspected. OS-level reduced-motion emulation is unavailable; the CSS/JavaScript preference paths were reviewed and the user-facing pause control was tested. This review does not claim testing on physical iOS/Android devices.

## Publishing

The existing public repository is `Tunc0x/tuncay-portfolio`; the existing production site is <https://tuncay-portfolio.pages.dev>. Push to `main` using the connected GitHub account; do not create a second repository or Pages project. The release gate is successful GitHub/Cloudflare build checks followed by live inspection of the updated project sections, media and interactions. Deployment results are reported after that gate, rather than inferred from the local build.

Production branch: `main`. Build command: `npm run build`. Output: `dist`. Full settings are in the README.
