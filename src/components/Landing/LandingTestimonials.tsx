"use client";

import { useState, useEffect, useRef } from "react";
import { landingColors } from "@/components/Landing/landingTheme";
import { MotionSection } from "@/components/Landing/MotionSection";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Avatar } from "@/shared";

const quotes = [
  {
    quote:
      "Global Talent collapsed our time-to-fill across three regions while keeping compliance airtight.",
    name: "Priya Nair",
    role: "COO",
    company: "Meridian Workforce",
  },
  {
    quote:
      "The agency portal feels like a command deck — analytics, messaging, and placements in one motion.",
    name: "Daniel Okonkwo",
    role: "Managing Partner",
    company: "Atlas Mobility",
  },
  {
    quote:
      "We finally have a single surface candidates trust and recruiters live inside every day.",
    name: "Elena Rossi",
    role: "Head of Talent",
    company: "EuroLink Partners",
  },

] as const;

export function LandingTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % quotes.length);
  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + quotes.length) % quotes.length);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    }
  };

  const current = quotes[activeIndex];

  return (
    <MotionSection
      as="section"
      py={{ base: 16, md: 24 }}
      px={{ base: 4, md: 8 }}
      overflow="hidden"
    >
      <Box maxW="1280px" mx="auto">
        {/* Section heading */}
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="800"
          color={landingColors.text}
          textAlign="center"
          mb={3}
        >
          Testimonials
        </Text>
        <Text
          textAlign="center"
          color={landingColors.textMuted}
          mb={14}
          maxW="520px"
          mx="auto"
        >
          What our clients say about us
        </Text>

        {/* ── Testimonial card ── */}
        <Box
          ref={containerRef}
          position="relative"
          onMouseMove={handleMouseMove}
          bg={landingColors.card}
          border="1px solid"
          borderColor={landingColors.border}
          borderRadius="2xl"
          p={{ base: 8, md: 12 }}
          overflow="hidden"
        >
          {/* Oversized index number */}
          <motion.div
            style={{
              x: numberX,
              y: numberY,
              position: "absolute",
              left: "1rem",
              top: "40%",
              transform: "translateY(-50%)",
              fontSize: "20rem",
              fontWeight: 800,
              color: landingColors.text,
              opacity: 0.03,
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
              letterSpacing: "-0.05em",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "block" }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* ── Inner layout ── */}
          <Flex gap={0} align="stretch">
            {/* Left column — vertical label + progress */}
            <Flex
              direction="column"
              align="center"
              justify="center"
              pr={{ base: 6, md: 12 }}
              borderRight="1px solid"
              borderColor={landingColors.border}
              display={{ base: "none", md: "flex" }}
            >
              <Text
                fontSize="2xs"
                fontFamily="mono"
                color={landingColors.textMuted}
                letterSpacing="widest"
                textTransform="uppercase"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                Testimonials
              </Text>

              {/* Vertical progress line */}
              <Box position="relative" h="32" w="1px" bg={landingColors.border} mt={8}>
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    background: landingColors.gold,
                    transformOrigin: "top",
                  }}
                  animate={{
                    height: `${((activeIndex + 1) / quotes.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </Box>
            </Flex>

            {/* Center — main content */}
            <Box flex={1} pl={{ base: 0, md: 12 }} py={4}>
              {/* Company badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`badge-${activeIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  style={{ marginBottom: "2rem" }}
                >
                  <Flex
                    as="span"
                    display="inline-flex"
                    align="center"
                    gap={2}
                    fontSize="xs"
                    fontFamily="mono"
                    color={landingColors.textMuted}
                    border="1px solid"
                    borderColor={landingColors.border}
                    borderRadius="full"
                    px={3}
                    py={1}
                  >
                    <Box
                      as="span"
                      w="1.5"
                      h="1.5"
                      borderRadius="full"
                      bg={landingColors.gold}
                    />
                    {current.company}
                  </Flex>
                </motion.div>
              </AnimatePresence>

              {/* Quote with word reveal */}
              <Box position="relative" mb={12} minH="140px">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={`quote-${activeIndex}`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                      fontWeight: 300,
                      color: landingColors.text,
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                      margin: 0,
                    }}
                  >
                    {current.quote.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        style={{ display: "inline-block", marginRight: "0.3em" }}
                        variants={{
                          hidden: { opacity: 0, y: 20, rotateX: 90 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            transition: {
                              duration: 0.5,
                              delay: i * 0.05,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                          exit: {
                            opacity: 0,
                            y: -10,
                            transition: { duration: 0.2, delay: i * 0.02 },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.blockquote>
                </AnimatePresence>
              </Box>

              {/* Author row + navigation */}
              <Flex align="flex-end" justify="space-between" wrap="wrap" gap={4}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`author-${activeIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <Flex align="center" gap={4}>
                      {/* Animated line */}
                      <motion.div
                        style={{
                          width: 32,
                          height: 1,
                          background: landingColors.gold,
                          originX: 0,
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      />
                      {/* Avatar */}
                      <Avatar name={current.name} src={""} />
                      <Box>
                        <Text
                          fontWeight="700"
                          color={landingColors.text}
                          fontSize="sm"
                          lineHeight={1.3}
                        >
                          {current.name}
                        </Text>
                        <Text fontSize="xs" color={landingColors.gold} fontWeight="600">
                          {current.role} · {current.company}
                        </Text>
                      </Box>
                    </Flex>
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next buttons */}
                <Flex align="center" gap={3}>
                  <motion.button
                    onClick={goPrev}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      border: `1px solid ${landingColors.border}`,
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: landingColors.text,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M10 12L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>

                  <motion.button
                    onClick={goNext}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      border: `1px solid ${landingColors.border}`,
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: landingColors.text,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                </Flex>
              </Flex>
            </Box>
          </Flex>


          {/* <Box
            position="absolute"
            bottom="-5"
            left={0}
            right={0}
            overflow="hidden"
            opacity={0.06}
            pointerEvents="none"
          >
            <motion.div
              style={{ display: "flex", whiteSpace: "nowrap" }}
              animate={{ x: [0, -1000] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <Text
                  key={i}
                  as="span"
                  fontSize="5xl"
                  fontWeight="800"
                  letterSpacing="tight"
                  color={landingColors.text}
                  mx={8}
                >
                  {quotes.map((q) => q.company).join(" • ")} •
                </Text>
              ))}
            </motion.div>
          </Box> */}
        </Box>
      </Box>
    </MotionSection>
  );
}