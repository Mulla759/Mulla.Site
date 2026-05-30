/* ui_kits/website — Chrome: running masthead header, chapter nav, footer strip. */

function Header({ chapters, active, onNav }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(241,236,224,0.86)" : "transparent",
      backdropFilter: scrolled ? "saturate(1.1) blur(8px)" : "none",
      WebkitBackdropFilter: scrolled ? "saturate(1.1) blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
      transition: "background 400ms var(--ease-soft), border-color 400ms var(--ease-soft)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px clamp(20px, 6vw, 64px)" }}>
        <button onClick={() => onNav("cover")} style={{ background: "none", border: "none", padding: 0,
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 23, letterSpacing: "-0.03em", color: "var(--ink)" }}>
          Mulla
        </button>
        <nav style={{ display: "flex", gap: "clamp(12px, 2vw, 26px)" }}>
          {chapters.map(c => (
            <button key={c.id} onClick={() => onNav(c.id)} style={{
              background: "none", border: "none", padding: "4px 0", position: "relative",
              fontFamily: "var(--font-micro)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
              color: active === c.id ? "var(--vermilion)" : "var(--ink-2)",
              transition: "color 280ms var(--ease-soft)" }}>
              {c.label}
              {active === c.id && <span style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 1, background: "var(--vermilion)" }} />}
            </button>
          ))}
        </nav>
        <span style={{ fontFamily: "var(--font-micro)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)" }}>First Ed.</span>
      </div>
    </header>
  );
}

function FooterStrip({ onNav }) {
  return (
    <footer style={{ borderTop: "1px solid var(--ink)", padding: "20px clamp(20px, 6vw, 64px)",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
      <Micro size={9} color="var(--ink-4)">Minneapolis · 44.97°N</Micro>
      <Micro size={9} color="var(--ink-4)">My Personal Archive</Micro>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <Shavian size={13} />
        <Micro size={9} color="var(--ink-4)">— made with love</Micro>
      </span>
    </footer>
  );
}

/* chapter-change cross-fade wrapper */
function ChapterFade({ chapterKey, children }) {
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => { setShown(false); const t = setTimeout(() => setShown(true), 30); return () => clearTimeout(t); }, [chapterKey]);
  return (
    <div style={{ opacity: shown ? 1 : 0, transition: "opacity 600ms var(--ease-cinematic)" }}>
      {children}
    </div>
  );
}

/* a tall chapter opener — chapter number + title, set huge */
function ChapterOpener({ index, title, deck, tone = "ink" }) {
  const onDark = tone === "ink";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <span style={{ fontFamily: "var(--font-micro)", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", color: "var(--vermilion)" }}>{index}</span>
        <Rule color={onDark ? "var(--rule-on-ink)" : "var(--rule-strong)"} style={{ flex: 1 }} />
      </div>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(3rem, 8vw, 7rem)",
        lineHeight: 0.9, letterSpacing: "-0.04em", color: onDark ? "var(--paper-on-ink)" : "var(--ink)" }}>{title}</h2>
      {deck && <p style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(1.3rem, 2.6vw, 2.2rem)",
        lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: "20ch", color: onDark ? "var(--paper-on-ink-2)" : "var(--ink-2)" }}>{deck}</p>}
    </div>
  );
}

Object.assign(window, { Header, FooterStrip, ChapterFade, ChapterOpener });
