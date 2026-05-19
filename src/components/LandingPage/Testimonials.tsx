"use client";

import { useState, useEffect } from "react";
import { Box, Flex, Text, Container } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { colors, fonts, radii } from "./theme";

const testimonials = [
  {
    id: 1,
    quote:
      "Interpid is a trusted partner for our recruitment needs. They always deliver the right people at the right time. The process is simple, communication is clear, and support is available whenever we need it. Thanks to Interpid, we filled positions quickly and confidently, without the usual hiring stress.",
    name: "Ahmed Al-Farouq",
    role: "Recruitment Lead at Horizon Construction Workforce Ltd.",
    company: "Horizon Workforce",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=360&fit=crop&crop=face",
  },
  {
    id: 2,
    quote:
      "Working with Interpid has been seamless from day one. Their team understood exactly what skill sets we needed and provided pre-vetted candidates who were ready to start immediately. I highly recommend them to any company looking to hire from Nepal.",
    name: "Fatima Al-Rashid",
    role: "HR Manager at Gulf Tech Solutions",
    company: "Gulf Tech",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=360&fit=crop&crop=face",
  },
  {
    id: 3,
    quote:
      "The quality of workers we received through Interpid exceeded our expectations. They handle documentation, visa processing, and travel arrangements professionally, making the entire onboarding experience stress-free for both employer and employee.",
    name: "Raj Patel",
    role: "Operations Director at Malaysian Hospitality Group",
    company: "MHG Hotels",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=360&fit=crop&crop=face",
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[active];

  return (
    <Box as="section" bg={colors.white} py={{ base: 16, md: 24 }}>
      <Container maxW="1280px">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={{ base: 8, md: 16 }}
          position="relative"
        >
          {/* Prev arrow */}
          <Box
            as="button"
            position={{ base: "static", md: "absolute" }}
            left={{ md: "-60px" }}
            w="44px"
            h="44px"
            borderRadius="full"
            border="1px solid"
            borderColor={colors.border}
            bg={colors.white}
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            _hover={{ borderColor: colors.crimson, color: colors.crimson }}
            transition="all 0.2s"
            zIndex={2}
            order={{ base: 3, md: 0 }}
            onClick={() => setActive((p) => (p - 1 + testimonials.length) % testimonials.length)}
          >
            <ChevronLeft size={20} />
          </Box>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${active}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ flexShrink: 0 }}
            >
              <Box
                w={{ base: "220px", md: "280px" }}
                h={{ base: "260px", md: "340px" }}
                borderRadius={radii.xl}
                overflow="hidden"
                bg={colors.bgWarm}
                border="4px solid"
                borderColor={colors.bgWarm}
                mx="auto"
              >
                <Box
                  as="img"
                  src={current.imageUrl}
                  alt={current.name}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
            </motion.div>
          </AnimatePresence>

          {/* Quote content */}
          <Box flex={1}>
            <Box color={colors.crimson} mb={4}>
              <Quote size={32} fill="rgba(139,26,26,0.1)" />
            </Box>

            <AnimatePresence mode="wait">
              <motion.div
                key={`quote-${active}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Text
                  fontFamily={fonts.heading}
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  fontWeight="400"
                  color={colors.text}
                  lineHeight={1.65}
                  mb={8}
                  fontStyle="italic"
                >
                  {current.quote}
                </Text>

                <Flex align="center" gap={4}>
                  <Box
                    w="1px"
                    h="40px"
                    bg={colors.crimson}
                  />
                  <Box>
                    <Text
                      fontFamily={fonts.heading}
                      fontWeight="700"
                      fontSize="md"
                      color={colors.crimson}
                    >
                      {current.name}
                    </Text>
                    <Text fontSize="xs" color={colors.textMuted} fontFamily={fonts.body}>
                      {current.role}
                    </Text>
                  </Box>
                  <Box
                    ml="auto"
                    bg={colors.bgWarm}
                    px={3}
                    py={1.5}
                    borderRadius={radii.sm}
                    border="1px solid"
                    borderColor={colors.border}
                  >
                    <Text fontSize="xs" fontWeight="700" color={colors.textMuted} fontFamily={fonts.body}>
                      {current.company}
                    </Text>
                  </Box>
                </Flex>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <Flex gap={2} mt={8}>
              {testimonials.map((_, i) => (
                <Box
                  key={i}
                  as="button"
                  w={i === active ? "24px" : "8px"}
                  h="8px"
                  borderRadius="full"
                  bg={i === active ? colors.crimson : colors.border}
                  transition="all 0.3s"
                  cursor="pointer"
                  onClick={() => setActive(i)}
                />
              ))}
            </Flex>
          </Box>

          {/* Next arrow */}
          <Box
            as="button"
            position={{ base: "static", md: "absolute" }}
            right={{ md: "-60px" }}
            w="44px"
            h="44px"
            borderRadius="full"
            border="1px solid"
            borderColor={colors.border}
            bg={colors.white}
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            _hover={{ borderColor: colors.crimson, color: colors.crimson }}
            transition="all 0.2s"
            zIndex={2}
            order={{ base: 3, md: 0 }}
            onClick={() => setActive((p) => (p + 1) % testimonials.length)}
          >
            <ChevronRight size={20} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}