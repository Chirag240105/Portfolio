import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Summary = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text block slide in
      gsap.fromTo(textRef.current, 
        { x: -100, opacity: 0 }, 
        { 
          x: 0, 
          opacity: 1, 
          duration: 1.5, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          }
        }
      );

      // Highlight keywords
      const highlights = textRef.current?.querySelectorAll(".highlight");
      highlights?.forEach((el) => {
        gsap.fromTo(el, 
          { scale: 0.9, color: "#fff" }, 
          { 
            scale: 1.1, 
            color: "#06b6d4",
            fontWeight: "bold",
            duration: 0.5,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse"
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
      className="min-h-[50vh] py-24 px-6 md:px-12 bg-[#020617] text-white flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      
      <div className="max-w-4xl relative z-10">
        <div 
          ref={textRef}
          className="text-2xl md:text-4xl leading-relaxed text-gray-300 font-inter font-light tracking-wide space-y-6"
        >
         <p>
  Hi, I'm a <span className="highlight text-white transition-colors duration-500">Full-Stack MERN Developer</span> who builds 
  fast, <span className="highlight text-white transition-colors duration-500">responsive and user-friendly websites</span>. 
  I specialize in <span className="highlight text-white transition-colors duration-500">React, Node.js, Express, and MongoDB</span>, 
  creating modern web applications that are scalable and efficient. 

  I focus on <span className="highlight text-white transition-colors duration-500">clean code, performance</span>, and delivering projects on time. 
  Whether you need a business website, a web app, or bug fixes, I am here to help you turn your ideas into reality. 

  Let's work together to build something amazing!
</p>
        </div>
      </div>

      {/* Decorative glassmorphic card bg blur */}
      <div className="absolute inset-0 bg-white/1 backdrop-blur-3xl -z-10" />
    </section>
  );
};
