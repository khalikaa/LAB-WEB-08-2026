function About() {
    const dataDiri = [
        { id: 'dt-1', label: 'Nama Lengkap', value: 'Randy Rahmat' },
        { id: 'dt-2', label: 'Program Studi', value: 'Sistem Informasi' },
        { id: 'dt-3', label: 'Institusi', value: 'Universitas Hasanuddin' },
        { id: 'dt-4', label: 'Fokus', value: 'Fullstack Web Development' },
        { id: 'dt-5', label: 'Domisili', value: 'Makassar, Indonesia' },
    ];

    return (
        <section id="about" className="py-20 bg-gray-900 text-gray-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
            <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Tentang Saya</h2>
            <div className="h-1 w-16 bg-blue-500 rounded mx-auto md:mx-0"></div>
            </div>

            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            Saya seorang pembelajar yang tertarik pada pengembangan web, khususnya dalam merancang antarmuka yang menarik dan fungsional. Saat ini, saya fokus mengasah kemampuan dasar pemrograman untuk membangun proyek-proyek web yang interaktif.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dataDiri.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-gray-950/60 border border-gray-800 flex flex-col space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
                    {item.label}
                </span>
                <span className="text-base font-semibold text-gray-100">
                    {item.value}
                </span>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}

export default About;