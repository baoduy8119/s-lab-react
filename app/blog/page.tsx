"use client";

import React from "react";
import LeftMenu from "@/app/components/LeftMenu";
import Footer from "@/app/components/Footer";
import BlogHero from "@/app/features/blog/components/BlogHero";
import BlogList from "@/app/features/blog/components/BlogList";

export default function BlogPage() {
  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      {/* Left Menu - Fixed Sidebar */}
      <LeftMenu />

      {/* Main Content */}
      <div className="ml-[360px] flex-1 overflow-hidden">
        <BlogHero />
        <BlogList />
        <Footer />
      </div>
    </div>
  );
}
