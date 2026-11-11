"use client";

import { hapusBuku } from "@/app/katalog/actions";

const gayaUkuran = {
  kecil: "w-full px-3 py-2 text-sm shadow-[4px_4px_0_#000]",
  besar: "w-full px-6 py-3 font-bold shadow-[5px_5px_0_#000]",
};

export default function TombolHapus({ id, judul, kembali = "/katalog", ukuran = "besar" }) {
  const handleSubmit = (e) => {
    const setuju = window.confirm(
      `Hapus buku "${judul}"? Tindakan ini tidak dapat dibatalkan.`
    );
    if (!setuju) e.preventDefault();
  };

  return (
    <form action={hapusBuku} onSubmit={handleSubmit} className="w-full m-0">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="kembali" value={kembali} />
      <button
        type="submit"
        className={`border-2 border-black bg-red-400 text-center font-bold transition active:translate-x-1 active:translate-y-1 active:shadow-none ${gayaUkuran[ukuran]}`}
      >
        Hapus
      </button>
    </form>
  );
}