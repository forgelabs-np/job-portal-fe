"use client";

import { Button } from "@/shared";
import React, { useState } from "react";
import {
  Box,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Job, JobCard } from "@/app/job/(components)/JobCard";
import { JobModal } from "@/app/job/(components)/JobModal";
import { useGetAgencyJobs } from "@/api/agency-jobs";
import ApplyCandidateModal from "./ApplyJobModal";
import PageNoData from "@/shared/ui/NoDataAvailable/PageNoData";

export const jobsDummyResponse = {
  success: true,
  message: "Jobs fetched successfully",
  responseCode: 0,

  data: {
    content: [
      {
        id: 1,

        title: "Welder",

        country: {
          id: 101,
          name: "Qatar",
          code: "QA",
          currencyCode: "QAR",
          currencySymbol: "﷼",
          isEnabled: true,
          createdAt: "2026-05-07T21:08:26.495Z",
          updatedAt: "2026-05-07T21:08:26.495Z",
        },

        city: "Doha",

        description:
          "Experienced welders required for industrial construction projects.",

        requirements:
          "Must have MIG/TIG welding experience and valid certification.",

        totalSlots: 50,
        filledSlots: 18,
        remainingSlots: 32,
        appliedCount: 25,

        status: "OPEN",
        isOpen: true,

        salaryAmount: 3200,
        salaryCurrency: "QAR",
        salaryPeriod: "MONTHLY",

        genderPreference: "MALE",

        preferredNationalities: ["Nepali", "Indian", "Bangladeshi"],

        minExperienceYears: 2,
        maxExperienceYears: 6,

        requiredSkills: "MIG Welding, TIG Welding, Blueprint Reading",

        educationLevel: "High School",

        workingHoursPerWeek: 48,

        contractDurationYears: 2,

        overtimePolicy:
          "Overtime paid after 8 hours/day as per Qatar labor law.",

        accommodationProvided: true,
        accommodationDetails:
          "Shared company accommodation provided free of cost.",

        foodProvided: true,
        foodDetails: "Lunch and dinner provided during working days.",

        transportationProvided: true,
        transportationDetails:
          "Daily transportation between camp and site included.",

        medicalInsuranceProvided: true,
        medicalInsuranceDetails: "Basic medical insurance included.",

        airTicketProvided: true,
        airTicketDetails:
          "Round-trip air ticket provided after contract completion.",

        leavePolicy: "21 paid leave days annually.",

        probationPeriodMonths: 3,

        terminationClause: "Termination based on labor law and company policy.",

        additionalBenefits: "Performance bonus and annual salary increment.",

        deadline: "2026-06-15T00:00:00.000Z",

        createdAt: "2026-05-07T21:08:26.495Z",
        updatedAt: "2026-05-07T21:08:26.495Z",

        createdBy: 12,
      },

      {
        id: 2,

        title: "Construction Helper",

        country: {
          id: 102,
          name: "UAE",
          code: "AE",
          currencyCode: "AED",
          currencySymbol: "د.إ",
          isEnabled: true,
          createdAt: "2026-05-07T21:08:26.495Z",
          updatedAt: "2026-05-07T21:08:26.495Z",
        },

        city: "Dubai",

        description: "Helpers required for residential construction sites.",

        requirements: "Physically fit and able to work outdoors.",

        totalSlots: 80,
        filledSlots: 40,
        remainingSlots: 40,
        appliedCount: 52,

        status: "OPEN",
        isOpen: true,

        salaryAmount: 1800,
        salaryCurrency: "AED",
        salaryPeriod: "MONTHLY",

        genderPreference: "ANY",

        preferredNationalities: ["Nepali", "Sri Lankan"],

        minExperienceYears: 0,
        maxExperienceYears: 2,

        requiredSkills: "Material Handling, Teamwork",

        educationLevel: "Basic Education",

        workingHoursPerWeek: 54,

        contractDurationYears: 2,

        overtimePolicy: "Paid overtime available.",

        accommodationProvided: true,
        accommodationDetails: "Accommodation with utilities included.",

        foodProvided: false,
        foodDetails: "",

        transportationProvided: true,
        transportationDetails: "Bus transportation available.",

        medicalInsuranceProvided: true,
        medicalInsuranceDetails: "Company-sponsored health insurance.",

        airTicketProvided: true,
        airTicketDetails: "Joining air ticket included.",

        leavePolicy: "30 days paid leave after 2 years.",

        probationPeriodMonths: 6,

        terminationClause: "As per UAE labor regulations.",

        additionalBenefits: "Free uniform and safety equipment.",

        deadline: "2026-07-01T00:00:00.000Z",

        createdAt: "2026-05-07T21:08:26.495Z",
        updatedAt: "2026-05-07T21:08:26.495Z",

        createdBy: 15,
      },
    ],
  },
};

function JobCardSkeleton() {
  return (
    <Box
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.100"
      _dark={{ borderColor: "gray.700", bg: "gray.800" }}
      p={5}
      display="flex"
      flexDirection="column"
      gap={3}
      bg="white"
    >
      <HStack justify="space-between">
        <Skeleton height="20px" width="55%" borderRadius="md" />
        <Skeleton height="20px" width="25%" borderRadius="full" />
      </HStack>

      <HStack gap={3}>
        <Skeleton height="14px" width="30%" borderRadius="md" />
        <Skeleton height="14px" width="25%" borderRadius="md" />
      </HStack>

      <SkeletonText noOfLines={3} gap={2} />

      <HStack justify="flex-end" gap={2} mt={1}>
        <Skeleton height="32px" width="64px" borderRadius="md" />
        <Skeleton height="32px" width="64px" borderRadius="md" />
        <Skeleton height="32px" width="64px" borderRadius="md" />
      </HStack>
    </Box>
  );
}

const JobList = () => {
  const { data, isLoading } = useGetAgencyJobs();
  const { onClose, onOpen, open } = useDisclosure();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<number>();

  const handleJobEdit = (id: number) => {
    setSelectedJobId(id);
    onOpen();
  };

  return (
    <>
      <HStack justify="space-between" mb={8}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Jobs
        </Text>
      </HStack>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, "2xl": 4 }} gap={4}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
        ) : !data || data.length === 0 ? (
          <Box gridColumn="1 / -1">
            <PageNoData title="No jobs found" description="There are currently no jobs available." />
          </Box>
        ) : (
          data.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onView={setSelectedJob}
              onEdit={() => handleJobEdit(job.id)}
              onDelete={(j) => console.log("delete", j.id)}
              onApply={() => handleJobEdit(job.id)}
            />
          ))
        )}
      </SimpleGrid>

      <JobModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
      <ApplyCandidateModal
        id={Number(selectedJobId)}
        onClose={onClose}
        open={open}
      />
    </>
  );
};

export default JobList;
