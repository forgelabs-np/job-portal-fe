"use client";

import { useGetAgenciesQuery } from "@/api/admin";
import { AssignJobPayloadType, useAssignJobMutation } from "@/api/job";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Button, Dialog, FormProvider } from "@/shared";
import { MultiSelectFieldInput } from "@/shared/ui/MultiSelectFieldInput";
import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface AssignJobModalProps {
  jobId: number | null;
  jobTitle?: string;
  open: boolean;
  onClose: () => void;
}

interface AssignJobFormValues {
  agencyIds: number[];
}

const AssignJobModal = ({
  jobId,
  jobTitle,
  open,
  onClose,
}: AssignJobModalProps) => {
  const methods = useForm<AssignJobFormValues>({
    defaultValues: {
      agencyIds: [],
    },
  });

  const { reset } = methods;

  const { data: agencies } = useGetAgenciesQuery({
    status: "APPROVED",
  });

  console.log(agencies, "agencies");

  const agencyOptions =
    agencies?.map((agency) => ({
      label: agency.companyName,
      value: agency.userId,
    })) ?? [];

  const { mutate: assignJob, isPending } = useAssignJobMutation();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: AssignJobFormValues) => {
    if (!jobId) return;

    const payload: AssignJobPayloadType = {
      data: {
        jobDemandId: jobId,
        agencyIds: data.agencyIds,
      },
    };

    assignJob(payload, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} size="md" hasCloseTrigger>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <VStack align="stretch" gap={6}>
          <Stack>
            <Text fontSize="2xl" fontWeight="700" color="gray.900">
              Assign Job to Agencies
            </Text>
            <Text mt={1} fontSize="md" color="gray.500">
              Assigning{" "}
              <Text as="span" fontWeight="600" color="gray.700">
                {jobTitle ?? "this job"}
              </Text>{" "}
              to selected agencies.
            </Text>
          </Stack>

          <MultiSelectFieldInput
            name="agencyIds"
            label="Agencies"
            options={agencyOptions}
            placeholder="Select agencies"
            required
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
              minW="160px"
              bg={WEBSITE_THEME_COLOR}
            >
              Assign Job
            </Button>
          </HStack>
        </VStack>
      </FormProvider>
    </Dialog>
  );
};

export default AssignJobModal;
