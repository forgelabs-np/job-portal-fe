"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/Layout/Layout";
import { DashboardLayout } from "@/Layout/DashboardLayout";
import TokenService from "@/utils/token";
import { useAuthStore, useCurrentUserStore } from "@/store";
import { ROUTES } from "@/constants/routes";
import { usePathname } from "next/navigation";
import { AgencyApprovalGuard } from "./agency/(components)/AgencyApprovalGaurd";
import { fetchAndStoreCurrentUser } from "@/api/auth";

export default function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, authReady, initializeAuth } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!authReady) return;
    if (!isAuthenticated) {
      useCurrentUserStore.getState().clearProfile();
      return;
    }
    void fetchAndStoreCurrentUser();
  }, [authReady, isAuthenticated]);

  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/opportunities") ||
    pathname.startsWith("/agency") ||
    pathname.startsWith("/country-management") ||
    pathname.startsWith("/job") ||
    pathname.startsWith("/applications");

  const resolveRedirectPath = () => {
    const tokenDetails = TokenService.getTokenDetails();
    const role = tokenDetails?.roles?.[0];
    if (role === "ADMIN") return ROUTES.ADMIN_DASHBOARD;
    if (role === "AGENCY") return ROUTES.AGENCY_DASHBOARD;
    return ROUTES.ADMIN_DASHBOARD;
  };

  useEffect(() => {
    if (!authReady) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (isAuthenticated && isPublicRoute) {
      router.replace(resolveRedirectPath());
    }
  }, [authReady, isAuthenticated, isPublicRoute, pathname, router]);

  const { profile } = useCurrentUserStore();

  if (isAuthenticated && isDashboardRoute) {
    const isAgency = TokenService.getTokenDetails()?.roles?.[0] === "AGENCY";
    const isApproved = profile?.profileApprovalStatus === "APPROVED";
    const profileComplete = profile?.profileComplete;
    const hideNavigation = isAgency && (!isApproved || !profileComplete);

    return (
      <DashboardLayout hideNavigation={hideNavigation}>
        {isAgency ? (
          <AgencyApprovalGuard>{children}</AgencyApprovalGuard>
        ) : (
          children
        )}
      </DashboardLayout>
    );
  }

  return <Layout>{children}</Layout>;
}
