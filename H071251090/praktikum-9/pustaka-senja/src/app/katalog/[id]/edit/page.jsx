import Link from "next/link";
import pool from "@/lib/db";
import { ubahBuku } from "@/app/katalog/actions";

export default async function EditBukuPage({ params }) {
    const { id } = await params;

    const { rows } = await pool.query("SELECT * FROM buku WHERE id = $1;", [id]);
    const buku = rows[0];

    if (!buku) {
        return (
        <div className="max-w-xl mx-auto my-12 bg-white border border-rose-200 rounded-3xl p-8 text-center shadow-sm">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-xl font-bold text-rose-800 mt-2">
            Buku Tidak Ditemukan
            </h2>
            <p className="text-sm text-stone-600 mt-2">
            Data buku dengan ID "{id}" tidak tersimpan di database Pustaka Senja.
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

    const ubahBukuWithId = ubahBuku.bind(null, id);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
        <Link
            href={`/katalog/${buku.id}`}
            className="inline-flex items-center text-xs font-semibold text-amber-900 hover:text-amber-700 transition"
        >
            &larr; Batal & Kembali ke Detail Buku
        </Link>

        <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6 border-b border-stone-100 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-md">
                Mode Edit Koleksi #{buku.id}
            </span>
            <h1 className="text-2xl font-bold text-amber-950 mt-3">
                Ubah Informasi Buku
            </h1>
            <p className="text-sm text-stone-600 mt-1">
                Silakan sesuaikan informasi buku. Perubahan akan langsung diperbarui
                ke tabel database PostgreSQL.
            </p>
            </div>

            <form action={ubahBukuWithId} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                <label
                    htmlFor="judul"
                    className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1"
                >
                    Judul Buku *
                </label>
                <input
                    type="text"
                    id="judul"
                    name="judul"
                    required
                    defaultValue={buku.judul}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm"
                />
                </div>

                <div>
                <label
                    htmlFor="penulis"
                    className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1"
                >
                    Penulis *
                </label>
                <input
                    type="text"
                    id="penulis"
                    name="penulis"
                    required
                    defaultValue={buku.penulis}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm"
                />
                </div>

                <div>
                <label
                    htmlFor="kategori"
                    className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1"
                >
                    Kategori *
                </label>
                <select
                    id="kategori"
                    name="kategori"
                    required
                    defaultValue={buku.kategori}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm bg-white"
                >
                    <option value="Teknologi">Teknologi</option>
                    <option value="Fiksi">Fiksi</option>
                    <option value="Pengembangan Diri">Pengembangan Diri</option>
                </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                <div>
                    <label
                    htmlFor="tahun"
                    className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1"
                    >
                    Tahun *
                    </label>
                    <input
                    type="number"
                    id="tahun"
                    name="tahun"
                    required
                    min="1900"
                    max="2099"
                    defaultValue={buku.tahun}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm"
                    />
                </div>

                <div>
                    <label
                    htmlFor="tersedia"
                    className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1"
                    >
                    Status Ketersediaan *
                    </label>
                    <select
                    id="tersedia"
                    name="tersedia"
                    required
                    defaultValue={buku.tersedia ? "true" : "false"}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm bg-white"
                    >
                    <option value="true">Tersedia</option>
                    <option value="false">Sedang Dipinjam</option>
                    </select>
                </div>
                </div>
            </div>

            <div>
                <label
                htmlFor="sinopsis"
                className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1"
                >
                Sinopsis Lengkap *
                </label>
                <textarea
                id="sinopsis"
                name="sinopsis"
                required
                rows={5}
                defaultValue={buku.sinopsis}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm leading-relaxed"
                ></textarea>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <Link
                href={`/katalog/${buku.id}`}
                className="px-5 py-2.5 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl text-sm font-semibold transition"
                >
                Batal
                </Link>
                <button
                type="submit"
                className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-amber-50 font-semibold rounded-xl text-sm transition shadow-sm cursor-pointer"
                >
                Simpan Perubahan
                </button>
            </div>
            </form>
        </section>
        </div>
    );
}