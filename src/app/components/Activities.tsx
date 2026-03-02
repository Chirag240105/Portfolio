import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Users, Trophy, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const activities = [
  {
    title: "DataVerse Hackathon",
    desc: "Participated and built innovative data-driven solutions.",
    icon: <Trophy className="w-8 h-8 text-indigo-400" />,
    tag: "Hackathon"
  },
  {
    title: "DSDL Technical Club",
    desc: "Active member focusing on Data Structures and Deep Learning.",
    icon: <Users className="w-8 h-8 text-cyan-400" />,
    tag: "Club"
  }
];

export const Activities = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        
        gsap.fromTo(el, 
          { y: 50, opacity: 0, scale: 0.9 }, 
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 1, 
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
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
      className="min-h-[60vh] py-32 px-6 md:px-12 bg-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-fuchsia-600/10 blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl w-full relative z-10 text-center">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-poppins bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Beyond Code
          </h2>
          <p className="text-gray-400 font-inter text-lg max-w-xl mx-auto">
            My journey outside of development involves community building and competitive problem-solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((act, idx) => (
            <div 
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative group overflow-hidden transition-all duration-500 hover:bg-white/10 text-left"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {act.icon}
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                  {act.tag}
                </span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-poppins">{act.title}</h3>
                <p className="text-gray-400 font-inter">{act.desc}</p>
              </div>

              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:scale-110 transition-transform">
                <Star className="w-32 h-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
