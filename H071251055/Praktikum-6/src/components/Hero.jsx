export default function Hero() {
  const handleKenalan = () => {
    console.log('Tombol "Kenali saya" diklik, menuju bagian Tentang.')
    document.getElementById('tentang')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="beranda" className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:pt-16 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="mb-5 inline-block border-2 border-tinta px-3 py-1 text-sm font-semibold uppercase tracking-widest">
            Sistem Informasi, Unhas
          </p>

          <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Halo, saya Fharell.
            <span className="mt-2 block text-laut">
              Saya suka merapikan{' '}
              <span className="bg-karang px-2 text-kertas">data</span> dan{' '}
              <span className="underline decoration-karang decoration-4 underline-offset-8">
                jaringan
              </span>
              .
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed">
            Mahasiswa Sistem Informasi yang sedang belajar membuat antarmuka web dengan React,
            sambil terus mengasah cara berpikir lewat analisis algoritma. Halaman ini adalah catatan perjalanan belajar saya.
          </p>

          <button
            type="button"
            onClick={handleKenalan}
            className="mt-9 cursor-pointer border-2 border-tinta bg-tinta px-7 py-3.5 font-display text-lg font-bold text-kertas shadow-[6px_6px_0_0_var(--color-karang)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--color-karang)]"
          >
            Kenali saya
          </button>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <div className="absolute -bottom-4 -right-4 h-full w-full border-2 border-tinta bg-pasir" />
          <img
            src="/foto-profil.jpg"
            alt="Foto profil Fharell"
            className="relative aspect-4/5 w-full border-2 border-tinta object-cover"
          />
        </div>
      </div>
    </section>
  )
}
