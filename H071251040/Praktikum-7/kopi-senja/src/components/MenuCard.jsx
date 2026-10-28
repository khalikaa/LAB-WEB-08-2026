import { useState } from "react";

function MenuCard({ id, nama, kategori, harga, tersedia, deskripsi, gambar, onTambah }) {
  const [terbuka, setTerbuka] = useState(false);

  return (
    <article className="flex flex-col">
      <div className="relative flex h-44 items-end justify-center">

        <img
          src={gambar}
          alt={nama}
          className={`relative h-40 w-32 object-contain object-bottom drop-shadow-md ${
            tersedia ? "" : "opacity-50 grayscale"
          }`}
        />

        {!tersedia && (
          <span className="absolute left-6 top-4 rounded bg-stone-700 px-2 py-0.5 text-xs font-medium text-white">
            Habis
          </span>
        )}
      </div>

      <div className="h-3 w-full bg-rak shadow-rak" />

      <div className="px-6 pt-5">
        <h3 className="font-judul text-xl uppercase tracking-wide text-kopi-karamel">{nama}</h3>
        <p className="mt-0.5 text-sm font-medium text-kopi-tua">
          Rp {harga.toLocaleString("id-ID")}
        </p>

        {terbuka && (
          <div className="mt-2 text-sm leading-snug text-stone-600">
            <p className="text-xs text-stone-400">{kategori}</p>
            <p>{deskripsi}</p>
          </div>
        )}

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setTerbuka(!terbuka)}
            className="rounded border border-stone-300 bg-stone-100 px-3 py-1 text-xs text-stone-600 shadow-sm hover:bg-white"
          >
            {terbuka ? "Tutup" : "Read More"}
          </button>
          <button
            type="button"
            disabled={!tersedia}
            onClick={() => onTambah(id)}
            className="rounded bg-kopi-tua px-3 py-1 text-xs font-medium text-white shadow-sm hover:bg-kopi-sedang disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
          >
            {tersedia ? "Tambah" : "Habis"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default MenuCard;
