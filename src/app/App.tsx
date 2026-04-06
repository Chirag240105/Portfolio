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
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const onMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMouseMove);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <main className="bg-[#020617] selection:bg-cyan-500/30 selection:text-cyan-200 cursor-none">
        <Navbar />
        <Hero />
        <Summary />
        <Education />
        <Skills />
        <Projects />
        <Activities />
        <Contact />
        <Footer />

        {/* Grainy texture overlay */}
        <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.025] mix-blend-overlay" aria-hidden="true">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        {/* Mouse glow follower */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10" aria-hidden="true">
          <div className="absolute top-[var(--mouse-y,50%)] left-[var(--mouse-x,50%)] -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/8 rounded-full blur-[120px] transition-[top,left] duration-500 ease-out" />
        </div>
      </main>
    </>
  );
}

export default App;
