/* ui_kits/website — App: chapter routing + chrome assembly. */

const CHAPTERS = [
  { id: "cover", label: "Cover", Comp: ChapterCover },
  { id: "work", label: "Work", Comp: ChapterWork },
  { id: "archive", label: "Archive", Comp: ChapterArchive },
  { id: "notes", label: "Notes", Comp: ChapterNotes },
  { id: "bio", label: "Bio", Comp: ChapterBio },
  { id: "contact", label: "Contact", Comp: ChapterContact },
];

function App() {
  const [active, setActive] = React.useState("cover");
  const nav = (id) => {
    setActive(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const current = CHAPTERS.find(c => c.id === active) || CHAPTERS[0];
  const Comp = current.Comp;
  return (
    <React.Fragment>
      <Header chapters={CHAPTERS} active={active} onNav={nav} />
      <main>
        <ChapterFade chapterKey={active}>
          <Comp onNav={nav} />
        </ChapterFade>
      </main>
      <FooterStrip onNav={nav} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
