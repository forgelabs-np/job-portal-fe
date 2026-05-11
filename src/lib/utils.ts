/**
 * Merges class name strings. This project uses Chakra UI, not Tailwind.
 * For shadcn-style stacks, install Tailwind + `clsx` + `tailwind-merge` and replace with:
 * `return twMerge(clsx(inputs))`
 */
export type ClassValue = string | number | boolean | null | undefined;

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}
