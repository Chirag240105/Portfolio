import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Cpu } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "EduPlatform",
    link: "https://github.com/Chirag240105/EduTechPlatform",
    liveOn: "https://edu-tech-platform-mu.vercel.app",
    year: "2025-Present",
    description: "AI-powered adaptive learning platform with dynamic testing and real-time chatbot assistance. Integrated LLaMA 4 Maverick via OpenRouter API + secure JWT REST API.",
    tech: ["React", "Node.js", "MongoDB", "LLaMA 4", "OpenRouter"],
    image: "https://images.unsplash.com/photo-1608600712992-03e5325d94c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlZHVjYXRpb24lMjBsZWFybmluZyUyMHBsYXRmb3JtJTIwZGFzaGJvYXJkJTIwZGFzaGJvYXJkJTIwVUklMjBtb2NrdXBzJTIwbGFwdG9wfGVufDF8fHx8MTc3MjQyNjYyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-indigo-600/20 to-indigo-900/40",
    accent: "text-indigo-400"
  },
  {
    title: "Expense Tracker",
    link: "https://github.com/Chirag240105/Expense_Tracker",
    liveOn:"#",
    year: "2025",
    description: "Full-stack expense management app with complete CRUD. Responsive React frontend + Node.js, Express, MongoDB real-time.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    image: "https://images.unsplash.com/photo-1638845604906-6c87bd9ddd01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwYXBwJTIwZXhwZW5zZSUyMHRyYWNrZXIlMjBkYXNoYm9hcmQlMjBVSSUyMG1vY2t1cHMlMjBtb2JpbGUlMjBhcHAlMjBsYXB0b3B8ZW58MXx8fHwxNzcyNDI2NjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "from-fuchsia-600/20 to-fuchsia-900/40",
    accent: "text-fuchsia-400"
  }
];

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWrapper = triggerRef.current;
      if (!scrollWrapper) return;

      const items = gsap.utils.toArray<HTMLDivElement>(".project-item");
      const totalWidth = scrollWrapper.scrollWidth - window.innerWidth;

   
      const horizontalTween = gsap.to(scrollWrapper, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

    
      items.forEach((item) => {
        const content = item.querySelector(".project-content");
        if (!content) return;

        gsap.fromTo(content, 
          { x: 180, opacity: 0, scale: 0.9 },
          { 
            x: 0, 
            opacity: 1, 
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              containerAnimation: horizontalTween,
              start: "left 80%",
              end: "left 20%",
              scrub: true,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects"
      ref={containerRef}
      className="min-h-screen bg-[#020617] text-white flex flex-col relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 p-12 z-20">
        <h2 className="text-4xl md:text-7xl font-black font-poppins bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
          Projects
        </h2>
        <p className="text-gray-500 font-mono text-sm mt-2 tracking-widest uppercase">Scroll horizontally to explore</p>
      </div>

      <div 
        ref={triggerRef} 
        className="flex h-screen w-fit items-center px-[20vw]"
      >
        {projects.map((project, idx) => (
          <div 
            key={idx}
            className="project-item flex-shrink-0 w-[80vw] md:w-[60vw] h-[70vh] mr-[20vw] relative group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 rounded-[3rem] blur-2xl group-hover:opacity-60 transition-opacity`} />
            
            <div className="project-content relative z-10 h-full w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-[3rem] p-12 flex flex-col justify-between overflow-hidden shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold tracking-widest uppercase">
                      {project.year}
                    </span>
                    <Cpu className={`w-5 h-5 ${project.accent}`} />
                  </div>
                  <div className="flex gap-4">
                    <a href={project.link} className="hover:text-cyan-400 transition-colors"><Github className="w-6 h-6" /></a>
                    <a href={project.liveOn} className="hover:text-indigo-400 transition-colors"><ExternalLink className="w-6 h-6" /></a>
                  </div>
                </div>
                
                <h3 className="text-4xl md:text-6xl font-black font-poppins leading-tight">{project.title}</h3>
                <p className="text-lg text-gray-300 font-inter max-w-xl line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold font-mono tracking-tighter"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 flex-1 w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:scale-[1.02] transition-transform duration-500">
                <ImageWithFallback 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
