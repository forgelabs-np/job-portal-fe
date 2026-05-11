"use client";

import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const LandingHero3DScene = dynamic(() => import("./LandingHero3DScene"), {
  ssr: false,
  loading: () => (
    <Box
      aria-hidden
      w="100%"
      h="100%"
      bg="radial-gradient(circle at 50% 45%, rgba(212,175,55,0.18) 0%, transparent 65%)"
    />
  ),
});

export function LandingHero3D() {
  return (
    <Box position="absolute" inset={0} borderRadius="2xl" overflow="hidden">
      <LandingHero3DScene />
    </Box>
  );
}
