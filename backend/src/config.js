// Central config + env loading. Secrets live in backend/.env (gitignored).
import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  // Letterboxd username, no leading @.
  letterboxdUser: (process.env.LETTERBOXD_USER || "mulla759").replace(/^@/, ""),
  rssUrl(user = this.letterboxdUser) {
    return `https://letterboxd.com/${user}/rss/`;
  },

  // TMDB auth: use ONE. v3 API key (query param) is the simplest; v4 read token also works.
  tmdbApiKey: process.env.TMDB_API_KEY || "",
  tmdbReadToken: process.env.TMDB_READ_TOKEN || "",
  posterSize: process.env.TMDB_POSTER_SIZE || "w500",

  // How many recent films to publish.
  maxItems: Number(process.env.MAX_ITEMS || 12),

  // Where the static feed is written (served by the site at /data/letterboxd.json).
  outFile: path.resolve(__dirname, "../../site/data/letterboxd.json"),
};

export const hasTmdb = () => Boolean(config.tmdbApiKey || config.tmdbReadToken);
