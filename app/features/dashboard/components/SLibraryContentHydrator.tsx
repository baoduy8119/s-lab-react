"use client";

import { useEffect } from "react";
import { useSLibraryContentStore } from "../stores/useSLibraryContentStore";

export default function SLibraryContentHydrator() {
  const hydrate = useSLibraryContentStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
