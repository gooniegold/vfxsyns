import { PortfolioView } from "@/components/pages/PortfolioView";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";

export default function PortfolioPage() {
  return (
    <PortfolioView
      pageHeader={
        <div className="relative">
          <div className="absolute top-0 left-0 w-full z-50 mx-auto max-w-[1400px] px-6 pt-6 md:px-10 mix-blend-difference text-white">
            <PageBreadcrumb items={[{ label: "HOME", href: "/" }, { label: "WORK" }]} />
          </div>
          <HeroGeometric
            badge="WORK"
            title1="PORTFOLIO"
            title2="GRID"
            tagline="Full pieces below—filters sort music videos vs color work."
            className="border-b border-[var(--border-subtle)]"
          />
        </div>
      }
    />
  );
}
