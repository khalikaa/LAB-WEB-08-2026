import MenuCard from "./MenuCard.jsx";

const kategoriMenu = [
  { id: 1, nama: "Semua"},
  { id: 2, nama: "Kopi"},
  { id: 3, nama: "Non-Kopi" },
  { id: 4, nama: "Makanan" },
];

function MenuList({ daftarMenu, kategoriAktif, onPilihKategori, onTambah }) {
  return (
    <section id="menu" className="scroll-mt-24 border-t border-stone-200">
      <div className="mx-auto max-w-5xl px-6">
        <div className="-mt-px flex flex-wrap items-end justify-between gap-4 py-8">
          <h1 className="text-5xl font-light text-kopi-tua">Menu</h1>

          <div className="flex gap-1 rounded-md border border-stone-300 bg-stone-100 p-1.5 shadow-inner">
            {kategoriMenu.map((kat) => (
              <button
                key={kat.id}
                type="button"
                onClick={() => onPilihKategori(kat.nama)}
                className={`flex w-20 flex-col items-center rounded px-2 py-1.5 text-xs transition ${
                  kat.nama === kategoriAktif
                    ? "bg-white font-semibold text-kopi-tua shadow"
                    : "text-stone-500 hover:bg-white/60"
                }`}
              >
                <span className="text-2xl leading-none">{kat.ikon}</span>
                <span className="mt-1">{kat.nama}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-14 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          {daftarMenu.map((menu) => (
            <MenuCard
              key={menu.id}
              id={menu.id}
              nama={menu.nama}
              kategori={menu.kategori}
              harga={menu.harga}
              tersedia={menu.tersedia}
              deskripsi={menu.deskripsi}
              gambar={menu.gambar}
              onTambah={onTambah}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuList;
