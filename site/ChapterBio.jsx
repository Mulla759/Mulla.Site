/* ui_kits/website — Chapter 05: Biography.
   A magazine profile: the subject set huge, the story curated around him.
   Two cross-pollinating voices — Costura (engineering), F. Goritsch (creative) —
   live inside an Apfel Grotezk page, and the timeline becomes a canvas. */

/* engineering voice: Costura, archival ink-blue */
function Eng({ children }) {
  return <span style={{ fontFamily: "var(--font-eng)", fontWeight: 600, letterSpacing: "-0.005em", color: "var(--ink-blue)" }}>{children}</span>;
}
/* creative / media voice: F. Goritsch, warm sienna */
function Cre({ children }) {
  return <span style={{ fontFamily: "var(--font-creative)", fontWeight: 400, color: "var(--earth-sienna)" }}>{children}</span>;
}

/* The cross-pollination — previous experience drawn as a living constellation
   that resolves into one node: why this archive exists. Replaces the timeline. */
function StoryCanvas() {
  const wrapRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const C = {
      ink: "#1B1813", ink4: "#9C9587", rule: "rgba(27,24,19,0.20)",
      verm: "#C2412A", blue: "#2C3E54", sienna: "#8B4513",
    };

    // normalized story map: engineering to the left, creative to the right,
    // the archive at the centre. seed drives the gentle float.
    const nodes = [
      { id: "core",  x: 0.50, y: 0.50, label: "mulla.site",      sub: "the open archive", kind: "core", seed: 0.0 },
      { id: "hack",  x: 0.13, y: 0.30, label: "Hackathons",      sub: "build it twice",   kind: "eng",  seed: 1.1 },
      { id: "black", x: 0.20, y: 0.66, label: "Blackbox",        sub: "AI · 2023",        kind: "eng",  seed: 2.3 },
      { id: "mc",    x: 0.34, y: 0.86, label: "Muslim Connect",  sub: "shipped · 2024",   kind: "eng",  seed: 3.7 },
      { id: "film",  x: 0.86, y: 0.26, label: "Film",            sub: "pacing",           kind: "cre",  seed: 0.6 },
      { id: "write", x: 0.90, y: 0.62, label: "Writing",         sub: "voice",            kind: "cre",  seed: 4.2 },
      { id: "video", x: 0.72, y: 0.88, label: "Videography",     sub: "the frame",        kind: "cre",  seed: 5.5 },
    ];
    const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
    const edges = [
      ["hack", "core"], ["black", "core"], ["mc", "core"],
      ["film", "core"], ["write", "core"], ["video", "core"],
      ["hack", "black"], ["black", "mc"],            // engineering lineage
      ["film", "write"], ["write", "video"],         // creative lineage
      ["mc", "video"], ["black", "film"],            // the cross-pollination
    ];

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pointer = null, hoverId = null, raf = 0, t0 = 0;

    function resize() {
      w = wrap.clientWidth;
      h = Math.max(320, Math.min(w * 0.52, 440));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const padX = () => Math.max(40, w * 0.08);
    const padY = 54;
    function pos(n, t) {
      const fx = reduce ? 0 : Math.sin(t / 2100 + n.seed) * 3.2;
      const fy = reduce ? 0 : Math.cos(t / 2600 + n.seed * 1.3) * 3.2;
      return {
        x: padX() + n.x * (w - padX() * 2) + fx,
        y: padY + n.y * (h - padY * 1.7) + fy,
      };
    }

    const easeInOut = (p) => p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

    function draw(now) {
      if (!t0) t0 = now;
      const t = now - t0;
      const p = reduce ? 1 : easeInOut(Math.min(t / 1500, 1));
      ctx.clearRect(0, 0, w, h);

      // edges — drawn progressively, staggered, hovered ones flare vermilion
      edges.forEach((e, i) => {
        const a = pos(byId[e[0]], t), b = pos(byId[e[1]], t);
        const local = Math.max(0, Math.min((p - i * 0.018) / 0.6, 1));
        if (local <= 0) return;
        const lit = hoverId && (e[0] === hoverId || e[1] === hoverId);
        const toCore = e[0] === "core" || e[1] === "core";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + (b.x - a.x) * local, a.y + (b.y - a.y) * local);
        ctx.strokeStyle = lit ? C.verm : (toCore ? "rgba(194,65,42,0.30)" : C.rule);
        ctx.lineWidth = lit ? 1.4 : 0.9;
        ctx.stroke();
      });

      // a slow spark travelling the core edges — the system, alive
      if (!reduce && p >= 1) {
        edges.filter(e => e[0] === "core" || e[1] === "core").forEach((e, i) => {
          const a = pos(byId[e[0]], t), b = pos(byId[e[1]], t);
          const f = ((t / 4200) + i * 0.16) % 1;
          ctx.beginPath();
          ctx.arc(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(194,65,42,0.55)";
          ctx.fill();
        });
      }

      // nodes
      nodes.forEach((n) => {
        const np = Math.max(0, Math.min((p - 0.18) / 0.6, 1));
        if (np <= 0) return;
        const { x, y } = pos(n, t);
        const hov = hoverId === n.id;
        const dot = n.kind === "core" ? C.verm : n.kind === "eng" ? C.blue : C.sienna;
        const r = n.kind === "core" ? 6 : 4;

        ctx.globalAlpha = np;
        if (n.kind === "core") {
          ctx.beginPath(); ctx.arc(x, y, r + 6, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(194,65,42,0.35)"; ctx.lineWidth = 1; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(x, y, hov ? r + 1.5 : r, 0, Math.PI * 2);
        ctx.fillStyle = dot; ctx.fill();

        // label — the voice matches the node's discipline
        ctx.textAlign = "center"; ctx.textBaseline = "top";
        if (n.kind === "core") {
          ctx.font = "700 19px 'Apfel Grotezk', sans-serif"; ctx.fillStyle = C.ink;
        } else if (n.kind === "eng") {
          ctx.font = (hov ? "700 " : "600 ") + "14px 'Costura', sans-serif"; ctx.fillStyle = C.blue;
        } else {
          ctx.font = "400 17px 'F. Goritsch', 'Basteleur', Georgia, serif"; ctx.fillStyle = C.sienna;
        }
        if (ctx.letterSpacing !== undefined) ctx.letterSpacing = n.kind === "core" ? "-0.5px" : "0px";
        ctx.fillText(n.label, x, y + 12);

        ctx.font = "9px 'Space Mono', monospace"; ctx.fillStyle = C.ink4;
        if (ctx.letterSpacing !== undefined) ctx.letterSpacing = "1.4px";
        ctx.fillText(n.sub.toUpperCase(), x, y + (n.kind === "core" ? 36 : 31));
        if (ctx.letterSpacing !== undefined) ctx.letterSpacing = "0px";
        ctx.globalAlpha = 1;
      });

      if (!reduce) raf = requestAnimationFrame(draw);
    }

    function onMove(ev) {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
      const now = performance.now() - t0;
      hoverId = null; let best = 30;
      nodes.forEach(n => {
        const pp = pos(n, now);
        const d = Math.hypot(pp.x - pointer.x, pp.y - pointer.y);
        if (d < best) { best = d; hoverId = n.id; }
      });
      canvas.style.cursor = hoverId ? "pointer" : "default";
      if (reduce) { t0 = performance.now(); requestAnimationFrame(draw); }
    }
    function onLeave() { hoverId = null; pointer = null; canvas.style.cursor = "default"; }

    const ro = new ResizeObserver(() => { resize(); if (reduce) { t0 = performance.now(); requestAnimationFrame(draw); } });
    ro.observe(wrap);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    resize();
    const fonts = [
      document.fonts.load("700 19px 'Apfel Grotezk'"),
      document.fonts.load("600 14px 'Costura'"),
      document.fonts.load("400 17px 'F. Goritsch'"),
      document.fonts.load("9px 'Space Mono'"),
    ];
    Promise.allSettled(fonts).then(() => { t0 = 0; raf = requestAnimationFrame(draw); });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} aria-hidden="true" />
      <p className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        A constellation linking previous work (hackathons, Blackbox, Muslim Connect) and creative practice
        (film, writing, videography) into one node: mulla.site, the open archive.
      </p>
    </div>
  );
}

function ChapterBio({ onNav }) {
  const meta = [
    ["Subject", "Self"],
    ["Disciplines", "Engineering · Film · Writing"],
    ["Method", "Cross-pollination"],
    ["Filed under", "An archive of many things"],
  ];
  return (
    <section data-screen-label="Biography" style={{ background: "var(--paper-news)", padding: "120px clamp(20px, 6vw, 64px) 56px", overflow: "hidden" }}>

      {/* masthead — the subject, set huge, the page curated around him */}
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 0.45fr)",
          gap: "clamp(24px, 5vw, 64px)", alignItems: "end", borderBottom: "2px solid var(--ink)", paddingBottom: 26 }}>
          <div>
            <Micro size={11} color="var(--vermilion)" style={{ display: "block", marginBottom: 18, letterSpacing: "0.2em", fontWeight: 700 }}>
              05 · Biography
            </Micro>
            <h2 style={{ fontFamily: "var(--font-grotezk)", fontWeight: 700, fontSize: "clamp(3.6rem, 13vw, 11rem)",
              lineHeight: 0.82, letterSpacing: "-0.05em", color: "var(--ink)", margin: 0 }}>
              Mulla<span style={{ color: "var(--vermilion)" }}>.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-grotezk)", fontWeight: 400, fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
              letterSpacing: "0.01em", color: "var(--ink-3)", margin: "14px 0 0" }}>
              Abdullah. Friends call me Mulla.
            </p>
          </div>

          {/* the index rail, like a contributor sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {meta.map(([k, v], i) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, padding: "9px 0",
                borderTop: i === 0 ? "none" : "1px solid var(--rule)" }}>
                <Micro size={8.5} color="var(--ink-4)">{k}</Micro>
                <span style={{ fontFamily: "var(--font-grotezk)", fontSize: 13.5, lineHeight: 1.3, color: "var(--ink-2)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* narrative — two columns, the two voices cross-pollinating in the prose */}
      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: "clamp(28px, 5vw, 80px)", marginTop: 52, alignItems: "start" }}>
        <Reveal>
          <div>
            <p style={{ fontFamily: "var(--font-grotezk)", fontWeight: 500, fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
              lineHeight: 1.34, letterSpacing: "-0.018em", color: "var(--ink)", margin: "0 0 26px", maxWidth: "30ch" }}>
              I live in the seam where <Eng>engineering</Eng> meets <Cre>everything else</Cre>, and I like it there.
            </p>
            <p style={{ fontFamily: "var(--font-grotezk)", fontSize: 16.5, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 18px", maxWidth: "58ch" }}>
              I am not here to pitch a résumé. This page is about who I am, and why I made it. It is a collection of the things I do, the things I enjoy, and the things I love sharing with the world.
            </p>
            <p style={{ fontFamily: "var(--font-grotezk)", fontSize: 16.5, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 18px", maxWidth: "58ch" }}>
              I believe that sharing knowledge, openly, is how we come to understand the world a little better. So the <Eng>code</Eng>, the <Cre>writing</Cre>, the notes, and everything in between all live here, in the open, free to take.
            </p>
          </div>
        </Reveal>

        {/* the essence, hung as a pull quote — not a label, a way of working */}
        <Reveal delay={120}>
          <figure style={{ margin: 0, borderLeft: "2px solid var(--vermilion)", paddingLeft: "clamp(18px, 2vw, 28px)" }}>
            <blockquote style={{ margin: 0, fontFamily: "var(--font-grotezk)", fontWeight: 400,
              fontSize: "clamp(1.5rem, 2.6vw, 2.3rem)", lineHeight: 1.12, letterSpacing: "-0.025em", color: "var(--ink)" }}>
              A curious, driven person who loves exploring the fine lines between <Eng>technology</Eng> and <Cre>everything it touches</Cre>.
            </blockquote>
            <figcaption style={{ fontFamily: "var(--font-grotezk)", fontSize: 15, lineHeight: 1.5, color: "var(--ink-3)", marginTop: 16, maxWidth: "34ch" }}>
              I love cross-pollinating ideas. And more than that, I love sharing them.
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* the story — previous experience and the reason, drawn rather than listed */}
      <Reveal delay={80}>
        <div style={{ marginTop: "clamp(48px, 7vw, 96px)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
            <Micro size={10} color="var(--vermilion)" style={{ fontWeight: 700 }}>Fig. 01</Micro>
            <span style={{ fontFamily: "var(--font-grotezk)", fontWeight: 700, fontSize: "clamp(1.05rem, 1.6vw, 1.4rem)", letterSpacing: "-0.02em", color: "var(--ink)" }}>
              How it all connects
            </span>
            <Rule color="var(--rule-strong)" style={{ flex: 1 }} />
          </div>
          <Micro size={9} color="var(--ink-4)" style={{ display: "block", marginBottom: 6 }}>
            Engineering, in blue. Creative, in sienna. Everything resolves into one open page.
          </Micro>
          <StoryCanvas />
        </div>
      </Reveal>
    </section>
  );
}

Object.assign(window, { ChapterBio, StoryCanvas });
