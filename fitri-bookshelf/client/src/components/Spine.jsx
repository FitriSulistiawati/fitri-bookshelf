export default function Spine({ book }) {
  const isLight = book.variant === "light" || book.light === true;
  const spineWidth = book.pages == null
    ? (book.width ?? 34)
    : Math.min(58, Math.max(26, Math.round(24 + book.pages / 20)));

  return (
    <a
      href={`#/book/${book.id}`}
      className={`spine ${isLight ? "light" : "outline"}`}
      style={{
        width: `${spineWidth}px`,
        height: `${book.height ?? 280}px`,
        transform: `rotate(${book.tilt ?? 0}deg)`,
      }}
    >
      <span>{book.title} · {book.author}</span>
    </a>
  );
}