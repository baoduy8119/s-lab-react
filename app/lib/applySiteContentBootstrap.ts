import type { SiteContentBootstrapPayload } from "@/app/lib/buildSiteContentBootstrapPayload";
import { setContentMergeBase } from "@/app/lib/contentApi";
import { useHomeContentStore } from "@/app/features/dashboard/stores/useHomeContentStore";
import { useFooterContentStore } from "@/app/features/dashboard/stores/useFooterContentStore";
import { useCoursesContentStore } from "@/app/features/dashboard/stores/useCoursesContentStore";
import { useTheSlabContentStore } from "@/app/features/dashboard/stores/useTheSlabContentStore";
import { useSLibraryContentStore } from "@/app/features/dashboard/stores/useSLibraryContentStore";
import { useCourseDetailContentStore } from "@/app/features/dashboard/stores/useCourseDetailContentStore";

/** Applies server-fetched merged content before paint (call from SiteContentBootstrap during render). */
export function applySiteContentBootstrap(payload: SiteContentBootstrapPayload): void {
  if (payload.homepage) {
    useHomeContentStore.setState({
      content: payload.homepage,
      isDirty: false,
      isRemoteHydrated: true,
    });
    setContentMergeBase("homepage", payload.homepage);
  }
  if (payload.footer) {
    useFooterContentStore.setState({
      content: payload.footer,
      isDirty: false,
      isRemoteHydrated: true,
    });
    setContentMergeBase("footer", payload.footer);
  }
  if (payload.courses) {
    useCoursesContentStore.setState({
      content: payload.courses.content,
      courseIds: payload.courses.courseIds,
      cardIds: payload.courses.cardIds,
      isDirty: false,
      isRemoteHydrated: true,
    });
    setContentMergeBase("courses", {
      courseIds: payload.courses.courseIds,
      cardIds: payload.courses.cardIds,
      content: payload.courses.content,
    });
  }
  if (payload.courseDetails) {
    // Also ensure courseIds align to courses' cardIds when present.
    const courseIds =
      payload.courseDetailsCourseIds ??
      payload.courses?.cardIds ??
      useCourseDetailContentStore.getState().courseIds;
    useCourseDetailContentStore.setState({
      content: payload.courseDetails,
      courseIds,
      isDirty: false,
      isRemoteHydrated: true,
    });
    setContentMergeBase("courseDetails", {
      courseIds,
      content: payload.courseDetails,
    });
  }
  if (payload.theSlab) {
    useTheSlabContentStore.setState({
      content: payload.theSlab,
      isDirty: false,
      isRemoteHydrated: true,
    });
    setContentMergeBase("the-s-lab", payload.theSlab);
  }
  if (payload.slibrary) {
    useSLibraryContentStore.setState({
      content: payload.slibrary,
      isDirty: false,
      isRemoteHydrated: true,
    });
    setContentMergeBase("slibrary", payload.slibrary);
  }
}
