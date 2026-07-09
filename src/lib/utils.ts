import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeVerificationId(id: string): string {
  if (!id) return "";
  // Remove all non-alphanumeric characters, and convert to uppercase
  const clean = id.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  
  // Case 1: Full 17 character ID starting with CS501, e.g., CS501048FA463E7FD
  if (clean.startsWith("CS501") && clean.length === 17) {
    return `CS501-${clean.slice(5, 9)}-${clean.slice(9, 13)}-${clean.slice(13, 17)}`;
  }
  
  // Case 2: Only the 12 hex suffix of the ID, e.g., 048FA463E7FD
  if (clean.length === 12) {
    return `CS501-${clean.slice(0, 4)}-${clean.slice(4, 8)}-${clean.slice(8, 12)}`;
  }
  
  // Otherwise return the cleaned uppercase string
  return clean;
}
