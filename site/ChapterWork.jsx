/* ui_kits/website — Chapter 02: Work. Projects as feature stories. */

function WorkFeature({ index, kicker, title, standfirst, body, tone, slotId, role, year, pull }) {
  const flip = index % 2 === 0;
  return (
    <Reveal>
      <article style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 5vw, 72px)",
        alignItems: "center", padding: "clamp(40px, 7vw, 96px) 0", borderTop: "1px solid var(--rule)" }}>
        <div style={{ order: flip ? 2 : 1 }}>
          <div style={{ position: "relative" }}>
            <Plate ratio="5/6" tone={tone} slotId={slotId} placeholder="Drop a project image" frame={`Project ${index} · ${year}`} />
          </div>
        </div>
        <div style={{ order: flip ? 1 : 2 }}>
          <Kicker style={{ marginBottom: 16 }}>{kicker}</Kicker>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem, 4.4vw, 4rem)",
            lineHeight: 0.96, letterSpacing: "-0.035em", color: "var(--ink)", margin: "0 0 18px" }}>{title}</h3>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)",
            lineHeight: 1.42, letterSpacing: "-0.012em", color: "var(--ink)", margin: "0 0 16px", maxWidth: "40ch" }}>{standfirst}</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, letterSpacing: "-0.006em",
            color: "var(--ink-2)", margin: "0 0 22px", maxWidth: "46ch" }}>{body}</p>
          {pull && (
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
              lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 22px", maxWidth: "22ch" }}>
              <mark style={{ background: "var(--highlight-wash)", padding: "0 0.1em" }}>{pull}</mark>
            </p>
          )}
          <div style={{ display: "flex", gap: 22, alignItems: "baseline", flexWrap: "wrap" }}>
            <Micro size={9}>{role}</Micro>
            <Micro size={9} color="var(--ink-4)">{year}</Micro>
            <ArrowLink>Read the feature</ArrowLink>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ChapterWork({ onNav }) {
  const features = [
    { index: 1, kicker: "Feature · Product", title: "Muslim Connect", year: "2024", role: "Design + Front-end",
      tone: "pine", slotId: "work-1",
      standfirst: "A quiet social platform built so a community could find each other without the noise.",
      body: "It started as a hackathon question — what does a calm social network look like? The answer was less feed, more directory: presence over performance. I designed the system end to end and shipped the first build with two friends.",
      pull: "Less feed, more presence." },
    { index: 2, kicker: "Feature · Experiment", title: "Blackbox", year: "2023", role: "AI · Prototype",
      tone: "sienna", slotId: "work-2",
      standfirst: "Our first venture into AI — an innovation-hackathon prototype that refused to stay a demo.",
      body: "Built in a weekend and rebuilt three times since. Blackbox was where I learned that the interesting part of a model is never the model — it’s the small, humane interface you wrap around it.",
      pull: "The interface is the idea." },
    { index: 3, kicker: "Feature · Craft", title: "This Archive", year: "2026", role: "Art direction · Code",
      tone: "rose", slotId: "work-3",
      standfirst: "The site you’re reading — a personal magazine, designed as a place to think out loud.",
      body: "An ongoing issue with no deadline. Built to hold work, film, books, sound, and the notes in between, art-directed like print and wired to pull from what I’m actually watching and listening to.",
      pull: "An issue with no deadline." },
  ];
  return (
    <section data-screen-label="Work" style={{ background: "var(--paper-bright)", padding: "120px clamp(20px, 6vw, 64px) 40px" }}>
      <ChapterOpener index="02 — Work" title="The Work" tone="paper"
        deck="Projects told as feature stories, not line items." />
      <div style={{ marginTop: 40 }}>
        {features.map(f => <WorkFeature key={f.index} {...f} />)}
      </div>
    </section>
  );
}

Object.assign(window, { ChapterWork, WorkFeature });
