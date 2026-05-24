"use client";

import { Box, Flex, Text, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { colors, fonts } from "./theme";

// Dynamic — replace with API data later
export interface TrustedCompany {
  id: number;
  name: string;
  logoUrl?: string;
}

const defaultCompanies: TrustedCompany[] = [
  { id: 1, name: "EcoPure" },
  { id: 2, name: "Focus Group" },
  { id: 3, name: "Al-Lira" },
  { id: 4, name: "Horizon" },
  { id: 5, name: "Gulf Manpower" },
  { id: 6, name: "Makura" },
  { id: 7, name: "Vertex" },
  { id: 8, name: "Apex Corp" },
  { id: 9, name: "TechServe" },
  { id: 10, name: "GlobalHire" },
];

interface Props {
  companies?: TrustedCompany[];
}

function CompanyLogo({ company }: { company: TrustedCompany }) {
  return (
    <Box
      flexShrink={0}
      mx={8}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      opacity={0.45}
      _hover={{ opacity: 0.8 }}
      transition="opacity 0.2s"
    >
      {company.logoUrl ? (
        <Box
          as="img"
          src={company.logoUrl}
          alt={company.name}
          h="32px"
          w="auto"
          objectFit="contain"
          filter="grayscale(100%)"
        />
      ) : (
        <Box
          h="36px"
          px={4}
          borderRadius="6px"
          border="1.5px solid"
          borderColor={colors.border}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={colors.white}
        >
          <Text
            fontFamily={fonts.heading}
            fontWeight="700"
            fontSize="xs"
            color={colors.textMuted}
            letterSpacing="tight"
            whiteSpace="nowrap"
          >
            {company.name}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export function TrustedCompanies({ companies = defaultCompanies }: Props) {
  // Duplicate for seamless loop
  const all = [...companies, ...companies];

  return (
    <Box bg={colors.white} py={8} borderBottom="1px solid" borderColor={colors.border}>
      <Container maxW="1280px" mb={5}>
        <Text
          textAlign="center"
          fontSize="sm"
          color={colors.textMuted}
          fontFamily={fonts.body}
          fontWeight="500"
        >
          Companies around the world trust Interpid for hiring
        </Text>
      </Container>
      <Box overflow="hidden" position="relative">
        {/* Fade masks */}
        <Box
          position="absolute"
          left={0}
          top={0}
          bottom={0}
          w="80px"
          zIndex={2}
          style={{
            background: `linear-gradient(to right, ${colors.white}, transparent)`,
          }}
        />
        <Box
          position="absolute"
          right={0}
          top={0}
          bottom={0}
          w="80px"
          zIndex={2}
          style={{
            background: `linear-gradient(to left, ${colors.white}, transparent)`,
          }}
        />
        <motion.div
          style={{ display: "flex", width: "max-content" }}
          animate={{ x: [0, `-${companies.length * 160}px`] }}
          transition={{
            duration: companies.length * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {all.map((company, i) => (
            <CompanyLogo key={`${company.id}-${i}`} company={company} />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}