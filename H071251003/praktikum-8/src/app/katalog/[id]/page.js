import { dataBuku } from "@/data/dataBuku";
import Link from "next/link";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);

  if (!buku) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-rose-400 mb-4">
          Buku dengan ID &quot;{id}&quot; tidak ditemukan!
        </h1>
        <Link href="/katalog" className="text-amber-400 hover:underline">
          &larr; Kembali ke Katalog Buku
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row items-center">
      <img
        className="max-w-90 object-cover p-3 rounded-3xl"
        src={buku.cover}
        alt={buku.judul}
      />

      <div className="p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-medium">
            {buku.kategori} • ID #{buku.id}
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
        <p className="text-sm text-slate-500 mb-6">Tahun Terbit: {buku.tahun}</p>

        <div className="border-t border-slate-800 pt-6 mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Sinopsis Buku
          </h2>
          <p className="text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            {buku.sinopsis}
          </p>
        </div>

        <Link
          href="/katalog"
          className="inline-block bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium px-4 py-2.5 rounded-lg transition">
          &larr;  Kembali ke Katalog Buku
        </Link>
      </div>
    </article>
  );
}