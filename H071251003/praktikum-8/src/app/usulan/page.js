"use client";

import { useState } from "react";

export default function UsulanPage() {
  const [namaPengusul, setNamaPengusul] = useState("");
  const [judulBuku, setJudulBuku] = useState("");
  const [kategori, setKategori] = useState("Teknologi");
  const [alasan, setAlasan] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [daftarUsulan, setDaftarUsulan] = useState([]);
  const [sukses, setSukses] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !namaPengusul.trim() ||
      !judulBuku.trim() ||
      !alasan.trim()
    ) {
      setErrorMsg("Semua kolom formulir wajib diisi dengan lengkap!");
      setSukses(false);
      return;
    }

    setErrorMsg("");
    const usulanBaru = {
      id: Date.now(),
      namaPengusul,
      judulBuku,
      kategori,
      alasan,
    };

    setDaftarUsulan([usulanBaru, ...daftarUsulan]);
    setSukses(true);

    setNamaPengusul("");
    setJudulBuku("");
    setKategori("Teknologi");
    setAlasan("");
  }

  return (
    <section className="max-w-xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg mb-8">
        <h1 className="text-2xl font-bold mb-2">Usulkan Koleksi Buku Baru</h1>
        <p className="text-slate-400 text-sm mb-6">
          Punya rekomendasi buku menarik untuk Pustaka Senja? Sampaikan usulan Anda melalui formulir di bawah ini.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Nama Pengusul</label>
            <input
              type="text"
              placeholder="Masukkan nama Anda"
              value={namaPengusul}
              onChange={(e) => setNamaPengusul(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
              />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Judul Buku yang Diusulkan</label>
            <input
              type="text"
              placeholder="Masukkan judul buku"
              value={judulBuku}
              onChange={(e) => setJudulBuku(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
              />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Kategori Buku</label>
            <select
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

          <div>
            <label className="block text-sm text-slate-300 mb-1">Alasan Usulan</label>
            <textarea
              rows={4}
              placeholder="Mengapa buku ini penting untuk dihadirkan di Pustaka Senja?"
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
              />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-2.5 rounded-lg transition">
            Kirim Usulan Buku
          </button>
      
              {errorMsg && (
                <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm rounded-lg text-center">
                  {errorMsg}
                </div>
              )}
      
              {sukses && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-lg text-center">
                  Terima kasih! Usulan buku berhasil dikirim dan dicatat pada sesi ini.
                </div>
              )}

        </form>
      </div>

      {daftarUsulan.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Daftar Usulan Sesi Ini</h2>
          <div className="space-y-4">
            {daftarUsulan.map((item) => (
                <div key={item.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-amber-400">{item.judulBuku}</h3>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full">
                    {item.kategori}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">"{item.alasan}"</p>
                <p className="text-xs text-slate-500">Di-usulkan oleh: {item.namaPengusul}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
