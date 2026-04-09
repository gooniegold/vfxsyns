import { Suspense } from "react";
import { ThankYouPage } from "@/components/pages/ThankYouPage";

export const metadata = {
  title: "Thank you — VFXSYN",
  description: "Order confirmation and digital delivery.",
};

function ThankYouFallback() {
  return (
    <div className="relative z-[1] mx-auto flex min-h-[40vh] max-w-[640px] items-center justify-center px-5">
      <p className="font-mono text-[12px] text-[var(--text-secondary)]">Loading…</p>
    </div>
  );
}

export default function ThankYouRoutePage() {
  return (
    <Suspense fallback={<ThankYouFallback />}>
      <ThankYouPage />
    </Suspense>
  );
}
