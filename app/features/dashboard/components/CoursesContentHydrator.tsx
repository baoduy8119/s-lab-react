"use client";

import { useEffect } from "react";
import { useCoursesContentStore } from "../stores/useCoursesContentStore";

export default function CoursesContentHydrator() {
  const hydrate = useCoursesContentStore((s) => s.hydrate);
  const isRemoteHydrated = useCoursesContentStore((s) => s.isRemoteHydrated);

  useEffect(() => {
    if (isRemoteHydrated) return;
    hydrate();
  }, [hydrate, isRemoteHydrated]);

  return null;
}
