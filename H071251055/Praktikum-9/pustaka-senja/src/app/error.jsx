"use client";

// Batas error untuk seluruh aplikasi, misalnya saat PostgreSQL belum menyala atau DATABASE_URL salah.
export default function Galat({ reset }) {
  return (
    <div className="mx-auto max-w-xl border border-ink/20 bg-card p-8 text-center shadow-[0_14px_22px_-14px_rgba(60,30,20,0.5)]">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-stamp">Gangguan laci katalog</p>
      <h1 className="mt-3 font-display text-3xl font-light text-dusk">Data belum bisa dimuat</h1>
      <p className="mt-3 text-ink-soft">
        Aplikasi tidak dapat membaca atau menyimpan data ke database. Pastikan PostgreSQL berjalan dan
        DATABASE_URL di .env.local sudah benar.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 border-b-4 border-gold bg-dusk px-5 py-2 font-mono text-xs uppercase tracking-[0.16em] text-paper hover:bg-dusk-soft"
      >
        Coba Lagi
      </button>
    </div>
  );
}
