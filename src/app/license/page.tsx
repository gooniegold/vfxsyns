"use client";

import { FormEvent, useState } from "react";

type LookupLicense = {
  key: string;
  email: string;
  orderId: string;
  status: string;
  activationCount: number;
  maxActivations: number;
  createdAt: string;
  updatedAt: string;
};

export default function LicensePortalPage() {
  const [email, setEmail] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [license, setLicense] = useState<LookupLicense | null>(null);

  async function lookup(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/licenses/self-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, licenseKey }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        license?: LookupLicense;
      };
      if (!response.ok || !data.ok || !data.license) {
        throw new Error(data.message || "Lookup failed");
      }
      setLicense(data.license);
      setMessage("License found.");
    } catch (error) {
      setLicense(null);
      setMessage(error instanceof Error ? error.message : "Lookup failed");
    } finally {
      setBusy(false);
    }
  }

  async function transfer() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/licenses/self-transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, licenseKey }),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Transfer failed");
      }
      setMessage("Transfer complete. Use your key on the new machine now.");
      setLicense(null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Transfer failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-6">
      <div className="mx-auto max-w-xl rounded border border-white/15 bg-zinc-950 p-6">
        <h1 className="text-xl font-semibold tracking-wide">VFXSYN License Portal</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Check your license and transfer it to a new machine.
        </p>

        <form onSubmit={lookup} className="mt-6 space-y-3">
          <input
            className="w-full rounded border border-white/20 bg-black px-3 py-2"
            placeholder="Purchase email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full rounded border border-white/20 bg-black px-3 py-2"
            placeholder="License key"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            required
          />
          <button
            className="w-full rounded bg-white text-black py-2 font-medium disabled:opacity-50"
            disabled={busy}
            type="submit"
          >
            {busy ? "Checking..." : "Check License"}
          </button>
        </form>

        {license ? (
          <div className="mt-5 rounded border border-white/15 bg-black/50 p-4 text-sm">
            <p>Status: {license.status}</p>
            <p>
              Activations: {license.activationCount}/{license.maxActivations}
            </p>
            <p>Order: {license.orderId}</p>
            <button
              className="mt-3 rounded border border-amber-400/50 px-3 py-2 text-amber-300 disabled:opacity-50"
              disabled={busy}
              onClick={() => void transfer()}
              type="button"
            >
              Transfer To New Machine
            </button>
          </div>
        ) : null}

        {message ? <p className="mt-4 text-sm text-zinc-300">{message}</p> : null}
      </div>
    </main>
  );
}
