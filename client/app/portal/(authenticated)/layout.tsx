import Sidebar from '@/components/admin/Sidebar';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';

export default function AdminAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}
