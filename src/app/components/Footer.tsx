import { Github, Linkedin, Code2, Heart } from "lucide-react";

export const Footer = () => (
  <footer className="py-12 px-6 md:px-16 bg-[#020617] text-white border-t border-white/5 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[80%] bg-indigo-600/30 rounded-full blur-[120px]" />
    </div>

    <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center font-black text-sm font-poppins">
          C
        </div>
        <span className="font-mono text-sm text-white/40">CHIRAG.DEV</span>
      </div>

      <div className="flex items-center gap-2 text-sm font-mono text-white/30">
        Built with <Heart className="w-3 h-3 text-fuchsia-400 animate-pulse mx-1" /> using MERN &amp; GSAP
      </div>

      <div className="flex gap-4">
        {[
          { icon: <Github className="w-4 h-4" />, href: "https://github.com/Chirag240105", label: "GitHub" },
          { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com", label: "LinkedIn" },
          { icon: <Code2 className="w-4 h-4" />, href: "https://leetcode.com", label: "LeetCode" },
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all hover:scale-110"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>

    <p className="text-center text-xs font-mono text-white/20 mt-8">
      © 2026 Chirag Pandey. All Rights Reserved.
    </p>
  </footer>
);
