"use client";

import { Globe } from "@/components/ui/cobe-globe";
import { Box, Flex, Text } from "@chakra-ui/react";

const demoMarkers = [
  { id: "sf", location: [37.7595, -122.4367] as [number, number], label: "San Francisco" },
  { id: "nyc", location: [40.7128, -74.006] as [number, number], label: "New York" },
  { id: "tokyo", location: [35.6762, 139.6503] as [number, number], label: "Tokyo" },
  { id: "london", location: [51.5074, -0.1278] as [number, number], label: "London" },
  { id: "sydney", location: [-33.8688, 151.2093] as [number, number], label: "Sydney" },
  { id: "capetown", location: [-33.9249, 18.4241] as [number, number], label: "Cape Town" },
  { id: "dubai", location: [25.2048, 55.2708] as [number, number], label: "Dubai" },
  { id: "paris", location: [48.8566, 2.3522] as [number, number], label: "Paris" },
  { id: "saopaulo", location: [-23.5505, -46.6333] as [number, number], label: "São Paulo" },
];

const demoArcs = [
  {
    id: "sf-tokyo",
    from: [37.7595, -122.4367] as [number, number],
    to: [35.6762, 139.6503] as [number, number],
    label: "San Francisco → Tokyo",
  },
];

export default function GlobeDemoPage() {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="#0a0a0f" p={{ base: 4, md: 8 }}>
      <Box
        w="full"
        maxW="5xl"
        borderRadius="2xl"
        border="1px solid"
        borderColor="rgba(148,163,184,0.25)"
        bg="rgba(15,23,42,0.85)"
        overflow="hidden"
        position="relative"
      >
        <Box
          position="absolute"
          top={0}
          right="25%"
          w="384px"
          h="384px"
          borderRadius="full"
          bg="rgba(59,130,246,0.06)"
          filter="blur(48px)"
          pointerEvents="none"
        />

        <Flex direction={{ base: "column", md: "row" }} minH={{ base: "auto", md: "500px" }}>
          <Flex
            flex={1}
            direction="column"
            justify="center"
            p={{ base: 8, md: 14 }}
            position="relative"
            zIndex={1}
          >
            <Flex
              align="center"
              gap={2}
              borderRadius="full"
              border="1px solid"
              borderColor="rgba(148,163,184,0.35)"
              bg="rgba(30,41,59,0.6)"
              px={3}
              py={1}
              fontSize="xs"
              color="slate.300"
              mb={6}
              w="fit-content"
            >
              <Box w="6px" h="6px" borderRadius="full" bg="emerald.400" />
              All systems operational
            </Flex>

            <Text
              as="h1"
              fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
              fontWeight="extrabold"
              letterSpacing="-0.02em"
              lineHeight="1.1"
              color="white"
              mb={4}
            >
              Global Edge
              <br />
              <Text
                as="span"
                bgGradient="linear(to-r, blue.300, cyan.300)"
                bgClip="text"
                color="transparent"
              >
                Network
              </Text>
            </Text>

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="slate.400"
              maxW="md"
              lineHeight="tall"
              mb={8}
            >
              Deployed across 150+ points of presence worldwide. Your data served from the nearest
              node in under 50ms. Drag the globe to explore.
            </Text>

            <Flex align="center" gap={6} flexWrap="wrap">
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  150+
                </Text>
                <Text fontSize="xs" color="slate.500">
                  Edge Nodes
                </Text>
              </Box>
              <Box w="1px" h="32px" bg="rgba(148,163,184,0.35)" />
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  &lt;50ms
                </Text>
                <Text fontSize="xs" color="slate.500">
                  Avg Latency
                </Text>
              </Box>
              <Box w="1px" h="32px" bg="rgba(148,163,184,0.35)" />
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  99.99%
                </Text>
                <Text fontSize="xs" color="slate.500">
                  Uptime
                </Text>
              </Box>
            </Flex>
          </Flex>

          <Flex
            flex={1}
            align="center"
            justify="center"
            p={{ base: 4, md: 0 }}
            minH={{ base: "360px", md: "auto" }}
          >
            <Box w="full" maxW="460px" aspectRatio={1} maxH="55vh">
              <Globe
                markers={demoMarkers}
                arcs={demoArcs}
                markerColor={[0.3, 0.45, 0.85]}
                baseColor={[0.22, 0.24, 0.3]}
                arcColor={[0.35, 0.55, 0.95]}
                glowColor={[0.2, 0.35, 0.55]}
                dark={1}
                mapBrightness={10}
                markerSize={0.025}
                markerElevation={0.01}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
