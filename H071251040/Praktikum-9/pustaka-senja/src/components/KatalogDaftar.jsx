"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";
import { daftarKategori } from "@/lib/kategori";

// Data buku dibaca dari PostgreSQL oleh Server Component (katalog/page.jsx),
// lalu dikirim ke sini lewat props. Komponen ini hanya mengurus filter di browser.
function KatalogDaftar({ daftarBuku }) {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [kataKunci, setKataKunci] = useState("");

  const kata = kataKunci.trim().toLowerCase();
  const bukuTampil = daftarBuku.filter((buku) => {
    const cocokKategori =
      kategoriAktif === "Semua" || buku.kategori === kategoriAktif;
    const cocokKata =
      buku.judul.toLowerCase().includes(kata) ||
      buku.penulis.toLowerCase().includes(kata);
    return cocokKategori && cocokKata;
  });

  return (
    <div>
      <input
        type="text"
        value={kataKunci}
        onChange={(e) => setKataKunci(e.target.value)}
        placeholder="Cari judul atau penulis"
        aria-label="Cari judul atau penulis"
        className="mb-4 w-full max-w-md border-2 border-black bg-kuning px-4 py-2 text-sm placeholder:text-black/60"
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            type="button"
            onClick={() => setKategoriAktif(kategori)}
            aria-pressed={kategoriAktif === kategori}
            className={`border-2 border-black px-3 py-1 text-xs font-bold ${
              kategoriAktif === kategori
                ? "bg-oranye"
                : "bg-transparent hover:bg-kuning"
            }`}
          >
            {kategori}
          </button>
        ))}
      </div>

      <p className="mb-4 text-xs text-black/70">
        Menampilkan {bukuTampil.length} dari {daftarBuku.length} buku
      </p>

      {bukuTampil.length === 0 ? (
        <p className="border-2 border-black p-4 text-sm">
          Tidak ada buku yang cocok. Coba kata kunci lain atau pilih kategori
          &quot;Semua&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {bukuTampil.map((buku) => (
            <BukuCard
              key={buku.id}
              id={buku.id}
              judul={buku.judul}
              penulis={buku.penulis}
              kategori={buku.kategori}
              tahun={buku.tahun}
              tersedia={buku.tersedia}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default KatalogDaftar;
