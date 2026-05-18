"use client";

import { CandidateVerificationModal } from "./CandidateVerificationModal";
import { useAuthStore, useCurrentUserStore } from "@/store";
import { Box, Flex, Spinner } from "@chakra-ui/react";

export const CandidateProfileGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { role } = useAuthStore();
  const { profile, isProfileLoading } = useCurrentUserStore();

  const profileComplete = profile?.profileComplete;
  const documentsUploaded = profile?.onboardingStage === "COMPLETE";



  console.log(profileComplete, documentsUploaded, "profileComplete");

  // Show a loading spinner while state is resolving
  if (role === "CANDIDATE" && (isProfileLoading || !profile)) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="green.500" />
      </Flex>
    );
  }

  const showModal = !profileComplete || !documentsUploaded;

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

      <CandidateVerificationModal
        isOpen={showModal}
        onClose={() => { }}
      />
    </>
  );
};
