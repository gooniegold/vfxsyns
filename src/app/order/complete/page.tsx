import { redirect } from "next/navigation";

/** Alias URL: /order/complete?session_id=… → /thank-you (same query). Configure Sellhub / Stripe success URL to either path. */
export default async function OrderCompleteAliasPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const sessionId = typeof sp.session_id === "string" ? sp.session_id : "";
  const ref = typeof sp.ref === "string" ? sp.ref : "";
  const q = new URLSearchParams();
  if (sessionId) q.set("session_id", sessionId);
  if (ref) q.set("ref", ref);
  const suffix = q.toString();
  redirect(suffix ? `/thank-you?${suffix}` : "/thank-you");
}
