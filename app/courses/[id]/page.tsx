import React from "react";
import MainLayout from "@/app/MainLayout";
import CourseDetailHero from "@/app/features/courses/components/CourseDetailHero";
import CourseInfo from "@/app/features/courses/components/CourseInfo";
import NeedToKnow from "@/app/features/courses/components/NeedToKnow";
import KeyLearningPoints from "@/app/features/courses/components/KeyLearningPoints";
import CourseStructure from "@/app/features/courses/components/CourseStructure";
import CapstoneProject from "@/app/features/courses/components/CapstoneProject";
import TestimonialSlider from "@/app/features/courses/components/TestimonialSlider";
import TestimonialsList from "@/app/features/courses/components/TestimonialsList";
import CourseIncludes from "@/app/features/courses/components/CourseIncludes";
import RelatedCourses from "@/app/features/courses/components/RelatedCourses";
import CurriculumChapters from "@/app/features/courses/components/CurriculumChapters";
import Footer from "@/app/components/Footer";
import SiteContentBootstrap from "@/app/features/dashboard/components/SiteContentBootstrap";
import ContentHydrator from "@/app/features/dashboard/components/ContentHydrator";
import CoursesContentHydrator from "@/app/features/dashboard/components/CoursesContentHydrator";
import { buildCoursesSiteContentPayload } from "@/app/lib/buildSiteContentBootstrapPayload";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const siteContentPayload = await buildCoursesSiteContentPayload();
  return (
    <MainLayout>
      <SiteContentBootstrap payload={siteContentPayload} />
      <ContentHydrator />
      <CoursesContentHydrator />
      {/* Hero Section with course title and images */}
      <CourseDetailHero courseId={id} />

      {/* Need to Know Tabs Section */}
      <NeedToKnow />

      {/* Key Learning Points Section */}
      <KeyLearningPoints />

      {/* Course Structure Section */}
      <CourseStructure />

      {/* Capstone Project Section */}
      <CapstoneProject />

      {/* Testimonial Slider Section */}
      <TestimonialSlider />

      {/* Testimonials Grid Section */}
      <TestimonialsList />

      {/* Pricing & Includes Section */}
      <CourseIncludes />

      {/* Other Related Courses Section */}
      <RelatedCourses />

      {/* Curriculum Chapters Section (Original) */}
      {/* <CurriculumChapters /> */}

      {/* Footer */}
      <Footer />
    </MainLayout>
  );
}
