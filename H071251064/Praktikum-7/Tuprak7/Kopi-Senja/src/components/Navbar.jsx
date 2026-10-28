const daftarKategori = [
  { id: 1, nama: "Semua" },
  { id: 2, nama: "Kopi" },
  { id: 3, nama: "Non-Kopi" },
  { id: 4, nama: "Makanan" },
];

function Navbar({ daftarKategori, kategoriAktif, onPilihKategori, jumlahItem, totalHarga }) {
  return (
    <nav className="sticky top-0 z-30 border-b border-kertas/10 bg-malam/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
        <span className="font-judul text-xl text-emas">Kopi Senja</span>

        <div className="order-3 flex w-full gap-3 overflow-x-auto px-1 pb-2 pt-1 sm:order-none sm:w-auto sm:flex-1" aria-label="Kategori menu">
          {daftarKategori.map((k) => (
            <a
              key={k.id}
              href="#menu"
              onClick={() => onPilihKategori(k.nama)}
              aria-current={kategoriAktif === k.nama ? "true" : undefined}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-150 ${
                kategoriAktif === k.nama
                  ? "translate-y-[3px] bg-emas text-tinta"
                  : "bg-senja text-kertas/85 shadow-tombol-senja hover:-translate-y-0.5"
              }`}
            >
              {k.nama}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3 rounded-full bg-tinta/70 py-1.5 pl-4 pr-2 text-sm shadow-lekuk" aria-live="polite">
          <span>{jumlahItem} item</span>
          <span className="rounded-full bg-rona px-3 py-1 font-bold text-white shadow-tombol-senja">
            Rp {totalHarga.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;