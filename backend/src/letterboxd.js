// Fetch + parse a Letterboxd user's RSS feed into review records.
// Letterboxd has no public API; the per-user RSS is the supported path.
import { XMLParser } from "fast-xml-parser";
import { decodeEntities } from "./util.js";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  // keep the `letterboxd:` namespace prefixes on tags
  removeNSPrefix: false,
});

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const text = (v) => (v && typeof v === "object" && "#text" in v ? v["#text"] : v);

function filmSlugFromLink(link) {
  const m = /\/film\/([^/]+)/.exec(String(link || ""));
  return m ? m[1] : null;
}

function formatDate(raw) {
  if (!raw) return "";
  // letterboxd:watchedDate is YYYY-MM-DD; pubDate is an RFC-822 string.
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return String(raw);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

function extractPoster(description = "") {
  const m = /<img[^>]+src=["']([^"']+)["']/i.exec(description);
  return m ? m[1] : null;
}

function stripHtml(description = "") {
  return decodeEntities(
    String(description)
      .replace(/<img[^>]*>/gi, "")          // drop the poster image
      .replace(/<[^>]+>/g, " ")             // drop remaining tags
  )
    .replace(/\s+/g, " ")
    .trim();
}

function idFromGuid(guid, link) {
  const g = text(guid);
  if (g) return String(g).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  return String(link || "").split("/").filter(Boolean).pop() || Math.random().toString(36).slice(2);
}

function toReview(item) {
  const rawTitle = text(item["letterboxd:filmTitle"]);
  if (!rawTitle) return null; // not a film entry (could be a list, etc.)
  const title = decodeEntities(String(rawTitle));

  const year = item["letterboxd:filmYear"] != null ? String(text(item["letterboxd:filmYear"])) : "";
  const ratingRaw = text(item["letterboxd:memberRating"]);
  const rating = ratingRaw !== undefined && ratingRaw !== null && ratingRaw !== "" ? Number(ratingRaw) : null;
  const watched = text(item["letterboxd:watchedDate"]) || text(item.pubDate);
  const link = String(text(item.link) || "");
  const description = String(text(item.description) || "");
  const rewatch = String(text(item["letterboxd:rewatch"]) || "").toLowerCase() === "yes";

  return {
    id: idFromGuid(item.guid, link),
    medium: "film",
    mlabel: "Film",
    title: String(title),
    year,
    rating,
    rewatch,
    date: formatDate(watched),
    watchedDate: watched ? String(watched) : "",
    reviewTitle: String(title),
    review: stripHtml(description),
    lb: link.replace(/^https?:\/\//, ""),
    filmSlug: filmSlugFromLink(link),
    _posterLetterboxd: extractPoster(description),
  };
}

export async function fetchLetterboxd(rssUrl) {
  const res = await fetch(rssUrl, {
    headers: { "User-Agent": "MullaSite-Aggregator/0.1 (+https://mulla.site)" },
  });
  if (!res.ok) throw new Error(`Letterboxd RSS responded ${res.status} ${res.statusText}`);
  const xml = await res.text();
  const doc = parser.parse(xml);

  let items = doc?.rss?.channel?.item ?? [];
  if (!Array.isArray(items)) items = [items];

  return items.map(toReview).filter(Boolean);
}
