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

import { Job, JobCard } from "@/app/job/(components)/JobCard";
import { JobModal } from "@/app/job/(components)/JobModal";
import { useGetCandidateJobs } from "@/api/candidate-api";
// import CandidateApplyModal from "./CandidateApplyModal";
import PageNoData from "@/shared/ui/NoDataAvailable/PageNoData";
import CandidateApplyModal from "./CandidateApplyModal";

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
      </HStack>
    </Box>
  );
}

const CandidateJobList = () => {
  const { data, isLoading } = useGetCandidateJobs();
  const { onClose, onOpen, open } = useDisclosure();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<number>();

  const handleApply = (id: number) => {
    setSelectedJobId(id);
    onOpen();
  };

  return (
    <>
      <HStack justify="space-between" mb={8}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Available Jobs
        </Text>
      </HStack>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, "2xl": 4 }} gap={4}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
        ) : !data || data.length === 0 ? (
          <Box gridColumn="1 / -1">
            <PageNoData
              title="No jobs found"
              description="There are currently no jobs available. Check back later!"
            />
          </Box>
        ) : (
          data.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onView={setSelectedJob}
              onEdit={() => { }}
              onDelete={() => { }}
              onApply={() => handleApply(job.id)}
              onAssign={() => { }}
            />
          ))
        )}
      </SimpleGrid>

      <JobModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
      <CandidateApplyModal
        jobId={Number(selectedJobId)}
        onClose={onClose}
        open={open}
      />
    </>
  );
};

export default CandidateJobList;
