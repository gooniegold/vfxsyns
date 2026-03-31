import { redirect } from "next/navigation";
import { getIsAdminAuthenticated } from "@/lib/admin-auth";

export default async function VfxsynControlShortcutPage() {
  const authenticated = await getIsAdminAuthenticated();
  if (authenticated) {
    redirect("/admin/keys");
  }
  redirect("/admin/login");
}
