"use client";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
  Badge,
  Input,
} from "@chakra-ui/react";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import {
  useGetCandidateProfile,
  useUpdateCandidateProfileMutation,
  UpdateCandidateProfilePayload,
} from "@/api/candidate-api";
import PageNoData from "@/shared/ui/NoDataAvailable/PageNoData";
import { Button, FormProvider, TextFieldInput } from "@/shared";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  User,
  Briefcase,
  Calendar,
  FileText,
  Shield,
  Globe,
  Video,
} from "lucide-react";

const CandidateProfile = () => {
  const { data: profile, isLoading } = useGetCandidateProfile();
  const { mutate: updateProfile, isPending } =
    useUpdateCandidateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm<UpdateCandidateProfilePayload>();

  useEffect(() => {
    if (profile) {
      methods.reset({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        trade: profile.trade || "",
        dateOfBirth: profile.dateOfBirth || "",
        maritalStatus: profile.maritalStatus || "SINGLE",
        passportNumber: profile.passportNumber || "",
        passportIssueDate: profile.passportIssueDate || "",
        passportExpiryDate: profile.passportExpiryDate || "",
        documentsFolderLink: profile.documentsFolderLink || "",
        introVideoLink: profile.introVideoLink || "",
      });
    }
  }, [profile, methods]);

  if (isLoading) {
    return (
      <Box p={6}>
        <Skeleton height="40px" width="300px" mb={6} />
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} height="60px" borderRadius="xl" />
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (!profile) {
    return (
      <PageNoData
        title="Profile Not Found"
        description="Your candidate profile hasn't been set up yet."
      />
    );
  }

  const onSubmit = (data: UpdateCandidateProfilePayload) => {
    updateProfile(data, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const InfoItem = ({
    icon: IconComp,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number | boolean | null | undefined;
  }) => (
    <Box
      p={4}
      border="1px solid"
      borderColor="gray.100"
      borderRadius="xl"
      bg="white"
    >
      <HStack gap={3} mb={1}>
        <Flex
          w="32px"
          h="32px"
          borderRadius="lg"
          bg="green.50"
          align="center"
          justify="center"
        >
          <IconComp size={16} color={WEBSITE_THEME_COLOR} />
        </Flex>
        <Text fontSize="xs" color="gray.500" fontWeight="600" textTransform="uppercase">
          {label}
        </Text>
      </HStack>
      <Text fontSize="md" fontWeight="600" color="gray.800" mt={2} pl="44px">
        {value?.toString() || "—"}
      </Text>
    </Box>
  );

  return (
    <Box p={6} bg="#f7f8fa" minH="100vh">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <VStack align="start" gap={0}>
          <Text fontSize="3xl" fontWeight="700">
            My Profile
          </Text>
          <Text fontSize="sm" color="gray.500" fontWeight="600">
            PERSONAL INFORMATION & DOCUMENTS
          </Text>
        </VStack>
        {!isEditing ? (
          <Button
            bg={WEBSITE_THEME_COLOR}
            borderRadius="full"
            onClick={() => setIsEditing(true)}
            _hover={{ bg: "#0a5535" }}
          >
            Edit Profile
          </Button>
        ) : null}
      </Flex>

      {isEditing ? (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Box
            bg="white"
            borderRadius="2xl"
            p={8}
            border="1px solid"
            borderColor="gray.100"
            mb={6}
          >
            <Text fontSize="xl" fontWeight="700" mb={6}>
              Edit Profile
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
              <TextFieldInput
                name="firstName"
                label="First Name"
                placeholder="Enter first name"
                borderColor="#e5e7eb"
                borderRadius="lg"
              />
              <TextFieldInput
                name="lastName"
                label="Last Name"
                placeholder="Enter last name"
                borderColor="#e5e7eb"
                borderRadius="lg"
              />
              <TextFieldInput
                name="trade"
                label="Trade / Skill"
                placeholder="e.g. Welder, Electrician"
                borderColor="#e5e7eb"
                borderRadius="lg"
              />
              <TextFieldInput
                name="dateOfBirth"
                label="Date of Birth"
                placeholder="YYYY-MM-DD"
                borderColor="#e5e7eb"
                borderRadius="lg"
              />
              <TextFieldInput
                name="passportNumber"
                label="Passport Number"
                placeholder="Enter passport number"
                borderColor="#e5e7eb"
                borderRadius="lg"
              />
              <TextFieldInput
                name="passportIssueDate"
                label="Passport Issue Date"
                placeholder="YYYY-MM-DD"
                borderColor="#e5e7eb"
                borderRadius="lg"
              />
              <TextFieldInput
                name="passportExpiryDate"
                label="Passport Expiry Date"
                placeholder="YYYY-MM-DD"
                borderColor="#e5e7eb"
                borderRadius="lg"
              />
              <TextFieldInput
                name="documentsFolderLink"
                label="Documents Folder Link"
                placeholder="https://..."
                borderColor="#e5e7eb"
                borderRadius="lg"
              />
              <TextFieldInput
                name="introVideoLink"
                label="Intro Video Link"
                placeholder="https://..."
                borderColor="#e5e7eb"
                borderRadius="lg"
              />
            </SimpleGrid>

            <HStack mt={6} gap={3} justify="flex-end">
              <Button
                variant="outline"
                borderRadius="full"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                bg={WEBSITE_THEME_COLOR}
                type="submit"
                loading={isPending}
                borderRadius="full"
                _hover={{ bg: "#0a5535" }}
              >
                Save Changes
              </Button>
            </HStack>
          </Box>
        </FormProvider>
      ) : (
        <>
          {/* Profile Card */}
          <Box
            bg="white"
            borderRadius="2xl"
            p={8}
            border="1px solid"
            borderColor="gray.100"
            mb={6}
          >
            <Flex align="center" gap={5} mb={6}>
              <Flex
                w="72px"
                h="72px"
                borderRadius="full"
                bg={WEBSITE_THEME_COLOR}
                align="center"
                justify="center"
                flexShrink={0}
              >
                <Text fontSize="2xl" fontWeight="800" color="white">
                  {profile.firstName?.[0]?.toUpperCase()}
                  {profile.lastName?.[0]?.toUpperCase()}
                </Text>
              </Flex>
              <Box>
                <Text fontSize="2xl" fontWeight="800">
                  {profile.fullName}
                </Text>
                <HStack gap={3} mt={1}>
                  <Badge colorPalette="green" fontSize="xs">
                    {profile.trade || "No Trade Set"}
                  </Badge>
                  <Badge
                    colorPalette={profile.isEnabled ? "green" : "red"}
                    fontSize="xs"
                  >
                    {profile.isEnabled ? "Active" : "Disabled"}
                  </Badge>
                  {profile.candidateType && (
                    <Badge colorPalette="blue" fontSize="xs">
                      {profile.candidateType}
                    </Badge>
                  )}
                </HStack>
              </Box>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={4}>
              <InfoItem icon={User} label="Full Name" value={profile.fullName} />
              <InfoItem icon={Briefcase} label="Trade" value={profile.trade} />
              <InfoItem
                icon={Calendar}
                label="Date of Birth"
                value={
                  profile.dateOfBirth
                    ? `${profile.dateOfBirth} (Age: ${profile.age})`
                    : null
                }
              />
              <InfoItem
                icon={User}
                label="Marital Status"
                value={profile.maritalStatus}
              />
              <InfoItem
                icon={User}
                label="Email"
                value={profile.userEmail}
              />
              <InfoItem
                icon={Shield}
                label="Passport Number"
                value={profile.passportNumber}
              />
              <InfoItem
                icon={Calendar}
                label="Passport Issue Date"
                value={profile.passportIssueDate}
              />
              <InfoItem
                icon={Calendar}
                label="Passport Expiry Date"
                value={
                  profile.passportExpiryDate
                    ? `${profile.passportExpiryDate} ${profile.isPassportValid ? "✅ Valid" : "❌ Expired"}`
                    : null
                }
              />
              <InfoItem
                icon={Globe}
                label="Documents Folder"
                value={profile.documentsFolderLink || "Not provided"}
              />
              <InfoItem
                icon={Video}
                label="Intro Video"
                value={profile.introVideoLink || "Not provided"}
              />
            </SimpleGrid>
          </Box>

          {/* Statuses */}
          {profile.statuses && (
            <Box
              bg="white"
              borderRadius="2xl"
              p={8}
              border="1px solid"
              borderColor="gray.100"
              mb={6}
            >
              <Text fontSize="xl" fontWeight="700" mb={5}>
                Processing Status
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
                <StatusItem label="PCC Status" value={profile.statuses.pccStatus} />
                <StatusItem label="SLC Status" value={profile.statuses.slcStatus} />
                <StatusItem
                  label="Work Permit"
                  value={profile.statuses.workPermitStatus}
                />
                <StatusItem label="Visa Status" value={profile.statuses.visaStatus} />
              </SimpleGrid>
            </Box>
          )}

          {/* Documents */}
          {profile.documents && profile.documents.length > 0 && (
            <Box
              bg="white"
              borderRadius="2xl"
              p={8}
              border="1px solid"
              borderColor="gray.100"
            >
              <Text fontSize="xl" fontWeight="700" mb={5}>
                Documents
              </Text>
              <VStack gap={3} align="stretch">
                {profile.documents.map((doc) => (
                  <Box
                    key={doc.id}
                    p={4}
                    border="1px solid"
                    borderColor="gray.100"
                    borderRadius="xl"
                    _hover={{ bg: "gray.50" }}
                    transition="all 0.2s"
                  >
                    <HStack justify="space-between">
                      <HStack gap={3}>
                        <Flex
                          w="36px"
                          h="36px"
                          borderRadius="lg"
                          bg="blue.50"
                          align="center"
                          justify="center"
                        >
                          <FileText size={16} color="#3b82f6" />
                        </Flex>
                        <Box>
                          <Text fontWeight="600" fontSize="sm">
                            {doc.documentName}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {doc.documentType}
                          </Text>
                        </Box>
                      </HStack>
                      {doc.documentLink && (
                        <Text
                          as="a"
                          href={doc.documentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          fontSize="xs"
                          color={WEBSITE_THEME_COLOR}
                          fontWeight="600"
                          _hover={{ textDecoration: "underline" }}
                        >
                          View
                        </Text>
                      )}
                    </HStack>
                    {doc.notes && (
                      <Text fontSize="xs" color="gray.500" mt={2} pl="48px">
                        {doc.notes}
                      </Text>
                    )}
                  </Box>
                ))}
              </VStack>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

const StatusItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase();
    if (s === "approved" || s === "completed" || s === "issued") return "green";
    if (s === "pending" || s === "processing") return "orange";
    if (s === "rejected" || s === "denied") return "red";
    return "gray";
  };

  return (
    <Box p={4} border="1px solid" borderColor="gray.100" borderRadius="xl">
      <Text fontSize="xs" color="gray.500" fontWeight="600" mb={2}>
        {label}
      </Text>
      <Badge colorPalette={getStatusColor(value)} fontSize="xs">
        {value || "N/A"}
      </Badge>
    </Box>
  );
};

export default CandidateProfile;
