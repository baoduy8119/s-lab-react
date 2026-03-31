"use client";

import { useEffect } from "react";
import { useCourseDetailContentStore } from "../stores/useCourseDetailContentStore";
import { useCoursesContentStore } from "../stores/useCoursesContentStore";

export default function CourseDetailContentHydrator() {
  const hydrateDetails = useCourseDetailContentStore((s) => s.hydrate);
  const setCourseIds = useCourseDetailContentStore((s) => s.setCourseIds);
  const cardIds = useCoursesContentStore((s) => s.cardIds);
  const hydrateCourses = useCoursesContentStore((s) => s.hydrate);

  useEffect(() => {
    hydrateCourses();
  }, [hydrateCourses]);

  useEffect(() => {
    if (cardIds.length) setCourseIds(cardIds);
  }, [cardIds, setCourseIds]);

  useEffect(() => {
    if (!cardIds.length) return;
    hydrateDetails();
  }, [cardIds.length, hydrateDetails]);

  return null;
}

