import { useState } from 'react';

function FormPesan({ pesanan, onSubmitPesanan, notifikasiSukses }) {
    const [nama, setNama] = useState('');
    const [nomorMeja, setNomorMeja] = useState('');
    const [pesanError, setPesanError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (pesanan.length === 0) {
        setPesanError('Pesanan masih kosong! Silakan pilih menu terlebih dahulu.');
        return;
        }

        const namaBersih = nama.trim();
        const regexNama = /^[a-zA-Z\s]{2,50}$/;
        if (!namaBersih) {
        setPesanError('Silakan masukkan nama pelanggan.');
        return;
        }
        if (!regexNama.test(namaBersih)) {
        setPesanError('Nama pelanggan hanya boleh berisi huruf (minimal 2 karakter).');
        return;
        }

        const mejaAngka = Number(nomorMeja);
        if (!nomorMeja.toString().trim()) {
        setPesanError('Silakan masukkan nomor meja Anda.');
        return;
        }
        if (!Number.isInteger(mejaAngka) || mejaAngka < 1 || mejaAngka > 50) {
        setPesanError('Nomor meja harus berupa angka antara 1 sampai 50.');
        return;
        }
        setPesanError('');
        onSubmitPesanan({
        nama: namaBersih,
        nomorMeja: mejaAngka,
        });
        setNama('');
        setNomorMeja('');
    };

    return (
        <div className="bg-white rounded-2xl border border-coffee-200/80 p-5 shadow-sm">
        <h3 className="font-bold text-coffee-900 text-base mb-3 flex items-center gap-2">
            <span>📝</span> Informasi Meja & Pemesan
        </h3>

        {notifikasiSukses && (
            <div className="p-4 mb-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs space-y-1">
            <p className="font-bold text-sm text-emerald-800 flex items-center gap-1.5">
                <span>🎉</span> Pesanan Berhasil Dikirim!
            </p>
            <p>
                Terima kasih, <strong>{notifikasiSukses.nama}</strong>! Pesanan Anda
                sebanyak <strong>{notifikasiSukses.jumlahItem} item</strong> untuk{' '}
                <strong>Meja {notifikasiSukses.nomorMeja}</strong> sedang disiapkan.
            </p>
            <p className="text-emerald-700 font-semibold pt-1">
                Total yang harus dibayar:{' '}
                <span>Rp {notifikasiSukses.totalBayar.toLocaleString('id-ID')}</span>
            </p>
            </div>
        )}

        {pesanError && (
            <div className="p-3 mb-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{pesanError}</span>
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
            <label className="block text-xs font-semibold text-coffee-800 mb-1">
                Nama Pelanggan
            </label>
            <input
                type="text"
                placeholder="Contoh: Dimas"
                value={nama}
                onChange={(e) => {
                setNama(e.target.value);
                if (pesanError) setPesanError('');
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-coffee-300 bg-white text-coffee-900 placeholder:text-coffee-400 text-xs focus:outline-none focus:ring-2 focus:ring-coffee-700/30 focus:border-coffee-700 transition-all"
            />
            </div>

            <div>
            <label className="block text-xs font-semibold text-coffee-800 mb-1">
                Nomor Meja (1 - 50)
            </label>
            <input
                type="number"
                min="1"
                max="50"
                placeholder="Contoh: 4"
                value={nomorMeja}
                onChange={(e) => {
                setNomorMeja(e.target.value);
                if (pesanError) setPesanError('');
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-coffee-300 bg-white text-coffee-900 placeholder:text-coffee-400 text-xs focus:outline-none focus:ring-2 focus:ring-coffee-700/30 focus:border-coffee-700 transition-all"
            />
            </div>

            <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-coffee-800 hover:bg-coffee-900 active:scale-[0.99] text-white text-xs font-bold transition-all shadow hover:shadow-md cursor-pointer"
            >
            Konfirmasi & Kirim Pesanan
            </button>
        </form>
        </div>
    );
}

export default FormPesan;