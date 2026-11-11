import Link from "next/link";

export default function Hero({ ruangBaca, slogan, lokasiJam }) {
  return (
    <div className="relative z-10 text-center max-w-5xl mx-auto space-y-6 px-4">
      <div>
        <span className="px-6 py-2.5 rounded-full bg-stone-900/95 border-2 border-amber-500/70 text-amber-300 text-sm md:text-lg font-mono uppercase tracking-widest shadow-2xl backdrop-blur-md">
          ✨ {ruangBaca}
        </span>
      </div>

      <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-black text-amber-100 tracking-wide leading-tight drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
        Ruang Sunyi untuk <br className="hidden sm:inline" />
        <span className="text-amber-400">Gagasan Besar</span>
      </h1>

      <p className="text-amber-200/95 text-xl sm:text-2xl md:text-3xl font-serif italic max-w-3xl mx-auto leading-relaxed font-light drop-shadow-xl">
        "{slogan}"
      </p>

      <p className="text-amber-400/90 font-mono text-xs sm:text-sm tracking-wider uppercase">
        📍 {lokasiJam}
      </p>

      <div className="pt-2 flex flex-wrap justify-center gap-6">
        <Link
          href="/katalog"
          className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-serif font-black px-10 py-4.5 rounded-2xl shadow-[0_15px_40px_rgba(245,158,11,0.5)] transition-all text-lg md:text-xl tracking-wider uppercase transform hover:scale-105 border-2 border-amber-200"
        >
          📖 Lihat Katalog Buku
        </Link>

        <Link
          href="/usulan"
          className="bg-stone-900 hover:bg-stone-800 text-amber-200 border-2 border-amber-600/70 font-serif font-black px-10 py-4.5 rounded-2xl shadow-2xl transition-all text-lg md:text-xl tracking-wider uppercase transform hover:scale-105"
        >
          ✍️ Usulkan Buku Baru
        </Link>
      </div>
    </div>
  );
}