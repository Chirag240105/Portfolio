import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import type * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Floating 3D blob
const FloatingBlob = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = clock.elapsedTime * 0.5;
  });
  return (
    <Sphere ref={meshRef} args={[1.4, 64, 64]}>
      <MeshDistortMaterial
        color="#6366f1"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.85}
      />
    </Sphere>
  );
};

const words = [
  { text: "Hi, I'm a", plain: true },
  { text: "Full-Stack MERN Developer", highlight: "indigo" },
  { text: "who builds fast,", plain: true },
  { text: "responsive and user-friendly", highlight: "cyan" },
  { text: "web applications. I specialize in", plain: true },
  { text: "React, Node.js, Express, and MongoDB,", highlight: "fuchsia" },
  { text: "creating scalable systems and integrating", plain: true },
  { text: "AI-powered solutions.", highlight: "green" },
  { text: "Let's build something amazing together.", plain: true },
];

const colorMap: Record<string, string> = {
  indigo: "text-indigo-400",
  cyan: "text-cyan-400",
  fuchsia: "text-fuchsia-400",
  green: "text-green-400",
};

export const Summary = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slide in text block
      gsap.fromTo(
        textRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Blob float in
      gsap.fromTo(
        blobRef.current,
        { scale: 0.5, opacity: 0, x: 60 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.4,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stagger highlight words
      spanRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="min-h-[70vh] py-28 px-6 md:px-16 bg-[#020617] text-white flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div ref={textRef} className="space-y-6">
          <p className="text-xs font-mono tracking-widest uppercase text-indigo-400">
            // About Me
          </p>
          <div className="text-2xl md:text-3xl leading-relaxed text-gray-300 font-inter font-light">
            {words.map((w, i) =>
              w.highlight ? (
                <span
                  key={i}
                  ref={(el: HTMLSpanElement | null) => (spanRefs.current[i] = el)}
                  className={`font-semibold ${colorMap[w.highlight]} inline`}
                >
                  {" "}
                  {w.text}{" "}
                </span>
              ) : (
                <span key={i} ref={(el: HTMLSpanElement | null) => (spanRefs.current[i] = el)} className="inline">
                  {" "}
                  {w.text}{" "}
                </span>
              )
            )}
          </div>
        </div>

        {/* 3D Blob */}
        <div
          ref={blobRef}
          className="w-full h-72 md:h-96 relative"
          aria-hidden="true"
        >
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.4} />
            <pointLight position={[4, 4, 4]} intensity={2} color="#06b6d4" />
            <pointLight position={[-4, -4, 2]} intensity={1.5} color="#a855f7" />
            <FloatingBlob />
          </Canvas>
          {/* Glow under blob */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-indigo-500/20 blur-2xl rounded-full" />
        </div>
      </div>
    </section>
  );
};
