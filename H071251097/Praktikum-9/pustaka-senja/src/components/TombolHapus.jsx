"use client";

import { hapusBuku } from "@/app/actions";

export default function TombolHapus({ id }) {
  const handleHapus = async () => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus buku ini?");
    if (konfirmasi) {
      await hapusBuku(id);
    }
  };

  return (
    <button
      onClick={handleHapus}
      className="bg-rose-600 hover:bg-rose-500 text-white font-black px-6 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
    >
      🗑️ Hapus Buku
    </button>
  );
}