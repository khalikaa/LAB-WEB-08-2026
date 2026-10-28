function RingkasanPesanan({ itemPesanan, jumlahItem, totalHarga, onTambah, onKurang }) {
  const tombol = "grid h-7 w-7 place-items-center rounded-full border border-tinta/30 font-bold leading-none hover:bg-tinta hover:text-kertas";

  return (
    <div className="lg:justify-end">
      <div className="[filter:drop-shadow(0_14px_14px_rgba(0,0,0,0.45))] lg:[transform-origin:right_center] lg:[transform:rotateY(-5deg)]">
        <section
          className="bg-kertas px-6 pb-8 pt-6 text-tinta [mask:conic-gradient(from_-45deg_at_bottom,#0000,#000_1deg_89deg,#0000_90deg)_50%/18px_100%]"
          aria-label="Ringkasan pesanan"
        >
          <h2 className="font-judul text-2xl">Pesananmu</h2>

          {itemPesanan.length === 0 ? (
            <p className="py-6 text-tinta/60">Belum ada pesanan. Tekan Tambah pada menu yang kamu mau.</p>
          ) : (
            <ul className="mt-3 divide-y divide-dashed divide-tinta/25">
              {itemPesanan.map((i) => (
                <li key={i.id} className="flex items-center gap-3 py-3">
                  <div className="flex-1">
                    <p className="font-medium">{i.nama}</p>
                    <p className="text-sm text-tinta/60">Rp {i.harga.toLocaleString("id-ID")}</p>
                  </div>
                  <button className={tombol} onClick={() => onKurang(i.id)} aria-label={`Kurangi ${i.nama}`}>−</button>
                  <span className="w-5 text-center font-bold">{i.jumlah}</span>
                  <button className={tombol} onClick={() => onTambah(i.id)} aria-label={`Tambah ${i.nama}`}>+</button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2 border-t-2 border-dashed border-tinta/40 pt-3">
            <div className="flex justify-between text-sm text-tinta/70">
              <span>Jumlah item</span>
              <span>{jumlahItem}</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="font-medium">Total</span>
              <span className="font-judul text-2xl">Rp {totalHarga.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RingkasanPesanan;