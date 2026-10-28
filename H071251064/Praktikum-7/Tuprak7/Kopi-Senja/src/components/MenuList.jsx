import MenuCard from "./MenuCard.jsx";

function MenuList({ menu, pesanan, onTambah }) {
  return (
    <section id="menu" className="scroll-mt-32 sm:scroll-mt-20" aria-label="Daftar menu">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-judul text-3xl">Menu hari ini</h2>
        <span className="text-kertas/60">{menu.length} pilihan</span>
      </div>

      <ul className="grid items-start gap-7 sm:grid-cols-2">
        {menu.map((m) => {
          const dipesan = pesanan.find((p) => p.id === m.id);
          return (
            <MenuCard
              key={m.id}
              menu={m}
              jumlahDipesan={dipesan ? dipesan.jumlah : 0}
              onTambah={onTambah}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default MenuList;