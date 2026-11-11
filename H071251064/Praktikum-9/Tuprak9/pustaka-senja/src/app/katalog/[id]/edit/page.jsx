import Link from "next/link";
import pool from "@/lib/db";
import { DAFTAR_KATEGORI, ambilPesanError, parseId } from "@/lib/validasi";
import { ubahBuku } from "@/app/katalog/actions";

export const dynamic = "force-dynamic";

const gayaInput =
  "mt-1 w-full border-2 border-black bg-white px-4 py-3 shadow-[4px_4px_0_#000] outline-none focus:bg-yellow-100";

export default async function EditBuku({ params, searchParams }) {
  const { id } = await params;
  const { error } = await searchParams;

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

  const pesanError = ambilPesanError(error);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="inline-block border-2 border-black bg-yellow-300 px-4 py-1 font-display text-4xl font-extrabold shadow-[6px_6px_0_#000]">
        Edit Buku
      </h1>
      <p className="mt-5 font-medium">
        Ubah informasi untuk &quot;{buku.judul}&quot; lalu simpan perubahan.
      </p>

      <form action={ubahBuku} className="mt-6 space-y-5 border-2 border-black bg-sky-200 p-8 shadow-[10px_10px_0_#000]">
        <input type="hidden" name="id" value={buku.id} />

        <div>
          <label htmlFor="judul" className="font-bold">Judul Buku</label>
          <input id="judul" name="judul" type="text" placeholder="Contoh: Clean Code" required maxLength={200} defaultValue={buku.judul} className={gayaInput} />
        </div>

        <div>
          <label htmlFor="penulis" className="font-bold">Penulis</label>
          <input id="penulis" name="penulis" type="text" placeholder="Contoh: Robert C. Martin" required maxLength={150} defaultValue={buku.penulis} className={gayaInput} />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="kategori" className="font-bold">Kategori</label>
            <select id="kategori" name="kategori" required defaultValue={buku.kategori} className={gayaInput}>
              {DAFTAR_KATEGORI.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tahun" className="font-bold">Tahun Terbit</label>
            <input id="tahun" name="tahun" type="number" placeholder="Contoh: 2008" required min={1000} defaultValue={buku.tahun} className={gayaInput} />
          </div>

          <div>
            <label htmlFor="tersedia" className="font-bold">Status</label>
            <select id="tersedia" name="tersedia" defaultValue={String(buku.tersedia)} className={gayaInput}>
              <option value="true">Tersedia</option>
              <option value="false">Sedang Dipinjam</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="sinopsis" className="font-bold">Sinopsis</label>
          <textarea id="sinopsis" name="sinopsis" rows={4} placeholder="Tulis ringkasan singkat isi buku..." required maxLength={2000} defaultValue={buku.sinopsis} className={gayaInput} />
        </div>

        <div>
          <label htmlFor="gambar" className="font-bold">Link Gambar Sampul (opsional)</label>
          <input id="gambar" name="gambar" type="url" placeholder="https://contoh.com/sampul-buku.jpg" defaultValue={buku.gambar ?? ""} className={gayaInput} />
        </div>

        {pesanError && (
          <p role="alert" className="border-2 border-black bg-red-400 px-4 py-3 text-sm font-bold">
            {pesanError}
          </p>
        )}

        <button
          type="submit"
          className="w-full border-2 border-black bg-yellow-300 px-6 py-3 font-bold shadow-[5px_5px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          Simpan Perubahan
        </button>
      </form>

      <Link
        href={`/katalog/${buku.id}`}
        className="mt-6 inline-block border-2 border-black bg-white px-6 py-3 font-bold shadow-[5px_5px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        Batal
      </Link>
    </div>
  );
}