"use client";

import {
  AgencyDocumentType,
  useCreateAgencyProfile,
  useGetAgencyProfile,
  useUploadAgencyDocument,
} from "@/api/agency";
import { Button, Dialog, FormProvider, TextFieldInput } from "@/shared";
import { useAuthStore } from "@/store";
import { errorNotification } from "@/utils/toast";
import {
  Box,
  Flex,
  HStack,
  Input,
  Skeleton,
  Spinner,
  Steps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuCircleAlert, LuClock } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface AgencyVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface AgencyProfileForm {
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

const REQUIRED_DOCUMENTS: { type: AgencyDocumentType; label: string }[] = [
  { type: "TRADE_LICENCE", label: "Trade Licence" },
  { type: "COMPANY_REGISTRATION", label: "Company Registration" },
  { type: "MOU", label: "MOU" },
  { type: "OWNER_CITIZENSHIP", label: "Owner Citizenship" },
];

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
  const [documents, setDocuments] = useState<
    Record<AgencyDocumentType, File | null>
  >({
    TRADE_LICENCE: null,
    COMPANY_REGISTRATION: null,
    MOU: null,
    OWNER_CITIZENSHIP: null,
  });

  const {
    data: agencyProfile,
    refetch: refetchAgencyProfile,
    isLoading: isProfileLoading,
  } = useGetAgencyProfile();
  const profileCompleted = Boolean(agencyProfile?.profileComplete);
  const isPendingReview = agencyProfile?.profileApprovalStatus === "PENDING";
  const isRejected = agencyProfile?.profileApprovalStatus === "REJECTED";
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

    onSuccess();
    onClose();
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
      size={isPendingReview || isRejected ? "md" : "xl"}
    >
      <Box
        display="flex"
        flexDirection="column"
        h={isPendingReview || isRejected || isProfileLoading ? "auto" : "75vh"}
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
        ) : isPendingReview || isRejected ? (
          <VStack gap={6} py={10} textAlign="center" flex={1} justify="center">
            <Box
              bg={isRejected ? "red.50" : "green.50"}
              p={6}
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              {isRejected ? (
                <LuCircleAlert size={48} color="#e53e3e" />
              ) : (
                <LuClock size={48} color="#0d6944" />
              )}
              {/* {!isRejected && (
                <Spinner
                  size="xl"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="#0d6944"
                  position="absolute"
                  width="72px"
                  height="72px"
                />
              )} */}
            </Box>
            <VStack gap={2} px={4}>
              <Text fontSize="xl" fontWeight="bold">
                {isRejected
                  ? "Verification Rejected"
                  : "Verification Under Review"}
              </Text>
              <Text color="gray.600">
                {isRejected
                  ? "Unfortunately, your profile verification has been rejected."
                  : "Your profile verification is currently under review by our team. This usually takes 24-48 hours. We'll notify you once it's approved."}
              </Text>

              {isRejected && agencyProfile?.profileRejectionReason && (
                <Box
                  mt={2}
                  p={4}
                  bg="red.50"
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="red.100"
                  width="100%"
                  textAlign="left"
                >
                  <Text
                    fontWeight="semibold"
                    color="red.700"
                    fontSize="sm"
                    mb={1}
                  >
                    Reason for Rejection:
                  </Text>
                  <Text color="red.600" fontSize="sm">
                    {agencyProfile.profileRejectionReason}
                  </Text>
                </Box>
              )}
            </VStack>
            <Button
              variant="outline"
              onClick={handleLogout}
              mt={4}
              borderColor="gray.300"
              _hover={{ bg: "gray.50" }}
            >
              Log Out
            </Button>
          </VStack>
        ) : (
          <>
            <Steps.Root step={activeStep} count={2} mb={4} px={1} flexShrink={0}>
              <Steps.List>
                <Steps.Item index={0} title="Profile">
                  <Steps.Indicator />
                  <Box>
                    <Steps.Title>Profile Details</Steps.Title>
                    <Steps.Description>
                      Complete agency profile information
                    </Steps.Description>
                  </Box>
                  <Steps.Separator />
                </Steps.Item>
                <Steps.Item index={1} title="Documents">
                  <Steps.Indicator />
                  <Box>
                    <Steps.Title>Upload Documents</Steps.Title>
                    <Steps.Description>
                      Upload all required verification files
                    </Steps.Description>
                  </Box>
                  <Steps.Separator />
                </Steps.Item>
              </Steps.List>
            </Steps.Root>

            {activeStep === 0 ? (
              <Box
                display="flex"
                flexDirection="column"
                flex={1}
                minH={0}
                css={{
                  "& form": {
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: 0,
                    overflow: "hidden",
                  },
                }}
              >
                <FormProvider methods={methods} onSubmit={onSubmit}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    flex={1}
                    minH={0}
                  >
                    <Box overflowY="auto" flex={1} px={1} pb={2} minH={0}>
                      <VStack gap={4} align="stretch">
                        <Text fontSize="sm" color="gray.600">
                          To access the dashboard, please complete your agency profile
                          information first.
                        </Text>

                        <Flex gap={4}>
                          <TextFieldInput
                            name="companyName"
                            label="Company Name"
                            placeholder="Enter company name"
                            required
                          />
                          <TextFieldInput
                            name="companyWebsite"
                            label="Company Website"
                            placeholder="https://example.com"
                          />
                        </Flex>

                        <TextFieldInput
                          name="companyDescription"
                          label="Company Description"
                          placeholder="Brief description of your company"
                          required
                        />

                        <Flex gap={4}>
                          <TextFieldInput
                            name="companyAddress"
                            label="Company Address"
                            placeholder="Full company address"
                            required
                          />
                          <TextFieldInput
                            name="companyPhone"
                            label="Company Phone"
                            placeholder="+1 (555) 123-4567"
                            required
                          />
                        </Flex>

                        <Flex gap={4}>
                          <TextFieldInput
                            name="registrationNumber"
                            label="Registration Number"
                            placeholder="Company registration number"
                            required
                          />
                          <TextFieldInput
                            name="taxId"
                            label="Tax ID"
                            placeholder="Tax identification number"
                            required
                          />
                        </Flex>

                        <Text fontSize="md" fontWeight="semibold">
                          Contact Person Information
                        </Text>

                        <Flex gap={4}>
                          <TextFieldInput
                            name="contactPersonName"
                            label="Contact Person Name"
                            placeholder="Full name"
                            required
                          />
                          <TextFieldInput
                            name="contactPersonEmail"
                            label="Contact Person Email"
                            placeholder="email@company.com"
                            required
                          />
                        </Flex>

                        <TextFieldInput
                          name="contactPersonPhone"
                          label="Contact Person Phone"
                          placeholder="+1 (555) 123-4567"
                          required
                        />

                        <TextFieldInput
                          name="companyLogoUrl"
                          label="Company Logo URL"
                          placeholder="https://example.com/logo.png"
                        />
                      </VStack>
                    </Box>
                    <Flex
                      justify="flex-end"
                      gap={3}
                      pt={4}
                      mt="auto"
                      borderTop="1px solid"
                      borderColor="gray.200"
                      flexShrink={0}
                      bg="white"
                    >
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        disabled={isBusy}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        loading={isPending}
                        bg="#0d6944"
                        _hover={{ bg: "#0a5535" }}
                      >
                        Save Profile & Continue
                      </Button>
                    </Flex>
                  </Box>
                </FormProvider>
              </Box>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                flex={1}
                minH={0}
                overflow="hidden"
              >
                <Box overflowY="auto" flex={1} minH={0} px={1} pb={4}>
                  <VStack gap={4} align="stretch">
                    <Text fontSize="sm" color="gray.600">
                      Upload all required documents: Trade Licence, Company
                      Registration, MOU, and Owner Citizenship.
                    </Text>
                    {REQUIRED_DOCUMENTS.map((doc) => (
                      <Box key={doc.type}>
                        <Text fontSize="sm" fontWeight="semibold" mb={2}>
                          {doc.label}{" "}
                          <Text as="span" color="red.500">
                            *
                          </Text>
                        </Text>
                        <Input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) =>
                            handleDocumentChange(
                              doc.type,
                              e.target.files?.[0] ?? null,
                            )
                          }
                          p={1}
                          disabled={isBusy}
                        />
                        {documents[doc.type] ? (
                          <Text fontSize="xs" mt={1} color="gray.600">
                            Selected: {documents[doc.type]?.name}
                          </Text>
                        ) : null}
                      </Box>
                    ))}
                  </VStack>
                </Box>

                <Flex
                  justify="flex-end"
                  gap={3}
                  pt={4}
                  mt={2}
                  borderTop="1px solid"
                  borderColor="gray.200"
                  flexShrink={0}
                >
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={isBusy}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    disabled={isBusy}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleUploadDocuments}
                    loading={isUploading}
                    bg="#0d6944"
                    _hover={{ bg: "#0a5535" }}
                    disabled={!allRequiredDocumentsSelected}
                  >
                    Submit for Verification
                  </Button>
                </Flex>
              </Box>
            )}
          </>
        )}
      </Box>
    </Dialog>
  );
};
