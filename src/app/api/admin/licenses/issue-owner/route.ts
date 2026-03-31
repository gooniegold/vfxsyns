import { NextRequest, NextResponse } from "next/server";
import { issueOwnerLicense } from "@/lib/license-api";
import { requireAdminOrResponse } from "@/lib/admin-route-auth";

type Body = {
  email?: string;
  label?: string;
};

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdminOrResponse();
  if (unauthorized) return unauthorized;

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    body = {};
  }

  try {
    const key = await issueOwnerLicense({ email: body.email, label: body.label });
    return NextResponse.json({ ok: true, key, owner: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Issue owner key failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
