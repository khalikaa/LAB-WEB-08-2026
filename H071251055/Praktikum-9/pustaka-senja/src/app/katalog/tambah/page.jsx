import FormBuku from "@/components/FormBuku";
import { tambahBuku } from "@/app/katalog/actions";

export default function TambahBuku() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">Kartu baru</p>
      <h1 className="mt-2 font-display text-4xl font-light text-dusk sm:text-5xl">Tambah Buku</h1>
      <p className="mt-3 text-ink-soft">
        Isi data buku baru. Setelah disimpan, buku langsung muncul di katalog.
      </p>

      <div className="mt-8">
        <FormBuku action={tambahBuku} labelTombol="Simpan Buku" hrefBatal="/katalog" />
      </div>
    </div>
  );
}
