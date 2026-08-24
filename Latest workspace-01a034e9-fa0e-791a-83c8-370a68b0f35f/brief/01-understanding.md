# Portfolio Brief — Understanding & Strategy

**For:** Emdadul Hoque Emon — Visual Designer · Video Editor · Creative Content Creator
**Document type:** Understanding / pre-build strategy (not a build spec)
**Status:** Draft for confirmation

---

## 1. Positioning

The site is an **editorial portfolio**, not a marketing funnel. That single decision drives everything downstream.

- **No** client logos, testimonials, awards, stat counters, "currently accepting work" banners, or invented results. The work has to stand on its own craft.
- The framing is **magazine / independent journal**, not agency landing page. Curated, paced, opinionated. The site itself is a demonstration of visual/editorial skill — it *is* a portfolio piece.
- **Three identity pillars**, in priority order:
  1. **Short-form video editing + poster/graphic design** — the core craft, front and center.
  2. **Dawah / Islamic visual content** — the distinctive, differentiating thread (Islamic Corner, Fath Makkah, calligraphy/Namelipi). This is what makes the portfolio memorable, not generic.
  3. **AI-assisted creative work** — surfaced honestly via the Prompt Archive as a *process* differentiator, never a gimmick.
- Tone: confident, calm, reverent where the subject demands it (Islamic work), and precise elsewhere. First-person, honest. Nothing invented.

---

## 2. Sitemap

Multi-page, static, with **categories as first-class routes** (per the brief):

| Route | Purpose |
|---|---|
| `/` | Curated editorial homepage |
| `/work` | Full work index, filterable by category |
| `/work/[slug]` | Individual project case studies |
| `/fath-makkah` | Flagship project — immersive, dedicated route |
| `/islamic-corner` | Living collection of Dawah/Islamic content |
| `/prompts` | Prompt Archive (AI prompt catalog) |
| `/about` | Identity, approach, the disciplines he spans |
| `/contact` | Real channels only |

Notes:
- Categories are surfaced both as **filter tags** on `/work` and as **dedicated routes** (e.g. `/work/video`, `/work/posters`, `/work/calligraphy`) so a category link always resolves to a real, shareable page — not a buried query param.
- `/fath-makkah` sits outside `/work` as a top-level flagship (it deserves first-class presence in nav and a direct URL to share).
- No `/blog` yet — reserved for future expansion (see §18).

---

## 3. Homepage Structure (curated, editorial)

The homepage is a **curated "issue"**, not a grid dump. Proposed order:

1. **Masthead** — name + one-line positioning + discipline labels (Visual Design · Video Editing · Creative Content). Restrained, typographic.
2. **Selected Work** — 3–4 hand-picked pieces with editorial titles, not just thumbnails. Each links to a case study.
3. **Flagship feature band** — *Fath Makkah*, treated large and immersive (the emotional centerpiece of the site).
4. **Table of contents** — an index of categories (the taxonomy as a navigable list, like a magazine contents page) linking to category routes.
5. **Islamic Corner teaser** — a quiet, reverent pull toward the collection.
6. **Prompt Archive teaser** — a "process" pull, framing AI as craft.
7. **About blurb + contact CTA** — short, factual, with a clear way to reach him.
8. **Footer** — minimal, real socials only.

The homepage is meant to be **skimmed in 20 seconds or read in 5 minutes** — hierarchy does both.

---

## 4. Side-Drawer Structure

Hamburger (top-left, persistent) opens a side drawer. Structure:

1. **Primary nav** — Home, Work, Fath Makkah, Islamic Corner, Prompt Archive, About, Contact.
2. **Categories** — secondary list (the taxonomy), linking to category routes.
3. **Social links** — real handles only (Instagram / YouTube / etc., whatever actually exists).
4. **Footer of drawer** — email / contact.

Requirements:
- Drawer is a full-height overlay with its own scroll if content overflows.
- Focus is trapped inside while open; Esc closes it; body scroll is locked.
- Large, comfortable tap targets (mobile-first nav).
- The current route is visually marked.

---

## 5. Portfolio Taxonomy

Categories (drawn strictly from the brief's "real areas"):

1. Video Editing (short-form)
2. Poster & Graphic Design
3. Thumbnail Design
4. Motion & Animation
5. Social-Media Design
6. Dawah / Islamic Visual Content
7. Calligraphy / Namelipi
8. Editorial & Visual Storytelling
9. AI-Assisted Creative Work

Principles:
- **Multi-tag**, not single-category. A Fath Makkah poster might be tagged *Poster*, *Dawah*, *Calligraphy*, *Editorial* simultaneously.
- Categories are **curated collections**, so overlapping tags are a feature (they reveal the range), not a problem to be solved with strict buckets.
- "AI-Assisted" is a **cross-cutting tag** (applies on top of other work), which is why the Prompt Archive links prompts → projects rather than duplicating work into a "category."

---

## 6. Featured-Project Strategy

- A project carries a **`featured: true`** flag that promotes it onto the homepage "Selected Work" band.
- "Featured" is a **curation decision**, not a ranking — it's what he wants someone to see first.
- Featured projects get **case-study depth**: context, goal, process, decisions, deliverables. Non-featured work can live as lighter "cards" in the index.
- Rotation is manual/curated (change the flag), not automated — matches the editorial ethos. No invented "latest" or "new" markers unless a piece is genuinely new.

---

## 7. Fath Makkah Strategy (flagship)

*Fath Makkah* (فتح مكة — the Conquest of Mecca) is the **flagship and emotional anchor**. Treatment:

- **Dedicated, immersive route** — a full editorial case study, not a thumbnail in a grid.
- **Narrative sections**: concept → historical research/context → visual language → typography/calligraphy decisions → motion (if any) → final deliverables.
- It fuses the identity pillars: **Dawah content + editorial storytelling + (likely) poster design + possibly motion**.
- **Sensitivity is non-negotiable**: this is sacred subject matter.
  - **No depiction of the Prophet ﷺ** or key figures — rely on calligraphy, architecture, landscape, geometry, and abstraction.
  - Reverent tone, no meme/casual framing, no gamified interactions on this page.
  - Any ayat/hadith quoted must be **sourced and accurate**.
- It doubles as the site's **proof of range** — one piece that demonstrates research, restraint, typography, and storytelling simultaneously.

**Open question (see §19):** the exact medium(s) of the project (poster series / short film / motion / mixed). I'm assuming a mixed editorial case study until confirmed.

---

## 8. Video Strategy (the "video-link workflow")

Short-form video is a core strength, but video is the single biggest performance risk. Approach:

- **Never self-host heavy video.** Videos live on their existing platforms (YouTube / Instagram Reels / TikTok / etc.).
- The site shows a **poster-frame thumbnail + platform badge + title + duration + category** as a card. Click → opens the source (or a lightbox embedding the external player).
- This is the "video-link workflow": the portfolio is a **curated index of links to living work**, always up to date at the source, never stale or bloated.
- **No autoplay, ever.** Thumbnails lazy-load. Poster frames are designed (which itself showcases poster/thumbnail craft — a two-for-one).
- Each video card is itself a mini design artifact (consistent frame treatment, platform badge), reinforcing the "thumbnail design" skill.

---

## 9. Islamic Corner Strategy

A **dedicated, reverent section** — an ongoing *collection*, not a single finite project.

- Content types: **posters, ayat/hadith quotes (sourced), calligraphy, Namelipi (Bengali script lettering), motion pieces.**
- Distinct but **harmonious** visual treatment from the rest of the site — likely deeper/more classical accents, more whitespace, possibly a serif or calligraphic display pairing — so it reads as a deliberate "room" without breaking cohesion.
- Structured as a **living archive** that grows over time (see §18).
- Same sensitivity rules as §7 throughout: sourced texts, no figure depiction, reverent tone.
- *Namelipi* specifically honors **Bengali-script calligraphy/lettering**, giving the section a grounded, personal, cultural identity.

---

## 10. Prompt Archive Strategy

The **transparency/process differentiator**, and the honest home for "AI-assisted creative work."

- Each entry: the **prompt** (verbatim), the **tool/model**, the **context/goal**, and a **link to the resulting work** (project) where it exists.
- Grouped/filterable by **category and/or tool**.
- Framed as **craft, not magic**: AI as one tool in a multi-disciplinary kit. The tone is "here's how this was made," never "look, AI did it."
- This is a genuine differentiator — almost no portfolio shows process this openly — and it ties the AI pillar directly to real, finished work instead of leaving it as a vague claim.
- The prompt text itself gets a **monospace / typewriter treatment** to visually signal "this is the raw material."

---

## 11. About / Contact Strategy

- **About**: first-person, honest. Who he is, what he makes, the disciplines he spans, and the **Dawah/Islamic thread** that runs through the work. *No invented credentials* — education, experience, or employment are mentioned **only if real**. The narrative is about craft and intent, not résumé padding.
- **Contact**: real channels only — **email + real socials**. No fake "availability" language, no lead-gen form with invented fields. A simple, respectful "email me" affordance.
- The About page is the human anchor of an otherwise work-forward site; it should carry the site's *voice*.

---

## 12. Visual Direction (proposed)

Editorial / print-inspired. The site should feel like an **independent culture journal**, not a startup landing page.

- **Light, warm paper** background; **ink-black** text; a **single accent color** reserved for emphasis and interactive states.
- **High contrast, generous whitespace**, strong editorial grid — asymmetric where it aids storytelling, disciplined elsewhere.
- A **second, deeper accent** (deep green/teal or muted gold) reserved for the **Islamic Corner / Fath Makkah** "room" to give reverent content its own mood without breaking the system.
- Imagery is **large and heroed**; text is confident and typographic. The site's own typography and layout *are* the portfolio's first impression.
- (Dark mode optional — flagged for confirmation, §19.)

---

## 13. Typography

Editorial, magazine-grade hierarchy with **two primary roles + one accent role**:

1. **Display** — a high-contrast serif (or sharp editorial grotesque) for headlines/masthead. Carries the "print journal" identity.
2. **Body/UI** — a clean, neutral sans for body copy, labels, and interface. Comfortable measure, high legibility.
3. **Accent (Islamic/Calligraphic)** — an **Arabic and/or Bengali calligraphic display** used sparingly for Islamic Corner, Fath Makkah, and Namelipi moments. A respectful, authentic nod — used as ornament/headline, never for body text (legibility + script support).

Engineering:
- **Variable fonts**, **self-hosted**, **subset** (Latin + Arabic + Bengali as needed) for performance.
- System-font fallback stack so nothing flashes unstyled.
- Tight tracking on display, relaxed leading on body; a clear **type scale** (not arbitrary sizes).

---

## 14. Motion

Restrained, purposeful, and **performance + accessibility safe**:

- Reveal-on-scroll (fade/translate), hover states, drawer slide, image crossfade, and possibly a **marquee** for the discipline list.
- **Transform + opacity only** — no layout-thrashing animations.
- Every animation respects **`prefers-reduced-motion`** (falls back to instant/static).
- Motion signals *intent* (a link is interactive, a section has arrived) — it never decorates for its own sake, and it's especially subdued on the Islamic pages.

---

## 15. Mobile

- **Mobile-first.** Single column; the **hamburger drawer is the primary navigation** on small screens (it's the brief's core nav model, so it must shine here).
- Thumb-friendly tap targets; comfortable hit areas; no horizontal scroll; images scale correctly (`srcset`).
- Drawer is full-height, scrollable, focus-trapped, and dismissible by swipe/Esc/back.
- Typography re-scales; hero images become portrait-friendly crops where needed.

---

## 16. Accessibility

- **Semantic HTML** (landmarks, headings in order, real `<button>`/`<a>`).
- **Skip-to-content** link.
- **Drawer**: ARIA state (`aria-expanded`), focus trap, Esc-to-close, focus return to the hamburger.
- **Alt text** on all imagery (poster/thumbnail descriptions double as an accessibility win and a craft showcase).
- **Color contrast ≥ AA** (aim AAA for body text); color never the sole signal.
- Full **keyboard** operability; **visible focus** states.
- **Reduced-motion** respected (§14). Video is never autoplaying (§8).

---

## 17. Performance

- **Static site** (SSG), minimal JS. No heavy framework unless genuinely required.
- **Responsive images**: `srcset` with AVIF/WebP; explicit dimensions; **lazy-loading** below the fold.
- **Video = external links/thumbnails**, never self-hosted files (§8).
- **Self-hosted, subset, variable fonts** (§13) — no render-blocking web-font calls from third parties.
- **Prefetch** category/project routes for near-instant navigation.
- Budget-minded: the site should load fast on the mobile connections of his audience (Bangladesh/regional + global).

---

## 18. Future Expansion (future-proofing)

The structure is designed to **grow without redesign**:

- **Content model**: projects, categories, and prompts defined as **data** (markdown/JSON/headless-CMS-ready), so adding work is additive — new file, new entry, done.
- **Living collections**: Islamic Corner and Prompt Archive are *archives*, built to accumulate.
- **Category system** scales: new categories are a data entry + route, not a redesign.
- Reserved, easy later additions:
  - A **notes/journal** section (editorial essays on process).
  - **Search** (a natural fit once the archive grows).
  - **Localization** — Bengali and/or Arabic versions (the identity is multilingual: English UI, Bengali Namelipi, Arabic calligraphy).
  - **RSS** for the archive.
- The taxonomy's multi-tag design means new work slots in without forcing recategorization.

---

## 19. Assumptions made + what I need confirmed before building

Assumptions I'm holding (correct me freely):
- Primary language **English**, with Arabic/Bengali used *within* the Islamic content as accent, not as full localization (yet).
- Fath Makkah is a **mixed-medium editorial case study** (poster series + possible motion), not a single artifact.
- The "video-link workflow" = **link out to existing platforms**, no self-hosted video.
- A **light/paper** visual direction (dark mode optional) with a deep accent for Islamic content.

Please confirm / correct:
1. **Video platforms** — where does the video actually live (YouTube, Instagram, TikTok, Facebook, …)? This determines card badges and the exact link workflow.
2. **Fath Makkah medium(s)** — poster series, short film, motion piece, or mixed?
3. **Social handles + contact email** — the *real* ones to include in the drawer/footer/contact.
4. **Visual direction** — approve the proposed light/editorial direction, or do you prefer dark, or a specific palette/mood?
5. **Namelipi scope** — does the Bengali-script calligraphy angle feel right to feature, and do you have samples?
6. **Asset availability** — do you already have the work files/thumbnails/posters (or do we design placeholder poster-frames first)?
