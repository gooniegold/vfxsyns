export default function PrivacyPage() {
  return (
    <main className="relative z-[1] mx-auto max-w-[980px] px-6 py-24 md:px-10">
      <h1 className="font-display text-[clamp(36px,6vw,72px)] tracking-[0.04em]">Privacy Policy</h1>
      <p className="mt-6 text-[var(--text-secondary)]">
        This policy explains how VFXSYN collects and uses data.
      </p>

      <section className="mt-10 space-y-6 text-[var(--text-secondary)]">
        <p><strong className="text-[var(--text-primary)]">Collected data:</strong> Name, contact details, order metadata, and license activity used for fulfillment and support.</p>
        <p><strong className="text-[var(--text-primary)]">Payment data:</strong> Payments are processed by Stripe. Sensitive card data is handled by Stripe, not stored on this site.</p>
        <p><strong className="text-[var(--text-primary)]">License verification:</strong> Device-related license activation data may be stored to prevent abuse and manage transfers.</p>
        <p><strong className="text-[var(--text-primary)]">Use of data:</strong> Used for order fulfillment, support, fraud prevention, and product operations.</p>
        <p><strong className="text-[var(--text-primary)]">Requests:</strong> For privacy requests, contact VFXSYN through official support channels.</p>
      </section>
    </main>
  );
}
