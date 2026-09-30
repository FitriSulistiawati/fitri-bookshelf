import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Spine from "./Spine.jsx";
import Sidebar from "./Sidebar.jsx";

const STATUSES = ["all", "finished", "reading", "tbr", "dropped", "paused"];
const statusLabel = (s) => (s === "tbr" ? "TBR" : s[0].toUpperCase() + s.slice(1));
const LANGS = { english: "English", indonesian: "Bahasa Indonesia" };

export default function Home({ books, status, setStatus, lang, setLang }) {
  const [mobileIndex, setMobileIndex] = useState(0);
  const visible = books.filter(
    (b) => (status === "all" || b.status === status) && (!lang || b.language === lang)
  );

  const shelfRef = useRef(null);
  useLayoutEffect(() => {
    shelfRef.current?.querySelectorAll(".spine").forEach((el, i) => el.style.setProperty("--i", i));
  }, [visible.length]);

  useEffect(() => {
    setMobileIndex(0);
  }, [status, lang]);

  const moveMobileBook = (direction) => {
    setMobileIndex((index) => (index + direction + visible.length) % visible.length);
  };

  return (
    <div className="page home">
      <Sidebar />
      <header className="hero">
        <p className="welcome">Welcome to Fitri's</p>
        <h1 className="script">Bookshelf</h1>
        <p className="internet">on the internet</p>
      </header>

      <div className="filters">
        <span>STATUS</span>
        {STATUSES.map((s) => (
          <button key={s} className={`pill ${status === s ? "active" : ""}`} onClick={() => setStatus(s)}>
            {statusLabel(s)}
          </button>
        ))}
        <span className="gap">LANGUAGE</span>
        {Object.entries(LANGS).map(([k, label]) => (
          <button key={k} className={`lang ${lang === k ? "active" : ""}`}
            onClick={() => setLang(lang === k ? null : k)}>{label}</button>
        ))}
      </div>

      <div className="shelf" ref={shelfRef}>
        {visible.map((b) => <Spine key={b.id} book={b} />)}
      </div>

      {visible.length > 0 && (
        <section className="mobile-book-showcase" aria-label="Rak buku">
          <div className="mobile-book-track">
            {[-1, 0, 1].map((offset) => {
              const index = (mobileIndex + offset + visible.length) % visible.length;
              const book = visible[index];
              const isActive = offset === 0;
              const isLight = book.variant === "light" || book.light === true;

              return (
                <a
                  key={`${book.id}-${offset}`}
                  href={`#/book/${book.id}`}
                  className={`mobile-book ${isLight ? "light" : "outline"} ${isActive ? "active" : "neighbor"}`}
                  style={{ transform: `translate(-50%, calc(-50% + ${offset * 158}px)) rotate(${book.tilt ?? 0}deg)` }}
                  onClick={(event) => {
                    if (!isActive) {
                      event.preventDefault();
                      setMobileIndex(index);
                    }
                  }}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span>{book.title}</span>
                </a>
              );
            })}
          </div>
          <div className="mobile-book-controls">
            <button type="button" aria-label="Buku sebelumnya" onClick={() => moveMobileBook(-1)}>←</button>
            <span>{mobileIndex + 1} / {visible.length}</span>
            <button type="button" aria-label="Buku berikutnya" onClick={() => moveMobileBook(1)}>→</button>
          </div>
        </section>
      )}
    </div>
  );
}