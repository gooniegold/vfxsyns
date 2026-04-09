const DEFAULT_TIMEOUT_MS = 12000;

function requireEnv(name: string): string {
  const value = process.env[name];
  const clean = String(value || "").trim();
  if (!clean) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return clean;
}

function withTimeout(signalMs = DEFAULT_TIMEOUT_MS): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), signalMs);
  return controller.signal;
}

export type IssueLicenseInput = {
  email: string;
  orderId: string;
  maxActivations?: number;
  /**
   * License worker `product` field (must match your Worker / license API).
   * Use `licenseProductIdForHandle` from Stripe `productHandle`, or set LICENSE_PRODUCT_MAP.
   */
  product?: string;
};

/** Maps shop handles (e.g. quickdraft-pro) → worker product ids. See LICENSE_PRODUCT_MAP in .env.example */
export function licenseProductIdForHandle(handle: string): string {
  const raw = process.env.LICENSE_PRODUCT_MAP?.trim();
  if (!raw) return "quickdraft";
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return "quickdraft";
    const key = handle.trim().toLowerCase();
    const v = (parsed as Record<string, unknown>)[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  } catch {
    return "quickdraft";
  }
  return "quickdraft";
}

export type LicenseRecord = {
  key: string;
  email: string | null;
  order_id: string | null;
  status: string;
  max_activations: number;
  activation_count: number;
  created_at: string;
  updated_at: string;
};

export async function issueLicense(input: IssueLicenseInput) {
  const baseUrl = requireEnv("LICENSE_API_BASE_URL");
  const adminToken = requireEnv("LICENSE_ADMIN_TOKEN");
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/admin/issue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      email: input.email,
      orderId: input.orderId,
      product: input.product ?? "quickdraft",
      maxActivations: input.maxActivations ?? 1,
    }),
    signal: withTimeout(),
  });

  const data = (await res.json()) as { ok?: boolean; key?: string; message?: string };
  if (!res.ok || !data.ok || !data.key) {
    throw new Error(data.message || "License issue failed");
  }
  return data.key;
}

export async function revokeLicense(licenseKey: string) {
  const baseUrl = requireEnv("LICENSE_API_BASE_URL");
  const adminToken = requireEnv("LICENSE_ADMIN_TOKEN");
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/admin/revoke`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({ licenseKey }),
    signal: withTimeout(),
  });
  const data = (await res.json()) as { ok?: boolean; message?: string };
  if (!res.ok || !data.ok) {
    throw new Error(data.message || "License revoke failed");
  }
}

export async function issueOwnerLicense(input: { email?: string; label?: string }) {
  const baseUrl = requireEnv("LICENSE_API_BASE_URL");
  const adminToken = requireEnv("LICENSE_ADMIN_TOKEN");
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/admin/issue-owner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      email: input.email || "owner@quickdraft.local",
      label: input.label || "owner",
    }),
    signal: withTimeout(),
  });

  const data = (await res.json()) as { ok?: boolean; key?: string; message?: string };
  if (!res.ok || !data.ok || !data.key) {
    throw new Error(data.message || "Owner license issue failed");
  }
  return data.key;
}

export async function listLicenses(search = "", limit = 200): Promise<LicenseRecord[]> {
  const baseUrl = requireEnv("LICENSE_API_BASE_URL");
  const adminToken = requireEnv("LICENSE_ADMIN_TOKEN");
  const url = new URL(`${baseUrl.replace(/\/$/, "")}/admin/list`);
  if (search.trim()) {
    url.searchParams.set("q", search.trim());
  }
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
    signal: withTimeout(),
  });

  const data = (await res.json()) as {
    ok?: boolean;
    message?: string;
    licenses?: LicenseRecord[];
  };
  if (!res.ok || !data.ok || !Array.isArray(data.licenses)) {
    throw new Error(data.message || "License list failed");
  }
  return data.licenses;
}

export async function transferLicense(licenseKey: string) {
  const baseUrl = requireEnv("LICENSE_API_BASE_URL");
  const adminToken = requireEnv("LICENSE_ADMIN_TOKEN");
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/admin/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({ licenseKey }),
    signal: withTimeout(),
  });
  const data = (await res.json()) as { ok?: boolean; message?: string };
  if (!res.ok || !data.ok) {
    throw new Error(data.message || "License transfer failed");
  }
}

export async function selfLookupLicense(input: { licenseKey: string; email: string }) {
  const baseUrl = requireEnv("LICENSE_API_BASE_URL");
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/self/lookup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      licenseKey: input.licenseKey,
      email: input.email,
    }),
    signal: withTimeout(),
  });
  const data = (await res.json()) as {
    ok?: boolean;
    message?: string;
    license?: {
      key: string;
      email: string;
      orderId: string;
      status: string;
      activationCount: number;
      maxActivations: number;
      createdAt: string;
      updatedAt: string;
    };
  };
  if (!res.ok || !data.ok || !data.license) {
    throw new Error(data.message || "Lookup failed");
  }
  return data.license;
}

export async function selfTransferLicense(input: { licenseKey: string; email: string }) {
  const baseUrl = requireEnv("LICENSE_API_BASE_URL");
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/self/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      licenseKey: input.licenseKey,
      email: input.email,
    }),
    signal: withTimeout(),
  });
  const data = (await res.json()) as { ok?: boolean; message?: string };
  if (!res.ok || !data.ok) {
    throw new Error(data.message || "Transfer failed");
  }
}
