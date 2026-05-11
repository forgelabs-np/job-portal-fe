"use client";

import { landingColors } from "@/components/Landing/landingTheme";
import { LandingCtaBanner } from "@/components/Landing/LandingCtaBanner";
import { LandingDashboardPreview } from "@/components/Landing/LandingDashboardPreview";
import { LandingDestinations } from "@/components/Landing/LandingDestinations";
import { LandingFeatures } from "@/components/Landing/LandingFeatures";
import { LandingGlobe } from "@/components/Landing/LandingGlobe";
import { LandingFooter } from "@/components/Landing/LandingFooter";
import { LandingHero } from "@/components/Landing/LandingHero";
import { LandingNav } from "@/components/Landing/LandingNav";
import { LandingProcess } from "@/components/Landing/LandingProcess";
import { LandingStats } from "@/components/Landing/LandingStats";
import { LandingTestimonials } from "@/components/Landing/LandingTestimonials";
import { Box } from "@chakra-ui/react";

export function GlobalTalentLanding() {
  return (
    <Box bg={landingColors.bg} color={landingColors.text} minH="100vh">
      <LandingNav />
      <LandingHero />
      <LandingStats />
      <LandingGlobe />
      <LandingFeatures />
      <LandingDestinations />
      <LandingProcess />
      <LandingDashboardPreview />
      <LandingTestimonials />
      <LandingCtaBanner />
      <LandingFooter />
    </Box>
  );
}
