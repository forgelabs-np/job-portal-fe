// components/AgencyApprovalGuard.tsx
"use client";
import { useEffect, useState } from "react";
import { httpClient } from "@/utils/axios";
import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { AgencyVerificationModal } from "@/app/agency/(components)/AgencyVerificationModal";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Box, Flex, Spinner } from "@chakra-ui/react";

export const AgencyApprovalGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { role } = useAuthStore();
  const router = useRouter();
  const [isApproved, setIsApproved] = useState<boolean | null>(null); // null = still checking

  useEffect(() => {
    if (role !== "AGENCY") return; // only check for agency users

    httpClient
      .get<ApiResponse<boolean>>(api.AGENCY.APPROVED_PROFILE)
      .then((response) => {
        setIsApproved(response.data.data);
      })
      .catch(() => {
        setIsApproved(false);
      });
  }, [role]);

  // Still checking — show nothing (or a spinner)
  if (role === "AGENCY" && isApproved === null) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="green.500" />
      </Flex>
    );
  }

  return (
    <>
      {/* Blur/block content if not approved */}
      <Box
        filter={isApproved === false ? "blur(4px)" : "none"}
        pointerEvents={isApproved === false ? "none" : "auto"}
        userSelect={isApproved === false ? "none" : "auto"}
        transition="filter 0.2s"
      >
        {children}
      </Box>

      {/* Modal is unaffected by blur since it's rendered outside the blurred box */}
      <AgencyVerificationModal
        isOpen={isApproved === false}
        onClose={() => {}} // no close — they must verify
        onSuccess={() => {
          setIsApproved(true); // unblock UI
        }}
      />
    </>
  );
};
