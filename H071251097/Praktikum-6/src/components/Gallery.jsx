// Mengimpor secara eksplisit 13 gambar agar tidak ada pembacaan acak/duplikasi oleh bundler
import gallery1 from "../assets/gallery/gallery1.jpeg";
import gallery2 from "../assets/gallery/gallery2.jpeg";
import gallery3 from "../assets/gallery/gallery3.jpeg";
import gallery4 from "../assets/gallery/gallery4.jpeg";
import gallery5 from "../assets/gallery/gallery5.jpeg";
import gallery6 from "../assets/gallery/gallery6.jpeg";
import gallery8 from "../assets/gallery/gallery8.jpeg";
import gallery9 from "../assets/gallery/gallery9.jpeg";
import gallery10 from "../assets/gallery/gallery10.jpeg";
import gallery11 from "../assets/gallery/gallery11.jpeg";
import gallery12 from "../assets/gallery/gallery12.jpeg";
import gallery13 from "../assets/gallery/gallery13.jpeg";

const galleryItems = [
  { id: 1, title: "UI/UX Nasi Darurat", img: gallery1 },
  { id: 2, title: "UI/UX OVT", img: gallery2 },
  { id: 3, title: "Areda Careers", img: gallery3 },
  { id: 4, title: "MC/Moderator", img: gallery4 },
  { id: 5, title: "Duta Potensi Pemuda Indonesia 2024", img: gallery5 },
  { id: 6, title: "Volunteer Makassar International Writers Makassar 2026", img: gallery6 },
  { id: 8, title: "Poster WBI/BMI", img: gallery8 },
  { id: 9, title: "Poster FLS2N 2024", img: gallery9 },
  { id: 10, title: "Poster GAK", img: gallery10 },
  { id: 11, title: "Poster Singkong", img: gallery11 },
  { id: 12, title: "Poster Sumpah Pemuda", img: gallery12 },
  { id: 13, title: "Poster Tamu Ambalan", img: gallery13 },
];

export default function Gallery() {
  return (
    <section id="projects" className="py-12 md:py-16 px-6 md:px-10 bg-white">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <span className="text-[#FF5E84] text-xs font-black tracking-widest uppercase bg-[#FF5E84]/10 border border-[#FF5E84]/20 px-3.5 py-1 rounded-full inline-block">
            Gallery & Projects
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-[#2A1E24] tracking-tight">
            Dokumentasi & Karya
          </h2>
        </div>

        {/* Grid Gambar Gallery (Tepat 13 Gambar Unik) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative rounded-2xl overflow-hidden border border-pink-100 shadow-xs aspect-4/3 bg-pink-50"
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#2A1E24]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-bold">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}