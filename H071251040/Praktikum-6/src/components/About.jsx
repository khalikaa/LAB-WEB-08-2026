function About() {
  const dataDiri = [
    { id: 1, label: "Nama", value: "Kurnia Natalia Bela" },
    { id: 2, label: "Kampus", value: "Universitas Hasanuddin" },
    { id: 3, label: "Jurusan", value: "Sistem Informasi" },
    { id: 4, label: "Kota", value: "Makassar" },
    { id: 5, label: "Email", value: "kurnianataliabela@gmail.com" },
  ];

  const warna = ["bg-kuning", "bg-biru", "bg-white", "bg-merah", "bg-kuning"];

  return (
    <section id="about" className="border-y-4 border-black bg-white px-5 py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl">Tentang Saya</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed sm:text-lg">
            Halo! Saya mahasiswa yang sedang belajar membangun website dengan
            React dan Tailwind CSS. Saya senang mengubah ide jadi tampilan yang
            bisa dipakai orang, dan sedang berlatih membuat proyek portofolio
            pertama saya.
          </p>
        </div>

        <ul className="m-0 grid list-none gap-3 p-0">
          {dataDiri.map((item) => (
            <li
              key={item.id}
              className={`flex items-center justify-between gap-4 border-4 border-black px-4 py-3 shadow-[5px_5px_0_#000] ${warna[item.id - 1]} ${item.id === 4 ? "text-white" : ""}`}
            >
              <span className="font-display">{item.label}</span>
              <span className="text-right font-bold">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default About;
