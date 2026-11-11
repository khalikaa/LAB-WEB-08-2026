import pool from "@/lib/db";
import Link from "next/link";
import BukuCard from "@/components/bukuCard";

export const dynamic = "force-dynamic";

export default async function KatalogPage({ searchParams }) {
  const { q } = await searchParams;
  const kata = (typeof q === "string" ? q : "").trim();
  const pola = kata.replace(/[\\%_]/g, "\\$&");

  const { rows } = await pool.query(
    `SELECT b.id_buku, b.judul, b.penulis, k.nama_kategori, b.tahun_rilis, b.tersedia, b.gambar
     FROM buku b
     JOIN kategori k ON b.id_kategori = k.id_kategori
     WHERE b.judul ILIKE '%' || $1 || '%'
     ORDER BY b.id_buku ASC;`,
    [pola]
  );

  return (
    <section className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Katalog Koleksi Buku</h1>
        <p className="text-slate-400">Telusuri dan saring buku berdasarkan judul yang Anda cari.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4 mb-1">
        <form action="/katalog" method="get" className="flex-1 flex items-end gap-2">
          <div className="flex-1">
            <label htmlFor="q" className="block text-sm text-slate-300 mb-2">Cari Judul Buku Disini</label>
            <input
              id="q"
              type="text"
              name="q"
              placeholder="Masukkan judul buku..."
              defaultValue={kata}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-4 py-2 rounded-lg transition h-10"
          >
            Cari
          </button>
        </form>

        <Link
          href="/katalog/tambah"
          className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-5 py-2 rounded-lg transition text-center flex items-center justify-center gap-2 h-10 shadow-lg"
        >
          + Tambah Buku
        </Link>
      </div>
          <span className="ml-1 opacity-40">
            Menampilkan {rows.length} buku
          </span>

      {rows.length === 0 ? (
        <p className="text-slate-400 text-center py-12">
          {kata ? `Tidak ada buku dengan judul "${kata}".` : "Belum ada buku di koleksi."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {rows.map((buku) => (
            <BukuCard
              key={buku.id_buku}
              id={buku.id_buku}
              judul={buku.judul}
              penulis={buku.penulis}
              kategori={buku.nama_kategori}
              tahun={buku.tahun_rilis}
              tersedia={buku.tersedia}
              sampul={buku.gambar}
            />
          ))}
        </div>
      )}
    </section>
  );
}
