"use client";

import { useState } from "react";

export default function FormUsulan({ actionServer }) {
  const [kategori, setKategori] = useState("Teknologi");
  const [kategoriLainnya, setKategoriLainnya] = useState("");

  return (
    <form action={actionServer} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-300 mb-1">Nama Pengusul</label>
        <input
          required
          type="text"
          name="namaPengusul"
          placeholder="Masukkan nama Anda"
          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-300 mb-1">Judul Buku yang Diusulkan</label>
        <input
          required
          type="text"
          name="judulBuku"
          placeholder="Masukkan judul buku"
          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-300 mb-1">Kategori Buku</label>
        <select
          name="kategori"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
        >
          <option value="Teknologi">Teknologi</option>
          <option value="Fiksi">Fiksi</option>
          <option value="Pengembangan Diri">Pengembangan Diri</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      {/* Input dinamis yang hanya muncul jika kategori "Lainnya" dipilih */}
      {kategori === "Lainnya" && (
        <div>
          <label className="block text-sm text-slate-300 mb-1">Sebutkan Kategori Lainnya</label>
          <input
            type="text"
            name="kategoriLainnya"
            value={kategoriLainnya}
            onChange={(e) => setKategoriLainnya(e.target.value)}
            placeholder="Contoh: Sejarah, Biografi, Filsafat..."
            className="w-full bg-slate-950 border border-amber-500/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
          />
        </div>
      )}

      <div>
        <label className="block text-sm text-slate-300 mb-1">Alasan Usulan</label>
        <textarea
          required
          name="alasan"
          rows={4}
          placeholder="Mengapa buku ini penting untuk dihadirkan di Pustaka Senja?"
          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-2.5 rounded-lg transition"
      >
        Kirim Usulan Buku
      </button>
    </form>
  );
}