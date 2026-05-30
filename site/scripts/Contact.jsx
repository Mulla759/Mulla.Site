/* Contact.jsx — quiet closing on peach + a looping stop-motion film strip. */

function StopMotionStrip() {
  const frames = ["warm", "rose", "sienna", "cool", "pine", "ink", "warm", "rose"];
  const Strip = (key) => (
    <div key={key} style={{ display: "flex", gap: 8, flex: "0 0 auto" }}>
      {frames.map((t, i) => (
        <div key={i} style={{ position: "relative", width: 120, aspectRatio: "4/3", flex: "0 0 auto" }}>
          <Plate ratio="4/3" tone={t} frame={`F${String(i + 1).padStart(2, "0")}`} style={{ height: "100%" }} />
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid var(--rule-strong)" }}>
      <div style={{ display: "flex", gap: 8, padding: "16px 0", width: "max-content", animation: "stopmo 9s steps(14) infinite" }}>
        {Strip("a")}{Strip("b")}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ background: "var(--paper-blush)", paddingTop: 92 }}>
      <div style={{ padding: "0 clamp(20px, 6vw, 80px)" }}>
        <ChapterOpener num="06" title="Contact" standfirst="The quiet last page. Say something — or just keep reading." />
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 48, alignItems: "end", marginBottom: 64 }}>
          <div>
            <Micro size={10} color="var(--ink-3)" style={{ display: "block", marginBottom: 14 }}>Write to me</Micro>
            <a href="mailto:hello@mulla.site" style={{ textDecoration: "none" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em", color: "var(--ink)", lineHeight: 1 }}>hello@mulla.site</div>
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
            {["Letterboxd", "Instagram", "Last.fm", "Are.na"].map(s => (
              <a key={s} href="#" style={{ textDecoration: "none" }}><ArrowLink dir="↗">{s}</ArrowLink></a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, flexWrap: "wrap", gap: 16 }}>
          <Shavian size={18} gloss="set in shavian" />
          <Micro size={9} color="var(--ink-4)">Minneapolis · 44.9778°N 93.2650°W · <span style={{ color: "var(--vermilion)" }}>No.</span> 04</Micro>
        </div>
      </div>
      <Micro size={9} color="var(--ink-4)" style={{ display: "block", padding: "0 clamp(20px,6vw,80px) 8px" }}>Stop-motion · 14 frames · loops</Micro>
      <StopMotionStrip />
    </section>
  );
}

Object.assign(window, { Contact, StopMotionStrip });
