function Footer() {
  const nama = "Bela Kurnia";
  const tahun = 2026;

  return (
    <footer id="contact" className="border-t-4 border-black bg-merah px-5 py-12 text-center text-white">
      <h2 className="font-display text-3xl [text-shadow:3px_3px_0_#000] sm:text-5xl">
        Ayo berkolaborasi!
      </h2>
      <p className="mx-auto mt-3 max-w-md font-medium">
        Punya ide proyek? Kirim pesan ke kurnianataliabela@gmail.com
      </p>
      <p className="mt-8 inline-block border-2 border-black bg-kuning px-4 py-2 text-sm font-bold text-black shadow-[3px_3px_0_#000]">
        &copy; {tahun} {nama}. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
