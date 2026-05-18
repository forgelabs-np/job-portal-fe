"use client";

import { useApplyToJobMutation, CandidateApplyPayload } from "@/api/candidate-api";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Button, Dialog, FormProvider, TextFieldInput } from "@/shared";
import { HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface CandidateApplyModalProps {
  jobId: number;
  open: boolean;
  onClose: () => void;
}

const CandidateApplyModal = ({
  jobId,
  open,
  onClose,
}: CandidateApplyModalProps) => {
  const methods = useForm<{ notes: string }>({
    defaultValues: {
      notes: "",
    },
  });

  const { reset } = methods;

  const { mutate: applyToJob, isPending } = useApplyToJobMutation();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: { notes: string }) => {
    const payload: CandidateApplyPayload = {
      jobDemandId: jobId,
      notes: data.notes,
    };

    applyToJob(payload, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} size="md" hasCloseTrigger>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <VStack align="stretch" gap={6}>
          {/* Header */}
          <Stack>
            <Text
              fontSize="xl"
              fontWeight="700"
              color="gray.900"
              _dark={{ color: "white" }}
            >
              Apply for this Job
            </Text>

            <Text mt={1} fontSize="md" color="gray.500">
              You are about to submit your application. Add any notes you&apos;d
              like the employer to see.
            </Text>
          </Stack>

          <TextFieldInput
            name="notes"
            label="Notes (optional)"
            placeholder="Tell the employer why you're a great fit..."
          />

          <HStack justify="flex-end" gap={3}>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              minW="100px"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              loading={isPending}
              minW="180px"
              bg={WEBSITE_THEME_COLOR}
            >
              Submit Application
            </Button>
          </HStack>
        </VStack>
      </FormProvider>
    </Dialog>
  );
};

export default CandidateApplyModal;
