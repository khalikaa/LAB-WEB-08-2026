import Link from "next/link";
import Hero from "@/components/Hero";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Beranda() {
  const hasil = await pool.query(
    `SELECT
       COUNT(*)::int AS total,
       COUNT(*) FILTER (WHERE tersedia)::int AS tersedia,
       COUNT(*) FILTER (WHERE NOT tersedia)::int AS dipinjam
     FROM buku`
  );
  const { total, tersedia, dipinjam } = hasil.rows[0];

  const statistik = [
    { label: "Total Koleksi Buku", nilai: total, warna: "bg-yellow-300" },
    { label: "Buku Tersedia", nilai: tersedia, warna: "bg-lime-300" },
    { label: "Buku Dipinjam", nilai: dipinjam, warna: "bg-pink-300" },
  ];

  return (
    <div className="space-y-12">
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca komunitas di dekat kampus. Pinjam buku, simpan favoritmu, dan usulkan judul baru untuk koleksi kami."
        lokasi="Dekat kampus, Makassar"
        jamBuka="Senin - Sabtu, 09.00 - 20.00"
      >
        <Link
          href="/katalog"
          className="border-2 border-black bg-yellow-300 px-6 py-3 font-bold shadow-[5px_5px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          Lihat Katalog
        </Link>
        <Link
          href="/usulan"
          className="border-2 border-black bg-white px-6 py-3 font-bold shadow-[5px_5px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          Usulkan Buku
        </Link>
      </Hero>

      <section aria-label="Ringkasan koleksi">
        <h2 className="mb-6 font-display text-3xl font-extrabold">
          Koleksi kami saat ini
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {statistik.map((item) => (
            <div key={item.label} className="perspective-[900px]">
              <div
                className={`border-2 border-black p-6 shadow-[8px_8px_0_#000] transition-transform duration-300 hover:rotate-x-6 hover:-rotate-y-8 ${item.warna}`}
              >
                <p className="font-display text-7xl font-extrabold leading-none">
                  {item.nilai}
                </p>
                <p className="mt-3 font-bold">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}