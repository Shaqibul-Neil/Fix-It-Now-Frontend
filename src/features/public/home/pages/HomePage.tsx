import { getMeRequest } from "@/src/features/auth/dependencies/api/auth.service";
import {
  getHomeCategories,
  getHomeTechnicians,
} from "../dependencies/api/home.api";
import Banner from "../dependencies/components/Banner";
import CounterSection from "../dependencies/components/CounterSection";
import HomeJsonLd from "../dependencies/components/HomeJsonLd";
import TechnicianSection from "../dependencies/components/TechnicianSection";

const HomePage = async () => {
  const [categories, technicians, currentUser] = await Promise.all([
    getHomeCategories(),
    getHomeTechnicians(),
    getMeRequest(),
  ]);

  return (
    <>
      <HomeJsonLd categories={categories} />
      <Banner />
      <CounterSection />
      <TechnicianSection
        technicians={technicians}
        userRole={currentUser?.role}
      />
    </>
  );
};

export default HomePage;
