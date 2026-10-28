import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MenuList from './components/MenuList';
import Footer from './components/Footer';

const DATA_MENU = [
  { id: 1, 
    nama: 'Kopi Susu', 
    kategori: 'Kopi', 
    harga: 18000, 
    tersedia: true, 
    deskripsi: 'Espresso dengan susu segar dan gula aren.', 
    gambar: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 2, 
    nama: 'Americano', 
    kategori: 'Kopi', 
    harga: 15000, 
    tersedia: true, 
    deskripsi: 'Espresso dengan air panas, rasa kuat dan bersih.', 
    gambar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 3, 
    nama: 'Cappuccino', 
    kategori: 'Kopi', 
    harga: 22000, 
    tersedia: true, 
    deskripsi: 'Espresso, susu panas, dan busa susu tebal.', 
    gambar: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 4, 
    nama: 'Matcha Latte', 
    kategori: 'Non-Kopi', 
    harga: 24000, 
    tersedia: true, 
    deskripsi: 'Teh hijau matcha dengan susu.', 
    gambar: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 5, 
    nama: 'Teh Tarik', 
    kategori: 'Non-Kopi', 
    harga: 14000, 
    tersedia: false, 
    deskripsi: 'Teh susu yang ditarik hingga berbusa.', 
    gambar: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 6, 
    nama: 'Cokelat Panas', 
    kategori: 'Non-Kopi', 
    harga: 20000, 
    tersedia: true, 
    deskripsi: 'Cokelat pekat dengan susu hangat.', 
    gambar: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 7, 
    nama: 'Roti Bakar', 
    kategori: 'Makanan', 
    harga: 16000, 
    tersedia: true, 
    deskripsi: 'Roti tebal dengan selai cokelat dan keju.', 
    gambar: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 8, 
    nama: 'Pisang Goreng', 
    kategori: 'Makanan', 
    harga: 12000, 
    tersedia: false, 
    deskripsi: 'Pisang goreng renyah dengan taburan keju.', 
    gambar: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 9, 
    nama: 'Nasi Goreng', 
    kategori: 'Makanan', 
    harga: 25000, 
    tersedia: true, 
    deskripsi: 'Nasi goreng kampung dengan telur mata sapi.', 
    gambar: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80' 
  }
];

export default function App() {
  const [kategoriAktif, setKategoriAktif] = useState('Semua');
  const [activeItem, setActiveItem] = useState(DATA_MENU[0]);
  const [selectedSize, setSelectedSize] = useState('Tall');
  const [pesanan, setPesanan] = useState({});
  const [nama, setNama] = useState('');
  const [nomorMeja, setNomorMeja] = useState('');
  const [notifikasi, setNotifikasi] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');
  const [startIndex, setStartIndex] = useState(0);

  const menuTersaring = kategoriAktif === 'Semua' 
    ? DATA_MENU 
    : DATA_MENU.filter((item) => item.kategori === kategoriAktif);

  const handleSetKategori = (kategori) => {
    setKategoriAktif(kategori);
    setStartIndex(0);
    const menuBaru = kategori === 'Semua' 
      ? DATA_MENU 
      : DATA_MENU.filter((item) => item.kategori === kategori);
    if (menuBaru.length > 0) {
      setActiveItem(menuBaru[0]);
    }
  };

  const jumlahItemAktif = pesanan[activeItem.id] || 0;
  const totalJumlah = Object.values(pesanan).reduce((acc, curr) => acc + curr, 0);
  const totalHarga = Object.entries(pesanan).reduce((acc, [id, qty]) => {
    const item = DATA_MENU.find((m) => m.id === Number(id));
    return acc + (item ? item.harga * qty : 0);
  }, 0);

  const itemsDipesan = Object.entries(pesanan).map(([id, qty]) => {
    const item = DATA_MENU.find((m) => m.id === Number(id));
    return { ...item, qty };
  });

  const handleTambah = (id) => {
    setPesanan((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleKurang = (id) => {
    setPesanan((prev) => {
      const copy = { ...prev };
      if (copy[id] > 1) copy[id] -= 1;
      else delete copy[id];
      return copy;
    });
  };

  const handlePrevMenu = () => setStartIndex((prev) => Math.max(0, prev - 1));
  const handleNextMenu = () => setStartIndex((prev) => Math.min(menuTersaring.length - 3, prev + 1));

  const handleSubmitPesan = (e) => {
    e.preventDefault();
    if (totalJumlah === 0) {
      setNotifikasi('Keranjang pesanan masih kosong!');
      setPesanSukses('');
      return;
    }
    if (!nama.trim() || !nomorMeja.trim()) {
      setNotifikasi('Nama dan nomor meja wajib diisi!');
      setPesanSukses('');
      return;
    }

    if (!/^\d+$/.test(nomorMeja.trim())){
      setNotifikasi('Nomor meja harus berupa angka');
      setPesanSukses('');
      return;
    }

    setNotifikasi('');
    setPesanSukses(`Pesanan dikirim! Terima kasih ${nama} (Meja ${nomorMeja}). Total: Rp ${totalHarga.toLocaleString('id-ID')}`);
    setPesanan({});
    setNama('');
    setNomorMeja('');
  };

  return (
    <div className="w-dvw h-dvh bg-[#eac9b2] flex items-center justify-center p-3 sm:p-5 font-['Plus_Jakarta_Sans',sans-serif] select-none">
      
      <div className="relative max-w-full h-full max-h-165 bg-white rounded-[36px] overflow-hidden shadow-2xl flex flex-col justify-between border-4 border-white">
        {/* kasih perbaiki tampilan cardnya*/}
        <Navbar totalJumlah={totalJumlah} />

        <main className="relative flex-1 grid grid-cols-12 overflow-hidden items-stretch">
          
          <div className="col-span-6 px-8 py-4 flex flex-col justify-center gap-4 z-10 my-auto">
            <div className="space-y-1.5">
              <div>
                <span className="inline-block px-3.5 py-1 bg-[#F4ECE6] text-[#522E19] font-extrabold text-xs rounded-full uppercase tracking-wider">
                  {activeItem.kategori}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1528] tracking-tight leading-tight">
                {activeItem.nama}
              </h1>
              <p className="text-xs sm:text-sm font-normal text-slate-500 leading-relaxed max-w-sm">
                {activeItem.deskripsi}
              </p>
            </div>

            <MenuList 
              dataMenu={menuTersaring}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              startIndex={startIndex}
              onPrev={handlePrevMenu}
              onNext={handleNextMenu}
              kategoriAktif={kategoriAktif}
              setKategoriAktif={handleSetKategori}
            />
          </div>

          <div className="col-span-6 relative flex flex-col justify-center items-end p-8 text-white z-10 my-auto h-full">
            <div className="absolute inset-0 bg-[#522E19] rounded-l-[200px] scale-y-125 translate-x-10 pointer-events-none z-0 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop&q=80" 
                alt="Cafe Ambiance" 
                className="w-full h-full object-cover opacity-15 mix-blend-overlay"
              />
            </div>

            <div className="absolute -left-16 top-1/2 -translate-y-1/2 z-30 w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center drop-shadow-[0_25px_40px_rgba(0,0,0,0.45)]">
              <img 
                src={activeItem.gambar} 
                alt={activeItem.nama} 
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-2"
              />
              {!activeItem.tersedia && (
                <div className="absolute inset-0 bg-black/75 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white">
                  <span className="bg-[#D32F2F] text-white text-xs font-bold px-4 py-2 rounded-full uppercase border border-white shadow-lg">
                    STOK HABIS
                  </span>
                </div>
              )}
            </div>

            <div className="relative z-10 w-52 space-y-6 text-center mr-4">
              <div className="space-y-2">
                <p className="text-sm font-extrabold text-amber-200 uppercase tracking-widest">Select Size</p>
                <div className="flex justify-between items-end px-1">
                  {[
                    { name: 'Short', height: 'h-9', width: 'w-7' },
                    { name: 'Tall', height: 'h-11', width: 'w-8' },
                    { name: 'Grande', height: 'h-14', width: 'w-10' }
                  ].map((sz) => (
                    <button
                      key={sz.name}
                      type="button"
                      onClick={() => setSelectedSize(sz.name)}
                      className={`flex flex-col items-center gap-1.5 transition-all ${
                        selectedSize === sz.name ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-80'
                      }`}
                    >
                      <div className={`${sz.height} ${sz.width} border-2 border-white rounded-t-lg rounded-b-sm flex items-center justify-center relative shadow-md`}>
                        <div className="w-full h-0.5 bg-white/50 absolute top-1.5"></div>
                      </div>
                      <span className="text-xs font-bold tracking-wide">{sz.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-200">Best Seller</p>
                <div className="flex justify-center gap-1 text-amber-300 text-base">★ ★ ★ ★ ☆</div>
                <p className="text-3xl font-extrabold tracking-tight text-white pt-1">
                  Rp {activeItem.harga.toLocaleString('id-ID')} /-
                </p>
              </div>

              <div className="space-y-2.5">
                {activeItem.tersedia ? (
                  <>
                    <button 
                      type="button"
                      onClick={() => handleTambah(activeItem.id)}
                      className="w-full py-3 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-bold rounded-full shadow-lg transition-all active:scale-95 border-2 border-white"
                    >
                      Add to cart
                    </button>

                    <div className="w-full bg-white text-[#0B1528] rounded-full py-1.5 px-4 flex items-center justify-between shadow-inner">
                      <button 
                        type="button"
                        onClick={() => handleKurang(activeItem.id)}
                        className="text-lg font-bold text-stone-600 hover:text-black px-2"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold">{jumlahItemAktif}</span>
                      <button 
                        type="button"
                        onClick={() => handleTambah(activeItem.id)}
                        className="text-lg font-bold text-stone-600 hover:text-black px-2"
                      >
                        +
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-3 bg-stone-700 text-stone-300 text-xs font-bold rounded-full text-center border border-stone-500">
                    Tidak Tersedia
                  </div>
                )}
              </div>
            </div>

          </div>

        </main>

        <Footer 
          itemsDipesan={itemsDipesan}
          nama={nama}
          setNama={setNama}
          nomorMeja={nomorMeja}
          setNomorMeja={setNomorMeja}
          totalJumlah={totalJumlah}
          totalHarga={totalHarga}
          onSubmitPesan={handleSubmitPesan}
          notifikasi={notifikasi}
          pesanSukses={pesanSukses}
        />
      </div>

    </div>
  );
}