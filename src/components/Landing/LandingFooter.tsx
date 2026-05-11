"use client";

import { landingColors } from "@/components/Landing/landingTheme";
import { ROUTES } from "@/constants/routes";
import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Solutions", href: "#solutions" },
      { label: "Careers", href: ROUTES.SIGNUP },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Agency Login", href: ROUTES.LOGIN },
      { label: "Register", href: ROUTES.SIGNUP },
      { label: "Opportunities", href: "/opportunities" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Compliance", href: "#" },
    ],
  },
] as const;

export function LandingFooter() {
  const [email, setEmail] = useState("");

  return (
    <Box
      id="contact"
      as="footer"
      borderTop="1px solid"
      borderColor={landingColors.border}
      bg="#020202"
      pt={{ base: 14, md: 20 }}
      pb={10}
      px={{ base: 4, md: 8 }}
    >
      <Box maxW="1280px" mx="auto">
        <Grid
          templateColumns={{ base: "1fr", md: "1.2fr 2fr" }}
          gap={{ base: 12, md: 16 }}
          mb={14}
        >
          <Box>
            <Flex align="baseline" gap={1} mb={4}>
              <Text fontWeight="800" fontSize="xl" color={landingColors.text}>
                Global
              </Text>
              <Text fontWeight="600" fontSize="xl" color={landingColors.gold}>
                Talent
              </Text>
            </Flex>
            <Text fontSize="sm" color={landingColors.textMuted} lineHeight="1.8" maxW="320px">
              Infrastructure for agencies and candidates operating across borders — secure,
              measurable, and built for velocity.
            </Text>
          </Box>

          <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={10}>
            {columns.map((col) => (
              <Box key={col.title}>
                <Text
                  fontSize="xs"
                  letterSpacing="0.2em"
                  fontWeight="700"
                  color={landingColors.gold}
                  mb={4}
                >
                  {col.title}
                </Text>
                <Flex direction="column" gap={2}>
                  {col.links.map((l) => (
                    <Link key={l.label} href={l.href} style={{ textDecoration: "none" }}>
                      <Text
                        fontSize="sm"
                        color={landingColors.textMuted}
                        _hover={{ color: landingColors.text }}
                        transition="color 0.2s"
                      >
                        {l.label}
                      </Text>
                    </Link>
                  ))}
                </Flex>
              </Box>
            ))}
          </Grid>
        </Grid>

        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "flex-end" }}
          justify="space-between"
          gap={8}
          borderTop="1px solid"
          borderColor={landingColors.border}
          pt={10}
        >
          <Box maxW="400px">
            <Text fontWeight="700" color={landingColors.text} mb={3}>
              Stay Updated
            </Text>
            <Flex gap={2}>
              <Input
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg={landingColors.card}
                borderColor={landingColors.border}
                color={landingColors.text}
                borderRadius="lg"
                _placeholder={{ color: landingColors.textMuted }}
                _focus={{
                  borderColor: landingColors.gold,
                  boxShadow: `0 0 0 1px ${landingColors.goldMuted}`,
                }}
              />
              <Button
                bg={landingColors.gold}
                color="#0a0a0a"
                borderRadius="lg"
                px={4}
                fontWeight="800"
                aria-label="Submit email"
                _hover={{ bg: landingColors.goldBright }}
              >
                →
              </Button>
            </Flex>
          </Box>

          <Flex gap={4} align="center" justify={{ base: "flex-start", md: "flex-end" }}>
            {["in", "tw", "yt"].map((id) => (
              <Box
                key={id}
                w="40px"
                h="40px"
                borderRadius="full"
                border="1px solid"
                borderColor={landingColors.border}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color={landingColors.textMuted}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  borderColor: landingColors.gold,
                  color: landingColors.gold,
                }}
                fontSize="xs"
                fontWeight="800"
              >
                {id}
              </Box>
            ))}
          </Flex>
        </Flex>

        <Text mt={10} fontSize="xs" color={landingColors.textMuted} textAlign="center">
          © {new Date().getFullYear()} Global Talent. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}
