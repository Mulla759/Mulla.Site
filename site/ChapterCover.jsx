/* ui_kits/website — Chapter 01: Cover Story. Inked, full-bleed portrait. */

function ChapterCover({ onNav }) {
  const meta = [
    ["Edition", "First Edition"], ["Season", "Summer ’26"], ["Subject", "Self-Portrait"],
    ["Place", "Minneapolis, MN"], ["Filed under", "Archive of many things"],
  ];
  return (
    <section data-screen-label="Cover" style={{ position: "relative", minHeight: "100vh", background: "var(--paper-ink)", color: "var(--paper-on-ink)", overflow: "hidden" }}>
      <span className="grain-field grain-field--light" />

      {/* top micrographic rail */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3,
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        padding: "92px clamp(20px, 6vw, 64px) 0" }}>
        <DayNight />
        <span style={{ textAlign: "right" }}>
          <Micro size={8} color="var(--paper-on-ink-2)" style={{ display: "block", marginBottom: 4 }}>Filed from</Micro>
          <span style={{ fontFamily: "var(--font-micro)", fontSize: 11, letterSpacing: "0.1em", color: "var(--paper-on-ink-2)", filter: "blur(2.6px)", opacity: 0.72, userSelect: "none" }}>44.9778°N 93.2650°W</span>
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "clamp(24px, 5vw, 80px)",
        alignItems: "center", minHeight: "100vh", padding: "120px clamp(20px, 6vw, 64px) 60px", position: "relative", zIndex: 2 }}>

        {/* left — the cover line */}
        <div>
          <Reveal>
            <Kicker color="#E0795F" style={{ marginBottom: 22 }}>The Cover Story · First Edition</Kicker>
          </Reveal>
          <Reveal delay={120}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(3.8rem, 9vw, 9rem)",
              lineHeight: 0.86, letterSpacing: "-0.05em", color: "var(--paper-on-ink)", margin: "0 0 28px" }}>
              This is<br/><span style={{ fontWeight: 300, fontStyle: "normal" }}>me.</span>
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
              lineHeight: 1.45, letterSpacing: "-0.01em", maxWidth: "34ch", color: "var(--paper-on-ink)", margin: "0 0 36px" }}>
              An archive of work, things I’ve been working on, blogs, notes, and whatever in between.
            </p>
          </Reveal>
          <Reveal delay={380}>
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
              <ArrowLink color="var(--paper-on-ink)" onClick={() => onNav("work")}>My personal website</ArrowLink>
              <ArrowLink color="var(--paper-on-ink-2)" dir="↓" onClick={() => onNav("archive")}>Skip to the archive</ArrowLink>
            </div>
          </Reveal>
        </div>

        {/* right — portrait plate + metadata cluster */}
        <div>
          <Reveal delay={200}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: 2, overflow: "hidden",
                background: "radial-gradient(120% 100% at 50% 0%, #a9683a 0%, #7c4523 55%, #5e3413 100%)" }}>
                <span className="grain-field" />
                <img src={(typeof window !== "undefined" && window.PORTRAIT_SRC) || "portrait-cover.png"} alt="Portrait of Mulla" style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", width: "104%", height: "100%", objectFit: "contain", objectPosition: "bottom" }} />
                <span style={{ position: "absolute", left: 11, bottom: 10, fontFamily: "var(--font-micro)", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.82)", zIndex: 2 }}>Cover · 1 of 1</span>
              </div>
              <span style={{ position: "absolute", top: 14, left: 14, fontFamily: "var(--font-annotation)", fontSize: 30, color: "#fff", transform: "rotate(-5deg)", textShadow: "0 1px 8px rgba(0,0,0,0.4)", zIndex: 3 }}>this is me</span>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, marginTop: 18, background: "var(--rule-on-ink)", border: "1px solid var(--rule-on-ink)" }}>
              {meta.map(([k, v]) => (
                <div key={k} style={{ background: "var(--paper-ink)", padding: "13px 14px" }}>
                  <Micro size={8} color="var(--paper-on-ink-2)" style={{ display: "block", marginBottom: 7 }}>{k}</Micro>
                  <span style={{ fontFamily: "var(--font-micro)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--paper-on-ink)", lineHeight: 1.4 }}>{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* scroll cue */}
      <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 3, textAlign: "center" }}>
        <Micro size={8} color="var(--paper-on-ink-2)">Turn the page</Micro>
      </div>
    </section>
  );
}

Object.assign(window, { ChapterCover });
