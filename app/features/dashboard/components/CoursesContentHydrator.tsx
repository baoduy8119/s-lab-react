"use client";

import { useEffect } from "react";
import { useCoursesContentStore } from "../stores/useCoursesContentStore";

export default function CoursesContentHydrator() {
  const hydrate = useCoursesContentStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
