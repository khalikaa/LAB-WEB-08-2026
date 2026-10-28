export default function About() {
  const personalDetails = [
    { 
      id: 1, 
      label: "Nama Lengkap", 
      value: "Zahrana Kumayla Irfan", 
      iconUrl: "https://i.pinimg.com/736x/82/47/0b/82470b4ed44c3edacfcd4201e2297050.jpg" 
    },

    { 
      id: 2, 
      label: "Pendidikan", 
      value: "Sistem Informasi, Unhas", 
      iconUrl: "https://i.pinimg.com/736x/57/f8/5d/57f85d591da374219be1a19e228bb175.jpg" 
    },

    { 
      id: 3, 
      label: "Domisili", 
      value: "Makassar, Sulawesi Selatan", 
      iconUrl: "https://i.pinimg.com/736x/fc/fd/fa/fcfdfa5f62d56ef2f05bacba9f1b0f37.jpg" 
    },
    { 
      id: 4, 
      label: "Fokus Utama", 
      value: "UI/UX Research & Front-End", 
      iconUrl: "https://i.pinimg.com/1200x/54/fd/78/54fd7888d844ddf6ad473ac790e871b9.jpg" 
    },

  ];

  return (
    <section id="about" className="py-12 md:py-16 px-6 md:px-10 bg-linear-to-b from-white via-pink-50/30 to-white">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-1.5">
          <span className="text-[#FF5E84] text-xs font-black tracking-widest uppercase bg-[#FF5E84]/10 border border-[#FF5E84]/20 px-3.5 py-1 rounded-full inline-block">
            About Me
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-[#2A1E24] tracking-tight">
            Turning complex problems into <br />
            <span className="bg-linear-to-r from-[#FF5E84] via-[#FF7597] to-[#FF8DA8] bg-clip-text text-transparent">
              intuitive realities
            </span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Quote Card dengan Maskot di Atas Tengah */}
          <div className="md:col-span-5 bg-linear-to-br from-[#FF5E84] to-[#FF8DA8] p-7 rounded-3xl text-white shadow-lg shadow-[#FF5E84]/20 flex flex-col items-center text-center justify-between relative overflow-hidden group">
            
            {/* Tanda Kutip Halus di Latar Belakang */}
            <span className="font-serif text-6xl leading-none opacity-20 absolute top-3 left-5 pointer-events-none">“</span>

            {/* GAMBAR MASKOT DI ATAS & TENGAH CARD */}
            <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center my-2 relative z-10">
              <img 
                src="/mascot.png.jpeg" 
                alt="Mascot" 
                className="w-full h-full object-contain mix-blend-multiply filter contrast-125 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* TEKS QUOTE DI BAWAH MASKOT */}
            <div className="relative z-10 space-y-3">
              <p className="font-bold text-sm md:text-base leading-relaxed">
                Bridging human empathy, clean technology, and creative storytelling.
              </p>

              <span className="text-[10px] font-extrabold text-pink-100 tracking-widest uppercase block pt-1 border-t border-white/20">
                — PERSONAL PHILOSOPHY
              </span>
            </div>

          </div>

          {/* Details Card (Kanan) */}
          <div className="md:col-span-7 bg-white/80 border border-pink-100/80 p-6 md:p-7 rounded-3xl shadow-xs flex flex-col justify-center space-y-4">
            <p className="text-[#7A6971] text-xs md:text-sm leading-relaxed font-semibold">
              Berlatar belakang Sistem Informasi dan aktif mengelola komunitas edukasi sosial, saya berfokus menciptakan alur produk yang inklusif dan efisien. Bagi saya, teknologi yang baik adalah teknologi yang bisa diakses dan bermanfaat untuk siapa saja.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {personalDetails.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-pink-50/50 border border-pink-100/70 p-3 rounded-2xl flex items-center gap-3 hover:bg-pink-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-white border border-pink-100/50 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                    <img src={item.iconUrl} alt={item.label} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A6971] font-bold block leading-none mb-1">
                      {item.label}
                    </span>
                    <p className="text-xs font-black text-[#2A1E24] leading-tight">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}