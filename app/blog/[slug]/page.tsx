"use client";

import React from "react";
import LeftMenu from "@/app/components/LeftMenu";
import Footer from "@/app/components/Footer";
import BlogDetailHeader from "@/app/features/blog/components/BlogDetailHeader";
import BlogBody from "@/app/features/blog/components/BlogBody";
import MoreArticles from "@/app/features/blog/components/MoreArticles";

export default function BlogDetailPage() {
  // Static mock data for the view
  const post = {
    date: "May 29, 2026",
    title: "How integration drives success",
    subtitle: "Think of it as a working notebook we’ve made public. We keep it clear, honest, and useful.",
    authorName: "Lora K.",
    authorRole: "Student, InnovateHealth",
    authorImage: "/images/avatar.png",
    heroImage: "/images/blogs/blog1.jpg" // Placeholder
  };

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      {/* Left Menu - Fixed Sidebar */}
      <LeftMenu />

      {/* Main Content */}
      <div className="ml-[360px] flex-1 overflow-hidden">
        <BlogDetailHeader
          date={post.date}
          title={post.title}
          subtitle={post.subtitle}
          authorName={post.authorName}
          authorRole={post.authorRole}
          authorImage={post.authorImage}
          heroImage={post.heroImage}
        />

        <BlogBody />

        <MoreArticles />

        <Footer />
      </div>
    </div>
  );
}
