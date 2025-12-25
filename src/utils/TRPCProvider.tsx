"use client";

import { ReactNode, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "./trpc";

export function TRPCProvider({ children }: { children: ReactNode }) {
  const [queryClient, trpcClient] = useMemo(
    () => {
      const qc = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      });

      const tc = trpc.createClient({
        links: [
          httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
            transformer: superjson,
          }),
        ],
      });

      return [qc, tc];
    },
    []
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT || 3000}`;
}
