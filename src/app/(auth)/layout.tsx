import type { ReactNode } from "react";

// The auth screens own their full-bleed split layout, so this only groups the
// routes — no wrapper markup.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return children;
}
