import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid"
import { Aperture, Video, Layers, Box } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import ShinyText from "@/components/react-bits/ShinyText";

const capabilities: BentoItem[] = [
    {
        title: "3D & simulation",
        meta: "BLENDER / MARVELOUS",
        description: "Shot CG, cloth, and simple sims when the concept needs it, not by default.",
        icon: <Box className="w-5 h-5 text-[var(--accent)]" />,
        status: "CG",
        tags: ["CGI", "Physics", "Blender"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Color",
        meta: "RESOLVE",
        description: "Commercial polish or aggressive music video looks, matched to your references.",
        icon: <Aperture className="w-5 h-5 text-indigo-400" />,
        status: "Grade",
        tags: ["Look Dev", "Cinematic"],
    },
    {
        title: "Music-video VFX",
        meta: "AFTER EFFECTS",
        description: "Transitions, glitch, overlays, and comp-heavy shots built for the cut.",
        icon: <Video className="w-5 h-5 text-purple-400" />,
        tags: ["Transitions", "Overlays"],
        colSpan: 2,
    },
    {
        title: "Compositing",
        meta: "AFTER EFFECTS",
        description: "Keys, tracks, screen replates, and clean-ups that survive full-screen.",
        icon: <Layers className="w-5 h-5 text-sky-400" />,
        status: "Comp",
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
                                ● SERVICES
                            </ShinyText>
                        </p>
                        <h2 className="font-display text-[clamp(48px,6vw,96px)] leading-none tracking-tight">
                            WHAT I <span className="text-[var(--accent-bright)]">ACTUALLY DO</span>
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
