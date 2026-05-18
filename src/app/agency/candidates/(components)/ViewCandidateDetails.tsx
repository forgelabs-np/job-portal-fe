"use client";

import {
  Candidate,
  useGetCandidateById,
} from "@/api/candidates";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { baseURL } from "@/utils/axios";
import { Dialog } from "@/shared";
import {
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Badge,
  Spinner,
  Link,
} from "@chakra-ui/react";
import {
  ExternalLink,
  FileText,
  Folder,
  IdCard,
  User,
  Calendar,
  Heart,
  Video,
} from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { StatusBadge } from "./AddorEditCandidates";

interface ViewCandidateDetailsProps {
  id: number | undefined;
  onClose: () => void;
  open: boolean;
  resetId: (id?: number) => void;
}

const ImageBaseUrl = process.env.NEXT_PUBLIC_API_IMAGE_ENDPOINT

const getDocImageUrl = (link: string) => {
  if (!link) return "";
  if (link.startsWith("http://") || link.startsWith("https://")) {
    return link;
  }
  const base = baseURL?.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  const path = link.startsWith("/") ? link : `/${link}`;
  console.log(`${base}${path}`, "urlllllllllll")
  return `${base}${path}`;
};

const isImageFile = (filename: string) => {
  if (!filename) return false;
  const ext = filename.split(".").pop()?.toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext || "");
};

const DetailRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <Box
    p={3}
    bg="gray.50"
    _dark={{ bg: "gray.800" }}
    borderRadius="lg"
    border="1px solid"
    borderColor="gray.100"
  >
    <HStack gap={3}>
      {icon && (
        <Box color={WEBSITE_THEME_COLOR} flexShrink={0}>
          {icon}
        </Box>
      )}
      <Box>
        <Text fontSize="xs" color="gray.500" fontWeight="medium">
          {label}
        </Text>
        <Text fontSize="sm" fontWeight="semibold" color="gray.800" _dark={{ color: "white" }}>
          {value || "-"}
        </Text>
      </Box>
    </HStack>
  </Box>
);

const ViewCandidateDetails = ({
  id,
  onClose,
  open,
  resetId,
}: ViewCandidateDetailsProps) => {
  const { data: candidate, isLoading } = useGetCandidateById(Number(id));

  const [isOpenImage, setIsOpenImage] = useState(false);
  const [imageList, setImageList] = useState<{ src: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openImages = (startIndex: number) => {
    if (!candidate?.documents) return;
    setImageList(
      candidate.documents
        .filter((doc) => doc.documentPath)
        .map((doc) => ({
          src: `${ImageBaseUrl}${doc.documentPath}`,
        })),
    );
    setLightboxIndex(startIndex);
    setIsOpenImage(true);
  };

  console.log(candidate, "candidate");

  useEffect(() => {
    if (!open) {
      setIsOpenImage(false);
      setLightboxIndex(0);
      setImageList([]);
    }
  }, [open]);

  const handleClose = () => {
    if (isOpenImage) {
      return;
    }
    resetId(undefined);
    onClose();
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        title="Candidate Profile Details"
        size="xl"
        hasCloseTrigger
      >
        <Box display="flex" flexDirection="column" height="75vh" overflow="hidden">
          {isLoading ? (
            <Flex flex={1} justify="center" align="center" direction="column" gap={3}>
              <Spinner size="lg" color={WEBSITE_THEME_COLOR} />
              <Text fontSize="sm" color="gray.500">
                Loading candidate profile...
              </Text>
            </Flex>
          ) : !candidate ? (
            <Flex flex={1} justify="center" align="center">
              <Text fontSize="sm" color="gray.500">
                No candidate found.
              </Text>
            </Flex>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              flex={1}
              minH={0}
              overflow="hidden"
            >
              <Box flex={1} overflowY="auto" px={1} pb={4} display="flex" flexDirection="column" gap={6}>

                {/* Header Details Card */}
                <Box
                  p={5}
                  borderRadius="xl"
                  bg="linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.02) 100%)"
                  border="1px solid"
                  borderColor="emerald.100"
                  _dark={{
                    borderColor: "emerald.900",
                    bg: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.04) 100%)"
                  }}
                >
                  <HStack gap={4} align="center">
                    <Circle size="60px" bg={WEBSITE_THEME_COLOR} color="white">
                      <User size={30} />
                    </Circle>
                    <Box>
                      <Text fontSize="xl" fontWeight="bold" color="gray.800" _dark={{ color: "white" }}>
                        {candidate.fullName}
                      </Text>
                      <HStack mt={1} gap={2}>
                        <Badge colorPalette="emerald" variant="solid" rounded="full">
                          {candidate.trade}
                        </Badge>
                        <Badge colorPalette="gray" variant="subtle" rounded="full">
                          Age: {candidate.age} yrs
                        </Badge>
                      </HStack>
                    </Box>
                  </HStack>
                </Box>

                {/* Personal Info Grid */}
                <Box>
                  <HStack gap={2} mb={3}>
                    <User size={16} color={WEBSITE_THEME_COLOR} />
                    <Text fontWeight="bold" fontSize="sm" color="gray.700" _dark={{ color: "gray.300" }}>
                      Personal Information
                    </Text>
                  </HStack>
                  <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
                    <DetailRow label="First Name" value={candidate.firstName} />
                    <DetailRow label="Last Name" value={candidate.lastName} />
                    <DetailRow label="Date of Birth" value={candidate.dateOfBirth} icon={<Calendar size={14} />} />
                    <DetailRow label="Marital Status" value={candidate.maritalStatus} icon={<Heart size={14} />} />
                    <DetailRow label="Trade / Job" value={candidate.trade} />
                  </SimpleGrid>
                </Box>

                {/* Passport Details */}
                <Box>
                  <HStack gap={2} mb={3}>
                    <IdCard size={16} color={WEBSITE_THEME_COLOR} />
                    <Text fontWeight="bold" fontSize="sm" color="gray.700" _dark={{ color: "gray.300" }}>
                      Passport & Document Info
                    </Text>
                  </HStack>
                  <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
                    <DetailRow label="Passport Number" value={candidate.passportNumber} />
                    <DetailRow label="Issue Date" value={candidate.passportIssueDate} />
                    <DetailRow label="Expiry Date" value={candidate.passportExpiryDate} />
                  </SimpleGrid>
                </Box>

                {/* External Links */}
                <Box>
                  <HStack gap={2} mb={3}>
                    <Folder size={16} color={WEBSITE_THEME_COLOR} />
                    <Text fontWeight="bold" fontSize="sm" color="gray.700" _dark={{ color: "gray.300" }}>
                      Links & Media
                    </Text>
                  </HStack>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                    <Box
                      p={3}
                      bg="gray.50"
                      _dark={{ bg: "gray.800" }}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="gray.100"
                    >
                      <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>
                        Documents Folder Link
                      </Text>
                      {candidate.documentsFolderLink ? (
                        <Link
                          href={candidate.documentsFolderLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="teal.600"
                          _hover={{ color: "teal.800", textDecoration: "underline" }}
                          fontSize="sm"
                          fontWeight="semibold"
                          display="inline-flex"
                          alignItems="center"
                          gap={1}
                        >
                          Open Documents Folder
                          <ExternalLink size={14} />
                        </Link>
                      ) : (
                        <Text fontSize="sm" fontWeight="semibold" color="gray.400">
                          Not provided
                        </Text>
                      )}
                    </Box>
                    <Box
                      p={3}
                      bg="gray.50"
                      _dark={{ bg: "gray.800" }}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="gray.100"
                    >
                      <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>
                        Intro Video Link
                      </Text>
                      {candidate.introVideoLink ? (
                        <Link
                          href={candidate.introVideoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="red.600"
                          _hover={{ color: "red.800", textDecoration: "underline" }}
                          fontSize="sm"
                          fontWeight="semibold"
                          display="inline-flex"
                          alignItems="center"
                          gap={1}
                        >
                          Watch Video
                          <Video size={14} />
                        </Link>
                      ) : (
                        <Text fontSize="sm" fontWeight="semibold" color="gray.400">
                          Not provided
                        </Text>
                      )}
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* Candidate verification Statuses */}
                <Box>
                  <HStack gap={2} mb={3}>
                    <FileText size={16} color={WEBSITE_THEME_COLOR} />
                    <Text fontWeight="bold" fontSize="sm" color="gray.700" _dark={{ color: "gray.300" }}>
                      Verification Statuses
                    </Text>
                  </HStack>
                  <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} p={4} bg="gray.50" _dark={{ bg: "gray.800" }} borderRadius="lg">
                    <Box>
                      <Text fontSize="xs" color="gray.500" mb={1}>
                        PCC Status
                      </Text>
                      <StatusBadge status={candidate.statuses?.pccStatus} />
                    </Box>
                    <Box>
                      <Text fontSize="xs" color="gray.500" mb={1}>
                        SLC Status
                      </Text>
                      <StatusBadge status={candidate.statuses?.slcStatus} />
                    </Box>
                    <Box>
                      <Text fontSize="xs" color="gray.500" mb={1}>
                        Work Permit Status
                      </Text>
                      <StatusBadge status={candidate.statuses?.workPermitStatus} />
                    </Box>
                    <Box>
                      <Text fontSize="xs" color="gray.500" mb={1}>
                        Visa Status
                      </Text>
                      <StatusBadge status={candidate.statuses?.visaStatus} />
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* Uploaded Verification Documents & Preview Images */}
                <Box>
                  <HStack gap={2} mb={3}>
                    <FileText size={16} color={WEBSITE_THEME_COLOR} />
                    <Text fontWeight="bold" fontSize="sm" color="gray.700" _dark={{ color: "gray.300" }}>
                      Uploaded Document Verification Images
                    </Text>
                  </HStack>
                  {candidate.documents && candidate.documents.length > 0 ? (
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                      {candidate.documents.map((doc, index) => (
                        <Box
                          key={doc.id}
                          border="1px solid"
                          borderColor="gray.200"
                          _dark={{ borderColor: "gray.700" }}
                          borderRadius="xl"
                          overflow="hidden"
                          bg="white"
                          boxShadow="sm"
                        >
                          {/* Doc Card Header */}
                          <Box p={3} borderBottom="1px solid" borderColor="gray.100" bg="gray.50" _dark={{ bg: "gray.800" }}>
                            <Flex justify="space-between" align="center">
                              <Badge colorPalette="teal" variant="solid">
                                {doc.documentType}
                              </Badge>
                              <Text fontSize="2xs" color="gray.400">
                                Uploaded: {doc.uploadedAt ? doc.uploadedAt.substring(0, 10) : "-"}
                              </Text>
                            </Flex>
                          </Box>

                          {/* Doc Card Body with Preview Image */}
                          <Box p={4} display="flex" flexDirection="column" gap={3}>
                            {doc.notes && (
                              <Box>
                                <Text fontSize="xs" color="gray.500" fontWeight="bold">
                                  Notes:
                                </Text>
                                <Text fontSize="xs" color="gray.600" _dark={{ color: "gray.400" }}>
                                  {doc.notes}
                                </Text>
                              </Box>
                            )}

                            {doc.documentPath ? (
                              <Box
                                borderRadius="md"
                                overflow="hidden"
                                border="1px solid"
                                borderColor="gray.100"
                                position="relative"
                                bg="gray.50"
                                _dark={{ bg: "gray.800" }}
                                p={1}
                              >
                                {isImageFile(doc.documentName || doc.documentPath) ? (
                                  <Image
                                    src={`${ImageBaseUrl}${doc.documentPath}`}
                                    alt={doc.documentType}
                                    maxH="200px"
                                    w="100%"
                                    objectFit="contain"
                                    cursor="pointer"
                                    transition="transform 0.3s ease"
                                    _hover={{ transform: "scale(1.03)", opacity: 0.9 }}
                                    onClick={() => openImages(index)}
                                  />
                                ) : (
                                  <Flex minH="120px" justify="center" align="center" direction="column" gap={2}>
                                    <FileText size={40} color="gray.300" />
                                    <Text fontSize="xs" color="gray.400">
                                      Non-image document type
                                    </Text>
                                  </Flex>
                                )}
                              </Box>
                            ) : (
                              <Flex minH="120px" bg="gray.50" _dark={{ bg: "gray.800" }} justify="center" align="center" borderRadius="md">
                                <Text fontSize="xs" color="gray.400">
                                  No preview available
                                </Text>
                              </Flex>
                            )}

                            {doc.documentPath && (
                              <Button
                                type="button"
                                onClick={() => openImages(index)}
                                size="xs"
                                variant="outline"
                                colorPalette="emerald"
                                width="100%"
                                mt={1}
                              >
                                View in Full Screen
                              </Button>
                            )}
                          </Box>
                        </Box>
                      ))}
                    </SimpleGrid>
                  ) : (
                    <Flex p={6} border="1px dashed" borderColor="gray.200" borderRadius="xl" justify="center" align="center">
                      <Text fontSize="xs" color="gray.400">
                        No documents uploaded yet.
                      </Text>
                    </Flex>
                  )}
                </Box>

              </Box>

              {/* Footer */}
              <Box
                pt={4}
                mt={2}
                borderTop="1px solid"
                borderColor="gray.200"
                _dark={{
                  borderColor: "gray.700",
                }}
                display="flex"
                justifyContent="flex-end"
                gap={3}
                flexShrink={0}
              >
                <Button
                  variant="outline"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>

            </Box>
          )}
        </Box>
      </Dialog>

      <Lightbox
        open={isOpenImage}
        close={() => setIsOpenImage(false)}
        slides={imageList}
        index={lightboxIndex}
        styles={{ root: { zIndex: 9999 } }}
      />
    </>
  );
};

export default ViewCandidateDetails;
