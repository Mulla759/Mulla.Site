# 01 - Content backend (writing without touching code)

Goal: Mulla writes and edits essays/notes in a browser (or a simple editor) and they appear on
the site, with **no code edits and no developer in the loop**. The site stays a no-build static
React app that fetches content at runtime.

## Where writing lives today

All writing is hardcoded in JS arrays in the live `scripts/` files:

- `site/scripts/Blog.jsx` - the Reading Room: an `entries[]` array, each `{ id, kicker, title, standfirst, body[] }` where `body` is an array of paragraph strings. Rendered with inline styles.
- `site/scripts/Notes.jsx` - the Notes chapter: a `frags[]` array of `{ tag, kind, title?, body, tone? }`; `kind` is `title | quote | plate | plain`.
- `site/scripts/Work.jsx` - Work features duplicate some of the same essays in a third shape.
- `site/AGENT.md` explicitly marks `Notes.jsx` as the `CMS / markdown` hook.

Problem: the same essay is duplicated across Notes (teaser), Work (feature), and Blog (full).
A backend should unify these under one record with a `slug`.

## Options (open-source first)

### Option 1 - Plain markdown + manifest (most free, most control)

Content is markdown files plus a small `index.json` (the list of posts), hosted as static
files (in the repo's `content/` folder, or on R2). At runtime the site does
`fetch('content/index.json')` then `fetch('content/posts/<slug>.md')`, parses markdown with a
tiny library loaded from a CDN (`marked` or `markdown-it`), and renders it.

- Author workflow: edit `.md` in GitHub's web editor, VS Code, or Obsidian; commit.
- Rich text: markdown (headings, quotes -> pull quotes, images).
- Cost: $0.
- Tradeoff: writing means touching git; fine for you, not for a non-technical guest author.

### Option 2 - Decap CMS (git-based, free admin UI)

Decap (formerly Netlify CMS) is an open-source `/admin` page that gives a real editor UI and
commits markdown to your repo behind the scenes. Pairs perfectly with Option 1's files.

- Author workflow: log in at `/admin`, write in a form/markdown editor, hit publish; Decap commits to git; the static site serves the new file.
- Cost: $0 (MIT). Needs a git host and an OAuth bridge (a tiny Cloudflare Worker or Netlify's built-in) for login.
- Tradeoff: a little setup (auth + deploy trigger); content still flows through git, so "publish" depends on the deploy refreshing static files.

### Option 3 - Self-hosted DB CMS: Directus / Strapi / Payload

A real database-backed CMS with REST/GraphQL APIs, run on a cheap VPS. The site fetches JSON
at runtime; the author uses a polished dashboard.

| | Directus | Strapi | Payload |
|---|---|---|---|
| Model | Database-first (wraps SQL) | Code/visual content types | TypeScript config-as-code |
| Admin UI | Most praised | Good | Good |
| License | BSL (free to self-host under revenue threshold) | MIT (v4) | MIT |
| GraphQL | Built-in | Plugin | Plugin |
| Best for | Non-dev editors, flexible data | Largest plugin ecosystem | TS developers |

- Cost: ~$5-40/mo VPS + optional managed Postgres; software free.
- Tradeoff: you own DevOps (backups, updates, security, uptime). Most powerful author UX of the OSS options, but the heaviest to run.

### Option 4 - Managed CMS: Sanity / Contentful / Storyblok

Hosted; you only model content and write. Site fetches their CDN API at runtime.

- Sanity stands out because it **also hosts images** with on-the-fly transforms, so it can power galleries too (see doc 02), and has a Mux plugin for video.
- Cost: Sanity free dev tier, then ~$15/user/mo + usage. Contentful gets expensive fast at higher tiers.
- Tradeoff: vendor lock-in and CORS/token setup; least effort otherwise.

### Option 5 - Notion / Google Docs as CMS

Write in Notion; a sync or the Notion API feeds JSON to the site.

- Tradeoff: weakest mapping to the editorial typography (block conversion is lossy); good only if you strongly prefer writing in Notion.

## Tradeoff summary

| Option | Cost | Author ergonomics | Ops burden | Fits no-build | Design fidelity |
|---|---|---|---|---|---|
| Markdown + manifest | $0 | Low (git) | None | Excellent | High (you control markdown -> classes) |
| Decap CMS | $0 | Good | Low (auth + deploy) | Good | High |
| Directus/Strapi/Payload | ~$5-40/mo | Best (OSS) | High (you run it) | Good (runtime fetch) | High |
| Sanity (managed) | Free->$$ | Best | None | Good | High (custom renderer) |
| Notion | Free->$ | Great for writing | Low-med | Ok | Lower |

## Recommendation for your goal (free + simple)

Start with **Markdown + manifest**, add **Decap** when you want a nicer editor. It is $0,
self-owned, and matches `AGENT.md`. If you later want a guest writer or a true dashboard,
graduate to **Directus** (self-host) or **Sanity** (managed).

## Mapping content to the existing design

Your `site/styles/tokens.css` already defines editorial classes the blog does not yet use:
`.t-body`, `.t-body--lead::first-letter` (drop cap), `.t-pullquote`, `.t-standfirst`, `.t-kicker`.
A small `ArticleBody` renderer (see doc 03) maps markdown/CMS output onto these so authored
posts get drop caps and pull quotes automatically and stay on-brand. Add a shared `slug` field
so one post record feeds the Notes teaser, the Work feature, and the full Reading-room article
(removing today's triplication).
