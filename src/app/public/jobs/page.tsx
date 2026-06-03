import type { Metadata } from "next";
import { JobsPageClient } from "./JobsPageClient";

export const metadata: Metadata = {
  title: "Job Opportunities in Middle East for Nepali Workers",
  description:
    "Browse high-paying job openings in Qatar, Dubai, UAE, and other Middle East countries. Filter by location, category, and salary. Apply now to secure your overseas employment.",
  keywords: [
    "jobs in middle east",
    "job listings nepal",
    "qatar jobs",
    "dubai jobs available",
    "uae employment opportunities",
    "overseas job openings",
    "gulf jobs",
    "job search middle east",
    "manpower jobs",
  ],
  openGraph: {
    title: "Job Opportunities in Middle East for Nepali Workers",
    description:
      "Browse high-paying job openings in Qatar, Dubai, UAE, and other Middle East countries.",
    type: "website",
  },
};

export default function JobsPage() {
  return <JobsPageClient />;
}
