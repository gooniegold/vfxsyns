import { redirect } from "next/navigation";
import { getIsAdminAuthenticated } from "@/lib/admin-auth";
import { KeysAdminPanel } from "@/components/admin/KeysAdminPanel";

export default async function AdminKeysPage() {
  const authenticated = await getIsAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }
  return <KeysAdminPanel />;
}
