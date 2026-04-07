"use client";

import { useEffect } from "react";
import { useCourseDetailContentStore } from "../stores/useCourseDetailContentStore";
import { useCoursesContentStore } from "../stores/useCoursesContentStore";

export default function CourseDetailContentHydrator() {
  const hydrateDetails = useCourseDetailContentStore((s) => s.hydrate);
  const setCourseIds = useCourseDetailContentStore((s) => s.setCourseIds);
  const detailHydrated = useCourseDetailContentStore((s) => s.isRemoteHydrated);
  const cardIds = useCoursesContentStore((s) => s.cardIds);
  const hydrateCourses = useCoursesContentStore((s) => s.hydrate);

  useEffect(() => {
    hydrateCourses();
  }, [hydrateCourses]);

  useEffect(() => {
    // For public pages, server bootstrap may only include one course's detail sections.
    // Only expand to all cards if we didn't get a pre-seeded subset.
    const existing = useCourseDetailContentStore.getState().courseIds;
    if (existing?.length) return;
    if (cardIds.length) setCourseIds(cardIds);
  }, [cardIds, setCourseIds]);

  useEffect(() => {
    if (!cardIds.length) return;
    if (detailHydrated) return;
    hydrateDetails();
  }, [cardIds.length, detailHydrated, hydrateDetails]);

  return null;
}
