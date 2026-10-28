import FormPesan from "./FormPesan.jsx";
function RingkasanPesanan({ itemPesanan, totalItem, totalHarga, onTambah, onKurang, onKirim }) {
  return (
    <section id="ringkasan" className="scroll-mt-24">
      <h2 className="mb-4 text-3xl font-light text-kopi-tua">Ringkasan Pesanan</h2>

      <div className="rounded-md border border-stone-300 bg-white p-5 shadow-sm">
        {itemPesanan.length === 0 ? (
          <p className="py-6 text-center text-sm text-stone-500">
            Belum ada pesanan. Tekan Tambah pada menu yang kamu mau.
          </p>
        ) : (
          <ul className="divide-y divide-stone-200">
            {itemPesanan.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-judul uppercase tracking-wide text-kopi-karamel">{item.nama}</p>
                  <p className="text-xs text-stone-500">
                    Rp {item.harga.toLocaleString("id-ID")} x {item.jumlah}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onKurang(item.id)}
                    aria-label={`Kurangi ${item.nama}`}
                    className="h-7 w-7 rounded border border-stone-300 bg-stone-100 hover:bg-white"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-sm">{item.jumlah}</span>
                  <button
                    type="button"
                    onClick={() => onTambah(item.id)}
                    aria-label={`Tambah ${item.nama}`}
                    className="h-7 w-7 rounded border border-stone-300 bg-stone-100 hover:bg-white"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center justify-between border-t-2 border-kopi-tua pt-4">
          <span className="text-sm text-stone-600">Total ({totalItem} item)</span>
          <span className="text-xl font-semibold text-kopi-tua">
            Rp {totalHarga.toLocaleString("id-ID")}
          </span>
        </div>

        <FormPesan totalItem={totalItem} onKirim={onKirim} />
      </div>
    </section>
  );
}

export default RingkasanPesanan;
