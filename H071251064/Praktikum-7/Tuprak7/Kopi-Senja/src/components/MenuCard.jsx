import { useState } from "react";

const gayaNama = {
  Kopi: "text-emas",
  "Non-Kopi": "text-mint",
  Makanan: "text-rona",
};

const warnaGaris = {
  Kopi: "bg-emas",
  "Non-Kopi": "bg-mint",
  Makanan: "bg-rona",
};

function MenuCard({ menu, jumlahDipesan, onTambah }) {
  const [terbuka, setTerbuka] = useState(false);
  const { id, nama, kategori, harga, tersedia, deskripsi } = menu;

  return (
    <li className="[perspective:1000px]">
      <article
        className={`group relative rounded-2xl border border-kertas/10 bg-senja p-5 shadow-tebal transition-transform duration-300 [transform-style:preserve-3d] hover:[transform:rotateX(4deg)_rotateY(-5deg)] ${
          tersedia ? "" : "opacity-60 saturate-50"
        }`}
      >
        <div className="flex items-center justify-between gap-3 [transform-style:preserve-3d]">
          <span className="rounded-full bg-tinta/70 px-3 py-1 text-sm text-kertas/75 shadow-lekuk">
            {kategori}
          </span>
          <span className="rounded-full bg-tinta/70 px-3 py-1 font-bold text-emas shadow-lekuk transition-transform duration-300 group-hover:[transform:translateZ(24px)]">
            Rp {harga.toLocaleString("id-ID")}
          </span>
        </div>

        <h3
          className={`mt-6 font-judul text-4xl leading-tight transition-transform duration-300 group-hover:[transform:translateZ(36px)] ${gayaNama[kategori]}`}
        >
          {nama}
        </h3>
        <span className={`mt-4 block h-1.5 w-20 rounded-full ${warnaGaris[kategori]}`} aria-hidden="true" />

        {!tersedia && (
          <span className="absolute right-5 top-16 -rotate-6 rounded border-2 border-rona bg-senja px-2 py-0.5 font-bold text-rona">
            Habis
          </span>
        )}

        {terbuka && <p className="mt-4 text-kertas/80">{deskripsi}</p>}

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onTambah(id)}
            disabled={!tersedia}
            className="rounded-full bg-rona px-5 py-1.5 text-sm font-bold text-white shadow-tombol-rona transition-all duration-100 active:translate-y-[3px] active:shadow-none disabled:cursor-not-allowed disabled:bg-kertas/20 disabled:text-kertas/60 disabled:shadow-none"
          >
            {tersedia ? "Tambah" : "Habis"}
          </button>
          <button
            onClick={() => setTerbuka(!terbuka)}
            aria-expanded={terbuka}
            className="text-sm text-kertas/70 underline underline-offset-4 hover:text-kertas"
          >
            {terbuka ? "Tutup detail" : "Lihat detail"}
          </button>
          {jumlahDipesan > 0 && (
            <span className="ml-auto text-sm font-bold text-emas">{jumlahDipesan} dipesan</span>
          )}
        </div>
      </article>
    </li>
  );
}

export default MenuCard;