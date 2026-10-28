import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#FFE5EC] via-[#FFC2D1] to-[#F7CAD0] p-3 sm:p-6 md:p-8 relative overflow-hidden font-sans">
      
      {/* Pendaran Cahaya Latar Belakang */}
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-[#FFB3C6] rounded-full blur-[140px] opacity-30 pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-125 h-125 bg-[#E2D9F3] rounded-full blur-[140px] opacity-40 pointer-events-none z-0"></div>
 
      {/* CARD PUTIH UTAMA */}
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-2xl rounded-[36px] shadow-xl shadow-[#FFB3C6]/20 border border-white/90 overflow-hidden relative z-10">
        <Navbar />
        <main className="divide-y divide-pink-100/60">
          <Hero />
          <About />
          <Skills />
          <Gallery />
        </main>
        <Footer />
      </div>

    </div>
  );
}