import express from "express";
import cors from "cors";
import fs from "fs";
import { randomUUID } from "crypto";

const app = express();
const FILE = "./books.json";
const STATUSES = ["finished", "reading", "tbr", "dropped", "paused"];
const LANGS = ["english", "indonesian"];
const ADMIN_KEY = process.env.ADMIN_KEY || "rahasia";

app.use(cors());
app.use(express.json());

const read = () => JSON.parse(fs.readFileSync(FILE, "utf-8"));
const write = (d) => fs.writeFileSync(FILE, JSON.stringify(d, null, 2));
const admin = (req, res, next) =>
  req.headers["x-admin-key"] === ADMIN_KEY ? next() : res.status(401).json({ message: "Tidak diizinkan" });

// Publik: semua pengunjung bisa melihat
app.get("/api/books", (req, res) => res.json(read()));

// Hanya pemilik (header x-admin-key) yang bisa ubah data
app.post("/api/books", admin, (req, res) => {
  const { title, author, status, language } = req.body;
  if (!title || !author || !STATUSES.includes(status) || !LANGS.includes(language))
    return res.status(400).json({ message: "Data tidak valid" });
  const book = { variant: "light", synopsis: "", ...req.body, id: randomUUID() };
  const books = read(); books.push(book); write(books);
  res.status(201).json(book);
});

app.put("/api/books/:id", admin, (req, res) => {
  const books = read();
  const i = books.findIndex((b) => b.id === req.params.id);
  if (i === -1) return res.status(404).json({ message: "Tidak ditemukan" });
  books[i] = { ...books[i], ...req.body, id: books[i].id };
  write(books); res.json(books[i]);
});

app.delete("/api/books/:id", admin, (req, res) => {
  const books = read();
  const rest = books.filter((b) => b.id !== req.params.id);
  if (rest.length === books.length) return res.status(404).json({ message: "Tidak ditemukan" });
  write(rest); res.json({ message: "Dihapus" });
});

export default app;
