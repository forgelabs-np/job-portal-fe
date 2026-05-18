"use client";

import {
  useGetCandidateProfile,
  useCreateCandidateProfile,
  useUploadCandidateDocument,
  UpdateCandidateProfilePayload,
} from "@/api/candidate-api";
import { Button, Dialog, FormProvider, TextFieldInput, FileDropzone } from "@/shared";
import { SelectFieldInput } from "@/shared/ui/Select";
import { fetchAndStoreCurrentUser } from "@/api/auth";
import { useAuthStore, useCurrentUserStore } from "@/store";
import {
  Box,
  Flex,
  HStack,
  Skeleton,
  Steps,
  Text,
  VStack,
  SimpleGrid,
  Circle,
  Separator,
} from "@chakra-ui/react";
import { User, IdCard, Folder } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { ROUTES } from "@/constants/routes";
import { successNotification, errorNotification } from "@/utils/toast";

interface CandidateVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type CandidateDocType =
  | "PASSPORT"
  | "PCC"
  | "CV"
  | "SLC";

export const REQUIRED_CANDIDATE_DOCUMENTS: { type: CandidateDocType; label: string }[] = [
  { type: "PASSPORT", label: "Passport Copy" },
  { type: "PCC", label: "Police Clearance Certificate (PCC)" },
  { type: "CV", label: "CV / Resume" },
  { type: "SLC", label: "Academic / Experience Certificate" },
];

interface SectionHeaderProps {
  icon: React.ReactNode;
  label: string;
  step: number;
}

function SectionHeader({ icon, label, step }: SectionHeaderProps) {
  return (
    <HStack gap={3} mb={4} mt={6}>
      <Circle
        size="32px"
        bg={WEBSITE_THEME_COLOR}
        color="white"
        fontSize="xs"
        fontWeight="bold"
        flexShrink={0}
      >
        {step}
      </Circle>

      <HStack
        gap={2}
        color={WEBSITE_THEME_COLOR}
        _dark={{ color: "green.300" }}
      >
        {icon}

        <Text
          fontWeight="600"
          fontSize="sm"
          letterSpacing="wide"
          textTransform="uppercase"
        >
          {label}
        </Text>
      </HStack>

      <Separator
        flex="1"
        borderColor="green.100"
        _dark={{ borderColor: "green.900" }}
      />
    </HStack>
  );
}

const MARITAL_STATUS_OPTIONS = [
  { label: "Single", value: "SINGLE" },
  { label: "Married", value: "MARRIED" },
  { label: "Divorced", value: "DIVORCED" },
  { label: "Widowed", value: "WIDOWED" },
];

export const CandidateVerificationModal = ({
  isOpen,
  onClose,
}: CandidateVerificationModalProps) => {
  const methods = useForm<UpdateCandidateProfilePayload>();
  const { logout } = useAuthStore();
  const { profile } = useCurrentUserStore();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(
    profile?.onboardingStage === "DOCUMENTS" ? 1 : 0
  );

  useEffect(() => {
    if (profile?.onboardingStage === "DOCUMENTS") {
      setCurrentStep(1);
    }
  }, [profile?.onboardingStage]);
  const [documents, setDocuments] = useState<Record<CandidateDocType, any | null>>({
    PASSPORT: null,
    PCC: null,
    CV: null,
    SLC: null,
  });

  const { data: candidateProfile, isLoading: isProfileLoading } =
    useGetCandidateProfile();

  const { mutate: createProfile, isPending: isCreatingProfile } =
    useCreateCandidateProfile();

  const { mutateAsync: uploadDocument, isPending: isUploadingDocuments } =
    useUploadCandidateDocument();

  useEffect(() => {
    if (!candidateProfile) return;
    if (currentStep !== 0) return;

    methods.reset({
      firstName: candidateProfile.firstName ?? "",
      lastName: candidateProfile.lastName ?? "",
      trade: candidateProfile.trade ?? "",
      dateOfBirth: candidateProfile.dateOfBirth ?? "",
      maritalStatus: candidateProfile.maritalStatus ?? "SINGLE",
      passportNumber: candidateProfile.passportNumber ?? "",
      passportIssueDate: candidateProfile.passportIssueDate ?? "",
      passportExpiryDate: candidateProfile.passportExpiryDate ?? "",
      documentsFolderLink: candidateProfile.documentsFolderLink ?? "",
      introVideoLink: candidateProfile.introVideoLink ?? "",
    });
  }, [candidateProfile, currentStep, methods]);

  useEffect(() => {
    if (!candidateProfile?.documents || candidateProfile.documents.length === 0)
      return;

    const newDocs: any = { ...documents };
    candidateProfile.documents.forEach((doc: any) => {
      newDocs[doc.documentType] = doc;
    });
    setDocuments(newDocs);
  }, [candidateProfile]);

  const handleLogout = async () => {
    logout();
    router.push("/login");
  };

  const handleNextStep = (data: UpdateCandidateProfilePayload) => {
    createProfile(
      { data },
      {
        onSuccess: () => {
          setCurrentStep(1);
        },
      },

    );
  };

  const handlePreviousStep = () => {
    setCurrentStep(0);
  };

  const handleDocumentChange = (type: CandidateDocType, file: File | null) => {
    setDocuments((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const handleUploadDocuments = async () => {
    const allRequiredDocsSelected = REQUIRED_CANDIDATE_DOCUMENTS.every((doc) =>
      Boolean(documents[doc.type]),
    );

    if (!allRequiredDocsSelected) {
      errorNotification("Please upload all required documents before continuing.");
      return;
    }

    try {
      await Promise.all(
        REQUIRED_CANDIDATE_DOCUMENTS.map((doc) => {
          const file = documents[doc.type];
          if (file instanceof File) {
            return uploadDocument({
              documentType: doc.type as any,
              file: file,
            });
          }
          return Promise.resolve();
        }),
      );

      await fetchAndStoreCurrentUser();
      successNotification("Documents submitted and uploaded successfully!");
      router.push(ROUTES.CANDIDATE_DASHBOARD);
    } catch (err) {
      // Error is handled in the mutation
    }
  };

  const isBusy = isCreatingProfile || isUploadingDocuments;
  const allDocsUploaded = Object.values(documents).every((doc) => doc !== null);

  return (
    <Dialog
      title="Complete Your Candidate Profile"
      open={isOpen}
      onClose={onClose}
      hasCloseTrigger={false}
      size="xl"
    >
      <Box display="flex" flexDirection="column" h="75vh" overflow="hidden">
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
            </VStack>
          </VStack>
        ) : (
          <>
            {/* Steps Indicator */}
            <Steps.Root step={currentStep} count={2} mb={6} px={1} flexShrink={0}>
              <Steps.List>
                <Steps.Item index={0} title="Profile details">
                  <Steps.Indicator />
                  <Box>
                    <Steps.Title>Profile Info</Steps.Title>
                    <Steps.Description>
                      Personal, trade and passport details
                    </Steps.Description>
                  </Box>
                  <Steps.Separator />
                </Steps.Item>
                <Steps.Item index={1} title="Upload Documents">
                  <Steps.Indicator />
                  <Box>
                    <Steps.Title>Verification Files</Steps.Title>
                    <Steps.Description>
                      Upload passport, PCC, CV & Certificates
                    </Steps.Description>
                  </Box>
                  <Steps.Separator />
                </Steps.Item>
              </Steps.List>
            </Steps.Root>

            <Box
              display="flex"
              flexDirection="column"
              flex={1}
              minH={0}
              overflow="hidden"
            >
              {currentStep === 0 ? (
                <FormProvider
                  methods={methods}
                  onSubmit={handleNextStep}
                  style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
                >
                  <Box display="flex" flexDirection="column" flex={1} minH={0}>
                    <Box flex={1} overflowY="auto" px={1} pb={4}>
                      <VStack gap={4} align="stretch">
                        <Text fontSize="sm" color="gray.600">
                          Please complete your candidate profile information to access the portal dashboard.
                        </Text>

                        {/* Personal Information Section */}
                        <Box borderBottom="1px solid" borderColor="gray.100" _dark={{ borderColor: "gray.700" }} pb={5}>
                          <SectionHeader
                            step={1}
                            label="Personal Information"
                            icon={<User size={16} />}
                          />
                          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                            <TextFieldInput
                              name="firstName"
                              label="First Name"
                              placeholder="Enter first name"
                              required
                            />
                            <TextFieldInput
                              name="lastName"
                              label="Last Name"
                              placeholder="Enter last name"
                              required
                            />
                            <TextFieldInput
                              name="trade"
                              label="Trade / Job Skill"
                              placeholder="e.g. Welder, Electrician, Plumber"
                              required
                            />
                            <TextFieldInput
                              name="dateOfBirth"
                              label="Date of Birth"
                              type="date"
                              required
                            />
                            <SelectFieldInput
                              name="maritalStatus"
                              label="Marital Status"
                              options={MARITAL_STATUS_OPTIONS}
                              placeholder="Select status"
                              required
                            />
                          </SimpleGrid>
                        </Box>

                        {/* Passport Details Section */}
                        <Box borderBottom="1px solid" borderColor="gray.100" _dark={{ borderColor: "gray.700" }} pb={5}>
                          <SectionHeader
                            step={2}
                            label="Passport Details"
                            icon={<IdCard size={16} />}
                          />
                          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                            <TextFieldInput
                              name="passportNumber"
                              label="Passport Number"
                              placeholder="Enter passport number"
                              required
                            />
                            <TextFieldInput
                              name="passportIssueDate"
                              label="Passport Issue Date"
                              type="date"
                              required
                            />
                            <TextFieldInput
                              name="passportExpiryDate"
                              label="Passport Expiry Date"
                              type="date"
                              required
                            />
                          </SimpleGrid>
                        </Box>

                        {/* Document Links Section */}
                        <Box pb={2}>
                          <SectionHeader
                            step={3}
                            label="Document Links & External Media"
                            icon={<Folder size={16} />}
                          />
                          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                            <TextFieldInput
                              name="documentsFolderLink"
                              label="Documents Folder Link"
                              placeholder="https://drive.google.com/..."
                              required
                            />
                            <TextFieldInput
                              name="introVideoLink"
                              label="Intro Video Link"
                              placeholder="https://youtube.com/..."
                            />
                          </SimpleGrid>
                        </Box>
                      </VStack>
                    </Box>

                    {/* Step 0 Footer */}
                    <Flex
                      justify="space-between"
                      align="center"
                      pt={4}
                      pb={1}
                      borderTop="1px solid"
                      borderColor="gray.100"
                      bg="white"
                      flexShrink={0}
                    >
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        disabled={isBusy}
                      >
                        Logout
                      </Button>

                      <Button
                        bg={WEBSITE_THEME_COLOR}
                        _hover={{ bg: "#0a5535" }}
                        type="submit"
                        loading={isBusy}
                      >
                        Save & Continue &rarr;
                      </Button>
                    </Flex>
                  </Box>
                </FormProvider>
              ) : (
                <Box display="flex" flexDirection="column" flex={1} minH={0}>
                  <Box flex={1} overflowY="auto" px={1} pb={4}>
                    <VStack gap={5} align="stretch">
                      <Text fontSize="sm" color="gray.600">
                        Please upload clear copies of the following documents to verify your candidate profile.
                      </Text>

                      <VStack gap={5} align="stretch">
                        {REQUIRED_CANDIDATE_DOCUMENTS.map((doc) => (
                          <Box key={doc.type}>
                            <FileDropzone
                              value={documents[doc.type]}
                              onChange={(file) => handleDocumentChange(doc.type, file)}
                              label={doc.label}
                            />
                          </Box>
                        ))}
                      </VStack>
                    </VStack>
                  </Box>

                  {/* Step 1 Footer */}
                  <Flex
                    justify="space-between"
                    align="center"
                    pt={4}
                    pb={1}
                    borderTop="1px solid"
                    borderColor="gray.100"
                    bg="white"
                    flexShrink={0}
                  >
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      disabled={isBusy}
                    >
                      Logout
                    </Button>

                    <HStack>
                      <Button
                        variant="outline"
                        onClick={handlePreviousStep}
                        disabled={isBusy}
                      >
                        Previous
                      </Button>
                      <Button
                        bg={WEBSITE_THEME_COLOR}
                        _hover={{ bg: "#0a5535" }}
                        onClick={handleUploadDocuments}
                        loading={isBusy}
                        disabled={!allDocsUploaded}
                      >
                        Submit Documents
                      </Button>
                    </HStack>
                  </Flex>
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </Dialog >
  );
};
