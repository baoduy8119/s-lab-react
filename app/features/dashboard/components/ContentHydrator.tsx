"use client";

import { useEffect } from "react";
import { useHomeContentStore } from "../stores/useHomeContentStore";

export default function ContentHydrator() {
  const hydrate = useHomeContentStore((s) => s.hydrate);
  const isRemoteHydrated = useHomeContentStore((s) => s.isRemoteHydrated);

  useEffect(() => {
    if (isRemoteHydrated) return;
    hydrate();
  }, [hydrate, isRemoteHydrated]);

  return null;
}
