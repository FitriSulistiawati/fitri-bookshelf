import { useState } from "react";

export default function Sidebar({ books = [], currentId }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className={`sidebar ${menuOpen ? "menu-open" : ""}`}>
      <button
        type="button"
        className="mobile-menu-toggle"
        aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>
      <a href="#/" className="logo">Fitri's<br />Bookshelf</a>
      <nav className="sidebar-links">
        <a href="#/" onClick={() => setMenuOpen(false)}>HOME</a>
        <a href="#/about" onClick={() => setMenuOpen(false)}>ABOUT</a>
      </nav>
      {currentId && (
        <nav className="dashes">
          <a href="#/" className="back" aria-label="Kembali">←</a>
          {books.map((b) => (
            <a key={b.id} href={`#/book/${b.id}`} data-title={b.title} aria-label={b.title}
               className={`dash ${b.id === currentId ? "on" : ""}`} />
          ))}
        </nav>
      )}
    </aside>
  );
}