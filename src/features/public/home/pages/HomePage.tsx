import {
  getHomeCategories,
  getHomeServices,
  getHomeTechnicians,
} from "../dependencies/api/home.api";
import Banner from "../dependencies/components/Banner";
import CategorySection from "../dependencies/components/CategorySection";
import HomeJsonLd from "../dependencies/components/HomeJsonLd";
import ServiceSection from "../dependencies/components/ServiceSection";
import TechnicianSection from "../dependencies/components/TechnicianSection";

const HomePage = async () => {
  const [services, categories, technicians] = await Promise.all([
    getHomeServices(),
    getHomeCategories(),
    getHomeTechnicians(),
  ]);

  return (
    <>
      <HomeJsonLd />
      <Banner />
      <ServiceSection services={services} />
      <CategorySection categories={categories} />
      <TechnicianSection technicians={technicians} />
    </>
  );
};

export default HomePage;
