/* ==========================================================================
   Emdadul Hoque Emon — app logic
   Hash router · data-driven rendering · placeholder art engine · drawer · modals
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------- utils ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function catBySlug(slug) { return SITE_CATS[slug]; }
  function catName(slug) { return (catBySlug(slug) || {}).name || slug; }
  function catNames(slugs) { return slugs.map(catName); }

  const SITE_CATS = {};
  CATEGORIES.forEach(c => { SITE_CATS[c.slug] = c; });

  const state = { workFilter: 'all', promptFilter: 'all' };

  /* ---------- placeholder art engine ----------
     Generates abstract, deterministic SVG posters (data URIs) from a seed.
     No network, no assets — swap in real images later by replacing the <img> src. */
  const PALETTE = {
    light: ['#f6f1e6', '#efe7d6', '#e7dcc4', '#ece2cd'],
    dark:  ['#1e1710', '#292017', '#241c12'],
    gold:  ['#a97c2e', '#c4933a', '#d9bd85', '#e8d7b0'],
    ink:   ['#211a11', '#3a3126']
  };

  function art(seed, motif, w, h) {
    const rng = mulberry32((seed || 1) * 2654435761 + 7);
    const dark = rng() > 0.55;
    const grounds = dark ? PALETTE.dark : PALETTE.light;
    const ground = grounds[Math.floor(rng() * grounds.length)];
    const accPool = dark ? PALETTE.gold : PALETTE.gold.concat(PALETTE.ink);
    const accent = accPool[Math.floor(rng() * accPool.length)];
    const accent2 = accPool[(Math.floor(rng() * accPool.length) + 2) % accPool.length];

    let body = '';
    if (motif === 'girih') body = motifGirih(w, h, ground, accent, accent2);
    else if (motif === 'motion') body = motifMotion(rng, w, h, ground, accent, accent2);
    else if (motif === 'poster') body = motifPoster(w, h, ground, accent, accent2);
    else body = motifEditorial(w, h, ground, accent, accent2);

    const noise = `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/></filter>`;
    const grain = `<rect width="${w}" height="${h}" filter="url(#n)"/>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}${noise}${grain}</svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function star(cx, cy, r, color, sw) {
    const sq = rot => {
      let p = '';
      for (let i = 0; i < 4; i++) { const a = rot + i * Math.PI / 2; p += `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)} `; }
      return p.trim();
    };
    return `<polygon points="${sq(0)}" fill="none" stroke="${color}" stroke-width="${sw || 1.1}"/><polygon points="${sq(Math.PI / 4)}" fill="none" stroke="${color}" stroke-width="${sw || 1.1}"/>`;
  }

  function motifGirih(w, h, ground, accent, accent2) {
    let s = `<rect width="${w}" height="${h}" fill="${ground}"/>`;
    const cell = Math.min(w, h) * 0.19, r = cell * 0.35;
    s += `<g stroke="${accent}" stroke-width="1" opacity="0.32">`;
    for (let y = -h; y < h * 2; y += cell) { s += `<line x1="0" y1="${y}" x2="${w}" y2="${y - h}"/><line x1="0" y1="${y}" x2="${w}" y2="${y + h}"/>`; }
    s += `</g>`;
    for (let y = -r; y < h + r; y += cell) for (let x = -r; x < w + r; x += cell) s += star(x, y, r, accent);
    s += star(w / 2, h / 2, r * 1.9, accent2, 1.4);
    s += `<circle cx="${w / 2}" cy="${h / 2}" r="${r * 0.16}" fill="${accent2}"/>`;
    return s;
  }

  function motifPoster(w, h, ground, accent, accent2) {
    const cx = w * 0.62, cy = h * 0.42, R = Math.min(w, h) * 0.3;
    let s = `<rect width="${w}" height="${h}" fill="${ground}"/>`;
    s += `<g stroke="${accent}" opacity="0.13" stroke-width="1">`;
    for (let x = 0; x <= w; x += 44) s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
    for (let y = 0; y <= h; y += 44) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
    s += `</g>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${accent}" stroke-width="2"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${R * 0.6}" fill="${accent}"/>`;
    s += `<rect x="0" y="${h * 0.13}" width="${w}" height="${h * 0.055}" fill="${accent2}"/>`;
    s += `<line x1="0" y1="${h}" x2="${w}" y2="0" stroke="${accent}" stroke-width="3" opacity="0.7"/>`;
    return s;
  }

  function motifMotion(rng, w, h, ground, accent, accent2) {
    let s = `<rect width="${w}" height="${h}" fill="${ground}"/>`;
    const n = 13;
    for (let i = 0; i < n; i++) {
      const y = h * (i / (n - 1));
      const bw = (rng() * 10 + 2).toFixed(1);
      const op = (0.12 + rng() * 0.5).toFixed(2);
      s += `<line x1="${w * 0.08}" y1="${y}" x2="${w * 0.92}" y2="${y - h * 0.24}" stroke="${accent}" stroke-width="${bw}" opacity="${op}"/>`;
    }
    s += `<circle cx="${w * 0.5}" cy="${h * 0.5}" r="${Math.min(w, h) * 0.2}" fill="${accent2}"/>`;
    s += `<circle cx="${w * 0.5}" cy="${h * 0.5}" r="${Math.min(w, h) * 0.2}" fill="none" stroke="${ground}" stroke-width="2"/>`;
    return s;
  }

  function motifEditorial(w, h, ground, accent, accent2) {
    let s = `<rect width="${w}" height="${h}" fill="${ground}"/>`;
    const cx = w * 0.28, cy = h * 0.74;
    for (let i = 1; i <= 7; i++) s += `<circle cx="${cx}" cy="${cy}" r="${i * (Math.min(w, h) * 0.1)}" fill="none" stroke="${accent}" stroke-width="1.4" opacity="${(0.55 - i * 0.055).toFixed(2)}"/>`;
    s += `<line x1="${w * 0.66}" y1="0" x2="${w * 0.66}" y2="${h}" stroke="${accent}" stroke-width="2"/>`;
    s += `<g fill="${accent2}">`;
    for (let x = w * 0.73; x < w; x += 48) for (let y = 40; y < h; y += 48) s += `<circle cx="${x}" cy="${y}" r="3"/>`;
    s += `</g>`;
    return s;
  }

  /* ---------- icon helpers ---------- */
  const ICONS = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    arrow: '<svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowUp: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>'
  };
  function socialChip(s) {
    return `<a class="social-chip" href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.label)}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${SOCIAL_ICONS[s.id] || ''}</svg>${esc(s.label)}</a>`;
  }

  /* ---------- counts ---------- */
  function countForCat(slug) {
    let n = 0;
    PROJECTS.forEach(p => { if (p.cats.includes(slug)) n++; });
    VIDEOS.forEach(v => { if (v.cats.includes(slug)) n++; });
    PROMPTS.forEach(p => { if (p.cats.includes(slug)) n++; });
    return n;
  }

  /* ---------- card builders ---------- */
  function projectCard(p, wide) {
    const badge = p.placeholder ? '<span class="card__badge card__badge--ghost">Placeholder</span>' : '';
    const cats = p.cats.map(sl => `<span class="card__chip">${esc(catName(sl))}</span>`).join('');
    const img = p.image || art(p.seed, p.art, 800, 1000);
    return `<article class="card${wide ? '' : ''}" data-action="open-project" data-slug="${p.slug}" tabindex="0" role="button" aria-label="Open ${esc(p.title)}">
      <div class="card__media"><img src="${img}" alt="" loading="lazy"/>
        <div class="card__badges">${badge}</div>
        <div class="card__overlay"><span class="veil"><span class="play-btn" style="width:44px;height:44px;background:transparent;color:var(--paper)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></span></div>
      </div>
      <div class="card__body">
        <h3 class="card__title">${esc(p.title)}</h3>
        <span class="card__sub">${esc(p.medium)}</span>
        <div class="card__meta">${cats}</div>
      </div>
    </article>`;
  }

  function videoCard(v) {
    const platform = v.platform === 'youtube' ? 'YouTube' : 'Facebook';
    return `<article class="card" data-action="open-video" data-slug="${v.slug}" tabindex="0" role="button" aria-label="Play ${esc(v.title)}">
      <div class="card__media card__media--video"><img src="${v.thumbnail || art(v.seed, 'motion', 1280, 720)}" alt="" loading="lazy"/>
        <div class="card__badges"><span class="card__badge">${platform}</span>${v.placeholder ? '<span class="card__badge card__badge--ghost">Placeholder</span>' : ''}</div>
        <div class="card__overlay"><span class="veil"><span class="play-btn">${ICONS.play}</span></span></div>
      </div>
      <div class="card__body">
        <h3 class="card__title">${esc(v.title)}</h3>
        <span class="card__sub">${esc(v.duration)} · ${catNames(v.cats).join(' · ')}</span>
      </div>
    </article>`;
  }

  function catCard(c) {
    const n = countForCat(c.slug);
    return `<a class="cat-card reveal" href="#/work/${c.slug}" data-nav>
      <span class="cat-card__arrow">${ICONS.arrowUp}</span>
      <span class="cat-card__name">${esc(c.name)}</span>
      <span class="cat-card__count">${n} item${n === 1 ? '' : 's'}</span>
    </a>`;
  }

  /* ---------- page: home ---------- */
  function renderHome() {
    document.title = SITE.name + ' — ' + SITE.role;
    const featured = PROJECTS.filter(p => p.featured);
    const first = featured[0];
    const rest = featured.slice(1);
    const marqueeItems = CATEGORIES.map(c => esc(c.name)).concat(['Dawah · Islamic Visual', 'Calligraphy · Namelipi']).join('<span class="sep">✦</span>');

    return `
    <section class="hero">
      <div class="container hero__inner">
        <span class="hero__kicker"><span class="dot"></span> Independent visual practice</span>
        <h1 class="hero__title">${SITE.name.split(' ').map((w, i) => i === 2 ? `<em>${esc(w)}</em>` : esc(w)).join(' ')}</h1>
        <p class="hero__lead">${esc(SITE.tagline)}</p>
        <div class="hero__meta">
          <span class="tag tag--gold">Short-form video editing</span>
          <span class="tag tag--gold">Poster &amp; graphic design</span>
          <span class="tag">Thumbnails</span><span class="tag">Motion</span>
          <span class="tag">Dawah visual content</span><span class="tag">Namelipi</span>
        </div>
        <div class="hero__meta" style="margin-top:.4rem">
          <a class="btn btn--ink" href="#/work" data-nav>View the work ${ICONS.arrow}</a>
          <a class="btn btn--ghost" href="#/fath-makkah" data-nav>Fath Makkah</a>
        </div>
      </div>
    </section>

    <div class="marquee" aria-hidden="true"><div class="marquee__track">
      <span class="marquee__item">${marqueeItems}</span>
      <span class="marquee__item">${marqueeItems}</span>
    </div></div>

    <section class="section" id="selected">
      <div class="container">
        <div class="section__head">
          <div><span class="eyebrow">Selected</span><h2 class="section__title">Featured work</h2></div>
          <a class="section__link" href="#/work" data-nav>All work ${ICONS.arrow}</a>
        </div>
        <div class="grid grid--featured">
          ${first ? `<div class="featured featured--wide reveal">${projectCard(first)}</div>` : ''}
        </div>
        <div class="grid grid--work" style="margin-top:1.5rem">
          ${rest.map(p => `<div class="reveal">${projectCard(p)}</div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        ${flagshipBand()}
      </div>
    </section>

    <section class="section" id="categories">
      <div class="container">
        <div class="section__head">
          <div><span class="eyebrow">Index</span><h2 class="section__title">Disciplines</h2></div>
        </div>
        <div class="grid grid--cats">${CATEGORIES.map(catCard).join('')}</div>
      </div>
    </section>

    <section class="section" id="video">
      <div class="container">
        <div class="section__head">
          <div><span class="eyebrow">In motion</span><h2 class="section__title">Video</h2></div>
          <a class="section__link" href="#/work/video" data-nav>Video editing ${ICONS.arrow}</a>
        </div>
        <div class="grid grid--2">${VIDEOS.map(v => `<div class="reveal">${videoCard(v)}</div>`).join('')}</div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="grid grid--2">
          ${islamicTeaser()}
          ${promptTeaser()}
        </div>
      </div>
    </section>

    <section class="section section--tight" id="about-blurb">
      <div class="container">
        <div class="flagship-band" style="background:var(--paper-2);color:var(--ink);grid-template-columns:1fr">
          <div>
            <span class="eyebrow">About</span>
            <h2 class="flagship-band__title" style="color:var(--ink)">A visual practice with a devoted thread</h2>
            <p class="flagship-band__lead" style="color:var(--ink-2)">${esc(SITE.shortBio || 'Visual designer, video editor and creative content creator — with a focused practice in Dawah and Islamic visual content.')}</p>
            <div style="margin-top:1.4rem;display:flex;gap:.8rem;flex-wrap:wrap">
              <a class="btn btn--ink" href="#/about" data-nav>More about me ${ICONS.arrow}</a>
              <a class="btn btn--ghost" href="#/contact" data-nav>Get in touch</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  }

  function flagshipBand() {
    return `<div class="flagship-band reveal">
      <div class="flagship-band__glow"></div>
      <div>
        <span class="flagship-band__kicker"><span class="dot"></span> Flagship project</span>
        <h2 class="flagship-band__title">Fath Makkah</h2>
        <p class="flagship-band__arabic" lang="ar">${FATH.arabicTitle}</p>
        <p class="flagship-band__lead">${esc(FATH.summary)}</p>
        <div class="flagship-band__stats">
          ${FATH.stats.map(s => `<div class="flagship-band__stat"><b>${esc(s.k)}</b><span>${esc(s.v)}</span></div>`).join('')}
        </div>
        <a class="btn btn--gold" href="#/fath-makkah" data-nav>Read the case study ${ICONS.arrow}</a>
      </div>
      <div class="flagship-band__visual"><img src="${art(777, 'girih', 800, 1000)}" alt="Fath Makkah e-book cover (placeholder)" loading="lazy"/></div>
    </div>`;
  }

  function islamicTeaser() {
    return `<a class="teaser teaser--night reveal" href="#/islamic-corner" data-nav>
      <span class="teaser__script" lang="ar">الركن الإسلامي</span>
      <h3 class="teaser__title">Islamic Corner</h3>
      <p class="teaser__lead">A reverent, growing collection — ayah posters, sourced text, Arabic calligraphy and Bengali Namelipi.</p>
      <span class="teaser__cta">Enter the collection ${ICONS.arrow}</span>
    </a>`;
  }
  function promptTeaser() {
    return `<a class="teaser teaser--paper reveal" href="#/prompts" data-nav>
      <span class="teaser__script" style="font-family:var(--font-body);font-size:1.2rem;letter-spacing:.05em;color:var(--gold)">PROMPT ARCHIVE</span>
      <h3 class="teaser__title">How it's made</h3>
      <p class="teaser__lead">The prompts behind the AI-assisted work — kept transparent, as craft rather than magic.</p>
      <span class="teaser__cta">Browse the archive ${ICONS.arrow}</span>
    </a>`;
  }

  /* ---------- page: work index ---------- */
  function renderWorkIndex() {
    document.title = 'Work — ' + SITE.name;
    const items = allWorkItems();
    return `
    <section class="hero" style="padding-bottom:2rem">
      <div class="container">
        <span class="eyebrow">Portfolio</span>
        <h1 class="section__title" style="font-size:var(--fs-display);margin-top:.4rem">Work</h1>
        <p class="hero__lead" style="max-width:56ch">${items.length} entries across the disciplines — videos, posters, motion and editorial. Filter by category, or open any piece for detail.</p>
        <div class="filter-row" id="work-filters" style="margin-top:1.5rem">${filterChips('work')}</div>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container"><div class="grid grid--work" id="work-grid">${workGrid(state.workFilter)}</div></div>
    </section>`;
  }
  function allWorkItems() { return PROJECTS.concat(VIDEOS); }
  function workGrid(filter) {
    const items = allWorkItems().filter(i => filter === 'all' || i.cats.includes(filter));
    if (!items.length) return `<p style="color:var(--ink-3)">Nothing here yet — this category will fill during the batch-upload phase.</p>`;
    return items.map(i => `<div class="reveal">${i.platform ? videoCard(i) : projectCard(i)}</div>`).join('');
  }
  function filterChips(kind) {
    const active = kind === 'work' ? state.workFilter : state.promptFilter;
    const chips = [{ slug: 'all', name: 'All' }].concat(CATEGORIES);
    return chips.map(c => `<button class="filter-chip${active === c.slug ? ' is-active' : ''}" data-action="filter" data-kind="${kind}" data-cat="${c.slug}">${esc(c.name)}</button>`).join('');
  }
  function catNavChips(current) {
    const chips = [{ slug: 'all', name: 'All' }].concat(CATEGORIES);
    return chips.map(c => {
      const href = c.slug === 'all' ? '#/work' : '#/work/' + c.slug;
      const active = c.slug === current;
      return `<a class="filter-chip${active ? ' is-active' : ''}" href="${href}" data-nav>${esc(c.name)}</a>`;
    }).join('');
  }

  /* ---------- page: category hub ---------- */
  function renderCategory(slug) {
    const c = catBySlug(slug);
    if (!c) return renderNotFound();
    document.title = c.name + ' — ' + SITE.name;
    const projects = PROJECTS.filter(p => p.cats.includes(slug));
    const videos = VIDEOS.filter(v => v.cats.includes(slug));
    const prompts = PROMPTS.filter(p => p.cats.includes(slug));
    const total = projects.length + videos.length + prompts.length;

    let body = '';
    if (projects.length) body += `<h3 class="eyebrow" style="margin-bottom:1rem">Design</h3><div class="grid grid--work">${projects.map(p => `<div class="reveal">${projectCard(p)}</div>`).join('')}</div>`;
    if (videos.length) body += `<h3 class="eyebrow" style="margin:2.5rem 0 1rem">Video</h3><div class="grid grid--2">${videos.map(v => `<div class="reveal">${videoCard(v)}</div>`).join('')}</div>`;

    if (slug === 'calligraphy') body += namelipiNote();
    if (slug === 'ai') body += aiNote(prompts);
    if (!projects.length && !videos.length && slug !== 'ai') body += `<p style="color:var(--ink-3);padding:2rem 0">This category is prepared but not yet populated — content lands in the batch-upload phase.</p>`;

    return `
    <section class="hero" style="padding-bottom:2rem">
      <div class="container">
        <a class="section__link" href="#/work" data-nav style="margin-bottom:.9rem">← All work</a>
        <h1 class="section__title" style="font-size:var(--fs-display);margin-top:.2rem">${esc(c.name)}</h1>
        <p class="hero__lead" style="max-width:60ch;margin-top:.5rem">${esc(c.blurb)}</p>
        <div class="hero__meta" style="margin-top:1rem"><span class="tag">${total} item${total === 1 ? '' : 's'}</span></div>
        <div class="filter-row" style="margin-top:1.5rem">${catNavChips(slug)}</div>
      </div>
    </section>
    <section class="section" style="padding-top:0"><div class="container">${body}</div></section>`;
  }

  function namelipiNote() {
    return `<div class="flagship-band" style="background:var(--espresso-night);color:var(--paper);margin-top:2.5rem;grid-template-columns:1fr">
      <div class="flagship-band__glow"></div>
      <div>
        <span class="flagship-band__kicker"><span class="dot"></span> Namelipi · <span lang="bn">নামলিপি</span></span>
        <h3 class="flagship-band__title" style="font-size:clamp(1.6rem,3vw,2.4rem)">A planned collection of ${NAMELIPI_PLANNED}</h3>
        <p class="flagship-band__lead">${NAMELIPI_PLANNED} Bengali-script lettering pieces are prepared and will be uploaded as a dedicated set. Shown as placeholders until the batch-upload phase.</p>
      </div>
    </div>`;
  }
  function aiNote(prompts) {
    return `<div class="flagship-band" style="background:var(--paper-2);color:var(--ink);margin-top:2.5rem;grid-template-columns:1fr">
      <div>
        <span class="eyebrow">Cross-cutting</span>
        <h3 class="flagship-band__title" style="color:var(--ink);font-size:clamp(1.6rem,3vw,2.4rem)">AI is a tool, not a category</h3>
        <p class="flagship-band__lead" style="color:var(--ink-2)">AI-assisted work is tagged onto other projects rather than siloed here. The Prompt Archive keeps the process transparent.</p>
        <div style="margin-top:1.2rem"><a class="btn btn--ink" href="#/prompts" data-nav>Open the Prompt Archive ${ICONS.arrow}</a></div>
        ${prompts.length ? `<div style="margin-top:1.8rem">${prompts.map(promptItem).join('')}</div>` : ''}
      </div>
    </div>`;
  }

  /* ---------- page: Fath Makkah ---------- */
  function renderFath() {
    document.title = 'Fath Makkah — ' + SITE.name;
    const pages = [];
    for (let i = 1; i <= FATH.pageCount; i++) pages.push(i);
    return `
    <section class="fath-hero">
      <div class="container">
        <span class="eyebrow" style="justify-content:center">${FATH.kicker}</span>
        <p class="fath-hero__script" lang="ar">${FATH.arabicTitle}</p>
        <h1 class="fath-hero__title">${esc(FATH.title)}</h1>
        <p class="hero__lead" style="max-width:60ch;margin-inline:auto">${esc(FATH.titleEn)} — ${esc(FATH.kind)}</p>
        <div class="fath-hero__meta">${FATH.disciplines.map(d => `<span class="tag tag--gold">${esc(catName(d))}</span>`).join('')}</div>
        <div class="fath-hero__rule"></div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container case-grid">
        <aside class="case-aside">
          <span class="eyebrow" style="margin-bottom:1rem">Overview</span>
          ${FATH.overview.map(p => `<p class="prose" style="color:var(--ink-2);margin-bottom:1rem">${esc(p)}</p>`).join('')}
          <ul class="fact-list" style="margin-top:1.5rem">
            ${FATH.facts.map(f => `<li><span class="k">${esc(f.k)}</span><span class="v">${esc(f.v)}</span></li>`).join('')}
          </ul>
        </aside>
        <div>
          ${FATH.sections.map(s => `<div class="case-section reveal"><h2>${esc(s.title)}</h2>${s.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>`).join('')}
          <blockquote class="pull-quote">
            <span class="pull-quote__ar" lang="ar">${FATH.arabicQuote}</span>
            <span class="pull-quote__en">${esc(FATH.englishQuote)}</span>
          </blockquote>
        </div>
      </div>
    </section>

    <section class="section section--tight" id="ebook">
      <div class="container">
        <div class="section__head">
          <div><span class="eyebrow">The book</span><h2 class="section__title">Read the ${FATH.pageCount}-page e-book</h2></div>
          <button class="btn btn--ink" data-action="open-reader" data-page="1">Open reader ${ICONS.arrow}</button>
        </div>
        <div class="ebook-strip">
          ${pages.map(i => `<div class="ebook-page" data-action="open-reader" data-page="${i}" role="button" tabindex="0" aria-label="Page ${i}"><img src="${art(900 + i, 'editorial', 600, 800)}" alt="" loading="lazy"/><span class="ebook-page__num">${i}</span></div>`).join('')}
        </div>
        <p class="placeholder-note">${ICONS.info} ${esc(FATH.note)}</p>
      </div>
    </section>`;
  }

  /* ---------- page: Islamic Corner ---------- */
  function renderIslamic() {
    document.title = 'Islamic Corner — ' + SITE.name;
    const items = PROJECTS.filter(p => p.cats.includes('dawah') || p.cats.includes('calligraphy'));
    const videos = VIDEOS.filter(v => v.cats.includes('dawah'));
    return `
    <section class="fath-hero">
      <div class="container">
        <span class="eyebrow" style="justify-content:center">A living collection</span>
        <p class="fath-hero__script" style="font-size:clamp(2.6rem,9vw,6rem)">الركن الإسلامي</p>
        <h1 class="fath-hero__title">Islamic Corner</h1>
        <p class="hero__lead" style="max-width:60ch;margin-inline:auto">A reverent, growing archive of Dawah visual content — ayah and hadith graphics, sourced text, Arabic calligraphy and Bengali Namelipi.</p>
        <div class="fath-hero__rule"></div>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container">
        ${items.length ? `<div class="grid grid--work">${items.map(p => `<div class="reveal">${projectCard(p)}</div>`).join('')}</div>` : `<p style="color:var(--ink-3)">The collection is being prepared.</p>`}
        ${videos.length ? `<h3 class="eyebrow" style="margin:2.5rem 0 1rem">Video</h3><div class="grid grid--2">${videos.map(v => `<div class="reveal">${videoCard(v)}</div>`).join('')}</div>` : ''}
        ${namelipiNote()}
        <p class="placeholder-note" style="margin-top:2rem">${ICONS.info} Entries above are placeholders; the full collection uploads in the batch-upload phase. Every quoted text will be sourced.</p>
      </div>
    </section>`;
  }

  /* ---------- page: Prompt Archive ---------- */
  function renderPrompts() {
    document.title = 'Prompt Archive — ' + SITE.name;
    return `
    <section class="hero" style="padding-bottom:2rem">
      <div class="container">
        <span class="eyebrow">Process, kept transparent</span>
        <h1 class="section__title" style="font-size:var(--fs-display);margin-top:.4rem">Prompt Archive</h1>
        <p class="hero__lead" style="max-width:60ch">The prompts behind the AI-assisted work — the raw material, the tool, and the piece it fed into. AI here is one tool in a wider kit, shown honestly.</p>
        <div class="filter-row" style="margin-top:1.5rem">${filterChips('prompts')}</div>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container" id="prompt-list">${promptList(state.promptFilter)}</div>
    </section>`;
  }
  function promptList(filter) {
    const items = PROMPTS.filter(p => filter === 'all' || p.cats.includes(filter));
    if (!items.length) return `<p style="color:var(--ink-3)">No prompts in this category yet.</p>`;
    return items.map(promptItem).join('');
  }
  function promptItem(p) {
    const rel = PROJECTS.find(x => x.slug === p.related) || VIDEOS.find(x => x.slug === p.related);
    return `<div class="prompt-item reveal" style="margin-bottom:1.1rem">
      <div class="prompt-item__head"><span class="prompt-item__tool">${esc(p.tool)}</span>${p.cats.map(c => `<span class="card__chip">${esc(catName(c))}</span>`).join('')}</div>
      <h3 class="prompt-item__title">${esc(p.title)}</h3>
      <div class="prompt-item__prompt">${esc(p.prompt)}</div>
      ${rel ? `<a class="prompt-item__link" href="#/work" data-action="open-project" data-slug="${rel.slug}">→ feeds into: ${esc(rel.title)}</a>` : ''}
    </div>`;
  }

  /* ---------- page: about ---------- */
  function renderAbout() {
    document.title = 'About — ' + SITE.name;
    return `
    <section class="hero" style="padding-bottom:2.5rem">
      <div class="container">
        <span class="eyebrow">About</span>
        <h1 class="section__title" style="font-size:var(--fs-display);margin-top:.4rem">${SITE.name}</h1>
        <p class="hero__lead" style="margin-top:.5rem">${esc(SITE.role)}</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container about-grid">
        <div class="prose reveal">
          <p class="lead-in">${esc(SITE.shortBio)}</p>
          <p>My practice centres on <strong>short-form video editing</strong> and <strong>poster &amp; graphic design</strong>, and extends into thumbnail design, motion, social-media design and editorial storytelling.</p>
          <p>A devoted thread of the work is <strong>Dawah — Islamic visual content</strong> — where sourced text, Arabic calligraphy and Bengali Namelipi lettering combine into reverent, contemplative visuals. The flagship project, <strong>Fath Makkah</strong>, is a 36-page e-book that brings these disciplines together in one sustained piece.</p>
          <p>I also work with <strong>AI as one tool in a wider kit</strong>, and keep a <a href="#/prompts" data-nav style="border-bottom:1px solid var(--line-gold)">Prompt Archive</a> so the process stays transparent — how a piece was made, not only that it was made.</p>
        </div>
        <aside class="reveal">
          <span class="eyebrow" style="margin-bottom:1rem">Facts</span>
          <ul class="fact-list">
            <li><span class="k">Role</span><span class="v">Visual Designer · Video Editor · Creator</span></li>
            <li><span class="k">Core strengths</span><span class="v">Short-form video · Poster design</span></li>
            <li><span class="k">Base</span><span class="v">${esc(SITE.location || 'Bangladesh')}</span></li>
            <li><span class="k">Scripts in practice</span><span class="v">English · Bengali · Arabic</span></li>
            <li><span class="k">Email</span><span class="v" style="word-break:break-all"><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></span></li>
          </ul>
          <div style="margin-top:1.5rem"><a class="btn btn--ink" href="#/contact" data-nav>Contact ${ICONS.arrow}</a></div>
        </aside>
      </div>
    </section>`;
  }

  /* ---------- page: contact ---------- */
  function renderContact() {
    document.title = 'Contact — ' + SITE.name;
    return `
    <section class="hero" style="padding-bottom:2.5rem">
      <div class="container">
        <span class="eyebrow">Contact</span>
        <h1 class="section__title" style="font-size:var(--fs-display);margin-top:.4rem">Get in touch</h1>
        <p class="hero__lead" style="margin-top:.5rem;max-width:56ch">For collaborations, commissions or just a conversation — the most direct route is email. Every channel below is real and active.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container contact-grid">
        <div class="reveal">
          <a class="contact-card" href="mailto:${esc(SITE.email)}">
            <span class="contact-card__icon">${ICONS.mail}</span>
            <span><b>Email</b><span>${esc(SITE.email)}</span></span>
          </a>
          <p class="placeholder-note" style="margin-top:1.2rem">${ICONS.info} Social URLs are placeholders until the real profile links are added.</p>
        </div>
        <div class="reveal">
          <span class="eyebrow" style="margin-bottom:1rem">Channels</span>
          <div class="grid grid--2" style="gap:.7rem">${SITE.socials.map(s => `<a class="contact-card" href="${s.url}" target="_blank" rel="noopener noreferrer"><span class="contact-card__icon" style="background:var(--paper-2);color:var(--ink)"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${SOCIAL_ICONS[s.id] || ''}</svg></span><span><b>${esc(s.label)}</b></span></a>`).join('')}</div>
        </div>
      </div>
    </section>`;
  }

  /* ---------- page: not found ---------- */
  function renderNotFound() {
    document.title = 'Not found — ' + SITE.name;
    return `<section class="hero"><div class="container"><span class="eyebrow">404</span><h1 class="section__title" style="font-size:var(--fs-display);margin-top:.4rem">Page not found</h1><p class="hero__lead" style="margin-top:.5rem">That route doesn't exist yet.</p><div style="margin-top:1.5rem"><a class="btn btn--ink" href="#/" data-nav>Back home</a></div></div></section>`;
  }

  /* ---------- modal: project ---------- */
  function openProjectModal(slug) {
    const p = PROJECTS.find(x => x.slug === slug) || VIDEOS.find(x => x.slug === slug);
    if (!p) return;
    const media = p.platform ? videoMedia(p) : `<img src="${p.image || art(p.seed, p.art, 1200, 900)}" alt=""/>`;
    const meta = [];
    if (p.medium) meta.push(`<div class="modal__fact"><b>Medium</b><span>${esc(p.medium)}</span></div>`);
    if (p.platform) meta.push(`<div class="modal__fact"><b>Platform</b><span>${p.platform === 'youtube' ? 'YouTube' : 'Facebook'}</span></div>`);
    if (p.duration) meta.push(`<div class="modal__fact"><b>Duration</b><span>${esc(p.duration)}</span></div>`);
    if (p.tools) meta.push(`<div class="modal__fact"><b>Tools</b><span>${esc(p.tools)}</span></div>`);
    setModal(`
      <div class="modal__card" role="dialog" aria-modal="true" aria-label="${esc(p.title)}">
        <button class="modal__close" data-close aria-label="Close"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
        <div class="modal__media ${p.platform ? '' : 'modal__media--poster'}">${media}</div>
        <div class="modal__body">
          <span class="modal__kicker">${esc(p.platform ? 'Video' : p.medium)}</span>
          <h2 class="modal__title">${esc(p.title)}</h2>
          <div class="modal__cats">${p.cats.map(c => `<a href="#/work/${c}" data-nav data-close>${esc(catName(c))}</a>`).join('')}</div>
          <p class="modal__desc">${esc(p.summary)}</p>
          <div class="modal__factrow">${meta.join('')}</div>
          ${p.placeholder ? `<p class="placeholder-note">${ICONS.info} This is a structural placeholder — the real asset uploads in the batch-upload phase.</p>` : ''}
        </div>
      </div>`);
  }

  /* ---------- modal: video facade ---------- */
  function openVideoModal(slug) {
    const v = VIDEOS.find(x => x.slug === slug);
    if (!v) return;
    const platform = v.platform === 'youtube' ? 'YouTube' : 'Facebook';
    // Thumbnail-first facade. The iframe is injected only when the user clicks play
    // (on-demand embed) — nothing loads before that.
    const poster = v.thumbnail || art(v.seed, 'motion', 1280, 720);
    const media = `<div class="modal__media" data-video-facade data-yt="${v.youtubeId || ''}" data-platform="${platform}">
      <img src="${poster}" alt="" style="width:100%;height:100%;object-fit:cover"/>
      <button class="facade-play" data-action="load-video" aria-label="Play video">${ICONS.play}</button>
    </div>`;
    setModal(`
      <div class="modal__card" role="dialog" aria-modal="true" aria-label="${esc(v.title)}">
        <button class="modal__close" data-close aria-label="Close"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
        ${media}
        <div class="modal__body">
          <span class="modal__kicker">Video</span>
          <h2 class="modal__title">${esc(v.title)}</h2>
          <div class="modal__cats">${v.cats.map(c => `<a href="#/work/${c}" data-nav data-close>${esc(catName(c))}</a>`).join('')}</div>
          <p class="modal__desc">${esc(v.summary)}</p>
          <div class="modal__factrow">
            <div class="modal__fact"><b>Platform</b><span>${platform}</span></div>
            <div class="modal__fact"><b>Duration</b><span>${esc(v.duration)}</span></div>
            ${v.tools ? `<div class="modal__fact"><b>Tools</b><span>${esc(v.tools)}</span></div>` : ''}
          </div>
          <div style="margin-top:1.1rem"><a class="btn btn--ink" href="https://youtu.be/${v.youtubeId}" target="_blank" rel="noopener noreferrer">Watch on YouTube ${ICONS.arrow}</a></div>
        </div>
      </div>`);
  }

  function videoMedia(p) { return `<img src="${p.thumbnail || art(p.seed, 'motion', 1280, 720)}" alt=""/>`; }

  /* On-demand embed: swap the facade thumbnail for the real YouTube iframe on click. */
  function loadVideo(btn) {
    const wrap = btn.closest('[data-video-facade]');
    if (!wrap) return;
    const id = wrap.getAttribute('data-yt');
    const platform = wrap.getAttribute('data-platform');
    if (id) {
      wrap.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="Video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
      wrap.innerHTML = `<div style="position:absolute;inset:0;display:grid;place-items:center;background:var(--espresso-night)"><p style="color:var(--ink-4);font-size:var(--fs-small)">The ${platform} embed will appear here once the video URL is linked.</p></div>`;
    }
  }

  /* ---------- modal: e-book reader ---------- */
  let readerPage = 1;
  function openReaderModal(page) {
    readerPage = parseInt(page, 10) || 1;
    setReader();
    openModalShell(`<div class="reader" role="dialog" aria-modal="true" aria-label="Fath Makkah e-book reader"></div>`);
    document.querySelector('.reader').innerHTML = readerMarkup();
    document.addEventListener('keydown', onReaderKey);
  }
  function readerMarkup() {
    return `<button class="reader__nav reader__nav--prev" data-action="reader-prev" aria-label="Previous page"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <div class="reader__stage"><img src="${art(900 + readerPage, 'editorial', 700, 934)}" alt="Fath Makkah page ${readerPage} (placeholder)"/></div>
    <button class="reader__nav reader__nav--next" data-action="reader-next" aria-label="Next page"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="reader__counter" data-close aria-label="Close reader">${readerPage} / ${FATH.pageCount} — close ✕</button>`;
  }
  function setReader() {
    if (readerPage < 1) readerPage = 1;
    if (readerPage > FATH.pageCount) readerPage = FATH.pageCount;
    const stage = document.querySelector('.reader');
    if (stage) stage.innerHTML = readerMarkup();
  }
  function onReaderKey(e) {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'ArrowLeft') { readerPage--; setReader(); }
    if (e.key === 'ArrowRight') { readerPage++; setReader(); }
  }

  /* ---------- modal shell ---------- */
  function setModal(inner) { openModalShell(`<div class="modal">${inner}</div>`); }
  function openModalShell(html) {
    const root = $('#modal-root');
    root.innerHTML = `<div class="modal-backdrop" data-close></div>${html}`;
    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const focusable = $('.modal__close, [data-close], .reader__nav, .reader__counter', root);
    if (focusable) setTimeout(() => focusable.focus(), 40);
  }
  function closeModal() {
    const root = $('#modal-root');
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', onReaderKey);
    document.body.style.overflow = '';
    setTimeout(() => { if (!root.classList.contains('is-open')) root.innerHTML = ''; }, 400);
  }

  /* ---------- drawer ---------- */
  const drawer = $('#drawer');
  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    $('#hamburger').setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('#drawer-close').focus(), 40);
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    $('#hamburger').setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function trapFocus(container, e) {
    if (e.key !== 'Tab') return;
    const focusables = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', container).filter(el => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- reveal ---------- */
  function initReveals(scope) {
    const els = $$('.reveal', scope || document);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(el => el.classList.add('is-in')); return; }
    els.forEach(el => {
      const parent = el.parentElement;
      if (parent) { const sibs = $$('.reveal', parent); el.style.setProperty('--d', (Math.min(sibs.indexOf(el), 8) * 0.06) + 's'); }
    });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      els.forEach(el => io.observe(el));
    } else els.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- router ---------- */
  function parseHash() {
    const h = (location.hash || '#/').replace(/^#\/?/, '');
    return h.split('/').filter(Boolean);
  }
  function handleRoute() {
    closeDrawer();
    closeModal();
    const seg = parseHash();
    let html;
    if (seg.length === 0) html = renderHome();
    else if (seg[0] === 'work' && seg[1]) html = renderCategory(seg[1]);
    else if (seg[0] === 'work') html = renderWorkIndex();
    else if (seg[0] === 'fath-makkah') html = renderFath();
    else if (seg[0] === 'islamic-corner') html = renderIslamic();
    else if (seg[0] === 'prompts') html = renderPrompts();
    else if (seg[0] === 'about') html = renderAbout();
    else if (seg[0] === 'contact') html = renderContact();
    else html = renderNotFound();

    state.workFilter = 'all';
    state.promptFilter = 'all';

    const view = $('#main');
    view.innerHTML = html;
    markActiveNav(seg);
    initReveals(view);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  function markActiveNav(seg) {
    $$('.drawer__link').forEach(a => {
      const href = a.getAttribute('href') || '';
      const clean = href.replace(/^#\/?/, '');
      const current = seg.join('/');
      const isActive = (current === clean) || (clean === 'work' && seg[0] === 'work') || (clean === '' && seg.length === 0);
      a.classList.toggle('is-active', isActive);
    });
  }

  /* ---------- delegated events ---------- */
  document.addEventListener('click', e => {
    const close = e.target.closest('[data-close]');
    if (close) { closeModal(); return; }

    const el = e.target.closest('[data-action]');
    if (!el) return;
    if (el.tagName === 'A') e.preventDefault();
    const action = el.getAttribute('data-action');
    if (action === 'open-project') openProjectModal(el.getAttribute('data-slug'));
    else if (action === 'open-video') openVideoModal(el.getAttribute('data-slug'));
    else if (action === 'load-video') loadVideo(el);
    else if (action === 'open-reader') openReaderModal(el.getAttribute('data-page'));
    else if (action === 'reader-prev') { readerPage--; setReader(); }
    else if (action === 'reader-next') { readerPage++; setReader(); }
    else if (action === 'filter') {
      const kind = el.getAttribute('data-kind'), cat = el.getAttribute('data-cat');
      if (kind === 'work') {
        state.workFilter = cat;
        const grid = $('#work-grid'); if (grid) { grid.innerHTML = workGrid(cat); initReveals(grid); }
        const fr = $('#work-filters'); if (fr) { fr.innerHTML = filterChips('work'); }
      } else {
        state.promptFilter = cat;
        const list = $('#prompt-list'); if (list) { list.innerHTML = promptList(cat); initReveals(list); }
        const fr = $('.filter-row'); if (fr && location.hash.includes('prompts')) { fr.innerHTML = filterChips('prompts'); }
      }
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if ($('#modal-root').classList.contains('is-open')) closeModal();
      else if (drawer.classList.contains('is-open')) { closeDrawer(); $('#hamburger').focus(); }
    }
    if (drawer.classList.contains('is-open')) trapFocus($('.drawer__panel'), e);
    if ($('#modal-root').classList.contains('is-open')) trapFocus($('#modal-root'), e);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const el = e.target.closest('[role="button"]');
      if (el && el.getAttribute('data-action')) { e.preventDefault(); el.click(); }
    }
  });

  /* ---------- init ---------- */
  function buildChrome() {
    // drawer categories
    $('#drawer-cats').innerHTML = CATEGORIES.map(c => `<a class="drawer__cat" href="#/work/${c.slug}" data-nav>${esc(c.name)}</a>`).join('');
    // drawer + footer socials
    const socialsHTML = SITE.socials.map(socialChip).join('');
    $('#drawer-socials').innerHTML = socialsHTML;
    $('#foot-socials').innerHTML = socialsHTML;
    // drawer email
    const mail = $('#drawer-email');
    mail.textContent = SITE.email;
    mail.href = 'mailto:' + SITE.email;
    // work count
    $('#drawer-work-count').textContent = allWorkItems().length;

    $('#hamburger').addEventListener('click', openDrawer);
    $('#drawer-close').addEventListener('click', () => { closeDrawer(); $('#hamburger').focus(); });
    $('#drawer-backdrop').addEventListener('click', () => { closeDrawer(); $('#hamburger').focus(); });

    window.addEventListener('scroll', () => {
      $('#site-head').classList.toggle('is-scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  window.addEventListener('hashchange', handleRoute);
  buildChrome();
  handleRoute();
})();
