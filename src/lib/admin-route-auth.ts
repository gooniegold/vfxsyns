import { NextResponse } from "next/server";
import { getIsAdminAuthenticated } from "@/lib/admin-auth";

export async function requireAdminOrResponse(): Promise<NextResponse | null> {
  const authenticated = await getIsAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
  return null;
}
