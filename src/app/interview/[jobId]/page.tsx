"use client";

import React, { use } from 'react';
import { useGetJobsById } from '@/api/job';
import { Box, HStack, Text, Spinner, Stack } from '@chakra-ui/react';
import { InterviewCandidatesTable } from './(components)/InterviewCandidatesTable';
import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';
import { MdArrowBack } from 'react-icons/md';
import { WEBSITE_THEME_COLOR } from '@/constants/color';

interface InterviewJobPageProps {
  params: Promise<{ jobId: string }>;
}

const InterviewJobPage = ({ params }: InterviewJobPageProps) => {
  const router = useRouter();
  const { jobId } = use(params);
  
  const { data: job, isLoading } = useGetJobsById(Number(jobId));

  if (isLoading) {
    return (
      <Box p={8} display="flex" justifyContent="center">
        <Spinner size="xl" color={WEBSITE_THEME_COLOR} />
      </Box>
    );
  }

  return (
    <Stack gap={6}>
      <HStack gap={4}>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <MdArrowBack /> Back
        </Button>
        <Box>
          <Text fontWeight="bold" fontSize="2xl">
            {job?.title} - Shortlisted Candidates
          </Text>
          <Text fontSize="sm" color="gray.500">
            Job ID #{jobId} | {job?.country?.name} {job?.city ? `- ${job.city}` : ''}
          </Text>
        </Box>
      </HStack>

      <Box bg="white" p={5} borderRadius="xl" border="1px solid" borderColor="gray.200">
        <InterviewCandidatesTable jobDemandId={jobId} />
      </Box>
    </Stack>
  );
};

export default InterviewJobPage;
