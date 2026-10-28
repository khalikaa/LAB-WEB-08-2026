import { useState } from 'react'
import Navbar from './components/Navbar'
import MenuList from './components/MenuList'
import RingkasanPesanan from './components/RingkasanPesanan'
import FormPesan from './components/FormPesan'
import Footer from './components/Footer'

// Satu-satunya sumber data menu. Komponen anak hanya menerimanya lewat props.
const MENU = [
  { id: 1, nama: 'Kopi Susu', kategori: 'Kopi', harga: 18000, tersedia: true, deskripsi: 'Espresso dengan susu segar dan gula aren.' },
  { id: 2, nama: 'Americano', kategori: 'Kopi', harga: 15000, tersedia: true, deskripsi: 'Espresso dengan air panas, rasa kuat dan bersih.' },
  { id: 3, nama: 'Cappuccino', kategori: 'Kopi', harga: 22000, tersedia: true, deskripsi: 'Espresso, susu panas, dan busa susu tebal.' },
  { id: 4, nama: 'Matcha Latte', kategori: 'Non-Kopi', harga: 24000, tersedia: true, deskripsi: 'Teh hijau matcha dengan susu.' },
  { id: 5, nama: 'Teh Tarik', kategori: 'Non-Kopi', harga: 14000, tersedia: false, deskripsi: 'Teh susu yang ditarik hingga berbusa.' },
  { id: 6, nama: 'Cokelat Panas', kategori: 'Non-Kopi', harga: 20000, tersedia: true, deskripsi: 'Cokelat pekat dengan susu hangat.' },
  { id: 7, nama: 'Roti Bakar', kategori: 'Makanan', harga: 16000, tersedia: true, deskripsi: 'Roti tebal dengan selai cokelat dan keju.' },
  { id: 8, nama: 'Pisang Goreng', kategori: 'Makanan', harga: 12000, tersedia: false, deskripsi: 'Pisang goreng renyah dengan taburan keju.' },
  { id: 9, nama: 'Nasi Goreng', kategori: 'Makanan', harga: 25000, tersedia: true, deskripsi: 'Nasi goreng kampung dengan telur mata sapi.' },
]

const DAFTAR_KATEGORI = ['Semua', 'Kopi', 'Non-Kopi', 'Makanan']

export default function App() {
  const [kategoriAktif, setKategoriAktif] = useState('Semua')
  // pesanan: objek { [idMenu]: jumlah }
  const [pesanan, setPesanan] = useState({})
  // terkirim: null atau { nama, meja } setelah pesanan berhasil dikirim
  const [terkirim, setTerkirim] = useState(null)

  // Data turunan (dihitung dari state, tidak disimpan di state lain)
  const menuTampil =
    kategoriAktif === 'Semua'
      ? MENU
      : MENU.filter((menu) => menu.kategori === kategoriAktif)

  const itemPesanan = MENU.filter((menu) => pesanan[menu.id] > 0).map((menu) => ({
    id: menu.id,
    nama: menu.nama,
    harga: menu.harga,
    jumlah: pesanan[menu.id],
    subtotal: menu.harga * pesanan[menu.id],
  }))

  const totalItem = itemPesanan.reduce((jumlah, item) => jumlah + item.jumlah, 0)
  const totalHarga = itemPesanan.reduce((total, item) => total + item.subtotal, 0)

  const tambahItem = (id) => {
    const menu = MENU.find((m) => m.id === id)
    if (!menu || !menu.tersedia) return
    setPesanan((sebelumnya) => ({ ...sebelumnya, [id]: (sebelumnya[id] || 0) + 1 }))
    setTerkirim(null)
  }

  const kurangiItem = (id) => {
    setPesanan((sebelumnya) => {
      const jumlahBaru = (sebelumnya[id] || 0) - 1
      if (jumlahBaru > 0) return { ...sebelumnya, [id]: jumlahBaru }
      return Object.fromEntries(
        Object.entries(sebelumnya).filter(([kunci]) => Number(kunci) !== id),
      )
    })
  }

  const kirimPesanan = (nama, meja) => {
    setTerkirim({ nama, meja })
    setPesanan({})
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        daftarKategori={DAFTAR_KATEGORI}
        kategoriAktif={kategoriAktif}
        onPilihKategori={setKategoriAktif}
        totalItem={totalItem}
        totalHarga={totalHarga}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {terkirim && (
          <div
            role="status"
            className="mb-8 flex items-start justify-between gap-4 border-[3px] border-espresso bg-amber p-4 shadow-hard"
          >
            <div>
              <p className="font-display text-2xl text-espresso">Terima kasih, {terkirim.nama}!</p>
              <p className="mt-1 font-bold text-espresso">
                Pesananmu untuk meja {terkirim.meja} sudah kami terima dan segera diracik.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTerkirim(null)}
              aria-label="Tutup ucapan terima kasih"
              className="border-2 border-espresso bg-cream px-2 font-bold hover:bg-espresso hover:text-cream"
            >
              ✕
            </button>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <section aria-labelledby="judul-menu">
            <div className="mb-8 border-y-4 border-double border-espresso py-3 text-center">
              <h1 id="judul-menu" className="font-display text-3xl tracking-wide sm:text-4xl">
                Menu Hari Ini
              </h1>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.25em] text-amberdeep">
                {kategoriAktif === 'Semua' ? 'Semua sajian' : kategoriAktif} · {menuTampil.length} pilihan
              </p>
            </div>

            <MenuList daftarMenu={menuTampil} pesanan={pesanan} onTambah={tambahItem} />
          </section>

          <aside className="space-y-8 lg:sticky lg:top-40 lg:self-start">
            <RingkasanPesanan
              daftarItem={itemPesanan}
              totalItem={totalItem}
              totalHarga={totalHarga}
              onTambah={tambahItem}
              onKurang={kurangiItem}
            />
            <FormPesan jumlahItem={totalItem} onKirim={kirimPesanan} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
