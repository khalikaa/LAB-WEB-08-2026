import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pustaka Senja | Ruang Baca Komunitas",
  description:
    "Katalog buku dan usulan judul baru untuk ruang baca komunitas Pustaka Senja.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen p-0 md:p-6">
        <div className="mx-auto flex min-h-screen md:min-h-[calc(100vh-3rem)] max-w-6xl flex-col border-black bg-krem md:flex-row md:border-2">
          <Navbar />
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="border-b-2 border-black bg-kuning px-5 py-3">
              <p className="text-sm font-bold">
                Pustaka Senja
                <span className="font-normal"> — tempat membaca, meminjam, dan mengusulkan buku.</span>
              </p>
            </header>
            <main className="flex-1 px-5 py-6">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
