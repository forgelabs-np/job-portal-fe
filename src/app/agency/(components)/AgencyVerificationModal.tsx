"use client";

import {
  AgencyDocumentType,
  useCreateAgencyProfile,
  useGetAgencyProfile,
  useUploadAgencyDocument,
  REQUIRED_DOCUMENTS,
} from "@/api/agency";
import { Button, Dialog } from "@/shared";
import { fetchAndStoreCurrentUser } from "@/api/auth";
import { useAuthStore, useCurrentUserStore } from "@/store";
import { AgencyVerificationStatus } from "./AgencyVerificationStatus";
import { errorNotification } from "@/utils/toast";
import { Box, Flex, HStack, Skeleton, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AgencyVerificationForm } from "./AgencyVerificationForm";

interface AgencyVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface AgencyProfileForm {
  companyName: string;
  companyDescription: string;
  companyWebsite: string;
  companyLogoUrl: string;
  companyAddress: string;
  companyPhone: string;
  registrationNumber: string;
  taxId: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
}


export const AgencyVerificationModal = ({
  isOpen,
  onClose,
  onSuccess,
}: AgencyVerificationModalProps) => {
  const methods = useForm<AgencyProfileForm>();
  const { logout } = useAuthStore();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepOverride, setStepOverride] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [documents, setDocuments] = useState<
    Record<AgencyDocumentType, File | null>
  >({
    TRADE_LICENCE: null,
    COMPANY_REGISTRATION: null,
    MOU: null,
    OWNER_CITIZENSHIP: null,
  });

  const { profile } = useCurrentUserStore();
  const {
    data: agencyProfileData,
    refetch: refetchAgencyProfile,
    isLoading: isProfileLoading,
  } = useGetAgencyProfile({ enabled: !!profile?.profileComplete });

  const agencyProfile = agencyProfileData || profile?.agencyProfile;

  const hasDocuments = (agencyProfile?.documents?.length ?? 0) > 0;
  const anyDocumentRejected = agencyProfile?.documents?.some(
    (doc: any) => doc.status === "REJECTED",
  );
  const profileCompleted = Boolean(profile?.profileComplete);
  const isProfileRejected = profile?.profileApprovalStatus === "REJECTED";
  const isRejected = isProfileRejected || anyDocumentRejected;
  const isPendingReview =
    profile?.profileApprovalStatus === "PENDING" &&
    hasDocuments &&
    !anyDocumentRejected;

  const activeStep = stepOverride ?? (profileCompleted ? 1 : currentStep);

  useEffect(() => {
    if (!agencyProfile) return;
    if (activeStep !== 0) return;

    methods.reset({
      companyName: agencyProfile.companyName ?? "",
      companyDescription: agencyProfile.companyDescription ?? "",
      companyWebsite: agencyProfile.companyWebsite ?? "",
      companyLogoUrl: agencyProfile.companyLogoUrl ?? "",
      companyAddress: agencyProfile.companyAddress ?? "",
      companyPhone: agencyProfile.companyPhone ?? "",
      registrationNumber: agencyProfile.registrationNumber ?? "",
      taxId: agencyProfile.taxId ?? "",
      contactPersonName: agencyProfile.contactPersonName ?? "",
      contactPersonEmail: agencyProfile.contactPersonEmail ?? "",
      contactPersonPhone: agencyProfile.contactPersonPhone ?? "",
    });
  }, [agencyProfile, activeStep, methods]);

  const handleLogout = async () => {
    logout();
    router.push("/login");
  };
  const { mutate: createProfile, isPending } = useCreateAgencyProfile();
  const { mutateAsync: uploadDocument, isPending: isUploading } =
    useUploadAgencyDocument();

  const onSubmit = (data: AgencyProfileForm) => {
    createProfile(
      { data },
      {
        onSuccess: () => {
          setCurrentStep(1);
          setStepOverride(1);
          // void fetchAndStoreCurrentUser();
        },
      },
    );
  };

  const allRequiredDocumentsSelected = useMemo(
    () => REQUIRED_DOCUMENTS.every((doc) => Boolean(documents[doc.type])),
    [documents],
  );

  const handleDocumentChange = (
    documentType: AgencyDocumentType,
    file: File | null,
  ) => {
    setDocuments((prev) => ({
      ...prev,
      [documentType]: file,
    }));
  };

  const handleUploadDocuments = async () => {
    if (!allRequiredDocumentsSelected) {
      errorNotification(
        "Please upload all required documents before continuing.",
      );
      return;
    }

    await Promise.all(
      REQUIRED_DOCUMENTS.map((doc) =>
        uploadDocument({
          documentType: doc.type,
          file: documents[doc.type] as File,
        }),
      ),
    );

    await refetchAgencyProfile();
    await fetchAndStoreCurrentUser();
    setIsEditing(false);
  };

  const handlePrevious = async () => {
    setStepOverride(0);
    await refetchAgencyProfile();
  };

  const isBusy = isPending || isUploading;

  return (
    <Dialog
      title={
        isPendingReview
          ? "Verification Status"
          : isRejected
            ? "Verification Rejected"
            : "Complete Your Agency Profile"
      }
      open={isOpen}
      onClose={onClose}
      hasCloseTrigger={false}
      size={(isPendingReview || isRejected) && !isEditing ? "md" : "xl"}
    >
      <Box
        display="flex"
        flexDirection="column"
        h={(isPendingReview || isRejected) && !isEditing ? "auto" : "75vh"}
        overflow="hidden"
      >
        {isProfileLoading ? (
          <VStack gap={6} align="stretch" px={1} py={4}>
            {/* Stepper Skeleton */}
            <Flex justify="space-between" align="center" px={2} mb={4}>
              <HStack gap={4}>
                <Skeleton height="10" width="10" borderRadius="full" />
                <VStack align="start" gap={1}>
                  <Skeleton height="4" width="24" />
                  <Skeleton height="3" width="40" />
                </VStack>
              </HStack>
              <Skeleton height="2px" flex={1} mx={4} />
              <HStack gap={4}>
                <Skeleton height="10" width="10" borderRadius="full" />
                <VStack align="start" gap={1}>
                  <Skeleton height="4" width="24" />
                  <Skeleton height="3" width="40" />
                </VStack>
              </HStack>
            </Flex>

            {/* Form Content Skeleton */}
            <VStack gap={4} align="stretch">
              <Skeleton height="4" width="70%" />
              <Flex gap={4}>
                <Skeleton height="10" flex={1} />
                <Skeleton height="10" flex={1} />
              </Flex>
              <Skeleton height="10" width="100%" />
              <Flex gap={4}>
                <Skeleton height="10" flex={1} />
                <Skeleton height="10" flex={1} />
              </Flex>
              <Flex gap={4}>
                <Skeleton height="10" flex={1} />
                <Skeleton height="10" flex={1} />
              </Flex>
              <Skeleton height="6" width="40%" mt={2} />
              <Flex gap={4}>
                <Skeleton height="10" flex={1} />
                <Skeleton height="10" flex={1} />
              </Flex>
            </VStack>

            {/* Footer Skeleton */}
            <Flex
              justify="flex-end"
              gap={3}
              pt={4}
              borderTop="1px solid"
              borderColor="gray.100"
            >
              <Skeleton height="10" width="24" />
              <Skeleton height="10" width="40" />
            </Flex>
          </VStack>
        ) : (isPendingReview || isRejected) && !isEditing ? (
          <AgencyVerificationStatus
            isRejected={isRejected}
            isProfileRejected={isProfileRejected}
            anyDocumentRejected={anyDocumentRejected}
            agencyProfile={agencyProfile}
            handleLogout={handleLogout}
            onUpdate={(step) => {
              setIsEditing(true);
              setStepOverride(step);
            }}
          />
        ) : (
          <AgencyVerificationForm
            activeStep={activeStep}
            methods={methods}
            documents={documents}
            setDocuments={setDocuments}
            onSubmit={onSubmit}
            onUploadDocuments={handleUploadDocuments}
            onPrevious={handlePrevious}
            isBusy={isBusy}
            handleLogout={handleLogout}
          />
        )}
      </Box>
    </Dialog>
  );
};
