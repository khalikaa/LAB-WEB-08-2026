import Link from "next/link";

export default function Hero({ namaRuang, slogan, lokasi }) {
  return (
    <section className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 px-6 shadow-lg mb-10">
      <h1 className="text-4xl font-bold mb-3 text-amber-400">
        Selamat Datang di {namaRuang}
      </h1>
      <p className="text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
        {slogan}
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/katalog"
          className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-5 py-2.5 rounded-lg transition">
          Jelajahi Katalog Buku
        </Link>
        <Link
          href="/usulan"
          className="border border-slate-700 hover:bg-slate-800 text-slate-200 font-medium px-5 py-2.5 rounded-lg transition">
          Usulkan Buku Baru
        </Link>
      </div>
    </section>
  );
}