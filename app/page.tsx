import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BenefitTicker from "@/components/sections/BenefitTicker";
import Categories from "@/components/sections/Categories";
import Stats from "@/components/sections/Stats";
import InstagramReels from "@/components/sections/InstagramReels";
import Activities from "@/components/sections/Activities";
import ProductGrid from "@/components/sections/ProductGrid";
import OfferCountdown from "@/components/sections/OfferCountdown";
import Ingredients from "@/components/sections/Ingredients";
import VideoFeature from "@/components/sections/VideoFeature";
import EducationBlock from "@/components/sections/EducationBlock";
import Testimonials from "@/components/sections/Testimonials";
import CycleCalculator from "@/components/sections/CycleCalculator";
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
        <Categories />
        <ProductGrid />
        <InstagramReels />
        <OfferCountdown />
        <Ingredients />
        <Stats />
        <VideoFeature />
        <EducationBlock />
        <Testimonials />
        <CycleCalculator />
        <CommunityWall />
        <DoctorBlock />
        <Activities />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
