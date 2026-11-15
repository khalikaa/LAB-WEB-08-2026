"use client";

import { useState } from "react";
import { dataBuku } from "@/data/dataBuku";
import BukuCard from "@/components/bukuCard";

const kategoriList = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default function KatalogPage() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const bukuFiltered =
    kategoriAktif === "Semua" ? dataBuku : dataBuku.filter((b) => b
    .kategori === kategoriAktif);

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Katalog Koleksi Buku</h1>
        <p className="text-slate-400">
          Telusuri dan saring buku berdasarkan kategori minat Anda.
        </p>
      </div>

      <div className="flex flex-col mb-8">
        <div className="flex flex-row flex-wrap gap-2 ">
          {kategoriList.map((kat) => (
            <button
              key={kat}
              onClick={() => setKategoriAktif(kat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${kategoriAktif === kat ? "bg-amber-600 text-white" : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
        <span>
          Menampilkan {bukuFiltered.length} dari {dataBuku.length} buku
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bukuFiltered.map((buku) => (
        <BukuCard
            key={buku.id}
            id={buku.id}
            judul={buku.judul}
            penulis={buku.penulis}
            kategori={buku.kategori}
            tahun={buku.tahun}
            tersedia={buku.tersedia}
            cover={buku.cover}
        />
        ))}
    </div>
    </section>
  );
}