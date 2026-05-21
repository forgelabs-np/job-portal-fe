"use client";

import { InterviewStatus, useUpdateInterviewStatusMutation } from "@/api/admin-interview";
import { Button } from "@/shared/ui/button";
import { Dialog } from "@/shared/ui/dialog";
import { SelectFieldInput } from "@/shared/ui/Select";
import { successNotification } from "@/utils/toast";
import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdAutorenew } from "react-icons/md";

interface SetInterviewStatusModalProps {
  interviewId: number;
  candidateName: string;
  currentStatus?: string;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}

const statusColors: Record<string, string> = {
  SCHEDULED: "blue",
  RESCHEDULED: "purple",
  COMPLETED: "green",
  CANCELLED: "red",
  NO_SHOW: "orange",
};

export const SetInterviewStatusModal: React.FC<SetInterviewStatusModalProps> = ({
  interviewId,
  candidateName,
  currentStatus = "SCHEDULED",
  onSuccess,
  trigger,
  open: controlledOpen,
  onClose: controlledOnClose,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleClose = () => {
    if (isControlled && controlledOnClose) controlledOnClose();
    else setInternalOpen(false);
  };

  const methods = useForm<{ status: InterviewStatus }>({
    defaultValues: {
      status: (currentStatus as InterviewStatus) || "SCHEDULED",
    },
  });

  const { handleSubmit, reset } = methods;

  const { mutate: setStatus, isPending } = useUpdateInterviewStatusMutation();

  const onSubmit = (data: { status: InterviewStatus }) => {
    setStatus(
      {
        interviewId,
        status: data.status,
      },
      {
        onSuccess: () => {
          successNotification("Interview status updated successfully!");
          reset();
          handleClose();
          onSuccess?.();
        },
       
      }
    );
  };

  return (
    <>
      {!isControlled && trigger ? (
        <div onClick={() => setInternalOpen(true)} style={{ width: '100%' }}>
          {trigger}
        </div>
      ) : !isControlled ? (
        <Button variant="outline" size="sm" onClick={() => setInternalOpen(true)} colorScheme="purple">
          <HStack gap={1} align="center">
            <MdAutorenew size={16} />
            <Text>Update Status</Text>
          </HStack>
        </Button>
      ) : null}

      <Dialog
        open={open}
        onClose={handleClose}
        title="Update Interview Status"
        hasCloseTrigger
        size="lg"
        contentMinWidth="500px"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4} align="stretch">
              <Box>
                <Text fontSize="sm" color="gray.600">
                  Candidate
                </Text>
                <Text fontWeight="600" fontSize="md">
                  {candidateName}
                </Text>
              </Box>

              {currentStatus && (
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Current Status
                  </Text>
                  <Badge
                    colorScheme={statusColors[currentStatus] || "gray"}
                    fontSize="sm"
                    px={3}
                    py={1}
                  >
                    {currentStatus}
                  </Badge>
                </Box>
              )}

              <SelectFieldInput
                name="status"
                label="New Status"
                options={[
                  { label: "Scheduled", value: "SCHEDULED" },
                  { label: "Rescheduled", value: "RESCHEDULED" },
                  { label: "Completed", value: "COMPLETED" },
                  { label: "Cancelled", value: "CANCELLED" },
                  { label: "No Show", value: "NO_SHOW" },
                ]}
                required
              />

              <HStack justify="flex-end" pt={4}>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Updating..." : "Update Status"}
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormProvider>
      </Dialog>
    </>
  );
};
