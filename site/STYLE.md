# STYLE.md — Mulla visual style

The brand in brief, for anyone building UI. It should read like a **beautifully art-directed print
magazine translated to the web** — intellectual, human, fashion- and film-aware. Never a SaaS
dashboard, résumé, or card-grid. All tokens live in `styles/tokens.css`.

## Type — four voices + one cipher
| Role | Family (token) | Use |
|---|---|---|
| Display | **Basteleur** `--font-display` | Chapter titles, headlines, pull quotes. Bold (700) for titles; Moonlight (300) for quotes/decks. Set **tight** (-0.03 to -0.05em), large, line-height < 1. |
| Body | **Neue Haas / Helvetica** `--font-body` | Reading text. ~1.62 line-height, 64ch measure. *(Helvetica stack is a substitute for Neue Haas — swap when licensed.)* |
| Micro | **Space Mono / Pacaembu** `--font-micro` | The signature. Metadata, issue numbers, coordinates, timestamps, credits, kickers, captions, nav. **UPPERCASE, +0.14em tracked, ≤ 11px.** *(Space Mono substitutes for Pacaembu.)* |
| Annotation | **PicNic** `--font-annotation` | Hand-drawn interruptions, review titles, "this is me". Used sparingly, often slightly rotated. |
| Cipher | **Noto Sans Shavian** | Cryptic micrographic signature — `𐑥𐑱𐑛 𐑢𐑦𐑞 𐑤𐑳𐑝` = "made with love". Mostly untranslated. |

## Color
- **Paper (never pure white):** `--paper-bright #FBFAF6`, `--paper #F1ECE0`, tints `--paper-blush
  #EEDCD4` (warm) / `--paper-stone #DADFD9` (cool), `--paper-ink #141210` (inked pole).
- **Ink (warm, graded):** `--ink #1B1813` → `--ink-2` body → `--ink-3` metadata → `--ink-4` captions →
  `--ink-5` hairlines.
- **Signal accents (rare):** `--vermilion #C2412A` (issue marks, links, kickers), `--vermilion-2`
  (pressed), `--ink-blue #2C3E54` (archival), `--highlight-wash` (translucent amber, **see-through
  only**, fades in over a phrase).
- **Earth surfaces** (mastheads, features, the Bio portrait frame): `--earth-espresso #1A0F0A`,
  `--earth-cacao #4A2C17`, `--earth-sienna #8B4513`, `--earth-pine #2D5A3D`, `--earth-sage #6B8E6B`.

## Space, rules, motion
- **8px base** (`--space-1…8`), opening to 104–168px chapter gutters. Generous paper space is the default.
- **Hairlines, not boxes.** `--rule` (16%) / `--rule-strong` (34%) / 2px section rules / dashed tabular
  rules. **No drop shadows. No rounded-corner cards.** `--radius: 0` (plates get 2px max).
- **Motion is cinematic + restrained.** Reveals = fade + small rise, `--dur-reveal 900ms` on
  `--ease-cinematic`. Hover = 320ms soft. Plus living micrographs: spinning vinyl, equalizer bars,
  rising scrobble feed, looping stop-motion strip, day/night mark. **No bounce, no spring, no flash.**

## Interaction states
- **Hover:** links shift underline → vermilion; nav items → vermilion; plates lift slightly. No scale-up/glow.
- **Press:** vermilion → `--vermilion-2`. No shrink-bounce.
- **Focus:** 1px vermilion outline, offset, kept quiet.
- **Transparency/blur:** almost never — a faint scrim/obfuscated coordinate at most. No frosted glass.

## Imagery
Warm, filmic, **grain retained** — 35mm / medium-format energy; B&W or warm color, never cold,
over-saturated, or glossy stock. Cut-out portraits sit on an earth ground (see `Bio.jsx → ThisIsMe`).
Until real photos exist, use the toned `Plate` placeholders.

## Iconography
**Almost icon-free.** No icon font, no Lucide/Heroicons, **no emoji.** Direction = Unicode editorial
marks (`→ ↗ ★ ★½ · — § ′ ″`, `Fig. 03`) + tiny **CSS pictographs** (film strip, open book, vinyl).
The wordmark *Mulla* (Basteleur Bold) is the only logo.

## One-line test
*Would this look at home in The Gentlewoman or Apartamento?* If it looks like a startup landing page,
it's wrong.
