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
        deck="A life in culture, written as a story." />

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "clamp(28px, 5vw, 72px)", marginTop: 44, alignItems: "start" }}>
        {/* narrative profile */}
        <Reveal>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "clamp(1.2rem, 1.8vw, 1.55rem)",
              lineHeight: 1.4, letterSpacing: "-0.012em", color: "var(--ink)", margin: "0 0 22px", maxWidth: "40ch" }}>
              Mulla is a designer and builder from Minneapolis whose work keeps circling the same question: how do you make software feel like it was made by a person who reads, watches, and listens?
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.62, color: "var(--ink-2)", margin: "0 0 18px", maxWidth: "62ch" }}>
              The short version of the résumé is here, but it has never explained much. The longer version is the one worth telling: a kid who wanted to make the things he loved, who found that the interesting part of any project was always the small, humane interface around it.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.62, color: "var(--ink-2)", margin: "0 0 22px", maxWidth: "62ch" }}>
              He works at the seam between design and code — shipping products, prototyping with AI, and art-directing his own corner of the web like a print magazine. The films, the books, the records aren’t a hobby section. They’re the method.
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              lineHeight: 1.04, letterSpacing: "-0.025em", color: "var(--ink)", margin: "8px 0 0", maxWidth: "20ch" }}>
              A polymath, but the perspective comes from culture.
            </p>
          </div>
        </Reveal>

        {/* dated timeline — tabular */}
        <Reveal delay={120}>
          <div>
            <Micro size={9} color="var(--ink-4)" style={{ display: "block", marginBottom: 14 }}>The short version</Micro>
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
