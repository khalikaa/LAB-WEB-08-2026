import pool from "@/lib/db";
import FormBuku from "@/components/formBuku";
import { tambahBuku } from "@/actions/buku_action";

export const dynamic = "force-dynamic";

export default async function TambahBukuPage() {
  const { rows: daftarKategori } = await pool.query(
    "SELECT id_kategori, nama_kategori FROM kategori ORDER BY nama_kategori ASC;"
  );

  return (
    <section className="max-w-2xl mx-auto p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-2 text-white">Tambah Buku Baru</h1>
        <p className="text-slate-400 text-sm mb-6">Isi data buku yang akan ditambahkan ke koleksi Pustaka Senja.</p>

        <FormBuku
          action={tambahBuku}
          daftarKategori={daftarKategori}
          labelTombol="Simpan Buku"
          hrefBatal="/katalog"
        />
      </div>
    </section>
  );
}
