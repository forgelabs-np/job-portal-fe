// components/AgencyApprovalGuard.tsx
"use client";
import { AgencyVerificationModal } from "@/app/agency/(components)/AgencyVerificationModal";
import { useAuthStore, useCurrentUserStore } from "@/store";
import { Box, Flex, Spinner } from "@chakra-ui/react";

export const AgencyApprovalGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { role } = useAuthStore();
  const { profile, isProfileLoading } = useCurrentUserStore();

  const isApproved = profile?.profileApprovalStatus === "APPROVED";
  const profileComplete = profile?.profileComplete;

  // Still checking — show nothing (or a spinner)
  if (role === "AGENCY" && (isProfileLoading || !profile)) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="green.500" />
      </Flex>
    );
  }

  const showModal = !profileComplete || !isApproved;

  return (
    <>
      <Box
        filter={showModal ? "blur(4px)" : "none"}
        pointerEvents={showModal ? "none" : "auto"}
        userSelect={showModal ? "none" : "auto"}
        transition="filter 0.2s"
      >
        {children}
      </Box>

      <AgencyVerificationModal
        isOpen={showModal}
        onClose={() => { }}
        onSuccess={() => {
          // This might be handled by refetching the me api elsewhere
        }}
      />
    </>
  );
};
