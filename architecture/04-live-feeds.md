# 04 - Live feeds (Last.fm, Letterboxd, TMDB) - the Archive as a living dashboard

This doc covers the part docs 01-02 did not: **data that updates on its own** - music
scrobbles, film reviews, ratings - streaming into the Archive without you editing code. It is
the missing third layer of "Route A", and it is also free.

## What the site already assumes

`site/scripts/Archive.jsx` is built as a living culture log, but every value is hardcoded:

- `ARCHIVE_ITEMS[]` - film/book/music reviews: `{ medium, title, by, year, rating, date, review, lb }`. Rendered as poster islands (`ReviewIsland`) that open a `ReviewModal` with a "Read more on Letterboxd" link.
- `ScrobbleFeed` - a fixed list of `[artist, track, when]` rows that auto-scrolls.
- `LiveRail` - a "Now playing" block (track, artist, progress, "Last.fm . scrobbling") + recent scrobbles + a Letterboxd stat card (`412 films / 38 this year / 91 lists`).
- `PhotoGrid` - 35mm photos as `Plate` placeholders.

The design is already a dashboard; it just needs real feeds plugged into the same shapes.

## The honest constraint: polling, not push

On a static no-build site with no paid backend, "constantly streaming" = **short-interval
polling of a cached endpoint**, not a websocket push:

- Now playing: client polls every ~30-60s -> feels live (the pulse dot + `Equalizer` animate).
- Scrobbles / reviews: refresh every few minutes to hourly; they change slowly anyway.

A true real-time push stream would need a long-lived server (not free, and overkill for this).
Polling a cached Worker gives the live feel at $0.

## The sources (all free)

### Last.fm - music (official free API)

- Endpoint: `ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Mulla759&api_key=KEY&format=json`.
- Returns recent scrobbles **and** the now-playing track (the first item carries `@attr.nowplaying === "true"` when you are listening).
- Free API key from a Last.fm API account.
- Browsers cannot call it directly (no CORS); route it through a proxy (below).

### Letterboxd - films/books-as-films (RSS, no open API)

- Letterboxd has **no public API**. The supported path is the per-user RSS feed: `letterboxd.com/Mulla759/rss/`.
- Each item has: film title, film year, your member rating (e.g. 4.5), watched date, the review text, the film link, and a Letterboxd poster image URL. (~50 most-recent items.)
- The feed does **not** include a TMDB id, so to use a TMDB poster you match title+year against TMDB search (see below). If you do not care which poster, the RSS already ships one for free.
- RSS is XML and CORS-blocked in the browser, so it is fetched server-side (Worker or Action) and turned into JSON.

### TMDB - posters/metadata (free, attribution)

- Free for non-commercial use with attribution (see doc 02). Use `/search/movie?query=<title>&year=<year>` to resolve a Letterboxd film to a TMDB id, then build a poster URL `image.tmdb.org/t/p/w780/<path>.jpg`.
- Lets `ReviewIsland` / `ReviewModal` show a real poster instead of the toned `Plate`.

## Two ways to run the aggregator (free either way)

Something has to call these APIs, keep the keys secret, add CORS, and hand the site clean JSON.

### A) Cloudflare Worker (recommended for "live")

A tiny Worker (free tier: 100k requests/day) that the browser calls. It fetches Last.fm /
Letterboxd / TMDB, caches the result (e.g. 60s for now-playing, 1h for reviews), adds
`Access-Control-Allow-Origin`, and returns JSON. Keys live as Worker secrets, never in the
client. Open-source Last.fm worker templates already exist.

- Pros: near-live, secrets hidden, CORS solved, no repo churn, free.
- Cons: one more deployed thing to own (small).

### B) GitHub Action on a schedule (recommended for "set and forget")

A cron Action (free) runs every ~15-30 min, fetches the feeds, writes `data/scrobbles.json`,
`data/reviews.json` (and downloads/links posters) into the repo or R2. The site just fetches
static JSON.

- Pros: dead simple, no live endpoint, naturally cached/versioned, free.
- Cons: not truly live (cron floor ~ minutes); now-playing will lag.

### Recommended combo

- **Last.fm now-playing + scrobbles -> Worker** (60s poll) for the live feel in `LiveRail`.
- **Letterboxd reviews + TMDB posters -> Worker or Action** (hourly) for `ARCHIVE_ITEMS`.
- Both write the exact shapes the components already use, so the JSX barely changes.

## How it lands in the components (shapes preserved)

```js
// scripts/data.js additions (sketch)
window.MullaFeeds = {
  base: "https://feeds.mulla.site",            // your Worker, or "data/" for the Action route
  async nowPlaying() {                          // -> { track, artist, nowplaying, progress }
    return fetch(`${this.base}/lastfm/now`).then(r => r.json());
  },
  async scrobbles() {                           // -> [{ artist, track, when }]  (ScrobbleFeed rows)
    return fetch(`${this.base}/lastfm/recent`).then(r => r.json());
  },
  async reviews() {                             // -> ARCHIVE_ITEMS shape + posterUrl
    return fetch(`${this.base}/letterboxd`).then(r => r.json());
  }
};
```

- `LiveRail` + `ScrobbleFeed`: `useEffect` + `setInterval(60s)` -> `MullaFeeds.nowPlaying()/scrobbles()`; fall back to the current hardcoded rows if the fetch fails so the rail never goes blank.
- `ARCHIVE_ITEMS`: replace the literal array with `MullaFeeds.reviews()`; keep `ReviewIsland`/`ReviewModal` untouched. Add a `poster` field; `ReviewIsland` shows `<img>` over the grain instead of only the `Pictograph`.
- `PhotoGrid` / Notes `plate`: image URLs from R2 (doc 02), unchanged rendering.

## Tradeoff summary

| Concern | Worker route | Action route |
|---|---|---|
| Cost | Free (100k req/day) | Free |
| Liveness | Near-live (60s) | Every ~15-30 min |
| Secrets | Hidden (Worker secret) | Hidden (repo secret) |
| Moving parts | 1 Worker | 1 cron + static JSON |
| Best for | Now playing / scrobbles | Reviews / slow feeds |

| Source | Open? | Cost | Gives | Caveat |
|---|---|---|---|---|
| Last.fm API | Official, public | Free | Now playing + scrobbles | CORS -> needs proxy |
| Letterboxd RSS | No API; RSS only | Free | ~50 recent reviews, ratings, posters | No TMDB id; ~50-item cap; full history needs scraping (grayer) |
| TMDB API | Closed source | Free (non-commercial) | Posters/metadata | Attribution required |

## Verdict on your goal

Yes - the constantly-updating Archive (music + film tracking with TMDB posters), the uploaded
photos for Notes/writing, and the writing itself all fit the **no-pay** plan:

- Writing -> markdown/Decap (doc 01), free.
- Photos + video + custom posters -> R2 + FFmpeg + hls.js (doc 02), ~free.
- Live music + film feeds -> Last.fm API + Letterboxd RSS + TMDB, surfaced by a free Cloudflare Worker or GitHub Action (this doc).

The only honest asterisks: feeds are **polled, not pushed** (live-feeling, not literally live),
and **Letterboxd is RSS-only** (recent items, not full history via the supported path). Neither
costs money, and both match how `Archive.jsx` is already built.
