// Entry point for /dashboard.
// TODO: read role from session and redirect to /dashboard/{admin|technician|customer}.
export default function DashboardEntryPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
    </section>
  );
}
