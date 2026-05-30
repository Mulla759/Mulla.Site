/* ui_kits/website — Chapter 06: Contact. Quiet, elegant inked closing page. */

function ChapterContact({ onNav }) {
  const links = [["Email", "hello@mulla.site"], ["Letterboxd", "@mulla"], ["Instagram", "@mulla"], ["Last.fm", "@mulla"]];
  return (
    <section data-screen-label="Contact" style={{ position: "relative", minHeight: "92vh", background: "var(--paper-ink)", color: "var(--paper-on-ink)", overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "center", padding: "140px clamp(20px, 6vw, 64px) 80px" }}>
      <span className="grain-field grain-field--light" />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1000 }}>
        <Reveal>
          <Kicker color="#E0795F" style={{ marginBottom: 24 }}>06 — Contact · The Back Page</Kicker>
        </Reveal>
        <Reveal delay={120}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
            lineHeight: 0.9, letterSpacing: "-0.045em", color: "var(--paper-on-ink)", margin: "0 0 28px" }}>
            Say something<br/>worth keeping.
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)", lineHeight: 1.5,
            color: "var(--paper-on-ink-2)", maxWidth: "44ch", margin: "0 0 44px" }}>
            For commissions, conversations, recommendations, or to argue about a film — the door is open and the issue is ongoing.
          </p>
        </Reveal>
        <Reveal delay={340}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 1, background: "var(--rule-on-ink)", border: "1px solid var(--rule-on-ink)", maxWidth: 760 }}>
            {links.map(([k, v]) => (
              <a key={k} href="#" style={{ background: "var(--paper-ink)", padding: "20px 22px", display: "block", transition: "background 280ms var(--ease-soft)" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--earth-espresso)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--paper-ink)"}>
                <Micro size={8} color="var(--paper-on-ink-2)" style={{ display: "block", marginBottom: 9 }}>{k}</Micro>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--paper-on-ink)" }}>{v}</span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={440}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 56, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-annotation)", fontSize: 32, color: "#E0795F", transform: "rotate(-4deg)" }}>thanks for reading</span>
            <Rule color="var(--rule-on-ink)" style={{ flex: 1, minWidth: 40 }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <Shavian size={15} color="var(--paper-on-ink)" />
              <Micro size={8} color="var(--paper-on-ink-2)">made with love</Micro>
            </span>
          </div>
        </Reveal>

        <Reveal delay={520}>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, flexWrap: "wrap", gap: 12 }}>
            <Micro size={9} color="var(--paper-on-ink-2)">© 2026 · No. 04</Micro>
            <Micro size={9} color="var(--paper-on-ink-2)">Minneapolis · 44.97°N 93.26°W</Micro>
            <button onClick={() => onNav("cover")} style={{ background: "none", border: "none", padding: 0 }}>
              <Micro size={9} color="var(--paper-on-ink-2)">↑ Back to the cover</Micro>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { ChapterContact });
