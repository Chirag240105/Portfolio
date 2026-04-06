import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Github, Linkedin, Code2, ArrowDown } from "lucide-react";
import { ParticleField } from "./ParticleField";
import chirag from "../../assets/chirag.jpeg";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Intro timeline ---
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Split title into chars
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: "chars" });
        tl.fromTo(
          split.chars,
          { y: 120, opacity: 0, rotateX: -90, transformOrigin: "50% 50% -30px" },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.06 }
        );
      }

      tl.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      )
        .fromTo(
          subRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          imgRef.current,
          { scale: 0.6, opacity: 0, rotate: -15 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.4, ease: "elastic.out(1, 0.7)" },
          "-=1.2"
        )
        .fromTo(
          socialRef.current ? Array.from(socialRef.current.children) : [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
          "-=0.8"
        );

      // --- Scroll parallax ---
      gsap.to(imgRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 180,
        scale: 1.08,
        rotate: 8,
      });

      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -120,
        opacity: 0.1,
        filter: "blur(8px)",
      });
    }, containerRef);

    // --- Mouse tilt on image ---
    const tiltEl = tiltRef.current;
    if (!tiltEl) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = tiltEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(tiltEl, {
        rotateY: dx * 12,
        rotateX: -dy * 12,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
      });
    };

    const onMouseLeave = () => {
      gsap.to(tiltEl, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    };

    tiltEl.addEventListener("mousemove", onMouseMove);
    tiltEl.addEventListener("mouseleave", onMouseLeave);

    return () => {
      ctx.revert();
      tiltEl.removeEventListener("mousemove", onMouseMove);
      tiltEl.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020617] text-white py-20 px-4"
    >
      {/* 3D Particle background */}
      <ParticleField />

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-indigo-600/25 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/25 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-cyan-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-5xl w-full">
        {/* Profile image with tilt */}
        <div ref={tiltRef} className="cursor-none" style={{ transformStyle: "preserve-3d" }}>
          <div
            ref={imgRef}
            className="relative w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden
              border-2 border-indigo-500/40
              shadow-[0_0_40px_rgba(99,102,241,0.4),0_0_80px_rgba(99,102,241,0.15)]
              transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(99,102,241,0.6),0_0_120px_rgba(6,182,212,0.2)]"
          >
            <ImageWithFallback
              src={chirag}
              alt="Chirag"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/50 to-transparent" />
            {/* Glowing ring */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-pulse" />
          </div>
        </div>

        {/* Name */}
        <div className="space-y-3">
          <h1
            ref={titleRef}
            className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none
              bg-gradient-to-r from-indigo-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent
              font-poppins [perspective:600px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            CHIRAG
          </h1>

          <p
            ref={taglineRef}
            className="text-xl md:text-3xl font-semibold text-cyan-300 tracking-wide font-poppins"
          >
            MERN Stack Developer
          </p>

          <div ref={subRef}>
            <p className="text-gray-400 font-mono text-sm md:text-base tracking-wider">
              AI-Integrated Full-Stack Enthusiast &nbsp;·&nbsp; B.Tech CSE 2028
            </p>
          </div>
        </div>

        {/* Social links */}
        <div ref={socialRef} className="flex gap-5 mt-2">
          {[
            { icon: <Github className="w-5 h-5" />, href: "https://github.com/Chirag240105", label: "GitHub", color: "hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]" },
            { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn", color: "hover:border-indigo-400/50 hover:text-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]" },
            { icon: <Code2 className="w-5 h-5" />, href: "https://leetcode.com", label: "LeetCode", color: "hover:border-orange-400/50 hover:text-orange-400 hover:shadow-[0_0_20px_rgba(251,146,60,0.3)]" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={`p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md
                transition-all duration-300 hover:scale-110 hover:bg-white/10 ${item.color}`}
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600
              font-bold text-sm tracking-widest uppercase
              shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)]
              transition-all duration-300 hover:scale-105"
          >
            View Projects
          </a>
          <a
            href="mailto:pandeychirag651@gmail.com"
            className="px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md
              font-bold text-sm tracking-widest uppercase
              hover:bg-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <span className="text-xs font-mono tracking-widest uppercase text-gray-500">Scroll</span>
        <ArrowDown className="w-4 h-4 text-gray-500" />
      </div>
    </section>
  );
};
