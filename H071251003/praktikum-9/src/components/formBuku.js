"use client";

import { useActionState } from "react";
import Link from "next/link";

const inputClass =
  "w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500";

// action      : server action berbentuk (prevState, formData)
// daftarKategori : [{ id_kategori, nama_kategori }]
// nilaiAwal   : nilai awal form (untuk halaman edit)
export default function FormBuku({ action, daftarKategori, nilaiAwal = {}, labelTombol, hrefBatal }) {
  const [state, formAction, pending] = useActionState(action, { error: null, nilai: null });

  // Jika validasi server gagal, isi ulang form dengan input terakhir pengguna
  const v = {
    judul: "",
    penulis: "",
    id_kategori: "",
    tahun: "",
    tersedia: "true",
    sinopsis: "",
    gambar: "",
    ...nilaiAwal,
    ...(state.nilai ?? {}),
  };

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm rounded-lg px-4 py-3">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="judul" className="block text-sm text-slate-300 mb-1">Judul Buku</label>
        <input id="judul" required type="text" name="judul" maxLength={200} defaultValue={v.judul} className={inputClass} />
      </div>

      <div>
        <label htmlFor="penulis" className="block text-sm text-slate-300 mb-1">Penulis</label>
        <input id="penulis" required type="text" name="penulis" maxLength={100} defaultValue={v.penulis} className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="id_kategori" className="block text-sm text-slate-300 mb-1">Kategori</label>
          <select id="id_kategori" required name="id_kategori" defaultValue={v.id_kategori} className={inputClass}>
            <option value="" disabled>Pilih kategori</option>
            {daftarKategori.map((k) => (
              <option key={k.id_kategori} value={String(k.id_kategori)}>
                {k.nama_kategori}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tahun" className="block text-sm text-slate-300 mb-1">Tahun Terbit</label>
          <input id="tahun" required type="number" name="tahun" min={1000} step={1} defaultValue={v.tahun} className={inputClass} />
        </div>

        <div>
          <label htmlFor="tersedia" className="block text-sm text-slate-300 mb-1">Status</label>
          <select id="tersedia" name="tersedia" defaultValue={v.tersedia} className={inputClass}>
            <option value="true">Tersedia</option>
            <option value="false">Sedang Dipinjam</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="gambar" className="block text-sm text-slate-300 mb-1">
          Nama File Sampul <span className="text-slate-500">(opsional, file di public/images)</span>
        </label>
        <input id="gambar" type="text" name="gambar" placeholder="contoh: laskar-pelangi.jpg" defaultValue={v.gambar} className={inputClass} />
      </div>

      <div>
        <label htmlFor="sinopsis" className="block text-sm text-slate-300 mb-1">Sinopsis</label>
        <textarea id="sinopsis" required name="sinopsis" rows={5} maxLength={2000} defaultValue={v.sinopsis} className={inputClass} />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-lg transition"
        >
          {pending ? "Menyimpan..." : labelTombol}
        </button>
        <Link
          href={hrefBatal}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-5 py-2.5 rounded-lg transition"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
