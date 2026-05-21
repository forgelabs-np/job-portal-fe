"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  Container,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import { colors, fonts, radii } from "./theme";
import { BannerImage } from "@/assets/images/landing";

const MotionBox = motion(Box);

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HeroSection() {
  return (
    <Box
      bg={colors.bg}
      position="relative"
      overflow="hidden"
      // pt={{ base: 10, sm: 12, md: 16 }}
      // pb={{ base: 10, md: 0 }}
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="-120px"
        right="-120px"
        w={{ base: "260px", sm: "340px", md: "600px" }}
        h={{ base: "260px", sm: "340px", md: "600px" }}
        borderRadius="full"
        bg={colors.bgWarm}
        zIndex={0}
        opacity={0.9}
      />

      <Container
        maxW="1400px"
        position="relative"
        zIndex={1}
        px={{ base: 4, sm: 6, lg: 8 }}
      >
        <Flex
          direction={{ base: "column", md: "column", lg: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 10, md: 12, lg: 8 }}
          minH={{ lg: "720px" }}
        >
          {/* LEFT CONTENT */}
          <MotionBox
            flex="1"
            w="full"
            maxW={{ base: "100%", lg: "620px" }}
            variants={stagger}
            initial="hidden"
            animate="visible"
            textAlign={{ base: "center", lg: "left" }}
            pt={{ base: 2, md: 4 }}
          >
            {/* Rating Badge */}
            <MotionBox
              variants={fadeUp}
              mb={{ base: 5, md: 6 }}
              display="flex"
              justifyContent={{ base: "center", lg: "flex-start" }}
            >
              <Flex
                align="center"
                gap={2}
                bg={colors.white}
                px={{ base: 3, md: 4 }}
                py={2}
                borderRadius={radii.full}
                border="1px solid"
                borderColor={colors.border}
                boxShadow="0 4px 14px rgba(0,0,0,0.06)"
                flexWrap="wrap"
              >
                <Flex gap={0.5}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={colors.gold}
                      color={colors.gold}
                    />
                  ))}
                </Flex>

                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="600"
                  color={colors.text}
                >
                  (4.9/5) Trusted by 10,000+ workers
                </Text>
              </Flex>
            </MotionBox>

            {/* HEADING */}
            <MotionBox variants={fadeUp} mb={{ base: 5, md: 3 }}>
              <Text
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "5xl" }}
                fontWeight="900"
                color={colors.text}
                lineHeight={1.1}
                letterSpacing="-0.02em"
              >
                Nepal's #1 Manpower &{" "}
                <Text as="span" display="block">
                  Job Consultancy to
                </Text>

                <Text
                  as="span"
                  display="block"
                  color={colors.gold}
                  fontStyle="italic"
                >
                  Build The Future.
                </Text>
              </Text>
            </MotionBox>

            {/* SUBTEXT */}
            <MotionBox variants={fadeUp} mb={{ base: 7, md: 8 }}>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={colors.textMuted}
                fontFamily={fonts.body}
                lineHeight={1.7}
                maxW="480px"
              >
                We help Nepali people find safe and trusted jobs in Nepal
                and abroad with fast processing, transparent recruitment,
                and complete worker support.
              </Text>
            </MotionBox>

            {/* SEARCH BAR */}
            <MotionBox
              variants={fadeUp}
              w="full"
              maxW={{ base: "100%", lg: "620px" }}
            >
              <Flex
                direction={{ base: "column", md: "row" }}
                bg={colors.white}
                border="1px solid"
                borderColor={colors.border}
                borderRadius={{ base: "2xl", md: radii.sm }}
                overflow="hidden"
                boxShadow="0 10px 30px rgba(0,0,0,0.08)"
                p={{ base: 3, md: 2 }}
                gap={{ base: 3, md: 0 }}
              >
                {/* Search Input */}
                <Box flex={1}>
                  <Input
                    placeholder="Enter job titles"
                    border="none"
                    bg="transparent"
                    h={{ base: "52px", md: "58px" }}
                    fontSize={{ base: "sm", md: "md" }}
                    fontFamily={fonts.body}
                    color={colors.text}
                    px={4}
                    _placeholder={{
                      color: colors.textLight,
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}
                  />
                </Box>

                {/* Divider */}
                <Box
                  w="1px"
                  bg={colors.border}
                  my={3}
                  display={{ base: "none", md: "block" }}
                />

                {/* Country Selector */}
                <Flex
                  align="center"
                  justify={{ base: "space-between", md: "center" }}
                  px={{ base: 4, md: 5 }}
                  minW={{ md: "180px" }}
                  h={{ base: "52px", md: "58px" }}
                  borderRadius={{ base: "xl", md: "0" }}
                  bg={{ base: colors.bgWarm, md: "transparent" }}
                  cursor="pointer"
                  _hover={{
                    bg: colors.bgWarm,
                  }}
                  transition="0.2s ease"
                >
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="500"
                    color={colors.textMuted}
                  >
                    All Countries
                  </Text>

                  <Text
                    color={colors.textLight}
                    fontSize="xs"
                  >
                    ▾
                  </Text>
                </Flex>

                {/* Search Button */}
                <Button
                  bg={colors.gold}
                  color={colors.white}
                  fontWeight="700"
                  fontSize={{ base: "sm", md: "md" }}
                  h={{ base: "52px", md: "58px" }}
                  px={{ base: 6, md: 8 }}
                  borderRadius={{ base: "xl", md: "14px" }}
                  _hover={{
                    bg: colors.goldLight,
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.2s ease"
                  gap={2}
                  w={{ base: "full", md: "auto" }}
                  flexShrink={0}
                >
                  <Search size={18} />
                  Search Job
                </Button>
              </Flex>
            </MotionBox>
          </MotionBox>

          {/* RIGHT IMAGE */}
          <MotionBox
            w="full"
            maxW={{
              base: "100%",
              sm: "500px",
              md: "620px",
              lg: "580px",
              xl: "640px",
            }}
            flexShrink={0}
            position="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            mt={{ base: 2, md: 0 }}
          >
            <Box
              position="relative"
              overflow="hidden"
              borderTopRadius={{
                base: "2xl",
                md: "3xl",
              }}
              borderBottomRadius={{
                base: "2xl",
                md: "0",
              }}
            >
              <Image
                src={BannerImage.src}
                alt="Banner Image"
                w="full"
                h={{
                  base: "320px",
                  sm: "420px",
                  md: "520px",
                  lg: "640px",
                }}
                objectFit="contain"
                objectPosition="bottom"
                draggable={false}
              />
            </Box>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
}