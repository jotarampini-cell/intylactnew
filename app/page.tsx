import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BenefitTicker from "@/components/sections/BenefitTicker";
import ProductGrid from "@/components/sections/ProductGrid";
import Ingredients from "@/components/sections/Ingredients";
import CycleCalculator from "@/components/sections/CycleCalculator";
import EducationBlock from "@/components/sections/EducationBlock";
import Testimonials from "@/components/sections/Testimonials";
import CommunityWall from "@/components/sections/CommunityWall";
import DoctorBlock from "@/components/sections/DoctorBlock";
import Faq from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <Hero />
        <BenefitTicker />
        <ProductGrid />
        <Ingredients />
        <EducationBlock />
        <Testimonials />
        <CycleCalculator />
        <CommunityWall />
        <DoctorBlock />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
