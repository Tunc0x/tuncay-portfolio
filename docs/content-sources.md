# Content verification

Reviewed 24 September 2026.

Expansion reviewed 25 September 2026. Existing project and career facts were preserved; the following supplied evidence supports the additional material.

## Expansion evidence

- Lufthansa Technik reference letter: VR Shop-Floor / Usual Suspects training, reusable VR Builder behaviours and conditions, English subtitles/audio, headset deployment, trainee use and testing. This internship work is kept separate from the later master's thesis. No dedicated authentic internship screenshot was supplied.
- Supplied master's thesis application screenshot and demonstration: original interface, conversational agent and spatial concept map. The excerpt illustrates interaction, not a usability or learning outcome by itself. The research slides report no significant condition effect on post-test knowledge after accounting for prior knowledge; the portfolio does not claim a learning-performance improvement.
- DIOR IT (Tuncay's clarification, 26 September 2026): worked with the Unity WebRTC package to get the video stream working in the VR application and added a laser marker projected onto the 360° video sphere. This does not imply ownership of the overall streaming system or architecture. The Spot photograph shows the physical system.
- Other Fraunhofer CML work (reference letter and Tuncay's clarification), separate from DIOR IT: reverse-Panini projection shader, analysis and correction of marker displacement caused by projection offsets, and interactive panels supporting scaling, zooming and movement.
- Official DIOR project context: <https://www.cml.fraunhofer.de/de/forschungsprojekte1/DIOR.html>. Organization-level research scope is distinguished from individual implementation.
- Supplied AR Model Viewer captures and showcase recording: marker search, tracking and anchored model. The existing coordinate lab is still explicitly labelled as an illustration, alongside the real application evidence.
- Supplied _Bend for Your Life_ team documentation, screenshots and demo: Unity / Meta Quest, MiVRy gesture recognition, seven attacks across four elements, three increasingly capable opponent rounds, and OpenFracture destruction. The team is credited. Tuncay's focus on gesture recognition, enemy behaviour and destruction is also supported by his existing Carrd narrative; the collective paper does not allocate individual authorship. No formal user evaluation or health benefit is claimed. Single-person gesture training limits generalization across body proportions.
- Supplied bachelor thesis, _Der Einfluss von Straßenbäumen auf Stimmung und Kognition_, and four matching scene captures: 30 participants, within-subjects Unity/HTC Vive Pro study, balanced Latin-square order, researcher-scored backward digit span adapted from Woods et al., PANAS and PRS measures. Chapter 4 takes precedence over broad wording in the abstract. Table 4.1 / printed page 26 provides the plotted digit-span means and SDs. The tree condition exceeds each comparator in Bonferroni-adjusted paired comparisons (p ≤ .0222). PANAS results on pages 28–29 distinguish post-exposure affect from change scores; change scores did not differ significantly. PRS results are on pages 31–33. Limitations on pages 43–45 include VR realism, sample composition and occlusion/generalization.

Reference letters, full thesis PDFs, administrative pages, participant-level appendices, signatures and student identifiers are not published. See `media.md` for the curated media and exclusions. The existing approved public résumé remains available.

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
