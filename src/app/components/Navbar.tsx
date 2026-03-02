import { Github, Linkedin, Mail } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto group">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-xl font-poppins shadow-[0_0_20px_rgba(124,58,237,0.5)] group-hover:scale-110 transition-transform">
          C
        </div>
        <span className="hidden md:block font-mono text-sm tracking-tighter text-white/50 group-hover:text-white transition-colors">
          /CHIRAG.DEV
        </span>
      </div>

      <div className="flex items-center gap-6 pointer-events-auto bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:chirag@example.com" className="text-white/70 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <div className="w-px h-4 bg-white/20" />
        <a 
          href="#projects" 
          className="text-xs font-bold tracking-widest uppercase text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          View Work
        </a>
      </div>
    </nav>
  );
};
