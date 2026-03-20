import { ShopView } from "@/components/pages/ShopView";
import { SynPageHero } from "@/components/pages/SynPageHero";

export default function ShopPage() {
  return (
    <ShopView
      pageHeader={
        <SynPageHero
          eyebrow={
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
              <span className="text-gradient">● VFX PACKS</span>
            </p>
          }
          title="THE SHOP"
          titleClassName="font-display text-[clamp(56px,8vw,120px)] leading-none tracking-[0.05em]"
          subtitle="Instant delivery. One-time payment. No subscription."
        />
      }
    />
  );
}
