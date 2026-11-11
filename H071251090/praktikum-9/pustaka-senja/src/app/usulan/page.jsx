"use client";

import { useState } from "react";

export default function UsulanPage() {
    const [nama, setNama] = useState("");
    const [judul, setJudul] = useState("");
    const [kategori, setKategori] = useState("Teknologi");
    const [alasan, setAlasan] = useState("");

    const [pesanError, setPesanError] = useState("");
    const [terkirim, setTerkirim] = useState(false);
    const [daftarUsulan, setDaftarUsulan] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();

        if (!nama.trim() || !judul.trim() || !alasan.trim()) {
        setPesanError("Harap isi semua kolom formulir sebelum mengirim!");
        setTerkirim(false);
        return;
        }

        const usulanBaru = {
        id: Date.now(),
        nama: nama.trim(),
        judul: judul.trim(),
        kategori: kategori,
        alasan: alasan.trim(),
        };

        setDaftarUsulan([usulanBaru, ...daftarUsulan]);
        setTerkirim(true);
        setPesanError("");

        setNama("");
        setJudul("");
        setKategori("Teknologi");
        setAlasan("");
    }

    return (
        <section className="max-w-2xl mx-auto space-y-6">
        <div>
            <h1 className="text-3xl font-bold text-stone-900">Formulir Usulan Buku</h1>
            <p className="text-stone-600 text-sm mt-1">
            Usulkan buku bacaan berkualitas yang ingin Anda temukan di Pustaka Senja.
            </p>
        </div>

        {pesanError && (
            <p className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-xl">
            ⚠️ {pesanError}
            </p>
        )}

        {terkirim && (
            <p className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm rounded-xl">
            Terima kasih! Usulan buku Anda berhasil dikirim ke daftar kurasi.
            </p>
        )}

        <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Nama Pengusul</label>
            <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-4 py-2 text-stone-900 focus:outline-none focus:border-amber-800 text-sm"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Judul Buku</label>
            <input
                type="text"
                placeholder="Contoh: Sang Pendidik"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-4 py-2 text-stone-900 focus:outline-none focus:border-amber-800 text-sm"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Kategori</label>
            <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-4 py-2 text-stone-900 focus:outline-none focus:border-amber-800 text-sm bg-white"
            >
                <option value="Teknologi">Teknologi</option>
                <option value="Fiksi">Fiksi</option>
                <option value="Pengembangan Diri">Pengembangan Diri</option>
            </select>
            </div>

            <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Alasan Usulan</label>
            <textarea
                rows={4}
                placeholder="Alasan mengapa buku ini penting untuk dihadirkan..."
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-4 py-2 text-stone-900 focus:outline-none focus:border-amber-800 text-sm resize-none"
            />
            </div>

            <button
            type="submit"
            className="w-full bg-amber-800 hover:bg-amber-900 text-white font-medium py-2.5 rounded-lg transition text-sm shadow-sm"
            >
            Kirim Usulan Buku
            </button>
        </form>

        {daftarUsulan.length > 0 && (
            <div className="pt-4 space-y-3">
            <h2 className="text-lg font-bold text-stone-900">
                Usulan yang Dikirim Sesi Ini ({daftarUsulan.length})
            </h2>
            <div className="space-y-3">
                {daftarUsulan.map((item) => (
                <div
                    key={item.id}
                    className="bg-white border border-stone-200 rounded-xl p-4 text-sm shadow-sm space-y-1"
                >
                    <div className="flex justify-between items-center text-xs text-stone-500">
                    <span>Pengusul: <strong className="text-stone-800">{item.nama}</strong></span>
                    <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-medium">{item.kategori}</span>
                    </div>
                    <h3 className="font-bold text-stone-900">{item.judul}</h3>
                    <p className="text-stone-600 text-xs italic">&ldquo;{item.alasan}&rdquo;</p>
                </div>
                ))}
            </div>
            </div>
        )}
        </section>
    );
}