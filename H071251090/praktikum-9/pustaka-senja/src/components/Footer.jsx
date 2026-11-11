export default function Footer() {
    return (
        <footer className="border-t border-amber-200 bg-amber-50 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center text-sm text-amber-900/70 space-y-2">
            <p className="font-semibold text-amber-950">
            Pustaka Senja &copy; {new Date().getFullYear()}
            </p>
            <p>Ruang Baca Komunitas Kampus — Berbagi Literasi, Merajut Asa.</p>
        </div>
        </footer>
    );
}