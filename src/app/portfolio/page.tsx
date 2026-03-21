import { PortfolioView } from "@/components/pages/PortfolioView";
import { SynPageHero } from "@/components/pages/SynPageHero";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";

export default function PortfolioPage() {
  return (
    <PortfolioView
      pageHeader={
        <>
          <div className="mx-auto max-w-[1400px] px-6 pt-6 md:px-10">
            <PageBreadcrumb items={[{ label: "HOME", href: "/" }, { label: "WORK" }]} />
          </div>
          <SynPageHero
            sectionGhostNum="01"
            title="THE WORK"
            subtitle="Atlanta, GA — music videos, 3D, and color."
          />
        </>
      }
    />
  );
}
