function Navbar() {
    const menuList = ['Home', 'About', 'Skills', 'Gallery'];

    const handleMenuClick = (menu) => {
        console.log(`Navigasi ke menu: ${menu}`);
        const targetId = menu.toLowerCase();
        const element = document.getElementById(targetId);
        if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <button type="button" onClick={() => handleMenuClick('Home')} className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 cursor-pointer">
            MyPortofolio
            </button>
            <div className="flex items-center gap-4 sm:gap-6">
            {menuList.map((item, index) => (
                <button key={index} type="button" onClick={() => handleMenuClick(item)} className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                {item}
                </button>
            ))}
            </div>
        </div>
        </nav>
    );
}

export default Navbar;