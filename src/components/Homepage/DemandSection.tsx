"use client";

import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Box, Flex, Grid, Text, Button, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const CheckCircleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const highlights = [
  "Direct Document Portal Links",
  "Automated Staff KPI Tracking",
  "Secure Multi-role Access",
];

export default function DemandSection() {
  return (
    <Box
      bg="#FDFDFE"
      py={{ base: 16, md: 24 }}
      px={{ base: 6, md: 12, lg: 20 }}
    >
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={{ base: 12, md: 16 }}
        alignItems="center"
      >
        <Box position="relative" display="inline-block">
          <Box
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="0 8px 40px rgba(0,0,0,0.12)"
            lineHeight="0"
          >
            <Image
              src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80"
              alt="Field grass representing growth"
              width="100%"
              height={{ base: "300px", md: "420px" }}
              objectFit="cover"
              display="block"
            />
          </Box>

          <MotionBox
            as={motion.div}
            position="absolute"
            bottom="24px"
            right="-12px"
            bg={WEBSITE_THEME_COLOR}
            color="white"
            px={6}
            py={4}
            borderRadius="xl"
            boxShadow="0 8px 24px rgba(22, 101, 52, 0.35)"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          >
            <Text
              fontFamily="'Georgia', serif"
              fontWeight="700"
              fontSize="18px"
              letterSpacing="-0.01em"
            >
              +40% Efficiency
            </Text>
          </MotionBox>
        </Box>

        <Flex direction="column" gap={6}>
          <Text
            fontFamily="'Georgia', serif"
            fontSize="11px"
            fontWeight="700"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color={WEBSITE_THEME_COLOR}
          >
            Automated Success
          </Text>

          <Box lineHeight="1.1">
            <Text
              as="h2"
              fontFamily="'Georgia', 'Times New Roman', serif"
              fontWeight="800"
              fontSize={{ base: "36px", md: "48px" }}
              color="#0f1f17"
              letterSpacing="-0.03em"
              lineHeight="1.1"
              mb={0}
            >
              Designed for teams
            </Text>
            <Text
              as="span"
              display="block"
              fontStyle="italic"
              fontWeight="400"
              fontSize={{ base: "36px", md: "48px" }}
              color={WEBSITE_THEME_COLOR}
              letterSpacing="-0.02em"
              lineHeight="1.2"
            >
              who demand the best.
            </Text>
          </Box>

          <Text
            fontFamily="'Georgia', serif"
            fontSize="16px"
            color="#6b7280"
            lineHeight="1.75"
            maxW="460px"
          >
            Our interface is optimized for high-speed data entry and validation.
            Spend less time on spreadsheets and more time closing international
            deals.
          </Text>

          <Flex direction="column" gap={3}>
            {highlights.map((item) => (
              <Flex key={item} align="center" gap={3}>
                <Box color={WEBSITE_THEME_COLOR} flexShrink={0}>
                  <CheckCircleIcon />
                </Box>
                <Text
                  fontFamily="'Georgia', serif"
                  fontWeight="700"
                  fontSize="15px"
                  color="#0f1f17"
                  letterSpacing="-0.01em"
                >
                  {item}
                </Text>
              </Flex>
            ))}
          </Flex>

          <Box mt={2}>
            <Button
              bg={WEBSITE_THEME_COLOR}
              color="white"
              px={8}
              py={6}
              borderRadius="full"
              fontSize="15px"
              fontWeight="700"
              fontFamily="'Georgia', serif"
              _hover={{
                bg: "#14532d",
                transform: "translateY(-1px)",
                boxShadow: "0 8px 24px rgba(22, 101, 52, 0.3)",
              }}
              transition="all 0.2s ease"
              boxShadow="0 4px 14px rgba(22, 101, 52, 0.25)"
            >
              Discover More
            </Button>
          </Box>
        </Flex>
      </Grid>
    </Box>
  );
}
