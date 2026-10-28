import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 antialiased font-sans">
      <Navbar/>
      <Hero/>
      <About/>
      <Skills/>
      <Gallery/>
      <Footer/>
    </div>
  );
}

export default App;