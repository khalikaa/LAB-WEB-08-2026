function Hero({ nama, slogan, lokasi, jamBuka }) {
  return (
    <section className="border-2 border-black bg-white/40 p-6 md:p-8">
      <span className="inline-block border-2 border-black bg-oranye px-3 py-0.5 text-xs font-bold mb-4">
        Ruang baca komunitas
      </span>
      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
        {nama}
      </h1>
      <p className="max-w-xl text-sm md:text-base mb-6">{slogan}</p>
      <dl className="max-w-md text-sm border-t-2 border-black">
        <div className="flex justify-between gap-4 border-b border-black/30 py-2">
          <dt className="text-black/60">Lokasi</dt>
          <dd className="text-right font-bold">{lokasi}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-black/30 py-2">
          <dt className="text-black/60">Jam buka</dt>
          <dd className="text-right font-bold">{jamBuka}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Hero;
