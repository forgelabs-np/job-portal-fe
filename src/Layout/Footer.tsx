"use client";

import { WEBSITE_THEME_COLOR } from "@/constants/color";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";

export const GlobeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const footerLinks = [
  {
    label: "Solutions",
    links: ["Agencies", "Recruiters"],
  },
  {
    label: "Company",
    links: ["About Us", "Careers"],
  },
  {
    label: "Legal",
    links: ["Privacy", "Terms"],
  },
];

export default function Footer() {
  return (
    <Box borderTop="1px solid #6e0000" borderColor="#e5e7eb">
      <Box
        maxW="1280px"
        mx="auto"
        px={{ base: 6, md: 12 }}
        py={{ base: 14, md: 20 }}
      >
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr 1fr" }}
          gap={{ base: 10, md: 6 }}
        >
          <Box>
            <Flex align="center" gap={3} mb={5}>
              <Box
                w="38px"
                h="38px"
                bg={WEBSITE_THEME_COLOR}
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <GlobeIcon />
              </Box>
              <Text
                fontWeight="800"
                fontSize="24px"
                color="#0f1f17"
                letterSpacing="-0.02em"
              >
                NexuFlow
              </Text>
            </Flex>

            <Text
              fontSize="15px"
              fontWeight="500"
              color="#7e848f"
              lineHeight="1.7"
              maxW="280px"
            >
              The most sophisticated manpower distribution CRM for elite
              agencies.
            </Text>
          </Box>

          {footerLinks.map((col) => (
            <Box key={col.label}>
              <Text
                fontSize="11px"
                fontWeight="700"
                letterSpacing="0.14em"
                textTransform="uppercase"
                color="#374151"
                mb={5}
              >
                {col.label}
              </Text>
              <Flex direction="column" gap={4}>
                {col.links.map((link) => (
                  <Text
                    key={link}
                    as="a"
                    fontSize="15px"
                    color="#6b7280"
                    fontWeight="500"
                    _hover={{ color: "#166534", textDecoration: "none" }}
                    transition="color 0.15s ease"
                    cursor="pointer"
                  >
                    {link}
                  </Text>
                ))}
              </Flex>
            </Box>
          ))}
        </Grid>
      </Box>

      <Box borderTop="1px solid" borderColor="#e5e7eb">
        <Flex
          maxW="1280px"
          mx="auto"
          px={{ base: 6, md: 10, lg: 12 }}
          py={5}
          justify="space-between"
          align="center"
          flexWrap="wrap"
          gap={3}
        >
          <Text
            fontSize="10px"
            fontWeight="600"
            letterSpacing="0.14em"
            textTransform="uppercase"
            color="#c4c9d0"
          >
            © 2026 NexuFlow Global. All Rights Reserved.
          </Text>

          <Flex gap={8}>
            {["Instagram", "Facebook"].map((social) => (
              <Text
                key={social}
                as="a"
                fontSize="10px"
                fontWeight="600"
                letterSpacing="0.14em"
                textTransform="uppercase"
                color="#c4c9d0"
                _hover={{ color: "#166534", textDecoration: "none" }}
                transition="color 0.15s ease"
                cursor="pointer"
              >
                {social}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
