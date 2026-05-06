"use client";
import React, { useEffect } from "react";
import { Layout } from "@/Layout/Layout";
import { DashboardLayout } from "@/Layout/DashboardLayout";
import { useAuthStore } from "@/store";
import { usePathname } from "next/navigation";

export default function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const isPublicRoute = ["/login", "/register", "/"].includes(pathname);
  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/opportunities") ||
    pathname.startsWith("/agency") ||
    pathname.startsWith("/country-management") ||
    pathname.startsWith("/my-listings") ||
    pathname.startsWith("/applications");

  if (isAuthenticated && isDashboardRoute) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return <Layout>{children}</Layout>;
}
