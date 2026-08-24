/* ==========================================================================
   CONTENT MODEL — Emdadul Hoque Emon portfolio
   Single source of truth. Add/edit entries here; the UI renders automatically.

   NOTE ON PLACEHOLDERS:
   Every project / video / prompt below is a STRUCTURAL PLACEHOLDER to be
   replaced with real assets during the batch-upload phase. Each carries
   `placeholder: true` so the UI can surface a "Placeholder" marker. Nothing
   here claims a real client, date, or result.
   ========================================================================== */

window.SITE = {
  name: 'Emdadul Hoque Emon',
  nameDisplay: 'Emdadul Hoque Emon',
  shortName: 'Emon',
  initials: 'EH',
  role: 'Visual Designer · Video Editor · Creative Content Creator',
  tagline: 'Short-form video editing and poster & graphic design, with a devoted practice in Dawah and Islamic visual content.',
  location: 'Chattogram, Bangladesh', // replace if you prefer to omit
  shortBio: 'Visual designer, video editor and creative content creator — with a focused, devoted practice in Dawah and Islamic visual content.',
  email: 'emdadulhoqueemon@outlook.com',
  socials: [
    { id: 'youtube',  label: 'YouTube',  url: '#' },
    { id: 'linkedin', label: 'LinkedIn', url: '#' },
    { id: 'behance',  label: 'Behance',  url: '#' },
    { id: 'facebook', label: 'Facebook', url: '#' },
    { id: 'pinterest',label: 'Pinterest',url: '#' },
    { id: 'whatsapp', label: 'WhatsApp', url: '#' },
    { id: 'telegram', label: 'Telegram', url: '#' }
  ]
};

/* Social glyphs (simple inline paths) */
window.SOCIAL_ICONS = {
  youtube:  '<path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/>',
  linkedin: '<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z"/>',
  behance:  '<path d="M8.07 11.34c.6-.35 1-.97 1-2 0-2.25-1.55-3.1-3.46-3.1H0v11.5h5.75c2.03 0 3.75-.9 3.75-3.2 0-1.35-.72-2.3-1.43-2.78zM2.4 8.3h2.9c.8 0 1.4.36 1.4 1.14 0 .8-.62 1.16-1.4 1.16H2.4V8.3zm3.1 7.35H2.4v-2.55h3.14c.9 0 1.44.42 1.44 1.3 0 .87-.57 1.25-1.48 1.25zM21.5 12.4c-.24-2.4-1.74-3.9-4-3.9-2.3 0-3.9 1.5-3.9 4.06 0 2.5 1.5 4.05 3.98 4.05 1.87 0 3.12-.82 3.67-2.47h-1.86c-.3.8-.93 1.18-1.78 1.18-1.14 0-1.82-.62-1.95-1.8h5.68c.02-.37.16-1.1.16-1.12zm-5.9-.72c.1-1.04.7-1.7 1.9-1.7 1.18 0 1.78.66 1.9 1.7h-3.8zM18.12 6.9h4.5v1.1h-4.5V6.9z"/>',
  facebook: '<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07z"/>',
  pinterest:'<path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.17-.1-.95-.2-2.4.04-3.44.22-.93 1.4-5.94 1.4-5.94s-.36-.72-.36-1.78c0-1.67.97-2.91 2.17-2.91 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-1 4-.28 1.2.6 2.18 1.78 2.18 2.14 0 3.79-2.26 3.79-5.52 0-2.89-2.08-4.91-5.05-4.91-3.44 0-5.46 2.58-5.46 5.24 0 1.04.4 2.15.9 2.75.1.12.11.22.08.35l-.34 1.36c-.05.22-.18.27-.4.16-1.5-.7-2.44-2.9-2.44-4.66 0-3.8 2.76-7.29 7.96-7.29 4.18 0 7.43 2.98 7.43 6.96 0 4.15-2.62 7.5-6.25 7.5-1.22 0-2.37-.64-2.76-1.39l-.75 2.87c-.27 1.05-1 2.36-1.5 3.16 1.13.35 2.32.54 3.56.54 6.63 0 12-5.37 12-12S18.63 0 12 0z"/>',
  whatsapp: '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.45-9.43a9.4 9.4 0 0 1 9.42 9.45c0 5.2-4.23 9.42-9.45 9.42zM12.04 2.5A9.55 9.55 0 0 0 2.5 12.04c0 1.69.44 3.33 1.28 4.78L2.4 21.5l4.8-1.26a9.52 9.52 0 0 0 4.83 1.37 9.55 9.55 0 0 0 9.55-9.55 9.55 9.55 0 0 0-9.55-9.56z"/>',
  telegram: '<path d="M9.42 15.18l-.4 5.66c.57 0 .82-.25 1.12-.54l2.68-2.58 5.57 4.1c1.02.56 1.75.27 2.02-.95l3.66-17.24c.32-1.5-.55-2.08-1.55-1.71L1.06 9.85c-1.5.59-1.48 1.42-.27 1.79l5.46 1.71 12.67-7.99c.6-.39 1.14-.18.7.21l-10.2 9.61z"/>'
};

/* ---------- Categories (the taxonomy) ----------
   `art` maps a category to the abstract placeholder motif used on its cards. */
window.CATEGORIES = [
  { slug: 'video',       name: 'Video Editing',        art: 'motion',    blurb: 'Short-form edits cut for rhythm, retention and story — Reels, Shorts and social-first video.' },
  { slug: 'poster',      name: 'Poster & Graphic Design', art: 'poster', blurb: 'Single-sheet and series posters built on type, hierarchy and restraint.' },
  { slug: 'thumbnail',   name: 'Thumbnail Design',     art: 'poster',    blurb: 'Click-worthy frame design — the poster discipline applied to the smallest canvas.' },
  { slug: 'motion',      name: 'Motion & Animation',   art: 'motion',    blurb: 'Kinetic type, logo motion and micro-animation for social and editorial.' },
  { slug: 'social',      name: 'Social-Media Design',  art: 'poster',    blurb: 'Carousels, covers and templated systems for consistent feeds.' },
  { slug: 'dawah',       name: 'Dawah / Islamic Visual', art: 'girih',   blurb: 'Reverent visual content — ayah and hadith graphics, event and campaign visuals.' },
  { slug: 'calligraphy', name: 'Calligraphy / Namelipi', art: 'girih',    blurb: 'Arabic calligraphy and Bengali Namelipi lettering — the script-led heart of the practice.' },
  { slug: 'editorial',   name: 'Editorial & Storytelling', art: 'editorial', blurb: 'Longer-form visual narrative — spreads, zines and publishing projects like Fath Makkah.' },
  { slug: 'ai',          name: 'AI-Assisted Creative', art: 'editorial', blurb: 'A cross-cutting tool, not a category — see the Prompt Archive for how AI enters the process.' }
];

/* ---------- Projects (placeholders + real) ---------- */
window.PROJECTS = [
  {
    slug: 'paper-element-poster', title: '9/11 design theme Paper element',
    cats: ['dawah', 'poster'], medium: 'Poster Design', tools: 'Adobe Photoshop', featured: true,
    image: 'assets/work/graphic-design-7.jpg', placeholder: false,
    summary: 'Words against enemies of Muslims.'
  },
  {
    slug: 'ayah-poster-series', title: 'Ayah Poster Series',
    cats: ['dawah', 'poster', 'calligraphy'], medium: 'Poster series', featured: true,
    art: 'girih', seed: 11, placeholder: true,
    summary: 'A placeholder slot for a reverent series of ayah posters — type-led compositions with sourced text and calligraphic accents.'
  },
  {
    slug: 'namelipi-script-study', title: 'Namelipi — Script Study',
    cats: ['calligraphy', 'editorial'], medium: 'Lettering study', featured: true,
    art: 'girih', seed: 22, placeholder: true,
    summary: 'A placeholder slot for Bengali Namelipi lettering — a study of script, stroke and composition in the Bengali hand.'
  },
  {
    slug: 'poster-type-series', title: 'Typographic Poster Series',
    cats: ['poster', 'editorial'], medium: 'Poster series', featured: true,
    art: 'poster', seed: 33, placeholder: true,
    summary: 'A placeholder slot for a single-sheet poster series exploring hierarchy, grid and a strict two-type system.'
  },
  {
    slug: 'kinetic-logo-motion', title: 'Kinetic Mark — Motion Ident',
    cats: ['motion', 'social'], medium: 'Motion / Animation', featured: true,
    art: 'motion', seed: 44, placeholder: true,
    summary: 'A placeholder slot for a short motion ident — a mark animated with restraint for a social-first loop.'
  },
  {
    slug: 'thumbnail-frame-study', title: 'Thumbnail Frame Study',
    cats: ['thumbnail', 'poster'], medium: 'Thumbnail design', featured: false,
    art: 'poster', seed: 55, placeholder: true,
    summary: 'A placeholder slot for thumbnail frames — focal point, contrast and legibility at the smallest scale.'
  },
  {
    slug: 'social-carousel-system', title: 'Social Carousel System',
    cats: ['social', 'editorial'], medium: 'Social-media design', featured: false,
    art: 'editorial', seed: 66, placeholder: true,
    summary: 'A placeholder slot for a templated carousel system — a consistent, repeatable editorial layout across slides.'
  },
  {
    slug: 'zine-editorial-spread', title: 'Zine — Editorial Spread',
    cats: ['editorial', 'poster'], medium: 'Editorial / Print', featured: false,
    art: 'editorial', seed: 77, placeholder: true,
    summary: 'A placeholder slot for a print zine spread — long-form visual storytelling across facing pages.'
  },
  {
    slug: 'single-sheet-event-poster', title: 'Single-Sheet Event Poster',
    cats: ['poster'], medium: 'Poster', featured: false,
    art: 'poster', seed: 88, placeholder: true,
    summary: 'A placeholder slot for a single event poster — one message, one glance, fully resolved type and layout.'
  },
  {
    slug: 'dawah-ramadan-visuals', title: 'Ramadan Visual Set',
    cats: ['dawah', 'social', 'poster'], medium: 'Visual set', featured: false,
    art: 'girih', seed: 99, placeholder: true,
    summary: 'A placeholder slot for a Ramadan visual set — posts, covers and calligraphic moments in one cohesive system.'
  }
];

/* ---------- Video (the video-link facade) ----------
   Thumbnail-first. Real YouTube/Facebook links drop in here later; until then
   `youtubeId` / `facebookUrl` stay null and the facade shows a placeholder
   reader state. Never self-hosted, never autoplayed. */
window.VIDEOS = [
  { slug: 'fall-of-baghdad',
    title: 'বাগদাদের পতন ১২৫৮ – Fall of Baghdad | Mongol Invasion & Destruction of Knowledge',
    cats: ['video', 'dawah', 'editorial'], platform: 'youtube', youtubeId: '988ATB53zzA', facebookUrl: null,
    duration: '2:39', tools: 'Premiere Pro / CapCut', thumbnail: 'assets/work/fall-of-baghdad.jpg', placeholder: false,
    summary: 'The 1258 Fall of Baghdad — the Mongol invasion and the destruction of the city\u2019s libraries and knowledge.' },
  { slug: 'reel-cut-rhythm', title: 'Reel Cut — Rhythmic Edit', cats: ['video', 'social'],
    platform: 'youtube', youtubeId: null, facebookUrl: null, duration: '0:45', seed: 101, placeholder: true,
    summary: 'A placeholder slot for a short-form edit cut to a beat — pacing, sync and a clean opening hook.' },
  { slug: 'short-product-story', title: 'Short — Product Story', cats: ['video'],
    platform: 'youtube', youtubeId: null, facebookUrl: null, duration: '0:58', seed: 102, placeholder: true,
    summary: 'A placeholder slot for a product-focused Short — a concise visual story told in under a minute.' },
  { slug: 'dawah-video-loop', title: 'Dawah Video Loop', cats: ['video', 'dawah', 'motion'],
    platform: 'facebook', youtubeId: null, facebookUrl: null, duration: '1:10', seed: 103, placeholder: true,
    summary: 'A placeholder slot for a reverent Dawah loop — sourced text, slow motion and a contemplative pace.' },
  { slug: 'kinetic-type-reel', title: 'Kinetic Type Reel', cats: ['video', 'motion'],
    platform: 'youtube', youtubeId: null, facebookUrl: null, duration: '0:32', seed: 104, placeholder: true,
    summary: 'A placeholder slot for a kinetic-typography reel — type in motion as the primary subject.' }
];

/* ---------- Prompt Archive (placeholders) ----------
   Tool names below are placeholders — swap for the real model/tool per entry. */
window.PROMPTS = [
  { id: 'p1', title: 'Ayah Poster — Layout Direction', tool: 'Placeholder model',
    cats: ['dawah', 'poster'], related: 'ayah-poster-series', placeholder: true,
    prompt: 'Design a reverent, type-led poster for an ayah. Warm off-white ground, espresso near-black type, a single muted-gold accent. No imagery of figures. The Arabic text must remain the focal point; provide three layout directions with a strong hierarchy.' },
  { id: 'p2', title: 'Girih Pattern — Background Motif', tool: 'Placeholder model',
    cats: ['calligraphy', 'editorial'], related: 'namelipi-script-study', placeholder: true,
    prompt: 'Generate a seamless 8-point star (girih) geometric pattern, thin hairline strokes, low opacity, in muted gold on a deep espresso ground. Quiet, contemplative, suitable as a background behind calligraphy.' },
  { id: 'p3', title: 'Short-Form Hook — Concept Sprint', tool: 'Placeholder model',
    cats: ['video', 'ai'], related: 'reel-cut-rhythm', placeholder: true,
    prompt: 'Brainstorm ten opening hooks for a 45-second short-form edit. Each hook must be under 8 words, establish the subject instantly, and avoid clickbait. Favor restraint and clarity over shock.' },
  { id: 'p4', title: 'Thumbnail — Contrast Study', tool: 'Placeholder model',
    cats: ['thumbnail', 'ai'], related: 'thumbnail-frame-study', placeholder: true,
    prompt: 'Compose three thumbnail frames for the same subject, each with a different focal strategy: one subject-led, one type-led, one negative-space-led. Emphasize contrast and legibility at 120px width.' }
];

/* ---------- Fath Makkah (flagship) ---------- */
window.FATH = {
  slug: 'fath-makkah',
  title: 'Fath Makkah',
  titleEn: 'The Conquest of Mecca',
  arabicTitle: 'فتح مكة',
  kicker: 'Flagship Project',
  kind: 'Personal Research & Creative Publishing Project',
  format: '36-page e-book (PDF)',
  pageCount: 36,
  disciplines: ['editorial', 'dawah', 'calligraphy'],
  summary: 'A personal research and creative publishing project — a 36-page e-book that revisits the Conquest of Mecca through editorial design, sourced text and calligraphic visual language.',
  stats: [
    { k: '36', v: 'pages' },
    { k: '1', v: 'e-book' },
    { k: '3', v: 'disciplines' }
  ],
  overview: [
    'Fath Makkah — the Conquest of Mecca — is one of the defining moments of Islamic history: a return to the city concluded with restraint, forgiveness and a general amnesty, rather than vengeance. This project is a personal study of that moment, shaped into a long-form visual narrative.',
    'The e-book fuses editorial design, sourced text and calligraphic visual language into a single quiet, reverent reading experience. It is a research project first — a publishing project second — and a demonstration of how the disciplines of this portfolio (editorial storytelling, Dawah visual content, Arabic calligraphy) meet in one sustained piece.'
  ],
  facts: [
    { k: 'Type', v: 'Personal Research & Creative Publishing' },
    { k: 'Format', v: '36-page e-book (PDF)' },
    { k: 'Disciplines', v: 'Editorial · Dawah · Calligraphy' },
    { k: 'Script', v: 'Arabic (فتح مكة) + English' }
  ],
  sections: [
    {
      id: 'concept', title: 'Concept',
      body: [
        'The e-book is structured as a contemplative journey rather than a timeline: context, the march, the entry, and the aftermath — each rendered as its own chapter with a distinct visual rhythm.',
        'The guiding idea is restraint. The subject is profound enough to carry itself; the design\u2019s job is to give it space, stillness and dignity.'
      ]
    },
    {
      id: 'research', title: 'Research & Source',
      body: [
        'The content is drawn from the established narrative of the Conquest of Mecca in 8 AH (630 CE), following the Quraysh\u2019s breach of the Treaty of Hudaybiyyah.',
        'Every quoted verse and narration is sourced. The design treats accuracy as a design constraint: nothing decorative is allowed to compromise the text it carries.'
      ]
    },
    {
      id: 'visual-language', title: 'Visual Language',
      body: [
        'The book uses the same material palette as this site — warm off-white ground, espresso ink, muted gold — so the project reads as a natural extension of the portfolio.',
        'Geometry and abstraction stand in for depiction: girih patterns, the form of the Kaaba rendered as line, and open space as a form of reverence. No figure is depicted.'
      ]
    },
    {
      id: 'typography', title: 'Typography & Calligraphy',
      body: [
        'Arabic calligraphy leads the hierarchy — the title of the event (فتح مكة) as the visual spine of each chapter opening.',
        'English editorial type carries the reading text, with the two scripts balanced so the Arabic is ornament and the English is narrative, never competing.'
      ]
    },
    {
      id: 'deliverables', title: 'Deliverables',
      body: [
        'A 36-page e-book in PDF, laid out for on-screen reading with a print-considered grid.',
        'The full page set is presented below in a reader so the project can be browsed page by page.'
      ]
    }
  ],
  arabicQuote: '\u0625\u0650\u0646\u064e\u0651\u0627 \u0641\u064e\u062a\u064e\u062d\u0652\u0646\u064e\u0627 \u0644\u064e\u0643\u064e \u0641\u064e\u062a\u0652\u062d\u064b\u0627 \u0645\u064f\u0651\u0628\u0650\u064a\u0646\u064b\u0627',
  englishQuote: '\u201cIndeed, We have given you a clear conquest.\u201d — Al-Fath 48:1',
  note: 'Page thumbnails below are placeholders; the finished 36-page spreads will be uploaded in the batch-upload phase.'
};

/* Namelipi planned-collection count (announced honestly, not as completed work) */
window.NAMELIPI_PLANNED = 13;
