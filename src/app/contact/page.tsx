import { ContactView } from "@/components/pages/ContactView";
import { SynPageHero } from "@/components/pages/SynPageHero";

export default function ContactPage() {
  return (
    <ContactView
      pageHeader={
        <SynPageHero title="LET'S TALK" innerClassName="mx-auto max-w-[1200px]" />
      }
    />
  );
}
