// Orchestrator: Letterboxd RSS -> (parallel) TMDB poster enrichment -> static JSON.
// Run with: npm run sync   (from backend/)
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { config, hasTmdb } from "./config.js";
import { fetchLetterboxd } from "./letterboxd.js";
import { letterboxdFilmMeta } from "./filmpage.js";
import { tmdbPoster, tmdbPosterById } from "./tmdb.js";

// Toned fallbacks (match Shared.jsx Plate tones) used behind a poster while it loads,
// and for any item without a poster.
const TONES = ["sienna", "pine", "rose", "ink", "cool"];

async function main() {
  const user = config.letterboxdUser;
  const rss = config.rssUrl(user);

  console.log(`\u2192 Letterboxd RSS for @${user}`);
  const parsed = await fetchLetterboxd(rss);
  const reviews = parsed.slice(0, config.maxItems);
  console.log(`  parsed ${parsed.length} film entries, keeping ${reviews.length}`);

  const tmdbOn = hasTmdb();
  console.log(tmdbOn ? "\u2192 Enriching with TMDB posters (parallel)" : "\u2192 No TMDB key set; using Letterboxd posters from the feed");

  const items = await Promise.all(
    reviews.map(async (r, i) => {
      let posterTmdb = null;
      let posterSource = null;
      let director = null;

      // 1) Authoritative: read the exact TMDB id + director from the Letterboxd film page.
      let meta = {};
      try {
        meta = await letterboxdFilmMeta(r.filmSlug);
        director = meta.director || null;
        if (tmdbOn && meta.tmdbId) {
          posterTmdb = await tmdbPosterById(meta.tmdbId, meta.tmdbType, config);
          if (posterTmdb) posterSource = "tmdb-id";
        }
      } catch (err) {
        console.warn(`  ! film-page lookup failed for "${r.title}": ${err.message}`);
      }

      // 2) Fallback: strict title+year search (only an exact, unambiguous match counts).
      if (tmdbOn && !posterTmdb) {
        try {
          posterTmdb = await tmdbPoster(r, config);
          if (posterTmdb) posterSource = "tmdb-search";
        } catch (err) {
          console.warn(`  ! TMDB search failed for "${r.title}": ${err.message}`);
        }
      }

      const { _posterLetterboxd, filmSlug, ...rest } = r;
      const poster = posterTmdb || _posterLetterboxd || null;
      if (!posterSource && _posterLetterboxd) posterSource = "letterboxd";

      return {
        ...rest,
        by: director || rest.by || undefined,
        tmdbId: meta.tmdbId || null,
        tone: TONES[i % TONES.length],
        poster,
        posterSource,
      };
    })
  );

  const withPosters = items.filter((it) => it.poster).length;
  const payload = {
    source: "letterboxd",
    user,
    generatedAt: new Date().toISOString(),
    posterSource: tmdbOn ? "tmdb+letterboxd" : "letterboxd",
    count: items.length,
    items,
  };

  await mkdir(path.dirname(config.outFile), { recursive: true });
  await writeFile(config.outFile, JSON.stringify(payload, null, 2) + "\n");
  console.log(`\u2713 Wrote ${items.length} items (${withPosters} with posters) \u2192 ${path.relative(process.cwd(), config.outFile)}`);
}

main().catch((err) => {
  console.error("\u2717 Aggregation failed:", err.message);
  process.exitCode = 1;
});
