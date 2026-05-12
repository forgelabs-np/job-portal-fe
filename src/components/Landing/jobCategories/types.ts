/** Filter tab (e.g. sector from `/job-categories?sector=skilled`) */
export interface JobCategoryFilter {
  id: string;
  label: string;
}

export interface FeaturedJobCategory {
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  ctaLabel: string;
  /** When omitted, CTA renders as button-only (wire `onCtaClick` from parent). */
  ctaHref?: string;
  secondaryLine?: string;
}

export type SideJobCategoryIcon = "wrench" | "cpu";

export interface SideJobCategory {
  id: string;
  icon: SideJobCategoryIcon;
  title: string;
  description: string;
  rolesAvailable: string;
  viewHref?: string;
}

export type QuickJobCategoryIcon = "draftingCompass" | "zap" | "microscope";

export interface QuickJobCategory {
  id: string;
  icon: QuickJobCategoryIcon;
  title: string;
  openingsLabel: string;
}

export interface JobCategoriesPanel {
  featured: FeaturedJobCategory;
  sideCards: SideJobCategory[];
  quickLinks: QuickJobCategory[];
}

/**
 * Shape you can map directly from an API (e.g. GET /landing/job-categories).
 * `panels` must include an entry for every `filters[].id`.
 */
export interface JobCategoriesSectionData {
  title: string;
  subtitle: string;
  filters: JobCategoryFilter[];
  /** Which filter is selected before user interaction (and fallback). */
  defaultFilterId: string;
  panels: Record<string, JobCategoriesPanel>;
}
