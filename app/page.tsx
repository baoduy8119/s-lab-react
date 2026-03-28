import HeroSection from "./components/HeroSection";
import AOSInit from "./components/AOSInit";
import Section2 from "./components/Section2";
import HomeTestimonial from "@/app/features/home/components/HomeTestimonial";
import HomeWhoSupports from "@/app/features/home/components/HomeWhoSupports";
import HomePartners from "@/app/features/home/components/HomePartners";
import Footer from "./components/Footer";
import MainLayout from "./MainLayout";
import MoreArticles from "./components/MoreArticles";
import ContentHydrator from "@/app/features/dashboard/components/ContentHydrator";
import SiteContentBootstrap from "@/app/features/dashboard/components/SiteContentBootstrap";
import { buildHomeSiteContentPayload } from "@/app/lib/buildSiteContentBootstrapPayload";

export default async function Home() {
  const siteContentPayload = await buildHomeSiteContentPayload();
  return (
    <MainLayout>
      <SiteContentBootstrap payload={siteContentPayload} />
      <ContentHydrator />
      <AOSInit />
      <HeroSection />

      {/* Section 2: What Makes The Slab Different */}
      <Section2 />

      {/* Who The Slab Supports */}
      <HomeWhoSupports />

      {/* Home Testimonials */}
      <HomeTestimonial />

      {/* Partners Section */}
      <HomePartners />

      {/* More Articles */}
      <MoreArticles />

      {/* Footer */}
      <Footer />
    </MainLayout>
  );
}
