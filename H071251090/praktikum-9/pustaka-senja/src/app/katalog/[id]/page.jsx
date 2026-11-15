import Link from "next/link";
import pool from "@/lib/db";
import TombolHapus from "@/components/TombolHapus";

export default async function DetailBukuPage({ params, searchParams }) {
    const { id } = await params;
    const { status } = await searchParams;

    const { rows } = await pool.query("SELECT * FROM buku WHERE id = $1;", [id]);
    const buku = rows[0];

    if (!buku) {
        return (
        <div className="max-w-xl mx-auto my-16 bg-white border border-stone-200 rounded-3xl p-8 text-center shadow-sm">
            <span className="text-4xl block mb-2">🔍</span>
            <h2 className="text-2xl font-bold text-amber-950">Buku Tidak Ditemukan</h2>
            <p className="text-sm text-stone-600 mt-2">
            Buku dengan ID &quot;{id}&quot; tidak terdaftar dalam koleksi Pustaka Senja.
            </p>
            <Link
            href="/katalog"
            className="inline-block mt-6 px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-amber-50 font-semibold rounded-xl text-sm transition"
            >
            &larr; Kembali ke Katalog
            </Link>
        </div>
        );
    }

    return (
        <article className="max-w-3xl mx-auto space-y-6">
        {status === "sukses" && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-3.5 rounded-2xl text-sm font-medium flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-2.5">
                <span className="text-base">✅</span>
                <span>Data buku berhasil diperbarui ke database PostgreSQL!</span>
            </div>
            <Link
                href={`/katalog/${buku.id}`}
                className="text-xs text-emerald-700 underline hover:text-emerald-900"
            >
                Tutup
            </Link>
            </div>
        )}

        <Link
            href="/katalog"
            className="inline-flex items-center text-xs font-semibold text-amber-900 hover:text-amber-700 transition"
        >
            &larr; Kembali ke Katalog
        </Link>

        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-md">
                {buku.kategori}
            </span>
            <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                buku.tersedia
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
            >
                {buku.tersedia ? "Tersedia di Rak" : "Sedang Dipinjam"}
            </span>
            </div>

            <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 leading-tight">
                {buku.judul}
            </h1>
            <p className="text-sm text-stone-600 mt-2">
                Penulis: <span className="font-semibold text-stone-800">{buku.penulis}</span> • Tahun Terbit: <span className="font-semibold text-stone-800">{buku.tahun}</span>
            </p>
            </div>

            <div className="border-t border-stone-100 pt-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Sinopsis Buku
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {buku.sinopsis}
            </p>
            </div>

            <div className="border-t border-stone-100 pt-6 flex items-center justify-end gap-3">
            <Link
                href={`/katalog/${buku.id}/edit`}
                className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition"
            >
                ✏️ Ubah Data
            </Link>
            <TombolHapus id={buku.id} judul={buku.judul} />
            </div>
        </div>
        </article>
    );
}