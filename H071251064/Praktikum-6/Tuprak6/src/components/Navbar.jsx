function Navbar() {
  const nama = "Aqilah";

  const menu = [
    { id: 1, label: "Beranda", href: "#beranda" },
    { id: 2, label: "Tentang", href: "#tentang" },
    { id: 3, label: "Keahlian", href: "#keahlian" },
    { id: 4, label: "Galeri", href: "#galeri" },
  ];

  const handleClick = (label) => {
    console.log(label);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-600 bg-teal-400 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-5 py-3 sm:flex-row sm:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-black">
          {nama}
          <span className="text-teal-700">.</span>
        </h2>

        <ul className="flex w-full justify-center gap-1 overflow-x-auto sm:w-auto">
          {menu.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={() => handleClick(item.label)}
                className="block rounded-full px-4 py-2 text-md font-medium text-zinc-900 transition-colors hover:bg-teal-50 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;