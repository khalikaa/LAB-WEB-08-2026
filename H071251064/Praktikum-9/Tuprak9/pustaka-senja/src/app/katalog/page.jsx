import Link from "next/link";
import BukuCard from "@/components/BukuCard";
import pool from "@/lib/db";
import { DAFTAR_KATEGORI, ambilPesanError } from "@/lib/validasi";

export const dynamic = "force-dynamic";

const daftarKategori = ["Semua", ...DAFTAR_KATEGORI];

const alamatKategori = (kategori) =>
  kategori === "Semua"
    ? "/katalog"
    : `/katalog?kategori=${encodeURIComponent(kategori)}`;

export default async function Katalog({ searchParams }) {
  const { kategori, pesan, error } = await searchParams;
  const kategoriAktif = daftarKategori.includes(kategori) ? kategori : "Semua";
  const pesanError = ambilPesanError(error);

  const hasil =
    kategoriAktif === "Semua"
      ? await pool.query(
          `SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis, gambar
           FROM buku
           ORDER BY id ASC`
        )
      : await pool.query(
          `SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis, gambar
           FROM buku
           WHERE kategori = $1
           ORDER BY id ASC`,
          [kategoriAktif]
        );
  const daftarBuku = hasil.rows;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="inline-block border-2 border-black bg-pink-300 px-4 py-1 font-display text-4xl font-extrabold shadow-[6px_6px_0_#000]">
          Katalog Buku
        </h1>
        <Link
          href="/katalog/tambahbuku"
          className="border-2 border-black bg-lime-300 px-6 py-3 font-bold shadow-[5px_5px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          + Tambah Buku
        </Link>
      </div>
      <p className="mt-5 font-medium">
        Pilih kategori untuk menyaring koleksi. Kamu juga bisa menambah, mengubah, dan menghapus buku.
      </p>

      {pesan === "ditambah" && (
        <p role="status" className="mt-5 border-2 border-black bg-lime-300 px-4 py-3 text-sm font-bold">
          Buku berhasil ditambahkan ke katalog.
        </p>
      )}
      {pesanError && (
        <p role="alert" className="mt-5 border-2 border-black bg-red-400 px-4 py-3 text-sm font-bold">
          {pesanError}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3" role="group" aria-label="Filter kategori">
        {daftarKategori.map((item) => (
          <Link
            key={item}
            href={alamatKategori(item)}
            aria-current={kategoriAktif === item ? "true" : undefined}
            className={`border-2 border-black px-4 py-2 text-sm font-bold transition active:translate-x-1 active:translate-y-1 active:shadow-none ${
              kategoriAktif === item
                ? "bg-black text-yellow-300 shadow-[4px_4px_0_#ec4899]"
                : "bg-white shadow-[4px_4px_0_#000] hover:bg-yellow-200"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>

      <p className="mt-6 text-sm font-medium text-black/60">
        Menampilkan {daftarBuku.length} buku
      </p>

      {daftarBuku.length === 0 ? (
        <p className="mt-4 border-2 border-black bg-white p-6 font-bold shadow-[6px_6px_0_#000]">
          Belum ada buku pada kategori ini.
        </p>
      ) : (
        <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {daftarBuku.map((buku) => (
            <BukuCard key={buku.id} buku={buku} />
          ))}
        </div>
      )}
    </div>
  );
}