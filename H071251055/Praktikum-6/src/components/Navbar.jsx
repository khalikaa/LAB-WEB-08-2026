const menuItems = [
  { id: 1, label: 'Beranda', target: '#beranda' },
  { id: 2, label: 'Tentang', target: '#tentang' },
  { id: 3, label: 'Keahlian', target: '#keahlian' },
  { id: 4, label: 'Galeri', target: '#galeri' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-tinta bg-kertas/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
        <a
          href="#beranda"
          className="font-display text-2xl font-extrabold tracking-tight text-tinta"
        >
          fharel<span className="text-karang">.</span>
        </a>

        <ul className="flex items-center gap-1 text-sm font-semibold sm:gap-2 sm:text-base">
          {menuItems.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.target}
                onClick={() => console.log(menu.label)}
                className="block rounded-full px-3 py-1.5 transition-colors hover:bg-tinta hover:text-kertas sm:px-4"
              >
                {menu.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
