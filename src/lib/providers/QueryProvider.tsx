"use client";
import { ReactNode, useState } from "react";
import { createQueryClient } from "../query/query.client";
import { QueryClientProvider } from "@tanstack/react-query";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  // useState keeps one client per browser session
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
