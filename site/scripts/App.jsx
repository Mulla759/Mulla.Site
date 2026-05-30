/* App.jsx — composes the chapters + sticky-nav active tracking, then mounts. */

const { useState, useEffect } = React;
const CHAPTERS = ["cover", "work", "archive", "notes", "bio", "contact"];

function App() {
  const [active, setActive] = useState("cover");
  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.4;
      let cur = CHAPTERS[0];
      for (const id of CHAPTERS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <React.Fragment>
      <Header active={active} chapters={CHAPTERS} />
      <Cover />
      <Work />
      <Archive />
      <Notes />
      <Bio />
      <Contact />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
