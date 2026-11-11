"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Katalog", path: "/katalog" },
    { name: "Usulan Buku", path: "/usulan" },
  ];

  return (
    <header className="w-full h-25 md:h-27.5 bg-stone-950/95 border-b-4 border-amber-600/60 text-amber-50 flex items-center justify-between px-8 md:px-16 z-50 shadow-[0_15px_40px_rgba(0,0,0,0.95)] backdrop-blur-md shrink-0">
      <Link href="/" className="flex items-center gap-4 group">
        <span className="text-4xl md:text-5xl transition-transform group-hover:scale-110">📚</span>
        <span className="font-serif font-black text-3xl md:text-4xl text-amber-100 tracking-wide drop-shadow-md">
          Pustaka Senja
        </span>
      </Link>

      <nav className="flex items-center gap-8 md:gap-12">
        {navLinks.map((link) => {
          const isActive =
            link.path === "/"
              ? pathname === "/"
              : pathname.startsWith(link.path);

          return (
            <Link
              key={link.path}
              href={link.path}
              className={`text-xl md:text-2xl font-serif font-black tracking-wider transition-all relative py-2 ${
                isActive ? "text-amber-400 scale-105" : "text-amber-200/70 hover:text-amber-100"
              }`}
            >
              {link.name}
              {isActive && (
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.9)]" />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}