import { useEffect, useState } from "react";
import Home from "./components/Home.jsx";
import Detail from "./components/Detail.jsx";
import About from "./components/About.jsx";
import "./index.css";

export default function App() {
  const [books, setBooks] = useState([]);
  const [route, setRoute] = useState(window.location.hash);
  const [status, setStatus] = useState("all");
  const [lang, setLang] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [minDone, setMinDone] = useState(false);

  useEffect(() => {
    fetch("/api/books")
      .then((r) => r.json())
      .then(setBooks)
      .catch(() => setBooks([]))
      .finally(() => setFetched(true));
    const t = setTimeout(() => setMinDone(true), 1600);
    const onHash = () => { setRoute(window.location.hash); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onHash);
    return () => { window.removeEventListener("hashchange", onHash); clearTimeout(t); };
  }, []);

  if (!fetched || !minDone) {
    return (
      <div className="page loader">
        <p className="loader-title">Fitri's Bookshelf</p>
        <div className="dots"><span /><span /><span /></div>
      </div>
    );
  }

  if (route === "#/about") {
    return <About />;
  }

  const m = route.match(/^#\/book\/(.+)$/);
  if (m) {
    const book = books.find((b) => b.id === m[1]);
    return book ? <Detail book={book} books={books} /> : <div className="page detail" />;
  }
  return <Home books={books} status={status} setStatus={setStatus} lang={lang} setLang={setLang} />;
}