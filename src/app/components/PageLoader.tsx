import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Count up animation
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(obj.val)),
    });

    // Bar fill
    gsap.to(barRef.current, {
      scaleX: 1,
      duration: 2,
      ease: "power2.inOut",
    });

    // Exit animation
    const tl = gsap.timeline({ delay: 2.2 });
    tl.to(textRef.current, { y: -40, opacity: 0, duration: 0.5, ease: "power2.in" })
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete,
      });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] bg-[#020617] flex flex-col items-center justify-center gap-8"
    >
      <div ref={textRef} className="text-center space-y-4">
        <div className="text-7xl md:text-9xl font-black font-poppins bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
          {count}%
        </div>
        <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">
          Loading Portfolio
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-fuchsia-500 origin-left scale-x-0"
        />
      </div>
    </div>
  );
};
