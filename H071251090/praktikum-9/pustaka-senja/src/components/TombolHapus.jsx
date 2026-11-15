"use client";

import { useTransition } from "react";
import { hapusBuku } from "@/app/katalog/actions";

export default function TombolHapus({ id, judul }) {
    const [isPending, startTransition] = useTransition();

    function handleHapus() {
        const yakin = window.confirm(`Apakah Anda yakin ingin menghapus buku "${judul}"?`);
        if (yakin) {
        startTransition(async () => {
            await hapusBuku(id);
        });
        }
    }

    return (
        <button
        type="button"
        onClick={handleHapus}
        disabled={isPending}
        className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition disabled:opacity-50"
        >
        {isPending ? "Menghapus..." : "Hapus"}
        </button>
    );
}