import foto1 from "../assets/gallery/Foto1.jpeg";
import foto2 from "../assets/gallery/Foto2.jpeg";
import foto3 from "../assets/gallery/Foto3.jpeg";
import foto4 from "../assets/gallery/Foto4.jpeg";

function Gallery() {
  const galeriFoto = [
    { id: 1, src: foto1, judul: "info session 1" },
    { id: 2, src: foto2, judul: "info session 2" },
    { id: 3, src: foto3, judul: "info session 3" },
    { id: 4, src: foto4, judul: "info session 4" },
  ];

  const miring = ["-rotate-1", "rotate-1", "rotate-1", "-rotate-1"];

  return (
    <section id="gallery" className="px-5 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl sm:text-5xl">Galeri</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galeriFoto.map((foto) => (
            <figure
              key={foto.id}
              className={`m-0 border-4 border-black bg-white p-3 shadow-[6px_6px_0_#000] transition hover:rotate-0 hover:-translate-y-1 ${miring[foto.id - 1]}`}
            >
              <img
                src={foto.src}
                alt={foto.judul}
                className="aspect-square w-full border-2 border-black object-cover"
              />
              <figcaption className="mt-3 font-display text-sm">{foto.judul}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
