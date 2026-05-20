import React from "react";
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
} from "@chakra-ui/react";
import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { DialogCloseTrigger, DialogContent } from "@/shared";
import { MultiSelectFieldInput } from "@/shared/ui/MultiSelectFieldInput";
import { SelectFieldInput } from "@/shared/ui/Select";
import { useCreateOrUpdateInterviewMutation } from "@/api/admin-interview";

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
}: ScheduleInterviewModalProps) {
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

  const { reset, watch, register, handleSubmit, formState: { isValid } } = methods;
  const mode = watch("mode");

  const candidateOptions = candidates.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const { mutateAsync: scheduleInterview, isPending } = useCreateOrUpdateInterviewMutation();
  // const toast = useToast();

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

    const ids = isBulk
      ? data.candidateIds
      : candidate
      ? [candidate.id]
      : [];

    if (ids.length === 0) return;

    const promises = ids.map(id =>
      scheduleInterview({ ...payloadBase, jobApplicationId: id })
    );

    await Promise.all(promises);
    handleClose();
  } catch (err) {
    // handle error
  }
};

  return (
    <DialogRoot open={open} onOpenChange={handleClose} size="md">
      <DialogContent bg="white">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogBody>
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
                    <Input type="date" {...register("date", { required: true })} bg="white" />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Interview Time</Field.Label>
                    <Input type="time" {...register("time", { required: true })} bg="white" />
                  </Field.Root>
                </HStack>

                <Field.Root required>
                  <Field.Label>
                    {mode === "ONLINE" ? "Interview URL / Meeting Link" : "Location"}
                  </Field.Label>
                  <Input
                    placeholder={
                      mode === "ONLINE"
                        ? "https://meet.google.com/..."
                        : "Enter physical address..."
                    }
                    {...register("locationOrUrl", { required: true })}
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
            </DialogBody>
            <DialogFooter>
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
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </DialogRoot>
  );
}
