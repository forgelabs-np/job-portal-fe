"use client";

import { Box, Flex, Separator, Text } from "@chakra-ui/react";

const agencies = ["HIMALAYAN", "ELITE OPS", "GLOBAL LINK", "BRIDGEWAY"];

export default function TrustedBy() {
  return (
    <>
      <Separator borderColor="gray.100" />

      <Box py={{ base: 12, md: 16 }} px={{ base: 6, md: 8 }} bg={"#FDFDFE"}>
        <Text
          textAlign="center"
          fontSize="13px"
          fontWeight="600"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color="rgb(139, 139, 139)"
          mb={8}
        >
          Trusted by Agencies Across Nepal
        </Text>

        <Flex
          justify="center"
          align="center"
          gap={{ base: 8, md: 16 }}
          flexWrap="wrap"
        >
          {agencies.map((name) => (
            <Text
              key={name}
              fontSize={{ base: "15px", md: "20px" }}
              fontWeight="700"
              letterSpacing="0.08em"
              textTransform="uppercase"
              color="#9ca3af"
              _hover={{ color: "#9ca3af", transition: "color 0.2s ease" }}
              cursor="default"
              userSelect="none"
            >
              {name}
            </Text>
          ))}
        </Flex>
      </Box>
      <Separator borderColor="gray.100" />
    </>
  );
}
