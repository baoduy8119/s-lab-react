import HeroSection from "./components/HeroSection";
import Section2 from "./components/Section2";
import HomeTestimonial from "@/app/features/home/components/HomeTestimonial";
import HomeWhoSupports from "@/app/features/home/components/HomeWhoSupports";
import HomePartners from "@/app/features/home/components/HomePartners";
import Footer from "./components/Footer";
import MainLayout from "./MainLayout";

export default function Home() {
  return (
    <MainLayout>
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
    </MainLayout>
  );
}
