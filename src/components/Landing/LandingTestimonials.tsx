"use client";

import { landingColors } from "@/components/Landing/landingTheme";
import { MotionSection } from "@/components/Landing/MotionSection";
import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const quotes = [
  {
    quote:
      "Global Talent collapsed our time-to-fill across three regions while keeping compliance airtight.",
    name: "Priya Nair",
    role: "COO · Meridian Workforce",
  },
  {
    quote:
      "The agency portal feels like a command deck — analytics, messaging, and placements in one motion.",
    name: "Daniel Okonkwo",
    role: "Managing Partner · Atlas Mobility",
  },
  {
    quote:
      "We finally have a single surface candidates trust and recruiters live inside every day.",
    name: "Elena Rossi",
    role: "Head of Talent · EuroLink Partners",
  },
] as const;

export function LandingTestimonials() {
  return (
    <MotionSection as="section" py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }}>
      <Box maxW="1280px" mx="auto">
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="800"
          color={landingColors.text}
          textAlign="center"
          mb={3}
        >
          Global Success
        </Text>
        <Text textAlign="center" color={landingColors.textMuted} mb={14} maxW="520px" mx="auto">
          Teams shipping at frontier scale rely on the same operating rhythm.
        </Text>

        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          {quotes.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{ flex: 1 }}
            >
              <Box
                h="full"
                bg={landingColors.card}
                border="1px solid"
                borderColor={landingColors.border}
                borderRadius="2xl"
                p={8}
                display="flex"
                flexDirection="column"
                _hover={{
                  borderColor: landingColors.gold,
                  boxShadow: `0 20px 50px rgba(0,0,0,0.45)`,
                }}
                transition="all 0.3s ease"
              >
                <Text color={landingColors.text} lineHeight="1.75" fontSize="sm" flex={1} mb={8}>
                  “{q.quote}”
                </Text>
                <Flex align="center" gap={3}>
                  <Box
                    w="44px"
                    h="44px"
                    borderRadius="full"
                    bg={`linear-gradient(135deg, ${landingColors.gold} 0%, #5c4a12 100%)`}
                    border="2px solid"
                    borderColor={landingColors.border}
                  />
                  <Box>
                    <Text fontWeight="700" color={landingColors.text} fontSize="sm">
                      {q.name}
                    </Text>
                    <Text fontSize="xs" color={landingColors.gold} fontWeight="600">
                      {q.role}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </motion.div>
          ))}
        </Flex>
      </Box>
    </MotionSection>
  );
}
