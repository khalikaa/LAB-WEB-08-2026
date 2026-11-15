import Link from "next/link";
import { tambahBuku } from "@/app/katalog/actions";
import { DAFTAR_KATEGORI, ambilPesanError } from "@/lib/validasi";

const gayaInput =
  "mt-1 w-full border-2 border-black bg-white px-4 py-3 shadow-[4px_4px_0_#000] outline-none focus:bg-yellow-100";

export default async function TambahBuku({ searchParams }) {
  const { error } = await searchParams;
  const pesanError = ambilPesanError(error);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="inline-block border-2 border-black bg-lime-300 px-4 py-1 font-display text-4xl font-extrabold shadow-[6px_6px_0_#000]">
        Tambah Buku
      </h1>
      <p className="mt-5 font-medium">
        Isi data buku baru yang akan disimpan ke katalog Pustaka Senja.
      </p>

      <form
        action={tambahBuku}
        className="mt-6 space-y-5 border-2 border-black bg-sky-200 p-8 shadow-[10px_10px_0_#000]"
      >
        <div>
          <label htmlFor="judul" className="font-bold">Judul Buku</label>
          <input id="judul" name="judul" type="text" placeholder="Contoh: Clean Code" required maxLength={200} className={gayaInput} />
        </div>

        <div>
          <label htmlFor="penulis" className="font-bold">Penulis</label>
          <input id="penulis" name="penulis" type="text" placeholder="Contoh: Robert C. Martin" required maxLength={150} className={gayaInput} />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="kategori" className="font-bold">Kategori</label>
            <select id="kategori" name="kategori" required defaultValue="" className={gayaInput}>
              <option value="">Pilih kategori</option>
              {DAFTAR_KATEGORI.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tahun" className="font-bold">Tahun Terbit</label>
            <input id="tahun" name="tahun" type="number" placeholder="Contoh: 2008" required min={1000} className={gayaInput} />
          </div>

          <div>
            <label htmlFor="tersedia" className="font-bold">Status</label>
            <select id="tersedia" name="tersedia" defaultValue="true" className={gayaInput}>
              <option value="true">Tersedia</option>
              <option value="false">Sedang Dipinjam</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="sinopsis" className="font-bold">Sinopsis</label>
          <textarea id="sinopsis" name="sinopsis" rows={4} placeholder="Tulis ringkasan singkat isi buku..." required maxLength={2000} className={gayaInput} />
        </div>

        <div>
          <label htmlFor="gambar" className="font-bold">Link Gambar Sampul (opsional)</label>
          <input id="gambar" name="gambar" type="url" placeholder="https://contoh.com/sampul-buku.jpg" className={gayaInput} />
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
          Tambah Buku
        </button>
      </form>

      <Link
        href="/katalog"
        className="mt-6 inline-block border-2 border-black bg-white px-6 py-3 font-bold shadow-[5px_5px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        Batal
      </Link>
    </div>
  );
}