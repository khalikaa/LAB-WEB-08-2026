import Hero from "@/components/Hero";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { rows } = await pool.query(
    `SELECT
       COUNT(*)::int AS total,
       COUNT(*) FILTER (WHERE tersedia IS TRUE)::int AS tersedia,
       COUNT(*) FILTER (WHERE tersedia IS NOT TRUE)::int AS dipinjam
     FROM buku;`
  );

  const { total: totalBuku, tersedia: bukuTersedia, dipinjam: bukuDipinjam } = rows[0];

  return (
    <div>
      <Hero
        namaRuang="Pustaka Senja"
        slogan="Ruang baca dan perpustakaan komunitas ramah literasi. Temukan koleksi buku pilihanmu."
      />

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-slate-200">Statistik Koleksi Pustaka</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
            <p className="text-3xl font-bold text-amber-400">{totalBuku}</p>
            <p className="text-sm text-slate-400 mt-1">Total Koleksi Buku</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
            <p className="text-3xl font-bold text-emerald-400">{bukuTersedia}</p>
            <p className="text-sm text-slate-400 mt-1">Buku Tersedia</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
            <p className="text-3xl font-bold text-rose-400">{bukuDipinjam}</p>
            <p className="text-sm text-slate-400 mt-1">Buku Dipinjam</p>
          </div>
        </div>
      </section>
    </div>
  );
}
