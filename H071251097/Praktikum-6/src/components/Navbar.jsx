const navMenus = [
  { id: 1, name: "Home", href: "#hero" },
  { id: 2, name: "About", href: "#about" },
  { id: 3, name: "Skills", href: "#skills" },
  { id: 4, name: "Work", href: "#projects" },
  { id: 5, name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const handleMenuClick = (menuName) => {
    console.log(`Menu diklik: ${menuName}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100">
      <div className="px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#hero" className="text-lg font-black text-[#2A1E24] tracking-tight flex items-center gap-1.5">
          Portofolio<span className="text-[#FF2A6D] text-xl animate-bounce"></span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            {navMenus.map((menu) => (
              <li key={menu.id}>
                <a
                  href={menu.href}
                  onClick={() => handleMenuClick(menu.name)}
                  className="text-[#5A4A52] font-bold text-xs hover:text-[#FF2A6D] transition-colors relative group"
                >
                  {menu.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF2A6D] transition-all group-hover:w-full rounded-full"></span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="bg-linear-to-r from-[#FF2A6D] to-[#FF69B4] text-white px-5 py-2 rounded-full font-extrabold text-xs shadow-md shadow-[#FF2A6D]/30 hover:shadow-lg hover:shadow-[#FF2A6D]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            Let's Connect ➔
          </a>
        </nav>
      </div>
    </header>
  );
}