const dataDiri = [
  { id: 1, label: 'Nama', nilai: 'Fharell' },
  { id: 2, label: 'NIM', nilai: 'H071251055' },
  { id: 3, label: 'Program Studi', nilai: 'S1 Sistem Informasi' },
  { id: 4, label: 'Fakultas', nilai: 'Matematika dan Ilmu Pengetahuan Alam' },
  { id: 5, label: 'Universitas', nilai: 'Universitas Hasanuddin' },
  { id: 6, label: 'Minat', nilai: 'Pengembangan web, analisis algoritma, UI/UX' },
]

export default function About() {
  return (
    <section id="tentang" className="border-y-2 border-tinta bg-laut text-kertas">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-semibold uppercase tracking-widest text-pasir">01 / Tentang</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Belajar sambil membangun.
          </h2>
          <p className="mt-6 leading-relaxed text-kertas/85">
            Saya mahasiswa Sistem Informasi di Universitas Hasanuddin. Yang sekarang lagi mengembangkan diri untuk bisa
            menjadi IT consultant yang hebat di masa depan.
          </p>
          <p className="mt-4 leading-relaxed text-kertas/85">
            Lewat praktikum pemrograman web, saya mulai menyambungkan keduanya: logika yang
            rapi di belakang, tampilan yang jelas di depan.
          </p>
        </div>

        <dl className="lg:col-span-7">
          {dataDiri.map((item) => (
            <div
              key={item.id}
              className="grid gap-1 border-t border-kertas/30 py-4 last:border-b sm:grid-cols-3 sm:gap-6"
            >
              <dt className="font-semibold uppercase tracking-wider text-pasir">{item.label}</dt>
              <dd className="text-lg font-medium sm:col-span-2">{item.nilai}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
