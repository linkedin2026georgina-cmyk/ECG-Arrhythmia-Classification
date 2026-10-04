import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn is a small utility function used to merge class names.
 * It supports conditional classes and avoids Tailwind CSS conflicts.
 */

export function cn(...inputs: ClassValue[]) {
  // clsx handles conditional logic, twMerge resolves Tailwind conflicts
  return twMerge(clsx(inputs));
}
