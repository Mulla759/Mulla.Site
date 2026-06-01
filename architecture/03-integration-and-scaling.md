# 03 - Integration & scaling (how it plugs into the site)

How any choice from docs 01-02 wires into the **no-build static React site** without breaking
its character, plus the rollout order, scaling, and risks.

## The principle: keep the component shapes, swap the source

`site/AGENT.md` already states the contract:

> "Components take plain props/arrays - replace the static array with `fetch()` results, keep the shape."

So every chapter keeps rendering the same data shape; we only change where the array comes
from. Two new pieces do all the bridging: a **data layer** and a **`MediaPlate`**.

### 1. A tiny data layer (`scripts/data.js`)

A single module that fetches content + a media config and hands components the same arrays they
use today.

```js
// scripts/data.js (sketch, no build step - plain JS on window)
window.MullaData = {
  cfg: { mediaBase: "https://<your-r2-public-host>", tmdbImg: "https://image.tmdb.org/t/p" },
  async posts() {            // writing: markdown manifest OR CMS JSON
    const idx = await fetch("content/index.json").then(r => r.json());
    return idx; // [{ slug, kicker, title, standfirst, bodyUrl|body }]
  },
  posterUrl(review) {        // TMDB or manual
    return review.tmdbPoster
      ? `${this.cfg.tmdbImg}/w780${review.tmdbPoster}`
      : `${this.cfg.mediaBase}/posters/${review.slug}.jpg`;
  },
  mediaUrl(path) { return `${this.cfg.mediaBase}/${path}`; }
};
```

Components call `MullaData.posts()` in a `useEffect` and fall back to the current hardcoded
array if the fetch fails, so the site never renders empty during migration.

### 2. `MediaPlate` (extends today's `Plate`)

Keep `Plate`'s look (grain, earth-tone gradient, locked ratio, `2px` radius); add optional real
media. Backward compatible: no `src`/`video` -> behaves exactly like today.

```jsx
// real image -> <img loading="lazy" decoding="async"> over the grain
// real video -> poster first; on click, attach hls.js to <video> for the .m3u8 (adaptive 4K)
// nothing    -> current toned placeholder
```

hls.js loads from a CDN `<script>` like the other libs; native HLS (Safari) skips it.

### 3. `ArticleBody` (editorial renderer)

Maps markdown/CMS output onto the unused editorial classes already in `tokens.css`
(`.t-body`, `.t-body--lead` drop cap, `.t-pullquote`, `.t-standfirst`, `.t-kicker`) so authored
posts get the magazine treatment automatically. Unifies the Notes teaser / Work feature / Blog
full-text triplication under one `slug`.

## What changes, file by file

| File | Change | Risk |
|---|---|---|
| `index.html` | Add `<script>` for hls.js + markdown parser; load `scripts/data.js` | Low (additive) |
| `scripts/data.js` (new) | Fetch + config + URL helpers | Low |
| `scripts/Shared.jsx` | `Plate` -> `MediaPlate` (optional `src`/`hls`/`poster`) | Med (shared primitive; keep default path intact) |
| `scripts/Blog.jsx` | `entries[]` from `MullaData.posts()`; render via `ArticleBody` | Med |
| `scripts/Notes.jsx`, `Work.jsx` | Read same posts by `slug` | Med (de-duplicate) |
| `scripts/Gallery.jsx`, `Archive.jsx` | `frame`/`poster` -> real URLs via helpers | Low-med |
| `tokens.css` | None needed (classes exist) | None |

Everything is additive and falls back to current placeholders, so the site is shippable at
every step.

## Rollout (each phase independently shippable)

1. **Media URLs first (no backend).** Add `MediaPlate` + a static `media.json` of R2 URLs. Replace a few Gallery/Archive placeholders with real images/video. Proves the pipeline; zero CMS work.
2. **Posters.** Add `tmdbPoster`/`slug` to review records; render via `posterUrl()`; add the TMDB attribution credit.
3. **Writing via markdown.** Add `content/index.json` + markdown posts + `ArticleBody`. Move one essay out of code as a pilot.
4. **Editor UX (optional).** Add Decap `/admin` (or stand up Directus/Sanity) once you want to write without git.
5. **De-duplicate.** Unify Notes/Work/Blog on `slug`.

## Scaling notes

- **Bandwidth** is the cost that scales; R2's zero egress is why Route A stays cheap even if a video goes viral. Managed video (Mux/Stream) scales cost with views.
- **R2 free tier** covers 10 GB + 1M writes + 10M reads/mo; a personal 4K catalog mostly sits in storage at $0.015/GB-mo.
- **Caching**: put Cloudflare's CDN in front of R2 (or use a custom domain on the bucket) so popular assets are edge-cached; markdown/JSON are tiny and cache well.
- **Search/sort/tags** on writing: trivial in a DB CMS (Directus/Sanity); with markdown, generate `index.json` with the fields you need to filter client-side.
- **Backups**: markdown + R2 = your git history + bucket versioning are the backup. A DB CMS needs its own backup plan.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| 4K master too heavy to deliver raw | Always HLS ladder; never a single 4K mp4 in a `<video>` |
| CORS blocks runtime fetch | Set CORS on R2 + CMS; use a custom domain |
| TMDB attribution missed | Add the required logo + notice to a credits area in phase 2 |
| Self-host CMS neglected (security/updates) | Prefer markdown/Decap unless you will maintain a VPS |
| Site looks empty if a fetch fails | Components fall back to current hardcoded arrays |
| Two parallel codebases reappear | Do all of this in `site/scripts/*` (the version `index.html` loads) only |

## Decision needed from you

Pick one per row and I will convert this into a concrete build plan (phase 1 first):

1. **Writing source**: markdown+manifest / Decap / Directus / Sanity / Notion
2. **Video route**: R2 + FFmpeg + hls.js (free) / Cloudflare Stream / Mux
3. **Posters**: TMDB API / manual upload / both
