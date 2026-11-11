export default function Hero({ nama, slogan, lokasi, jamBuka, children }) {
  const tumpukan = [
    "bg-pink-400 -rotate-y-20 -rotate-z-4",
    "bg-yellow-300 -rotate-y-20 rotate-z-3 translate-x-4",
    "bg-lime-300 -rotate-y-20 -rotate-z-2 -translate-x-2",
  ];

  return (
    <section className="border-2 border-black bg-sky-300 p-8 shadow-[10px_10px_0_#000] sm:p-12">
      <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight sm:text-6xl">
            {nama}
          </h1>
          <p className="mt-5 max-w-prose text-lg font-medium leading-relaxed">
            {slogan}
          </p>
          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex flex-wrap gap-2">
              <dt className="border-2 border-black bg-white px-2 font-bold">Lokasi</dt>
              <dd className="font-medium">{lokasi}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="border-2 border-black bg-white px-2 font-bold">Jam buka</dt>
              <dd className="font-medium">{jamBuka}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-4">{children}</div>
        </div>

        {/* tumpukan buku 3D */}
        <div
          aria-hidden="true"
          className="hidden flex-col items-center gap-3 perspective-[900px] md:flex"
        >
          {tumpukan.map((kelas) => (
            <div
              key={kelas}
              className={`h-14 w-64 border-2 border-black shadow-[8px_8px_0_#000] ${kelas}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}