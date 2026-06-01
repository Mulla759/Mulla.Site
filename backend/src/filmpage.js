// Read the canonical Letterboxd film page for the EXACT TMDB id + director.
// This removes all title/year guesswork: the id comes straight from Letterboxd.
import { decodeEntities } from "./util.js";

const TMDB_ID = /data-tmdb-id="(\d+)"/i;
const TMDB_TYPE = /data-tmdb-type="(movie|tv)"/i;
const DIRECTOR = /<meta name="twitter:data1" content="([^"]*)"/i;

export async function letterboxdFilmMeta(slug) {
  if (!slug) return {};
  const res = await fetch(`https://letterboxd.com/film/${slug}/`, {
    headers: { "User-Agent": "MullaSite-Aggregator/0.1 (+https://mulla.site)" },
  });
  if (!res.ok) throw new Error(`Letterboxd film page ${res.status}`);
  const html = await res.text();

  const id = TMDB_ID.exec(html);
  const type = TMDB_TYPE.exec(html);
  const dir = DIRECTOR.exec(html);

  return {
    tmdbId: id ? id[1] : null,
    tmdbType: type ? type[1] : "movie",
    director: dir && dir[1] ? decodeEntities(dir[1]) : null,
  };
}
