import type { FeaturedJobCategory, JobCategoriesPanel, JobCategoriesSectionData } from "./types";

const SHARED_SIDE = [
  {
    id: "civil-construction",
    icon: "wrench" as const,
    title: "Civil Construction",
    description:
      "Infrastructure and site programs with clear mobility pathways and compliance-ready documentation.",
    rolesAvailable: "38 Roles Available",
    viewHref: "/job",
  },
  {
    id: "precision-tooling",
    icon: "cpu" as const,
    title: "Precision Tooling",
    description:
      "Advanced manufacturing roles spanning CNC, metrology, and process engineering disciplines.",
    rolesAvailable: "22 Roles Available",
    viewHref: "/job",
  },
];

const SHARED_QUICK = [
  {
    id: "industrial-design",
    icon: "draftingCompass" as const,
    title: "Industrial Design",
    openingsLabel: "12 Openings",
  },
  {
    id: "smart-systems",
    icon: "zap" as const,
    title: "Smart Systems",
    openingsLabel: "9 Openings",
  },
  {
    id: "lab-technology",
    icon: "microscope" as const,
    title: "Lab Technology",
    openingsLabel: "15 Openings",
  },
];

function panel(featured: FeaturedJobCategory): JobCategoriesPanel {
  return {
    featured,
    sideCards: SHARED_SIDE,
    quickLinks: SHARED_QUICK,
  };
}

const FEATURED: Record<string, FeaturedJobCategory> = {
  agriculture: {
    eyebrow: "FEATURED DISCIPLINE",
    title: "Agricultural Operations",
    description:
      "Seasonal and permanent roles across agronomy, equipment operations, and supply chain coordination.",
    imageUrl:
      "https://images.unsplash.com/photo-1625246333195-f898fcdc2faa?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Agricultural field at sunset",
    ctaLabel: "Browse 32 Jobs",
    ctaHref: "/job",
    secondaryLine: "8 New Postings Today",
  },
  hospitality: {
    eyebrow: "FEATURED DISCIPLINE",
    title: "Hospitality Leadership",
    description:
      "Front-of-house and operations leadership for hotels, resorts, and high-volume dining groups.",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Resort pool at dusk",
    ctaLabel: "Browse 54 Jobs",
    ctaHref: "/job",
    secondaryLine: "14 New Postings Today",
  },
  medical: {
    eyebrow: "FEATURED DISCIPLINE",
    title: "Clinical Support",
    description:
      "Allied health, sterile processing, and patient logistics roles with credential verification built in.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Medical professional in clinical setting",
    ctaLabel: "Browse 67 Jobs",
    ctaHref: "/job",
    secondaryLine: "21 New Postings Today",
  },
  skilled: {
    eyebrow: "FEATURED DISCIPLINE",
    title: "Advanced Engineering",
    description:
      "High-demand technical placements across automation, mechanical systems, and field commissioning.",
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Technician working on industrial machinery",
    ctaLabel: "Browse 45 Jobs",
    ctaHref: "/job",
    secondaryLine: "12 New Postings Today",
  },
  unskilled: {
    eyebrow: "FEATURED DISCIPLINE",
    title: "Operations & Logistics",
    description:
      "Warehouse, fulfillment, and line operations with rapid onboarding and transparent shift scheduling.",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Warehouse logistics aisle",
    ctaLabel: "Browse 91 Jobs",
    ctaHref: "/job",
    secondaryLine: "27 New Postings Today",
  },
};

const FILTERS = [
  { id: "agriculture", label: "Agriculture" },
  { id: "hospitality", label: "Hospitality" },
  { id: "medical", label: "Medical" },
  { id: "skilled", label: "Skilled" },
  { id: "unskilled", label: "Unskilled" },
] as const;

/**
 * Static fallback; replace with API response in the page or a data hook.
 */
export const DEFAULT_JOB_CATEGORIES_DATA: JobCategoriesSectionData = {
  title: "Top Job Categories",
  subtitle:
    "Discover your ideal role by exploring our curated high-demand industry sectors.",
  filters: [...FILTERS],
  defaultFilterId: "skilled",
  panels: {
    agriculture: panel(FEATURED.agriculture),
    hospitality: panel(FEATURED.hospitality),
    medical: panel(FEATURED.medical),
    skilled: panel(FEATURED.skilled),
    unskilled: panel(FEATURED.unskilled),
  },
};
