import pool from "@/lib/db";
import { editBuku } from "@/app/actions";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function EditBukuPage({ params }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  if (isNaN(id)) notFound();

  const res = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
  const buku = res.rows[0];
  if (!buku) notFound();

  const tahunSekarang = new Date().getFullYear();

  const editBukuWithId = editBuku.bind(null, buku.id);
 
  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-stone-950 text-amber-100 py-8 px-4 flex justify-center items-center relative overflow-hidden select-none">
      
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.25] contrast-[1.25] pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/60 to-amber-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full bg-stone-900/90 border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        
        <div className="flex justify-between items-center mb-6 border-b border-amber-500/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">✏️</span>
            <h1 className="text-xl sm:text-2xl font-sans font-black text-amber-100">
              Edit Buku
            </h1>
          </div>
          <Link href={`/katalog/${buku.id}`} className="text-amber-300/80 hover:text-amber-400 text-xs sm:text-sm font-bold transition-all hover:scale-105">
            ← Batal
          </Link>
        </div>

        <form action={editBukuWithId} className="space-y-4">
          <div>
            <label className="block text-amber-200 text-xs sm:text-sm font-bold mb-1.5">Judul Buku</label>
            <input
              type="text"
              name="judul"
              required
              defaultValue={buku.judul}
              placeholder="Masukkan judul buku..."
              className="w-full bg-stone-950 border border-amber-500/30 rounded-xl px-4 py-2.5 text-amber-100 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-200 text-xs sm:text-sm font-bold mb-1.5">Penulis</label>
              <input
                type="text"
                name="penulis"
                required
                defaultValue={buku.penulis}
                placeholder="Nama penulis..."
                className="w-full bg-stone-950 border border-amber-500/30 rounded-xl px-4 py-2.5 text-amber-100 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-amber-200 text-xs sm:text-sm font-bold mb-1.5">Kategori</label>
              <select
                name="kategori"
                required
                defaultValue={buku.kategori}
                className="w-full bg-stone-950 border border-amber-500/30 rounded-xl px-4 py-2.5 text-amber-100 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all cursor-pointer"
              >
                <option value="Teknologi">Teknologi</option>
                <option value="Fiksi">Fiksi</option>
                <option value="Pengembangan Diri">Pengembangan Diri</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-200 text-xs sm:text-sm font-bold mb-1.5">Tahun Terbit</label>
              <input
                type="number"
                name="tahun"
                required
                min="1000"
                max={tahunSekarang}
                defaultValue={buku.tahun}
                className="w-full bg-stone-950 border border-amber-500/30 rounded-xl px-4 py-2.5 text-amber-100 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-amber-200 text-xs sm:text-sm font-bold mb-1.5">Status Ketersediaan</label>
              <select
                name="tersedia"
                defaultValue={buku.tersedia ? "true" : "false"}
                className="w-full bg-stone-950 border border-amber-500/30 rounded-xl px-4 py-2.5 text-amber-100 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all cursor-pointer"
              >
                <option value="true">Tersedia</option>
                <option value="false">Sedang Dipinjam</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-amber-200 text-xs sm:text-sm font-bold mb-1.5">Sinopsis</label>
            <textarea
              name="sinopsis"
              rows={4}
              required
              defaultValue={buku.sinopsis}
              placeholder="Tulis ringkasan atau sinopsis buku..."
              className="w-full bg-stone-950 border border-amber-500/30 rounded-xl px-4 py-2.5 text-amber-100 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black py-3 rounded-xl uppercase tracking-wider text-sm transition-all shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:scale-[1.01] active:scale-95 cursor-pointer mt-2"
          >
            Simpan Perubahan
          </button>
        </form>

      </div>
    </div>
  );
}