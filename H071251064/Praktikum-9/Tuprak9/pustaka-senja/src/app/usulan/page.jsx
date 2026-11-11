"use client";

import { useState } from "react";

const formAwal = { nama: "", judul: "", kategori: "", alasan: "" };
const opsiKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

export default function Usulan() {
  const [form, setForm] = useState(formAwal);
  const [pesan, setPesan] = useState(null);
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bersih = {
      nama: form.nama.trim(),
      judul: form.judul.trim(),
      kategori: form.kategori.trim(),
      alasan: form.alasan.trim(),
    };

    if (!bersih.nama || !bersih.judul || !bersih.kategori || !bersih.alasan) {
      setPesan({ tipe: "error", teks: "Semua kolom wajib diisi sebelum usulan dikirim." });
      return;
    }

    setDaftarUsulan([{ id: Date.now(), ...bersih }, ...daftarUsulan]);
    setPesan({ tipe: "sukses", teks: "Usulan berhasil dikirim. Terima kasih!" });
    setForm(formAwal);
  };

  const gayaInput =
    "mt-1 w-full border-2 border-black bg-white px-4 py-3 shadow-[4px_4px_0_#000] outline-none focus:bg-yellow-100";

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="inline-block border-2 border-black bg-lime-300 px-4 py-1 font-display text-4xl font-extrabold shadow-[6px_6px_0_#000]">
        Usulan Buku
      </h1>
      <p className="mt-5 font-medium">
        Ada buku yang ingin kamu baca di Pustaka Senja? Isi formulir di bawah ini.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 space-y-5 border-2 border-black bg-sky-200 p-8 shadow-[10px_10px_0_#000]"
      >
        <div>
          <label htmlFor="nama" className="font-bold">Nama Pengusul</label>
          <input id="nama" name="nama" type="text" placeholder="Masukkan nama lengkap Anda" value={form.nama} onChange={handleChange} className={gayaInput} />
        </div>

        <div>
          <label htmlFor="judul" className="font-bold">Judul Buku yang Diusulkan</label>
          <input id="judul" name="judul" type="text" placeholder="Masukkan judul buku yang diusulkan" value={form.judul} onChange={handleChange} className={gayaInput} />
        </div>

        <div>
          <label htmlFor="kategori" className="font-bold">Kategori</label>
          <select id="kategori" name="kategori" value={form.kategori} onChange={handleChange} className={gayaInput}>
            <option value="">Pilih kategori</option>
            {opsiKategori.map((kategori) => (
              <option key={kategori} value={kategori}>{kategori}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="alasan" className="font-bold">Alasan Usulan</label>
          <textarea id="alasan" name="alasan" rows={4} placeholder="Masukkan alasan usulan" value={form.alasan} onChange={handleChange} className={gayaInput} />
        </div>

        {pesan && (
          <p
            role="alert"
            className={`border-2 border-black px-4 py-3 text-sm font-bold ${
              pesan.tipe === "error" ? "bg-red-400" : "bg-lime-300"
            }`}
          >
            {pesan.teks}
          </p>
        )}

        <button
          type="submit"
          className="w-full border-2 border-black bg-yellow-300 px-6 py-3 font-bold shadow-[5px_5px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          Kirim Usulan
        </button>
      </form>

      {daftarUsulan.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-extrabold">Usulan yang baru dikirim</h2>
          <ul className="mt-4 space-y-4">
            {daftarUsulan.map((usulan) => (
              <li
                key={usulan.id}
                className="border-2 border-black bg-white p-5 shadow-[6px_6px_0_#000]"
              >
                <p className="font-display text-lg font-extrabold">{usulan.judul}</p>
                <p className="text-sm font-medium text-black/70">
                  Kategori {usulan.kategori}, diusulkan oleh {usulan.nama}
                </p>
                <p className="mt-2 text-sm">{usulan.alasan}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}