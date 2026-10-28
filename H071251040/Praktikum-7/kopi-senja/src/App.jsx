import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import MenuList from "./components/MenuList.jsx";
import RingkasanPesanan from "./components/RingkasanPesanan.jsx";
import FormPesan from "./components/FormPesan";
import Footer from "./components/Footer.jsx";
import kopiSusu from "./assets/menu/kopi.jpg";
import americano from "./assets/menu/kopi.jpg";
import cappuccino from "./assets/menu/kopi.jpg";
import matchaLatte from "./assets/menu/matcha.jpg";
import tehTarik from "./assets/menu/coklat.jpg";
import cokelatPanas from "./assets/menu/coklat.jpg";
import rotiBakar from "./assets/menu/roti.jpg";
import pisangGoreng from "./assets/menu/pisang.jpg";
import nasiGoreng from "./assets/menu/nasi.jpg";

const dataMenu = [
  { id: 1, nama: "Kopi Susu", kategori: "Kopi", harga: 18000, tersedia: true, deskripsi: "Espresso dengan susu segar dan gula aren.", gambar: kopiSusu },
  { id: 2, nama: "Americano", kategori: "Kopi", harga: 15000, tersedia: true, deskripsi: "Espresso dengan air panas, rasa kuat dan bersih.", gambar: americano },
  { id: 3, nama: "Cappuccino", kategori: "Kopi", harga: 22000, tersedia: true, deskripsi: "Espresso, susu panas, dan busa susu tebal.", gambar: cappuccino },
  { id: 4, nama: "Matcha Latte", kategori: "Non-Kopi", harga: 24000, tersedia: true, deskripsi: "Teh hijau matcha dengan susu.", gambar: matchaLatte },
  { id: 5, nama: "Teh Tarik", kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa.", gambar: tehTarik },
  { id: 6, nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true, deskripsi: "Cokelat pekat dengan susu hangat.", gambar: cokelatPanas },
  { id: 7, nama: "Roti Bakar", kategori: "Makanan", harga: 16000, tersedia: true, deskripsi: "Roti tebal dengan selai cokelat dan keju.", gambar: rotiBakar },
  { id: 8, nama: "Pisang Goreng", kategori: "Makanan", harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju.", gambar: pisangGoreng },
  { id: 9, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, tersedia: true, deskripsi: "Nasi goreng kampung dengan telur mata sapi.", gambar: nasiGoreng },
];

function App() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [pesanan, setPesanan] = useState([]);

  const menuTampil =
    kategoriAktif === "Semua"
      ? dataMenu
      : dataMenu.filter((menu) => menu.kategori === kategoriAktif);

  const itemPesanan = pesanan.map((p) => {
    const menu = dataMenu.find((m) => m.id === p.id);
    return { ...menu, jumlah: p.jumlah };
  });
  const totalItem = itemPesanan.reduce((total, item) => total + item.jumlah, 0);
  const totalHarga = itemPesanan.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  function tambahItem(id) {
    const menu = dataMenu.find((m) => m.id === id);
    if (!menu.tersedia) return;
    const sudahAda = pesanan.some((p) => p.id === id);
    if (sudahAda) {
      setPesanan(pesanan.map((p) => (p.id === id ? { ...p, jumlah: p.jumlah + 1 } : p)));
    } else {
      setPesanan([...pesanan, { id, jumlah: 1 }]);
    }
  }

  function kurangiItem(id) {
    setPesanan(
      pesanan
        .map((p) => (p.id === id ? { ...p, jumlah: p.jumlah - 1 } : p))
        .filter((p) => p.jumlah > 0)
    );
  }

  function kirimPesanan() {
    setPesanan([]);
  }

  return (
    <div className="min-h-screen bg-white font-jost text-stone-700 antialiased">
      <Navbar totalItem={totalItem} totalHarga={totalHarga} />
      <MenuList
        daftarMenu={menuTampil}
        kategoriAktif={kategoriAktif}
        onPilihKategori={setKategoriAktif}
        onTambah={tambahItem}
      />
      <div className="bg-kopi-krem py-12">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 md:grid-cols-2">
          <RingkasanPesanan
            itemPesanan={itemPesanan}
            totalItem={totalItem}
            totalHarga={totalHarga}
            onTambah={tambahItem}
            onKurang={kurangiItem}
            onKirim={kirimPesanan}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
