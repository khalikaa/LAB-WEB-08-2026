import foto1 from '../assets/gallery/foto-1.jpg'
import foto2 from '../assets/gallery/foto-2.jpg'
import foto3 from '../assets/gallery/foto-3.jpg'
import foto4 from '../assets/gallery/foto-4.jpg'
const daftarFoto = [
  { id: 1, src: foto1, judul: 'Kegiatan kampus', keterangan: 'Gweh Lagi Berhimpun' },
  { id: 2, src: foto2, judul: 'Proyek dan tugas', keterangan: 'Proyek Akhir' },
  { id: 3, src: foto3, judul: 'Bersama teman', keterangan: 'Sistem Informasi 25' },
  { id: 4, src: foto4, judul: 'Momen favorit', keterangan: 'Gaya Bebas di Puncak' },
]

export default function Gallery() {
  return (
    <section id="galeri" className="border-t-2 border-tinta bg-kertas-tua">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="font-semibold uppercase tracking-widest text-karang">03 / Galeri</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
          Sedikit potongan tentang saya.
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {daftarFoto.map((foto) => (
            <figure
              key={foto.id}
              className="border-2 border-tinta bg-kertas p-3 transition-transform odd:rotate-[-1deg] even:rotate-[1deg] hover:rotate-0"
            >
              <img
                src={foto.src}
                alt={foto.judul}
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
              <figcaption className="px-1 pb-1 pt-3">
                <p className="font-display text-lg font-bold">{foto.judul}</p>
                <p className="text-sm text-tinta/70">{foto.keterangan}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
