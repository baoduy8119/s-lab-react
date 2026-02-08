import React from "react";
import MainLayout from "@/app/MainLayout";
import Footer from "@/app/components/Footer";
import BlogDetailHeader from "@/app/features/blog/components/BlogDetailHeader";
import BlogBody from "@/app/features/blog/components/BlogBody";
import MoreArticles from "@/app/components/MoreArticles";

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
    <MainLayout>
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
    </MainLayout>
  );
}
