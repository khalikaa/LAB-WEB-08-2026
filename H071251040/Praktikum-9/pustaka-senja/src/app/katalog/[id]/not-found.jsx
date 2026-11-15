import Link from "next/link";

// Dipakai oleh halaman detail dan edit saat ID tidak valid / buku tidak ditemukan.
export default function BukuTidakDitemukan() {
  return (
    <div className="border-2 border-black p-8 text-center">
      <h1 className="mb-4 text-xl font-bold">Buku tidak ditemukan.</h1>
      <p className="mb-6 text-sm text-black/70">
        Alamat yang kamu buka tidak cocok dengan buku mana pun di koleksi kami.
      </p>
      <Link
        href="/katalog"
        className="inline-block border-2 border-black bg-oranye px-5 py-2.5 text-sm font-bold hover:bg-kuning"
      >
        &larr; Kembali ke Katalog
      </Link>
    </div>
  );
}
