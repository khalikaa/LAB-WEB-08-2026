import Link from "next/link";

// Tampil (dengan status HTTP 404) saat notFound() dipanggil dari halaman detail maupun edit.
export default function BukuTidakDitemukan() {
  return (
    <div className="mx-auto max-w-xl border border-ink/20 bg-card p-8 text-center shadow-[0_14px_22px_-14px_rgba(60,30,20,0.5)]">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-stamp">Kartu tidak ada di laci</p>
      <h1 className="mt-3 font-display text-3xl font-light text-dusk">Buku tidak ditemukan</h1>
      <p className="mt-3 text-ink-soft">
        Buku yang kamu cari tidak ada di koleksi Pustaka Senja. Mungkin id-nya salah atau bukunya
        sudah dihapus.
      </p>
      <Link
        href="/katalog"
        className="mt-6 inline-block border-b-4 border-gold bg-dusk px-5 py-2 font-mono text-xs uppercase tracking-[0.16em] text-paper hover:bg-dusk-soft"
      >
        Kembali ke Katalog
      </Link>
    </div>
  );
}
