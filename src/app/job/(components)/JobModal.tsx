import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogCloseTrigger,
  DialogBody,
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  Badge,
  Box,
  Text,
  HStack,
  Grid,
  DialogBackdrop,
  DialogPositioner,
} from "@chakra-ui/react";
import type { Job } from "./JobCard";

function ProvidedBadge({
  provided,
  details,
}: {
  provided: boolean;
  details?: string | null;
}) {
  return (
    <HStack gap={2} mb={2}>
      <Badge colorPalette={provided ? "green" : "gray"} variant="subtle">
        {provided ? "✓ Provided" : "✗ Not provided"}
      </Badge>
      {details && (
        <Text fontSize="sm" color="gray.500">
          {details}
        </Text>
      )}
    </HStack>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={3}
      _dark={{ borderColor: "gray.700" }}
    >
      <Text
        fontSize="xs"
        fontWeight="medium"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="wider"
        mb={1}
      >
        {label}
      </Text>
      <Text fontWeight="semibold">{value}</Text>
    </Box>
  );
}

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobModal({ job, isOpen, onClose }: JobModalProps) {
  if (!job) return null;

  const genderLabel =
    job.genderPreference === "ANY"
      ? "Any"
      : job.genderPreference.charAt(0) +
        job.genderPreference.slice(1).toLowerCase();

  const accordionItems = [
    {
      label: "Contract Duration",
      content: job.contractDurationYears
        ? `${job.contractDurationYears} year${job.contractDurationYears > 1 ? "s" : ""}`
        : "Not specified",
    },
    {
      label: "Working Hours",
      content: job.workingHoursPerWeek
        ? `${job.workingHoursPerWeek} hours/week`
        : "Not specified",
    },
    {
      label: "Overtime Policy",
      content: job.overtimePolicy || "Not specified",
    },
    {
      label: "Accommodation",
      node: (
        <ProvidedBadge
          provided={job.accommodationProvided}
          details={job.accommodationDetails}
        />
      ),
    },
    {
      label: "Food",
      node: (
        <ProvidedBadge provided={job.foodProvided} details={job.foodDetails} />
      ),
    },
    {
      label: "Transportation",
      node: (
        <ProvidedBadge
          provided={job.transportationProvided}
          details={job.transportationDetails}
        />
      ),
    },
    {
      label: "Medical Insurance",
      node: (
        <ProvidedBadge
          provided={job.medicalInsuranceProvided}
          details={job.medicalInsuranceDetails}
        />
      ),
    },
    {
      label: "Air Ticket",
      node: (
        <ProvidedBadge
          provided={job.airTicketProvided}
          details={job.airTicketDetails}
        />
      ),
    },
    { label: "Leave Policy", content: job.leavePolicy || "Not specified" },
    {
      label: "Probation Period",
      content: job.probationPeriodMonths
        ? `${job.probationPeriodMonths} month${job.probationPeriodMonths > 1 ? "s" : ""}`
        : "Not specified",
    },
    {
      label: "Termination Clause",
      content: job.terminationClause || "Not specified",
    },
  ];

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={({ open }) => !open && onClose()}
      size="lg"
    >
      <DialogBackdrop />

      <DialogPositioner
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
      >
        <DialogContent maxH="85vh" display="flex" flexDirection="column">
          <DialogHeader>
            <HStack justify="space-between" align="flex-start" w="full" pr={8}>
              <Box>
                <DialogTitle fontSize="xl">{job.title}</DialogTitle>
                <Text fontSize="sm" color="green.600" mt={1}>
                  {job.country.name}
                  {job.city ? ` · ${job.city}` : ""}
                </Text>
              </Box>

              <Badge
                colorPalette={job.isOpen ? "green" : "gray"}
                variant="subtle"
                borderRadius="full"
                px={3}
              >
                {job.status.charAt(0) + job.status.slice(1).toLowerCase()}
              </Badge>
            </HStack>

            <DialogCloseTrigger />
          </DialogHeader>

          <DialogBody flex="1" overflowY="auto" pb={6}>
            <Grid templateColumns="repeat(4, 1fr)" gap={2} mb={4}>
              <StatBox label="Total" value={job.totalSlots} />
              <StatBox label="Remaining" value={job.remainingSlots} />
              <StatBox
                label="Salary"
                value={`${job.salaryCurrency} ${job.salaryAmount.toLocaleString()}`}
              />
              <StatBox label="Gender" value={genderLabel} />
            </Grid>

            {job.preferredNationalities?.length > 0 && (
              <Text fontSize="sm" color="gray.500" mb={4}>
                Nationality preference:{" "}
                <Text as="span" color="gray.800" _dark={{ color: "gray.100" }}>
                  {job.preferredNationalities.join(", ")}
                </Text>
              </Text>
            )}

            <Text fontSize="sm" fontWeight="semibold" color="green.600" mb={2}>
              Terms & Conditions
            </Text>

            <AccordionRoot multiple variant="enclosed">
              {accordionItems.map((item) => (
                <AccordionItem key={item.label} value={item.label}>
                  <AccordionItemTrigger fontSize="sm" fontWeight="medium">
                    {item.label}
                  </AccordionItemTrigger>
                  <AccordionItemContent mb={2}>
                    {item.node ?? (
                      <Text fontSize="sm" color="gray.500">
                        {item.content}
                      </Text>
                    )}
                  </AccordionItemContent>
                </AccordionItem>
              ))}
            </AccordionRoot>
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
