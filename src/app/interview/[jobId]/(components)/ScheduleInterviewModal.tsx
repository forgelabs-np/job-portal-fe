import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import {
  Input,
  Textarea,
  Stack,
  Field,
  Text,
  Box,
  DialogRoot,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Dialog, DialogCloseTrigger, DialogContent } from "@/shared";
import { MultiSelectFieldInput } from "@/shared/ui/MultiSelectFieldInput";
import { SelectFieldInput } from "@/shared/ui/Select";
import {
  useCreateOrUpdateInterviewMutation,
  useGetInterviewByIdQuery,
  useUpdateInterviewStatusMutation,
} from "@/api/admin-interview";
import { format, parseISO } from "date-fns";

interface CandidateOption {
  id: number;
  name: string;
}

interface ScheduleInterviewModalProps {
  open: boolean;
  onClose: () => void;
  candidate?: CandidateOption;
  candidates?: CandidateOption[];
  isBulk?: boolean;
  existingInterviewId?: number;
}

interface ScheduleInterviewFormValues {
  candidateIds: number[];
  mode: "ONLINE" | "IN_PERSON";
  date: string;
  time: string;
  locationOrUrl: string;
  notes: string;
  timezone: string;
}

export function ScheduleInterviewModal({
  open,
  onClose,
  candidate,
  candidates = [],
  isBulk = false,
  existingInterviewId,
}: ScheduleInterviewModalProps) {
  const { data: existingInterview, isLoading: isLoadingExisting } = useGetInterviewByIdQuery(
    existingInterviewId || null
  );

  const methods = useForm<ScheduleInterviewFormValues>({
    defaultValues: {
      candidateIds: candidate ? [candidate.id] : [],
      mode: "ONLINE",
      date: "",
      time: "",
      locationOrUrl: "",
      notes: "",
      timezone: "UTC",
    },
  });

  const { reset, watch, register, handleSubmit, formState: { isValid }, setValue } = methods;
  const mode = watch("mode");

  useEffect(() => {
    if (existingInterview) {
      const parsedDate = parseISO(existingInterview.scheduledAt);
      setValue("mode", existingInterview.interviewType);
      setValue("date", format(parsedDate, "yyyy-MM-dd"));
      setValue("time", format(parsedDate, "HH:mm"));
      setValue("locationOrUrl", existingInterview.interviewType === "ONLINE" ? existingInterview.interviewLink : (existingInterview.venue || ""));
      setValue("notes", existingInterview.adminNotes || "");
      setValue("timezone", existingInterview.timezone);
    }
  }, [existingInterview, setValue]);

  useEffect(() => {
    if (candidate && !isBulk) {
      setValue("candidateIds", [candidate.id]);
    }
  }, [candidate, isBulk, setValue]);

  const candidateOptions = candidates.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const { mutateAsync: scheduleInterview, isPending } = useCreateOrUpdateInterviewMutation();
  const { mutateAsync: updateStatus } = useUpdateInterviewStatusMutation();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: ScheduleInterviewFormValues) => {
    try {
      const scheduledAt = `${data.date}T${data.time}:00`;

      const payloadBase = {
        scheduledAt,
        timezone: data.timezone,
        interviewType: data.mode,
        interviewLink: data.mode === "ONLINE" ? data.locationOrUrl : "",
        venue: data.mode === "IN_PERSON" ? data.locationOrUrl : "",
        adminNotes: data.notes,
      };

      if (existingInterviewId && existingInterview) {
        await scheduleInterview({
          ...payloadBase,
          id: existingInterviewId,
          jobApplicationId: existingInterview.jobApplicationId,
        });
        await updateStatus({
          interviewId: existingInterviewId,
          status: "RESCHEDULED",
        });
        handleClose();
        return;
      }

      let ids = isBulk ? data.candidateIds : [];
      if (!isBulk && candidate) ids = [candidate.id];
      if (!isBulk && data.candidateIds?.length > 0) ids = data.candidateIds;

      if (ids.length === 0) return;

      const promises = ids.map((id) =>
        scheduleInterview({ ...payloadBase, jobApplicationId: id })
      );

      await Promise.all(promises);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <Dialog
  open={open}
  onClose={handleClose}
  size="md"
  title="Schedule Interview"
  hasCloseTrigger
>
  <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* MAIN CONTENT AREA (scrollable) */}
      <Box maxH="60vh" overflowY="auto" pr={2}>
        <Stack gap={4}>
          <Box p={3} bg="blue.50" borderRadius="md" mb={2}>
            <Text fontSize="sm" fontWeight="500" color="blue.700">
              {isBulk
                ? `Schedule a bulk interview for selected candidates.`
                : `Scheduling interview for ${candidate?.name}.`}
            </Text>
          </Box>

          {isBulk && (
            <MultiSelectFieldInput
              name="candidateIds"
              label="Select Candidates"
              options={candidateOptions}
              placeholder="Select candidates"
              required
            />
          )}

          <SelectFieldInput
            name="mode"
            label="Interview Mode"
            options={[
              { label: "Online", value: "ONLINE" },
              { label: "In-person", value: "IN_PERSON" },
            ]}
            required
          />

          <SelectFieldInput
            name="timezone"
            label="Timezone"
            options={[
              { label: "UTC", value: "UTC" },
              { label: "IST (India)", value: "IST" },
              { label: "PST (US Pacific)", value: "PST" },
              { label: "EST (US Eastern)", value: "EST" },
              { label: "GMT (London)", value: "GMT" },
            ]}
            required
          />

          <HStack gap={4}>
            <Field.Root required>
              <Field.Label>Interview Date</Field.Label>
              <Input type="date" {...register("date")} bg="white" />
            </Field.Root>

            <Field.Root required>
              <Field.Label>Interview Time</Field.Label>
              <Input type="time" {...register("time")} bg="white" />
            </Field.Root>
          </HStack>

          <Field.Root required>
            <Field.Label>
              {mode === "ONLINE"
                ? "Interview URL / Meeting Link"
                : "Location"}
            </Field.Label>
            <Input
              placeholder={
                mode === "ONLINE"
                  ? "https://meet.google.com/..."
                  : "Enter physical address..."
              }
              {...register("locationOrUrl")}
              bg="white"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Notes / Instructions</Field.Label>
            <Textarea
              placeholder="Any special instructions for the candidate..."
              {...register("notes")}
              bg="white"
              rows={3}
            />
          </Field.Root>
        </Stack>
      </Box>

      {/* FIXED FOOTER */}
      <Flex
        justify="flex-end"
        gap={3}
        mt={4}
        pt={4}
        borderTop="1px solid"
        borderColor="gray.200"
        bg="white"
        position="sticky"
        bottom={0}
      >
        <Button variant="outline" onClick={handleClose} type="button">
          Cancel
        </Button>

        <Button
          bg={WEBSITE_THEME_COLOR}
          color="white"
          _hover={{ bg: "green.700" }}
          type="submit"
          disabled={!isValid || isPending}
          loading={isPending}
        >
          Schedule
        </Button>
      </Flex>
    </form>
  </FormProvider>
</Dialog>
  );
}
