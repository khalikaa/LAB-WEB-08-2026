import MenuCard from './MenuCard'

export default function MenuList({ daftarMenu, pesanan, onTambah }) {
  return (
    <ul className="grid gap-x-6 gap-y-9 md:grid-cols-2 xl:grid-cols-2">
      {daftarMenu.map((menu) => (
        <li key={menu.id}>
          <MenuCard
            id={menu.id}
            nama={menu.nama}
            kategori={menu.kategori}
            harga={menu.harga}
            tersedia={menu.tersedia}
            deskripsi={menu.deskripsi}
            jumlahDipesan={pesanan[menu.id] || 0}
            onTambah={onTambah}
          />
        </li>
      ))}
    </ul>
  )
}
