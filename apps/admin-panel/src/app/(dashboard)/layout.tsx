import { AdminHeader } from '@/components/layout/AdminHeader';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <AdminHeader />
      <div className="flex pt-16">
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-8 overflow-auto ml-0 lg:ml-64 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
