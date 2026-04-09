"use client"
import React, { useEffect, useState, memo } from 'react';
import { Layers, MonitorPlay, Aperture, Sparkles, Hexagon, CircleDashed, CodeXml } from 'lucide-react';

// --- Type Definitions ---
type IconType = 'aftereffects' | 'premiere' | 'resolve' | 'blender' | 'marvelous' | 'aftereffects2';
type GlowColor = 'cyan' | 'purple';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Improved SVG Icon Components using lucide-react ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  aftereffects: { component: () => <Layers className="w-full h-full text-purple-400" />, color: '#a855f7' },
  premiere: { component: () => <MonitorPlay className="w-full h-full text-violet-400" />, color: '#8b5cf6' },
  resolve: { component: () => <Aperture className="w-full h-full text-fuchsia-400" />, color: '#d946ef' },
  aftereffects2: { component: () => <CircleDashed className="w-full h-full text-cyan-300" />, color: '#67e8f9' },
  marvelous: { component: () => <Sparkles className="w-full h-full text-emerald-300" />, color: '#6ee7b7' },
  blender: { component: () => <Hexagon className="w-full h-full text-orange-400" />, color: '#f97316' },
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Configuration for the Orbiting Skills ---
const skillsConfig: SkillConfig[] = [
  // Inner Orbit
  { 
    id: 'aftereffects',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'aftereffects', 
    phaseShift: 0, 
    glowColor: 'purple',
    label: 'After Effects'
  },
  { 
    id: 'premiere',
    orbitRadius: 100, 
    size: 45, 
    speed: 1, 
    iconType: 'premiere', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'Premiere Pro'
  },
  { 
    id: 'resolve',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'resolve', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'DaVinci Resolve'
  },
  // Outer Orbit
  { 
    id: 'aftereffects-advanced',
    orbitRadius: 180, 
    size: 50, 
    speed: -0.6, 
    iconType: 'aftereffects2', 
    phaseShift: 0, 
    glowColor: 'cyan',
    label: 'After Effects'
  },
  { 
    id: 'marvelous',
    orbitRadius: 180, 
    size: 45, 
    speed: -0.6, 
    iconType: 'marvelous', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'Marvelous Designer'
  },
  { 
    id: 'blender',
    orbitRadius: 180, 
    size: 40, 
    speed: -0.6, 
    iconType: 'blender', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'Blender'
  },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-gray-900/90 backdrop-blur-md
          rounded-full flex items-center justify-center border border-[var(--border-accent)]
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-[0_0_20px_var(--accent-glow)]' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : undefined
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/95 backdrop-blur-sm rounded text-[10px] uppercase font-mono tracking-widest text-[#fff] whitespace-nowrap pointer-events-none border border-[var(--border-subtle)]">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.2)',
      secondary: 'rgba(6, 182, 212, 0.1)',
      border: 'rgba(6, 182, 212, 0.15)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.2)',
      secondary: 'rgba(147, 51, 234, 0.1)',
      border: 'rgba(147, 51, 234, 0.15)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full animate-pulse opacity-50"
        style={{
          background: `radial-gradient(circle, transparent 40%, ${colors.secondary} 80%, ${colors.primary} 100%)`,
          boxShadow: `0 0 40px ${colors.primary}, inset 0 0 40px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Static ring for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px dashed ${colors.border}`,
          boxShadow: `inset 0 0 10px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'purple', delay: 0 },
    { radius: 180, glowColor: 'cyan', delay: 1.5 }
  ];

  return (
    <div className="w-full flex items-center justify-center overflow-hidden relative">
      <div 
        className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[450px] md:h-[450px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Central "Code" Icon with enhanced glow */}
        <div className="w-20 h-20 bg-[var(--bg-elevated)] border border-[var(--border-accent)] rounded-full flex items-center justify-center z-10 relative shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-[10] flex items-center justify-center w-full h-full text-white">
             <CodeXml className="w-8 h-8 opacity-80" strokeWidth={1.5} />
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting skill icons */}
        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </div>
  );
}
