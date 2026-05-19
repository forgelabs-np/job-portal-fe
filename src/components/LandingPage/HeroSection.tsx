"use client";

import { Box, Flex, Text, Button, Input, Container, Badge, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Search, Star, Users, Globe } from "lucide-react";
import { colors, fonts, radii } from "./theme";
import { BannerImage } from "@/assets/images/landing";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroSection() {
  return (
    <Box
      bg={colors.bg}
      pt={{ base: 12, md: 16 }}
      pb={{ base: 0, md: 0 }}
      overflow="hidden"
      position="relative"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="0"
        right="0"
        w={{ base: "300px", md: "600px" }}
        h={{ base: "300px", md: "600px" }}
        borderRadius="full"
        bg={colors.bgWarm}
        style={{ transform: "translate(30%, -30%)" }}
        zIndex={0}
      />

      <Container maxW="1400px" position="relative" zIndex={1}>
        <Flex
          align={{ base: "center", md: "flex-end" }}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 8, md: 4 }}
          minH={{ base: "auto", md: "560px" }}
        >
          {/* Left content */}
          <MotionBox
            flex={1}
            pb={{ base: 8, md: 16 }}
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Rating badge */}
            <MotionBox variants={fadeUp} mb={5}>
              <Flex
                align="center"
                gap={2}
                display="inline-flex"
                bg={colors.white}
                px={3}
                py={1.5}
                borderRadius={radii.full}
                border="1px solid"
                borderColor={colors.border}
                boxShadow="0 2px 8px rgba(0,0,0,0.06)"
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
                <Text fontSize="xs" fontWeight="600" color={colors.text} fontFamily={fonts.body}>
                  (4.9/5) Trusted by 10,000+ workers
                </Text>
              </Flex>
            </MotionBox>

            {/* Heading */}
            <MotionBox variants={fadeUp} mb={5}>
              <Text
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
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

            {/* Subtext */}
            <MotionBox variants={fadeUp} mb={8}>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={colors.textMuted}
                fontFamily={fonts.body}
                lineHeight={1.7}
                maxW="480px"
              >
                We help Nepali people find safe and good jobs in Nepal and abroad.
                Fast process, trusted service, and full support for workers.
              </Text>
            </MotionBox>

            {/* Search bar */}
            <MotionBox variants={fadeUp} w={"xl"}>
              <Flex
                bg={colors.white}
                border="1px solid"
                borderColor={colors.border}
                borderRadius={radii.md}
                overflow="hidden"
                boxShadow="0 4px 24px rgba(0,0,0,0.08)"
                direction={{ base: "column", sm: "row" }}
                pt={2}
              >
                <Box flex={1} position="relative" >
                  <Input
                    placeholder="Enter job titles"
                    border="none"
                    outline="none"
                    // h="52px"
                    pl={4}
                    fontSize="sm"
                    fontFamily={fonts.body}
                    color={colors.text}
                    bg="transparent"
                    _placeholder={{ color: colors.textLight }}
                    _focus={{ boxShadow: "none", outline: "none" }}
                  />
                </Box>
                <Box
                  w="1px"
                  bg={colors.border}
                  display={{ base: "none", sm: "block" }}
                  my={4}
                />
                <Flex
                  align="center"
                  px={3}
                  gap={1}
                  cursor="pointer"
                  h={{ base: "auto", sm: "52px" }}
                  py={{ base: 2, sm: 0 }}
                  borderTop={{ base: "1px solid", sm: "none" }}
                  borderColor={colors.border}
                  _hover={{ bg: colors.bgWarm }}
                  transition="background 0.2s"
                >
                  <Text fontSize="sm" fontFamily={fonts.body} color={colors.textMuted} fontWeight="500">
                    All Countries
                  </Text>
                  <Text color={colors.textLight} fontSize="xs">▾</Text>
                </Flex>
                <Box px={2} py={2} display="flex" alignItems="center">
                  <Button
                    bg={colors.gold}
                    color={colors.white}
                    fontFamily={fonts.body}
                    fontWeight="700"
                    fontSize="sm"
                    px={2}
                    h="36px"
                    borderRadius="8px"
                    _hover={{ bg: colors.goldLight }}
                    transition="all 0.2s"
                    gap={2}
                    w={{ base: "full", sm: "auto" }}
                  >
                    <Search size={15} />
                    Search Job
                  </Button>
                </Box>
              </Flex>
            </MotionBox>
          </MotionBox>

          {/* Right — hero image area */}
          <MotionBox
            flex={{ base: "none", md: "0 0 580px" }}
            w={{ base: "full", md: "580px" }}
            position="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Hero image placeholder */}
            <Box
              position="relative"
              h={{ base: "360px", md: "480px" }}
              borderTopRadius={{ base: "2xl", md: "3xl" }}
              overflow="hidden"
            >
              {/* Circular bg behind figure */}
              {/* <Box
                position="absolute"
                bottom="0"
                left="50%"
                style={{ transform: "translateX(-50%)" }}
                w="380px"
                h="380px"
                borderRadius="full"
                bg={colors.bgWarm}
                zIndex={0}
              /> */}
             <Image src={BannerImage.src} alt="Banner Image"/>

              {/* Floating card — 10k+ satisfied */}
              {/* <MotionBox
                position="absolute"
                top="20px"
                right="0"
                bg={colors.white}
                borderRadius={radii.lg}
                p={3}
                boxShadow="0 8px 32px rgba(0,0,0,0.12)"
                zIndex={10}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Flex align="center" gap={2}>
                  <Box
                    w="36px"
                    h="36px"
                    borderRadius="md"
                    bg={colors.bgWarm}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Users size={18} color={colors.crimson} />
                  </Box>
                  <Box>
                    <Text fontWeight="800" fontSize="sm" color={colors.text} fontFamily={fonts.heading}>
                      10,000+
                    </Text>
                    <Text fontSize="2xs" color={colors.textMuted} fontFamily={fonts.body}>
                      Satisfied Employee
                    </Text>
                  </Box>
                </Flex>
              </MotionBox> */}

              {/* Floating card — 200+ global partners */}
              {/* <MotionBox
                position="absolute"
                bottom="40px"
                left="0"
                bg={colors.white}
                borderRadius={radii.lg}
                p={3}
                boxShadow="0 8px 32px rgba(0,0,0,0.12)"
                zIndex={10}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Flex align="center" gap={2}>
                  <Box
                    w="36px"
                    h="36px"
                    borderRadius="md"
                    bg="rgba(212,160,23,0.1)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Globe size={18} color={colors.gold} />
                  </Box>
                  <Box>
                    <Text fontWeight="800" fontSize="sm" color={colors.text} fontFamily={fonts.heading}>
                      200+ Global Partners
                    </Text>
                    <Text fontSize="2xs" color={colors.textMuted} fontFamily={fonts.body}>
                      Companies hiring from Nepal
                    </Text>
                  </Box>
                </Flex>
              </MotionBox> */}
            </Box>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
}