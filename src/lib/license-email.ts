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
  /** Hosted file URL (Stripe does not host your binary; use R2/S3/Drive link or Product metadata download_url). */
  downloadUrl?: string;
  orderId: string;
}) {
  const resendApiKey = requireEnv("RESEND_API_KEY");
  const from = requireEnv("LICENSE_EMAIL_FROM");

  const downloadUrl = String(params.downloadUrl || "").trim();
  const downloadBlock = downloadUrl
    ? `<p><a href="${downloadUrl}" style="display:inline-block;padding:10px 14px;background:#111;color:#fff;text-decoration:none;border-radius:6px">Download your files</a></p>`
    : `<p style="color:#555">Your license is active. If a download link was not attached, check your Stripe receipt email or contact support with your order ID.</p>`;

  const subject = "Your license key + download";
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 12px">Purchase complete</h2>
      <p>Thanks for your purchase. Your license key:</p>
      <p style="font-size:18px;font-weight:700;letter-spacing:1px">${params.licenseKey}</p>
      <p><strong>Order:</strong> ${params.orderId}</p>
      ${downloadBlock}
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
