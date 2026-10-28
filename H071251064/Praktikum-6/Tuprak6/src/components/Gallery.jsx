import foto1 from "../assets/gallery/foto1.jpeg";
import foto2 from "../assets/gallery/foto2.jpeg";
import foto3 from "../assets/gallery/foto3.jpeg";
import foto4 from "../assets/gallery/foto4.jpeg";

function Gallery() {
  const galeriFoto = [
    { id: 1, src: foto1, judul: "Web Portofolio" },
    { id: 2, src: foto2, judul: "NailSense App" },
    { id: 3, src: foto3, judul: "Web Taman Wisata Lokal" },
    { id: 4, src: foto4, judul: "Web Katalog Produk Anyaman Nusantara" },
  ];

  return (
    <section id="galeri" className="relative scroll-mt-20 bg-teal-50 pb-28 pt-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-lime-600 via-emerald-500 to-sky-500 bg-clip-text text-transparent sm:text-4xl">
            Galeri
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-14 rounded-full bg-linear-to-r from-teal-600 to-emerald-300" />
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {galeriFoto.map((foto) => (
            <figure
              key={foto.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-teal-500/20 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="overflow-hidden">
                <img
                  src={foto.src}
                  alt={foto.judul}
                  className="aspect-4/3 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <figcaption className="bg-teal-400 p-3 text-center text-sm font-semibold text-gray-900 sm:text-base">
                {foto.judul}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;