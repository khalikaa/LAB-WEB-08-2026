"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const daftarMenu = [
  {
    nama: "Beranda",
    path: "/",
    ikon: (
      <g>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </g>
    ),
  },
  {
    nama: "Katalog",
    path: "/katalog",
    ikon: (
      <path d="M4 19V5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13" />
    ),
  },
  {
    nama: "Usulan Buku",
    path: "/usulan",
    ikon: (
      <g>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v8M8 12h8" />
      </g>
    ),
  },
];

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex md:flex-col items-center gap-2 md:gap-6 border-b-2 md:border-b-0 md:border-r-2 border-black px-3 py-3 md:w-28 md:py-6 md:shrink-0">
      <Link
        href="/"
        className="flex md:flex-col items-center gap-2 md:text-center mr-auto md:mr-0"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill="#ff7a2f"
          stroke="#000"
          strokeWidth="1.5"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2c1 4 5 6 5 11a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-7 1-10z" />
        </svg>
        <span className="text-xs font-bold leading-tight">
          Pustaka
          <br className="hidden md:block" /> Senja
        </span>
      </Link>

      <ul className="flex md:flex-col gap-1 md:gap-5 md:mt-4">
        {daftarMenu.map((item) => {
          const isActive =
            item.path === "/"
              ? pathname === "/"
              : pathname.startsWith(item.path);

          return (
            <li key={item.path}>
              <Link
                href={item.path}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center gap-1 px-2 py-1 text-[11px] leading-tight text-center ${
                  isActive
                    ? "text-oranye font-bold border-b-2 border-oranye"
                    : "text-black hover:text-oranye border-b-2 border-transparent"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {item.ikon}
                </svg>
                {item.nama}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
