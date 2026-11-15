"use client";

import { useState } from "react";
import { kategoriBuku as pilihanKategori } from "@/lib/kategori";

const gayaInput =
  "w-full border-2 border-black bg-white/60 px-3 py-2 text-sm";

export default function UsulanPage() {
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [alasan, setAlasan] = useState("");
  const [peringatan, setPeringatan] = useState("");
  const [berhasil, setBerhasil] = useState(false);
  const [daftarUsulan, setDaftarUsulan] = useState([]);
  const [nomor, setNomor] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      nama.trim() === "" ||
      judul.trim() === "" ||
      kategori.trim() === "" ||
      alasan.trim() === ""
    ) {
      setBerhasil(false);
      setPeringatan("Semua kolom wajib diisi sebelum usulan dikirim.");
      return;
    }

    setDaftarUsulan([
      {
        id: nomor,
        nama: nama.trim(),
        judul: judul.trim(),
        kategori,
        alasan: alasan.trim(),
      },
      ...daftarUsulan,
    ]);
    setNomor(nomor + 1);
    setPeringatan("");
    setBerhasil(true);
    setNama("");
    setJudul("");
    setKategori("");
    setAlasan("");
  }

  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-bold">Usulan Buku</h1>
      <p className="mt-1 mb-6 text-sm text-black/70">
        Ada buku yang ingin kamu baca di Pustaka Senja? Tulis usulanmu di sini.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border-2 border-black bg-white/40 p-5"
      >
        <div>
          <label htmlFor="nama" className="mb-1 block text-sm font-bold">
            Nama pengusul
          </label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan namamu"
            className={gayaInput}
          />
        </div>

        <div>
          <label htmlFor="judul" className="mb-1 block text-sm font-bold">
            Judul buku yang diusulkan
          </label>
          <input
            id="judul"
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Contoh: Sapiens"
            className={gayaInput}
          />
        </div>

        <div>
          <label htmlFor="kategori" className="mb-1 block text-sm font-bold">
            Kategori
          </label>
          <select
            id="kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className={gayaInput}
          >
            <option value="">Pilih kategori</option>
            {pilihanKategori.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="alasan" className="mb-1 block text-sm font-bold">
            Alasan usulan
          </label>
          <textarea
            id="alasan"
            rows={4}
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            placeholder="Mengapa buku ini perlu ada di Pustaka Senja?"
            className={gayaInput}
          />
        </div>

        <button
          type="submit"
          className="w-full border-2 border-black bg-oranye py-2.5 text-sm font-bold hover:bg-kuning"
        >
          Kirim Usulan
        </button>

        {peringatan && (
          <p
            role="alert"
            className="border-2 border-black bg-red-300 p-3 text-sm"
          >
            {peringatan}
          </p>
        )}
        {berhasil && (
          <p
            role="status"
            className="border-2 border-black bg-emerald-300 p-3 text-sm"
          >
            Usulan berhasil dikirim. Terima kasih!
          </p>
        )}
      </form>

      <h2 className="mt-8 mb-3 text-lg font-bold">
        Usulan sesi ini ({daftarUsulan.length})
      </h2>
      {daftarUsulan.length === 0 ? (
        <p className="text-sm text-black/70">
          Belum ada usulan. Usulan yang kamu kirim akan muncul di sini.
        </p>
      ) : (
        <ul className="space-y-3">
          {daftarUsulan.map((usulan) => (
            <li key={usulan.id} className="border-2 border-black p-4">
              <p className="font-bold">{usulan.judul}</p>
              <p className="text-xs text-black/70">
                {usulan.kategori} &bull; diusulkan oleh {usulan.nama}
              </p>
              <p className="mt-2 text-sm">{usulan.alasan}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
