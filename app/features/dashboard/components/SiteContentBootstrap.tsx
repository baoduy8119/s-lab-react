"use client";

import { useRef } from "react";
import type { SiteContentBootstrapPayload } from "@/app/lib/buildSiteContentBootstrapPayload";
import { applySiteContentBootstrap } from "@/app/lib/applySiteContentBootstrap";

/**
 * Seeds Zustand from Server Component–fetched content on first render so the initial
 * HTML matches the database (no flash of built-in defaults before client fetch).
 */
export default function SiteContentBootstrap({
  payload,
}: {
  payload: SiteContentBootstrapPayload;
}) {
  const applied = useRef(false);
  if (!applied.current) {
    applySiteContentBootstrap(payload);
    applied.current = true;
  }
  return null;
}
