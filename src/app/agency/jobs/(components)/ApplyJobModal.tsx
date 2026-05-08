"use client";

import { Candidate, useGetAllCandidates } from "@/api/candidates";
import { Dialog, FormProvider, TextFieldInput } from "@/shared";
import { SelectFieldInput } from "@/shared/ui/Select";
import { Button } from "@/shared";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  CreateJobPayloadType,
  JobApplicationPayload,
  useCreateApplicationMutation,
} from "@/api/agency-jobs";

interface ApplyCandidateModalProps {
  id: number;
  open: boolean;
  onClose: () => void;
  jobTitle?: string;
}

const ApplyCandidateModal = ({
  id,
  open,
  onClose,
  jobTitle,
}: ApplyCandidateModalProps) => {
  const methods = useForm<JobApplicationPayload>({
    defaultValues: {
      candidateId: null,
      notes: "",
    },
  });

  const { reset } = methods;

  const { data: candidatesData } = useGetAllCandidates();

  const candidateOptions =
    candidatesData?.map((candidate: Candidate) => ({
      label: candidate.fullName,
      value: candidate.id,
    })) ?? [];

  console.log(candidatesData, "optionnss");

  const { mutate: createApplication, isPending } =
    useCreateApplicationMutation();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: JobApplicationPayload) => {
    const payload: CreateJobPayloadType = {
      data: {
        jobDemandId: id,
        candidateId: Number(data.candidateId),
        notes: data.notes,
      },
    };

    createApplication(payload, {
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
          <Box>
            <Text
              fontSize="2xl"
              fontWeight="700"
              color="gray.900"
              _dark={{ color: "white" }}
            >
              Submit a candidate
            </Text>

            <Text mt={1} fontSize="md" color="gray.500">
              Applying to{" "}
              <Text
                as="span"
                fontWeight="600"
                color="gray.700"
                _dark={{ color: "gray.200" }}
              >
                {jobTitle ?? "this job"}
              </Text>
              .
            </Text>
          </Box>

          {/* Candidate Select */}
          <SelectFieldInput
            name="candidateId"
            label="Candidate"
            options={candidateOptions}
            placeholder="Select a candidate"
            required
          />

          {/* Notes */}
          <TextFieldInput
            name="notes"
            label="Notes (optional)"
            placeholder="Anything the admin should know"
          />

          {/* Footer */}
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
              colorPalette="blue"
            >
              Submit application
            </Button>
          </HStack>
        </VStack>
      </FormProvider>
    </Dialog>
  );
};

export default ApplyCandidateModal;
