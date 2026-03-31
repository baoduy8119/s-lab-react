import React from "react";
import MainLayout from "@/app/MainLayout";
import CourseDetailPageClient from "@/app/features/courses/components/CourseDetailPageClient";
import Footer from "@/app/components/Footer";
import SiteContentBootstrap from "@/app/features/dashboard/components/SiteContentBootstrap";
import ContentHydrator from "@/app/features/dashboard/components/ContentHydrator";
import CoursesContentHydrator from "@/app/features/dashboard/components/CoursesContentHydrator";
import CourseDetailContentHydrator from "@/app/features/dashboard/components/CourseDetailContentHydrator";
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
      <CourseDetailContentHydrator />
      <CourseDetailPageClient slugOrId={id} />

      {/* Footer */}
      <Footer />
    </MainLayout>
  );
}
