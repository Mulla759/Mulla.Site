/* Archive.jsx — films, books, music, photographs + a live culture rail.
   Clickable review islands open a poster + short review + Read-more → Letterboxd. */

const ARCHIVE_ITEMS = [
  { id: "jd", medium: "film", mlabel: "Film", title: "Jeanne Dielman", by: "Chantal Akerman", year: "1975",
    tone: "sienna", rating: 5, date: "22 May", reviewTitle: "Jeanne Dielman",
    review: "Three days, one kitchen, and the most radical thing I've ever watched happen to ordinary time. It rewires what you think cinema is allowed to be patient about.", lb: "letterboxd.com/Mulla759" },
  { id: "we", medium: "book", mlabel: "Book", title: "Weather", by: "Jenny Offill", year: "2021",
    tone: "pine", rating: 4, date: "this week", reviewTitle: "Weather",
    review: "Fragments that accrue into dread and tenderness. I keep a note of half its sentences; they read like things I almost thought first.", lb: "letterboxd.com/Mulla759" },
  { id: "lc", medium: "film", mlabel: "Film", title: "La Chimera", by: "Alice Rohrwacher", year: "2024",
    tone: "rose", rating: 4.5, date: "09 May", reviewTitle: "La Chimera",
    review: "Grave-robbers and ghosts shot like a faded postcard. Rohrwacher finds the sacred in the second-hand. Stayed with me for days.", lb: "letterboxd.com/Mulla759" },
  { id: "ts", medium: "music", mlabel: "Music", title: "Two Star", by: "Mk.gee", year: "2024",
    tone: "ink", rating: "repeat", date: "today", reviewTitle: "Two Star & the Dream Police",
    review: "Sounds like a memory of a song you can't place. On repeat for a month now — the production is a whole argument about restraint.", lb: "last.fm/user/Mulla759" },
  { id: "ou", medium: "book", mlabel: "Book", title: "Outline", by: "Rachel Cusk", year: "2014",
    tone: "cool", rating: 5, date: "02 May", reviewTitle: "Outline",
    review: "A novel that listens. Cusk dissolves the narrator until the book becomes a room other people talk in. Quietly devastating.", lb: "letterboxd.com/Mulla759" },
];

function ReviewIsland({ item, onOpen }) {
  const tones = { sienna: "linear-gradient(150deg,#a9683a,#5e3413)", pine: "linear-gradient(150deg,#3f6b4d,#1d3a28)",
    rose: "linear-gradient(150deg,#b07f6e,#6e4a40)", ink: "linear-gradient(150deg,#3a3630,#141210)", cool: "linear-gradient(150deg,#7c828b,#474d57)" };
  return (
    <div onClick={() => onOpen(item)} style={{ flex: "0 0 156px", scrollSnapAlign: "start", cursor: "pointer",
      transition: "transform 320ms var(--ease-cinematic)" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "none"}>
      <div style={{ position: "relative", aspectRatio: "3/4", borderRadius: 2, overflow: "hidden",
        background: tones[item.tone], display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="grain-field" />
        <span style={{ position: "absolute", top: 9, left: 9, fontFamily: "var(--font-micro)", fontSize: 8,
          letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.92)" }}>{item.date}</span>
        <span style={{ position: "relative", zIndex: 1, color: "rgba(255,255,255,0.92)" }}>
          <Pictograph kind={item.medium === "music" ? "vinyl" : item.medium} size={40} color="rgba(255,255,255,0.92)" /></span>
        <span style={{ position: "absolute", bottom: 9, left: 9, fontFamily: "var(--font-micro)", fontSize: 7,
          letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)" }}>{item.mlabel} · '{item.year.slice(2)}</span>
      </div>
      <div style={{ marginTop: 9 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 18, letterSpacing: "-0.02em", lineHeight: 0.98, color: "var(--ink)" }}>{item.title}</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--ink-3)", marginTop: 2 }}>{item.by}</div>
        <div style={{ marginTop: 7 }}>
          {item.rating === "repeat"
            ? <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Equalizer h={13} bars={[6,13,9,12]} /><Micro size={8} color="var(--vermilion)">on repeat</Micro></span>
            : <span className="stars-pop"><Stars value={item.rating} hoverPop /></span>}
        </div>
      </div>
    </div>
  );
}

function ReviewModal({ item, onClose }) {
  const tones = { sienna: "sienna", pine: "pine", rose: "rose", ink: "ink", cool: "cool" };
  if (!item) return null;
  const showReadMore = item.medium !== "music";
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,18,15,0.62)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(2px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "var(--paper-bright)", width: "min(720px, 96vw)",
        display: "grid", gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1fr)", boxShadow: "0 30px 80px rgba(20,18,15,0.4)" }}>
        <div style={{ minHeight: 320 }}><Plate ratio="3/4" tone={tones[item.tone]} frame={`${item.mlabel} · ${item.year}`} style={{ height: "100%", borderRadius: 0 }} /></div>
        <div style={{ padding: "30px 32px", position: "relative", display: "flex", flexDirection: "column" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 18, background: "none", border: "none",
            fontFamily: "var(--font-micro)", fontSize: 16, color: "var(--ink-3)", lineHeight: 1 }}>×</button>
          <Micro size={9} color="var(--vermilion)" style={{ fontWeight: 700 }}>Review · {item.mlabel}</Micro>
          <div style={{ fontFamily: "var(--font-annotation)", fontSize: 38, color: "var(--vermilion)", lineHeight: 0.95, margin: "10px 0 6px" }}>{item.reviewTitle}</div>
          <Micro size={9} color="var(--ink-3)">{item.by} · {item.year} · {item.date}</Micro>
          <div style={{ margin: "14px 0 18px" }}>
            {item.rating === "repeat"
              ? <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Equalizer h={15} /><Micro size={9} color="var(--vermilion)">on repeat</Micro></span>
              : <Stars value={item.rating} />}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)", marginBottom: 24 }}>{item.review}</p>
          {showReadMore && (
            <div style={{ marginTop: "auto", borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
              <a href={"https://" + item.lb} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <ArrowLink dir="↗">Read more on Letterboxd</ArrowLink></a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScrobbleFeed() {
  const rows = [
    ["Alex G", "Runner", "14:02 · today"], ["Blood Orange", "Charcoal Baby", "13:48 · today"],
    ["Sade", "Cherish the Day", "13:20 · today"], ["Frank Ocean", "Ivy", "12:55 · today"],
    ["Nilüfer Yanya", "Stabilise", "23:10 · 28 May"],
  ];
  const Row = ([a, t, w], i) => (
    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid var(--rule)" }}>
      <span style={{ fontFamily: "var(--font-micro)", fontSize: 11, letterSpacing: "0.03em", color: "var(--ink-2)" }}>
        <b style={{ color: "var(--ink)", fontWeight: 400 }}>{a}</b> — {t}</span>
      <Micro size={8} color="var(--ink-4)">{w}</Micro>
    </div>
  );
  return (
    <div style={{ height: 132, overflow: "hidden", borderTop: "1px solid var(--rule)",
      WebkitMaskImage: "linear-gradient(180deg, transparent, #000 14%, #000 82%, transparent)",
      maskImage: "linear-gradient(180deg, transparent, #000 14%, #000 82%, transparent)" }}>
      <div style={{ animation: "rise 16s linear infinite" }}>{rows.map(Row)}{rows.map(Row)}</div>
    </div>
  );
}

function LiveRail() {
  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: 34 }}>
      {/* now playing */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 16 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--vermilion)", animation: "pulse 1.4s var(--ease-soft) infinite" }} />
          <Micro size={9} color="var(--vermilion)" style={{ fontWeight: 700 }}>Now playing</Micro>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 16, alignItems: "center" }}>
          <VinylSpinner size={52} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 24, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--ink)" }}>Are You Looking Up</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>Mk.gee</div>
          </div>
          <Equalizer />
        </div>
        <div style={{ height: 2, background: "var(--rule)", margin: "16px 0 6px", position: "relative", overflow: "hidden" }}>
          <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "46%", background: "var(--ink)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Micro size={8} color="var(--ink-4)">1:42</Micro><Micro size={8} color="var(--ink-4)">Last.fm · scrobbling</Micro><Micro size={8} color="var(--ink-4)">3:08</Micro>
        </div>
      </div>
      {/* scrobbles */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ink-4)" }} />
          <Micro size={9} color="var(--ink-3)">Recently scrobbled</Micro>
        </div>
        <ScrobbleFeed />
      </div>
      {/* letterboxd reference card */}
      <a href="https://letterboxd.com/Mulla759/" target="_blank" rel="noreferrer"
        style={{ textDecoration: "none", display: "block", border: "1px solid var(--rule-strong)", padding: 18, background: "var(--paper-bright)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Micro size={9} color="var(--vermilion)">Letterboxd</Micro>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 4 }}>@Mulla759</div>
          </div>
          <span style={{ fontFamily: "var(--font-micro)", fontSize: 18, color: "var(--vermilion)" }}>↗</span>
        </div>
        <div style={{ display: "flex", gap: 22, marginTop: 16, borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
          {[["412", "films"], ["38", "this year"], ["91", "lists"]].map(([n, l]) => (
            <div key={l}><div style={{ fontFamily: "var(--font-micro)", fontSize: 16, color: "var(--ink)" }}>{n}</div><Micro size={8} color="var(--ink-4)">{l}</Micro></div>
          ))}
        </div>
      </a>
    </aside>
  );
}

function PhotoGrid() {
  const photos = [
    { tone: "warm", frame: "Frame 07 · Tri-X", cap: "The studio, late afternoon" },
    { tone: "rose", frame: "Frame 12 · Portra", cap: "Her, mid-sentence" },
    { tone: "cool", frame: "Frame 03 · HP5", cap: "Lake Street, rain" },
    { tone: "sienna", frame: "Frame 21 · Gold", cap: "Kitchen light" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
      {photos.map((p, i) => (
        <figure key={i} style={{ margin: 0 }}>
          <Plate ratio={i % 2 ? "4/5" : "1/1"} tone={p.tone} frame={p.frame} />
          <figcaption style={{ marginTop: 8 }}><Micro size={9} color="var(--ink-3)"><span style={{ color: "var(--vermilion)" }}>Fig.</span> {p.cap}</Micro></figcaption>
        </figure>
      ))}
    </div>
  );
}

function Archive({ onGallery }) {
  const [sel, setSel] = React.useState(null);
  return (
    <section id="archive" style={{ background: "var(--paper-news)", padding: SECTION_PAD }}>
      <ChapterOpener num="03" title="Archive" standfirst="Everything I've been watching, reading, hearing and photographing — an evolving log of the non-suffering stuff." />
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.55fr) minmax(280px, 1fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        {/* main */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
            <Micro size={10} color="var(--ink-3)">Recently rated — tap a poster</Micro>
            <Micro size={9} color="var(--ink-4)">drag / scroll →</Micro>
          </div>
          <div className="reel" style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 14, scrollSnapType: "x mandatory", marginBottom: 56 }}>
            {ARCHIVE_ITEMS.map(it => <ReviewIsland key={it.id} item={it} onOpen={setSel} />)}
          </div>
          <div style={{ marginBottom: 18 }}><Micro size={10} color="var(--ink-3)">Photographs — 35mm, grain kept</Micro></div>
          <PhotoGrid />
          {/* Video section */}
          {onGallery && (
            <Reveal style={{ marginTop: 56 }}>
              <div style={{ borderTop: "1px solid var(--rule-strong)", paddingTop: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
                  <Micro size={10} color="var(--ink-3)">Video — stills from the reel</Micro>
                  <ArrowLink onClick={onGallery}>Open gallery</ArrowLink>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {[
                    { tone: "ink", frame: "V01", cap: "Minneapolis, dusk" },
                    { tone: "sienna", frame: "V02", cap: "Studio session" },
                    { tone: "cool", frame: "V03", cap: "Lake walk, February" },
                  ].map((v, i) => (
                    <div key={i} style={{ cursor: "pointer" }} onClick={onGallery}>
                      <Plate ratio="16/9" tone={v.tone} frame={v.frame} video dur={["1:22", "0:48", "2:15"][i]} />
                      <div style={{ marginTop: 6 }}><Micro size={8} color="var(--ink-3)">{v.cap}</Micro></div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
        {/* rail fills the right */}
        <LiveRail />
      </div>
      <ReviewModal item={sel} onClose={() => setSel(null)} />
    </section>
  );
}

Object.assign(window, { Archive });
