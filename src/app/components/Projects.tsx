import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Cpu } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AgriSmart",
    link: "https://github.com/Chirag240105",
    liveOn: "#",
    year: "2025",
    description:
      "AI-based agriculture solution that uses machine learning to predict crop diseases, recommend fertilizers, and optimize yield. Integrates real-time weather data and soil analysis for smart farming decisions.",
    tech: ["React", "Python", "TensorFlow", "Node.js", "MongoDB", "OpenWeather API"],
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1080&q=80",
    color: "from-green-600/20 to-emerald-900/40",
    accent: "text-green-400",
    border: "border-green-500/20",
    glow: "rgba(34,197,94,0.15)",
  },
  {
    title: "Expense Tracker",
    link: "https://github.com/Chirag240105/Expense_Tracker",
    liveOn: "#",
    year: "2025",
    description:
      "Full-stack MERN expense management app with complete CRUD operations. Features real-time budget tracking, category analytics, and a responsive dashboard with interactive charts.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Recharts"],
    image:
      "https://images.unsplash.com/photo-1638845604906-6c87bd9ddd01?w=1080&q=80",
    color: "from-fuchsia-600/20 to-fuchsia-900/40",
    accent: "text-fuchsia-400",
    border: "border-fuchsia-500/20",
    glow: "rgba(217,70,239,0.15)",
  },
  {
    title: "EduPlatform",
    link: "https://github.com/Chirag240105/EduTechPlatform",
    liveOn: "https://edu-tech-platform-mu.vercel.app",
    year: "2025–Present",
    description:
      "AI-powered adaptive learning platform with dynamic testing and real-time chatbot assistance. Integrated LLaMA 4 Maverick via OpenRouter API with secure JWT REST API.",
    tech: ["React", "Node.js", "MongoDB", "LLaMA 4", "OpenRouter", "JWT"],
    image:
      "https://images.unsplash.com/photo-1608600712992-03e5325d94c8?w=1080&q=80",
    color: "from-cyan-600/20 to-cyan-900/40",
    accent: "text-cyan-400",
    border: "border-cyan-500/20",
    glow: "rgba(6,182,212,0.15)",
  },
];

// 3D tilt on hover
const addTilt = (el: HTMLDivElement) => {
  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: dx * 14,
      rotateX: -dy * 10,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };
  const onLeave = () => {
    gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
  };
  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);
  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", onLeave);
  };
};

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWrapper = triggerRef.current;
      if (!scrollWrapper) return;

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
        },
      });

      // Each card reveals as it enters viewport
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { x: 200, opacity: 0, scale: 0.88 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 85%",
              end: "left 30%",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    // Tilt cleanup
    const cleanups = cardRefs.current.map((el) => (el ? addTilt(el) : null));

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn && fn());
    };
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="min-h-screen bg-[#020617] text-white flex flex-col relative overflow-hidden"
    >
      {/* Section label */}
      <div className="absolute top-0 left-0 p-10 md:p-14 z-20 pointer-events-none">
        <h2 className="text-4xl md:text-7xl font-black font-poppins bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
          Projects
        </h2>
        <p className="text-gray-500 font-mono text-xs mt-2 tracking-widest uppercase">
          Drag / scroll to explore →
        </p>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={triggerRef}
        className="flex h-screen w-fit items-center px-[20vw] gap-[8vw]"
        style={{ willChange: "transform" }}
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="flex-shrink-0 w-[82vw] md:w-[56vw] h-[72vh] relative group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Glow blob */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 rounded-[2.5rem] blur-2xl group-hover:opacity-60 transition-opacity duration-500`}
            />

            <div
              className={`relative z-10 h-full w-full bg-white/[0.04] border ${project.border} backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between overflow-hidden shadow-2xl`}
            >
              {/* Top row */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold tracking-widest uppercase">
                      {project.year}
                    </span>
                    <Cpu className={`w-4 h-4 ${project.accent}`} />
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="hover:text-cyan-400 transition-colors hover:scale-110 inline-block"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.liveOn}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live Preview"
                      className="hover:text-indigo-400 transition-colors hover:scale-110 inline-block"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <h3 className="text-4xl md:text-6xl font-black font-poppins leading-tight">
                  {project.title}
                </h3>
                <p className="text-base text-gray-300 font-inter max-w-xl line-clamp-3">
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`px-3 py-1 rounded-xl bg-white/5 border ${project.border} text-xs font-bold font-mono tracking-tight hover:bg-white/10 transition-colors`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project image */}
              <div className="relative mt-6 h-40 md:h-52 w-full rounded-2xl overflow-hidden border border-white/10 group-hover:scale-[1.02] transition-transform duration-500">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
