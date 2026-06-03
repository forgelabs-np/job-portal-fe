import { Box } from "@chakra-ui/react";
import LandingPageMainComponent from "@/components/LandingPage/LandingPageMainComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Overseas Jobs in Middle East | Job Portal Nepal",
  description:
    "Apply for high-paying jobs in Qatar, Dubai, UAE, and across the Middle East. Connect with verified manpower agencies and recruitment partners. Secure your overseas employment today.",
  keywords: [
    "overseas jobs nepal",
    "jobs in middle east",
    "qatar jobs",
    "dubai jobs",
    "uae employment",
    "manpower agency",
    "gulf jobs",
    "foreign employment",
  ],
  openGraph: {
    title: "Find Overseas Jobs in Middle East | Job Portal Nepal",
    description:
      "Apply for high-paying jobs in Qatar, Dubai, UAE, and across the Middle East.",
    type: "website",
  },
};

export default function Home() {
  return (
    <Box>
      <LandingPageMainComponent />
    </Box>
  );
}
