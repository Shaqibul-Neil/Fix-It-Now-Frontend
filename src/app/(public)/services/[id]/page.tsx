type PageProps = { params: Promise<{ id: string }> };

export default async function ServiceDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Service Details</h1>
      <p className="text-sm text-muted-foreground">id: {id}</p>
    </section>
  );
}
