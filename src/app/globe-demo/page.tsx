"use client";

import { Component as Globe } from "@/components/ui/interactive-globe";
import { Box, Flex, Text } from "@chakra-ui/react";

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
              <Text as="span" bgGradient="linear(to-r, blue.300, cyan.300)" bgClip="text" color="transparent">
                Network
              </Text>
            </Text>

            <Text fontSize={{ base: "sm", md: "md" }} color="slate.400" maxW="md" lineHeight="tall" mb={8}>
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
            <Box w="full" maxW="460px" h="460px" maxH="55vh">
              <Globe size={460} />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
