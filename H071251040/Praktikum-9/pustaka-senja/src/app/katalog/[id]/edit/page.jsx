import Link from "next/link";
import { notFound } from "next/navigation";
import FormBuku from "@/components/FormBuku";
import { getBukuById } from "@/lib/buku";
import { ubahBuku } from "@/app/katalog/actions";

export const dynamic = "force-dynamic";

export default async function EditBukuPage({ params }) {
  const { id } = await params;
  const buku = await getBukuById(id);

  if (!buku) notFound();

  const nilaiAwal = {
    judul: buku.judul,
    penulis: buku.penulis,
    kategori: buku.kategori,
    tahun: String(buku.tahun),
    tersedia: String(buku.tersedia),
    sinopsis: buku.sinopsis,
  };

  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-bold">Edit Buku</h1>
      <p className="mt-1 mb-6 text-sm text-black/70">
        Ubah informasi &quot;{buku.judul}&quot; lalu simpan perubahannya.
      </p>

      <div className="border-2 border-black bg-white/40 p-5">
        <FormBuku
          action={ubahBuku.bind(null, buku.id)}
          nilaiAwal={nilaiAwal}
          labelTombol="Simpan Perubahan"
        />
      </div>

      <Link
        href={`/katalog/${buku.id}`}
        className="mt-5 inline-block text-sm font-bold underline"
      >
        &larr; Batal dan kembali ke detail
      </Link>
    </section>
  );
}
