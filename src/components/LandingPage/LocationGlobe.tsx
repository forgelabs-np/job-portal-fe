import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { DEFAULT_LANDING_GLOBE_ARCS, DEFAULT_LANDING_GLOBE_MARKERS, Globe, landingGlobeColors } from "../ui/globe";
import { colors, radii } from "./theme";


import React from 'react'
import { useReducedMotion } from "framer-motion";
import page from "@/app/agency/page";
import { ChevronLeft } from "lucide-react";

const LocationGlobe = () => {
  const reduce = useReducedMotion();

  return (
    <Container maxW="1300px" py={{ base: 16, md: 24 }}
    >


      <Flex justify="space-between" align="flex-start" mb={4} gap={4} flexWrap="wrap">
        <Box>
          <Flex display="inline-flex" align="center" bg={colors.gold} px={3} py={1} borderRadius={radii.sm} mb={4}>
            <Text fontSize="xs" fontWeight="800" color="white" letterSpacing="widest" textTransform="uppercase">
              International Reach
            </Text>
          </Flex>

          <Text
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="800"
            color={colors.text}
            lineHeight={1.2}
          >
            Work abroad with trusted global partners
          </Text>
          <Text fontSize="sm" color={colors.textMuted} lineHeight={1.7} mb={8} maxW="600px">
            Interpid sends workers to many popular destinations around the world. From Gulf to Europe
            and Asia, we give you more choices and better chances for jobs.
          </Text>
        </Box>

        {/* Nav arrows */}
        {/* <Flex gap={2} align="center" mt={{ base: 0, md: 4 }}>
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
                  </Flex> */}
      </Flex>
      <Box
        position="relative"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          position="relative"
          w="min(100%, clamp(420px, 70vw, 600px))"
          h="min(100%, clamp(420px, 70vw, 600px))"
          aspectRatio={1}
          mx="auto"
        >
          <Box
            position="absolute"
            inset="-8%"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 65%)"
            filter="blur(12px)"
          />

          <Box
            position="relative"
            w="full"
            h="full"
            overflow="hidden"
          >
            <Box w="full" h="full" p={{ base: 2, md: 3 }}>
              <Box
                w="full"
                h="full"
                minH={{ base: "420px", md: "620px" }}
                transform="scale(1.15)"
              >
                <Globe
                  markers={DEFAULT_LANDING_GLOBE_MARKERS}
                  arcs={DEFAULT_LANDING_GLOBE_ARCS}
                  markerColor={landingGlobeColors.markerColor}
                  arcColor={landingGlobeColors.arcColor}
                  baseColor={landingGlobeColors.baseColor}
                  glowColor={landingGlobeColors.glowColor}
                  mapBrightness={landingGlobeColors.mapBrightness}
                  speed={reduce ? 0 : 0.00135}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default LocationGlobe

