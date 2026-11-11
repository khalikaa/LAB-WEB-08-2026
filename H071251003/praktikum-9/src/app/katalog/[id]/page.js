import pool from "@/lib/db";
import { parseId } from "@/lib/utils";
import Link from "next/link";
import BukuTidakDitemukan from "@/components/bukuTidakDitemukan";

export const dynamic = "force-dynamic";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const idBuku = parseId(id);

  // ID non-angka (mis. /katalog/abc) tidak dikirim ke database
  if (idBuku === null) return <BukuTidakDitemukan id={id} />;

  // Parameterized query ($1) untuk mengambil 1 buku
  const { rows } = await pool.query(
    `SELECT b.id_buku, b.judul, b.penulis, k.nama_kategori, b.tahun_rilis, b.tersedia, b.sinopsis, b.gambar
     FROM buku b
     JOIN kategori k ON b.id_kategori = k.id_kategori
     WHERE b.id_buku = $1;`,
    [idBuku]
  );

  const buku = rows[0];
  if (!buku) return <BukuTidakDitemukan id={id} />;

  return (
    <article className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row items-center">
      <img
        src={buku.gambar ? `/images/${buku.gambar}` : "/images/dummyImage.jpg"}
        alt={buku.judul}
        className="max-w-90 object-cover p-3 rounded-3xl"
      />
      <div className="p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-medium">
            {buku.nama_kategori} • ID #{buku.id_buku}
          </span>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              buku.tersedia
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            }`}
          >
            {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">{buku.judul}</h1>
        <p className="text-slate-300 font-medium mb-1">Penulis: {buku.penulis}</p>
        <p className="text-sm text-slate-500 mb-6">Tahun Terbit: {buku.tahun_rilis}</p>

        <div className="border-t border-slate-800 pt-6 mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Sinopsis Buku</h2>
          <p className="text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            {buku.sinopsis}
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/katalog"
            className="inline-block bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium px-4 py-2.5 rounded-lg transition"
          >
            &larr; Kembali ke Katalog Buku
          </Link>
          <Link
            href={`/katalog/${buku.id_buku}/edit`}
            className="inline-block bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition"
          >
            Edit Buku
          </Link>
        </div>
      </div>
    </article>
  );
}
