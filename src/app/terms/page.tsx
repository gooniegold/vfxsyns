export default function TermsPage() {
  return (
    <main className="relative z-[1] mx-auto max-w-[980px] px-6 py-24 md:px-10">
      <h1 className="font-display text-[clamp(36px,6vw,72px)] tracking-[0.04em]">Terms of Service</h1>
      <p className="mt-6 text-[var(--text-secondary)]">
        By purchasing products or services from VFXSYN, you agree to these terms.
      </p>

      <section className="mt-10 space-y-6 text-[var(--text-secondary)]">
        <p><strong className="text-[var(--text-primary)]">License:</strong> Digital products are licensed, not sold. One purchase grants usage rights for your projects unless otherwise noted.</p>
        <p><strong className="text-[var(--text-primary)]">Payments:</strong> All payments are final once product access has been delivered.</p>
        <p><strong className="text-[var(--text-primary)]">Delivery:</strong> Product delivery is digital. Ensure your email and checkout details are accurate before purchase.</p>
        <p><strong className="text-[var(--text-primary)]">Abuse:</strong> License sharing, unauthorized redistribution, or fraud may lead to revocation.</p>
        <p><strong className="text-[var(--text-primary)]">Support:</strong> For support, use the license portal or contact official VFXSYN channels.</p>
      </section>
    </main>
  );
}
