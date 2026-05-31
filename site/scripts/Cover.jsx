/* Cover.jsx — the cover story / masthead hero (full viewport) */

function Cover() {
  return (
    <section id="cover" style={{
      position: "relative", minHeight: "calc(100vh - 62px)", background: "var(--paper)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "60px clamp(20px, 6vw, 80px)",
    }}>
      {/* top-left — day / night */}
      <div style={{ position: "absolute", top: 26, left: "clamp(20px, 5vw, 56px)" }}>
        <DayNight />
      </div>
      {/* top-right — cryptic Shavian micrograph */}
      <div style={{ position: "absolute", top: 26, right: "clamp(20px, 5vw, 56px)", textAlign: "right" }}>
        <Shavian size={20} />
        <div style={{ marginTop: 5 }}><Micro size={8} color="var(--ink-4)">
          <span style={{ color: "var(--vermilion)" }}>✶</span> made with love</Micro></div>
      </div>

      {/* core */}
      <Rule vertical style={{ height: 40, margin: "0 auto 22px" }} color="var(--rule-strong)" />
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: "clamp(5rem, 17vw, 15rem)", lineHeight: 0.8, letterSpacing: "-0.05em",
        color: "var(--ink)", margin: "0 0 18px" }}>Mulla</h1>
      <div><Micro size={12} color="var(--ink-2)" style={{ letterSpacing: "0.28em" }}>My Personal Archive</Micro></div>
      <div style={{ marginTop: 8 }}><Micro size={9} color="var(--ink-4)" style={{ letterSpacing: "0.2em" }}>
        Minneapolis <span style={{ color: "var(--vermilion)" }}>·</span> Minnesota</Micro></div>

      {/* scroll cue */}
      <a href="#work" style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
        textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Micro size={9} color="var(--ink-4)">Begin reading</Micro>
        <span style={{ fontFamily: "var(--font-micro)", fontSize: 13, color: "var(--ink-3)",
          animation: "nudge 2.2s var(--ease-soft) infinite" }}>↓</span>
      </a>
    </section>
  );
}

Object.assign(window, { Cover });
