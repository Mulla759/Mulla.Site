/* ui_kits/website — Chapter 05: Biography. Career as a narrative profile. */

function ChapterBio({ onNav }) {
  const timeline = [
    ["2026", "Begins this archive — a personal magazine with no deadline."],
    ["2024", "Ships Muslim Connect; designs and builds the first release."],
    ["2023", "Blackbox — first work in AI, born at an innovation hackathon."],
    ["2022", "Falls properly in love with film; starts logging everything."],
    ["—", "Before all that: a kid who wanted to make the things he loved."],
  ];
  return (
    <section data-screen-label="Biography" style={{ background: "var(--paper-news)", padding: "120px clamp(20px, 6vw, 64px) 40px" }}>
      <ChapterOpener index="05 — Biography" title="The Profile" tone="paper"
        deck="Who I am, and why this exists." />

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "clamp(28px, 5vw, 72px)", marginTop: 44, alignItems: "start" }}>
        {/* narrative profile */}
        <Reveal>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "clamp(1.2rem, 1.8vw, 1.55rem)",
              lineHeight: 1.4, letterSpacing: "-0.012em", color: "var(--ink)", margin: "0 0 22px", maxWidth: "44ch" }}>
              I'm Abdullah — friends call me Mulla. A creative who thrives at the seam between engineering and a mix of things.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.62, color: "var(--ink-2)", margin: "0 0 18px", maxWidth: "62ch" }}>
              I'm not here to pitch a résumé. This page is about who I am and why I built it — a collection of everything I do, enjoy, and love sharing with the world.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.62, color: "var(--ink-2)", margin: "0 0 22px", maxWidth: "62ch" }}>
              I believe that sharing knowledge — especially in the open — is the key to understanding the world better. The work, the notes, the in-between: they're all part of the same archive.
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              lineHeight: 1.04, letterSpacing: "-0.025em", color: "var(--ink)", margin: "8px 0 0", maxWidth: "24ch" }}>
              Curious, driven — someone who loves to see between the lines.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55, color: "var(--ink-3)", margin: "14px 0 0", maxWidth: "52ch" }}>
              Some might say polymath. I don't want to be labeled in ways that don't fit — and I won't be defined by a title.
            </p>
          </div>
        </Reveal>

        {/* dated timeline — tabular */}
        <Reveal delay={120}>
          <div>
            <Micro size={9} color="var(--ink-4)" style={{ display: "block", marginBottom: 14 }}>On the record</Micro>
            {timeline.map(([yr, what], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 14, padding: "14px 0",
                borderTop: "1px dashed var(--rule-strong)" }}>
                <Micro size={10} color="var(--vermilion)">{yr}</Micro>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-2)" }}>{what}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { ChapterBio });
