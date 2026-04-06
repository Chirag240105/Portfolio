import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Inner component that uses R3F hooks
const Particles = ({ count = 1800 }: { count?: number }) => {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Generate random positions
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#6366f1"), // indigo
      new THREE.Color("#06b6d4"), // cyan
      new THREE.Color("#a855f7"), // purple
      new THREE.Color("#ec4899"), // pink
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  // Track mouse for parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    // Slow rotation
    meshRef.current.rotation.y = t * 0.04 + mouseRef.current.x * 0.1;
    meshRef.current.rotation.x = t * 0.02 + mouseRef.current.y * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
};

export const ParticleField = () => (
  <div className="absolute inset-0 pointer-events-none">
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Particles />
    </Canvas>
  </div>
);
