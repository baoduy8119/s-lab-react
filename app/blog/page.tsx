import React from "react";
import BlogHero from "@/app/features/blog/components/BlogHero";
import BlogList from "@/app/features/blog/components/BlogList";
import Footer from "@/app/components/Footer";
import MainLayout from "@/app/MainLayout";
import SiteContentBootstrap from "@/app/features/dashboard/components/SiteContentBootstrap";
import { buildHomeSiteContentPayload } from "@/app/lib/buildSiteContentBootstrapPayload";

export default async function BlogPage() {
  const siteContentPayload = await buildHomeSiteContentPayload();
  return (
    <MainLayout>
      <SiteContentBootstrap payload={siteContentPayload} />
      <BlogHero />
      <BlogList />
      <Footer />
    </MainLayout>
  );
}
