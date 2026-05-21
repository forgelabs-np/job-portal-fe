import React, { useState } from "react";
import { Dialog } from "@/shared/ui/dialog";
import { InterviewResponse, useGetInterviewByIdQuery } from "@/api/admin-interview";
import { Box, Text, VStack, HStack, Badge, Icon, Separator, Spinner, IconButton } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

import Link from "next/link";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { CalendarIcon, LinkIcon, TimerIcon } from "lucide-react";
import { LocationIcon } from "@/assets/svg";
import { MdVisibility } from "react-icons/md";

interface ViewInterviewModalProps {
  interviewId?: number;
  open?: boolean;
  onClose?: () => void;
  interview?: InterviewResponse | null; // or InterviewResponse
}

export const ViewInterviewModal: React.FC<ViewInterviewModalProps> = ({
  interviewId,
  open: controlledOpen,
  onClose: controlledOnClose,
  interview: controlledInterview,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const { data: fetchedInterview, isLoading } = useGetInterviewByIdQuery(
    open && !controlledInterview && interviewId ? interviewId : null
  );

  const interview = controlledInterview || fetchedInterview;

  const handleClose = () => {
    if (isControlled && controlledOnClose) controlledOnClose();
    else setInternalOpen(false);
  };

  const parsedDate = interview?.scheduledAt ? parseISO(interview.scheduledAt) : null;
  const displayDate = parsedDate ? format(parsedDate, "MMMM d, yyyy") : "N/A";
  const displayTime = parsedDate ? format(parsedDate, "h:mm a") : "N/A";

  const isOnline = interview?.interviewType === "ONLINE";

  return (
    <>
      {!isControlled && (
        <IconButton size="sm" variant="ghost" colorScheme="blue" onClick={() => setInternalOpen(true)}>
          <MdVisibility size={18} />
        </IconButton>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        title="Interview Details"
        hasCloseTrigger
        size="lg"
      >
        {isLoading ? (
          <HStack justify="center" p={8}>
            <Spinner />
          </HStack>
        ) : interview ? (
          <VStack align="stretch" gap={5} mt={4}>
            <Box p={4} borderRadius="lg" bg="gray.50" borderWidth="1px" borderColor="gray.100">
              <VStack align="stretch" gap={3}>
                <HStack justify="space-between">
                  <Text fontWeight="bold" color="gray.600">Candidate:</Text>
                  <Text fontWeight="semibold">{interview.candidateName}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="bold" color="gray.600">Job Title:</Text>
                  <Text>{interview.jobTitle}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="bold" color="gray.600">Status:</Text>
                  <Badge colorPalette={
                    interview.status === "SCHEDULED" ? "blue" : 
                    interview.status === "RESCHEDULED" ? "teal" :
                    interview.status === "COMPLETED" ? "green" : 
                    interview.status === "CANCELLED" ? "red" : "gray"
                  }>
                    {interview.status}
                  </Badge>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="bold" color="gray.600">Result:</Text>
                  <Badge colorPalette={
                    interview.result === "PENDING" ? "yellow" :
                    interview.result === "PASS" ? "green" : 
                    interview.result === "FAIL" ? "red" : 
                    interview.result === "RE_INTERVIEW" ? "orange" : "gray"
                  }>
                    {interview.result}
                  </Badge>
                </HStack>
              </VStack>
            </Box>

            <Separator />

            <Text fontWeight="bold" fontSize="lg">Schedule & Location</Text>

            <Box p={4} borderRadius="lg" borderWidth="1px" borderColor={WEBSITE_THEME_COLOR} bg="white" shadow="sm">
              <VStack align="stretch" gap={4}>
                <HStack>
                  <Icon as={CalendarIcon} color={WEBSITE_THEME_COLOR} boxSize={5} />
                  <Text fontWeight="medium" flex={1}>Date:</Text>
                  <Text>{displayDate}</Text>
                </HStack>
                
                <HStack>
                  <Icon as={TimerIcon} color={WEBSITE_THEME_COLOR} boxSize={5} />
                  <Text fontWeight="medium" flex={1}>Time:</Text>
                  <Text>{displayTime} ({interview.timezone})</Text>
                </HStack>

                <HStack>
                  <Icon as={isOnline ? LinkIcon : LocationIcon} color={WEBSITE_THEME_COLOR} boxSize={5} />
                  <Text fontWeight="medium" flex={1}>
                    {isOnline ? "Meeting Link:" : "Venue:"}
                  </Text>
                  {isOnline ? (
                    interview.interviewLink ? (
                      <Link href={interview.interviewLink} target="_blank" rel="noopener noreferrer">
                        <Text color="blue.500" textDecoration="underline"  maxW="200px">
                          {interview.interviewLink}
                        </Text>
                      </Link>
                    ) : (
                      <Text color="gray.500">Not provided</Text>
                    )
                  ) : (
                    <Text>{interview.venue || "Not provided"}</Text>
                  )}
                </HStack>
              </VStack>
            </Box>

            {interview.adminNotes && (
              <Box p={4} borderRadius="lg" bg="yellow.50" borderWidth="1px" borderColor="yellow.200">
                <Text fontWeight="bold" color="yellow.800" mb={2}>Notes from Admin:</Text>
                <Text fontSize="sm" color="yellow.900">{interview.adminNotes}</Text>
              </Box>
            )}

          </VStack>
        ) : (
          <Text p={4}>Interview not found.</Text>
        )}
      </Dialog>
    </>
  );
};

export default ViewInterviewModal;
