/* ui_kits/website — Chapter 04: Notes. Essays, fragments, photographs, screenshots. */

function NoteEssay({ kicker, title, date, read, body, tag }) {
  return (
    <Reveal>
      <article style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 24,
        padding: "26px 0", borderTop: "1px solid var(--rule)", cursor: "pointer" }}
        onMouseEnter={e => e.currentTarget.querySelector("h4").style.color = "var(--vermilion)"}
        onMouseLeave={e => e.currentTarget.querySelector("h4").style.color = "var(--ink)"}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Micro size={9} color="var(--ink-3)">{date}</Micro>
          <Micro size={8} color="var(--ink-4)">{read}</Micro>
          <span style={{ fontFamily: "var(--font-micro)", fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--vermilion)" }}>{tag}</span>
        </div>
        <div>
          <Kicker color="var(--ink-4)" style={{ marginBottom: 8 }}>{kicker}</Kicker>
          <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            lineHeight: 1.0, letterSpacing: "-0.025em", color: "var(--ink)", margin: "0 0 12px", transition: "color 280ms var(--ease-soft)" }}>{title}</h4>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", margin: 0, maxWidth: "54ch" }}>{body}</p>
        </div>
      </article>
    </Reveal>
  );
}

function ChapterNotes({ onNav }) {
  const notes = [
    { kicker: "Essay", title: "On warm grain and cold pixels", date: "24 May ’26", read: "6 min", tag: "Photography",
      body: "Why I keep the noise in. A short argument for texture in a medium that defaults to perfect — and what film taught me about leaving things slightly wrong on purpose." },
    { kicker: "Fragment", title: "Three minutes of Akerman", date: "19 May ’26", read: "2 min", tag: "Film",
      body: "A note scribbled after a rewatch: duration as the real subject, the kitchen as a stage, and the radical politics of letting a shot simply continue." },
    { kicker: "Reference", title: "A reading list that isn’t a flex", date: "11 May ’26", read: "4 min", tag: "Books",
      body: "Cusk, Offill, Berger — the books I actually return to, and the one sentence from each that rearranged something. Annotated, honestly." },
    { kicker: "Observation", title: "The website as a room", date: "02 May ’26", read: "5 min", tag: "Craft",
      body: "Designing this archive made me think of personal sites less as portfolios and more as rooms you let people walk through. What you hang on the walls is the whole argument." },
  ];
  return (
    <section data-screen-label="Notes" style={{ background: "var(--paper)", padding: "120px clamp(20px, 6vw, 64px) 40px" }}>
      <ChapterOpener index="04 — Notes" title="Notes" tone="paper"
        deck="Essays, fragments and references, posted as they come." />

      {/* a photo strip — fragments / screenshots */}
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, margin: "40px 0 12px" }}>
          {[["warm","Contact sheet · 04"],["cool","Screenshot · drafts"],["sienna","Studio · 35mm"],["rose","Margins · scrawl"]].map(([tone, frame], i) => (
            <Plate key={i} ratio="1/1" tone={tone} slotId={`note-frag-${i}`} placeholder="Drop a fragment" frame={frame} />
          ))}
        </div>
      </Reveal>
      <Micro size={9} color="var(--ink-4)" style={{ display: "block", marginBottom: 28 }}>A wall of fragments — photographs, screenshots, scraps.</Micro>

      <div>
        {notes.map(n => <NoteEssay key={n.title} {...n} />)}
      </div>
    </section>
  );
}

Object.assign(window, { ChapterNotes, NoteEssay });
