import Link from "next/link";

export default function BukuTidakDitemukan({ id }) {
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold text-rose-400 mb-4">
        Buku dengan ID &quot;{id}&quot; tidak ditemukan!
      </h1>
      <Link href="/katalog" className="text-amber-400 hover:underline">
        &larr; Kembali ke Katalog Buku
      </Link>
    </div>
  );
}
