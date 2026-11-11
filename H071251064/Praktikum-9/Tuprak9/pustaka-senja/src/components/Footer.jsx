export default function Footer() {
  return (
    <footer className="border-t-2 border-black bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left">
        <p className="font-display text-lg font-extrabold text-yellow-300">
          Pustaka Senja
        </p>
        <p className="text-sm text-white/70">
          &copy; 2026 Pustaka Senja. Dikelola oleh Nabila.
        </p>
      </div>
    </footer>
  );
}