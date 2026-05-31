/* Bio.jsx — Chapter 05: a short magazine profile.
   Portrait + "this is me" on the left, a few simple lines on the right.
   Three voices: Costura for code, Apfel Grotezk for film/writing,
   Basteleur for the heading, PicNic for the "this is me" tag. */

/* The framed "this is me" portrait — sienna ground, PicNic overlay, blurred coordinate. */
function ThisIsMe() {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", borderRadius: 2,
        background: "linear-gradient(150deg, #a9683a, #5e3413)" }}>
        <span className="grain-field" />
        <img src="assets/headshot.png" alt="Mulla — self portrait"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        <span style={{ position: "absolute", top: 14, left: 18, fontFamily: "var(--font-annotation)",
          fontSize: 30, lineHeight: 1, color: "var(--paper-on-ink)", transform: "rotate(-3deg)" }}>this is me</span>
        <span style={{ position: "absolute", top: 16, right: 16, textAlign: "right" }}>
          <span style={{ display: "block", fontFamily: "var(--font-micro)", fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(237,231,216,0.78)" }}>Filed from</span>
          <span style={{ fontFamily: "var(--font-micro)", fontSize: 9, letterSpacing: "0.1em", color: "rgba(237,231,216,0.72)", filter: "blur(2.4px)" }}>44.9778°N 93.2650°W</span>
        </span>
      </div>
      <figcaption style={{ marginTop: 10 }}>
        <Micro size={9} color="var(--ink-3)"><span style={{ color: "var(--vermilion)" }}>Portrait</span> — self, Minneapolis · 2025</Micro>
      </figcaption>
    </figure>
  );
}

/* code voice: Costura, archival ink-blue */
function Eng({ children }) {
  return <span style={{ fontFamily: "var(--font-eng)", fontWeight: 600, letterSpacing: "-0.005em", color: "var(--ink-blue)" }}>{children}</span>;
}
/* film / writing voice: Apfel Grotezk, warm sienna */
function Cre({ children }) {
  return <span style={{ fontFamily: "var(--font-grotezk)", fontWeight: 500, fontStyle: "italic", color: "var(--earth-sienna)" }}>{children}</span>;
}

function Bio() {
  return (
    <section id="bio" style={{ background: "var(--paper)", padding: SECTION_PAD }}>
      <ChapterOpener num="05" title="Biography"
        standfirst={<>
          My name is <span style={{ fontFamily: "var(--font-grotezk)", fontWeight: 600 }}>Abdullahi</span>, also known as{" "}
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--vermilion)", letterSpacing: "-0.02em" }}>Mulla</span>.
          <br />
          I'm a Creative Technologist!
        </>} />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.85fr) minmax(0,1.15fr)",
        gap: "clamp(32px, 6vw, 88px)", alignItems: "start" }}>
        <Reveal><ThisIsMe /></Reveal>

        <div>
          <p style={{ fontFamily: "var(--font-grotezk)", fontWeight: 500, fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
            lineHeight: 1.3, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 28px", maxWidth: "22ch" }}>
            I like to <Eng>code</Eng>. I like <Cre>film</Cre>. I like to <Cre>write</Cre>.
          </p>

          <p style={{ fontFamily: "var(--font-grotezk)", fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
            lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 20px", maxWidth: "48ch" }}>
            Mostly I like the space where they overlap.
          </p>

          <p style={{ fontFamily: "var(--font-grotezk)", fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
            lineHeight: 1.6, color: "var(--ink-2)", margin: 0, maxWidth: "48ch" }}>
            This page is an archive of the things that interest and intrigue me, kept in the open and free to take, because I love sharing them.
          </p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Bio, ThisIsMe });
