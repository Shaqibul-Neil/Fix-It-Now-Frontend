// src/app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-semibold">404 — Page not found</h1>
      <p className="text-sm text-zinc-500">
        This page does not exist, or you do not have access to it.
      </p>
    </div>
  );
}
