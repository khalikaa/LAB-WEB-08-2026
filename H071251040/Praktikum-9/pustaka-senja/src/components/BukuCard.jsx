"use client";

import { useState } from "react";
import Link from "next/link";
import SampulBuku from "@/components/SampulBuku";
import TombolHapus from "@/components/TombolHapus";

function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="flex flex-col">
      <SampulBuku id={id} judul={judul} penulis={penulis} kategori={kategori} />

      <div className="mt-3 flex flex-1 flex-col gap-1">
        <h3 className="text-sm font-bold leading-snug">{judul}</h3>
        <p className="text-xs text-black/70">{penulis}</p>
        <p className="text-xs text-black/70">
          {kategori} &bull; {tahun}
        </p>
        <span
          className={`mt-1 self-start border border-black px-2 py-0.5 text-[11px] font-bold ${
            tersedia ? "bg-emerald-300" : "bg-red-300"
          }`}
        >
          {tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setFavorit(!favorit)}
          aria-pressed={favorit}
          className={`flex items-center gap-1.5 border-2 border-black px-2.5 py-1 text-xs font-bold ${
            favorit ? "bg-oranye" : "bg-transparent hover:bg-kuning"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill={favorit ? "#000" : "none"}
            stroke="#000"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 3h12v18l-6-4-6 4z" />
          </svg>
          {favorit ? "Favorit" : "Simpan"}
        </button>
        <Link href={`/katalog/${id}`} className="text-xs font-bold underline">
          Lihat Detail
        </Link>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <Link
          href={`/katalog/${id}/edit`}
          className="border-2 border-black px-2.5 py-1 text-xs font-bold hover:bg-kuning"
        >
          Edit
        </Link>
        <TombolHapus id={id} judul={judul} />
      </div>
    </article>
  );
}

export default BukuCard;
