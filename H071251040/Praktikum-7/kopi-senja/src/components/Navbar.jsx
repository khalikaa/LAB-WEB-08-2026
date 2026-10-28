function Navbar({ totalItem, totalHarga }) {
  return (
    <header className="bg-[#e7dfd9] bg-garis sticky top-0 z-20 shadow-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <a href="#menu" className="rounded-md bg-kopi-tua px-4 py-2 shadow-md">
          <span className="font-logo text-2xl leading-none text-white">Kopi Senja</span>
        </a>

        <nav className="flex items-center gap-6 text-sm font-medium text-stone-800">
          <a href="#menu" className="hover:text-kopi-karamel">Menu</a>
          <a href="#ringkasan" className="hover:text-kopi-karamel">Ringkasan</a>
        </nav>

        <div className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-kopi-tua shadow-inner">
          <span>{totalItem} item</span>
          <span className="mx-2 text-stone-300">|</span>
          <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
