"use client";

import { AgencyDocument, AgencyProfileDetails } from "@/api/admin";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Button, Dialog } from "@/shared";

import {
  Badge,
  Box,
  Flex,
  HStack,
  Input,
  Link,
  SimpleGrid,
  Tabs,
  Text,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";

type ModalMode = "view" | "edit";
type ConfirmAction = "Approve" | "Reject";
type ActionScope = "PROFILE" | "DOCUMENT";

interface AgencyProfileReviewDialogProps {
  open: boolean;
  onClose: () => void;
  mode: ModalMode;
  profile?: AgencyProfileDetails;
  isLoading: boolean;
  onActionClick: (action: {
    scope: ActionScope;
    action: ConfirmAction;
    id: number;
  }) => void;
}

const getProfileStatus = (profile?: AgencyProfileDetails) =>
  profile?.approvalStatus ??
  profile?.profileStatus ??
  profile?.status ??
  "PENDING";

const getDocumentUrl = (document: AgencyDocument) =>
  document.documentPath ?? document.fileUrl ?? document.url ?? "";

const LabelValueField = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <Box>
    <Text fontSize="sm" fontWeight="semibold" mb={1}>
      {label}
    </Text>
    <Input value={value ?? ""} readOnly />
  </Box>
);

export const AgencyProfileReviewDialog = ({
  open,
  onClose,
  mode,
  profile,
  isLoading,
  onActionClick,
}: AgencyProfileReviewDialogProps) => {
  const profileStatus = getProfileStatus(profile);
  const documents = profile?.documents ?? [];
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [imageList, setImageList] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const baseImageUrl = "http://192.168.1.109:8080/"


  const openImages = (startIndex: number) => {
    setImageList(
      documents.map(
        (doc) => `${baseImageUrl}${getDocumentUrl(doc)}`,
      ),
    );
    setLightboxIndex(startIndex);
    setIsOpenImage(true);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        hasCloseTrigger={true}
        title={mode === "edit" ? "Edit Agency Profile" : "View Agency Profile"}
        size="xl"
      >
        <Box display="flex" flexDirection="column" h="75vh" maxH="75vh">
          {isLoading ? (
            <Text>Loading profile details...</Text>
          ) : (
            <Tabs.Root defaultValue="details" variant="enclosed">
              <Tabs.List>
                <Tabs.Trigger value="details">User Details</Tabs.Trigger>
                <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
              </Tabs.List>

              <Tabs.ContentGroup flex={1} minH={0}>
                <Tabs.Content value="details" px={0}>
                  <Box overflowY="auto" maxH="62vh" px={1} pb={2}>
                    <VStack align="stretch" gap={6}>
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                        <LabelValueField
                          label="Company Name"
                          value={profile?.companyName}
                        />
                        <LabelValueField label="Email" value={profile?.email} />
                        <LabelValueField
                          label="Company Website"
                          value={profile?.companyWebsite}
                        />
                        <LabelValueField
                          label="Company Phone"
                          value={profile?.companyPhone}
                        />
                        <LabelValueField
                          label="Company Address"
                          value={profile?.companyAddress}
                        />
                        <LabelValueField
                          label="Registration Number"
                          value={profile?.registrationNumber}
                        />
                        <LabelValueField
                          label="Tax ID"
                          value={profile?.taxId}
                        />
                        <LabelValueField
                          label="Contact Person Name"
                          value={profile?.contactPersonName}
                        />
                        <LabelValueField
                          label="Contact Person Email"
                          value={profile?.contactPersonEmail}
                        />
                        <LabelValueField
                          label="Contact Person Phone"
                          value={profile?.contactPersonPhone}
                        />
                      </SimpleGrid>

                      <Box>
                        <Text fontWeight="semibold" mb={2}>
                          Company Description
                        </Text>
                        <Input
                          value={profile?.companyDescription ?? ""}
                          readOnly
                        />
                      </Box>

                      <Box>
                        <Flex align="center" justify="space-between" mb={3}>
                          <Text fontWeight="bold">Profile Status</Text>
                          <Badge
                            colorPalette={
                              profileStatus === "APPROVED"
                                ? "green"
                                : profileStatus === "REJECTED"
                                  ? "red"
                                  : "orange"
                            }
                          >
                            {profileStatus}
                          </Badge>
                        </Flex>
                        {mode === "edit" && (
                          <HStack gap={3}>
                            <Button
                              bg={WEBSITE_THEME_COLOR}
                              _hover={{ opacity: 0.9 }}
                              onClick={() =>
                                onActionClick({
                                  scope: "PROFILE",
                                  action: "Approve",
                                  id: profile?.userId ?? 0,
                                })
                              }
                              disabled={!profile?.userId}
                            >
                              Approve Profile
                            </Button>
                            <Button
                              variant="outline"
                              colorPalette="red"
                              onClick={() =>
                                onActionClick({
                                  scope: "PROFILE",
                                  action: "Reject",
                                  id: profile?.userId ?? 0,
                                })
                              }
                              disabled={!profile?.userId}
                            >
                              Reject Profile
                            </Button>
                          </HStack>
                        )}
                      </Box>
                    </VStack>
                  </Box>
                </Tabs.Content>

                <Tabs.Content value="documents" px={0}>
                  <Box overflowY="auto" maxH="62vh" px={1} pb={2}>
                    <VStack align="stretch" gap={3}>
                      {documents.map((doc, index) => {
                        const docUrl = getDocumentUrl(doc);
                        return (
                          <Box
                            key={doc.id}
                            border="1px solid"
                            borderColor="gray.200"
                            rounded="md"
                            p={3}
                          >
                            <Flex
                              align={{ base: "start", md: "center" }}
                              justify="space-between"
                              direction={{ base: "column", md: "row" }}
                              gap={3}
                            >
                              <VStack align="start" gap={1}>
                                <Text fontWeight="semibold">
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
                                >
                                  {doc.status ?? "PENDING"}
                                </Badge>
                                {doc.rejectionReason ? (
                                  <Text fontSize="sm" color="red.500">
                                    Reason: {doc.rejectionReason}
                                  </Text>
                                ) : null}
                              </VStack>
                              <HStack gap={2}>
                                {docUrl ? (
                                  <Link
                                    href={`${baseImageUrl}${docUrl}`}
                                    target="_blank"
                                    color={WEBSITE_THEME_COLOR}
                                  >
                                    View File
                                  </Link>
                                ) : (
                                  // <Image
                                  //   src={`http://192.168.1.109:8080/${docUrl}`}
                                  //   height="40px"
                                  //   width="40px"
                                  //   objectFit="cover"
                                  //   rounded="md"
                                  //   // Remove openImages function entirely, just do it inline:
                                  //   onClick={(e) => {
                                  //     e.stopPropagation(); // 👈 add this
                                  //     const allUrls =
                                  //       profile?.documents?.map(
                                  //         (d) =>
                                  //           `http://192.168.1.109:8080/${getDocumentUrl(d)}`,
                                  //       ) ?? [];
                                  //     setImageList(allUrls);
                                  //     setLightboxIndex(index);
                                  //     setIsOpenImage(true);
                                  //   }}
                                  // />
                                  <Text fontSize="sm" color="gray.500">
                                    File unavailable
                                  </Text>
                                )}
                                {mode === "edit" && (
                                  <>
                                    <Button
                                      size="sm"
                                      bg={WEBSITE_THEME_COLOR}
                                      _hover={{ opacity: 0.9 }}
                                      onClick={() =>
                                        onActionClick({
                                          scope: "DOCUMENT",
                                          action: "Approve",
                                          id: doc.id,
                                        })
                                      }
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      colorPalette="red"
                                      onClick={() =>
                                        onActionClick({
                                          scope: "DOCUMENT",
                                          action: "Reject",
                                          id: doc.id,
                                        })
                                      }
                                    >
                                      Reject
                                    </Button>
                                  </>
                                )}
                              </HStack>
                            </Flex>
                          </Box>
                        );
                      })}
                      {!documents.length && (
                        <Text fontSize="sm" color="gray.500">
                          No documents found for this profile.
                        </Text>
                      )}
                    </VStack>
                  </Box>
                </Tabs.Content>
              </Tabs.ContentGroup>
            </Tabs.Root>
          )}
        </Box>
      </Dialog>
      {/* <Lightbox
        open={isOpenImage}
        close={() => setIsOpenImage(false)}
        slides={imageList}
        index={lightboxIndex ?? 0}
        styles={{ root: { zIndex: 9999 } }}
        // zoom={{ maxZoomPixelRatio: 10 }}
      /> */}
    </>
  );
};
