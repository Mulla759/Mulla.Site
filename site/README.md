# Mulla — `/site`

The personal editorial-magazine website, as a **self-contained static front-end**. Drop this
folder into your monorepo (e.g. `apps/site` or just `/site`) and wire a backend to the data points
noted below.

```
site/
├── index.html          # entry — loads tokens, styles, React, and the chapter scripts (in order)
├── styles/
│   ├── tokens.css      # design system: fonts (@font-face → ../fonts), color, spacing, motion, type roles
│   └── app.css         # resets, keyframes, helpers (.grain-field, .stars-pop, reels)
├── scripts/            # React (JSX, transpiled in-browser by Babel for now)
│   ├── Shared.jsx      # primitive library → window (Micro, Kicker, Shavian, DayNight, Pictograph,
│   │                   #   VinylSpinner, Equalizer, Stars, ArrowLink, Button, Plate, Reveal)
│   ├── Header.jsx      # sticky chapter nav (smooth-scroll + active tracking)
│   ├── Cover.jsx       # cover masthead (day/night micrograph on Central Time, Shavian mark)
│   ├── Work.jsx        # ChapterOpener (shared) + FeatureStory + Work
│   ├── Archive.jsx     # review reel → review modal, photo grid, live rail (now-playing + scrobbles + Letterboxd)
│   ├── Closing.jsx     # Notes (compact fragments) + Bio + Contact (peach + stop-motion strip)
│   ├── App.jsx         # composes chapters + mounts to #root
│   └── image-slot.js   # <image-slot> web component (drop-in photography)
└── fonts/              # Basteleur (Bold/Moonlight), PicNic (woff2/woff/otf)
```

## Run it
It's static — open `index.html` directly, or serve the folder:

```bash
npx serve site        # or: python3 -m http.server -d site
```

No build step is required: JSX is transpiled in the browser by Babel standalone.

## Wire the backend (the data hooks)
Everything below is **static boilerplate today** — these are the integration points:

| Where | File | Replace with |
|---|---|---|
| Recently rated / reviews | `scripts/Archive.jsx` → `ARCHIVE_ITEMS` | Letterboxd RSS / API (title, poster, rating, review, link) |
| Now playing + scrobbles | `scripts/Archive.jsx` → `LiveRail`, `ScrobbleFeed` | Last.fm `user.getRecentTracks` |
| Letterboxd stats card | `scripts/Archive.jsx` → `LiveRail` | Letterboxd profile counts |
| Day / night micrograph | `scripts/Shared.jsx` → `DayNight` | optional: open-source weather (sun/moon + conditions) |
| Notes / essays | `scripts/Closing.jsx` → `Notes` | your CMS / markdown |
| Work features | `scripts/Work.jsx` | your project data |

The components take plain props/arrays, so swapping static data for `fetch()` results is direct.

## Production note
For production, **precompile the JSX** (Vite/esbuild) instead of shipping Babel standalone, and
self-host the two Google fonts. The two substituted fonts (Neue Haas Grotesk → Helvetica stack,
Pacaembu → Space Mono) are defined in `styles/tokens.css` — swap them there when you have the
licensed web files.

## Notes
- All imagery is art-directed `Plate` placeholders. Use real photos by passing `slotId` to `<Plate>`
  (renders an `<image-slot>`) or replacing the plate with an `<img>`.
- `errata_`, the dithered pixel companion, is intentionally not here yet — returns once the earth
  palette is locked.
