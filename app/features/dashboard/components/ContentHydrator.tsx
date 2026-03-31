"use client";

import { useEffect } from "react";
import { useHomeContentStore } from "../stores/useHomeContentStore";

export default function ContentHydrator() {
  const hydrate = useHomeContentStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
