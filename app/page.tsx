import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BenefitTicker from "@/components/sections/BenefitTicker";
import ProductGrid from "@/components/sections/ProductGrid";
import CycleCalculator from "@/components/sections/CycleCalculator";
import EducationBlock from "@/components/sections/EducationBlock";
import CommunityWall from "@/components/sections/CommunityWall";
import DoctorBlock from "@/components/sections/DoctorBlock";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <Hero />
        <ProductGrid />
        <CycleCalculator />
        <BenefitTicker />
        <EducationBlock />
        <CommunityWall />
        <DoctorBlock />
      </main>
      <Footer />
    </>
  );
}
