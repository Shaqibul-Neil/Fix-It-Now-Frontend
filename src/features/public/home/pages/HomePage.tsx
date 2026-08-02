import { getMeRequest } from "@/src/features/auth/dependencies/api/auth.service";
import {
  getHomeCategories,
  getHomeTechnicians,
} from "../dependencies/api/home.api";
import Banner from "../dependencies/components/Banner";
import CategorySection from "../dependencies/components/CategorySection";
import ContactSection from "../dependencies/components/ContactSection";
import CounterSection from "../dependencies/components/CounterSection";
import CoverageSection from "../dependencies/components/CoverageSection";
import EmergencyBand from "../dependencies/components/EmergencyBand";
import FaqSection from "../dependencies/components/FaqSection";
import HomeJsonLd from "../dependencies/components/HomeJsonLd";
import HowItWorksSection from "../dependencies/components/HowItWorksSection";
import JoinSection from "../dependencies/components/JoinSection";
import TechnicianSection from "../dependencies/components/TechnicianSection";
import TestimonialSection from "../dependencies/components/TestimonialSection";
import WhyChooseUsSection from "../dependencies/components/WhyChooseUsSection";

// One rhythm for every gap on the page — 60px on phones, 80 on tablets, 100 on
// desktop. Sections carry no vertical padding of their own.
const SECTION_RHYTHM =
  "space-y-15 pb-15 md:space-y-20 md:pb-20 lg:space-y-25 lg:pb-25";

const HomePage = async () => {
  const [categories, technicians, currentUser] = await Promise.all([
    getHomeCategories(),
    getHomeTechnicians(),
    getMeRequest(),
  ]);

  return (
    <>
      <HomeJsonLd categories={categories} />

      <div className={SECTION_RHYTHM}>
        <Banner />
        <CounterSection />
        <CategorySection categories={categories} />
        <EmergencyBand />
        <HowItWorksSection />
        <TechnicianSection
          technicians={technicians}
          userRole={currentUser?.role}
        />
        <CoverageSection />
        <WhyChooseUsSection />
        <TestimonialSection />
        <FaqSection />
        <JoinSection />
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
