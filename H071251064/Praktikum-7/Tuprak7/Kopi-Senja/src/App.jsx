import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import MenuList from "./components/MenuList.jsx";
import RingkasanPesanan from "./components/RingkasanPesanan.jsx";
import FormPesan from "./components/FormPesan.jsx";
import Footer from "./components/Footer.jsx";

const dataMenu = [
  { id: 1, nama: "Kopi Susu", kategori: "Kopi", harga: 18000, tersedia: true, deskripsi: "Espresso dengan susu segar dan gula aren." },
  { id: 2, nama: "Americano", kategori: "Kopi", harga: 15000, tersedia: true, deskripsi: "Espresso dengan air panas, rasa kuat dan bersih." },
  { id: 3, nama: "Cappuccino", kategori: "Kopi", harga: 22000, tersedia: true, deskripsi: "Espresso, susu panas, dan busa susu tebal." },
  { id: 4, nama: "Matcha Latte", kategori: "Non-Kopi", harga: 24000, tersedia: true, deskripsi: "Teh hijau matcha dengan susu." },
  { id: 5, nama: "Teh Tarik", kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa." },
  { id: 6, nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true, deskripsi: "Cokelat pekat dengan susu hangat." },
  { id: 7, nama: "Roti Bakar", kategori: "Makanan", harga: 16000, tersedia: true, deskripsi: "Roti tebal dengan selai cokelat dan keju." },
  { id: 8, nama: "Pisang Goreng", kategori: "Makanan", harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju." },
  { id: 9, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, tersedia: true, deskripsi: "Nasi goreng kampung dengan telur mata sapi." },
];

const daftarKategori = [
  { id: 1, nama: "Semua" },
  { id: 2, nama: "Kopi" },
  { id: 3, nama: "Non-Kopi" },
  { id: 4, nama: "Makanan" },
];

function App() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [pesanan, setPesanan] = useState([]);
  const [terbenam, setTerbenam] = useState(false);

  useEffect(() => {
    const jeda = setTimeout(() => setTerbenam(true), 800);
    return () => clearTimeout(jeda);
  }, []);

  const menuTampil =
    kategoriAktif === "Semua"
      ? dataMenu
      : dataMenu.filter((m) => m.kategori === kategoriAktif);

  const itemPesanan = pesanan.map((p) => ({
    ...dataMenu.find((m) => m.id === p.id),
    jumlah: p.jumlah,
  }));
  const jumlahItem = itemPesanan.reduce((s, i) => s + i.jumlah, 0);
  const totalHarga = itemPesanan.reduce((s, i) => s + i.jumlah * i.harga, 0);

  function tambah(id) {
    const ada = pesanan.find((p) => p.id === id);
    if (ada) {
      setPesanan(pesanan.map((p) => (p.id === id ? { ...p, jumlah: p.jumlah + 1 } : p)));
    } else {
      setPesanan([...pesanan, { id, jumlah: 1 }]);
    }
  }

  function kurang(id) {
    setPesanan(
      pesanan
        .map((p) => (p.id === id ? { ...p, jumlah: p.jumlah - 1 } : p))
        .filter((p) => p.jumlah > 0)
    );
  }

  function kosongkanPesanan() {
    setPesanan([]);
  }

  return (
    <div className="min-h-screen">
      <Navbar
        daftarKategori={daftarKategori}
        kategoriAktif={kategoriAktif}
        onPilihKategori={setKategoriAktif}
        jumlahItem={jumlahItem}
        totalHarga={totalHarga}
      />

      <header className="relative overflow-hidden bg-[linear-gradient(to_bottom,#1e1530_0%,#3b2160_55%,#7a2d6b_100%)]">
        <div className="relative z-20 mx-auto max-w-6xl px-5 pb-60 pt-12 sm:pt-16">
          <h1 className="max-w-xl font-judul text-5xl leading-[1.05] [text-shadow:1px_1px_0_#b02a64,2px_2px_0_#b02a64,3px_3px_0_#a8244f,4px_4px_0_#8f1f47,5px_5px_0_#7a1b3d,8px_12px_20px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl">
            Pesan sendiri, sambil menunggu senja.
          </h1>
          <p className="mt-6 max-w-md text-lg text-kertas/80">
            Pilih menu, tekan Tambah, lalu isi nama dan nomor mejamu. Pesanan langsung sampai ke dapur.
          </p>
        </div>

        <div
          onTransitionEnd={() => setTerbenam(!terbenam)}
          className={`absolute bottom-48 right-4 z-0 h-44 w-44 drop-shadow-[0_0_36px_rgba(240,80,127,0.55)] transition-transform duration-[6000ms] ease-in-out motion-reduce:!translate-y-[10%] motion-reduce:transition-none sm:right-24 sm:h-72 sm:w-72 ${
            terbenam ? "translate-y-[25%]" : "translate-y-0"
          }`}
          aria-hidden="true"
        >
          <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffe9a8_0,#f6c453_28%,#f0507f_78%,#a8244f_100%)] [-webkit-mask:linear-gradient(#000_0_58%,transparent_58%)_top/100%_100%_no-repeat,repeating-linear-gradient(to_bottom,transparent_0_7px,#000_7px_16px)_bottom/100%_42%_no-repeat]" />
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 z-10 h-48 overflow-hidden border-t-2 border-rona bg-malam shadow-[0_-2px_28px_#F0507F]"
          aria-hidden="true"
        >
          <div className="absolute -left-1/2 -right-1/2 top-0 h-[220%] origin-top bg-[linear-gradient(rgba(240,80,127,0.55)_2px,transparent_2px),linear-gradient(90deg,rgba(240,80,127,0.55)_2px,transparent_2px)] bg-[length:56px_56px] [transform:perspective(260px)_rotateX(62deg)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-malam to-transparent" />
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1fr_400px]">
        <MenuList menu={menuTampil} pesanan={pesanan} onTambah={tambah} />
        <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          <RingkasanPesanan
            itemPesanan={itemPesanan}
            jumlahItem={jumlahItem}
            totalHarga={totalHarga}
            onTambah={tambah}
            onKurang={kurang}
          />
          <FormPesan jumlahItem={jumlahItem} onKirim={kosongkanPesanan} />
        </aside>
      </main>

      <Footer />
    </div>
  );
}

export default App;