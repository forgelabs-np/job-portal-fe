import { AgencyDocumentType, REQUIRED_DOCUMENTS } from "@/api/agency";
import { Button, TextFieldInput } from "@/shared";
import {
  Box,
  Flex,
  HStack,
  Input,
  Steps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { AgencyProfileForm } from "./AgencyVerificationModal";

interface AgencyVerificationFormProps {
  activeStep: number;
  methods: UseFormReturn<AgencyProfileForm>;
  documents: Record<AgencyDocumentType, File | null>;
  setDocuments: React.Dispatch<
    React.SetStateAction<Record<AgencyDocumentType, File | null>>
  >;
  onSubmit: (data: AgencyProfileForm) => void;
  onUploadDocuments: () => Promise<void>;
  onPrevious: () => void;
  isBusy: boolean;
  handleLogout: () => void;
}

export const AgencyVerificationForm = ({
  activeStep,
  methods,
  documents,
  setDocuments,
  onSubmit,
  onUploadDocuments,
  onPrevious,
  isBusy,
  handleLogout
}: AgencyVerificationFormProps) => {

  return (
    <>
      <Steps.Root step={activeStep} count={2} mb={4} px={1} flexShrink={0}>
        <Steps.List>
          <Steps.Item index={0} title="Profile">
            <Steps.Indicator />
            <Box>
              <Steps.Title>Profile Details</Steps.Title>
              <Steps.Description>
                Complete agency profile information
              </Steps.Description>
            </Box>
            <Steps.Separator />
          </Steps.Item>
          <Steps.Item index={1} title="Documents">
            <Steps.Indicator />
            <Box>
              <Steps.Title>Upload Documents</Steps.Title>
              <Steps.Description>
                Upload all required verification files
              </Steps.Description>
            </Box>
            <Steps.Separator />
          </Steps.Item>
        </Steps.List>
      </Steps.Root>

      <Box display="flex" flexDirection="column" flex={1} minH={0} overflow="hidden">
        {activeStep === 0 ? (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minHeight: 0,
              }}
            >
              <Box flex={1} overflowY="auto" px={1} pb={4}>
                <VStack gap={4} align="stretch">
                  <Text fontSize="sm" color="gray.600">
                    To access the dashboard, please complete your agency profile
                    information first.
                  </Text>

                  <Flex gap={4} direction={{ base: "column", md: "row" }}>
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

                  <Flex gap={4} direction={{ base: "column", md: "row" }}>
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

                  <Flex gap={4} direction={{ base: "column", md: "row" }}>
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

                  <Box pt={2}>
                    <Text fontWeight="bold" mb={3} fontSize="md">
                      Contact Person Information
                    </Text>
                    <VStack gap={4} align="stretch">
                      <Flex gap={4} direction={{ base: "column", md: "row" }}>
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
                        placeholder="Contact phone number"
                        required
                      />
                    </VStack>
                  </Box>
                </VStack>
              </Box>

              <Flex
                justify="flex-end"
                gap={3}
                pt={4}
                pb={1}
                borderTop="1px solid"
                borderColor="gray.100"
                bg="white"
              >
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  disabled={isBusy}
                >
                  Back
                </Button>
                <Button
                  bg="#0d6944"
                  _hover={{ bg: "#0a5535" }}
                  type="submit"
                  loading={isBusy}
                >
                  Save Profile & Continue
                </Button>
              </Flex>
            </form>
          </FormProvider>
        ) : (
          <Box display="flex" flexDirection="column" flex={1} minH={0}>
            <Box flex={1} overflowY="auto" px={1} pb={4}>
              <VStack gap={6} align="stretch">
                <Text fontSize="sm" color="gray.600">
                  Please upload clear copies of the following documents to verify
                  your agency.
                </Text>

                <VStack gap={5} align="stretch">
                  {REQUIRED_DOCUMENTS.map((doc) => (
                    <Box key={doc.type}>
                      <Text fontSize="sm" fontWeight="semibold" mb={2}>
                        {doc.label}{" "}
                        <Text as="span" color="red.500">
                          *
                        </Text>
                      </Text>
                      <Input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setDocuments((prev) => ({ ...prev, [doc.type]: file }));
                        }}
                        p={1}
                        height="auto"
                        fontSize="sm"
                        borderColor="gray.200"
                        _hover={{ borderColor: "green.500" }}
                      />

                    </Box>
                  ))}
                </VStack>
              </VStack>
            </Box>

            <Flex
              justify="space-between"
              align="center"
              pt={4}
              pb={1}
              borderTop="1px solid"
              borderColor="gray.100"
              bg="white"
            >
              <Button variant="outline" onClick={handleLogout} disabled={isBusy}>
                Logout
              </Button>
              <HStack>
                <Button variant="outline" onClick={onPrevious} disabled={isBusy}>
                  Previous
                </Button>
                <Button
                  bg="#0d6944"
                  _hover={{ bg: "#0a5535" }}
                  onClick={onUploadDocuments}
                  loading={isBusy}
                  disabled={!Object.values(documents).every((doc) => doc !== null)}
                >
                  Submit Documents
                </Button>
              </HStack>
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
};
