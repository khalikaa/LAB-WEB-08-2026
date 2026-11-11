import pool from "@/lib/db";
import { parseId } from "@/lib/utils";
import FormBuku from "@/components/formBuku";
import BukuTidakDitemukan from "@/components/bukuTidakDitemukan";
import { ubahBuku } from "@/actions/buku_action";

export const dynamic = "force-dynamic";

export default async function EditBukuPage({ params }) {
  const { id } = await params;
  const idBuku = parseId(id);

  if (idBuku === null) return <BukuTidakDitemukan id={id} />;

  const [resBuku, resKategori] = await Promise.all([
    pool.query(
      `SELECT id_buku, judul, penulis, id_kategori, tahun_rilis, tersedia, sinopsis, gambar
       FROM buku
       WHERE id_buku = $1;`,
      [idBuku]
    ),
    pool.query("SELECT id_kategori, nama_kategori FROM kategori ORDER BY nama_kategori ASC;"),
  ]);

  const buku = resBuku.rows[0];
  if (!buku) return <BukuTidakDitemukan id={id} />;

  const nilaiAwal = {
    judul: buku.judul,
    penulis: buku.penulis,
    id_kategori: String(buku.id_kategori),
    tahun: String(buku.tahun_rilis),
    tersedia: String(buku.tersedia),
    sinopsis: buku.sinopsis,
    gambar: buku.gambar ?? "",
  };

  return (
    <section className="max-w-2xl mx-auto p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-2 text-white">Edit Buku</h1>
        <p className="text-slate-400 text-sm mb-6">Ubah informasi buku #{buku.id_buku}, lalu simpan perubahan.</p>

        <FormBuku
          action={ubahBuku.bind(null, buku.id_buku)}
          daftarKategori={resKategori.rows}
          nilaiAwal={nilaiAwal}
          labelTombol="Simpan Perubahan"
          hrefBatal={`/katalog/${buku.id_buku}`}
        />
      </div>
    </section>
  );
}
