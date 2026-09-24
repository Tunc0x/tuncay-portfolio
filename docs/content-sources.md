# Content verification

Reviewed 24 September 2026.

## Primary factual source

The supplied `Tuncay_Uenal_Resume (1).pdf`, included as `public/Tuncay_Unal_Resume.pdf`, supplies education, work dates, role titles, skills, contact details and quantitative results.

- Lufthansa Technik thesis: Jan–Aug 2026; 24 participants; +19.38 mean SUS points for progressive disclosure versus full visibility; 9 instructional sections; 2 construction tasks; 4,700+ telemetry events.
- Lufthansa Technik internship: Sep–Nov 2025; deployed VR training and reusable VR Builder components.
- Fraunhofer CML: Nov 2023–Feb 2025; Unity/C#, maritime and robotics R&D, WebAR viewer.
- OpsReplay: 9 API endpoints, 30+ API tests, 2 background processes.
- Scheduler: 3 views, 3 REST mutation operations, 7 validated request fields, 3 related Supabase tables.

The portfolio does not use employer headcounts as personal accomplishments, infer skill proficiency percentages or fabricate years of technology experience.

## Repository evidence

- <https://github.com/Tunc0x/opsreplay/blob/main/README.md>
- <https://github.com/Tunc0x/opsreplay/blob/main/backend/app/routers/github_webhook.py>
  - HMAC verification, delivery deduplication, atomic delivery/outbox transaction.
- <https://github.com/Tunc0x/appointment-scheduler/blob/main/README.md>
- <https://github.com/Tunc0x/appointment-scheduler/blob/main/src/app/api/appointments/route.ts>
  - Zod request validation and server-side Supabase insert; README documents URL state, related queries, calendar views and cached reference data.
- <https://github.com/Tunc0x/web-ar-model-viewer>
  - Inspected repository file listing: Unity Build, camera integration, image tracker, OpenCV and targets. It is a published build, not a claim that the repository contains the full Unity source project.
- <https://uenal-portfolio.carrd.co/>
  - Reviewed project narrative and public professional history. More recent résumé wording takes precedence.

## Presentation boundaries

- OpsReplay's implemented diagram describes GitHub push ingestion. Additional integrations, incident workflows and postmortem generation are labelled in development.
- Scheduler preview uses illustrative appointments, contains no patient records, performs no network mutations and links to the original live project.
- The concept map is an illustration of progressive disclosure, not the original experiment interface or safety-training instructions.
- The spatial lab is an original coordinate-frame demonstration of marker-relative positioning, not a screenshot or replica of Fraunhofer's implementation.
- The hero diagram is a conceptual interface/services/data relationship, not a claim about a specific project's architecture.

## Visual references

- <https://prasadvnv.github.io/> — dark restraint, hierarchy and spacing.
- <https://erikc-portfolio.netlify.app/> — distinct interactive sections and spatial interaction.

No reference-site text, code, artwork or metrics were reused.
