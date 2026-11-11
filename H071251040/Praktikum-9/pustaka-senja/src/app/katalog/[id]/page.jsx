import Link from "next/link";
import { notFound } from "next/navigation";
import SampulBuku from "@/components/SampulBuku";
import TombolHapus from "@/components/TombolHapus";
import { getBukuById } from "@/lib/buku";

export const dynamic = "force-dynamic";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const buku = await getBukuById(id);

  // ID tidak valid atau buku tidak ada -> tampilkan not-found.jsx (status 404)
  if (!buku) notFound();

  const baris = [
    { label: "Penulis", nilai: buku.penulis },
    { label: "Kategori", nilai: buku.kategori },
    { label: "Tahun terbit", nilai: buku.tahun },
    { label: "ID buku", nilai: `#${buku.id}` },
  ];

  return (
    <article className="grid gap-6 md:grid-cols-[220px_1fr]">
      <SampulBuku
        id={buku.id}
        judul={buku.judul}
        penulis={buku.penulis}
        kategori={buku.kategori}
        className="w-full max-w-[260px]"
      />

      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{buku.judul}</h1>
        <p className="mt-1 text-sm">Oleh {buku.penulis}</p>

        <span
          className={`mt-4 inline-block border-2 border-black px-3 py-1 text-xs font-bold ${
            buku.tersedia ? "bg-emerald-300" : "bg-red-300"
          }`}
        >
          {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>

        <dl className="mt-5 border-t-2 border-black text-sm">
          {baris.map((item) => (
            <div
              key={item.label}
              className="flex justify-between gap-4 border-b border-black/30 py-2"
            >
              <dt className="text-black/60">{item.label}</dt>
              <dd className="text-right font-bold">{item.nilai}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-5 mb-2 text-sm font-bold">Sinopsis</h2>
        <p className="border-2 border-black bg-white/40 p-4 text-sm leading-relaxed">
          {buku.sinopsis}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/katalog"
            className="border-2 border-black bg-oranye px-5 py-2.5 text-sm font-bold hover:bg-kuning"
          >
            &larr; Kembali ke Katalog
          </Link>
          <Link
            href={`/katalog/${buku.id}/edit`}
            className="border-2 border-black px-5 py-2.5 text-sm font-bold hover:bg-kuning"
          >
            Edit
          </Link>
          <TombolHapus id={buku.id} judul={buku.judul} />
        </div>
      </div>
    </article>
  );
}
