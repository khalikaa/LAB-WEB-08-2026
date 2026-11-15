import Link from "next/link";
import Hero from "@/components/Hero";
import { ambilStatistik } from "@/lib/buku";

// Statistik dibaca dari PostgreSQL pada setiap permintaan, bukan dirender statis saat build.
export const dynamic = "force-dynamic";

export default async function Beranda() {
  const { total, tersedia, dipinjam } = await ambilStatistik();

  const statistik = [
    { label: "Total Koleksi Buku", nilai: total },
    { label: "Buku Tersedia", nilai: tersedia },
    { label: "Buku Dipinjam", nilai: dipinjam },
  ];

  return (
    <div className="space-y-12">
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca nyaman untuk mahasiswa dan warga sekitar kampus. Temukan, simpan, dan usulkan buku favoritmu."
        lokasi="Dekat Kampus, Makassar"
        jamBuka="Setiap hari, 14.00 - 21.00"
      />

      <section aria-labelledby="judul-catatan">
        <p
          id="judul-catatan"
          className="mb-3 text-center font-mono text-xs uppercase tracking-[0.3em] text-ink-soft"
        >
          Catatan Koleksi
        </p>
        <div className="grid grid-cols-1 divide-y divide-dashed divide-ink/30 border-y-4 border-double border-ink/50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {statistik.map((item) => (
            <div key={item.label} className="px-4 py-6 text-center">
              <p className="font-display text-6xl font-light text-dusk">{item.nilai}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/katalog"
          className="border-b-4 border-gold bg-dusk px-7 py-3 font-mono text-sm uppercase tracking-[0.16em] text-paper transition-colors hover:bg-dusk-soft"
        >
          Lihat Katalog Buku
        </Link>
        <Link
          href="/usulan"
          className="border-2 border-dusk px-7 py-[10px] font-mono text-sm uppercase tracking-[0.16em] text-dusk transition-colors hover:bg-paper-deep"
        >
          Usulkan Buku
        </Link>
      </section>
    </div>
  );
}
