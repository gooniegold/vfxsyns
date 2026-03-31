"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.message || "Login failed");
        return;
      }
      router.push("/admin/keys");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-white/20 bg-zinc-950 p-6 rounded-xl"
      >
        <h1 className="text-xl font-semibold tracking-wide">QuickDraft Admin Login</h1>
        <p className="mt-2 text-sm text-zinc-400">Private keys dashboard access</p>

        <label htmlFor="admin-username" className="mt-6 block text-sm text-zinc-300">
          Username
        </label>
        <input
          id="admin-username"
          aria-label="Admin username"
          className="mt-2 w-full rounded border border-white/20 bg-black px-3 py-2 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />

        <label htmlFor="admin-password" className="mt-4 block text-sm text-zinc-300">
          Password
        </label>
        <input
          id="admin-password"
          aria-label="Admin password"
          type="password"
          className="mt-2 w-full rounded border border-white/20 bg-black px-3 py-2 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

        <button
          disabled={busy}
          className="mt-6 w-full rounded bg-white text-black py-2 font-medium disabled:opacity-50"
          type="submit"
        >
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
