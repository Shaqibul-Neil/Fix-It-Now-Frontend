import { QueryProvider } from "@/lib/query/QueryProvider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <div className="flex flex-1">
        {/* <DashboardSidebar /> */}
        <div className="flex flex-1 flex-col">
          {/* <DashboardTopbar /> */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </QueryProvider>
  );
}
