/* ui_kits/website — shared editorial primitives.
   Exposed on window for the other Babel scripts (each <script type="text/babel">
   gets its own scope, so we Object.assign(window, …) at the bottom). */

/* ---- tracked-out uppercase micro text (Space Mono / Pacaembu) ---- */
function Micro({ children, color, size = 11, style }) {
  return (
    <span style={{
      fontFamily: "var(--font-micro)", fontSize: size, letterSpacing: "0.14em",
      textTransform: "uppercase", color: color || "var(--ink-3)", ...style,
    }}>{children}</span>
  );
}

/* ---- vermilion eyebrow / kicker ---- */
function Kicker({ children, color, style }) {
  return (
    <div style={{
      fontFamily: "var(--font-micro)", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.22em", textTransform: "uppercase",
      color: color || "var(--vermilion)", ...style,
    }}>{children}</div>
  );
}

/* ---- hairline rule ---- */
function Rule({ strong, color, vertical, style }) {
  if (vertical) return <div style={{ width: 1, alignSelf: "stretch", background: color || "var(--rule)", ...style }} />;
  return <div style={{ borderTop: `1px solid ${color || (strong ? "var(--rule-strong)" : "var(--rule)")}`, width: "100%", ...style }} />;
}

/* ---- Shavian micrographic (cryptic, untranslated by default) ---- */
function Shavian({ children = "𐑥𐑱𐑛 𐑢𐑦𐑞 𐑤𐑳𐑝", size = 18, color, gloss, style }) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", gap: 5, ...style }}>
      <span style={{ fontFamily: "'Noto Sans Shavian', serif", fontSize: size, letterSpacing: "0.05em", color: color || "var(--ink)", lineHeight: 1 }}>{children}</span>
      {gloss && <Micro size={8} color="var(--ink-4)">{gloss}</Micro>}
    </span>
  );
}

/* ---- day / night micrograph, computed on a timezone (default Central) ---- */
function DayNight({ tz = "America/Chicago", showLabel = true }) {
  const h = parseInt(new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hour12: false }).format(new Date()), 10);
  const day = h >= 6 && h < 19;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
      {day ? (
        <span style={{ position: "relative", width: 24, height: 24 }}>
          <span style={{ position: "absolute", inset: 0,
            background: "repeating-conic-gradient(from 0deg, var(--earth-sienna) 0 4deg, transparent 4deg 45deg)",
            WebkitMask: "radial-gradient(circle, transparent 0 8px, #000 8.5px 10.5px, transparent 11px)",
            mask: "radial-gradient(circle, transparent 0 8px, #000 8.5px 10.5px, transparent 11px)" }} />
          <span style={{ position: "absolute", inset: 7, borderRadius: "50%", background: "var(--earth-sienna)" }} />
        </span>
      ) : (
        <span style={{ position: "relative", width: 22, height: 22 }}>
          <span style={{ position: "absolute", inset: 2, borderRadius: "50%", background: "var(--ink)" }} />
          <span style={{ position: "absolute", top: 0, right: 0, width: 16, height: 16, borderRadius: "50%", background: "var(--paper)" }} />
        </span>
      )}
      {showLabel && <Micro size={8} color="var(--ink-4)">{day ? "Central · day" : "Central · night"}</Micro>}
    </span>
  );
}

/* ---- monoline medium pictographs (CSS, no images) ---- */
function Pictograph({ kind, color = "currentColor", size = 42 }) {
  const c = { display: "block", color };
  if (kind === "film") return (
    <span style={{ ...c, width: size, height: size * 0.76, border: `1.5px solid ${color}`, borderRadius: 2, position: "relative" }}>
      <span style={{ position: "absolute", left: 3, right: 3, top: 3, height: 3, background: `repeating-linear-gradient(90deg, ${color} 0 3px, transparent 3px 7px)` }} />
      <span style={{ position: "absolute", left: 3, right: 3, bottom: 3, height: 3, background: `repeating-linear-gradient(90deg, ${color} 0 3px, transparent 3px 7px)` }} />
    </span>
  );
  if (kind === "book") return (
    <span style={{ ...c, width: size, height: size * 0.8, position: "relative" }}>
      <span style={{ position: "absolute", left: 1, top: 0, width: size * 0.45, height: "100%", border: `1.5px solid ${color}`, borderRight: "none", borderRadius: "3px 0 0 3px", transform: "perspective(40px) rotateY(14deg)", transformOrigin: "right" }} />
      <span style={{ position: "absolute", right: 1, top: 0, width: size * 0.45, height: "100%", border: `1.5px solid ${color}`, borderLeft: "none", borderRadius: "0 3px 3px 0", transform: "perspective(40px) rotateY(-14deg)", transformOrigin: "left" }} />
    </span>
  );
  if (kind === "vinyl") return (
    <span style={{ ...c, width: size * 0.9, height: size * 0.9, borderRadius: "50%", border: `1.5px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <span style={{ width: 11, height: 11, borderRadius: "50%", border: `1.5px solid ${color}` }} />
      <span style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: color }} />
    </span>
  );
  if (kind === "exhibit") return (
    <span style={{ ...c, width: size, height: size * 0.78, border: `1.5px solid ${color}`, position: "relative" }}>
      <span style={{ position: "absolute", left: "50%", top: 5, bottom: 5, width: 1.5, background: color }} />
      <span style={{ position: "absolute", left: 6, bottom: 6, width: 8, height: 8, border: `1.5px solid ${color}` }} />
      <span style={{ position: "absolute", right: 6, top: 6, width: 0, height: 0, borderLeft: `6px solid transparent`, borderRight: `6px solid transparent`, borderBottom: `9px solid ${color}` }} />
    </span>
  );
  return null;
}

/* ---- spinning vinyl (now-playing) ---- */
function VinylSpinner({ size = 56, playing = true }) {
  return (
    <span style={{ width: size, height: size, borderRadius: "50%", border: "1.5px solid var(--ink)", position: "relative", display: "block", animation: playing ? "spin 4s linear infinite" : "none" }}>
      <span style={{ position: "absolute", inset: 9, borderRadius: "50%", border: "1px solid var(--ink-4)" }} />
      <span style={{ position: "absolute", left: "50%", top: "50%", width: 5, height: 5, margin: -2.5, borderRadius: "50%", background: "var(--vermilion)" }} />
      <span style={{ position: "absolute", left: "50%", top: 4, width: 1.5, height: 9, background: "var(--vermilion)", transform: "translateX(-50%)" }} />
    </span>
  );
}

/* ---- equalizer bars ---- */
function Equalizer({ color = "var(--vermilion)", h = 26, bars = [10,24,16,22,12] }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 2, height: h }}>
      {bars.map((b, i) => (
        <span key={i} style={{ width: 3, height: b, background: color, transformOrigin: "bottom",
          animation: `bounce 850ms var(--ease-soft) infinite`, animationDelay: `${(i*120)%360}ms` }} />
      ))}
    </span>
  );
}

/* ---- letterboxd-style stars with hover pop ---- */
function Stars({ value = 5, hoverPop }) {
  const full = Math.floor(value);
  const half = value % 1 >= 0.5;
  const items = [];
  for (let i = 0; i < full; i++) items.push("★");
  if (half) items.push("½");
  return (
    <span className={hoverPop ? "stars-pop" : ""} style={{ display: "inline-flex", gap: 1, color: "var(--vermilion)", fontSize: 15 }}>
      {items.map((s, i) => <span key={i} style={{ transition: "transform 260ms var(--ease-cinematic)", transitionDelay: `${i*40}ms` }}>{s}</span>)}
    </span>
  );
}

/* ---- directional editorial link ---- */
function ArrowLink({ children, dir = "→", onClick, color, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: "none", border: "none", padding: 0,
        fontFamily: "var(--font-micro)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
        color: hover ? "var(--vermilion)" : (color || "var(--ink)"),
        display: "inline-flex", alignItems: "center", gap: 9,
        transition: "color 320ms var(--ease-soft)", ...style }}>
      {children}<span style={{ color: "var(--vermilion)", transform: hover ? "translateX(3px)" : "none", transition: "transform 320ms var(--ease-cinematic)" }}>{dir}</span>
    </button>
  );
}

/* ---- ghost / solid / red editorial button ---- */
function Button({ children, variant = "ghost", onClick, style }) {
  const base = { fontFamily: "var(--font-micro)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
    padding: "12px 24px", border: "1px solid var(--ink)", background: "transparent", color: "var(--ink)",
    transition: "all 240ms var(--ease-soft)" };
  const v = {
    ghost: {},
    solid: { background: "var(--ink)", color: "var(--paper)" },
    red:   { background: "var(--vermilion)", color: "#fff", borderColor: "var(--vermilion)" },
  }[variant];
  return <button onClick={onClick} style={{ ...base, ...v, ...style }}>{children}</button>;
}

/* ---- toned, grained film-plate placeholder. Optionally a real <image-slot>. ---- */
function Plate({ ratio = "4/5", tone = "warm", frame, slotId, placeholder, video, dur, style }) {
  const tones = {
    warm: "linear-gradient(150deg, #c4bdac, #8f876f)",
    cool: "linear-gradient(150deg, #9aa1a6, #5d6470)",
    ink:  "linear-gradient(150deg, #3a3630, #16140f)",
    rose: "linear-gradient(150deg, #c9a99a, #8a6f66)",
    sienna: "linear-gradient(150deg, #a9683a, #5e3413)",
    pine: "linear-gradient(150deg, #3f6b4d, #1d3a28)",
  };
  return (
    <div style={{ position: "relative", aspectRatio: ratio, width: "100%", borderRadius: 2, overflow: "hidden", background: tones[tone] || tones.warm, ...style }}>
      {slotId
        ? <image-slot id={slotId} shape="rect" placeholder={placeholder || "Drop a photograph"}></image-slot>
        : <span className="grain-field" />}
      {frame && <span style={{ position: "absolute", left: 11, bottom: 10, fontFamily: "var(--font-micro)", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>{frame}</span>}
      {video && <>
        <span style={{ position: "absolute", inset: 0, margin: "auto", width: 46, height: 46, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ borderLeft: "12px solid rgba(255,255,255,0.95)", borderTop: "7px solid transparent", borderBottom: "7px solid transparent", marginLeft: 3 }} />
        </span>
        {dur && <span style={{ position: "absolute", top: 10, right: 11, fontFamily: "var(--font-micro)", fontSize: 8, letterSpacing: "0.1em", color: "rgba(255,255,255,0.9)", padding: "2px 6px", border: "1px solid rgba(255,255,255,0.4)" }}>{dur}</span>}
        <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: "rgba(255,255,255,0.25)" }}>
          <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "38%", background: "var(--vermilion)" }} />
        </span>
      </>}
    </div>
  );
}

/* ---- reveal-on-scroll wrapper (IntersectionObserver) ---- */
function Reveal({ children, delay = 0, as = "div", style }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { setTimeout(() => setShown(true), delay); io.unobserve(el); } });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  const El = as;
  return (
    <El ref={ref} style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(22px)",
      transition: "opacity 900ms var(--ease-cinematic), transform 900ms var(--ease-cinematic)", ...style }}>
      {children}
    </El>
  );
}

Object.assign(window, {
  Micro, Kicker, Rule, Shavian, DayNight, Pictograph, VinylSpinner,
  Equalizer, Stars, ArrowLink, Button, Plate, Reveal,
});
