export default function Hero() {
  const handleHeroButtonClick = () => {
    console.log("Tombol 'Explore Work' diklik oleh pengguna!");
  };

  const stats = [
    { id: 1, number: "4+", label: "Proyek Pilihan" },
    { id: 2, number: "1st", label: "FLS2N Malut" },
    { id: 3, number: "UI/UX Design", label: "Unhas 2026" },
  ];

  return (
    <section id="hero" className="relative py-8 md:py-12 px-6 md:px-12 overflow-hidden bg-linear-to-b from-pink-50/50 to-white">
      {/* Pola Dots Latar Belakang Halus */}
      <div className="absolute inset-0 bg-[radial-gradient(#FF2A6D_1px,transparent_1px)] bg-size-[20px_20px] opacity-10 pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        {/* Konten Kiri */}
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FF2A6D]/10 border border-[#FF2A6D]/30 px-3.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#FF2A6D] animate-ping"></span>
            <span className="text-[#FF2A6D] text-xs font-black tracking-wider uppercase">
              Welcome to My Space
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[#2A1E24] leading-[1.12] tracking-tight">
            Designing <br />
            <span className="bg-linear-to-r from-[#FF2A6D] via-[#FF5E84] to-[#FF69B4] bg-clip-text text-transparent">
              Exceptional
            </span> <br />
            Digital Experiences
          </h1>

          <p className="text-[#6E5A64] text-xs md:text-sm max-w-lg leading-relaxed font-semibold">
            Mahasiswa Sistem Informasi Unhas | UI/UX Research, Software Architecture & Social Leadership | Menciptakan solusi digital yang berdampak nyata.
          </p>

          {/* Tombol Aksi */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={handleHeroButtonClick}
              className="bg-linear-to-r from-[#FF2A6D] to-[#FF69B4] text-white px-6 py-2.5 rounded-full font-extrabold text-xs shadow-lg shadow-[#FF2A6D]/35 hover:shadow-xl hover:shadow-[#FF2A6D]/45 hover:-translate-y-0.5 transition-all"
            >
              Explore Work ➔
            </button>
            <a
              href="#contact"
              className="bg-white text-[#2A1E24] border-2 border-pink-200 px-6 py-2.5 rounded-full font-extrabold text-xs hover:border-[#FF2A6D] hover:text-[#FF2A6D] shadow-sm transition-all"
            >
              Contact Me ✉
            </a>
          </div>

          {/* Minimalist Stats */}
          <div className="pt-4 border-t border-pink-100 grid grid-cols-3 gap-3 max-w-md">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-pink-50/80 border border-pink-200/80 p-2.5 rounded-2xl text-center">
                <span className="block text-base font-black text-[#FF2A6D]">{stat.number}</span>
                <span className="text-[10px] font-bold text-[#6E5A64]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Frame Profil Kanan */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div className="w-full max-w-77.5 bg-linear-to-tr from-pink-200/60 via-pink-100/40 to-white p-3 rounded-4xl shadow-xl shadow-[#FF2A6D]/15 border border-pink-200 relative group">
            <div className="relative rounded-3xl overflow-hidden aspect-4/5">
              <img
                src="/foto-profil.jpeg"
                alt="Foto Profil"
                className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badge Floating 1 */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-pink-100 flex items-center gap-2 shadow-md">
                <span className="text-base"></span>
                <div>
                  <strong className="block text-[10px] font-black text-[#2A1E24] leading-none">
                    UI/UX Enthusiast
                  </strong>
                  <span className="text-[8px] text-[#6E5A64] font-bold">Empathy & Solution</span>
                </div>
              </div>

              {/* Badge Floating 2 */}
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-pink-100 flex items-center gap-2 shadow-md">
                <span className="text-base"></span>
                <div>
                  <strong className="block text-[10px] font-black text-[#2A1E24] leading-none">
                    Social Tech
                  </strong>
                  <span className="text-[8px] text-[#6E5A64] font-bold">Impactful Products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}