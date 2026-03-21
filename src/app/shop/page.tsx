import ShinyText from "@/components/react-bits/ShinyText";
import { ShopView } from "@/components/pages/ShopView";
import { SynPageHero } from "@/components/pages/SynPageHero";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";

export default function ShopPage() {
  return (
    <ShopView
      pageHeader={
        <>
          <div className="mx-auto max-w-[1400px] px-6 pt-6 md:px-10">
            <PageBreadcrumb items={[{ label: "HOME", href: "/" }, { label: "SHOP" }]} />
          </div>
        <SynPageHero
          eyebrow={
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
              <ShinyText speed={3} className="font-mono text-[10px] uppercase tracking-[0.2em]">
                ● VFX PACKS
              </ShinyText>
            </p>
          }
          title="THE SHOP"
          titleClassName="font-display w-full text-center text-[clamp(56px,8vw,120px)] leading-none tracking-[0.05em]"
          subtitle="Instant delivery. One-time payment. No subscription."
          subtitleClassName="w-full max-w-none text-center"
        />
        </>
      }
    />
  );
}
