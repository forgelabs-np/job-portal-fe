"use client";

import { Box, Flex, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useAuthStore } from "@/store";

export default function AgencyDashboardPage() {
  const { user } = useAuthStore();

  return (
    <Box>
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        gap={4}
        flexWrap="wrap"
      >
        <VStack align="flex-start" gap={2}>
          <Heading size="lg">Agency Dashboard</Heading>
          <Text fontSize="md" color="gray.600">
            Welcome back, {user?.name ?? "Agency user"}. Here you can manage
            your account and track your activity.
          </Text>
        </VStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        <Box p={6} bg="white" borderRadius="2xl" boxShadow="sm">
          <Text fontSize="sm" fontWeight="700" color="gray.500" mb={3}>
            Account status
          </Text>
          <Text fontSize="3xl" fontWeight="800" color="teal.600">
            Active
          </Text>
          <Text mt={3} color="gray.600">
            Your agency account is connected and ready to access dashboard
            features.
          </Text>
        </Box>

        <Box p={6} bg="white" borderRadius="2xl" boxShadow="sm">
          <Text fontSize="sm" fontWeight="700" color="gray.500" mb={3}>
            Last login
          </Text>
          <Text fontSize="3xl" fontWeight="800" color="gray.900">
            {new Date().toLocaleDateString()}
          </Text>
          <Text mt={3} color="gray.600">
            You are logged in with the agency portal. Use the sidebar to explore
            available actions.
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
