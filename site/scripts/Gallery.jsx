/* Gallery.jsx — hidden video gallery page. Ink-blue ghost-outline aesthetic.
   Collage of video cards with title-screen placeholders.
   Reachable through Archive video links or nav once unlocked. */

function GalleryCard({ title, subtitle, tone, frame, dur, ratio, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: "pointer", transition: "transform 320ms var(--ease-cinematic)",
        transform: hover ? "translateY(-4px)" : "none", ...style }}
    >
      <Plate ratio={ratio || "16/9"} tone={tone} frame={frame} video dur={dur} />
      <div style={{ marginTop: 10 }}>
        <div style={{
          fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 18,
          letterSpacing: "-0.02em", lineHeight: 1.0, color: "var(--ink)",
        }}>{title}</div>
        {subtitle && (
          <div style={{ marginTop: 4 }}>
            <Micro size={9} color="var(--ink-3)">{subtitle}</Micro>
          </div>
        )}
      </div>
    </div>
  );
}

function Gallery({ onBack }) {
  const videos = [
    { title: "Minneapolis, dusk", subtitle: "Walking tape · May 2025", tone: "ink", frame: "V01", dur: "1:22", ratio: "16/9" },
    { title: "Studio session", subtitle: "Behind the work · April 2025", tone: "sienna", frame: "V02", dur: "0:48", ratio: "4/3" },
    { title: "Lake walk, February", subtitle: "Frozen still · Feb 2025", tone: "cool", frame: "V03", dur: "2:15", ratio: "16/9" },
    { title: "The commute", subtitle: "Light rail, morning · Jan 2025", tone: "pine", frame: "V04", dur: "1:04", ratio: "3/4" },
    { title: "First snow", subtitle: "From the window · Dec 2024", tone: "cool", frame: "V05", dur: "0:36", ratio: "16/9" },
    { title: "Kitchen table", subtitle: "Sunday morning · Nov 2024", tone: "warm", frame: "V06", dur: "1:58", ratio: "4/3" },
    { title: "Uptown, after hours", subtitle: "Night walk · Oct 2024", tone: "ink", frame: "V07", dur: "3:12", ratio: "16/9" },
    { title: "The old apartment", subtitle: "Moving day · Sept 2024", tone: "rose", frame: "V08", dur: "0:44", ratio: "1/1" },
  ];

  return (
    <section style={{ background: "var(--paper-stone)", minHeight: "100vh", padding: "78px clamp(20px, 6vw, 80px)" }}>
      {/* Hero */}
      <div style={{ borderTop: "1px solid var(--gallery-rule)", paddingTop: 22, marginBottom: 56 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 30, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 360px" }}>
            <Kicker color="var(--gallery)" style={{ marginBottom: 16 }}>The Screening Room</Kicker>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.86,
              letterSpacing: "-0.045em", color: "var(--ink)",
            }}>Gallery</h2>
          </div>
          <p style={{
            flex: "0 1 380px", fontFamily: "var(--font-body)", fontWeight: 500,
            fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)", lineHeight: 1.45,
            letterSpacing: "-0.01em", color: "var(--ink-3)", paddingTop: 8,
          }}>Short films, walking tapes, and stills in motion — the stuff that moves but doesn't need explaining.</p>
        </div>
      </div>

      {/* Collage grid — mixed aspect ratios for visual rhythm */}
      <Reveal>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
          marginBottom: 72,
        }}>
          {/* Row 1: wide + tall + wide */}
          <div style={{ gridColumn: "span 2" }}>
            <GalleryCard {...videos[0]} />
          </div>
          <div>
            <GalleryCard {...videos[3]} />
          </div>

          {/* Row 2: three equal */}
          <div>
            <GalleryCard {...videos[1]} ratio="4/3" />
          </div>
          <div>
            <GalleryCard {...videos[4]} ratio="4/3" />
          </div>
          <div>
            <GalleryCard {...videos[5]} ratio="4/3" />
          </div>

          {/* Row 3: square + wide */}
          <div>
            <GalleryCard {...videos[7]} />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <GalleryCard {...videos[6]} />
          </div>
        </div>
      </Reveal>

      {/* Coming soon note */}
      <Reveal delay={200}>
        <div style={{
          border: "1px solid var(--gallery-rule)", padding: "24px 28px",
          marginBottom: 56, maxWidth: 480,
        }}>
          <Micro size={9} color="var(--gallery)" style={{ display: "block", marginBottom: 10, letterSpacing: "0.2em" }}>About this page</Micro>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.55,
            color: "var(--ink-2)", margin: 0,
          }}>Title screens are placeholders for now. As videos get uploaded, the cards will show their opening frames — a collage of first impressions before you press play.</p>
        </div>
      </Reveal>

      {/* Footer */}
      <Reveal>
        <div style={{
          borderTop: "1px solid var(--gallery-rule)", paddingTop: 22, marginTop: 32,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 16,
        }}>
          <ArrowLink dir="←" onClick={onBack} color="var(--gallery)">Back to the magazine</ArrowLink>
          <Shavian size={16} gloss="made with love" />
        </div>
      </Reveal>
    </section>
  );
}

Object.assign(window, { Gallery, GalleryCard });
