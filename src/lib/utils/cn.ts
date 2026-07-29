import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merges Tailwind classes so a caller's className always wins over the default.
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
