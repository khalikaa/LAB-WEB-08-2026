import pool from "@/lib/db";
import BukuCard from "@/components/BukuCard";
import { tambahBuku } from "@/app/katalog/actions";

export default async function KatalogPage() {
    const { rows: bukuList } = await pool.query(
        "SELECT * FROM buku ORDER BY id ASC;"
    );

    return (
        <div className="space-y-10">
        <div>
            <h1 className="text-3xl font-extrabold text-amber-950">
            Katalog Koleksi Buku
            </h1>
            <p className="text-stone-600 mt-2">
            Seluruh koleksi literasi Ruang Baca Pustaka Senja yang tersimpan secara
            permanen di database PostgreSQL.
            </p>
        </div>

        <section className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
            <h2 className="text-xl font-bold text-amber-950">
                Tambah Koleksi Buku Baru
            </h2>
            <p className="text-sm text-stone-600 mt-1">
                Data yang ditambahkan akan langsung disimpan ke tabel PostgreSQL dan
                tampil di katalog.
            </p>
            </div>

            <form action={tambahBuku} className="space-y-4">
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
                    placeholder="Contoh: Clean Code"
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
                    placeholder="Contoh: Robert C. Martin"
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
                    placeholder="2024"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm"
                    />
                </div>

                <div>
                    <label
                    htmlFor="tersedia"
                    className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1"
                    >
                    Status *
                    </label>
                    <select
                    id="tersedia"
                    name="tersedia"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm bg-white"
                    >
                    <option value="true">Tersedia</option>
                    <option value="false">Dipinjam</option>
                    </select>
                </div>
                </div>
            </div>

            <div>
                <label
                htmlFor="sinopsis"
                className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1"
                >
                Sinopsis Ringkas *
                </label>
                <textarea
                id="sinopsis"
                name="sinopsis"
                required
                rows={3}
                placeholder="Tuliskan ulasan atau sinopsis singkat buku..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm"
                ></textarea>
            </div>

            <div className="flex justify-end pt-2">
                <button
                type="submit"
                className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-amber-50 font-semibold rounded-xl text-sm transition shadow-sm cursor-pointer"
                >
                + Simpan Buku ke Database
                </button>
            </div>
            </form>
        </section>

        <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="text-xl font-bold text-amber-950">
                Daftar Koleksi Rak ({bukuList.length} Buku)
            </h2>
            </div>

            {bukuList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-8">
                <p className="text-stone-500 font-medium">
                Belum ada data buku di dalam database PostgreSQL.
                </p>
            </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bukuList.map((buku) => (
                <BukuCard key={buku.id} buku={buku} />
                ))}
            </div>
            )}
        </section>
        </div>
    );
}