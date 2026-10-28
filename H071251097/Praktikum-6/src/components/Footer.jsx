export default function Footer() {
  const currentYear = 2026;
  const authorName = "Zahrana Kumayla";

  return (
    <footer className="pb-8 border-t border-white/50 bg-[#FFF5F8]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs text-[#7A6971]">
        <p>&copy; {currentYear} {authorName}. Personal Portfolio. Crafted with passion & code.</p>
        <a
          href="#hero"
          className="w-9 h-9 rounded-full border border-white/90 bg-white/70 flex items-center justify-center font-bold text-[#2A1E24] hover:bg-linear-to-r hover:from-[#FF5E84] hover:to-[#FF8DA8] hover:text-white transition-all shadow-sm"
          aria-label="Back to top"
        >
          ↑
        </a>
      </div>
    </footer>
  );
}

