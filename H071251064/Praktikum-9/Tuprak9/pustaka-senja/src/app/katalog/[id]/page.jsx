import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";
import pool from "@/lib/db";
import { parseId } from "@/lib/validasi";

export const dynamic = "force-dynamic";

export default async function DetailBuku({ params, searchParams }) {
  const { id } = await params;
  const { pesan } = await searchParams;

  const idAngka = parseId(id);
  let buku = null;
  if (idAngka !== null) {
    const hasil = await pool.query(
      `SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis, gambar
       FROM buku
       WHERE id = $1`,
      [idAngka]
    );
    buku = hasil.rows[0] ?? null;
  }

  if (!buku) {
    return (
      <div className="mx-auto max-w-xl border-2 border-black bg-red-300 p-10 text-center shadow-[8px_8px_0_#000]">
        <h1 className="font-display text-3xl font-extrabold">Buku tidak ditemukan</h1>
        <p className="mt-3 font-medium">
          Tidak ada buku dengan id &quot;{id}&quot;. Coba pilih buku dari katalog.
        </p>
        <Link
          href="/katalog"
          className="mt-6 inline-block border-2 border-black bg-yellow-300 px-6 py-3 font-bold shadow-[5px_5px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pesan === "diubah" && (
        <p role="status" className="border-2 border-black bg-lime-300 px-4 py-3 text-sm font-bold">
          Perubahan buku berhasil disimpan.
        </p>
      )}

      <article className="grid gap-10 border-2 border-black bg-white p-8 shadow-[10px_10px_0_#000] md:grid-cols-[280px_1fr] md:p-12">
        <div className="mx-auto w-56 perspective-[900px] md:w-full">
          <div
            role="img"
            aria-label={`Sampul buku ${buku.judul}`}
            className="relative aspect-2/3 w-full overflow-hidden border-2 border-black bg-pink-300 shadow-[12px_12px_0_#000] -rotate-y-18 rotate-x-3"
          >
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center font-display text-xl font-extrabold">
              {buku.judul}
            </div>
            {buku.gambar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={buku.gambar}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-4 border-r-2 border-black bg-linear-to-r from-black/40 to-white/20" />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <span className="border-2 border-black bg-sky-200 px-3 py-1 text-sm font-bold">
              {buku.kategori}
            </span>
            <span
              className={`border-2 border-black px-3 py-1 text-sm font-bold ${
                buku.tersedia ? "bg-lime-300" : "bg-red-400"
              }`}
            >
              {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            {buku.judul}
          </h1>
          <p className="mt-2 text-lg font-medium">
            {buku.penulis}, terbit {buku.tahun}
          </p>

          <h2 className="mt-8 inline-block border-2 border-black bg-yellow-300 px-3 font-display text-xl font-extrabold">
            Sinopsis
          </h2>
          <p className="mt-3 max-w-prose leading-relaxed">{buku.sinopsis}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/katalog"
              className="border-2 border-black bg-yellow-300 px-6 py-3 text-center font-bold shadow-[5px_5px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Kembali ke Katalog
            </Link>

            <div className="grid grid-cols-2 gap-4 flex-1 w-full">
              <Link
                href={`/katalog/${buku.id}/edit`}
                className="w-full border-2 border-black bg-sky-200 px-6 py-3 text-center font-bold shadow-[5px_5px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center"
              >
                Edit
              </Link>
              <TombolHapus id={buku.id} judul={buku.judul} kembali="/katalog" ukuran="besar" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}