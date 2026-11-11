export default function Hero({ nama, slogan, lokasiJam }) {
    return (
        <section className="bg-gradient-to-br from-amber-200/80 via-amber-100 to-amber-200/70 border border-amber-300/90 rounded-3xl p-8 sm:p-12 shadow-sm text-center sm:text-left">
        <div className="max-w-2xl space-y-3">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-950 bg-amber-300/80 border border-amber-400/50 rounded-full">
            Perpustakaan &amp; Ruang Baca Komunitas
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-950 tracking-tight">
            {nama}
            </h1>
            <p className="text-sm sm:text-base text-amber-900/90 font-medium leading-relaxed pt-1">
            {slogan}
            </p>
        </div>

        <div className="mt-8 pt-5 border-t border-amber-300/80 text-xs sm:text-sm text-amber-900/80 flex items-center justify-center sm:justify-start gap-2">
            <span>📍</span>
            <span>{lokasiJam}</span>
        </div>
        </section>
    );
}