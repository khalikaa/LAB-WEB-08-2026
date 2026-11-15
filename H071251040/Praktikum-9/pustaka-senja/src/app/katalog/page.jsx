import Link from "next/link";
import KatalogDaftar from "@/components/KatalogDaftar";
import { getSemuaBuku } from "@/lib/buku";

export const dynamic = "force-dynamic";

export default async function KatalogPage() {
  const daftarBuku = await getSemuaBuku();

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Katalog Buku</h1>
          <p className="mt-1 text-sm text-black/70">
            Pilih kategori atau cari judul dan penulis untuk menemukan buku.
          </p>
        </div>
        <Link
          href="/katalog/tambah"
          className="border-2 border-black bg-oranye px-4 py-2 text-sm font-bold hover:bg-kuning"
        >
          + Tambah Buku
        </Link>
      </div>

      <KatalogDaftar daftarBuku={daftarBuku} />
    </section>
  );
}
