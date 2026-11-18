"use client";

import { useState } from "react";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

const formAwal = {
  nama: "",
  judul: "",
  kategori: "Teknologi",
  alasan: "",
};

export default function Usulan() {
  const [form, setForm] = useState(formAwal);
  const [pesan, setPesan] = useState({ tipe: "", teks: "" });
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
      setPesan({ tipe: "error", teks: "Semua kolom wajib diisi sebelum mengirim usulan." });
      return;
    }

    setDaftarUsulan([{ id: Date.now().toString(), ...bersih }, ...daftarUsulan]);
    setPesan({ tipe: "sukses", teks: "Usulan berhasil dikirim. Terima kasih!" });
    setForm(formAwal);
  };

  const labelClass = "font-mono text-xs uppercase tracking-[0.18em] text-ink-soft";
  const fieldClass =
    "mt-1 w-full border-0 border-b-2 border-ink/40 bg-transparent px-1 py-2 text-lg text-ink focus:border-ember focus:outline-none";

  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">Slip pengadaan</p>
      <h1 className="mt-2 font-display text-4xl font-light text-dusk sm:text-5xl">Usulan Buku</h1>
      <p className="mt-3 text-ink-soft">
        Ada buku yang ingin kamu baca di Pustaka Senja? Tulis usulanmu pada slip di bawah ini.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 border border-ink/20 bg-card px-6 py-7 shadow-[0_1px_0_rgba(0,0,0,0.06),0_18px_28px_-16px_rgba(60,30,20,0.55)] sm:px-10"
      >
        <p className="border-b-2 border-stamp/70 pb-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
          Slip usulan pengadaan buku
        </p>

        <div>
          <label htmlFor="nama" className={labelClass}>
            Nama Pengusul
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            value={form.nama}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="judul" className={labelClass}>
            Judul Buku yang Diusulkan
          </label>
          <input
            id="judul"
            name="judul"
            type="text"
            value={form.judul}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="kategori" className={labelClass}>
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            className={fieldClass}
          >
            {daftarKategori.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="alasan" className={labelClass}>
            Alasan Usulan
          </label>
          <textarea
            id="alasan"
            name="alasan"
            rows={4}
            value={form.alasan}
            onChange={handleChange}
            className="garis-tulis mt-1 w-full resize-y border-0 border-b-2 border-ink/40 px-1 text-lg text-ink focus:border-ember focus:outline-none"
          />
        </div>

        {pesan.teks && (
          <p
            role="alert"
            className={
              "border-l-4 px-4 py-2 font-mono text-sm " +
              (pesan.tipe === "error"
                ? "border-stamp bg-stamp/10 text-stamp"
                : "border-moss bg-moss/10 text-moss")
            }
          >
            {pesan.teks}
          </p>
        )}

        <button
          type="submit"
          className="border-b-4 border-gold bg-dusk px-7 py-2.5 font-mono text-sm uppercase tracking-[0.16em] text-paper transition-colors hover:bg-dusk-soft"
        >
          Kirim Usulan
        </button>
      </form>

      {daftarUsulan.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-light text-dusk">Usulan Terkirim (sesi ini)</h2>
          <ul className="mt-4 space-y-4">
            {daftarUsulan.map((usulan) => (
              <li
                key={usulan.id}
                className="border border-ink/15 border-l-4 border-l-gold bg-card px-5 py-4 shadow-[0_10px_18px_-14px_rgba(60,30,20,0.5)]"
              >
                <p className="font-display text-xl font-medium text-dusk">{usulan.judul}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                  {usulan.kategori} · diusulkan oleh {usulan.nama}
                </p>
                <p className="mt-2 text-ink">{usulan.alasan}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
