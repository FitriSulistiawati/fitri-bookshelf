import { useEffect, useState } from "react";

export default function Cover({ book }) {
  // 1) pakai book.cover kalau diisi, 2) kalau tidak, cari /covers/<id>.jpg
  const local = book.cover || `/covers/${book.id}.jpg`;
  const [src, setSrc] = useState(local);
  const [stage, setStage] = useState("local"); // local -> google -> none

  useEffect(() => {
    setSrc(local);
    setStage("local");
  }, [book.id]);

  // Dipanggil kalau gambar gagal dimuat
  const fallback = async () => {
    if (stage !== "local") return setStage("none");
    setStage("google");
    try {
      const q = encodeURIComponent(`intitle:${book.title} inauthor:${book.author}`);
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1`);
      const data = await res.json();
      const link = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
      if (!link) return setStage("none");
      setSrc(link.replace("http://", "https://").replace("zoom=1", "zoom=2").replace("&edge=curl", ""));
    } catch {
      setStage("none");
    }
  };

  if (stage === "none") {
    return (
      <div className="cover placeholder">
        <span className="ph-title">{book.title}</span>
        <span className="ph-author">{book.author}</span>
      </div>
    );
  }

  return <img className="cover" src={src} alt={`Sampul ${book.title}`} onError={fallback} />;
}