import Link from "next/link";
import BukuCard from "@/components/BukuCard";
import { ambilSemuaBuku, ambilKategori } from "@/lib/buku";

export const dynamic = "force-dynamic";

export default async function Katalog({ searchParams }) {
  // Filter kategori datang dari URL (?kategori=Fiksi) dan dikirim ke SQL sebagai parameter.
  const { kategori } = await searchParams;
  const kategoriAktif = typeof kategori === "string" && kategori !== "" ? kategori : null;

  const [daftarBuku, daftarKategori] = await Promise.all([
    ambilSemuaBuku(kategoriAktif),
    ambilKategori(),
  ]);

  const sekat = ["Semua", ...daftarKategori];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">Laci katalog</p>
          <h1 className="mt-2 font-display text-4xl font-light text-dusk sm:text-5xl">Katalog Buku</h1>
        </div>
        <Link
          href="/katalog/tambah"
          className="border-b-4 border-gold bg-dusk px-6 py-2.5 font-mono text-sm uppercase tracking-[0.16em] text-paper transition-colors hover:bg-dusk-soft"
        >
          + Tambah Buku
        </Link>
      </div>
      <p className="mt-3 max-w-xl text-ink-soft">
        Jelajahi koleksi Pustaka Senja, dipilah seperti sekat laci kartu katalog.
      </p>

      {/* sekat laci */}
      <div className="mt-8 flex flex-wrap items-end gap-1.5 border-b-2 border-dusk px-1">
        {sekat.map((nama) => {
          const aktif = nama === "Semua" ? kategoriAktif === null : nama === kategoriAktif;
          const href = nama === "Semua" ? "/katalog" : `/katalog?kategori=${encodeURIComponent(nama)}`;
          return (
            <Link
              key={nama}
              href={href}
              aria-current={aktif ? "page" : undefined}
              className={
                "-mb-[2px] rounded-t-md border-2 border-b-0 border-dusk px-4 font-mono text-xs uppercase tracking-[0.14em] transition-colors " +
                (aktif
                  ? "bg-dusk py-3 text-gold"
                  : "bg-paper-deep py-2 text-ink-soft hover:bg-card hover:text-ink")
              }
            >
              {nama}
            </Link>
          );
        })}
      </div>

      <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">
        Menampilkan {daftarBuku.length} judul · dibaca dari PostgreSQL
      </p>

      {daftarBuku.length === 0 ? (
        <div className="mt-6 border border-dashed border-ink/40 px-6 py-12 text-center">
          <p className="font-display text-2xl font-light text-dusk">Laci ini masih kosong</p>
          <p className="mt-2 text-ink-soft">Belum ada buku pada kategori ini.</p>
          <Link
            href="/katalog/tambah"
            className="mt-5 inline-block border-2 border-dusk px-5 py-2 font-mono text-xs uppercase tracking-[0.16em] text-dusk hover:bg-paper-deep"
          >
            Tambah Buku
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {daftarBuku.map((buku) => (
            <BukuCard
              key={buku.id}
              id={buku.id}
              judul={buku.judul}
              penulis={buku.penulis}
              kategori={buku.kategori}
              tahun={buku.tahun}
              tersedia={buku.tersedia}
            />
          ))}
        </div>
      )}
    </div>
  );
}
