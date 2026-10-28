function About() {
  const dataDiri = [
    { id: 1, icon: "🎓", label: "Jurusan", value: "Sistem Informasi" },
    { id: 2, icon: "🏫", label: "Kampus", value: "Universitas Hasanuddin" },
    { id: 3, icon: "📍", label: "Asal", value: "Makassar, Sulawesi Selatan" },
    { id: 4, icon: "✉️", label: "Email", value: "aqilahraihana9@gmail.com" },
  ];

  return (
    <section id="tentang" className="relative scroll-mt-20 bg-white pb-28 pt-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-lime-600 via-emerald-500 to-sky-500 bg-clip-text text-transparent sm:text-4xl">
            Tentang saya
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-14 rounded-full bg-linear-to-r from-teal-600 to-emerald-300" />
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-5">
          <div className="rounded-3xl bg-teal-600 p-8 text-white shadow-lg lg:col-span-3 lg:p-10">
            <p className="text-2xl font-bold leading-snug sm:text-3xl">
              Latar Belakang dan Minat Saya
            </p>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-teal-50">
              Saya adalah mahasiswa program studi Sistem Informasi Universitas Hasanuddin 
              dengan konsentrasi Sistem Informasi Cerdas. Saya memiliki pengalaman mendesain antarmuka web, 
              mengembangkan aplikasi, serta merancang arsitektur perangkat lunak yang responsif dan efisien.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {dataDiri.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-2xl">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="truncate font-semibold text-slate-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-10 w-full sm:h-16 fill-teal-50"
      >
        <path d="M0,40 C240,80 480,0 720,30 C960,60 1200,80 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}

export default About;