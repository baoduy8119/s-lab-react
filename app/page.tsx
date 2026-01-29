import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LeftMenu from "./components/LeftMenu";
import Section2 from "./components/Section2";
import HomeTestimonial from "@/app/features/home/components/HomeTestimonial";
import HomeWhoSupports from "@/app/features/home/components/HomeWhoSupports";
import HomePartners from "@/app/features/home/components/HomePartners";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      {/* Left Menu - Fixed Sidebar */}
      <LeftMenu />

      {/* Main Content - Offset by sidebar width, always full width */}
      <div className="ml-[360px] flex-1 w-full overflow-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Section 2: What Makes The Slab Different */}
        <Section2 />

        {/* Who The Slab Supports */}
        <HomeWhoSupports />

        {/* Home Testimonials */}
        <HomeTestimonial />

        {/* Partners Section */}
        <HomePartners />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
