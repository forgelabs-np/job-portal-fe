"use client";

import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { AdminInterviewList } from "../(components)/AdminInterviewList";

const ScheduledInterviewsPage = () => {
  return (
    <Stack gap={6}>
      <Box>
        <Text fontWeight="bold" fontSize="2xl">
          Scheduled Interviews
        </Text>
        <Text fontSize="sm" color="gray.500">
          Manage all scheduled interviews, update their results, and monitor their status.
        </Text>
      </Box>

      <AdminInterviewList />
    </Stack>
  );
};

export default ScheduledInterviewsPage;
