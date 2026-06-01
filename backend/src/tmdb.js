// Resolve a film (title + year) to a single TMDB poster URL.
// Free, non-commercial use with attribution. Returns null if not confidently matched,
// in which case the caller falls back to the (always-correct) Letterboxd poster.
const API = "https://api.themoviedb.org/3/search/movie";
const IMG = "https://image.tmdb.org/t/p";

// Fetch a poster by EXACT TMDB id (movie or tv). The most reliable path — no matching.
export async function tmdbPosterById(id, type, { tmdbApiKey, tmdbReadToken, posterSize }) {
  if (!id || (!tmdbApiKey && !tmdbReadToken)) return null;
  const base = `https://api.themoviedb.org/3/${type === "tv" ? "tv" : "movie"}/${id}`;
  const headers = { accept: "application/json" };
  let url = `${base}?language=en-US`;
  if (tmdbReadToken) headers.authorization = `Bearer ${tmdbReadToken}`;
  else url += `&api_key=${encodeURIComponent(tmdbApiKey)}`;

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`TMDB ${type} ${res.status}`);
  const data = await res.json();
  return data.poster_path ? `${IMG}/${posterSize}${data.poster_path}` : null;
}

// Normalize a title for comparison: lowercase, strip accents/punctuation, "&" -> "and".
function norm(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export async function tmdbPoster({ title, year }, { tmdbApiKey, tmdbReadToken, posterSize }) {
  if (!tmdbApiKey && !tmdbReadToken) return null;

  const params = new URLSearchParams({
    query: title,
    include_adult: "false",
    language: "en-US",
  });

  const headers = { accept: "application/json" };
  let url = `${API}?${params.toString()}`;
  if (tmdbReadToken) headers.authorization = `Bearer ${tmdbReadToken}`;
  else url += `&api_key=${encodeURIComponent(tmdbApiKey)}`;

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`TMDB search ${res.status}`);

  const data = await res.json();
  const results = Array.isArray(data.results) ? data.results : [];
  if (!results.length) return null;

  const target = norm(title);
  const yearNum = year ? Number(year) : null;

  // Only consider results whose title matches exactly (after normalization).
  let candidates = results.filter(
    (r) => norm(r.title) === target || norm(r.original_title) === target
  );

  // If we know the year, require the match to land within +/-1 year
  // (festival vs. wide-release dates can differ by a year).
  if (yearNum) {
    candidates = candidates.filter((r) => {
      const ry = Number((r.release_date || "").slice(0, 4));
      return ry && Math.abs(ry - yearNum) <= 1;
    });
  }

  // Exactly one confident match -> trust TMDB. Zero or many (ambiguous title like
  // "Obsession") -> bail so the caller uses the correct Letterboxd poster.
  if (candidates.length !== 1) return null;

  const hit = candidates[0];
  return hit.poster_path ? `${IMG}/${posterSize}${hit.poster_path}` : null;
}
