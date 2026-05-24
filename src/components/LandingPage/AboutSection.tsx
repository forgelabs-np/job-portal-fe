"use client";

import { Box, Flex, Text, Container, Stack } from "@chakra-ui/react";
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
  py={{ base: 14, md: 20, lg: 24 }}
>
  <Container
    maxW="1300px"
    px={{ base: 5, sm: 6, md: 8, lg: 4 }}
  >
    <Flex
      direction={{ base: "column", lg: "row" }}
      gap={{ base: 10, md: 14, lg: 20 }}
      align={{ base: "flex-start", lg: "center" }}
    >
      {/* Left column */}
      <MotionBox
        flex={1}
        w="full"
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
          mb={{ base: 4, md: 5 }}
        >
          <Text
            fontSize="2xs"
            fontWeight="800"
            color={colors.white}
            textTransform="uppercase"
          >
            About Us
          </Text>
        </Flex>

        {/* Mobile + Tablet heading */}
        <Text
          fontFamily={fonts.heading}
          fontSize={{
            base: "3xl",
            sm: "4xl",
            md: "5xl",
          }}
          fontWeight="800"
          color={colors.text}
          lineHeight={{ base: 1.2, md: 1.15 }}
          display={{ base: "flex", lg: "none" }}
          mb={{ base: 4, md: 5 }}
        >
          Helping Nepali people work at home and abroad
        </Text>

        {/* Desktop heading */}
        <Stack
          display={{ base: "none", lg: "flex" }}
          gap={0}
          mb={5}
        >
          <Text
            fontFamily={fonts.heading}
            fontSize={{ lg: "5xl" }}
            fontWeight="800"
            color={colors.text}
            lineHeight={1.2}
          >
            Helping Nepali
          </Text>

          <Text
            fontFamily={fonts.heading}
            fontSize={{ lg: "5xl" }}
            fontWeight="800"
            color={colors.text}
            lineHeight={1.2}
          >
            people work at home
          </Text>

          <Text
            fontFamily={fonts.heading}
            fontSize={{ lg: "5xl" }}
            fontWeight="800"
            color={colors.text}
            lineHeight={1.2}
          >
            and abroad
          </Text>
        </Stack>

        <Text
          fontSize={{ base: "sm", md: "md" }}
          color={colors.text}
          fontFamily={fonts.body}
          lineHeight={{ base: 1.8, md: 1.9 }}
          maxW={{ base: "100%", md: "500px" }}
        >
          Interpid is a trusted manpower company in Nepal. We guide workers step
          by step, giving simple, safe, and fast service for job placement in
          Nepal and other countries.
        </Text>
      </MotionBox>

      {/* Right column — features */}
      <Box flex={1} w="full">
        <Flex direction="column" gap={{ base: 5, md: 6 }}>
          {features.map((feature, i) => (
            <MotionBox
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Flex
                gap={{ base: 3, md: 4 }}
                align="flex-start"
              >
                <Box
                  flexShrink={0}
                  mt={0.5}
                >
                  <CheckCircle2
                    size={20}
                    color={"green"}
                    fill="rgba(23, 212, 42, 0.1)"
                  />
                </Box>

                <Box>
                  <Text
                    fontWeight="700"
                    fontSize={{ base: "sm", md: "md" }}
                    color={colors.text}
                    mb={1.5}
                  >
                    {feature.title}
                  </Text>

                  <Text
                    fontSize={{ base: "sm", md: "sm" }}
                    color={colors.textMuted}
                    lineHeight={{ base: 1.7, md: 1.8 }}
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