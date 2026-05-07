"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: {
          value: "Plus Jakarta Sans, sans-serif",
        },
        heading: {
          value: "Plus Jakarta Sans, sans-serif",
        },
      },
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
}
