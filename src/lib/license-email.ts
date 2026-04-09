function requireEnv(name: string): string {
  const value = process.env[name];
  const clean = String(value || "").trim();
  if (!clean) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return clean;
}

export async function sendLicenseEmail(params: {
  to: string;
  licenseKey: string;
  downloadUrl: string;
  orderId: string;
}) {
  const resendApiKey = requireEnv("RESEND_API_KEY");
  const from = requireEnv("LICENSE_EMAIL_FROM");

  const subject = "Your QuickDraft License + Download";
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 12px">QuickDraft Purchase Complete</h2>
      <p>Thanks for your purchase. Your license key is ready:</p>
      <p style="font-size:18px;font-weight:700;letter-spacing:1px">${params.licenseKey}</p>
      <p><strong>Order:</strong> ${params.orderId}</p>
      <p><a href="${params.downloadUrl}" style="display:inline-block;padding:10px 14px;background:#111;color:#fff;text-decoration:none;border-radius:6px">Download QuickDraft</a></p>
      <p style="margin-top:16px;color:#555">Keep this key private. It is HWID-locked by default.</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Email send failed: ${text}`);
  }
}
