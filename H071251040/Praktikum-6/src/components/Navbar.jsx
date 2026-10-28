function Navbar() {
  const menu = ["Home", "About", "Skills", "Gallery", "Contact"];

  const handleMenuClick = (namaMenu) => {
    console.log("Menu diklik:", namaMenu);
  };

  return (
    <nav className="sticky top-0 z-50 border-b-4 border-black bg-kuning">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-3 sm:flex-row">
        <h2 className="-rotate-2 border-2 border-black bg-white px-3 py-1 font-display text-lg shadow-[3px_3px_0_#000]">
          MyPortfolio
        </h2>
        <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0">
          {menu.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={() => handleMenuClick(item)}
                className="block border-2 border-black bg-white px-3 py-1 text-sm font-bold text-black no-underline shadow-[2px_2px_0_#000] transition hover:-translate-y-0.5 hover:bg-biru hover:shadow-[4px_4px_0_#000]"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
