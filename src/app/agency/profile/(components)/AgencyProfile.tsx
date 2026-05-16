"use client";

import { useGetAgencyProfile } from "@/api/agency";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  SimpleGrid,
  Button,
  Separator,
  Stack,
  Skeleton,
  Image,
} from "@chakra-ui/react";
import {
  Globe,
  Phone,
  Mail,
  MapPin,
  FileText,
  User,
  ExternalLink,
  Calendar,
  Building2,
  Fingerprint,
} from "lucide-react";
import Link from "next/link";

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <HStack gap={4} align="flex-start" w="full">
    <Box color={WEBSITE_THEME_COLOR} mt={1}>
      {icon}
    </Box>
    <VStack align="flex-start" gap={0}>
      <Text fontSize="xs" fontWeight="600" color="gray.500" textTransform="uppercase" letterSpacing="wider">
        {label}
      </Text>
      <Text fontSize="md" fontWeight="500" color="gray.800" _dark={{ color: "gray.200" }}>
        {value || "N/A"}
      </Text>
    </VStack>
  </HStack>
);

const SectionHeader = ({ title }: { title: string }) => (
  <Box mb={6}>
    <Heading size="md" fontWeight="700" color="gray.800" _dark={{ color: "white" }}>
      {title}
    </Heading>
    <Separator mt={2} borderColor="gray.100" />
  </Box>
);

const ProfileSkeleton = () => (
  <Container maxW="container.xl" py={8}>
    <Stack gap={8}>
      <Box
        bg="white"
        _dark={{ bg: "gray.800" }}
        borderRadius="2xl"
        p={{ base: 6, md: 10 }}
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.100"
      >
        <Flex direction={{ base: "column", md: "row" }} align={{ base: "center", md: "flex-start" }} gap={8}>
          <Skeleton height="120px" width="120px" borderRadius="2xl" />
          <VStack align={{ base: "center", md: "flex-start" }} gap={4} flex={1}>
            <Skeleton height="32px" width="300px" />
            <Skeleton height="20px" width="full" />
            <Skeleton height="20px" width="60%" />
            <HStack gap={6} mt={2}>
              <Skeleton height="16px" width="150px" />
              <Skeleton height="16px" width="150px" />
            </HStack>
          </VStack>
          <Skeleton height="40px" width="140px" borderRadius="xl" />
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
        {[1, 2].map((i) => (
          <Box
            key={i}
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="2xl"
            p={8}
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <Skeleton height="24px" width="180px" mb={6} />
            <VStack gap={6} align="stretch">
              {[1, 2, 3].map((j) => (
                <HStack key={j} gap={4}>
                  <Skeleton height="40px" width="40px" borderRadius="lg" />
                  <VStack align="flex-start" gap={2} flex={1}>
                    <Skeleton height="12px" width="80px" />
                    <Skeleton height="16px" width="200px" />
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  </Container>
);

const AgencyProfile = () => {
  const { data: profile, isLoading } = useGetAgencyProfile();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack gap={8}>
        {/* Profile Header Card */}
        <Box
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderRadius="2xl"
          p={{ base: 6, md: 10 }}
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.100"
          position="relative"
          overflow="hidden"
        >
          <Box position="absolute" top={0} left={0} right={0} h="4px" bg={WEBSITE_THEME_COLOR} />

          <Flex direction={{ base: "column", md: "row" }} align={{ base: "center", md: "flex-start" }} gap={8}>
            <Avatar.Root
              size="2xl"
              shape="rounded"
              bg="green.50"
              color={WEBSITE_THEME_COLOR}
              border="4px solid"
              borderColor="white"
              _dark={{ borderColor: "gray.800" }}
              boxShadow="lg"
            >
              <Avatar.Fallback>
                <Building2 size={40} />
              </Avatar.Fallback>
              <Avatar.Image src={profile?.companyLogoUrl} />
            </Avatar.Root>

            <VStack align={{ base: "center", md: "flex-start" }} gap={4} flex={1}>
              <Box textAlign={{ base: "center", md: "left" }}>
                <HStack gap={3} mb={1} justify={{ base: "center", md: "flex-start" }}>
                  <Heading size="xl" fontWeight="800" color="gray.900" _dark={{ color: "white" }}>
                    {profile?.companyName}
                  </Heading>
                  <Badge
                    colorPalette={profile?.profileComplete ? "green" : "orange"}
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="700"
                  >
                    {profile?.profileComplete ? "● Profile Complete" : "● Incomplete Profile"}
                  </Badge>
                </HStack>
                <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.400" }} maxW="2xl">
                  {profile?.companyDescription}
                </Text>
              </Box>

              <HStack gap={6} flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
                {profile?.companyWebsite && (
                  <Link href={profile.companyWebsite} target="_blank">
                    <HStack gap={2} color={WEBSITE_THEME_COLOR} fontWeight="600" fontSize="sm">
                      <Globe size={16} />
                      <Text>{profile.companyWebsite.replace(/^https?:\/\//, "")}</Text>
                      <ExternalLink size={14} />
                    </HStack>
                  </Link>
                )}
                <HStack gap={2} color="gray.500" fontSize="sm">
                  <Calendar size={16} />
                  <Text>Joined {new Date(profile?.createdAt || "").toLocaleDateString()}</Text>
                </HStack>
              </HStack>
            </VStack>

            <Button
              bg={WEBSITE_THEME_COLOR}
              color="white"
              _hover={{ opacity: 0.9 }}
              px={8}
              borderRadius="xl"
            >
              Edit Profile
            </Button>
          </Flex>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
          {/* Company Details */}
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="2xl"
            p={8}
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <SectionHeader title="Company Details" />
            <VStack gap={6} align="stretch">
              <InfoItem icon={<MapPin size={20} />} label="Address" value={profile?.companyAddress} />
              <InfoItem icon={<Phone size={20} />} label="Phone" value={profile?.companyPhone} />
              <SimpleGrid columns={2} gap={6}>
                <InfoItem icon={<FileText size={20} />} label="Reg. Number" value={profile?.registrationNumber} />
                <InfoItem icon={<Fingerprint size={20} />} label="Tax ID" value={profile?.taxId} />
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Contact Person */}
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="2xl"
            p={8}
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <SectionHeader title="Contact Person" />
            <VStack gap={6} align="stretch">
              <InfoItem icon={<User size={20} />} label="Full Name" value={profile?.contactPersonName} />
              <InfoItem icon={<Mail size={20} />} label="Email Address" value={profile?.contactPersonEmail} />
              <InfoItem icon={<Phone size={20} />} label="Contact Phone" value={profile?.contactPersonPhone} />
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Documents */}
        <Box
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderRadius="2xl"
          p={8}
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.100"
        >
          <SectionHeader title="Documents" />
          {profile?.documents && profile.documents.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
              {profile.documents.map((doc: any) => (
                <Box key={doc.id} p={4} borderWidth="1px" borderRadius="lg" borderColor="gray.200" _hover={{ shadow: "md" }} transition="all 0.2s">
                  <VStack align="center" gap={3}>
                    <Box
                      w="full"
                      h="150px"
                      bg="gray.50"
                      borderRadius="md"
                      overflow="hidden"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_IMAGE_ENDPOINT}${doc.documentPath || doc.fileUrl || doc.url || ""}`}
                        alt={doc.documentName}
                        objectFit="cover"
                        w="full"
                        h="full"
                      />
                    </Box>
                    <VStack gap={1} w="full" align="flex-start">
                      <Text fontWeight="600" fontSize="sm" lineClamp={1}>
                        {doc.documentName}
                      </Text>
                      <HStack justify="space-between" w="full">
                        <Text fontSize="xs" color="gray.500" fontWeight="500">
                          {doc.documentType}
                        </Text>
                        <Badge
                          colorPalette={
                            doc.status === "APPROVED"
                              ? "green"
                              : doc.status === "REJECTED"
                                ? "red"
                                : "orange"
                          }
                          fontSize="2xs"
                        >
                          {doc.status}
                        </Badge>
                      </HStack>
                    </VStack>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Text color="gray.500">No documents available.</Text>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default AgencyProfile;
