"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const daftarMenu = [
    { nama: "Beranda", path: "/" },
    { nama: "Katalog", path: "/katalog" },
    { nama: "Usulan Buku", path: "/usulan" },
    ];

    export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 bg-amber-50/90 backdrop-blur border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-amber-950 flex items-center gap-2">
            <span>📚</span>
            <span>Pustaka Senja</span>
            </Link>

            <ul className="flex items-center gap-3 sm:gap-6">
            {daftarMenu.map((item) => {
                const isActive =
                item.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.path);

                return (
                <li key={item.path}>
                    <Link
                    href={item.path}
                    className={
                        isActive
                        ? "text-amber-950 font-semibold border-b-2 border-amber-800 pb-1 text-sm sm:text-base"
                        : "text-amber-900/70 hover:text-amber-950 transition text-sm sm:text-base"
                    }
                    >
                    {item.nama}
                    </Link>
                </li>
                );
            })}
            </ul>
        </div>
        </nav>
    );
}