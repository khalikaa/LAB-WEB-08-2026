import Link from "next/link";
import FormBuku from "@/components/FormBuku";
import { tambahBuku } from "@/app/katalog/actions";

const nilaiKosong = {
  judul: "",
  penulis: "",
  kategori: "",
  tahun: "",
  tersedia: "true",
  sinopsis: "",
};

export default function TambahBukuPage() {
  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-bold">Tambah Buku</h1>
      <p className="mt-1 mb-6 text-sm text-black/70">
        Buku baru akan disimpan ke database dan langsung tampil di katalog.
      </p>

      <div className="border-2 border-black bg-white/40 p-5">
        <FormBuku
          action={tambahBuku}
          nilaiAwal={nilaiKosong}
          labelTombol="Simpan Buku"
        />
      </div>

      <Link
        href="/katalog"
        className="mt-5 inline-block text-sm font-bold underline"
      >
        &larr; Kembali ke Katalog
      </Link>
    </section>
  );
}
