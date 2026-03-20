"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { VfxsynProfileCard } from "@/components/vfxsyn/VfxsynProfileCard";

const quote =
  "Every frame is a decision. Every cut, intentional. Based in Atlanta. Built for the world.";

const words = quote.split(" ");

const ease = [0.16, 1, 0.3, 1] as const;

export function StatementStrip() {
  return (
    <ScrollReveal>
    <section className="relative px-6 py-[100px] md:px-10" aria-label="Statement">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="lg:pr-6">
          <p className="font-quote text-[clamp(26px,3.2vw,44px)] font-normal italic leading-[1.35] text-[var(--text-primary)]">
            {words.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                className="mr-[0.3em] inline-block"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, ease, delay: i * 0.02 }}
              >
                {w}
              </motion.span>
            ))}
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <VfxsynProfileCard />
        </div>
      </div>
    </section>
    </ScrollReveal>
  );
}
