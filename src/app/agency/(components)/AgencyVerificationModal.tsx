"use client";

import { useCreateAgencyProfile } from "@/api/agency";
import { Button, Dialog, FormProvider, TextFieldInput } from "@/shared";
import { useAuthStore } from "@/store";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface AgencyVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface AgencyProfileForm {
  companyName: string;
  companyDescription: string;
  companyWebsite: string;
  companyLogoUrl: string;
  companyAddress: string;
  companyPhone: string;
  registrationNumber: string;
  taxId: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
}

export const AgencyVerificationModal = ({
  isOpen,
  onClose,
  onSuccess,
}: AgencyVerificationModalProps) => {
  const methods = useForm<AgencyProfileForm>();
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  const { mutate: createProfile, isPending } = useCreateAgencyProfile();

  const onSubmit = (data: AgencyProfileForm) => {
    createProfile(
      { data },
      {
        onSuccess: () => {
          onSuccess();
          onClose();
        },
      },
    );
  };

  return (
    <Dialog
      title="Complete Your Agency Profile"
      open={isOpen}
      onClose={onClose}
      hasCloseTrigger={false}
      size="xl"
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box display="flex" flexDirection="column" maxH="70vh">
          <Box overflowY="auto" flex={1} px={1} pb={2}>
            <VStack gap={4} align="stretch">
              <Text fontSize="sm" color="gray.600">
                To access the dashboard, please complete your agency profile
                information. This information will be reviewed by our
                administrators.
              </Text>

              <Flex gap={4}>
                <TextFieldInput
                  name="companyName"
                  label="Company Name"
                  placeholder="Enter company name"
                  required
                />
                <TextFieldInput
                  name="companyWebsite"
                  label="Company Website"
                  placeholder="https://example.com"
                />
              </Flex>

              <TextFieldInput
                name="companyDescription"
                label="Company Description"
                placeholder="Brief description of your company"
                required
              />

              <Flex gap={4}>
                <TextFieldInput
                  name="companyAddress"
                  label="Company Address"
                  placeholder="Full company address"
                  required
                />
                <TextFieldInput
                  name="companyPhone"
                  label="Company Phone"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </Flex>

              <Flex gap={4}>
                <TextFieldInput
                  name="registrationNumber"
                  label="Registration Number"
                  placeholder="Company registration number"
                  required
                />
                <TextFieldInput
                  name="taxId"
                  label="Tax ID"
                  placeholder="Tax identification number"
                  required
                />
              </Flex>

              <Text fontSize="md" fontWeight="semibold">
                Contact Person Information
              </Text>

              <Flex gap={4}>
                <TextFieldInput
                  name="contactPersonName"
                  label="Contact Person Name"
                  placeholder="Full name"
                  required
                />
                <TextFieldInput
                  name="contactPersonEmail"
                  label="Contact Person Email"
                  placeholder="email@company.com"
                  required
                />
              </Flex>

              <TextFieldInput
                name="contactPersonPhone"
                label="Contact Person Phone"
                placeholder="+1 (555) 123-4567"
                required
              />

              <TextFieldInput
                name="companyLogoUrl"
                label="Company Logo URL"
                placeholder="https://example.com/logo.png"
              />
            </VStack>
          </Box>

          <Flex
            justify="flex-end"
            gap={3}
            pt={4}
            mt={2}
            borderTop="1px solid"
            borderColor="gray.200"
            flexShrink={0}
          >
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isPending}
            >
              Back
            </Button>
            <Button
              type="submit"
              loading={isPending}
              bg="#0d6944"
              _hover={{ bg: "#0a5535" }}
            >
              Submit for Verification
            </Button>
          </Flex>
        </Box>
      </FormProvider>
    </Dialog>
  );
};
