"use client";

import { useState } from "react";
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";

export default function BukuCard({ buku }) {
    const [suka, setSuka] = useState(false);

    return (
        <article className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
        <div>
            <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-md">
                {buku.kategori}
            </span>
            <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                buku.tersedia
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
            >
                {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
            </span>
            </div>

            <h3 className="text-lg font-bold text-amber-950 line-clamp-1">
            {buku.judul}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
            {buku.penulis} • {buku.tahun}
            </p>

            <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed">
            {buku.sinopsis}
            </p>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
            <div className="flex items-center justify-between">
            <button
                type="button"
                onClick={() => setSuka(!suka)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 border ${
                suka
                    ? "bg-rose-50 text-rose-600 border-rose-200"
                    : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                }`}
            >
                <span>{suka ? "❤️" : "🤍"}</span>
                <span>{suka ? "Disukai" : "Favorit"}</span>
            </button>

            <Link
                href={`/katalog/${buku.id}`}
                className="text-xs font-semibold text-amber-900 hover:text-amber-700 underline"
            >
                Lihat Detail &rarr;
            </Link>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1 border-t border-dashed border-stone-100">
            <Link
                href={`/katalog/${buku.id}/edit`}
                className="px-3 py-1 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition"
            >
                Edit
            </Link>
            <TombolHapus id={buku.id} judul={buku.judul} />
            </div>
        </div>
        </article>
    );
}