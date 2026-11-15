import Link from "next/link";
import Hero from "@/components/Hero";
import { getStatistik } from "@/lib/buku";

// Data dibaca dari PostgreSQL pada setiap permintaan.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { total, tersedia, dipinjam } = await getStatistik();

  const statistik = [
    { label: "Total Koleksi Buku", nilai: total, gaya: "bg-kuning" },
    { label: "Buku Tersedia", nilai: tersedia, gaya: "bg-emerald-300" },
    { label: "Buku Dipinjam", nilai: dipinjam, gaya: "bg-white/40" },
  ];

  return (
    <div className="space-y-6">
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca dan perpustakaan komunitas di dekat kampus. Pinjam buku, baca santai, dan usulkan judul yang ingin kamu lihat di rak kami."
        lokasi="Dekat kampus"
        jamBuka="Setiap hari, 09.00 – 21.00"
      />

      <section>
        <h2 className="mb-3 text-lg font-bold">Ringkasan koleksi</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {statistik.map((item) => (
            <div
              key={item.label}
              className={`border-2 border-black p-4 ${item.gaya}`}
            >
              <p className="text-4xl font-bold">{item.nilai}</p>
              <p className="mt-1 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/katalog"
          className="border-2 border-black bg-oranye px-5 py-2.5 text-sm font-bold hover:bg-kuning"
        >
          Lihat Katalog Buku
        </Link>
        <Link
          href="/usulan"
          className="border-2 border-black px-5 py-2.5 text-sm font-bold hover:bg-kuning"
        >
          Usulkan Buku
        </Link>
      </div>
    </div>
  );
}
