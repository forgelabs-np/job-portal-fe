"use client";

import { useGetJobs } from "@/api/job";
import { Button } from "@/shared";
import React, { useState } from "react";
import AddorEditJob from "./AddorEditJob";
import {
  Box,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Job, JobCard } from "./JobCard";
import { JobModal } from "./JobModal";
import { WEBSITE_THEME_COLOR } from "@/constants/color";

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
  const { data, isLoading } = useGetJobs();
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
        <Button bg={WEBSITE_THEME_COLOR} onClick={onOpen}>
          Add Jobs
        </Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, "2xl": 3 }} gap={3}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
          : data?.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onView={setSelectedJob}
                onEdit={() => handleJobEdit(job.id)}
                onDelete={(j) => console.log("delete", j.id)}
              />
            ))}
      </SimpleGrid>

      <JobModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
      <AddorEditJob
        onClose={onClose}
        open={open}
        id={selectedJobId}
        resetId={setSelectedJobId}
      />
    </>
  );
};

export default JobList;
