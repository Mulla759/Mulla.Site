# backend — Mulla.Site aggregator

Turns external feeds into **static JSON** the site fetches at runtime. No always-on server
(Route A). First integration: **Letterboxd reviews + TMDB posters**.

```
backend/
  src/
    config.js       env + paths (loads backend/.env)
    letterboxd.js   fetch + parse the Letterboxd RSS feed
    tmdb.js         resolve a film -> one TMDB poster URL
    aggregate.js    orchestrate (parallel TMDB lookups) -> write JSON
  .env.example      copy to .env and add your TMDB key
```

Output: `../site/data/letterboxd.json` (served by the site at `/data/letterboxd.json`).

## Setup

```bash
cd backend
npm install
cp .env.example .env        # then paste your TMDB_API_KEY into .env
npm run sync                # fetch, enrich, write the JSON
```

- **No TMDB key yet?** It still works — posters fall back to the images already in the
  Letterboxd feed. Add `TMDB_API_KEY` later to upgrade to TMDB posters.
- Get a free key at https://www.themoviedb.org/settings/api (non-commercial; attribution
  required — keep a small "Data from TMDB" credit on the site).

## Refresh / automate

Re-run `npm run sync` whenever you want fresh data, or schedule it (e.g. a GitHub Action on a
cron) to commit the updated `letterboxd.json`. The site is static and just reads the file.
