import ClientAuthGuard from "@/auth/guards/client/AuthGuard";
import AdminSection from "@/sections/admin";

export default function AdminPage() {
  return (
    <ClientAuthGuard requiredRole="admin">
      <AdminSection />
    </ClientAuthGuard>
  );
}
