import { useEffect, useRef } from "react";
import Cover from "./Cover.jsx";
import Sidebar from "./Sidebar.jsx";

function Stars({ value = 0 }) {
  return (
    <span className="stars" title={`${value} / 5`}>
      <span className="stars-empty">★★★★★</span>
      <span className="stars-fill" style={{ width: `${(value / 5) * 100}%` }}>★★★★★</span>
    </span>
  );
}

// Muncul dari bawah saat masuk layar
function Reveal({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="reveal">{children}</div>;
}

function BookDetail({ book }) {
  // Rating & review hanya tampil kalau buku sudah finished
  const hasReview = book.status === "finished" && (book.rating > 0 || book.review);

  return (
    <div className="detail-main">
      <Cover book={book} />
      <article className="info">
        <p className="d-author">{book.author}</p>
        <h1 className="d-title">{book.title}</h1>
        <p className="d-meta">
          {book.genres}
          {book.pages ? ` ${book.pages} pages.` : ""}
          {book.year ? ` ${book.year}.` : ""}
          <span className="d-status"> · {book.status === "tbr" ? "to be read" : book.status}</span>
        </p>

        <div className="d-synopsis">
          {book.synopsis.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {book.shopee && (
          <a className="buy" href={book.shopee} target="_blank" rel="noopener noreferrer">
            Beli di Sini ↗
          </a>
        )}

        {hasReview && (
          <section className="d-review">
            <h2>My review</h2>
            {book.rating > 0 && (
              <p className="d-rating">
                <Stars value={book.rating} /> <span>{book.rating} / 5</span>
              </p>
            )}
            {book.review && <p className="d-review-text">“{book.review}”</p>}
          </section>
        )}
      </article>
    </div>
  );
}

export default function Detail({ book, books }) {
  // Buku yang diklik tampil paling atas, sisanya menyusul di bawah
  const ordered = [book, ...books.filter((b) => b.id !== book.id)];

  return (
    <div className="page detail">
      <Sidebar books={books} currentId={book.id} />
      <main className="detail-list">
        {ordered.map((b) => (
          <Reveal key={b.id}>
            <BookDetail book={b} />
          </Reveal>
        ))}
      </main>
    </div>
  );
}