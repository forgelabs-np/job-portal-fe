"use client";
import { VStack } from "@chakra-ui/react";
import Dashboard from "./(components)/Dashboard";

export default function OpportunitiesPage() {
  return (
    <VStack align="stretch" gap={4}>
      <Dashboard />
    </VStack>
  );
}
