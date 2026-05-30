# Mulla — My Personal Archive

A personal website that reads like an independent editorial magazine. Six chapters:
Cover → Work → Archive → Notes → Biography → Contact.

## Run it locally
This site loads its components as separate files, so it needs to be **served over http**
(opening `index.html` directly with `file://` won't load the chapters). Pick one:

```bash
# Python 3 (already on most machines)
python3 -m http.server 8080
# then open http://localhost:8080

# or Node
npx serve .
```

Want a true double-click-to-open file with no server? Use **`Mulla-Archive-offline.html`**
(in the repo root) — everything (fonts, photo, components) is inlined into one file.

## Deploy on GitHub Pages
1. Commit this folder to your repo (see below).
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → pick your branch + `/root`
   (or move these files to `/docs` and choose that).
3. Your site goes live at `https://<user>.github.io/<repo>/`.

## Files
- `index.html` — entry point.
- `colors_and_type.css` — design tokens (colors, type, spacing, motion).
- `site.css` — resets, keyframes, scrollbars.
- `Shared.jsx`, `Chrome.jsx`, `Chapter*.jsx`, `App.jsx` — React components (in-browser Babel).
- `image-slot.js` — drag-and-drop image placeholder.
- `fonts/` — Basteleur + PicNic. (Body uses the system Helvetica stack as a stand-in for Neue
  Haas Grotesk; micro uses Space Mono via Google Fonts as a stand-in for Pacaembu — swap when
  you have those files.)
- `portrait-cover.png` — cover photo.

## Production note
This is a **design build** using in-browser Babel — great for previewing and GitHub Pages, but
for a real production app, port these components into a framework (Astro / Next.js) and precompile.
The data sources to wire: **Last.fm** (now playing + scrobbles), **Letterboxd** (archive), and an
open-source **weather/astronomy** feed (the day/night mark). See the handoff README for full specs.
