"use client";

import { useMemo } from "react";
import { useLanguageStore } from "../features/dashboard/stores/useLanguageStore";
import type { SectionContent, HomepageContent } from "../features/dashboard/types/content";

function localizeSection(section: SectionContent): SectionContent {
  const result: SectionContent = {};
  for (const key of Object.keys(section)) {
    if (key.endsWith("_vi")) continue;
    const viKey = `${key}_vi`;
    const viVal = section[viKey];
    result[key] = viVal && viVal.trim() ? viVal : section[key];
  }
  return result;
}

export function useLocalizedContent(content: SectionContent): SectionContent {
  const locale = useLanguageStore((s) => s.locale);
  return useMemo(
    () => (locale === "en" ? content : localizeSection(content)),
    [content, locale]
  );
}

export function useLocalizedFullContent(content: HomepageContent): HomepageContent {
  const locale = useLanguageStore((s) => s.locale);
  return useMemo(() => {
    if (locale === "en") return content;
    const result: HomepageContent = {};
    for (const sectionKey of Object.keys(content)) {
      result[sectionKey] = localizeSection(content[sectionKey]);
    }
    return result;
  }, [content, locale]);
}
