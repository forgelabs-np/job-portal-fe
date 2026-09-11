"use client";

import React, { useEffect } from "react";
import {
  Button,
  Flex,
  Grid,
  Text,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
} from "@chakra-ui/react";
import { FormProvider, TextFieldInput } from "@/shared";
import { Textarea } from "@/shared/components/form/textarea/Textarea";
import { SelectFieldInput } from "@/shared/ui/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { leadFormSchema, type LeadFormValues } from "@/schema/lead";
import { useUpdateLeadMutation, type Lead, LeadSubject } from "@/api/leads";
import { BRAND_COLORS, WEBSITE_THEME_COLOR } from "@/constants/color";

const SUBJECT_OPTIONS = [
  { label: "Consultation", value: LeadSubject.CONSULTATION },
  { label: "Partnership", value: LeadSubject.PARTNERSHIP },
  { label: "Feedback", value: LeadSubject.FEEDBACK },
  { label: "General Inquiry", value: LeadSubject.GENERAL_INQUIRY },
  { label: "Support", value: LeadSubject.SUPPORT },
];

interface EditLeadModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditLeadModal({
  lead,
  isOpen,
  onClose,
}: EditLeadModalProps) {
  const updateMutation = useUpdateLeadMutation();

  const methods = useForm<LeadFormValues>({
    resolver: yupResolver(leadFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      location: "",
      subject: "",
      description: "",
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (lead && isOpen) {
      reset({
        fullName: lead.fullName,
        phoneNumber: lead.phoneNumber,
        email: lead.email,
        location: lead.location,
        subject: lead.subject,
        description: lead.description,
      });
    }
  }, [lead, isOpen, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: LeadFormValues) => {
    if (!lead) return;
    updateMutation.mutate(
      {
        id: lead.id,
        payload: {
          data: {
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            location: data.location,
            subject: data.subject as LeadSubject,
            description: data.description,
          },
        },
      },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  if (!lead) return null;

  return (
    <DialogRoot open={isOpen} onOpenChange={(details) => { if (!details.open) handleClose(); }} size="lg">
      <DialogBackdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <DialogPositioner>
        <DialogContent
          maxH="90vh"
          display="flex"
          flexDirection="column"
          borderRadius="2xl"
          overflow="hidden"
          mx={4}
          maxW={{ base: "95vw", md: "700px" }}
        >
          {/* Fixed Header */}
          <DialogHeader
            px={6}
            pt={5}
            pb={4}
            borderBottom="1px solid"
            borderColor="gray.100"
            flexShrink={0}
          >
            <Flex justify="space-between" align="center" pr={8}>
              <Text fontWeight="700" fontSize="lg" color="gray.900">
                Edit Lead
              </Text>
            </Flex>
            <DialogCloseTrigger />
          </DialogHeader>

          {/* Scrollable Body */}
          <DialogBody
            px={6}
            py={5}
            flex={1}
            overflowY="auto"
          >
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <Flex direction="column" gap={4}>
                <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
                  <TextFieldInput
                    name="fullName"
                    label="Full Name"
                    required
                    placeholder="Enter full name"
                  />
                  <TextFieldInput
                    name="phoneNumber"
                    label="Phone Number"
                    required
                    placeholder="98XXXXXXXX"
                  />
                </Grid>

                <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
                  <TextFieldInput
                    name="email"
                    label="Email"
                    type="email"
                    required
                    placeholder="email@example.com"
                  />
                  <TextFieldInput
                    name="location"
                    label="Location"
                    required
                    placeholder="City, Country"
                  />
                </Grid>

                <SelectFieldInput
                  name="subject"
                  label="Subject"
                  options={SUBJECT_OPTIONS}
                  placeholder="Select a subject"
                  required
                />

                <Textarea
                  name="description"
                  label="Description"
                  required
                  placeholder="Enter description"
                  rows={5}
                />
              </Flex>

              {/* Fixed Footer inside form */}
              <Flex
                justify="flex-end"
                gap={3}
                mt={6}
                pt={4}
                borderTop="1px solid"
                borderColor="gray.100"
              >
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={updateMutation.isPending}
                  borderRadius="lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  bg={WEBSITE_THEME_COLOR}
                  color="white"
                  _hover={{ bg: BRAND_COLORS[700] }}
                  loading={updateMutation.isPending}
                  loadingText="Saving..."
                  minW="130px"
                  borderRadius="lg"
                >
                  Save Changes
                </Button>
              </Flex>
            </FormProvider>
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
