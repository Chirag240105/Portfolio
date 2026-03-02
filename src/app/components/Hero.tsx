import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Github, Linkedin, Code2 } from "lucide-react";
import chirag from "../../assets/chirag.jpeg"
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      if (titleRef.current && !titleRef.current.querySelector('.char')) {
        const chars = titleRef.current.innerText.split("");
        titleRef.current.innerHTML = chars.map(c => `<span class="inline-block char">${c}</span>`).join("");
      }

      const tl = gsap.timeline();
      tl.fromTo(".char", 
        { y: 100, opacity: 0, rotateX: -90 }, 
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.05, ease: "back.out(1.7)" }
      )
      .fromTo(subRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
        "-=0.4"
      )
      .fromTo(imgRef.current, 
        { scale: 0.5, opacity: 0, rotate: -20 }, 
        { scale: 1, opacity: 1, rotate: 0, duration: 1.5, ease: "elastic.out(1, 0.75)" }, 
        "-=1"
      )
      .fromTo(socialRef.current?.children || [], 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" }, 
        "-=0.8"
      );


      gsap.to(imgRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        scale: 1.1,
        rotate: 10,
      });

      gsap.to(".char", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -150,
        stagger: 0.02,
        opacity: 0.2,
        scale: 0.8,
        filter: "blur(10px)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020617] text-white py-20 px-4"
    >

      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/40 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-cyan-600/30 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-5xl">
        <div 
          ref={imgRef}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-indigo-500/30 shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-transform"
        >
          <ImageWithFallback 
            src={chirag}
            alt="Chirag"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-transparent" />
        </div>

        <div className="space-y-4">
          <h1 
            ref={titleRef}
            className="text-7xl md:text-9xl font-black tracking-tighter bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent font-poppins"
          >
            CHIRAG
          </h1>
          <div 
            ref={subRef}
            className="space-y-2"
          >
            <p className="text-xl md:text-2xl font-medium text-cyan-300 tracking-wide font-poppins">
              MERN Stack Developer
            </p>
            <p className="text-gray-400 font-mono text-sm md:text-base">
              AI-Integrated Full-Stack Enthusiast | B.Tech CSE 2028
            </p>
          </div>
        </div>

        <div 
          ref={socialRef}
          className="flex gap-6 mt-4"
        >
          {[
            { icon: <Github className="w-6 h-6" />, href: "https://github.com", color: "hover:text-cyan-400" },
            { icon: <Linkedin className="w-6 h-6" />, href: "https://linkedin.com", color: "hover:text-indigo-400" },
            { icon: <Code2 className="w-6 h-6" />, href: "https://leetcode.com", color: "hover:text-orange-400" }
          ].map((item, i) => (
            <a 
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/10 ${item.color} group`}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};
