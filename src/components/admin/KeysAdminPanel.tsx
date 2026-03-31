"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type LicenseRecord = {
  key: string;
  email: string | null;
  order_id: string | null;
  status: string;
  max_activations: number;
  activation_count: number;
  created_at: string;
  updated_at: string;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export function KeysAdminPanel() {
  const [licenses, setLicenses] = useState<LicenseRecord[]>([]);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const [issueEmail, setIssueEmail] = useState("");
  const [issueOrderId, setIssueOrderId] = useState("");
  const [issueMax, setIssueMax] = useState(1);

  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerLabel, setOwnerLabel] = useState("main");

  const [fulfillEmail, setFulfillEmail] = useState("");
  const [fulfillOrderId, setFulfillOrderId] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [fulfillMax, setFulfillMax] = useState(1);

  const requestJson = useCallback(async (path: string, init?: RequestInit) => {
    const response = await fetch(path, init);
    const data = (await response.json()) as { ok?: boolean; message?: string; [k: string]: unknown };
    if (!response.ok || !data.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  }, []);

  const refreshList = useCallback(async () => {
    setBusy(true);
    try {
      const data = (await requestJson(
        `/api/admin/licenses/list?q=${encodeURIComponent(search.trim())}`
      )) as { licenses?: LicenseRecord[] };
      setLicenses(Array.isArray(data.licenses) ? data.licenses : []);
      setMessage(`Loaded ${Array.isArray(data.licenses) ? data.licenses.length : 0} keys`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load keys");
    } finally {
      setBusy(false);
    }
  }, [requestJson, search]);

  useEffect(() => {
    void refreshList();
  }, [refreshList]);

  async function handleIssue(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const data = (await requestJson("/api/admin/licenses/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: issueEmail,
          orderId: issueOrderId,
          maxActivations: issueMax,
        }),
      })) as { key?: string };
      setMessage(`Issued key: ${data.key || "(unknown)"}`);
      await refreshList();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Issue failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleIssueOwner(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const data = (await requestJson("/api/admin/licenses/issue-owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: ownerEmail,
          label: ownerLabel,
        }),
      })) as { key?: string };
      setMessage(`Owner key created: ${data.key || "(unknown)"}`);
      await refreshList();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Owner key issue failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleFulfill(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const data = (await requestJson("/api/admin/licenses/fulfill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fulfillEmail,
          orderId: fulfillOrderId,
          downloadUrl,
          maxActivations: fulfillMax,
        }),
      })) as { key?: string };
      setMessage(`Fulfilled + emailed key: ${data.key || "(unknown)"}`);
      await refreshList();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Fulfillment failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleRevoke(licenseKey: string) {
    if (!window.confirm(`Revoke key?\n${licenseKey}`)) return;
    setBusy(true);
    try {
      await requestJson("/api/admin/licenses/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey }),
      });
      setMessage(`Revoked ${licenseKey}`);
      await refreshList();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Revoke failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    try {
      await requestJson("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Logout failed");
      setBusy(false);
    }
  }

  const stats = useMemo(() => {
    const total = licenses.length;
    const active = licenses.filter((x) => x.status === "active").length;
    const revoked = licenses.filter((x) => x.status === "revoked").length;
    return { total, active, revoked };
  }, [licenses]);

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-wide">QuickDraft Keys Control</h1>
            <p className="text-sm text-zinc-400">Private admin dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => void refreshList()}
              className="rounded border border-white/20 px-3 py-2 text-sm hover:bg-white/10"
              disabled={busy}
            >
              Refresh
            </button>
            <button
              onClick={() => void handleLogout()}
              className="rounded border border-red-500/40 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded border border-white/10 bg-zinc-950 p-4">Total keys: {stats.total}</div>
          <div className="rounded border border-white/10 bg-zinc-950 p-4">Active: {stats.active}</div>
          <div className="rounded border border-white/10 bg-zinc-950 p-4">Revoked: {stats.revoked}</div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <form onSubmit={handleIssue} className="rounded border border-white/10 bg-zinc-950 p-4 space-y-3">
            <h2 className="font-medium">Issue Customer Key</h2>
            <input
              className="w-full rounded border border-white/20 bg-black px-3 py-2 text-sm"
              placeholder="buyer email"
              value={issueEmail}
              onChange={(e) => setIssueEmail(e.target.value)}
              required
            />
            <input
              className="w-full rounded border border-white/20 bg-black px-3 py-2 text-sm"
              placeholder="order id"
              value={issueOrderId}
              onChange={(e) => setIssueOrderId(e.target.value)}
              required
            />
            <input
              type="number"
              min={1}
              className="w-full rounded border border-white/20 bg-black px-3 py-2 text-sm"
              placeholder="max activations"
              value={issueMax}
              onChange={(e) => setIssueMax(Number(e.target.value))}
            />
            <button className="w-full rounded bg-white text-black py-2 text-sm font-medium" disabled={busy}>
              Issue key
            </button>
          </form>

          <form onSubmit={handleIssueOwner} className="rounded border border-white/10 bg-zinc-950 p-4 space-y-3">
            <h2 className="font-medium">Issue Owner Key</h2>
            <input
              className="w-full rounded border border-white/20 bg-black px-3 py-2 text-sm"
              placeholder="owner email"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
            <input
              className="w-full rounded border border-white/20 bg-black px-3 py-2 text-sm"
              placeholder="label (main-workstation)"
              value={ownerLabel}
              onChange={(e) => setOwnerLabel(e.target.value)}
            />
            <button className="w-full rounded bg-emerald-400 text-black py-2 text-sm font-medium" disabled={busy}>
              Issue owner key
            </button>
          </form>

          <form onSubmit={handleFulfill} className="rounded border border-white/10 bg-zinc-950 p-4 space-y-3">
            <h2 className="font-medium">Auto Fulfill + Email</h2>
            <input
              className="w-full rounded border border-white/20 bg-black px-3 py-2 text-sm"
              placeholder="buyer email"
              value={fulfillEmail}
              onChange={(e) => setFulfillEmail(e.target.value)}
              required
            />
            <input
              className="w-full rounded border border-white/20 bg-black px-3 py-2 text-sm"
              placeholder="order id"
              value={fulfillOrderId}
              onChange={(e) => setFulfillOrderId(e.target.value)}
              required
            />
            <input
              className="w-full rounded border border-white/20 bg-black px-3 py-2 text-sm"
              placeholder="download url"
              value={downloadUrl}
              onChange={(e) => setDownloadUrl(e.target.value)}
              required
            />
            <input
              type="number"
              min={1}
              aria-label="Fulfillment max activations"
              placeholder="max activations"
              className="w-full rounded border border-white/20 bg-black px-3 py-2 text-sm"
              value={fulfillMax}
              onChange={(e) => setFulfillMax(Number(e.target.value))}
            />
            <button className="w-full rounded bg-indigo-300 text-black py-2 text-sm font-medium" disabled={busy}>
              Issue + email key
            </button>
          </form>
        </div>

        <div className="rounded border border-white/10 bg-zinc-950 p-4">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <input
              aria-label="Search licenses"
              className="w-full md:w-[320px] rounded border border-white/20 bg-black px-3 py-2 text-sm"
              placeholder="Search key, email, order id"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => void refreshList()}
              className="rounded border border-white/20 px-3 py-2 text-sm hover:bg-white/10"
              disabled={busy}
            >
              Search
            </button>
          </div>

          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-zinc-400 border-b border-white/10">
                  <th className="py-2 pr-3">Key</th>
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">Order</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Actv</th>
                  <th className="py-2 pr-3">Created</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {licenses.map((item) => (
                  <tr key={item.key} className="border-b border-white/5 align-top">
                    <td className="py-2 pr-3 font-mono text-xs">{item.key}</td>
                    <td className="py-2 pr-3">{item.email || "-"}</td>
                    <td className="py-2 pr-3">{item.order_id || "-"}</td>
                    <td className="py-2 pr-3">{item.status}</td>
                    <td className="py-2 pr-3">
                      {item.activation_count}/{item.max_activations}
                    </td>
                    <td className="py-2 pr-3 text-zinc-400">{formatDate(item.created_at)}</td>
                    <td className="py-2">
                      <button
                        className="rounded border border-red-500/40 px-2 py-1 text-xs text-red-300 hover:bg-red-500/10 disabled:opacity-40"
                        onClick={() => void handleRevoke(item.key)}
                        disabled={busy || item.status === "revoked"}
                      >
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
                {licenses.length === 0 ? (
                  <tr>
                    <td className="py-8 text-zinc-500" colSpan={7}>
                      No keys found
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        {message ? <p className="text-sm text-zinc-300">{message}</p> : null}
      </div>
    </main>
  );
}
