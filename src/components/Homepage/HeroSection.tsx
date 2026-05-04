"use client";

import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Box, Button, Flex, Text, Badge, Icon } from "@chakra-ui/react";

// Arrow up-right icon inline
const ArrowUpRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const TrendingUp = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default function HeroSection() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={{ base: 6, md: 10 }}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(ellipse at 60% 20%, #e8f5e9 0%, transparent 60%)"
        opacity={0.6}
        pointerEvents="none"
      />

      <Flex
        direction="column"
        align="center"
        textAlign="center"
        maxW="720px"
        gap={4}
        position="relative"
        zIndex={1}
      >
        <Badge
          display="inline-flex"
          alignItems="center"
          gap={1.5}
          px={4}
          py={2}
          borderRadius="full"
          border="1.5px solid"
          borderColor="#d1d5db"
          bg="green.50"
          color={WEBSITE_THEME_COLOR}
          fontSize="10px"
          fontWeight="600"
          letterSpacing="0.12em"
          textTransform="uppercase"
          boxShadow="0 1px 3px rgba(0,0,0,0.06)"
        >
          <Box color={WEBSITE_THEME_COLOR}>
            <TrendingUp />
          </Box>
          The Preferred Network for Global Placements
        </Badge>

        <Box lineHeight="1.05">
          <Text
            as="h1"
            fontWeight="800"
            fontSize={{ base: "52px", md: "80px", lg: "96px" }}
            color="#0f1f17"
            letterSpacing="-0.03em"
            lineHeight="1.0"
            mb={0}
          >
            International
            <br />
            recruitment
          </Text>
          <Text
            as="span"
            display="block"
            fontStyle="italic"
            fontWeight="400"
            fontSize={{ base: "52px", md: "80px", lg: "96px" }}
            color={WEBSITE_THEME_COLOR}
            letterSpacing="-0.02em"
            lineHeight="1.1"
          >
            simplified.
          </Text>
        </Box>

        <Text
          fontSize={{ base: "16px", md: "18px" }}
          color="#6b7280"
          maxW="480px"
          lineHeight="1.7"
          fontWeight="400"
        >
          A high-fidelity recruitment CRM designed for Nepalese agencies to
          scale, manage, and distribute talent with military-grade precision.
        </Text>

        <Flex gap={4} align="center" flexWrap="wrap" justify="center" mt={5}>
          <Button
            bg={WEBSITE_THEME_COLOR}
            color="white"
            px={8}
            py={6}
            borderRadius="full"
            fontSize="15px"
            fontWeight="700"
            letterSpacing="0.01em"
            display="inline-flex"
            alignItems="center"
            gap={2}
            _hover={{
              bg: "#14532d",
              transform: "translateY(-1px)",
              boxShadow: "0 8px 24px rgba(22, 101, 52, 0.3)",
            }}
            transition="all 0.2s ease"
            boxShadow="0 4px 14px rgba(22, 101, 52, 0.25)"
          >
            Start Free Trial
            <Box opacity={0.9}>
              <ArrowUpRight />
            </Box>
          </Button>

          <Button
            bg="white"
            color="#111827"
            px={8}
            py={6}
            borderRadius="full"
            fontSize="15px"
            fontWeight="600"
            border="1.5px solid"
            borderColor="#e5e7eb"
            _hover={{
              bg: "#f9fafb",
              borderColor: "#d1d5db",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            transition="all 0.2s ease"
            boxShadow="0 1px 4px rgba(0,0,0,0.06)"
          >
            Watch Demo
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
