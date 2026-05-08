import {
  Badge,
  Box,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  Grid,
  HStack,
  Text,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FiClock, FiFileText, FiMapPin, FiUsers } from "react-icons/fi";
import type { Job } from "./JobCard";

function ProvidedBadge({
  provided,
  details,
}: {
  provided: boolean;
  details?: string | null;
}) {
  return (
    <Box ml="auto" textAlign="right">
      <Badge
        colorPalette={provided ? "green" : "gray"}
        variant="subtle"
        borderRadius="full"
        px={2}
        py={0.5}
        fontSize="xs"
        fontWeight="semibold"
      >
        {provided ? "✓ Provided" : "✗ Not provided"}
      </Badge>
      {details && (
        <Text fontSize="xs" color="gray.500" mt={1}>
          {details}
        </Text>
      )}
    </Box>
  );
}

function SideStatRow({
  icon: IconComponent,
  label,
  value,
}: {
  icon: IconType;
  label: string;
  value: string;
}) {
  return (
    <HStack gap={3} mb={3}>
      <Box
        w="32px"
        h="32px"
        borderRadius="lg"
        bg="green.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        _dark={{ bg: "green.900" }}
      >
        <IconComponent size={20} color="var(--chakra-colors-red-700)" />
      </Box>
      <Box>
        <Text
          fontSize="10px"
          fontWeight="600"
          color="gray.400"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {label}
        </Text>
        <Text
          fontSize="sm"
          fontWeight="600"
          color="gray.800"
          _dark={{ color: "gray.100" }}
        >
          {value}
        </Text>
      </Box>
    </HStack>
  );
}

function InfoRow({
  label,
  value,
  node,
}: {
  label: string;
  value?: string;
  node?: React.ReactNode;
}) {
  return (
    <HStack
      justify="space-between"
      align="flex-start"
      py={3}
      borderBottom="1px solid"
      borderColor="gray.100"
      _dark={{ borderColor: "gray.700" }}
      gap={4}
    >
      <Text
        fontSize="sm"
        color="gray.500"
        fontWeight="500"
        flexShrink={0}
        minW="160px"
      >
        {label}
      </Text>
      {node ?? (
        <Text
          fontSize="sm"
          color="gray.800"
          fontWeight="500"
          textAlign="right"
          _dark={{ color: "gray.200" }}
        >
          {value || "—"}
        </Text>
      )}
    </HStack>
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

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={({ open }) => !open && onClose()}
      size="xl"
    >
      <DialogBackdrop />
      <DialogPositioner
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        inset="0"
      >
        <DialogContent
          maxH="88vh"
          display="flex"
          flexDirection="column"
          borderRadius="2xl"
          overflow="hidden"
        >
          {/* Header */}
          <DialogHeader
            px={8}
            pt={7}
            pb={5}
            borderBottom="1px solid"
            borderColor="gray.100"
            _dark={{ borderColor: "gray.700" }}
          >
            <HStack justify="space-between" align="flex-start" w="full" pr={8}>
              <Box>
                <DialogTitle
                  fontSize="2xl"
                  fontWeight="700"
                  fontFamily="Georgia, serif"
                  mb={1}
                >
                  {job.title}
                </DialogTitle>
                <HStack gap={2} fontSize="sm" color="gray.400" mt={1}>
                  <Text>
                    📍 {job.country.name}
                    {job.city ? ` · ${job.city}` : ""}
                  </Text>
                </HStack>
                <Box mt={2}>
                  <Badge
                    colorPalette={job.isOpen ? "green" : "gray"}
                    variant="subtle"
                    borderRadius="full"
                    px={3}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {job.isOpen ? "● Open" : "● Closed"}
                  </Badge>
                </Box>
              </Box>

              {/* <HStack gap={3} align="flex-start" flexShrink={0}>
                <Button variant="outline" size="sm" borderRadius="lg">
                  ☆ Save
                </Button>
                <Button
                  bg="green.700"
                  color="white"
                  size="sm"
                  borderRadius="lg"
                  _hover={{ bg: "green.800" }}
                >
                  Apply Now
                </Button>
              </HStack> */}
            </HStack>
            <DialogCloseTrigger />
          </DialogHeader>

          {/* Body */}
          <Box display="flex" flex="1" overflow="hidden">
            {/* Main column */}
            <Box
              flex="1"
              overflowY="auto"
              px={8}
              py={6}
              borderRight="1px solid"
              borderColor="gray.100"
              _dark={{ borderColor: "gray.700" }}
            >
              {/* Stat grid */}
              <Grid templateColumns="repeat(2, 1fr)" gap={3} mb={7}>
                {[
                  { label: "Total Slots", value: job.totalSlots },
                  { label: "Remaining", value: job.remainingSlots },
                  { label: "Gender", value: genderLabel },
                  {
                    label: "Contract",
                    value: job.contractDurationYears
                      ? `${job.contractDurationYears} yr${job.contractDurationYears > 1 ? "s" : ""}`
                      : "—",
                  },
                ].map(({ label, value }) => (
                  <Box
                    key={label}
                    border="1px solid"
                    borderColor="gray.100"
                    borderRadius="xl"
                    p={4}
                    bg="white"
                    _dark={{ borderColor: "gray.700", bg: "gray.800" }}
                  >
                    <Text
                      fontSize="10px"
                      fontWeight="700"
                      color="gray.400"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      mb={1}
                    >
                      {label}
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight="700"
                      color="gray.800"
                      _dark={{ color: "gray.100" }}
                    >
                      {value}
                    </Text>
                  </Box>
                ))}
              </Grid>

              {/* Terms & Conditions */}
              <Text
                fontSize="xs"
                fontWeight="700"
                color="green.700"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={1}
              >
                Terms & Conditions
              </Text>

              <Box>
                <InfoRow
                  label="Working Hours"
                  value={
                    job.workingHoursPerWeek
                      ? `${job.workingHoursPerWeek} hours / week`
                      : undefined
                  }
                />
                <InfoRow
                  label="Overtime Policy"
                  value={job.overtimePolicy ?? ""}
                />
                <InfoRow label="Leave Policy" value={job.leavePolicy ?? ""} />
                <InfoRow
                  label="Probation Period"
                  value={
                    job.probationPeriodMonths
                      ? `${job.probationPeriodMonths} month${job.probationPeriodMonths > 1 ? "s" : ""}`
                      : undefined
                  }
                />
                <InfoRow
                  label="Termination Clause"
                  value={job.terminationClause ?? ""}
                />
              </Box>

              {/* Benefits */}
              <Text
                fontSize="xs"
                fontWeight="700"
                color="green.700"
                textTransform="uppercase"
                letterSpacing="wider"
                mt={6}
                mb={1}
              >
                Benefits
              </Text>

              <Box>
                <InfoRow
                  label="Accommodation"
                  node={
                    <ProvidedBadge
                      provided={job.accommodationProvided}
                      details={job.accommodationDetails}
                    />
                  }
                />
                <InfoRow
                  label="Food"
                  node={
                    <ProvidedBadge
                      provided={job.foodProvided}
                      details={job.foodDetails}
                    />
                  }
                />
                <InfoRow
                  label="Transportation"
                  node={
                    <ProvidedBadge
                      provided={job.transportationProvided}
                      details={job.transportationDetails}
                    />
                  }
                />
                <InfoRow
                  label="Medical Insurance"
                  node={
                    <ProvidedBadge
                      provided={job.medicalInsuranceProvided}
                      details={job.medicalInsuranceDetails}
                    />
                  }
                />
                <InfoRow
                  label="Air Ticket"
                  node={
                    <ProvidedBadge
                      provided={job.airTicketProvided}
                      details={job.airTicketDetails}
                    />
                  }
                />
              </Box>
            </Box>

            {/* Sidebar */}
            <Box
              w="240px"
              flexShrink={0}
              overflowY="auto"
              px={5}
              py={6}
              bg="gray.50"
              _dark={{ bg: "gray.900" }}
            >
              <Box
                bg="green.50"
                borderRadius="xl"
                p={4}
                mb={5}
                _dark={{ bg: "green.900" }}
              >
                <Text
                  fontSize="12px"
                  fontWeight="600"
                  color="green.600"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  mb={1}
                >
                  Monthly Salary
                </Text>
                <Text
                  fontSize="2xl"
                  color="green.800"
                  fontWeight="400"
                  _dark={{ color: "green.200" }}
                >
                  {job.salaryCurrency} {job.salaryAmount.toLocaleString()}
                </Text>
              </Box>

              <Text
                fontSize="10px"
                fontWeight="700"
                color="gray.400"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={3}
              >
                Job Details
              </Text>

              <SideStatRow
                icon={FiClock}
                label="Working Hours"
                value={
                  job.workingHoursPerWeek
                    ? `${job.workingHoursPerWeek} hrs/week`
                    : "—"
                }
              />
              <SideStatRow icon={FiUsers} label="Gender" value={genderLabel} />
              <SideStatRow
                icon={FiMapPin}
                label="Location"
                value={`${job.country.name}${job.city ? ` · ${job.city}` : ""}`}
              />
              <SideStatRow
                icon={FiFileText}
                label="Contract"
                value={
                  job.contractDurationYears
                    ? `${job.contractDurationYears} year${job.contractDurationYears > 1 ? "s" : ""}`
                    : "—"
                }
              />

              {job.preferredNationalities?.length > 0 && (
                <>
                  <Box
                    h="1px"
                    bg="gray.200"
                    my={4}
                    _dark={{ bg: "gray.700" }}
                  />
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    color="gray.400"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    mb={3}
                  >
                    Preferred Nationalities
                  </Text>
                  <HStack flexWrap="wrap" gap={2}>
                    {job.preferredNationalities.map((n) => (
                      <Badge
                        key={n}
                        variant="subtle"
                        colorPalette="gray"
                        borderRadius="full"
                        px={2}
                        fontSize="xs"
                      >
                        {n}
                      </Badge>
                    ))}
                  </HStack>
                </>
              )}
            </Box>
          </Box>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
