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

function Contact({ onReadMore }) {
  const socials = [
    { label: "X", url: "https://x.com/AAbdallahDev" },
    { label: "GitHub", url: "https://github.com/Mulla759" },
    { label: "Letterboxd", url: "https://letterboxd.com/Mulla759/" },
    { label: "Last.fm", url: "https://www.last.fm/user/Mulla759" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/abdull-abdi5/" },
  ];
  const [eggHover, setEggHover] = React.useState(false);
  return (
    <section id="contact" style={{ background: "var(--paper-blush)", paddingTop: 92 }}>
      <div style={{ padding: "0 clamp(20px, 6vw, 80px)" }}>
        <ChapterOpener num="06" title="Contact" standfirst="The quiet last page. Say something — or just keep reading." />
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 48, alignItems: "end", marginBottom: 64 }}>
          <div style={{ minWidth: 0 }}>
            <Micro size={10} color="var(--ink-3)" style={{ display: "block", marginBottom: 14 }}>Write to me</Micro>
            <a href="mailto:Abdullahi.aabdii@gmail.com" style={{ textDecoration: "none" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)", letterSpacing: "-0.03em", color: "var(--ink)", lineHeight: 1.1, overflowWrap: "break-word", wordBreak: "break-word" }}>Abdullahi.aabdii@gmail.com</div>
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
            {socials.map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}><ArrowLink dir="↗">{s.label}</ArrowLink></a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, flexWrap: "wrap", gap: 16 }}>
          <Shavian size={18} gloss="made with love" />
          <Micro size={9} color="var(--ink-4)">Minneapolis · 44.9778°N 93.2650°W · <span style={{ color: "var(--vermilion)" }}>No.</span> 04</Micro>
        </div>
      </div>
      <Micro size={9} color="var(--ink-4)" style={{ display: "block", padding: "0 clamp(20px,6vw,80px) 8px" }}>Stop-motion · 14 frames · loops</Micro>
      <StopMotionStrip />
      {onReadMore && (
        <Reveal delay={600}>
          <div style={{ padding: "28px clamp(20px, 6vw, 80px) 36px", textAlign: "right" }}>
            <button
              onClick={onReadMore}
              onMouseEnter={() => setEggHover(true)}
              onMouseLeave={() => setEggHover(false)}
              style={{
                background: "none", border: "none", padding: 0, cursor: "pointer",
                fontFamily: "var(--font-annotation)", fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                lineHeight: 1.2,
                color: eggHover ? "var(--orange)" : "var(--ink-4)",
                transition: "color 320ms var(--ease-soft)",
              }}
            >you made it. there's more →</button>
          </div>
        </Reveal>
      )}
    </section>
  );
}

Object.assign(window, { Contact, StopMotionStrip });
