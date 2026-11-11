"use client";

import { hapusBuku } from "@/actions/buku_action";

export default function TombolHapus({ id, judul }) {
  return (
    <form
      action={hapusBuku.bind(null, id)}
      onSubmit={(e) => {
        // Batal -> hentikan submit, data tetap tersimpan
        if (!window.confirm(`Hapus buku "${judul}"? Tindakan ini tidak dapat dibatalkan.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-xs px-3 py-1.5 rounded-lg transition font-medium bg-rose-600/10 text-rose-400 border border-rose-500/20 hover:bg-rose-600 hover:text-white"
      >
        Hapus
      </button>
    </form>
  );
}
