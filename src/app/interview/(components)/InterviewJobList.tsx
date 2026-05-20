"use client";

import { useGetJobs } from "@/api/job";
import React, { useState } from "react";
import PageNoData from "@/shared/ui/NoDataAvailable/PageNoData";
import {
  Box,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
import { InterviewJobCard } from "./InterviewJobCard";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { useRouter } from "next/navigation";

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
        <Skeleton height="32px" width="100%" borderRadius="md" />
      </HStack>
    </Box>
  );
}

const InterviewJobList = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState("");
  const pageSize = 6;

  const { data, isLoading } = useGetJobs({
    page: page,
    size: pageSize,
    status: status || undefined,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleViewCandidates = (jobId: number) => {
    router.push(`/interview/${jobId}`);
  };

  return (
    <Stack gap={6}>
      <HStack justify="space-between">
        <Text fontWeight="bold" fontSize="xl">
          Interview - Select a Job
        </Text>
        <HStack gap={4}>
          <NativeSelect.Root w="200px">
            <NativeSelect.Field
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(0);
              }}
              bg="white"
            >
              <option value="">All Status</option>
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </HStack>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, "2xl": 3 }} gap={3}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
        ) : !data?.content || data.content.length === 0 ? (
          <Box gridColumn="1 / -1">
            <PageNoData title="No jobs found" description="There are currently no jobs matching your criteria." />
          </Box>
        ) : (
          data.content.map((job) => (
            <InterviewJobCard
              key={job.id}
              job={job}
              onViewCandidates={handleViewCandidates}
            />
          ))
        )}
      </SimpleGrid>

      {!isLoading && data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      )}
    </Stack>
  );
};

export default InterviewJobList;
