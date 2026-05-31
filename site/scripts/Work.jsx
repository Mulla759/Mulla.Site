/* Work.jsx — Chapter opener (shared) + Work feature stories */

const SECTION_PAD = "92px clamp(20px, 6vw, 80px)";

/* Reusable chapter opener — exported for Archive / Notes / Bio / Contact */
function ChapterOpener({ num, title, standfirst, dark, align = "left" }) {
  const fg = dark ? "var(--paper-on-ink)" : "var(--ink)";
  const fg2 = dark ? "var(--paper-on-ink-2)" : "var(--ink-3)";
  return (
    <div style={{ borderTop: `1px solid ${dark ? "var(--rule-on-ink)" : "var(--rule-strong)"}`, paddingTop: 22, marginBottom: 56 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 30, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 360px" }}>
          <Kicker style={{ marginBottom: 16 }}>Chapter {num}</Kicker>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.86, letterSpacing: "-0.045em", color: fg }}>{title}</h2>
        </div>
        {standfirst && (
          <p style={{ flex: "0 1 380px", fontFamily: "var(--font-body)", fontWeight: 500,
            fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)", lineHeight: 1.45, letterSpacing: "-0.01em",
            color: fg2, paddingTop: 8 }}>{standfirst}</p>
        )}
      </div>
    </div>
  );
}

function FeatureStory({ flip, kicker, year, title, standfirst, body, meta, tone, frame, onReadMore }) {
  return (
    <Reveal style={{ marginBottom: 96 }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px, 5vw, 72px)", alignItems: "center" }}>
        <div style={{ order: flip ? 2 : 1 }}>
          <Plate ratio="5/4" tone={tone} frame={frame} />
        </div>
        <div style={{ order: flip ? 1 : 2 }}>
          <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
            <Kicker>{kicker}</Kicker>
            <Micro size={11} color="var(--ink-4)">{year}</Micro>
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(2rem, 3.6vw, 3.4rem)", lineHeight: 0.98, letterSpacing: "-0.035em",
            color: "var(--ink)", marginBottom: 18 }}>{title}</h3>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1.18rem", lineHeight: 1.45,
            letterSpacing: "-0.012em", color: "var(--ink)", marginBottom: 16 }}>{standfirst}</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.62, color: "var(--ink-2)",
            maxWidth: "46ch", marginBottom: 26 }}>{body}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
            <ArrowLink onClick={onReadMore}>Read the feature</ArrowLink>
            <Micro size={9} color="var(--ink-4)">{meta}</Micro>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Work({ onReadMore }) {
  return (
    <section id="work" style={{ background: "var(--paper)", padding: SECTION_PAD }}>
      <ChapterOpener num="02" title="Work" standfirst="Projects told as feature stories — the thinking, the references, and the people, not a list of deliverables." />
      <FeatureStory
        kicker="Product · Design" year="2025" tone="sienna" frame="Case 01"
        title="Building Promise, in public"
        standfirst="A year spent making a financial companion that treats patience as a feature, not a flaw."
        body="It began as a question about time — how an app could help someone wait well. The work moved between research notes, late-night Figma files, and a lot of reading about how rituals form. What stayed constant was a refusal to ship anxiety."
        meta="Role — Design & Front-end / MPLS"
        onReadMore={onReadMore} />
      <FeatureStory flip
        kicker="Open Source · Tooling" year="2024" tone="pine" frame="Case 02"
        title="Rolodex, for the rest of us"
        standfirst="An open recruiter-discovery tool for students who didn't inherit a network."
        body="Half product, half polemic. The interface had to feel like a friend who knows people, not a database. We wrote the cold-outreach copy the way you'd actually text someone, and the tool grew from there into something students quietly passed around."
        meta="Role — Maker / Filed under Access"
        onReadMore={onReadMore} />
    </section>
  );
}

Object.assign(window, { ChapterOpener, FeatureStory, Work, SECTION_PAD });
