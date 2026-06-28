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
import { CandidateProfileGuard } from "./candidate/(components)/CandidateProfileGuard";
import { fetchAndStoreCurrentUser } from "@/api/auth";
import { LoadingOverlay } from "@/shared/components/LoadingOverlay";

export default function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, authReady, initializeAuth, isLoggingOut } = useAuthStore();
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
    pathname.startsWith("/register") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/forgot-password")||
    pathname.startsWith("/reset-password")


  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/opportunities") ||
    pathname.startsWith("/agency") ||
    pathname.startsWith("/candidate") ||
    pathname.startsWith("/country-management") ||
    pathname.startsWith("/job") ||
    pathname.startsWith("/applications") ||
    pathname.startsWith("/interview") ||
    pathname.startsWith("/announcements") ||
    pathname.startsWith("/notifications");


  const resolveRedirectPath = () => {
    const tokenDetails = TokenService.getTokenDetails();
    const role = tokenDetails?.roles?.[0];
    if (role === "ADMIN") return ROUTES.ADMIN_DASHBOARD;
    if (role === "AGENCY") return ROUTES.AGENCY_DASHBOARD;
    if (role === "CANDIDATE") return ROUTES.CANDIDATE_DASHBOARD;
    return ROUTES.ADMIN_DASHBOARD;
  };

  useEffect(() => {
    if (!authReady) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.replace(ROUTES.HOME);
      return;
    }

    if (isAuthenticated && isPublicRoute) {
      router.replace(resolveRedirectPath());
    }
  }, [authReady, isAuthenticated, isPublicRoute, pathname, router]);

  const { profile } = useCurrentUserStore();

  if (isAuthenticated && isDashboardRoute) {
    const role = TokenService.getTokenDetails()?.roles?.[0];
    const isAgency = role === "AGENCY";
    const isCandidate = role === "CANDIDATE";
    const isApproved = profile?.profileApprovalStatus === "APPROVED";
    const profileComplete = profile?.profileComplete;

    const hideNavigation =
      (isAgency && (!isApproved || !profileComplete)) ||
      (isCandidate && (!profileComplete || profile?.onboardingStage !== "COMPLETE"));

    return (
      <>
        {isLoggingOut && <LoadingOverlay />}
        <DashboardLayout hideNavigation={hideNavigation}>
          {isAgency ? (
            <AgencyApprovalGuard>{children}</AgencyApprovalGuard>
          ) : isCandidate ? (
            <CandidateProfileGuard>{children}</CandidateProfileGuard>
          ) : (
            children
          )}
        </DashboardLayout>
      </>
    );
  }

  return (
    <>
      {isLoggingOut && <LoadingOverlay />}
      <Layout>{children}</Layout>
    </>
  );
}
