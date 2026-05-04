"use client";
import React from "react";
import { Layout } from "@/Layout/Layout";

export default function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
//   const pathname = usePathname();
  // If route starts with /admin-panel, do not wrap with Layout
//   if (pathname.startsWith("/admin-panel")) {
//     return <>{children}</>;
//   }
  return <Layout>{children}</Layout>;
}
