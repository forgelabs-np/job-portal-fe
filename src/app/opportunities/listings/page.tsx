"use client";
import { Box, Text, VStack } from "@chakra-ui/react";

export default function ActiveListingsPage() {
  return (
    <VStack align="stretch" gap={4}>
      <Text fontSize="2xl" fontWeight="bold" color="gray.900">
        Active Listings
      </Text>
      <Box bg="white" p={6} borderRadius="lg" borderTop="1px solid" borderColor="gray.200">
        <Text color="gray.600">Active listings management coming soon...</Text>
      </Box>
    </VStack>
  );
}
