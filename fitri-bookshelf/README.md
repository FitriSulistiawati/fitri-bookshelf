# Fitri's Bookshelf

## Menjalankan (butuh Node.js 18+)
Terminal 1:  cd server && npm install && npm start
Terminal 2:  cd client && npm install && npm run dev
Buka http://localhost:5173 lalu klik buku untuk melihat sinopsis.

## Menambah buku
Edit server/books.json (status: finished/reading/dropped/paused,
language: korean/english/indonesian, variant: light/outline), atau lewat API:
curl -X POST http://localhost:5000/api/books -H "Content-Type: application/json" \
 -H "x-admin-key: rahasia" -d '{"title":"...","author":"...","status":"finished","language":"english","synopsis":"..."}'
Ganti kunci dengan: ADMIN_KEY=katasandimu npm start

## Halaman detail buku
Klik buku di rak -> halaman detail (#/book/<id>) berisi sampul, penulis, judul, info, dan sinopsis.
Tanda panah ← dan garis-garis di sidebar dipakai untuk kembali / pindah ke buku lain.

## Sampul buku
Sampul otomatis diambil dari Google Books saat halaman dibuka (butuh internet).
Kalau tidak ketemu, muncul sampul placeholder. Untuk sampul sendiri:
1. Simpan gambar di client/public/covers/  (mis. janji.jpg)
2. Isi "cover": "/covers/janji.jpg" pada buku itu di server/books.json
