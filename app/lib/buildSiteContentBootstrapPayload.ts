import type { HomepageContent } from "@/app/features/dashboard/types/content";
import { loadSiteContentRows } from "@/app/lib/loadSiteContentRows";
import { mergeFooterFromSavedRows } from "@/app/features/dashboard/stores/useFooterContentStore";
import { mergeHomepageFromSaved } from "@/app/features/dashboard/stores/useHomeContentStore";
import { mergeTheSlabFromSaved } from "@/app/features/dashboard/stores/useTheSlabContentStore";
import { mergeSLibraryFromSaved } from "@/app/features/dashboard/stores/useSLibraryContentStore";
import {
  mergeCoursesFromSaved,
  type CoursesStoredData,
} from "@/app/features/dashboard/stores/useCoursesContentStore";
import {
  mergeCourseDetailsFromSaved,
  type CourseDetailStoredData,
} from "@/app/features/dashboard/stores/useCourseDetailContentStore";

export type SiteContentBootstrapPayload = {
  homepage?: HomepageContent;
  footer?: HomepageContent;
  courses?: ReturnType<typeof mergeCoursesFromSaved>;
  courseDetails?: HomepageContent;
  theSlab?: HomepageContent;
  slibrary?: HomepageContent;
};

const THE_SLAB = "the-s-lab";

export async function buildHomeSiteContentPayload(): Promise<SiteContentBootstrapPayload> {
  const rows = await loadSiteContentRows(["homepage", "footer", THE_SLAB]);
  return {
    homepage: mergeHomepageFromSaved(rows.homepage as HomepageContent | null),
    footer: mergeFooterFromSavedRows(rows.footer, rows.homepage, rows[THE_SLAB]),
  };
}

export async function buildCoursesSiteContentPayload(): Promise<SiteContentBootstrapPayload> {
  const rows = await loadSiteContentRows([
    "homepage",
    "footer",
    THE_SLAB,
    "courses",
    "courseDetails",
  ]);
  const courses = mergeCoursesFromSaved(
    rows.courses as CoursesStoredData | HomepageContent | null | undefined
  );
  return {
    homepage: mergeHomepageFromSaved(rows.homepage as HomepageContent | null),
    footer: mergeFooterFromSavedRows(rows.footer, rows.homepage, rows[THE_SLAB]),
    courses,
    courseDetails: mergeCourseDetailsFromSaved(
      rows.courseDetails as CourseDetailStoredData | HomepageContent | null | undefined,
      courses.cardIds
    ),
  };
}

export async function buildTheSlabSiteContentPayload(): Promise<SiteContentBootstrapPayload> {
  const rows = await loadSiteContentRows(["homepage", "footer", THE_SLAB]);
  return {
    homepage: mergeHomepageFromSaved(rows.homepage as HomepageContent | null),
    footer: mergeFooterFromSavedRows(rows.footer, rows.homepage, rows[THE_SLAB]),
    theSlab: mergeTheSlabFromSaved(rows[THE_SLAB] as HomepageContent | null),
  };
}

export async function buildSLibrarySiteContentPayload(): Promise<SiteContentBootstrapPayload> {
  const rows = await loadSiteContentRows(["homepage", "footer", THE_SLAB, "slibrary"]);
  return {
    homepage: mergeHomepageFromSaved(rows.homepage as HomepageContent | null),
    footer: mergeFooterFromSavedRows(rows.footer, rows.homepage, rows[THE_SLAB]),
    slibrary: mergeSLibraryFromSaved(rows.slibrary as HomepageContent | null),
  };
}

export async function buildFooterSiteContentPayload(): Promise<SiteContentBootstrapPayload> {
  const rows = await loadSiteContentRows(["footer", "homepage", THE_SLAB]);
  return {
    footer: mergeFooterFromSavedRows(rows.footer, rows.homepage, rows[THE_SLAB]),
  };
}
