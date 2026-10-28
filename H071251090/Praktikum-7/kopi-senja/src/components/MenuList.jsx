import MenuCard from './MenuCard.jsx';

function MenuList({ menuList, onTambahPesanan }) {
    if (menuList.length === 0) {
        return (
        <div className="text-center py-12 bg-white rounded-2xl border border-coffee-200">
            <p className="text-coffee-500 text-sm">Tidak ada menu yang tersedia di kategori ini.</p>
        </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {menuList.map((menu) => (
            <MenuCard
            key={menu.id}
            menu={menu}
            onTambah={onTambahPesanan}
            />
        ))}
        </div>
    );
}

export default MenuList;