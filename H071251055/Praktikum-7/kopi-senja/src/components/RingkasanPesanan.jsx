export default function RingkasanPesanan({
  daftarItem,
  totalItem,
  totalHarga,
  onTambah,
  onKurang,
}) {
  return (
    <section
      aria-labelledby="judul-ringkasan"
      className="border-[3px] border-espresso bg-cream p-5 shadow-hard"
    >
      <h2
        id="judul-ringkasan"
        className="border-b-4 border-double border-espresso pb-2 text-center font-display text-2xl"
      >
        Struk Pesanan
      </h2>

      {daftarItem.length === 0 ? (
        <p className="py-6 text-center text-sm font-bold italic text-kopi">
          Belum ada pesanan. Pilih menu dan tekan “Tambah”.
        </p>
      ) : (
        <ul className="divide-y-2 divide-dashed divide-kopi/60">
          {daftarItem.map((item) => (
            <li key={item.id} className="py-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-bold">{item.nama}</span>
                <span className="font-bold">Rp {item.subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-kopi">
                  {item.jumlah} × Rp {item.harga.toLocaleString('id-ID')}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={`Kurangi ${item.nama}`}
                    onClick={() => onKurang(item.id)}
                    className="h-7 w-7 border-2 border-espresso font-bold hover:bg-espresso hover:text-cream"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-bold">{item.jumlah}</span>
                  <button
                    type="button"
                    aria-label={`Tambah ${item.nama}`}
                    onClick={() => onTambah(item.id)}
                    className="h-7 w-7 border-2 border-espresso font-bold hover:bg-espresso hover:text-cream"
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-2 space-y-1 border-t-4 border-double border-espresso pt-3">
        <div className="flex justify-between text-sm font-bold">
          <dt>Jumlah pesanan</dt>
          <dd>{totalItem} item</dd>
        </div>
        <div className="flex justify-between font-display text-xl">
          <dt>TOTAL</dt>
          <dd>Rp {totalHarga.toLocaleString('id-ID')}</dd>
        </div>
      </dl>
    </section>
  )
}
