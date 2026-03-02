import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Terminal, Database, Sparkles, Layout, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Terminal className="w-6 h-6 text-indigo-400" />,
    skills: ["C++", "JavaScript", "Python"],
    color: "from-indigo-500/20 to-indigo-600/10",
    border: "border-indigo-500/30"
  },
  {
    title: "Frontend",
    icon: <Layout className="w-6 h-6 text-cyan-400" />,
    skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3"],
    color: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/30"
  },
  {
    title: "Backend",
    icon: <Globe className="w-6 h-6 text-fuchsia-400" />,
    skills: ["Node.js", "Express.js", "REST APIs", "JWT"],
    color: "from-fuchsia-500/20 to-fuchsia-600/10",
    border: "border-fuchsia-500/30"
  },
  {
    title: "Database",
    icon: <Database className="w-6 h-6 text-blue-400" />,
    skills: ["MongoDB"],
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30"
  },
  {
    title: "AI & Tools",
    icon: <Sparkles className="w-6 h-6 text-green-400" />,
    skills: ["OpenRouter API", "LLaMA 4 Maverick", "Git", "GitHub", "Postman", "VS Code", "Figma"],
    color: "from-green-500/20 to-green-600/10",
    border: "border-green-500/30"
  },
  {
    title: "Deployment",
    icon: <Code2 className="w-6 h-6 text-orange-400" />,
    skills: ["Render", "Vercel"],
    color: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/30"
  }
];

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        
        // Reveal animation
        gsap.fromTo(el, 
          { y: 50, opacity: 0, scale: 0.9, rotateX: -20 }, 
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            rotateX: 0,
            duration: 1, 
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Orbiting icons background effect
        const icons = el.querySelectorAll(".skill-pill");
        gsap.fromTo(icons, 
          { y: 20, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.1, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen py-32 px-6 md:px-12 bg-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-cyan-600/10 blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl w-full relative z-10">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-7xl font-black mb-6 font-poppins bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>
          <p className="text-gray-400 font-inter text-lg md:text-xl max-w-2xl">
            A comprehensive set of tools and technologies I've mastered to build high-performance, AI-driven applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => (
            <div 
              key={idx}
              ref={el => cardRefs.current[idx] = el}
              className={`p-8 rounded-3xl bg-white/5 border ${cat.border} backdrop-blur-md shadow-2xl relative group overflow-hidden transition-all duration-500 hover:bg-white/10`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold font-poppins">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="skill-pill px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:border-white/30 transition-all hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
