function Footer() {
  const nama = "Aqilah Raihana";
  const tahun = new Date().getFullYear();

  return (
    <footer className="bg-teal-700 py-8">
      <p className="px-5 text-center text-sm text-teal-50">
        &copy; {tahun} {nama}. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;