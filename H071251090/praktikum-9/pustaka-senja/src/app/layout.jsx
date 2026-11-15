import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Pustaka Senja - Ruang Baca Komunitas",
    description: "Katalog dan ruang baca komunitas dekat kampus",
    };

    export default function RootLayout({ children }) {
    return (
        <html lang="id">
        <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 antialiased selection:bg-amber-200">
            <Navbar />
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
            {children}
            </main>
            <Footer />
        </body>
        </html>
    );
}