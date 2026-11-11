"use client";

import { useState } from "react";
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";

export default function BukuCard({ buku }) {
  const { id, judul, penulis, kategori, tahun, tersedia, gambar } = buku;
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="perspective-[1000px]">
      <div className="flex h-full flex-col border-2 border-black bg-white p-5 shadow-[7px_7px_0_#000] transition-transform duration-300 hover:rotate-x-3 hover:-rotate-y-6 hover:-translate-y-1.5">
        <div className="mx-auto mb-5 w-40 perspective-[700px]">
          <div
            role="img"
            aria-label={`Sampul buku ${judul}`}
            className="relative aspect-2/3 w-full overflow-hidden border-2 border-black bg-pink-300 shadow-[8px_8px_0_#000] -rotate-y-14"
          >
            <div className="absolute inset-0 flex items-center justify-center p-3 text-center font-display text-base font-extrabold">
              {judul}
            </div>
            {gambar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={gambar}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-3 border-r-2 border-black bg-linear-to-r from-black/40 to-white/20" />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="border-2 border-black bg-sky-200 px-2 py-0.5 text-xs font-bold">
              {kategori}
            </span>
            <span
              className={`border-2 border-black px-2 py-0.5 text-xs font-bold ${
                tersedia ? "bg-lime-300" : "bg-red-400"
              }`}
            >
              {tersedia ? "Tersedia" : "Sedang Dipinjam"}
            </span>
          </div>

          <h3 className="font-display text-xl font-extrabold leading-tight">
            {judul}
          </h3>
          <p className="text-sm font-medium">{penulis}</p>
          <p className="mb-4 text-sm text-black/60">Terbit {tahun}</p>

          <div className="mt-auto">
            <div className="flex flex-col gap-3">

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFavorit(!favorit)}
                  aria-pressed={favorit}
                  className={`w-full border-2 border-black px-3 py-2 text-center text-sm font-bold shadow-[4px_4px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none ${
                    favorit ? "bg-pink-400" : "bg-white hover:bg-yellow-200"
                  }`}
                >
                  {favorit ? "Tersimpan" : "Simpan"}
                </button>
                <Link
                  href={`/katalog/${id}`}
                  className="w-full border-2 border-black bg-yellow-300 px-3 py-2 text-center text-sm font-bold shadow-[4px_4px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  Lihat Detail
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={`/katalog/${id}/edit`}
                  className="w-full border-2 border-black bg-yellow-300 px-3 py-2 text-center text-sm font-bold shadow-[4px_4px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  Edit
                </Link>
                <TombolHapus id={buku.id} judul={buku.judul} kembali="/katalog" ukuran="kecil" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}