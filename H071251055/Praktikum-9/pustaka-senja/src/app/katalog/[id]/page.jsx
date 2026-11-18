import Link from "next/link";
import { notFound } from "next/navigation";
import TombolHapus from "@/components/TombolHapus";
import { ambilBukuById } from "@/lib/buku";
import { nomorPanggil } from "@/lib/kategori";
import { parseId } from "@/lib/validasi";

export const dynamic = "force-dynamic";

export default async function DetailBuku({ params }) {
  const { id } = await params;

  // ID dari URL divalidasi dulu; id yang tidak valid tidak pernah dikirim ke database.
  const idBuku = parseId(id);
  const buku = idBuku === null ? null : await ambilBukuById(idBuku);
  if (!buku) notFound();

  const baris = [
    ["Pengarang", buku.penulis],
    ["Kategori", buku.kategori],
    ["Terbit", buku.tahun],
  ];

  return (
    <article className="relative mx-auto max-w-3xl border border-ink/20 bg-card px-6 pb-16 pt-7 shadow-[0_1px_0_rgba(0,0,0,0.06),0_18px_28px_-16px_rgba(60,30,20,0.55)] sm:px-12">
      <p className="border-b-2 border-stamp/70 pb-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
        No. panggil · {nomorPanggil(buku.kategori, buku.id)}
      </p>

      <h1 className="mt-5 font-display text-4xl font-medium leading-tight text-dusk sm:text-5xl">
        {buku.judul}
      </h1>

      <dl className="mt-5 font-mono text-sm sm:text-base">
        {baris.map(([label, nilai]) => (
          <div key={label} className="grid grid-cols-[6.5rem_1fr] gap-2 border-b border-rule/60 py-2">
            <dt className="uppercase tracking-wider text-ink-soft">{label}</dt>
            <dd>{nilai}</dd>
          </div>
        ))}
        <div className="grid grid-cols-[6.5rem_1fr] items-center gap-2 border-b border-rule/60 py-3">
          <dt className="uppercase tracking-wider text-ink-soft">Status</dt>
          <dd>
            {/* cap status: hijau jika tersedia, merah jika sedang dipinjam */}
            <span
              className={
                "inline-block -rotate-6 rounded-sm border-2 px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.2em] outline outline-1 outline-offset-2 mix-blend-multiply " +
                (buku.tersedia
                  ? "border-moss text-moss outline-moss/60"
                  : "border-stamp text-stamp outline-stamp/60")
              }
            >
              {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
            </span>
          </dd>
        </div>
      </dl>

      <h2 className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">Sinopsis</h2>
      <p className="mt-3 text-lg leading-8 first-letter:float-left first-letter:pr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-ember sm:text-xl sm:leading-9">
        {buku.sinopsis}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/katalog"
          className="border-2 border-dusk px-5 py-2 font-mono text-xs uppercase tracking-[0.16em] text-dusk transition-colors hover:bg-paper-deep"
        >
          ← Kembali ke Katalog
        </Link>
        <Link
          href={`/katalog/${buku.id}/edit`}
          className="border-2 border-ink/60 px-5 py-2 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:bg-paper-deep"
        >
          Edit
        </Link>
        <TombolHapus id={buku.id} judul={buku.judul} />
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-4 left-1/2 size-4 -translate-x-1/2 rounded-full border border-ink/25 bg-paper shadow-[inset_0_2px_3px_rgba(0,0,0,0.25)]"
      />
    </article>
  );
}
