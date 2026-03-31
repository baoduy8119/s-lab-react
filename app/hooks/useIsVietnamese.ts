import { useMemo } from "react";
import { useLanguageStore } from "@/app/features/dashboard/stores/useLanguageStore";

export function useIsVietnamese(): boolean {
  const locale = useLanguageStore((s) => s.locale);
  return useMemo(() => locale === "vi", [locale]);
}

