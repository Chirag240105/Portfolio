import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Slide in from top
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <a href="#home" className="flex items-center gap-2 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center font-black text-lg font-poppins shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-transform">
          C
        </div>
        <span className="hidden md:block font-mono text-sm tracking-tighter text-white/40 group-hover:text-white/80 transition-colors">
          /CHIRAG.DEV
        </span>
      </a>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-3">
        <a href="https://github.com/Chirag240105" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/50 hover:text-white transition-colors hover:scale-110 inline-block">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/50 hover:text-white transition-colors hover:scale-110 inline-block">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="mailto:pandeychirag651@gmail.com" aria-label="Email" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-widest uppercase hover:bg-indigo-600/40 transition-all">
          <Mail className="w-4 h-4" />
          Hire Me
        </a>
      </div>
    </nav>
  );
};
