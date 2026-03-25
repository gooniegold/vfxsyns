import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid"
import { Aperture, Video, Layers, Box } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import ShinyText from "@/components/react-bits/ShinyText";

const capabilities: BentoItem[] = [
    {
        title: "3D Animation & Simulation",
        meta: "UNREAL / HOUDINI",
        description: "High-end 3D sequences, physics simulations, and surreal environments custom-built for the timeline.",
        icon: <Box className="w-5 h-5 text-[var(--accent)]" />,
        status: "S-Tier",
        tags: ["CGI", "Physics", "Unreal Engine"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Color Grading",
        meta: "DAVINCI RESOLVE",
        description: "Cinematic commercial and hyper-stylized music video grading.",
        icon: <Aperture className="w-5 h-5 text-indigo-400" />,
        status: "Active",
        tags: ["Look Dev", "Cinematic"],
    },
    {
        title: "Music Video VFX",
        meta: "SYN SIGNATURE",
        description: "Glitch art, trippy transitions, and hyper-stylized overlays used natively by top-charting artists.",
        icon: <Video className="w-5 h-5 text-purple-400" />,
        tags: ["Transitions", "Overlays"],
        colSpan: 2,
    },
    {
        title: "Technical Compositing",
        meta: "AFTER EFFECTS",
        description: "Seamless green screen extraction, tracker implementation, and element integration.",
        icon: <Layers className="w-5 h-5 text-sky-400" />,
        status: "Verified",
        tags: ["Compositing", "Clean Plate"],
    },
];

export function CapabilitiesBento() {
    return (
        <ScrollReveal>
            <section className="syn-home-snap-section relative z-[1] px-6 py-[120px] md:px-10">
                <div className="relative mx-auto max-w-[1400px]">
                    <div className="text-center mb-16 relative z-[1]">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-2">
                            <ShinyText speed={3} className="font-mono text-[10px] uppercase tracking-[0.2em]">
                                ● ARSENAL
                            </ShinyText>
                        </p>
                        <h2 className="font-display text-[clamp(48px,6vw,96px)] leading-none tracking-tight">
                            TECHNICAL <span className="text-[var(--accent-bright)]">CAPABILITIES</span>
                        </h2>
                    </div>
                    
                    <div className="relative z-[10] mt-8">
                        <BentoGrid items={capabilities} />
                    </div>
                </div>
            </section>
        </ScrollReveal>
    );
}
