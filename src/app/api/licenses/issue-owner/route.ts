import { NextRequest, NextResponse } from "next/server";
import { issueOwnerLicense } from "@/lib/license-api";

type OwnerIssueRequestBody = {
  email?: string;
  label?: string;
};

function isAuthorized(request: NextRequest): boolean {
  const expected = String(process.env.LICENSE_ISSUE_SECRET || "").trim();
  if (!expected) return false;
  const provided = String(request.headers.get("x-license-secret") || "").trim();
  return provided === expected;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: OwnerIssueRequestBody = {};
  try {
    body = (await request.json()) as OwnerIssueRequestBody;
  } catch {
    body = {};
  }

  try {
    const key = await issueOwnerLicense({
      email: body.email,
      label: body.label,
    });
    return NextResponse.json({ ok: true, key, owner: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Owner license issue failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
