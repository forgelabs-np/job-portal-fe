"use client";

import DemandSection from "@/components/Homepage/DemandSection";
import FeaturesSection from "@/components/Homepage/FeatureSection";
import HeroSection from "@/components/Homepage/HeroSection";
import ImageSection from "@/components/Homepage/ImageSection";
import TrustedBy from "@/components/Homepage/TrustedBy";
import { Box, Button, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["ping"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      return res.json();
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box>
      <HeroSection />
      <ImageSection />
      <TrustedBy />
      <FeaturesSection />
      <DemandSection />
    </Box>
  );
}
