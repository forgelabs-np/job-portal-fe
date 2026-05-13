import { AgencyProfile } from "@/api/agency";
import { Button } from "@/shared";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { LuCircleAlert, LuClock } from "react-icons/lu";

interface AgencyVerificationStatusProps {
  isRejected: boolean;
  isProfileRejected: boolean;
  anyDocumentRejected: boolean;
  agencyProfile?: AgencyProfile;
  handleLogout: () => void;
  onUpdate: (step: number) => void;
}

export const AgencyVerificationStatus = ({
  isRejected,
  isProfileRejected,
  anyDocumentRejected,
  agencyProfile,
  handleLogout,
  onUpdate,
}: AgencyVerificationStatusProps) => {
  return (
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
      </Box>
      <VStack gap={2} px={4} width="100%">
        <Text fontSize="xl" fontWeight="bold">
          {isRejected ? "Verification Rejected" : "Verification Under Review"}
        </Text>
        <Text color="gray.600">
          {isRejected
            ? "Unfortunately, your profile verification has been rejected."
            : "Your profile verification is currently under review by our team. This usually takes 24-48 hours. We'll notify you once it's approved."}
        </Text>

        {isRejected && (
          <VStack align="stretch" width="100%" gap={4} mt={4}>
            {agencyProfile?.profileRejectionReason && (
              <Box
                p={4}
                bg="red.50"
                borderRadius="md"
                borderWidth="1px"
                borderColor="red.100"
                textAlign="left"
                width="100%"
              >
                <Text fontWeight="semibold" color="red.700" fontSize="sm" mb={1}>
                  Profile Rejection Reason:
                </Text>
                <Text color="red.600" fontSize="sm">
                  {agencyProfile.profileRejectionReason}
                </Text>
              </Box>
            )}

            {agencyProfile?.documents?.some(
              (doc: any) => doc.status === "REJECTED",
            ) && (
                <Box textAlign="left" width="100%">
                  <Text fontWeight="bold" mb={2} color="red.700" fontSize="sm">
                    Rejected Documents:
                  </Text>
                  <VStack align="stretch" gap={2} width="100%">
                    {agencyProfile.documents
                      .filter((doc: any) => doc.status === "REJECTED")
                      .map((doc: any) => (
                        <Box
                          key={doc.id}
                          p={3}
                          bg="red.50"
                          borderRadius="md"
                          borderWidth="1px"
                          borderColor="red.100"
                          width="100%"
                        >
                          <Text fontWeight="semibold" fontSize="xs" color="red.700">
                            {doc.documentType.replace(/_/g, " ")}
                          </Text>
                          <Text color="red.600" fontSize="xs">
                            Reason: {doc.rejectionReason || "No reason provided"}
                          </Text>
                        </Box>
                      ))}
                  </VStack>
                </Box>
              )}
          </VStack>
        )}
      </VStack>
      <HStack gap={3} justify="center" width="100%">
        {isRejected && (
          <Button
            bg="#0d6944"
            _hover={{ bg: "#0a5535" }}
            onClick={() => onUpdate(anyDocumentRejected && !isProfileRejected ? 1 : 0)}
            mt={4}
          >
            {anyDocumentRejected && !isProfileRejected
              ? "Update Documents"
              : "Update Profile & Documents"}
          </Button>
        )}
        <Button
          variant="outline"
          onClick={handleLogout}
          mt={4}
          borderColor="gray.300"
          _hover={{ bg: "gray.50" }}
        >
          Log Out
        </Button>
      </HStack>
    </VStack>
  );
};
