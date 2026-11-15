import Link from "next/link";

export default function BukuCard({ buku, isSelected }) {
  if (!buku) return null;

  const getGambarSampul = (judul, gambarDb) => {
    if (gambarDb && gambarDb.startsWith("http")) return gambarDb;

    const j = judul.toLowerCase();
    if (j.includes("clean code")) {
      return "https://i.pinimg.com/736x/91/8a/e9/918ae94c56a67ba3e617a8306c8be2cc.jpg";
    }
    if (j.includes("designing data") || j.includes("data-intensive")) {
      return "https://i.pinimg.com/1200x/bd/93/8a/bd938afc278af32c84f778cae28ce414.jpg";
    }
    if (j.includes("refactoring")) {
      return "https://i.pinimg.com/236x/a5/11/1e/a5111ea88418c0d001d3d787bbad38c7.jpg";
    }
    if (j.includes("laut bercerita")) {
      return "https://i.pinimg.com/736x/9a/bb/61/9abb61fcf68afd124375a82dfd02ca6a.jpg";
    }
    if (j.includes("bumi manusia")) {
      return "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1565658920i/1398034.jpg";
    }
    if (j.includes("cantik itu luka")) {
      return "https://i.pinimg.com/736x/88/09/3a/88093ad3cb15e79d8f65838db7d35b11.jpg";
    }
    if (j.includes("atomic habits")) {
      return "https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg";
    }
    if (j.includes("deep work")) {
      return "https://i.pinimg.com/736x/5c/c2/a1/5cc2a1bec0e1e6bf96f9be3367b86665.jpg";
    }
    if (j.includes("filosofi teras")) {
      return "https://i.pinimg.com/1200x/6b/3a/01/6b3a010fb037d130bd5e13df3c1ba18b.jpg";
    }

    return "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop";
  };

  const gambarSampul = getGambarSampul(buku.judul, buku.gambar || buku.sampul);

  return (
    <Link
      href={`/katalog/${buku.id}`}
      className={`cursor-pointer transition-all duration-300 ease-out shrink-0 relative select-none flex flex-col items-center justify-end ${
        isSelected ? "scale-105 z-30" : "hover:-translate-y-6 hover:scale-105 z-10"
      }`}
    >

      <div className="w- sm:w-64 md:w-80 h-72 sm:h-96 md:h-120 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.95)] border-3 border-amber-500/60 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden group">
        
        <div className="absolute inset-0 z-0 bg-stone-900">
          <img
            src={gambarSampul}
            alt={buku.judul}
            className="w-full h-full object-cover filter brightness-[0.85] group-hover:brightness-105 group-hover:scale-110 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/40 to-transparent" />
        </div>

        <div className="relative z-10 space-y-2">
          <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-amber-300 bg-stone-950/90 backdrop-blur-md px-3 py-1 rounded-md border border-amber-500/40 inline-block shadow-lg">
            {buku.kategori}
          </span>
          <h3 className="text-base sm:text-xl md:text-2xl font-sans font-black text-amber-100 line-clamp-2 mt-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]">
            {buku.judul}
          </h3>
          <p className="text-xs sm:text-sm text-amber-200/90 font-semibold drop-shadow">
            {buku.penulis} ({buku.tahun})
          </p>
        </div>

        <div className="relative z-10 flex justify-between items-center border-t border-amber-500/40 pt-3 bg-stone-950/90 backdrop-blur-md -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-4 sm:p-5">
          <span
            className={`text-xs sm:text-sm font-sans font-black px-3 py-1 rounded-full ${
              buku.tersedia
                ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/60"
                : "bg-rose-500/30 text-rose-300 border border-rose-500/60"
            }`}
          >
            {buku.tersedia ? "Tersedia" : "Dipinjam"}
          </span>
          <span className="text-xs sm:text-sm text-amber-400 font-black tracking-wide underline">
            Detail →
          </span>
        </div>
      </div>
    </Link>
  );
}