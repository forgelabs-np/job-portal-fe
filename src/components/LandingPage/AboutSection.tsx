"use client";

import { Box, Flex, Text, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { colors, fonts, radii } from "./theme";

const MotionBox = motion(Box);

const features = [
  {
    title: "Safe & Trusted Licensed Agency",
    description:
      "We are a government licensed manpower company in Nepal. Every step is legal, safe, and fully transparent for workers and employers.",
  },
  {
    title: "Fast & Easy Job Process",
    description:
      "Our team makes the process simple and quick. From applying to departure, we guide workers step by step.",
  },
  {
    title: "Global Network of Employers",
    description:
      "We partner with many trusted companies worldwide. This gives Nepali workers more choices and better opportunities.",
  },
];

export function AboutSection() {
  return (
    <Box
      as="section"
      id="about"
      bg={colors.bg}
      py={{ base: 16, md: 24 }}
    >
      <Container maxW="1280px">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 12, md: 20 }}
          align={{ base: "flex-start", md: "center" }}
        >
          {/* Left column */}
          <MotionBox
            flex={1}
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Flex
              display="inline-flex"
              align="center"
              bg={colors.gold}
              px={3}
              py={1}
              borderRadius={radii.sm}
              mb={5}
            >
              <Text
                fontSize="2xs"
                fontWeight="800"
                color={colors.white}
                fontFamily={fonts.body}
                letterSpacing="widest"
                textTransform="uppercase"
              >
                About Us
              </Text>
            </Flex>

            <Text
              fontFamily={fonts.heading}
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="800"
              color={colors.text}
              lineHeight={1.2}
              mb={5}
            >
              Helping Nepali people work at home and abroad
            </Text>

            <Text
              fontSize="sm"
              color={colors.textMuted}
              fontFamily={fonts.body}
              lineHeight={1.8}
              maxW="400px"
            >
              Interpid is a trusted manpower company in Nepal. We guide workers step by
              step, giving simple, safe, and fast service for job placement in Nepal and
              other countries.
            </Text>

            {/* Image below text on mobile */}
            <Box
              mt={8}
              borderRadius={radii.xl}
              overflow="hidden"
              display={{ base: "block", md: "none" }}
              h="220px"
            >
              <Box
                as="img"
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt="Team working"
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>
          </MotionBox>

          {/* Right column — features */}
          <Box flex={1}>
            <Flex direction="column" gap={6}>
              {features.map((feature, i) => (
                <MotionBox
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Flex gap={3} align="flex-start">
                    <Box flexShrink={0} mt={0.5}>
                      <CheckCircle2 size={20} color={colors.gold} fill="rgba(212,160,23,0.1)" />
                    </Box>
                    <Box>
                      <Text
                        fontFamily={fonts.heading}
                        fontWeight="700"
                        fontSize="md"
                        color={colors.text}
                        mb={1.5}
                      >
                        {feature.title}
                      </Text>
                      <Text
                        fontSize="sm"
                        color={colors.textMuted}
                        fontFamily={fonts.body}
                        lineHeight={1.75}
                      >
                        {feature.description}
                      </Text>
                    </Box>
                  </Flex>
                </MotionBox>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}