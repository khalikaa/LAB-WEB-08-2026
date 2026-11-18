export default function Footer() {
  return (
    <footer className="mt-10 bg-dusk text-paper/80">
      <div
        aria-hidden="true"
        className="h-1.5 bg-[linear-gradient(to_right,#b5475a,#d9622b,#e9b25a)]"
      />
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-7 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="font-display text-xl font-light italic text-paper">Pustaka Senja</p>
        <p className="font-mono text-xs uppercase tracking-[0.14em]">
          © 2026 Pustaka Senja · Ruang baca &amp; perpustakaan komunitas
        </p>
      </div>
    </footer>
  );
}
