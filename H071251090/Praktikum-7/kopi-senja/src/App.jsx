import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import MenuList from './components/MenuList.jsx';
import RingkasanPesanan from './components/RingkasanPesanan.jsx';
import FormPesan from './components/FormPesan.jsx';
import Footer from './components/Footer.jsx';

const menuData = [
  {
    id: 1,
    nama: 'Kopi Susu',
    kategori: 'Kopi',
    harga: 18000,
    tersedia: true,
    deskripsi: 'Espresso dengan susu segar dan gula aren.',
  },
  {
    id: 2,
    nama: 'Americano',
    kategori: 'Kopi',
    harga: 15000,
    tersedia: true,
    deskripsi: 'Espresso dengan air panas, rasa kuat dan bersih.',
  },
  {
    id: 3,
    nama: 'Cappuccino',
    kategori: 'Kopi',
    harga: 22000,
    tersedia: true,
    deskripsi: 'Espresso, susu panas, dan busa susu tebal.',
  },
  {
    id: 4,
    nama: 'Matcha Latte',
    kategori: 'Non-Kopi',
    harga: 24000,
    tersedia: true,
    deskripsi: 'Teh hijau matcha dengan susu.',
  },
  {
    id: 5,
    nama: 'Teh Tarik',
    kategori: 'Non-Kopi',
    harga: 14000,
    tersedia: false,
    deskripsi: 'Teh susu yang ditarik hingga berbusa.',
  },
  {
    id: 6,
    nama: 'Cokelat Panas',
    kategori: 'Non-Kopi',
    harga: 20000,
    tersedia: true,
    deskripsi: 'Cokelat pekat dengan susu hangat.',
  },
  {
    id: 7,
    nama: 'Roti Bakar',
    kategori: 'Makanan',
    harga: 16000,
    tersedia: true,
    deskripsi: 'Roti tebal dengan selai cokelat dan keju.',
  },
  {
    id: 8,
    nama: 'Pisang Goreng',
    kategori: 'Makanan',
    harga: 12000,
    tersedia: false,
    deskripsi: 'Pisang goreng renyah dengan taburan keju.',
  },
  {
    id: 9,
    nama: 'Nasi Goreng',
    kategori: 'Makanan',
    harga: 25000,
    tersedia: true,
    deskripsi: 'Nasi goreng kampung dengan telur mata sapi.',
  },
];

function App() {
  const [kategoriAktif, setKategoriAktif] = useState('Semua');
  const [pesanan, setPesanan] = useState([]);
  const [notifikasiSukses, setNotifikasiSukses] = useState(null);

  const totalPesanan = pesanan.reduce((total, item) => total + item.jumlah, 0);
  const totalHarga = pesanan.reduce((total, item) => total + item.harga * item.jumlah, 0);

  const menuFiltered =
    kategoriAktif === 'Semua'
      ? menuData
      : menuData.filter((item) => item.kategori === kategoriAktif);

  const handleTambahPesanan = (menu) => {
    if (menu.tersedia === false) return;

    if (notifikasiSukses) setNotifikasiSukses(null);

    setPesanan((prevPesanan) => {
      const itemAda = prevPesanan.find((item) => item.id === menu.id);
      if (itemAda) {
        return prevPesanan.map((item) =>
          item.id === menu.id ? { ...item, jumlah: item.jumlah + 1 } : item
        );
      }
      return [...prevPesanan, { id: menu.id, nama: menu.nama, harga: menu.harga, jumlah: 1 }];
    });
  };

  const handleKurangPesanan = (id) => {
    setPesanan((prevPesanan) => {
      const itemAda = prevPesanan.find((item) => item.id === id);
      if (!itemAda) return prevPesanan;
      if (itemAda.jumlah === 1) {
        return prevPesanan.filter((item) => item.id !== id);
      }
      return prevPesanan.map((item) =>
        item.id === id ? { ...item, jumlah: item.jumlah - 1 } : item
      );
    });
  };

  const handleHapusPesanan = (id) => {
    setPesanan((prevPesanan) => prevPesanan.filter((item) => item.id !== id));
  };

  const handleSubmitPesanan = ({ nama, nomorMeja }) => {
    setNotifikasiSukses({
      nama,
      nomorMeja,
      jumlahItem: totalPesanan,
      totalBayar: totalHarga,
    });
    setPesanan([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-coffee-50">
      <Navbar
        totalPesanan={totalPesanan}
        totalHarga={totalHarga}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <section className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-coffee-200/80 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-coffee-900">Katalog Menu</h2>
                <p className="text-xs text-coffee-500">
                  Menampilkan menu kategori: <span className="font-semibold text-coffee-700">{kategoriAktif}</span>
                </p>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {['Semua', 'Kopi', 'Non-Kopi', 'Makanan'].map((kat) => (
                  <button
                    key={kat}
                    type="button"
                    onClick={() => setKategoriAktif(kat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      kategoriAktif === kat
                        ? 'bg-coffee-800 text-white shadow-sm'
                        : 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200 hover:text-coffee-900'
                    }`}
                  >
                    {kat}
                  </button>
                ))}
              </div>
            </div>

            <MenuList
              menuList={menuFiltered}
              onTambahPesanan={handleTambahPesanan}
            />
          </section>

          <section className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24">
            <RingkasanPesanan
              pesanan={pesanan}
              totalPesanan={totalPesanan}
              totalHarga={totalHarga}
              onTambah={handleTambahPesanan}
              onKurang={handleKurangPesanan}
              onHapus={handleHapusPesanan}
            />

            <FormPesan
              pesanan={pesanan}
              onSubmitPesanan={handleSubmitPesanan}
              notifikasiSukses={notifikasiSukses}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;