/* Blog.jsx — hidden "Reading Room" page. Orange ghost-outline aesthetic.
   Only reachable through in-content links; never in the main nav unless unlocked. */

function Blog({ onBack }) {
  const entries = [
    {
      id: "commonplace",
      kicker: "Essay",
      title: "On keeping a commonplace book",
      standfirst: "The internet made everyone an archivist and no one a curator.",
      body: [
        "A note is only worth keeping if you'd defend it. Somewhere between the invention of the bookmark and the arrival of the read-it-later app, we lost the instinct to argue with our own shelves.",
        "The commonplace book — that old, pre-digital practice of copying passages by hand into a personal volume — was never about storage. It was about friction. You copied a line because you believed it, or because you wanted to believe it, or because you needed to sit with it long enough to decide.",
        "Today we highlight with a thumb and forget with the same thumb. The pile grows. The conviction doesn't. I started mine on paper, then moved it here — not because screens are better, but because I wanted a practice that forced me to re-read before I re-shared.",
        "A commonplace book is a portrait drawn in other people's words. Keep one long enough and you'll see who you're becoming.",
      ],
    },
    {
      id: "apartamento",
      kicker: "Reference",
      title: "Apartamento, every issue",
      standfirst: "Proof that interiors are really portraits. The mess is the point.",
      body: [
        "Apartamento understood something that most shelter magazines refuse to admit: a home is not a set. It's an accumulation of habits, accidents, and stubbornness. The unwashed mug, the stack of books used as a monitor stand, the chair no one sits in but no one throws away.",
        "Every issue reads like a visit. You feel the floor under your feet. You notice what's on the fridge. The photography is intimate without being voyeuristic — it respects the fact that a real room has bad angles.",
        "I keep every issue because they age well. A pristine interior dates itself; a lived-in one just gets more convincing.",
      ],
    },
    {
      id: "highlight-reel",
      kicker: "Essay",
      title: "Against the highlight reel",
      standfirst: "A life is mostly errata. I'd rather show the corrections than the cover.",
      body: [
        "The highlight reel is a lie that everyone agrees to tell. Not because we're dishonest — because we're afraid of being ordinary. But ordinary is where the texture lives.",
        "I've been thinking about what a portfolio would look like if it included the false starts. The draft that went nowhere. The feature that shipped and then got quietly rolled back. The meeting where someone said 'I don't get it' and was right.",
        "Showing process isn't the same as showing failure. Process is just evidence that you were paying attention. The highlight reel skips the attention and jumps to the applause.",
        "This site is an attempt at the opposite. Not a monument — a notebook. Something that looks more like thinking than like having already thought.",
      ],
    },
    {
      id: "promise",
      kicker: "Feature",
      title: "Building Promise, in public",
      standfirst: "A year spent making a financial companion that treats patience as a feature, not a flaw.",
      body: [
        "It began as a question about time — how an app could help someone wait well. Most fintech tries to make money feel fast. We wanted to make it feel steady.",
        "The work moved between research notes, late-night Figma files, and a lot of reading about how rituals form. What stayed constant was a refusal to ship anxiety. Every screen got asked the same question: does this make someone feel richer, or just more aware of what they lack?",
        "Building in public meant sharing the rough edges. The color palette changed four times. The onboarding flow got rewritten from scratch after user testing revealed that people didn't want guidance — they wanted confirmation that their instincts were sound.",
        "Promise isn't finished. That's the point. A financial tool that pretends to have all the answers is just another kind of debt.",
      ],
    },
    {
      id: "rolodex",
      kicker: "Feature",
      title: "Rolodex, for the rest of us",
      standfirst: "An open recruiter-discovery tool for students who didn't inherit a network.",
      body: [
        "Half product, half polemic. The interface had to feel like a friend who knows people, not a database.",
        "We wrote the cold-outreach copy the way you'd actually text someone, and the tool grew from there into something students quietly passed around. No launch event. No Product Hunt campaign. Just a link in a group chat that kept getting forwarded.",
        "The hardest design problem wasn't the UI — it was tone. How do you make a networking tool that doesn't feel like networking? We landed on something closer to a neighborhood bulletin board: casual, specific, a little funny.",
        "Rolodex exists because access shouldn't depend on who your parents know. That's it. That's the whole thesis.",
      ],
    },
  ];

  return (
    <section style={{ background: "var(--paper-bright)", minHeight: "100vh", padding: "78px clamp(20px, 6vw, 80px)" }}>
      {/* Hero */}
      <div style={{ borderTop: "1px solid var(--orange-rule)", paddingTop: 22, marginBottom: 56 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 30, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 360px" }}>
            <Kicker color="var(--orange)" style={{ marginBottom: 16 }}>The Reading Room</Kicker>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.86,
              letterSpacing: "-0.045em", color: "var(--ink)",
            }}>Reading</h2>
          </div>
          <p style={{
            flex: "0 1 380px", fontFamily: "var(--font-body)", fontWeight: 500,
            fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)", lineHeight: 1.45,
            letterSpacing: "-0.01em", color: "var(--ink-3)", paddingTop: 8,
          }}>Extended essays, feature write-ups, and references — the longer versions of what lives in the magazine.</p>
        </div>
      </div>

      {/* Table of contents */}
      <Reveal>
        <div style={{
          border: "1px solid var(--orange-rule)", padding: "24px 28px",
          marginBottom: 72, maxWidth: 520,
        }}>
          <Micro size={9} color="var(--orange)" style={{ display: "block", marginBottom: 16, letterSpacing: "0.2em" }}>Contents</Micro>
          {entries.map((e, i) => (
            <a key={e.id} href={"#" + e.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              padding: "8px 0",
              borderBottom: i < entries.length - 1 ? "1px solid var(--rule)" : "none",
              textDecoration: "none", color: "var(--ink-2)",
              fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.4,
              transition: "color 280ms var(--ease-soft)",
            }}
              onMouseEnter={ev => ev.currentTarget.style.color = "var(--orange)"}
              onMouseLeave={ev => ev.currentTarget.style.color = "var(--ink-2)"}
            >
              <span>{e.title}</span>
              <Micro size={8} color="var(--ink-4)" style={{ marginLeft: 16, flexShrink: 0 }}>{e.kicker}</Micro>
            </a>
          ))}
        </div>
      </Reveal>

      {/* Entries */}
      {entries.map((e, i) => (
        <Reveal key={e.id} delay={i * 80}>
          <article id={e.id} style={{
            borderTop: "1px solid var(--orange-rule)", paddingTop: 28,
            marginBottom: 72, maxWidth: "var(--measure)",
          }}>
            <Kicker color="var(--orange)" style={{ marginBottom: 14 }}>{e.kicker}</Kicker>
            <h3 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(2rem, 3.6vw, 3.4rem)", lineHeight: 0.98,
              letterSpacing: "-0.035em", color: "var(--ink)", marginBottom: 14,
            }}>{e.title}</h3>
            <p style={{
              fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1.18rem",
              lineHeight: 1.45, letterSpacing: "-0.012em", color: "var(--ink)",
              marginBottom: 24,
            }}>{e.standfirst}</p>
            {e.body.map((para, j) => (
              <p key={j} style={{
                fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.62,
                color: "var(--ink-2)", marginBottom: 18, maxWidth: "var(--measure)",
              }}>{para}</p>
            ))}
          </article>
        </Reveal>
      ))}

      {/* Footer */}
      <Reveal>
        <div style={{ borderTop: "1px solid var(--orange-rule)", paddingTop: 22, marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <ArrowLink dir="←" onClick={onBack} color="var(--orange)">Back to the magazine</ArrowLink>
          <Shavian size={16} gloss="made with love" />
        </div>
      </Reveal>
    </section>
  );
}

Object.assign(window, { Blog });
