"use client";

import { hapusBuku } from "@/app/katalog/actions";

function TombolHapus({ id, judul }) {
  function handleSubmit(e) {
    const setuju = window.confirm(
      `Hapus buku "${judul}"? Tindakan ini tidak dapat dibatalkan.`
    );
    // Jika dibatalkan, Server Action tidak dijalankan dan data tetap tersimpan.
    if (!setuju) e.preventDefault();
  }

  return (
    <form action={hapusBuku.bind(null, id)} onSubmit={handleSubmit}>
      <button
        type="submit"
        className="border-2 border-black bg-red-300 px-2.5 py-1 text-xs font-bold hover:bg-red-400"
      >
        Hapus
      </button>
    </form>
  );
}

export default TombolHapus;
