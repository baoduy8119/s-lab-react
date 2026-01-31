import React from "react";
import BlogHero from "@/app/features/blog/components/BlogHero";
import BlogList from "@/app/features/blog/components/BlogList";
import Footer from "@/app/components/Footer";
import MainLayout from "@/app/MainLayout";

export default function BlogPage() {
  return (
    <MainLayout>
      <BlogHero />
      <BlogList />
      <Footer />
    </MainLayout>
  );
}
