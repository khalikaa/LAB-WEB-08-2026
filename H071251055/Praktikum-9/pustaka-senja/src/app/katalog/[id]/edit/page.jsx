import { notFound } from "next/navigation";
import FormBuku from "@/components/FormBuku";
import { ubahBuku } from "@/app/katalog/actions";
import { ambilBukuById } from "@/lib/buku";
import { parseId } from "@/lib/validasi";

export const dynamic = "force-dynamic";

export default async function EditBuku({ params }) {
  const { id } = await params;

  const idBuku = parseId(id);
  const buku = idBuku === null ? null : await ambilBukuById(idBuku);
  if (!buku) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">Ubah kartu</p>
      <h1 className="mt-2 font-display text-4xl font-light text-dusk sm:text-5xl">Edit Buku</h1>
      <p className="mt-3 text-ink-soft">
        Mengubah data untuk <em className="font-medium not-italic text-dusk">{buku.judul}</em>.
      </p>

      <div className="mt-8">
        {/* id diikat ke Server Action; form di client hanya mengirim isiannya */}
        <FormBuku
          action={ubahBuku.bind(null, buku.id)}
          awal={buku}
          labelTombol="Simpan Perubahan"
          hrefBatal={`/katalog/${buku.id}`}
        />
      </div>
    </div>
  );
}
