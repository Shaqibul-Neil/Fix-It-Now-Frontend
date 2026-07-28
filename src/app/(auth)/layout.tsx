export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
