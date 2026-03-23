"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

const COUNT = 800;

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const velRef = useRef<Float32Array | null>(null);

  const geometry = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    const primary = new THREE.Color("#B8BEC7"); // Platinum
    const accent = new THREE.Color("#6366F1"); // Indigo

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const isAccent = Math.random() > 0.7;
      const c = isAccent ? accent.clone() : primary.clone();
      const intensity = isAccent ? 0.4 + Math.random() * 0.2 : 0.2 + Math.random() * 0.15;
      
      col[i * 3] = c.r * intensity * 2.5;
      col[i * 3 + 1] = c.g * intensity * 2.5;
      col[i * 3 + 2] = c.b * intensity * 2.5;

      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = 0.005 + Math.random() * 0.012;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    velRef.current = vel;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return geo;
  }, []);

  useFrame((state) => {
    const pts = ref.current;
    const vel = velRef.current;
    if (!pts || !vel) return;
    const posAttr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const time = state.clock.getElapsedTime();

    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] += vel[i * 3] + Math.sin(time + i) * 0.002;
      arr[i * 3 + 1] += vel[i * 3 + 1];
      arr[i * 3 + 2] += vel[i * 3 + 2] + Math.cos(time + i) * 0.002;
      
      if (arr[i * 3 + 1] > 15) arr[i * 3 + 1] = -15;
      if (arr[i * 3] > 15) arr[i * 3] = -15;
      else if (arr[i * 3] < -15) arr[i * 3] = 15;
      if (arr[i * 3 + 2] > 15) arr[i * 3 + 2] = -15;
      else if (arr[i * 3 + 2] < -15) arr[i * 3 + 2] = 15;
    }
    posAttr.needsUpdate = true;
    pts.rotation.y += 0.00015;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#030308"]} />
      <Particles />
    </>
  );
}

export function HeroBackground({
  canvasOpacity = 1,
  position = "absolute",
  videoSrc,
}: {
  canvasOpacity?: number;
  position?: "absolute" | "fixed";
  videoSrc?: string;
}) {
  return (
    <div
      className={`pointer-events-none inset-0 z-0 min-h-full w-full overflow-hidden ${position === "fixed" ? "fixed" : "absolute"}`}
      style={{ opacity: canvasOpacity }}
      aria-hidden
    >
      {videoSrc && (
        <div className="absolute inset-0 z-[1] opacity-40 mix-blend-screen grayscale">
          <iframe
            src={`${videoSrc}${videoSrc.includes("?") ? "&" : "?"}autoplay=1&mute=1&loop=1&background=1`}
            className="h-full w-full scale-[1.3] object-cover blur-[80px]"
            allow="autoplay"
            style={{ border: "none", pointerEvents: "none" }}
          />
        </div>
      )}
      <div className="absolute inset-0 z-[2]">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 100 }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </div>
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-transparent via-transparent to-[var(--bg-base)]" />
    </div>
  );
}

