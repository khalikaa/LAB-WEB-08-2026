import { useState } from 'react';

function MenuCard({ menu, onTambah }) {
    const [bukaDetail, setBukaDetail] = useState(false);

    return (
        <div
        className={`flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 shadow-sm ${
            menu.tersedia
            ? 'bg-white border-coffee-200 hover:shadow-md hover:border-coffee-400'
            : 'bg-coffee-50/50 border-coffee-200/60 opacity-60'
        }`}
        >
        <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-coffee-100 text-coffee-800">
                {menu.kategori}
            </span>
            <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                menu.tersedia
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-700'
                }`}
            >
                {menu.tersedia ? 'Tersedia' : 'Habis'}
            </span>
            </div>

            <h3 className="text-base font-bold text-coffee-900 leading-snug">
            {menu.nama}
            </h3>
            <p className="text-coffee-800 font-extrabold text-sm mt-1 mb-3">
            Rp {menu.harga.toLocaleString('id-ID')}
            </p>

            <button
            type="button"
            onClick={() => setBukaDetail(!bukaDetail)}
            className="text-xs font-semibold text-coffee-700 hover:text-coffee-900 mb-3 flex items-center gap-1 transition-colors focus:outline-none"
            >
            <span>{bukaDetail ? 'Sembunyikan Detail' : 'Lihat Detail'}</span>
            <span className="text-[10px]">{bukaDetail ? '▲' : '▼'}</span>
            </button>

            {bukaDetail && (
            <p className="text-xs text-coffee-700 bg-coffee-50 p-3 rounded-xl border border-coffee-200/80 mb-3 leading-relaxed transition-all">
                {menu.deskripsi}
            </p>
            )}
        </div>

        <button
            type="button"
            disabled={!menu.tersedia}
            onClick={() => onTambah(menu)}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            menu.tersedia
                ? 'bg-coffee-800 text-white hover:bg-coffee-900 active:scale-[0.98] shadow-sm hover:shadow'
                : 'bg-coffee-200 text-coffee-400 cursor-not-allowed'
            }`}
        >
            <span>{menu.tersedia ? '+ Tambah' : 'Stok Habis'}</span>
        </button>
        </div>
    );
}

export default MenuCard;