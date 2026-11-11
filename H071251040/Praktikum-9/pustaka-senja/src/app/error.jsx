"use client";

// Ditampilkan jika terjadi error saat membaca database (misalnya PostgreSQL belum menyala).
export default function Error({ reset }) {
  return (
    <div className="border-2 border-black p-8 text-center">
      <h1 className="mb-3 text-xl font-bold">Terjadi kesalahan</h1>
      <p className="mb-6 text-sm text-black/70">
        Data tidak dapat dimuat. Pastikan PostgreSQL sudah berjalan dan
        DATABASE_URL di .env.local sudah benar.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="border-2 border-black bg-oranye px-5 py-2.5 text-sm font-bold hover:bg-kuning"
      >
        Coba lagi
      </button>
    </div>
  );
}
