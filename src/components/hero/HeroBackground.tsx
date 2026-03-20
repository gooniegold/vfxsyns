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
    const gold = new THREE.Color("#B8BEC7");
    const mist = new THREE.Color("#F2EFE8");

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const c = gold.clone().lerp(mist, Math.random() * 0.28);
      const isGold = Math.random() > 0.35;
      const intensity = isGold ? 0.28 + Math.random() * 0.12 : 0.07 + Math.random() * 0.05;
      col[i * 3] = c.r * intensity * 2.8;
      col[i * 3 + 1] = c.g * intensity * 2.8;
      col[i * 3 + 2] = c.b * intensity * 2.8;

      vel[i * 3] = (Math.random() - 0.5) * 0.012;
      vel[i * 3 + 1] = 0.006 + Math.random() * 0.014;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.012;
    }
    velRef.current = vel;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return geo;
  }, []);

  useFrame(() => {
    const pts = ref.current;
    const vel = velRef.current;
    if (!pts || !vel) return;
    const posAttr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] += vel[i * 3];
      arr[i * 3 + 1] += vel[i * 3 + 1];
      arr[i * 3 + 2] += vel[i * 3 + 2];
      if (arr[i * 3 + 1] > 15) arr[i * 3 + 1] = -15;
      if (arr[i * 3] > 15) arr[i * 3] = -15;
      else if (arr[i * 3] < -15) arr[i * 3] = 15;
      if (arr[i * 3 + 2] > 15) arr[i * 3 + 2] = -15;
      else if (arr[i * 3 + 2] < -15) arr[i * 3 + 2] = 15;
    }
    posAttr.needsUpdate = true;
    pts.rotation.y += 0.00022;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.9}
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
      <color attach="background" args={["#050505"]} />
      <Particles />
    </>
  );
}

export function HeroBackground({
  canvasOpacity = 1,
  position = "absolute",
}: {
  /** Dim particles when layered (e.g. portfolio "ALL" tab). */
  canvasOpacity?: number;
  position?: "absolute" | "fixed";
}) {
  return (
    <div
      className={`pointer-events-none inset-0 z-0 min-h-full w-full ${position === "fixed" ? "fixed" : "absolute"}`}
      style={{ opacity: canvasOpacity }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 100 }}
        gl={{
          alpha: false,
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
  );
}

