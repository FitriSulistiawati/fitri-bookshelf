import Sidebar from "./Sidebar.jsx";

export default function About() {
  return (
    <div className="page about">
      <Sidebar />
      <main className="about-main">
        <h1 className="script about-title">About</h1>

        <div className="about-body">
          <p>
            Website ini dibuat untuk teman-teman yang sebenarnya ingin mulai membaca,
            tapi sering bingung harus mulai dari buku yang mana. Rasanya rak buku di
            toko begitu banyak, rekomendasi di mana-mana, dan akhirnya niat membaca
            malah tertunda karena tidak tahu harus mulai dari mana.
          </p>

          <p>
            Fitri's Bookshelf hadir sebagai rak baca sederhana milik pribadi, yang
            terbuka untuk siapa saja jadikan referensi. Setiap buku di sini sudah
            dibaca, sedang dibaca, atau memang sengaja ditandai untuk dibaca nanti,
            lengkap dengan catatan singkat dan penilaian jujur apa adanya. Harapannya,
            teman-teman bisa menemukan satu judul yang terasa pas untuk jadi langkah
            pertama.
          </p>

          <p>
            Membaca itu sederhana, tapi manfaatnya jauh lebih besar dari sekadar
            mengisi waktu luang. Setiap buku membuka jendela ke dunia, sudut pandang,
            dan pengalaman yang tidak selalu bisa kita temui sendiri. Membaca melatih
            fokus, memperkaya kosakata, dan diam-diam membentuk cara kita berpikir
            dan berempati pada orang lain. Di tengah dunia yang serba cepat dan penuh
            gangguan, meluangkan waktu untuk satu buku adalah bentuk kebaikan kecil
            untuk diri sendiri.
          </p>

          <p>
            Tidak perlu buru-buru dan tidak perlu merasa tertinggal. Mulai dari satu
            buku yang paling menarik perhatianmu, baca perlahan, dan nikmati
            prosesnya. Semoga rak ini bisa jadi teman yang membantu perjalanan
            membacamu dimulai.
          </p>

          <p>
            Juga untuk Kak Bia yang sudah membagikan ide project ini, aku ucapkan
            terima kasih. Ini jadi peluang buat aku belajar lagi. Salam kenal ya, Kak, hehe.
          </p>

          <p className="about-signoff">— Fitri</p>
          <p className="about-footer">made with love by fitri</p>
        </div>
      </main>
    </div>
  );
}