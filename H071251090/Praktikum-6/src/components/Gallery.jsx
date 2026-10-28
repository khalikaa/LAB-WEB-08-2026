import foto1 from '../assets/gallery/savio.png';
import foto2 from '../assets/gallery/nexus.png';
import foto3 from '../assets/gallery/vigor.png';
import foto4 from '../assets/gallery/aura.png';

function Gallery() {
    const daftarFoto = [
        { id: 'gl-1', src: foto1, judul: 'Savio', deskripsi: 'Platform manajemen keuangan cerdas untuk mengoptimalkan pengeluaran harian dan perencanaan masa depan.' },
        { id: 'gl-2', src: foto2, judul: 'Nexus', deskripsi: 'Aplikasi kolaborasi tim modern untuk meningkatkan produktivitas, manajemen tugas, dan komunikasi tanpa batas.' },
        { id: 'gl-3', src: foto3, judul: 'Vigor', deskripsi: 'Dashboard kesehatan dan kebugaran bertenaga data untuk memantau aktivitas fisik, nutrisi, dan kualitas tidur.' },
        { id: 'gl-4', src: foto4, judul: 'Aura', deskripsi: 'Alat desain kreatif berbasis kecerdasan buatan (AI) untuk membantu desainer menghasilkan karya visual secara instan.' },
    ];

    return (
        <section id="gallery" className="py-20 bg-gray-900 text-gray-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
            <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Galeri Project</h2>
            <div className="h-1 w-16 bg-blue-500 rounded mx-auto md:mx-0"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {daftarFoto.map((foto) => (
                <div key={foto.id} className="group rounded-2xl overflow-hidden bg-gray-950 border border-gray-800 shadow-lg hover:border-gray-700 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                    <img src={foto.src} alt={foto.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-1">{foto.judul}</h3>
                    <p className="text-sm text-gray-400">{foto.deskripsi}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}

export default Gallery;