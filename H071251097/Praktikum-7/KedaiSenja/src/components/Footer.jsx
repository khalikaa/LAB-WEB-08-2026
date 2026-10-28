import React from 'react';
import RingkasanPesanan from './RingkasanPesanan';
import FormPesan from './FormPesan';

export default function Footer({ 
  itemsDipesan, 
  nama, 
  setNama, 
  nomorMeja, 
  setNomorMeja, 
  totalJumlah, 
  totalHarga, 
  onSubmitPesan, 
  notifikasi, 
  pesanSukses 
}) {
  return (
    <footer className="bg-[#F7F2EE] border-t border-[#E8D8CE] px-8 py-3 z-30 shadow-inner space-y-2 font-['Plus_Jakarta_Sans',sans-serif]">
      <RingkasanPesanan itemsDipesan={itemsDipesan} />
      
      <FormPesan 
        nama={nama}
        setNama={setNama}
        nomorMeja={nomorMeja}
        setNomorMeja={setNomorMeja}
        totalJumlah={totalJumlah}
        totalHarga={totalHarga}
        onSubmit={onSubmitPesan}
        notifikasi={notifikasi}
        pesanSukses={pesanSukses}
      />
    </footer>
  );
}