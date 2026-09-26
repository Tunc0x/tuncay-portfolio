# Project media

The September 2026 expansion uses supplied project captures and recordings. Originals are not required to build the site and are not committed.

## Images

`src/data/project-media.json` records dimensions and responsive WebP variants. Screenshots retain their content and aspect ratio. Only the large black side borders in the two portrait WebAR captures were cropped. Image metadata was removed. All project images include meaningful alternative text or, for redundant summary thumbnails, empty alternative text, explicit dimensions and lazy loading. Full-size links open the optimized largest variant.

Included: master's application capture; two WebAR states; Spot photograph; exergame arena and destruction detail; all four bachelor study environments. Redundant exergame opponent captures and unverified illustrative Carrd artwork were omitted. No synthetic artwork is presented as project evidence.

## Video excerpts

| File                | Duration | Resolution | Bytes     | Selection                                             |
| ------------------- | -------- | ---------- | --------- | ----------------------------------------------------- |
| `learning-demo.mp4` | 21 s     | 1280 × 720 | 3,592,944 | Source seconds 7–28, learning interaction             |
| `webar-demo.mp4`    | 25 s     | 592 × 1280 | 2,994,314 | Source seconds 3–28, marker tracking and model        |
| `bend-demo.mp4`     | 30 s     | 1280 × 720 | 4,846,972 | Source seconds 18–30 and 92–110, tutorial then combat |

H.264, yuv420p, 30 fps, MP4 fast-start. The clips have no audio tracks; visible descriptions convey the relevant action. Native playback controls, inline playback, no autoplay, and no media preloading are intentional. Small WebP posters are provided. The largest file is about 4.62 MiB, below Pages' 25 MiB per-file limit. All responsive image variants and posters together are about 1.2 MB; the entire curated media directory is about 12.6 MB.

To replace a capture, generate appropriately sized WebP variants, update the manifest and caption together, and inspect the actual project context. To replace a clip, retain a short useful excerpt, generate a matching poster, update the duration/description and verify native playback before publishing. Do not place raw source archives or private supporting documents in `public/`.
