import { PortfolioView } from "@/components/pages/PortfolioView";
import { SynPageHero } from "@/components/pages/SynPageHero";

export default function PortfolioPage() {
  return (
    <PortfolioView
      pageHeader={
        <SynPageHero
          sectionGhostNum="01"
          title="THE WORK"
          subtitle="Atlanta, GA — music videos, 3D, and color."
        />
      }
    />
  );
}
