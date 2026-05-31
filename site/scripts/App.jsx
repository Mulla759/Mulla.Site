/* App.jsx — composes the chapters + sticky-nav active tracking, then mounts. */

const { useState, useEffect, useCallback } = React;
const CHAPTERS = ["cover", "work", "archive", "notes", "bio", "contact"];

function App() {
  const [active, setActive] = useState("cover");
  const [view, setView] = useState("magazine");  /* "magazine" | "blog" | "gallery" */
  const [blogUnlocked, setBlogUnlocked] = useState(() => {
    try { return localStorage.getItem("mulla-blog-unlocked") === "true"; } catch { return false; }
  });
  const [galleryUnlocked, setGalleryUnlocked] = useState(() => {
    try { return localStorage.getItem("mulla-gallery-unlocked") === "true"; } catch { return false; }
  });

  const openBlog = useCallback(() => {
    setView("blog");
    setBlogUnlocked(true);
    try { localStorage.setItem("mulla-blog-unlocked", "true"); } catch {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openGallery = useCallback(() => {
    setView("gallery");
    setGalleryUnlocked(true);
    try { localStorage.setItem("mulla-gallery-unlocked", "true"); } catch {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goBack = useCallback(() => {
    setView("magazine");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* Scroll tracking — magazine view only */
  useEffect(() => {
    if (view !== "magazine") return;
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
  }, [view]);

  /* Set active nav state for hidden pages */
  useEffect(() => {
    if (view === "blog") setActive("reading");
    if (view === "gallery") setActive("gallery");
  }, [view]);

  const isSubpage = view === "blog" || view === "gallery";

  return (
    <React.Fragment>
      <Header
        active={active}
        chapters={view === "magazine" ? CHAPTERS : []}
        blogUnlocked={blogUnlocked}
        galleryUnlocked={galleryUnlocked}
        onBlogClick={openBlog}
        onGalleryClick={openGallery}
        onLogoClick={isSubpage ? goBack : undefined}
      />
      {view === "magazine" && (
        <React.Fragment>
          <Cover />
          <Work onReadMore={openBlog} />
          <Archive onGallery={openGallery} />
          <Notes onReadMore={openBlog} />
          <Bio />
          <Contact onReadMore={openBlog} />
        </React.Fragment>
      )}
      {view === "blog" && <Blog onBack={goBack} />}
      {view === "gallery" && <Gallery onBack={goBack} />}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
