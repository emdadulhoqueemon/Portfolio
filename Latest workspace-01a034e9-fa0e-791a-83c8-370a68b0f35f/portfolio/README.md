# Emdadul Hoque Emon — Portfolio

Editorial portfolio of **Emdadul Hoque Emon** — Visual Designer · Video Editor · Creative Content Creator.

No framework, no build step — plain HTML/CSS/JS, served statically. All content is data-driven from a single file.

## Run locally

Any static server works. From the project root:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/ — or just open `index.html`.

## Structure

```
index.html          → app shell (header, drawer, footer, modal root)
css/styles.css      → the full design system (tokens at the top)
js/data.js          → ★ the content model — all projects/videos/prompts live here
js/app.js           → router, renderers, drawer, modals, reveal animations
fonts/              → self-hosted: Outfit, Quakiez, Aref Ruqaa, Noto Serif Bengali
assets/             → avatar, favicon, and real work images (assets/work/)
```

## Adding new work

Edit **`js/data.js`** — add an object to `PROJECTS`, `VIDEOS`, or `PROMPTS`. Nothing else needs to change.

### Project entry

```js
{
  slug: 'my-project',                 // unique kebab-case id (used in the URL)
  title: 'Project title',
  cats: ['poster', 'dawah'],          // one or more of the 9 category slugs
  medium: 'Poster Design',
  tools: 'Adobe Photoshop',           // optional
  featured: true,                     // true → appears on homepage
  image: 'assets/work/my-project.jpg',// real image, or omit → abstract placeholder art
  placeholder: false,                 // true → shows a "Placeholder" chip
  summary: 'One or two factual sentences.'
}
```

### Video entry (thumbnail-first facade)

```js
{
  slug: 'my-video',
  title: 'Video title',
  cats: ['video', 'dawah'],
  platform: 'youtube',                // or 'facebook'
  youtubeId: 'VIDEO_ID',              // YouTube ID → on-demand embed on play
  duration: '2:39',
  tools: 'Premiere Pro / CapCut',
  thumbnail: 'assets/work/my-thumb.jpg', // 16:9; omit → abstract placeholder
  placeholder: false,
  summary: 'One factual sentence.'
}
```

The facade shows the thumbnail; the YouTube iframe loads only when the visitor clicks play. No self-hosted video, no autoplay.

## Design system

- **Palette:** warm off-white `#f6f1e6` · espresso `#211a11` · muted gold `#a97c2e`
- **Type:** Outfit (UI/body) · Quakiez (brand/display) · Aref Ruqaa (Arabic) · Noto Serif Bengali (Namelipi)
- Script-aware: tag text with `lang="ar"` / `lang="bn"` to auto-use the right face.
- Accessibility: skip-link, focus trap, `prefers-reduced-motion` honored, keyboard-operable.

## License note

Outfit, Aref Ruqaa and Noto Serif Bengali are open-source (SIL OFL). **Quakiez** (Almarkhatype) is free for personal use — verify licensing if this ever becomes a commercial project.
