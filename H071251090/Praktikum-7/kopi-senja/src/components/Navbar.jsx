function Navbar({ totalPesanan, totalHarga }) {
    return (
        <header className="sticky top-0 z-30 bg-coffee-900 text-coffee-50 shadow-md border-b border-coffee-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-coffee-800/80 flex items-center justify-center text-xl shadow-inner">
                ☕
            </div>
            <div>
                <h1 className="text-lg md:text-xl font-bold tracking-tight text-white leading-tight">
                Kedai Kopi Senja
                </h1>
                <p className="text-[11px] text-coffee-200 font-medium">
                Sistem Pemesanan Mandiri Meja
                </p>
            </div>
            </div>

            <div className="flex items-center gap-2 bg-coffee-800/60 px-3.5 py-1.5 rounded-xl border border-coffee-700/40">
            <span className="text-base">🛒</span>
            <div className="text-right">
                <div className="text-xs font-bold text-white leading-none">
                {totalPesanan} Pesanan
                </div>
                <div className="text-[11px] text-coffee-200 font-medium">
                Rp {totalHarga.toLocaleString('id-ID')}
                </div>
            </div>
            </div>

        </div>
        </header>
    );
}

export default Navbar;