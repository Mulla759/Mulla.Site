# AGENT.md — working in `/site`

Orientation for AI agents (and humans) extending the **Mulla** personal-archive website. Read this
and `STYLE.md` before writing code. The companion design system (full rationale, voice, content
guidelines) lives one level up in the project `README.md`.

## What this is
A static, single-page editorial-magazine site. Chapters: **Cover → Work → Archive → Notes → Bio →
Contact**, one flowing scroll with a sticky nav. React via in-browser Babel today (precompile for
production).

## Architecture
- **One file per chapter** in `scripts/`. Keep it that way — do **not** collapse sections back into
  one file. `index.html` is just an ordered list of `<script>` tags.
- **`Shared.jsx` is the primitive library.** Reuse its components; don't re-implement micro text,
  plates, stars, pictographs, the day/night mark, etc. It exports everything to `window`.
- **Cross-file sharing is via `window`.** Each `<script type="text/babel">` is its own scope, so every
  file ends with `Object.assign(window, { … })`. Reference shared components/consts as bare globals
  (`ChapterOpener`, `SECTION_PAD`, `Plate`). `App.jsx` must load **last**.
- **Tokens, not literals.** Colors/space/type come from CSS custom properties in `styles/tokens.css`
  (e.g. `var(--ink)`, `var(--vermilion)`, `var(--font-display)`). Global keyframes/helpers are in
  `styles/app.css`. Never hard-code a hex that already has a token.

```
index.html → styles/tokens.css + styles/app.css
           → React/ReactDOM/Babel (CDN)
           → scripts/Shared → Header → Cover → Work → Archive → Notes → Bio → Contact → App
```

## Adding a chapter or feature
1. Create `scripts/MySection.jsx`; export with `Object.assign(window, { MySection })`.
2. Give the `<section id="myid">` a unique id; add it to `CHAPTERS` in `App.jsx` and render it.
3. Add the `<script type="text/babel" src="scripts/MySection.jsx">` tag **before** `App.jsx`.
4. Use `ChapterOpener`, `SECTION_PAD`, and the `Shared` primitives. Match `STYLE.md`.
5. Wrap anything that should animate in on scroll with `<Reveal>`.

## Data hooks (currently static boilerplate → wire your backend here)
| Data | File / symbol | Source |
|---|---|---|
| Reviews / ratings | `Archive.jsx` → `ARCHIVE_ITEMS` | Letterboxd RSS/API |
| Now playing + scrobbles | `Archive.jsx` → `LiveRail`, `ScrobbleFeed` | Last.fm `user.getRecentTracks` |
| Letterboxd stats | `Archive.jsx` → `LiveRail` | Letterboxd profile |
| Day / night | `Shared.jsx` → `DayNight` | optional open-source weather |
| Notes / essays | `Notes.jsx` | CMS / markdown |
| Work features | `Work.jsx` | project data |
| Portrait | `Bio.jsx` → `ThisIsMe` (`assets/headshot.png`) | swap the image |

Components take plain props/arrays — replace the static array with `fetch()` results, keep the shape.

## Conventions & guardrails
- **Don’t fire `IntersectionObserver` for reveals** — the patterns here use scroll listeners with a
  safety timer (`Reveal` in `Shared.jsx`). Reuse `Reveal`.
- **No new fonts, no icon libraries, no emoji.** Direction = typographic marks + tiny CSS pictographs.
- **No boxes/shadows/rounded-corner cards.** Hierarchy is hairlines + scale + paper tone. Square
  corners (`--radius: 0`); plates may use a 2px softening only.
- **Accents are rare.** Vermilion = issue marks + links; earth tones = feature/masthead surfaces;
  amber highlight only as a translucent wash.
- **errata_** (dithered pixel companion + chat-bubble) is planned, not yet built — see project README.
- Run locally: `npx serve site` (no build step). For prod: precompile JSX, self-host the 2 Google fonts.
