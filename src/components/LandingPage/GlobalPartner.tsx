"use client";

import { useState } from "react";
import { Box, Flex, Text, Button, Container } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
import { colors, fonts, radii } from "./theme";

const MotionBox = motion(Box);

// ─── Types — replace with your API response shape ────────────────────────────
export interface GlobalPartner {
  id: number;
  country: string;
  city?: string;
  code: string; // e.g. "01"
  jobCount: number;
  imageUrl: string;
}

// Default placeholder data — swap with API call
const defaultPartners: GlobalPartner[] = [
  {
    id: 1,
    country: "Malaysia",
    code: "01",
    jobCount: 9,
    imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    country: "Qatar",
    code: "02",
    jobCount: 3,
    imageUrl: "https://images.unsplash.com/photo-1579811497671-4f35e13a1b06?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    country: "Saudi Arabia",
    code: "03",
    jobCount: 0,
    imageUrl: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    country: "UAE",
    code: "04",
    jobCount: 3,
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    country: "Kuwait",
    code: "05",
    jobCount: 5,
    imageUrl: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    country: "Oman",
    code: "06",
    jobCount: 2,
    imageUrl: "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?w=600&h=400&fit=crop",
  },
];

const VISIBLE = 4;

interface Props {
  partners?: GlobalPartner[];
  isLoading?: boolean;
}

function PartnerCard({ partner }: { partner: GlobalPartner }) {
  return (
    <Box
      position="relative"
      borderRadius={radii.lg}
      overflow="hidden"
      h={{ base: "200px", md: "240px" }}
      flexShrink={0}
      cursor="pointer"
      role="group"
    >
      <Box
        as="img"
        src={partner.imageUrl}
        alt={partner.country}
        w="full"
        h="full"
        objectFit="cover"
        transition="transform 0.4s ease"
        _groupHover={{ transform: "scale(1.05)" }}
      />
      {/* Dark overlay */}
      <Box
        position="absolute"
        inset={0}
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
        }}
      />
      {/* Content */}
      <Box position="absolute" inset={0} p={4} display="flex" flexDirection="column" justifyContent="flex-end">
        <Text
          fontSize="2xs"
          color="whiteAlpha.700"
          fontFamily={fonts.mono}
          mb={0.5}
          letterSpacing="wider"
        >
          /{partner.code}
        </Text>
        <Text
          fontFamily={fonts.heading}
          fontWeight="800"
          fontSize="xl"
          color="white"
          letterSpacing="wide"
          textTransform="uppercase"
          lineHeight={1.1}
        >
          {partner.country}
        </Text>
        <Flex align="center" gap={1.5} mt={1}>
          <Briefcase size={11} color="rgba(255,255,255,0.7)" />
          <Text fontSize="2xs" color="whiteAlpha.800" fontFamily={fonts.body}>
            Currently {partner.jobCount} {partner.jobCount === 1 ? "job" : "jobs"}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

export function GlobalPartnersSection({ partners = defaultPartners, isLoading = false }: Props) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(partners.length / VISIBLE);
  const visiblePartners = partners.slice(page * VISIBLE, page * VISIBLE + VISIBLE);

  return (
    <Box
      as="section"
      id="companies"
      bg={colors.bg}
      py={{ base: 16, md: 24 }}
    >
      <Container maxW="1280px">
        {/* Header */}
        <Flex justify="space-between" align="flex-start" mb={4} gap={4} flexWrap="wrap">
          <Box>
            <Flex display="inline-flex" align="center" bg={colors.gold} px={3} py={1} borderRadius={radii.sm} mb={4}>
              <Text fontSize="2xs" fontWeight="800" color="white" fontFamily={fonts.body} letterSpacing="widest" textTransform="uppercase">
                International Reach
              </Text>
            </Flex>
            <Text
              fontFamily={fonts.heading}
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="800"
              color={colors.text}
              lineHeight={1.2}
            >
              Work abroad with trusted global partners
            </Text>
          </Box>

          {/* Nav arrows */}
          <Flex gap={2} align="center" mt={{ base: 0, md: 4 }}>
            <Box
              as="button"
              w="40px"
              h="40px"
              borderRadius="full"
              border="1px solid"
              borderColor={colors.border}
              bg={colors.white}
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor={page === 0 ? "not-allowed" : "pointer"}
              opacity={page === 0 ? 0.4 : 1}
              _hover={page > 0 ? { borderColor: colors.crimson, color: colors.crimson } : {}}
              transition="all 0.2s"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              <ChevronLeft size={18} />
            </Box>
            <Box
              as="button"
              w="40px"
              h="40px"
              borderRadius="full"
              border="1px solid"
              borderColor={colors.border}
              bg={colors.white}
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor={page >= totalPages - 1 ? "not-allowed" : "pointer"}
              opacity={page >= totalPages - 1 ? 0.4 : 1}
              _hover={page < totalPages - 1 ? { borderColor: colors.crimson, color: colors.crimson } : {}}
              transition="all 0.2s"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            >
              <ChevronRight size={18} />
            </Box>
          </Flex>
        </Flex>

        {/* Subtext */}
        <Text fontSize="sm" color={colors.textMuted} fontFamily={fonts.body} lineHeight={1.7} mb={8} maxW="600px">
          Interpid sends workers to many popular destinations around the world. From Gulf to Europe
          and Asia, we give you more choices and better chances for jobs.
        </Text>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Box
              display="grid"
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              }}
              gap={4}
              mb={8}
            >
              {isLoading
                ? Array.from({ length: VISIBLE }).map((_, i) => (
                    <Box
                      key={i}
                      h="240px"
                      borderRadius={radii.lg}
                      bg={colors.bgWarm}
                      style={{ animation: "pulse 1.5s ease-in-out infinite" }}
                    />
                  ))
                : visiblePartners.map((partner) => (
                    <PartnerCard key={partner.id} partner={partner} />
                  ))}
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots + view all */}
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Text fontSize="sm" color={colors.textMuted} fontFamily={fonts.body}>
            We have many more jobs in other countries.{" "}
            <Box as="a" href="#" color={colors.crimson} fontWeight="600" textDecoration="underline">
              view the lists of all countries →
            </Box>
          </Text>

          {/* Dots */}
          <Flex gap={2}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Box
                key={i}
                as="button"
                w={i === page ? "24px" : "8px"}
                h="8px"
                borderRadius="full"
                bg={i === page ? colors.crimson : colors.border}
                transition="all 0.3s"
                cursor="pointer"
                onClick={() => setPage(i)}
              />
            ))}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}