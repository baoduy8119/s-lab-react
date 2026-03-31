import React from "react";
import CourseHero from "../features/courses/components/CourseHero";
import CourseList from "../features/courses/components/CourseList";
import MarketingCards from "../features/courses/components/MarketingCards";
import Footer from "../components/Footer";
import MainLayout from "@/app/MainLayout";
import ContentHydrator from "@/app/features/dashboard/components/ContentHydrator";
import CoursesContentHydrator from "@/app/features/dashboard/components/CoursesContentHydrator";
import SiteContentBootstrap from "@/app/features/dashboard/components/SiteContentBootstrap";
import { buildCoursesSiteContentPayload } from "@/app/lib/buildSiteContentBootstrapPayload";

export default async function CoursesPage() {
  const siteContentPayload = await buildCoursesSiteContentPayload();
  return (
    <MainLayout>
      <SiteContentBootstrap payload={siteContentPayload} />
      <ContentHydrator />
      <CoursesContentHydrator />
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
