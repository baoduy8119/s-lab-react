import React from "react";
import CourseHero from "../features/courses/components/CourseHero";
import CourseList from "../features/courses/components/CourseList";
import MarketingCards from "../features/courses/components/MarketingCards";
import Footer from "../components/Footer";
import MainLayout from "@/app/MainLayout";

export default function CoursesPage() {
  return (
    <MainLayout>
      {/* Hero Section containing the title and registration form */}
      <CourseHero />

      {/* Most Choices Courses List */}
      <CourseList />

      {/* Marketing/Cards Grid */}
      <MarketingCards />

      {/* Footer - Black Background */}
      <Footer />
    </MainLayout>
  );
}
