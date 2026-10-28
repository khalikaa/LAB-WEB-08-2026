function RingkasanPesanan({
    pesanan,
    totalPesanan,
    totalHarga,
    onTambah,
    onKurang,
    onHapus,
    }) {
    return (
        <div className="bg-white rounded-2xl border border-coffee-200/80 p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-coffee-100 pb-3 mb-4">
            <h3 className="font-bold text-coffee-900 text-base flex items-center gap-2">
            <span>📋</span> Ringkasan Pesanan
            </h3>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-coffee-100 text-coffee-900">
            {totalPesanan} Menu
            </span>
        </div>

        {pesanan.length === 0 ? (
            <div className="text-center py-8 text-coffee-400">
            <p className="text-3xl mb-2">🍽️</p>
            <p className="text-xs font-medium text-coffee-600">Belum ada menu yang dipilih.</p>
            <p className="text-[11px] text-coffee-400 mt-0.5">
                Tekan "+ Tambah" pada daftar menu.
            </p>
            </div>
        ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {pesanan.map((item) => (
                <div
                key={item.id}
                className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-coffee-50/60 border border-coffee-100"
                >
                <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-coffee-900 truncate">
                    {item.nama}
                    </h4>
                    <p className="text-[11px] text-coffee-600">
                    Rp {item.harga.toLocaleString('id-ID')}
                    </p>
                </div>

                <div className="flex items-center gap-1.5">
                    <button
                    type="button"
                    onClick={() => onKurang(item.id)}
                    className="w-6 h-6 rounded-md bg-coffee-200 hover:bg-coffee-300 text-coffee-800 text-xs font-bold flex items-center justify-center transition-colors"
                    >
                    -
                    </button>
                    <span className="text-xs font-bold text-coffee-900 w-5 text-center">
                    {item.jumlah}
                    </span>
                    <button
                    type="button"
                    onClick={() => onTambah(item)}
                    className="w-6 h-6 rounded-md bg-coffee-800 hover:bg-coffee-900 text-white text-xs font-bold flex items-center justify-center transition-colors"
                    >
                    +
                    </button>
                    <button
                    type="button"
                    title="Hapus menu"
                    onClick={() => onHapus(item.id)}
                    className="text-coffee-400 hover:text-rose-600 ml-1 text-xs transition-colors p-1"
                    >
                    ✕
                    </button>
                </div>
                </div>
            ))}
            </div>
        )}

        <div className="mt-4 pt-4 border-t border-coffee-100 space-y-1.5">
            <div className="flex justify-between text-xs text-coffee-600">
            <span>Jumlah Pesanan:</span>
            <span className="font-bold text-coffee-900">{totalPesanan} item</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-coffee-900">
            <span>Total Pembayaran:</span>
            <span className="text-coffee-800">
                Rp {totalHarga.toLocaleString('id-ID')}
            </span>
            </div>
        </div>
        </div>
    );
}

export default RingkasanPesanan;