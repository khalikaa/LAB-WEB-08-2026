import pool from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";

export default async function DetailBukuPage({ params }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  if (isNaN(id)) notFound();

  const res = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
  const buku = res.rows[0];
  if (!buku) notFound();

  return (
    <div className="w-full min-h-screen bg-stone-950 text-amber-100 py-16 px-6 flex justify-center items-center relative overflow-hidden select-none">
      
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.25] contrast-[1.25] pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/60 to-amber-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full bg-stone-900/95 border-4 border-amber-500/60 rounded-[2.5rem] p-10 sm:p-14 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
        
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/katalog" 
            className="text-amber-300/80 hover:text-amber-400 text-base sm:text-xl font-bold transition-all hover:scale-105 flex items-center gap-2"
          >
            ← Kembali ke Katalog
          </Link>

          <span
            className={`text-base sm:text-xl font-sans font-black px-6 py-2 rounded-full border-2 ${
              buku.tersedia
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/60"
                : "bg-rose-500/20 text-rose-300 border-rose-500/60"
            }`}
          >
            {buku.tersedia ? "Tersedia" : "Dipinjam"}
          </span>
        </div>

        <div className="space-y-4 mb-10 border-b-2 border-amber-500/30 pb-8">
          <span className="text-sm sm:text-base font-mono font-bold uppercase tracking-widest text-amber-400 bg-stone-950 px-4 py-1.5 rounded-lg border border-amber-500/40 inline-block shadow-md">
            {buku.kategori}
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-black text-amber-100 tracking-tight leading-tight drop-shadow-md">
            {buku.judul}
          </h1>

          <p className="text-xl sm:text-3xl text-amber-200/90 font-serif font-bold">
            {buku.penulis} <span className="text-amber-400/60">•</span> {buku.tahun}
          </p>
        </div>

        <div className="space-y-4 mb-12">
          <h2 className="text-xl sm:text-2xl font-sans font-black text-amber-400 uppercase tracking-wide">
            Sinopsis
          </h2>
          <p className="text-base sm:text-2xl text-amber-100/90 font-sans leading-relaxed">
            {buku.sinopsis}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-4 border-t-2 border-amber-500/30">
          <Link
            href={`/katalog/${buku.id}/edit`}
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans font-black px-8 py-4 rounded-2xl text-base sm:text-xl uppercase tracking-wider shadow-[0_10px_25px_rgba(245,158,11,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            ✏️ Edit Buku
          </Link>

          <TombolHapus id={buku.id} />
        </div>

      </div>
    </div>
  );
}