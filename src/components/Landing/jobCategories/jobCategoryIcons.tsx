import { Cpu, DraftingCompass, Microscope, Wrench, Zap } from "lucide-react";
import type { QuickJobCategoryIcon, SideJobCategoryIcon } from "./types";

const SIDE_MAP: Record<SideJobCategoryIcon, typeof Wrench> = {
  wrench: Wrench,
  cpu: Cpu,
};

const QUICK_MAP: Record<QuickJobCategoryIcon, typeof Zap> = {
  draftingCompass: DraftingCompass,
  zap: Zap,
  microscope: Microscope,
};

export function getSideCategoryIcon(name: SideJobCategoryIcon) {
  return SIDE_MAP[name];
}

export function getQuickCategoryIcon(name: QuickJobCategoryIcon) {
  return QUICK_MAP[name];
}
