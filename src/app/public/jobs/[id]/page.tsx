import type { Metadata } from "next";
import { JobDetailPageClient } from "./JobDetailPageClient";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://100.76.150.8:8080/api";

interface JobListing {
  id: number;
  title: string;
  country: { name: string };
  city: string;
  salaryAmount: number;
  salaryCurrency: string;
  salaryPeriod: string;
  description: string;
}

async function getJob(id: string): Promise<JobListing | null> {
  try {
    const res = await fetch(`${API_ENDPOINT}/candidates/job-listings`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const jobs = await res.json();
    return jobs.find((job: JobListing) => job.id === parseInt(id)) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const job = await getJob(params.id);

  if (!job) {
    return {
      title: "Job Not Found",
      description: "The job listing you are looking for does not exist.",
    };
  }

  const description = `${job.title} position in ${job.country.name}, ${job.city}. Salary: ${job.salaryAmount.toLocaleString()} ${job.salaryCurrency}/${job.salaryPeriod.toLowerCase()}. Apply now for this overseas opportunity.`;

  return {
    title: `${job.title} in ${job.country.name} - Apply Now`,
    description,
    keywords: [
      job.title,
      job.country.name,
      `jobs in ${job.country.name}`,
      "overseas job",
      "apply now",
    ],
    openGraph: {
      title: `${job.title} in ${job.country.name}`,
      description,
      type: "website",
    },
  };
}

export default function JobDetailPage() {
  return <JobDetailPageClient />;
}
