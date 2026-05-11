"use client";

import { VStack } from "@chakra-ui/react";
import AgencyDashboard from "./(components)/AgencyDashboard";

export default function AgencyDashboardPage() {
  return (
    <VStack align="stretch" gap={4}>
      <AgencyDashboard />
    </VStack>
  );
}
