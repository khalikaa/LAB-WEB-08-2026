const daftarKeahlian = [
  'JavaScript',
  'React',
  'Tailwind CSS',
  'HTML dan CSS',
  'Analisis Algoritma',
  'Desain Jaringan',
  'Git dan GitHub',
]

export default function Skills() {
  return (
    <section id="keahlian" className="mx-auto max-w-6xl px-5 py-20">
      <p className="font-semibold uppercase tracking-widest text-karang">02 / Keahlian</p>
      <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
        Yang sedang saya pelajari dan gunakan.
      </h2>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {daftarKeahlian.map((keahlian, index) => (
          <li
            key={index}
            className="group flex items-baseline gap-4 border-2 border-tinta bg-kertas-tua p-5 transition-colors hover:bg-tinta hover:text-kertas"
          >
            <span className="font-display text-3xl font-extrabold text-karang">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-lg font-semibold">{keahlian}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
