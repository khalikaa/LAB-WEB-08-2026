import Link from "next/link";
import TombolSimpan from "@/components/TombolSimpan";
import TombolHapus from "@/components/TombolHapus";
import { nomorPanggil } from "@/lib/kategori";

export default function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const baris = [
    ["Pengarang", penulis],
    ["Kategori", kategori],
    ["Terbit", tahun],
  ];

  return (
    <article className="relative flex flex-col border border-ink/20 bg-card px-6 pb-12 pt-5 shadow-[0_1px_0_rgba(0,0,0,0.06),0_14px_22px_-14px_rgba(60,30,20,0.5)] transition-transform hover:-translate-y-0.5">
      <p className="border-b-2 border-stamp/70 pb-2 pr-10 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
        {nomorPanggil(kategori, id)}
      </p>

      <h3 className="mt-3 font-display text-2xl font-medium leading-snug text-dusk">{judul}</h3>

      <dl className="mt-3 font-mono text-sm">
        {baris.map(([label, nilai]) => (
          <div key={label} className="grid grid-cols-[5.5rem_1fr] gap-2 border-b border-rule/60 py-1.5">
            <dt className="uppercase tracking-wider text-ink-soft">{label}</dt>
            <dd className="text-ink">{nilai}</dd>
          </div>
        ))}
        <div className="grid grid-cols-[5.5rem_1fr] items-center gap-2 border-b border-rule/60 py-2.5">
          <dt className="uppercase tracking-wider text-ink-soft">Status</dt>
          <dd>
            {/* cap status: hijau jika tersedia, merah jika sedang dipinjam */}
            <span
              className={
                "inline-block -rotate-6 rounded-sm border-2 px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.2em] outline outline-1 outline-offset-2 mix-blend-multiply " +
                (tersedia
                  ? "border-moss text-moss outline-moss/60"
                  : "border-stamp text-stamp outline-stamp/60")
              }
            >
              {tersedia ? "Tersedia" : "Sedang Dipinjam"}
            </span>
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <TombolSimpan />
        <Link
          href={`/katalog/${id}/edit`}
          className="border-2 border-ink/60 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:bg-paper-deep"
        >
          Edit
        </Link>
        <TombolHapus id={id} judul={judul} />
        <Link
          href={`/katalog/${id}`}
          className="ml-auto border-b-4 border-gold bg-dusk px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors hover:bg-dusk-soft"
        >
          Lihat Detail
        </Link>
      </div>

      {/* lubang batang kartu katalog */}
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-1/2 size-4 -translate-x-1/2 rounded-full border border-ink/25 bg-paper shadow-[inset_0_2px_3px_rgba(0,0,0,0.25)]"
      />
    </article>
  );
}
