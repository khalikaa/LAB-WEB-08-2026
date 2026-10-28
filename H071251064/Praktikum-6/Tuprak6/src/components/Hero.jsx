function Hero() {
  const handleClick = () => {
    console.log("Tombol Lihat Galeri diklik");
  };

  return (
    <section
      id="beranda"
      className="relative scroll-mt-20 bg-linear-to-b from-teal-50 to-teal-100"
    >
      <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-28">
        <div className="order-2 text-center md:order-1 md:text-left">
          <p className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-medium text-teal-800">
            Halo, selamat datang
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Saya{" "}
            <span className="bg-linear-to-r from-emerald-700 via-green-500 to-teal-400 bg-clip-text text-transparent">
              Aqilah Raihana
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-slate-600 md:mx-0">
            Mahasiswa Sistem Informasi Universitas Hasanuddin yang berfokus pada pengembangan web interaktif, analisis sistem, dan solusi berbasis intelijen informasi.
          </p>
          <a
            href="#galeri"
            onClick={handleClick}
            className="mt-8 inline-block rounded-full bg-teal-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 transition duration-300 hover:-translate-y-0.5 hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Lihat Galeri
          </a>
        </div>

        <div className="order-1 mx-auto w-56 sm:w-72 md:order-2 md:w-80">
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2rem bg-teal-300" />
            <img
              src="/foto5.jpg"
              alt="Foto profil"
              className="relative aspect-square w-full rounded-2rem border-4 border-white object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-10 w-full sm:h-16 fill-white"
      >
        <path d="M0,40 C240,80 480,0 720,30 C960,60 1200,80 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}

export default Hero;