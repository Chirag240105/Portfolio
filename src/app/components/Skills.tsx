import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Terminal, Database, Sparkles, Layout, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Languages",
    icon: <Terminal className="w-5 h-5 text-indigo-400" />,
    skills: ["C++", "JavaScript", "Python"],
    color: "from-indigo-500/15 to-indigo-600/5",
    border: "border-indigo-500/25",
    glow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
  },
  {
    title: "Frontend",
    icon: <Layout className="w-5 h-5 text-cyan-400" />,
    skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3"],
    color: "from-cyan-500/15 to-cyan-600/5",
    border: "border-cyan-500/25",
    glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
  },
  {
    title: "Backend",
    icon: <Globe className="w-5 h-5 text-fuchsia-400" />,
    skills: ["Node.js", "Express.js", "REST APIs", "JWT"],
    color: "from-fuchsia-500/15 to-fuchsia-600/5",
    border: "border-fuchsia-500/25",
    glow: "group-hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]",
  },
  {
    title: "Database",
    icon: <Database className="w-5 h-5 text-blue-400" />,
    skills: ["MongoDB"],
    color: "from-blue-500/15 to-blue-600/5",
    border: "border-blue-500/25",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
  },
  {
    title: "AI & Tools",
    icon: <Sparkles className="w-5 h-5 text-green-400" />,
    skills: ["OpenRouter API", "LLaMA 4", "Git", "GitHub", "Postman", "Figma"],
    color: "from-green-500/15 to-green-600/5",
    border: "border-green-500/25",
    glow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]",
  },
  {
    title: "Deployment",
    icon: <Code2 className="w-5 h-5 text-orange-400" />,
    skills: ["Render", "Vercel"],
    color: "from-orange-500/15 to-orange-600/5",
    border: "border-orange-500/25",
    glow: "group-hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]",
  },
];

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        ".skills-heading",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );

      // Cards stagger in
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, scale: 0.92, rotateX: -15 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.9,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.05,
          }
        );

        // Skill pills stagger
        const pills = el.querySelectorAll(".skill-pill");
        gsap.fromTo(
          pills,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="min-h-screen py-32 px-6 md:px-16 bg-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-cyan-600/8 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl w-full relative z-10">
        <div className="skills-heading mb-20 text-center md:text-left space-y-4">
          <p className="text-xs font-mono tracking-widest uppercase text-cyan-400">
            // Technical Arsenal
          </p>
          <h2 className="text-4xl md:text-7xl font-black font-poppins bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Skills
          </h2>
          <p className="text-gray-400 font-inter text-lg max-w-2xl">
            Tools and technologies I use to build high-performance, AI-driven applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              className={`p-7 rounded-3xl bg-white/[0.04] border ${cat.border} backdrop-blur-md shadow-xl relative group overflow-hidden transition-all duration-500 hover:bg-white/[0.07] ${cat.glow}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-30 pointer-events-none group-hover:opacity-60 transition-opacity`} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold font-poppins">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`skill-pill px-3 py-1.5 rounded-xl bg-white/5 border ${cat.border} text-sm font-medium font-mono hover:bg-white/10 hover:scale-105 transition-all cursor-default`}
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
