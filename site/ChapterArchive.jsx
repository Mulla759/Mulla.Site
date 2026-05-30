/* ui_kits/website — Chapter 03: Archive. Reel + filterable log + live feed.
   Letterboxd-style evolving cultural archive. */

const ARCHIVE = [
  { medium: "film", title: "Jeanne Dielman", by: "Chantal Akerman", year: "’75", date: "22 May", stars: 5, tone: "linear-gradient(150deg,#b9543e,#7a2f22)" },
  { medium: "book", title: "Weather", by: "Jenny Offill", year: "’21", date: "this week", stars: 4, tone: "linear-gradient(150deg,#6f7a72,#3f4a48)" },
  { medium: "film", title: "La Chimera", by: "Alice Rohrwacher", year: "’24", date: "09 May", stars: 4.5, tone: "linear-gradient(150deg,#9a7b62,#5e4636)" },
  { medium: "music", title: "Two Star", by: "Mk.gee", year: "’24", date: "today", repeat: true, tone: "linear-gradient(150deg,#3a3630,#141210)" },
  { medium: "book", title: "Outline", by: "Rachel Cusk", year: "’14", date: "02 May", stars: 5, tone: "linear-gradient(150deg,#8a8f9c,#4f5562)" },
  { medium: "exhibit", title: "Hilma af Klint", by: "The Walker", year: "’26", date: "18 Apr", stars: 5, tone: "linear-gradient(150deg,#577a5e,#2d4a33)" },
  { medium: "film", title: "In the Mood for Love", by: "Wong Kar-wai", year: "’00", date: "11 Apr", stars: 5, tone: "linear-gradient(150deg,#9c4b52,#5e2a30)" },
];

function PosterCard({ item }) {
  const label = { film: "Film", book: "Book", music: "Music", exhibit: "Show" }[item.medium];
  const [hover, setHover] = React.useState(false);
  return (
    <div className="isle" style={{ flex: "0 0 168px", scrollSnapAlign: "start", cursor: "pointer" }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ aspectRatio: "3/4", borderRadius: 2, position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center", background: item.tone,
        transform: hover ? "translateY(-6px)" : "none", transition: "transform 320ms var(--ease-cinematic)" }}>
        <span style={{ position: "absolute", top: 9, left: 9, fontFamily: "var(--font-micro)", fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.92)" }}>{item.date}</span>
        <span className="grain-field" />
        <span style={{ position: "relative", zIndex: 1, color: "rgba(255,255,255,0.92)" }}>
          <Pictograph kind={item.medium === "music" ? "vinyl" : item.medium === "book" ? "book" : item.medium === "exhibit" ? "exhibit" : "film"} color="rgba(255,255,255,0.92)" />
        </span>
        <span style={{ position: "absolute", bottom: 9, left: 9, fontFamily: "var(--font-micro)", fontSize: 7, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)" }}>{label} · {item.year}</span>
      </div>
      <div style={{ marginTop: 10 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 18, letterSpacing: "-0.02em", lineHeight: 0.98, color: "var(--ink)" }}>{item.title}</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{item.by}</div>
        {item.repeat
          ? <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}><Equalizer h={14} bars={[6,13,9,12]} /><Micro size={9} color="var(--vermilion)">on repeat</Micro></div>
          : <div style={{ marginTop: 7 }}><Stars value={item.stars} /></div>}
      </div>
    </div>
  );
}

function LiveFeed() {
  const scrobbles = [
    ["Alex G", "Runner", "14:02 · today"], ["Blood Orange", "Charcoal Baby", "13:48 · today"],
    ["Sade", "Cherish the Day", "13:20 · today"], ["Frank Ocean", "Ivy", "12:55 · today"],
    ["Nilüfer Yanya", "Stabilise", "23:10 · 28 May"],
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "clamp(24px,5vw,56px)", alignItems: "start",
      borderTop: "1px solid var(--rule)", paddingTop: 36, marginTop: 8 }}>
      {/* now playing */}
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "56px 1fr auto", gap: 18, alignItems: "center" }}>
          <VinylSpinner />
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-micro)", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--vermilion)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--vermilion)", animation: "pulse 1.4s var(--ease-soft) infinite" }} />Now playing
            </span>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--ink)", margin: "5px 0 3px" }}>Are You Looking Up</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-3)" }}>Mk.gee — <i>Two Star &amp; the Dream Police</i></div>
          </div>
          <Equalizer />
        </div>
        <div style={{ margin: "18px 0 6px", height: 2, background: "var(--rule)", position: "relative" }}>
          <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "46%", background: "var(--ink)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Micro size={9} color="var(--ink-4)">1:42</Micro>
          <Micro size={9} color="var(--ink-4)">Last.fm · scrobbling</Micro>
          <Micro size={9} color="var(--ink-4)">3:08</Micro>
        </div>
      </div>
      {/* scrobble ticker, rising */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--vermilion)", animation: "pulse 1.4s var(--ease-soft) infinite" }} />
          <Micro size={9}>Recently scrobbled</Micro>
        </div>
        <div style={{ height: 132, overflow: "hidden", position: "relative", borderTop: "1px solid var(--rule)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, #000 14%, #000 80%, transparent)",
          maskImage: "linear-gradient(180deg, transparent, #000 14%, #000 80%, transparent)" }}>
          <div style={{ animation: "rise 16s linear infinite" }}>
            {[...scrobbles, ...scrobbles].map(([a, t, w], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "baseline", gap: 14, padding: "8px 0", borderBottom: "1px solid var(--rule)" }}>
                <span style={{ fontFamily: "var(--font-micro)", fontSize: 12, letterSpacing: "0.03em", color: "var(--ink-2)" }}><b style={{ color: "var(--ink)", fontWeight: 400 }}>{a}</b> — {t}</span>
                <Micro size={9} color="var(--ink-4)">{w}</Micro>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterArchive({ onNav }) {
  const [filter, setFilter] = React.useState("all");
  const filters = [["all", "Everything"], ["film", "Film"], ["book", "Books"], ["music", "Music"], ["exhibit", "Shows"]];
  const shown = filter === "all" ? ARCHIVE : ARCHIVE.filter(a => a.medium === filter);
  return (
    <section data-screen-label="Archive" style={{ background: "var(--paper-stone)", padding: "120px clamp(20px, 6vw, 64px) 40px" }}>
      <ChapterOpener index="03 — Archive" title="The Archive" tone="paper"
        deck="Films, books, sound and shows — an evolving log." />

      {/* filter row */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 34, marginBottom: 24, alignItems: "center" }}>
        {filters.map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)} style={{
            fontFamily: "var(--font-micro)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "8px 16px", border: `1px solid ${filter === id ? "var(--ink)" : "var(--rule-strong)"}`,
            background: filter === id ? "var(--ink)" : "transparent", color: filter === id ? "var(--paper-stone)" : "var(--ink-2)",
            transition: "all 220ms var(--ease-soft)" }}>{label}</button>
        ))}
        <Micro size={9} color="var(--ink-4)" style={{ marginLeft: "auto" }}>{shown.length} entries · drag to scroll →</Micro>
      </div>

      {/* reel */}
      <Reveal>
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 14, scrollSnapType: "x mandatory" }}>
          {shown.map((item, i) => <PosterCard key={item.title} item={item} />)}
        </div>
      </Reveal>

      {/* live feed */}
      <Reveal delay={120}><div style={{ marginTop: 48 }}><LiveFeed /></div></Reveal>
    </section>
  );
}

Object.assign(window, { ChapterArchive, PosterCard, LiveFeed, ARCHIVE });
