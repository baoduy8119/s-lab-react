"use client";

import DashboardShell from "@/app/features/dashboard/components/DashboardShell";
import CourseDetailEditor from "@/app/features/dashboard/components/CourseDetailEditor";
import { useCourseDetailContentStore } from "@/app/features/dashboard/stores/useCourseDetailContentStore";
import { useCoursesContentStore } from "@/app/features/dashboard/stores/useCoursesContentStore";
import { use, useEffect, useMemo } from "react";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";
import { useRouter } from "next/navigation";
import {
  courseIdAndTitleToSlug,
  resolveCourseIdFromSlug,
} from "@/app/lib/courseSlugs";

const EMPTY_COURSE_CONTENT = Object.freeze({}) as Record<string, unknown>;

export default function DashboardCourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const cardIds = useCoursesContentStore((s) => s.cardIds);
  const hydrateCourses = useCoursesContentStore((s) => s.hydrate);
  const coursesContent = useCoursesContentStore((s) => s.content);
  const courseId = useMemo(
    () =>
      resolveCourseIdFromSlug(id, {
        cardIds,
        contentById: coursesContent as Record<string, Record<string, unknown> | undefined>,
      }),
    [cardIds, coursesContent, id]
  );
  const cardSection = useLocalizedContent(
    useCoursesContentStore((s) => s.content[courseId] ?? EMPTY_COURSE_CONTENT)
  );

  const setCourseIds = useCourseDetailContentStore((s) => s.setCourseIds);
  const hydrateDetails = useCourseDetailContentStore((s) => s.hydrate);
  const isDirty = useCourseDetailContentStore((s) => s.isDirty);
  const isSaving = useCourseDetailContentStore((s) => s.isSaving);
  const saveContent = useCourseDetailContentStore((s) => s.saveContent);
  const resetCourse = useCourseDetailContentStore((s) => s.resetCourse);

  useEffect(() => {
    hydrateCourses();
  }, [hydrateCourses]);

  useEffect(() => {
    if (!cardIds.length) return;
    const title = (coursesContent[courseId]?.title as string) ?? "";
    const canonical = courseIdAndTitleToSlug(courseId, title);
    if (id !== canonical) router.replace(`/dashboard/courses/${canonical}`);
  }, [cardIds.length, courseId, coursesContent, id, router]);

  useEffect(() => {
    if (cardIds.length) setCourseIds(cardIds);
  }, [cardIds, setCourseIds]);

  useEffect(() => {
    if (!cardIds.length) return;
    hydrateDetails();
  }, [cardIds.length, hydrateDetails]);

  const courseTitle = (cardSection.title as string) || courseId;

  return (
    <DashboardShell
      pageTitle={`Course detail – ${courseTitle}`}
      isDirty={isDirty}
      isSaving={isSaving}
      onSave={saveContent}
      onReset={async () => resetCourse(courseId)}
    >
      <CourseDetailEditor courseId={courseId} />
    </DashboardShell>
  );
}

