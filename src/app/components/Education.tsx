import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, School, MapPin, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Education = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.fromTo(lineRef.current, 
        { height: 0 }, 
        { 
          height: "100%", 
          duration: 2, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 80%",
            scrub: 1,
          }
        }
      );

      // Section Clip-Path Reveal
      gsap.fromTo(containerRef.current, 
        { clipPath: "inset(20% 10% 20% 10% round 50px)" }, 
        { 
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            end: "top 50%",
            scrub: 1,
          }
        }
      );

      // Card pin animation
      gsap.fromTo(cardRef.current, 
        { x: 100, opacity: 0, scale: 0.9, rotate: 5 }, 
        { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          rotate: 0,
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen py-32 px-6 md:px-12 bg-[#020617] text-white flex flex-col items-center justify-center relative"
    >
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 relative">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-[2px] bg-white/10 hidden md:block">
          <div 
            ref={lineRef}
            className="w-full bg-gradient-to-b from-indigo-500 via-cyan-400 to-fuchsia-500 origin-top shadow-[0_0_10px_rgba(124,58,237,0.5)]" 
          />
        </div>

        <div className="flex-1 w-full order-2 md:order-1 relative">
          <h2 className="text-4xl md:text-6xl font-black mb-12 font-poppins bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Education
          </h2>
          
          <div 
            ref={cardRef}
            className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden group hover:border-indigo-500/30 transition-colors"
          >
            {/* KIET Logo placeholder (icon) */}
            <div className="absolute -right-10 -bottom-10 opacity-5 rotate-12 group-hover:scale-110 transition-transform">
              <School className="w-48 h-48" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-poppins">Bachelor of Technology (B.Tech)</h3>
                  <p className="text-indigo-400 font-medium">Computer Science Engineering</p>
                </div>
              </div>

              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <School className="w-5 h-5 text-cyan-400" />
                  <span>KIET Group of Institutions, Ghaziabad</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-fuchsia-400" />
                  <span>Uttar Pradesh, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <span>Expected Graduation: 2028 | Current Year: 2nd Year</span>
                </div>
              </div>
            </div>

            {/* Glowing dot on the timeline side */}
            <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-4 border-indigo-500 shadow-[0_0_15px_rgba(124,58,237,0.8)] hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
};
