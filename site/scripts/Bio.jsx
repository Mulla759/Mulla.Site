/* Bio.jsx — narrative profile + the "this is me" portrait (real headshot). */

/* The framed "this is me" portrait — sienna ground, PicNic overlay, blurred coordinate.
   Swap src for any cut-out (transparent PNG) portrait; the sienna shows through. */
function ThisIsMe() {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: 2,
        background: "linear-gradient(150deg, #a9683a, #5e3413)" }}>
        <span className="grain-field" />
        <img src="assets/headshot.png" alt="Mulla — self portrait"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        <span style={{ position: "absolute", top: 14, left: 18, fontFamily: "var(--font-annotation)",
          fontSize: 30, lineHeight: 1, color: "var(--paper-on-ink)", transform: "rotate(-3deg)" }}>this is me</span>
        <span style={{ position: "absolute", top: 16, right: 16, textAlign: "right" }}>
          <span style={{ display: "block", fontFamily: "var(--font-micro)", fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(237,231,216,0.78)" }}>Filed from</span>
          <span style={{ fontFamily: "var(--font-micro)", fontSize: 9, letterSpacing: "0.1em", color: "rgba(237,231,216,0.72)", filter: "blur(2.4px)" }}>44.9778°N 93.2650°W</span>
        </span>
      </div>
      <figcaption style={{ marginTop: 10 }}>
        <Micro size={9} color="var(--ink-3)"><span style={{ color: "var(--vermilion)" }}>Portrait</span> — self, Minneapolis · 2025</Micro>
      </figcaption>
    </figure>
  );
}

function Bio() {
  return (
    <section id="bio" style={{ background: "var(--paper)", padding: SECTION_PAD }}>
      <ChapterOpener num="05" title="Biography" standfirst="Not a résumé — a profile. Where the perspective actually comes from." />
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.85fr) minmax(0,1.15fr)", gap: "clamp(32px, 6vw, 88px)", alignItems: "start" }}>
        <Reveal><ThisIsMe /></Reveal>
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "clamp(1.2rem, 1.7vw, 1.5rem)", lineHeight: 1.45, letterSpacing: "-0.012em", color: "var(--ink)", marginBottom: 24 }}>
            Mulla is a designer and maker in Minneapolis who treats culture as a working method — reading, watching and listening as research, not leisure.</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.02rem", lineHeight: 1.65, color: "var(--ink-2)", maxWidth: "58ch", marginBottom: 18 }}>
            He came up through hackathons and open-source projects, the kind of work where you learn the product by building it twice. <span style={{ background: "var(--highlight-wash)" }}>Somewhere between a recruiter tool for students and a financial app about patience</span>, a throughline appeared: software should be humane, and taste is part of that.</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.02rem", lineHeight: 1.65, color: "var(--ink-2)", maxWidth: "58ch", marginBottom: 40 }}>
            The rest is logged here — the films that taught him pacing, the books that taught him voice, the records that taught him restraint.</p>

          <div style={{ borderLeft: "2px solid var(--vermilion)", paddingLeft: 24, marginBottom: 40 }}>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(1.6rem, 3vw, 2.6rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--ink)" }}>
              I’m a polymath, but the perspective comes from culture.</p>
          </div>

          {/* prose timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[["2026", "Building Promise, in public"], ["2024", "Rolodex — open recruiter discovery"], ["2023", "AI Innovation Hackathon — Blackbox"], ["2022", "First lines of public writing"]].map(([y, t], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 18, alignItems: "baseline", padding: "12px 0", borderTop: "1px solid var(--rule)" }}>
                <Micro size={11} color="var(--vermilion)">{y}</Micro>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Bio, ThisIsMe });
