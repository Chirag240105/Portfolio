import { Github, Linkedin, Code2, Heart, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-20 px-6 md:px-12 bg-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-indigo-600/40 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl w-full relative z-10 text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-7xl font-black font-poppins bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            Let's connect & build something amazing
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-inter max-w-2xl mx-auto">
            Ready for new opportunities and collaborations in AI and Full-Stack development.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <a 
            href="mailto:chirag@example.com" 
            className="group flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105"
          >
            <div className="p-4 rounded-full bg-cyan-600/20 text-cyan-400 group-hover:scale-110 transition-transform">
              <Mail className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-mono text-cyan-400 uppercase tracking-widest">Email Me</p>
              <p className="text-xl font-bold font-poppins">pandeychirag651@gmail.com</p>
            </div>
          </a>

          <div className="flex gap-6">
            {[
              { icon: <Github className="w-8 h-8" />, href: "https://github.com", label: "GitHub" },
              { icon: <Linkedin className="w-8 h-8" />, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: <Code2 className="w-8 h-8" />, href: "https://leetcode.com", label: "LeetCode" }
            ].map((item, i) => (
              <a 
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-indigo-500/50 group"
              >
                {item.icon}
                <span className="sr-only">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="pt-20 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 opacity-50 text-sm font-mono">
          <p>© 2026 Chirag. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            Built with <Heart className="w-4 h-4 text-fuchsia-400 animate-pulse" /> using MERN Stack & GSAP
          </div>
        </div>
      </div>
    </footer>
  );
};
