function Hero() {
    const handleButtonClick = () => {
        console.log('Halo! Terima kasih sudah berkunjung ke web portofolio saya.');
    };

    return (
        <section id="home" className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-gray-950 text-gray-100">
        <div className="max-w-4xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12 text-center md:text-left">
            <div className="flex-1 space-y-6">
            <p className="text-blue-400 font-mono text-sm tracking-wide">Halo, nama saya</p>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
                Randy Rahmat
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
                Mahasiswa Sistem Informasi Universitas Hasanuddin yang sedang aktif belajar pengembangan web, mulai dari logika pemrograman dasar hingga merancang tampilan antarmuka yang rapi dan responsif.
            </p>
            <div>
                <button type="button" onClick={handleButtonClick} className="px-6 py-3 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/20 active:scale-95 cursor-pointer">
                Sapa Saya
                </button>
            </div>
            </div>

            <div className="relative">
            <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-2xl shadow-blue-500/10">
                <img src="/profile.jpg" alt="Foto Profil Randy Rahmat" className="w-full h-full object-cover" />
            </div>
            </div>
        </div>
        </section>
    );
}

export default Hero;