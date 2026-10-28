export default function Navbar({
  daftarKategori,
  kategoriAktif,
  onPilihKategori,
  totalItem,
  totalHarga,
}) {
  return (
    <header className="sticky top-0 z-20 border-b-4 border-amber bg-espresso text-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div>
          <p className="font-display text-2xl leading-none tracking-wide sm:text-3xl">
            Kedai Kopi Senja
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.3em] text-amber">
            ★ Pesan sendiri dari mejamu ★
          </p>
        </div>

        <div
          aria-live="polite"
          className="border-2 border-cream bg-kopi px-3 py-1.5 text-right shadow-[3px_3px_0_0_#c9822b]"
        >
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber">Pesananmu</p>
          <p className="font-bold">
            {totalItem} item · Rp {totalHarga.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      <nav aria-label="Kategori menu" className="border-t-2 border-kopi bg-kopi/60">
        <ul className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-2">
          {daftarKategori.map((kategori) => {
            const aktif = kategori === kategoriAktif
            return (
              <li key={kategori}>
                <button
                  type="button"
                  aria-pressed={aktif}
                  onClick={() => onPilihKategori(kategori)}
                  className={`border-2 px-4 py-1 text-sm font-bold uppercase tracking-wider transition-colors ${
                    aktif
                      ? 'border-cream bg-amber text-espresso'
                      : 'border-transparent text-cream hover:border-amber'
                  }`}
                >
                  {kategori}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
