import React from "react";
import LeftMenu from "../components/LeftMenu";
import CourseHero from "../features/courses/components/CourseHero";
import CourseList from "../features/courses/components/CourseList";
import MarketingCards from "../features/courses/components/MarketingCards";
import NewsletterCTA from "../features/s-library/components/NewsletterCTA";
import Footer from "../components/Footer";

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Menu - Fixed Sidebar */}
      <LeftMenu />

      {/* Main Content - Offset by sidebar width */}
      <div className="ml-[360px] flex-1 bg-[#F3F4F6] overflow-x-hidden w-full">
        {/* Hero Section containing the title and registration form */}
        <CourseHero />

        {/* Most Choices Courses List */}
        <CourseList />

        {/* Marketing/Cards Grid */}
        <MarketingCards />

        {/* Footer - Black Background */}
        <Footer />
      </div>
    </div>
  );
}
