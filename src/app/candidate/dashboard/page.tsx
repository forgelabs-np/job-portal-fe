"use client";

import { VStack } from "@chakra-ui/react";
import CandidateDashboard from "./(components)/CandidateDashboard";

export default function CandidateDashboardPage() {
  return (
    <VStack align="stretch" gap={4}>
      <CandidateDashboard />
    </VStack>
  );
}
