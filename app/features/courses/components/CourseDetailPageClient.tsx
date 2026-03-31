"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import CourseDetailHero from "@/app/features/courses/components/CourseDetailHero";
import NeedToKnow from "@/app/features/courses/components/NeedToKnow";
import KeyLearningPoints from "@/app/features/courses/components/KeyLearningPoints";
import CourseStructure from "@/app/features/courses/components/CourseStructure";
import CapstoneProject from "@/app/features/courses/components/CapstoneProject";
import TestimonialSlider from "@/app/features/courses/components/TestimonialSlider";
import TestimonialsList from "@/app/features/courses/components/TestimonialsList";
import CourseIncludes from "@/app/features/courses/components/CourseIncludes";
import RelatedCourses from "@/app/features/courses/components/RelatedCourses";
import { useCoursesContentStore } from "@/app/features/dashboard/stores/useCoursesContentStore";
import { courseIdAndTitleToSlug, resolveCourseIdFromSlug } from "@/app/lib/courseSlugs";

interface CourseDetailPageClientProps {
  slugOrId: string;
  dashboardBasePath?: string;
}

const CourseDetailPageClient = React.memo(function CourseDetailPageClient({
  slugOrId,
  dashboardBasePath,
}: CourseDetailPageClientProps) {
  const router = useRouter();
  const cardIds = useCoursesContentStore((s) => s.cardIds);
  const content = useCoursesContentStore((s) => s.content);

  const courseId = useMemo(
    () =>
      resolveCourseIdFromSlug(slugOrId, {
        cardIds,
        contentById: content as Record<string, Record<string, unknown> | undefined>,
      }),
    [cardIds, content, slugOrId]
  );

  const canonicalSlug = useMemo(() => {
    const title = (content[courseId]?.title as string) ?? "";
    return courseIdAndTitleToSlug(courseId, title);
  }, [content, courseId]);

  useEffect(() => {
    if (!cardIds.length) return;
    if (!canonicalSlug) return;
    if (slugOrId === canonicalSlug) return;
    const base = dashboardBasePath ?? "/courses";
    router.replace(`${base}/${canonicalSlug}`);
  }, [canonicalSlug, cardIds.length, dashboardBasePath, router, slugOrId]);

  // If not hydrated yet or invalid slug, avoid rendering broken course sections.
  if (!cardIds.length) return null;
  if (!courseId) return null;

  return (
    <>
      <CourseDetailHero courseId={courseId} />
      <NeedToKnow courseId={courseId} />
      <KeyLearningPoints courseId={courseId} />
      <CourseStructure courseId={courseId} />
      <CapstoneProject courseId={courseId} />
      <TestimonialSlider courseId={courseId} />
      <TestimonialsList courseId={courseId} />
      <CourseIncludes courseId={courseId} />
      <RelatedCourses courseId={courseId} />
    </>
  );
});

CourseDetailPageClient.displayName = "CourseDetailPageClient";

export default CourseDetailPageClient;

