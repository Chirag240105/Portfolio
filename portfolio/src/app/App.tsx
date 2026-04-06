import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Summary } from "./components/Summary";
import { Education } from "./components/Education";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Activities } from "./components/Activities";
import { Footer } from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="bg-[#020617] selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <Hero />
      <Summary />
      <Education />
      <Skills />
      <Projects />
      <Activities />
      <Footer />
      
     
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

   
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[var(--mouse-y,0px)] left-[var(--mouse-x,0px)] -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] transition-transform duration-300 ease-out" />
      </div>
    </main>
  );
}

export default App;
