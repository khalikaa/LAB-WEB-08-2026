import React from 'react';

export default function FormPesan({ 
  nama, 
  setNama, 
  nomorMeja, 
  setNomorMeja, 
  totalJumlah, 
  totalHarga, 
  onSubmit, 
  notifikasi, 
  pesanSukses 
}) {
  return (
    <div className="space-y-2 font-['Plus_Jakarta_Sans',sans-serif]">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input 
            type="text" 
            value={nama} 
            onChange={(e) => setNama(e.target.value)} 
            placeholder="Nama Pemesan" 
            className="px-4 py-2 bg-white border-2 border-[#D7C4B7] focus:border-[#522E19] rounded-2xl outline-none text-xs font-semibold text-[#522E19] placeholder-[#A08878] w-40 sm:w-48 shadow-sm transition-all"
          />
          <input 
            type="text" 
            value={nomorMeja} 
            onChange={(e) => setNomorMeja(e.target.value)} 
            placeholder="No. Meja" 
            className="px-4 py-2 bg-white border-2 border-[#D7C4B7] focus:border-[#522E19] rounded-2xl outline-none text-xs font-semibold text-[#522E19] placeholder-[#A08878] w-24 shadow-sm transition-all"
          />
        </div>

        <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <p className="text-[10px] font-bold text-[#7A6354]">{totalJumlah} Item Keranjang</p>
            <p className="text-sm font-extrabold text-[#FF6B00]">Total: Rp {totalHarga.toLocaleString('id-ID')}</p>
          </div>

          <button 
            type="submit" 
            className="px-7 py-2 bg-[#522E19] hover:bg-[#3D2111] text-white font-bold text-xs rounded-2xl transition-all shadow-md active:scale-95 border border-[#824B2C]"
          >
            Kirim Pesanan
          </button>
        </div>
      </form>

      {notifikasi && (
        <p className="text-xs font-bold text-[#D32F2F] text-center">{notifikasi}</p>
      )}
      {pesanSukses && (
        <p className="text-xs font-bold text-[#2E7D32] text-center">{pesanSukses}</p>
      )}
    </div>
  );
}