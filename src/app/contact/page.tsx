import { ContactView } from "@/components/pages/ContactView";
import { SynPageHero } from "@/components/pages/SynPageHero";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";

export default function ContactPage() {
  return (
    <ContactView
      pageHeader={
        <>
          <div className="mx-auto max-w-[1400px] px-6 pt-6 md:px-10">
            <PageBreadcrumb items={[{ label: "HOME", href: "/" }, { label: "CONTACT" }]} />
          </div>
          <SynPageHero
            title="LET'S TALK"
            typewriterTitle
            innerClassName="mx-auto max-w-[1200px]"
          />
        </>
      }
    />
  );
}
