"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { path: "/", label: "Beranda" },
  { path: "/katalog", label: "Katalog" },
  { path: "/usulan", label: "Usulan Buku" },
];

export default function Navbar() {
  const pathname = usePathname();

  // "/" hanya aktif jika persis "/", menu lain aktif juga untuk sub-rute
  // (contoh: /katalog/4 tetap menandai Katalog).
  const isAktif = (path) =>
    path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(path + "/");

  return (
    <header className="sticky top-0 z-20 border-b border-gold/40 bg-dusk text-paper shadow-[0_6px_18px_-8px_rgba(20,8,24,0.6)]">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 pt-3 sm:px-6">
        <Link href="/" className="flex items-end gap-3 pb-2">
          {/* tiga punggung buku sebagai logo */}
          <span aria-hidden="true" className="flex h-6 items-end gap-[3px]">
            <span className="h-3.5 w-[5px] bg-rose" />
            <span className="h-6 w-[5px] bg-gold" />
            <span className="h-[18px] w-[5px] bg-ember" />
          </span>
          <span className="font-display text-2xl font-light italic leading-none tracking-tight">
            Pustaka Senja
          </span>
        </Link>

        <ul className="flex gap-5 sm:gap-7">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                aria-current={isAktif(item.path) ? "page" : undefined}
                className={
                  "block border-b-[3px] pb-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors " +
                  (isAktif(item.path)
                    ? "border-gold text-gold"
                    : "border-transparent text-paper/75 hover:border-paper/40 hover:text-paper")
                }
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
