import { useState } from 'react'

// Kemiringan kecil agar kartu terasa seperti kliping yang ditempel
const MIRING = ['-rotate-1', 'rotate-1', 'rotate-[0.5deg]', '-rotate-[0.5deg]']

export default function MenuCard({
  id,
  nama,
  kategori,
  harga,
  tersedia,
  deskripsi,
  jumlahDipesan,
  onTambah,
}) {
  const [terbuka, setTerbuka] = useState(false)

  return (
    <article
      className={`relative border-[3px] border-espresso p-4 pt-7 shadow-hard transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 ${
        MIRING[id % MIRING.length]
      } ${tersedia ? 'bg-cream' : 'bg-parchment'}`}
    >
      {/* selotip */}
      <div
        aria-hidden="true"
        className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 border border-espresso/30 bg-amber/70"
      />

      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
        <span className="border-2 border-espresso px-2 py-0.5">{kategori}</span>
        <span className="text-amberdeep">No. {String(id).padStart(2, '0')}</span>
      </div>

      <div className={`mt-4 ${tersedia ? '' : 'opacity-50'}`}>
        <h2 className="font-display text-2xl leading-tight">{nama}</h2>
        <div className="mt-2 flex items-end gap-2">
          <span className="flex-1 border-b-2 border-dotted border-espresso" aria-hidden="true" />
          <span className="text-lg font-bold">Rp {harga.toLocaleString('id-ID')}</span>
        </div>
      </div>

      {!tersedia && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-16 -rotate-12 border-4 border-double border-brick bg-cream/80 px-3 py-1 font-display text-xl uppercase tracking-widest text-brick"
        >
          Habis
        </div>
      )}

      {terbuka && (
        <p className="mt-4 border-2 border-dashed border-kopi bg-parchment p-3 text-sm font-bold italic">
          {deskripsi}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          aria-expanded={terbuka}
          onClick={() => setTerbuka((sebelumnya) => !sebelumnya)}
          className="text-sm font-bold underline decoration-2 underline-offset-4 hover:text-amberdeep"
        >
          {terbuka ? 'Tutup detail' : 'Lihat detail'}
        </button>

        <button
          type="button"
          disabled={!tersedia}
          onClick={() => onTambah(id)}
          className="border-[3px] border-espresso bg-amber px-4 py-1.5 font-bold uppercase tracking-wider text-espresso shadow-hard-sm transition-all hover:bg-amberdeep hover:text-cream active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:cursor-not-allowed disabled:bg-parchment disabled:text-kopi/50 disabled:shadow-none disabled:hover:bg-parchment disabled:hover:text-kopi/50"
        >
          {tersedia ? 'Tambah +' : 'Habis'}
        </button>
      </div>

      {jumlahDipesan > 0 && (
        <p className="mt-3 text-right text-xs font-bold uppercase tracking-widest text-amberdeep">
          Di pesananmu: {jumlahDipesan}
        </p>
      )}
    </article>
  )
}
