import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const judul = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-judul",
});
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Pustaka Senja | Ruang Baca Komunitas",
  description: "Katalog buku dan usulan buku Pustaka Senja.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${judul.variable} ${body.variable} flex min-h-screen flex-col bg-[#FFF7E0] bg-[radial-gradient(rgba(0,0,0,0.13)_1px,transparent_1px)] bg-size-[22px_22px] font-sans text-black antialiased`}
      >
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}