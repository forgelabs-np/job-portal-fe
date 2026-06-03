import { MetadataRoute } from "next";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://100.76.150.8:8080/api";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function fetchJobs() {
  try {
    const res = await fetch(`${API_ENDPOINT}/candidates/job-listings`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await fetchJobs();

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/public/jobs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/public/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/public/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/public/specialization`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/public/recuirement`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const jobEntries: MetadataRoute.Sitemap = jobs.map((job: any) => ({
    url: `${BASE_URL}/public/jobs/${job.id}`,
    lastModified: new Date(job.updatedAt || job.createdAt || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...baseEntries, ...jobEntries];
}
