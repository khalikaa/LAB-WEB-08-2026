import Link from "next/link";
import pool from "@/lib/db";
import Hero from "@/components/Hero";

export default async function BerandaPage() {
    const resTotal = await pool.query("SELECT COUNT(*) FROM buku;");
    const resTersedia = await pool.query(
        "SELECT COUNT(*) FROM buku WHERE tersedia = true;"
    );
    const resDipinjam = await pool.query(
        "SELECT COUNT(*) FROM buku WHERE tersedia = false;"
    );

    const totalBuku = parseInt(resTotal.rows[0].count, 10);
    const bukuTersedia = parseInt(resTersedia.rows[0].count, 10);
    const bukuDipinjam = parseInt(resDipinjam.rows[0].count, 10);

    return (
        <div className="space-y-12">
        <Hero
            nama="Ruang Baca Pustaka Senja"
            slogan="Tempat singgah bertukar pikiran, membaca koleksi literasi pilihan, dan merawat imajinasi di dekat kampus."
            lokasiJam="Jl. Teratai No. 12, Tamalanrea • Buka Setiap Hari (09.00 - 21.00 WITA)"
        />

        <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
            <h2 className="text-xl font-bold text-amber-950">
                Statistik Koleksi Pustaka
            </h2>
            <p className="text-sm text-stone-600 mt-1">
                Data keterisian rak buku yang tersinkronisasi langsung dari database PostgreSQL.
            </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center sm:text-left">
                <span className="text-xs font-semibold tracking-wider text-amber-800 uppercase">
                Total Koleksi
                </span>
                <p className="text-3xl sm:text-4xl font-extrabold text-amber-950 mt-2">
                {totalBuku}
                </p>
                <span className="text-xs text-amber-700/80 mt-1 block">
                Judul buku terdaftar
                </span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center sm:text-left">
                <span className="text-xs font-semibold tracking-wider text-emerald-800 uppercase">
                Buku Tersedia
                </span>
                <p className="text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-2">
                {bukuTersedia}
                </p>
                <span className="text-xs text-emerald-700/80 mt-1 block">
                Siap dibaca di tempat
                </span>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-center sm:text-left">
                <span className="text-xs font-semibold tracking-wider text-stone-700 uppercase">
                Sedang Dipinjam
                </span>
                <p className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
                {bukuDipinjam}
                </p>
                <span className="text-xs text-stone-500 mt-1 block">
                Dalam masa peminjaman
                </span>
            </div>
            </div>
        </section>

        <section className="bg-gradient-to-r from-amber-900 to-stone-900 text-amber-50 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
            <h3 className="text-lg font-bold text-white">
                Ingin Mencari atau Mengusulkan Bacaan?
            </h3>
            <p className="text-sm text-amber-200/80 mt-1 max-w-xl">
                Jelajahi seluruh rak buku komunitas kami atau ajukan usulan judul baru agar dapat segera kami sediakan di ruang baca.
            </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link
                href="/katalog"
                className="w-full sm:w-auto text-center px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-xl text-sm transition shadow-sm"
            >
                Buka Katalog Buku &rarr;
            </Link>
            <Link
                href="/usulan"
                className="w-full sm:w-auto text-center px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 rounded-xl text-sm transition"
            >
                Usulkan Buku Baru
            </Link>
            </div>
        </section>
        </div>
    );
}