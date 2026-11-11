"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Beranda", path: "/" },
  { label: "Katalog", path: "/katalog" },
  { label: "Usulan Buku", path: "/usulan" },
];

export default function Navbar() {
  const pathname = usePathname();

  const aktif = (path) =>
    path === "/"
      ? pathname === "/"
      : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-yellow-300">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border-2 border-black bg-pink-400 font-display text-lg font-extrabold shadow-[3px_3px_0_#000]">
            PS
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight">
            Pustaka Senja
          </span>
        </Link>

        <ul className="flex items-center gap-2">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                aria-current={aktif(item.path) ? "page" : undefined}
                className={`block border-2 border-black px-3 py-1.5 text-sm font-bold transition ${
                  aktif(item.path)
                    ? "bg-black text-yellow-300 shadow-[3px_3px_0_#ec4899]"
                    : "bg-white shadow-[3px_3px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#000]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}