import pool from "@/lib/db";
import BukuCard from "@/components/BukuCard";
import Link from "next/link";

export default async function KatalogPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const selectedCategory = resolvedParams?.kategori || "Semua";

  let query = "SELECT * FROM buku ORDER BY id ASC";
  let values = [];

  if (selectedCategory !== "Semua") {
    query = "SELECT * FROM buku WHERE kategori = $1 ORDER BY id ASC";
    values = [selectedCategory];
  }

  const res = await pool.query(query, values);
  const filteredBuku = res.rows;

  const categories = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];
  const jumlahDipinjam = filteredBuku.filter((b) => !b.tersedia).length;

  return (
    <div className="w-full min-h-screen flex flex-col justify-between overflow-x-hidden relative select-none bg-stone-950 text-amber-100">
      
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.35] contrast-[1.25] scale-105 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/40 to-amber-950/20 pointer-events-none" />

      <div className="relative z-20 text-center shrink-0 pt-24 md:pt-32 px-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-sans font-black text-amber-100 tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)] leading-tight">
          Katalog Pustaka Senja
        </h1>
        <p className="text-amber-200 text-sm sm:text-lg md:text-xl mt-3 font-sans font-semibold max-w-3xl mx-auto drop-shadow-lg">
          Pilih kategori dan sentuh buku pada rak untuk melihat ketersediaan serta sinopsis lengkap.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-5">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "Semua" ? "/katalog" : `/katalog?kategori=${encodeURIComponent(cat)}`}
              className={`px-5 py-2 rounded-full text-sm sm:text-base font-sans font-black tracking-wide transition-all ${
                selectedCategory === cat
                  ? "bg-amber-400 text-stone-950 shadow-xl scale-105 border-2 border-amber-200 ring-4 ring-amber-400/40"
                  : "bg-stone-900/90 text-amber-200 hover:bg-stone-800 border-2 border-amber-800/60"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* RAK BUKU 3D */}
      <div className="relative z-20 w-full flex-1 flex flex-col justify-end items-center px-0 pt-4 pb-0 overflow-hidden">
        
        {/* CONTAINER BUKU */}
        <div 
          className="w-full flex items-end justify-start gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-6 pt-10 px-8 sm:px-16 scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {filteredBuku.map((buku, index) => (
            <div key={buku.id} className="shrink-0">
              <BukuCard
                buku={buku}
                isSelected={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="w-full max-w-full h-12 sm:h-36 bg-linear-to-b from-amber-900 via-amber-950 to-stone-950 rounded-t-2xl border-t-4 border-amber-500 shadow-2xl flex items-start justify-between px-6 sm:px-14 shrink-0 z-30">
          <span className="text-sm sm:text-xl text-amber-200 font-sans font-bold">
             Menampilkan {filteredBuku.length} karya ({jumlahDipinjam > 0 ? `${jumlahDipinjam} sedang dipinjam` : "semua tersedia"})
          </span>
          <span className="text-[10px] sm:text-base text-amber-400 font-mono font-bold uppercase tracking-widest">
            PUSTAKA SENJA 3D SHELF
          </span>
        </div>
      </div>

    </div>
  );
}