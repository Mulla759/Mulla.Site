/* Notes.jsx — compact fragments: essays, quotes, screenshots, references. */

function Notes() {
  const frags = [
    { tag: "Essay · 28 May", kind: "title", title: "On keeping a commonplace book", body: "The internet made everyone an archivist and no one a curator. A note is only worth keeping if you’d defend it." },
    { tag: "Fragment", kind: "quote", body: "“Taste is just attention paid out over years.” — overheard, then stolen." },
    { tag: "Screenshot · 24 May", kind: "plate", tone: "cool", body: "A frame from La Chimera I can’t stop thinking about." },
    { tag: "Reference", kind: "title", title: "Apartamento, every issue", body: "Proof that interiors are really portraits. The mess is the point." },
    { tag: "Note", kind: "plain", body: "Started transliterating my margin notes into Shavian. Nobody can read them now, including me." },
    { tag: "Photograph · 19 May", kind: "plate", tone: "rose", body: "Light through the blinds, 7:40am." },
    { tag: "Fragment", kind: "plain", body: "Films watched alone hit differently than films watched beside someone. Logging both, separately." },
    { tag: "Essay · 11 May", kind: "title", title: "Against the highlight reel", body: "A life is mostly errata. I’d rather show the corrections than the cover." },
  ];
  return (
    <section id="notes" style={{ background: "var(--paper-bright)", padding: "78px clamp(20px, 6vw, 80px)" }}>
      <ChapterOpener num="04" title="Notes" standfirst="Essays, fragments, screenshots and references — thinking out loud, kept short." />
      <div style={{ columnCount: 3, columnGap: 26, columnFill: "balance" }}>
        {frags.map((f, i) => (
          <div key={i} style={{ breakInside: "avoid", marginBottom: 26, borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
            <Micro size={9} color="var(--ink-4)" style={{ display: "block", marginBottom: 10 }}>
              <span style={{ color: "var(--vermilion)" }}>—</span> {f.tag}</Micro>
            {f.kind === "plate" && <Plate ratio="4/3" tone={f.tone} style={{ marginBottom: 10 }} />}
            {f.kind === "title" && <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 21, letterSpacing: "-0.02em", lineHeight: 1.0, color: "var(--ink)", marginBottom: 8 }}>{f.title}</div>}
            {f.kind === "quote"
              ? <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 20, letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--ink)" }}>{f.body}</div>
              : <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-2)" }}>{f.body}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Notes });
