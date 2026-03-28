"use client";

import { useEffect } from "react";
import { useTheSlabContentStore } from "../stores/useTheSlabContentStore";

export default function TheSlabContentHydrator() {
  const hydrate = useTheSlabContentStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
