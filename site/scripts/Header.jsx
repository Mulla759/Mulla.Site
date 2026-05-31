/* Header.jsx — sticky running masthead + chapter nav (smooth-scroll, active tracking) */

function Header({ active, chapters, blogUnlocked, galleryUnlocked, onBlogClick, onGalleryClick, onLogoClick }) {
  const labels = { cover: "Cover", work: "Work", archive: "Archive", notes: "Notes", bio: "Bio", contact: "Contact" };
  const blogActive = active === "reading";
  const galleryActive = active === "gallery";
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50, background: "var(--paper)",
      borderBottom: "1px solid var(--rule)", height: 62,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(16px, 4vw, 48px)",
    }}>
      {onLogoClick ? (
        <button onClick={onLogoClick} style={{
          background: "none", border: "none", padding: 0, cursor: "pointer",
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22,
          letterSpacing: "-0.04em", color: "var(--ink)", lineHeight: 1,
        }}>&larr; Mulla</button>
      ) : (
        <a href="#cover" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22,
          letterSpacing: "-0.04em", color: "var(--ink)", textDecoration: "none", lineHeight: 1 }}>Mulla</a>
      )}

      <nav style={{ display: "flex", gap: "clamp(12px, 2.4vw, 30px)" }}>
        {chapters.map(id => (
          <a key={id} href={"#" + id} style={{
            fontFamily: "var(--font-micro)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
            color: active === id ? "var(--vermilion)" : "var(--ink-3)", textDecoration: "none",
            transition: "color 280ms var(--ease-soft)", position: "relative", paddingBottom: 2,
            borderBottom: active === id ? "1px solid var(--vermilion)" : "1px solid transparent",
          }}>{labels[id]}</a>
        ))}
        {blogUnlocked && (
          <button onClick={onBlogClick} style={{
            background: "none", border: "none", padding: 0, cursor: "pointer",
            fontFamily: "var(--font-micro)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
            color: blogActive ? "var(--orange)" : "var(--ink-3)", textDecoration: "none",
            transition: "color 280ms var(--ease-soft)", position: "relative", paddingBottom: 2,
            borderBottom: blogActive ? "1px solid var(--orange)" : "1px solid transparent",
          }}>Reading</button>
        )}
        {galleryUnlocked && (
          <button onClick={onGalleryClick} style={{
            background: "none", border: "none", padding: 0, cursor: "pointer",
            fontFamily: "var(--font-micro)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
            color: galleryActive ? "var(--gallery)" : "var(--ink-3)", textDecoration: "none",
            transition: "color 280ms var(--ease-soft)", position: "relative", paddingBottom: 2,
            borderBottom: galleryActive ? "1px solid var(--gallery)" : "1px solid transparent",
          }}>Gallery</button>
        )}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ display: "none" }} className="hdr-dn"><DayNight showLabel={false} /></span>
        <Micro size={10} color="var(--ink-3)"><span style={{ color: "var(--vermilion)" }}>No.</span> 04</Micro>
      </div>
    </header>
  );
}

Object.assign(window, { Header });
