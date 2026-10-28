function Hero() {
  const handleHubungi = () => {
    console.log("Tombol diklik!, Selamat Datang!");
  };

  return (
    <section id="home" className="relative overflow-hidden px-5 py-12 md:py-20">
      {/* dekorasi */}
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-kuning md:h-112 md:w-md" />
      <div className="absolute left-6 top-24 hidden text-5xl text-biru md:block">✱</div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <span className="inline-block -rotate-3 border-2 border-black bg-white px-3 py-1 text-sm font-bold shadow-[3px_3px_0_#000]">
            Creative Portfolio
          </span>
          <h1 className="mt-5 font-display text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
            <span className="text-merah">HALO!</span>
            <br />
            SAYA
            <br />
            BELLA
          </h1>
          <p className="mt-6 max-w-md border-l-4 border-black pl-4 text-base font-medium sm:text-lg">
            Mahasiswa Sistem Informasi yang suka membuat tampilan website yang
            rapi, berwarna, dan nyaman dipakai.
          </p>
          <button
            onClick={handleHubungi}
            className="mt-8 cursor-pointer border-4 border-black bg-merah px-6 py-3 font-display text-white shadow-[6px_6px_0_#000] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#000]"
          >
            Lihat Karya
          </button>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <img
            src="/images/profile1.jpeg"
            alt="Foto profil"
            className="aspect-square w-full rounded-[2.5rem] border-4 border-black bg-biru object-cover shadow-[10px_10px_0_#000]"
          />
          <div className="absolute -bottom-5 -left-3 -rotate-6 border-4 border-black bg-biru px-4 py-2 font-display text-sm text-white shadow-[4px_4px_0_#000] sm:-left-8">
            Ngoding itu
            <br />
            asyik!
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
