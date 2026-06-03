export interface JobPostingSchema {
  "@context": string;
  "@type": string;
  title: string;
  description: string;
  jobLocation: {
    "@type": string;
    address: {
      "@type": string;
      addressCountry: string;
      addressLocality: string;
    };
  };
  baseSalary: {
    "@type": string;
    currency: string;
    value: {
      "@type": string;
      minValue?: number;
      maxValue?: number;
      unitText: string;
    };
  };
  employmentType: string;
  datePosted: string;
  validThrough: string;
  hiringOrganization: {
    "@type": string;
    name: string;
  };
}

export function generateJobPostingSchema(job: {
  id: number;
  title: string;
  description: string;
  country: { name: string };
  city: string;
  salaryAmount: number;
  salaryCurrency: string;
  salaryPeriod: string;
  createdAt: string;
  deadline: string;
}): JobPostingSchema {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description.substring(0, 200),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: job.country.name,
        addressLocality: job.city,
      },
    },
    baseSalary: {
      "@type": "PriceSpecification",
      currency: job.salaryCurrency,
      value: {
        "@type": "PriceSpecification",
        unitText: job.salaryPeriod,
        minValue: job.salaryAmount,
        maxValue: job.salaryAmount,
      },
    },
    employmentType: "FullTime",
    datePosted: job.createdAt || new Date().toISOString(),
    validThrough: job.deadline,
    hiringOrganization: {
      "@type": "Organization",
      name: job.country.name + " Recruitment",
    },
  };
}

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description: string;
  sameAs: string[];
}

export function generateOrganizationSchema(baseUrl: string): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Job Portal",
    url: baseUrl,
    description:
      "Find overseas jobs in Middle East countries for Nepali workers",
    sameAs: [
      // Add your social media URLs here later
    ],
  };
}

export interface BreadcrumbSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

export function generateBreadcrumbSchema(
  baseUrl: string,
  breadcrumbs: Array<{ name: string; path: string }>
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.path}`,
    })),
  };
}
