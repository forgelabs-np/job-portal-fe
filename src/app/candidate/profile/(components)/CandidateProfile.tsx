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
  Image,
  NativeSelect,
} from "@chakra-ui/react";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import {
  useGetCandidateProfile,
  useCreateCandidateProfile,
  useUploadCandidateDocument,
  CandidateDocumentType,
} from "@/api/candidate-api";
import PageNoData from "@/shared/ui/NoDataAvailable/PageNoData";
import { Button, FormProvider, TextFieldInput } from "@/shared";
import { SelectFieldInput } from "@/shared/ui/Select";
import { FileDropzone } from "@/shared/components/form/dropzone";
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
  Plus,
} from "lucide-react";
import Link from "next/link";

const CandidateProfile = () => {
  const { data: profile, isLoading } = useGetCandidateProfile();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useCreateCandidateProfile();
  const { mutate: uploadDoc, isPending: isUploadingDoc } = useUploadCandidateDocument();

  const [isEditing, setIsEditing] = useState(false);
  const [showDocUpload, setShowDocUpload] = useState(false);
  const [docType, setDocType] = useState<CandidateDocumentType | "">("");
  const [docFile, setDocFile] = useState<File | null>(null);

  const methods = useForm();

  const imageURL = process.env.NEXT_PUBLIC_API_IMAGE_ENDPOINT;

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

  const onSubmit = (data: any) => {
    updateProfile(
      {
        data: {
          id: profile.id,
          firstName: data.firstName,
          lastName: data.lastName,
          trade: data.trade,
          dateOfBirth: data.dateOfBirth,
          maritalStatus: data.maritalStatus,
          passportNumber: data.passportNumber,
          passportIssueDate: data.passportIssueDate,
          passportExpiryDate: data.passportExpiryDate,
          documentsFolderLink: data.documentsFolderLink,
          introVideoLink: data.introVideoLink,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleUploadDoc = () => {
    if (!docType || !docFile) return;
    uploadDoc(
      { documentType: docType as CandidateDocumentType, file: docFile },
      {
        onSuccess: () => {
          setShowDocUpload(false);
          setDocFile(null);
          setDocType("");
        },
      }
    );
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
      transition="all 0.2s"
      _hover={{ boxShadow: "sm", borderColor: "gray.200" }}
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
        {!isEditing && (
          <Button
            bg={WEBSITE_THEME_COLOR}
            borderRadius="full"
            onClick={() => setIsEditing(true)}
            _hover={{ bg: "#0a5535", transform: "translateY(-1px)" }}
            transition="all 0.2s"
            boxShadow="sm"
          >
            Edit Profile
          </Button>
        )}
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
            boxShadow="sm"
          >
            <Text fontSize="xl" fontWeight="700" mb={6}>
              Update Profile Details
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
                type="date"
              />
              <SelectFieldInput
                name="maritalStatus"
                label="Marital Status"
                options={[
                  { label: "Single", value: "SINGLE" },
                  { label: "Married", value: "MARRIED" },
                  { label: "Divorced", value: "DIVORCED" },
                  { label: "Widowed", value: "WIDOWED" },
                ]}
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
                type="date"
              />
              <TextFieldInput
                name="passportExpiryDate"
                label="Passport Expiry Date"
                placeholder="YYYY-MM-DD"
                borderColor="#e5e7eb"
                borderRadius="lg"
                type="date"
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

            <HStack mt={8} gap={3} justify="flex-end" pt={4} borderTop="1px solid" borderColor="gray.100">
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
                loading={isUpdatingProfile}
                borderRadius="full"
                _hover={{ bg: "#0a5535", transform: "translateY(-1px)" }}
                boxShadow="sm"
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
            boxShadow="sm"
          >
            <Flex align="center" gap={5} mb={8}>
              <Flex
                w="72px"
                h="72px"
                borderRadius="full"
                bg={WEBSITE_THEME_COLOR}
                align="center"
                justify="center"
                flexShrink={0}
                boxShadow="md"
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
                <HStack gap={3} mt={2}>
                  <Badge colorPalette="green" fontSize="xs" px={2} py={0.5} borderRadius="md">
                    {profile.trade || "No Trade Set"}
                  </Badge>
                  <Badge
                    colorPalette={profile.isEnabled ? "green" : "red"}
                    fontSize="xs"
                    px={2} py={0.5} borderRadius="md"
                  >
                    {profile.isEnabled ? "Active" : "Disabled"}
                  </Badge>
                  {profile.candidateType && (
                    <Badge colorPalette="blue" fontSize="xs" px={2} py={0.5} borderRadius="md">
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
              boxShadow="sm"
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
          <Box
            bg="white"
            borderRadius="2xl"
            p={8}
            border="1px solid"
            borderColor="gray.100"
            boxShadow="sm"
          >
            <Flex justify="space-between" align="center" mb={5}>
              <Text fontSize="xl" fontWeight="700">
                Documents
              </Text>
              <Button
                variant="outline"
                size="sm"
                borderRadius="full"
                onClick={() => setShowDocUpload(!showDocUpload)}
                color={WEBSITE_THEME_COLOR}
                borderColor={WEBSITE_THEME_COLOR}
                _hover={{ bg: "green.50" }}
              >
                {showDocUpload ? "Cancel Upload" : <><Plus size={16} /> Update Document</>}
              </Button>
            </Flex>

            {showDocUpload && (
              <Box p={6} bg="gray.50" borderRadius="xl" border="1px dashed" borderColor="gray.200" mb={6}>
                <Text fontSize="md" fontWeight="600" mb={4}>
                  Select the document type to update.
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
                  <Box>
                    <Text fontSize="sm" fontWeight="600" mb={2}>Document Type</Text>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        value={docType}
                        onChange={(e) => setDocType(e.target.value as CandidateDocumentType)}
                        bg="white"
                        borderRadius="lg"
                      >
                        <option value="">Select document type</option>
                        <option value="PASSPORT">Passport</option>
                        <option value="PCC">Police Clearance Certificate (PCC)</option>
                        <option value="CV">Curriculum Vitae (CV)</option>
                        <option value="SLC">School Leaving Certificate (SLC)</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Box>
                  <Box>
                    <FileDropzone
                      value={docFile}
                      onChange={setDocFile}
                      label="Upload File"
                    />
                  </Box>
                </Grid>
                <Flex justify="flex-end" mt={4}>
                  <Button
                    bg={WEBSITE_THEME_COLOR}
                    onClick={handleUploadDoc}
                    loading={isUploadingDoc}
                    disabled={!docType || !docFile}
                    borderRadius="full"
                    _hover={{ bg: "#0a5535" }}
                  >
                    Upload
                  </Button>
                </Flex>
              </Box>
            )}

            {!profile.documents || profile.documents.length === 0 ? (
              <Text color="gray.500" fontSize="sm">No documents uploaded yet.</Text>
            ) : (
              <VStack gap={3} align="stretch">
                {profile.documents.map((doc) => (
                  <Box
                    key={doc.id}
                    p={4}
                    border="1px solid"
                    borderColor="gray.100"
                    borderRadius="xl"
                    _hover={{ bg: "gray.50", borderColor: "gray.200" }}
                    transition="all 0.2s"
                  >
                    <HStack justify="space-between">
                      <HStack gap={4}>
                        <Flex
                          w="40px"
                          h="40px"
                          borderRadius="lg"
                          bg="blue.50"
                          align="center"
                          justify="center"
                          overflow="hidden"
                          border="1px solid"
                          borderColor="blue.100"
                        >
                          {doc.documentPath && doc.documentPath.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                            <Image
                              src={`${imageURL}${doc.documentPath}`}
                              alt={doc.documentName}
                              objectFit="cover"
                              w="full"
                              h="full"
                            />
                          ) : (
                            <FileText size={20} color="#2b6cb0" />
                          )}
                        </Flex>
                        <Box>
                          <Text fontWeight="600" fontSize="sm" color="gray.800">
                            {doc.documentName || doc.documentType}
                          </Text>
                          <Badge colorPalette="blue" fontSize="2xs" mt={1}>
                            {doc.documentType}
                          </Badge>
                        </Box>
                      </HStack>
                      {doc.documentPath && (
                        <Link
                          href={`${imageURL}${doc?.documentPath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="ghost" color={WEBSITE_THEME_COLOR}>
                            View
                          </Button>
                        </Link>
                      )}
                    </HStack>
                    {doc.notes && (
                      <Text fontSize="xs" color="gray.500" mt={3} pl="56px">
                        Note: {doc.notes}
                      </Text>
                    )}
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
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
    <Box p={4} border="1px solid" borderColor="gray.100" borderRadius="xl" bg="gray.50">
      <Text fontSize="xs" color="gray.500" fontWeight="600" mb={2}>
        {label}
      </Text>
      <Badge colorPalette={getStatusColor(value)} fontSize="xs" px={2} py={0.5} borderRadius="md">
        {value || "N/A"}
      </Badge>
    </Box>
  );
};

export default CandidateProfile;

