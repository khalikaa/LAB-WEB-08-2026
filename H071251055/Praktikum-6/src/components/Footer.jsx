export default function Footer() {
  const tahun = new Date().getFullYear()

  return (
    <footer className="bg-tinta text-kertas">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-lg font-bold">
          fharell<span className="text-karang">.</span>
        </p>
        <p className="text-kertas/75">
          &copy; {tahun} Fharell. Dibuat dengan React, Vite, dan Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}
