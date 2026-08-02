import { ABOUT_METADATA } from "@/src/features/public/about/dependencies/constants/about.content";
import AboutPage from "@/src/features/public/about/pages/AboutPage";

export const metadata = ABOUT_METADATA;

export default function AboutRoute() {
  return <AboutPage />;
}
