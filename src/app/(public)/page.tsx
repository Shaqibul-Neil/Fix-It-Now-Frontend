import type { Metadata } from "next";
import { HOME_METADATA } from "@/src/features/public/home/dependencies/constants/home.content";
import HomePage from "@/src/features/public/home/pages/HomePage";

export const metadata: Metadata = HOME_METADATA;

export default function Page() {
  return <HomePage />;
}
