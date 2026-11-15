"use client";

import { useState } from "react";
import Link from "next/link";
import TombolHapus from "@/components/tombolHapus";

export default function BukuCard({ id, judul, penulis, kategori, tahun, tersedia, sampul }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col justify-between transition hover:border-slate-700">
      <div>
        <img
          src={sampul ? `/images/${sampul}` : "/images/dummyImage.jpg"}
          alt={`Sampul buku ${judul}`}
          className="w-full h-48 object-cover"
        />
        <div className="p-5">
          <div className="flex justify-between items-start gap-2 mb-3">
            <span className="text-xs bg-slate-800 text-amber-400 px-2.5 py-1 rounded-full font-medium">
              {kategori}
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${tersedia ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}
            >
              {tersedia ? "Tersedia" : "Sedang Dipinjam"}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">{judul}</h3>
          <p className="text-sm text-slate-400 mb-1">Oleh: {penulis}</p>
          <p className="text-xs text-slate-500 mb-2">Tahun Terbit: {tahun}</p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setFavorit(!favorit)}
            className={`text-xs px-3 py-1.5 rounded-lg transition font-medium ${
              favorit ? "bg-rose-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
          >
            {favorit ? "❤️ Disimpan" : "🤍 Simpan"}
          </button>
          <Link href={`/katalog/${id}`} className="text-sm text-amber-400 hover:underline font-medium">
            Lihat Detail &rarr;
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/katalog/${id}/edit`}
            className="text-xs px-3 py-1.5 rounded-lg transition font-medium bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            Edit
          </Link>
          <TombolHapus id={id} judul={judul} />
        </div>
      </div>
    </div>
  );
}
