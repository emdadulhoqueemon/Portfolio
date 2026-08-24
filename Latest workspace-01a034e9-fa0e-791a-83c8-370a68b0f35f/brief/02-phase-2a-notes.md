# Phase 2A — Initial Visual Construction (notes)

**Status:** Built & running. This documents what was constructed, how it's wired, and what to replace in the next phases.

---

## What was built

A complete editorial portfolio SPA (no framework, no build step — plain HTML/CSS/JS, served statically). Everything is data-driven from one file.

| Requirement | Where it lives |
|---|---|
| Global header (avatar · brand name · hamburger) | `index.html` + `.site-head` |
| Circular profile avatar | `assets/avatar.svg` (monogram placeholder — swap with a real photo) |
| Hamburger side drawer | `index.html` + `.drawer` — full nav, disciplines, socials, email; focus-trapped, Esc/backdrop dismiss |
| Curated homepage | `renderHome()` — masthead → marquee → featured → flagship band → disciplines → video → teasers → about |
| Fath Makkah flagship | `renderFath()` + `FATH` data — editorial case study + 36-page reader |
| Category hubs (routes) | `renderCategory()` at `#/work/:slug` |
| Video facade | `VIDEOS` + `videoCard()` — thumbnail-first, platform badge, on-demand YouTube embed |
| Project detail modal | `openProjectModal()` |
| Islamic Corner | `renderIslamic()` |
| Prompt Archive | `renderPrompts()` |
| About / Contact | `renderAbout()` / `renderContact()` |
| Gradient-wave ambience | `.ambient` (low-opacity, respects reduced-motion) |

## Routes (hash-based — works anywhere, no server config)

`#/` · `#/work` · `#/work/:slug` (9 categories) · `#/fath-makkah` · `#/islamic-corner` · `#/prompts` · `#/about` · `#/contact`

## Architecture (reusable by design)

- **`js/data.js`** — the single content model: `SITE`, `CATEGORIES`, `PROJECTS`, `VIDEOS`, `PROMPTS`, `FATH`. Adding work = adding an object here; nothing else changes.
- **`js/app.js`** — router, renderers, drawer, modals, reveal animations.
- **`css/styles.css`** — the full design system (tokens at the top).
- **`fonts/`** — self-hosted (see below).

## Typography (self-hosted)

- **Outfit** — all UI/body (variable 100–900).
- **Quakiez** — brand name + display headlines (`.woff`, from the Almarkhatype pack).
- **Aref Ruqaa** — Arabic accent (`فتح مكة`, ayah quotes, Islamic Corner).
- **Noto Serif Bengali** — Namelipi/Bengali (`নামলিপি`).
- Script-aware: any element tagged `lang="ar"` / `lang="bn"` auto-uses the right face.

## Placeholder system (honest, by design)

- Every project/video/prompt carries `placeholder: true` → a "Placeholder" chip renders on its card.
- **Abstract poster art** is generated deterministically in JS (`art(seed, motif, w, h)` → SVG data-URI) in 4 motifs — *girih, poster, motion, editorial* — using only the brand palette. No network, no fake "client work" imagery.
- **To swap in a real asset:** replace the `<img src="art(...)">` with a real image path. The card, modal and grid all adapt automatically.
- **Fath Makkah** is real (it's your actual project) — its copy is accurate/reverent; the 36 page-thumbnails are placeholders to be replaced with real spreads.

## Video facade — how the link workflow is wired

Each entry in `VIDEOS` has `platform`, `youtubeId`, `facebookUrl`, `duration`.
- Set `youtubeId: "VIDEO_ID"` → the modal injects a `youtube-nocookie` embed **on demand** (nothing loads until the user opens it — no autoplay, no self-hosted video).
- Facebook: add `facebookUrl` and it can link/embed the same way (embed wiring is a small addition when you have a real URL).
- Until then, the facade shows a designed placeholder reader state.

## Accessibility & performance (implemented)

- Semantic landmarks, skip-link, focus-visible, ARIA drawer/modal state, focus trap, Esc/back dismiss, keyboard-operable cards (`role="button"`), alt-ready images.
- `prefers-reduced-motion` fully honored (ambient + reveals + transitions disabled).
- Static site, lazy-loaded images, self-hosted subset variable fonts, zero third-party requests, no layout-thrash animations (transform/opacity only).

## Verified

Rendered headlessly (Puppeteer) across all 9 routes + 390px mobile: **zero console errors, no horizontal overflow**, fonts load, drawer/modal/reader all function, Arabic & Bengali render in their correct faces.

## Still placeholder — to replace in batch-upload phase

1. All `PROJECTS` / `VIDEOS` / `PROMPTS` content (titles, summaries, art → real files).
2. The 36 Fath Makkah page spreads.
3. The **13 Namelipi** pieces (announced in the Calligraphy hub as "a planned collection of 13").
4. Social URLs (currently `#`) — YouTube, LinkedIn, Behance, Facebook, Pinterest, WhatsApp, Telegram.
5. Avatar → real photo.

## Suggested next steps

- **Phase 2B (first batch):** replace one project + one video with real files end-to-end to validate the swap path.
- Then upload remaining assets in controlled batches per your plan.
