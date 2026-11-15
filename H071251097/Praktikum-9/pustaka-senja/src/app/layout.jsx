import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pustaka Senja - Ruang Baca Digital",
  description: "Aplikasi Multi-Halaman Pustaka Senja dengan Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="h-full w-full overflow-hidden">
      <body className="bg-stone-950 text-amber-50 h-screen w-screen flex flex-col justify-between overflow-hidden antialiased select-none fixed inset-0">
        <Navbar />
        <main className="flex-1 overflow-hidden relative flex flex-col justify-center items-center w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}


