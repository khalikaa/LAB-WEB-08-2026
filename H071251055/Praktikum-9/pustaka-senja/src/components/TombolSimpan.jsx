"use client";

import { useState } from "react";

// Penanda favorit (fitur Praktikum 8). Hanya state tampilan di browser, tidak disimpan ke database.
export default function TombolSimpan() {
  const [favorit, setFavorit] = useState(false);

  return (
    <>
      {/* pita penanda; posisinya relatif terhadap kartu buku (induk yang `relative`) */}
      {favorit && (
        <span
          aria-hidden="true"
          className="absolute right-5 top-0 h-10 w-5 bg-stamp [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]"
        />
      )}
      <button
        type="button"
        onClick={() => setFavorit(!favorit)}
        aria-pressed={favorit}
        className={
          "border-2 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors " +
          (favorit
            ? "border-stamp bg-stamp text-card"
            : "border-ink/60 text-ink hover:bg-paper-deep")
        }
      >
        {favorit ? "Tersimpan" : "Simpan"}
      </button>
    </>
  );
}
