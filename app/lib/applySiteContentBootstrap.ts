import type { SiteContentBootstrapPayload } from "@/app/lib/buildSiteContentBootstrapPayload";
import { useHomeContentStore } from "@/app/features/dashboard/stores/useHomeContentStore";
import { useFooterContentStore } from "@/app/features/dashboard/stores/useFooterContentStore";
import { useCoursesContentStore } from "@/app/features/dashboard/stores/useCoursesContentStore";
import { useTheSlabContentStore } from "@/app/features/dashboard/stores/useTheSlabContentStore";
import { useSLibraryContentStore } from "@/app/features/dashboard/stores/useSLibraryContentStore";
import { useCourseDetailContentStore } from "@/app/features/dashboard/stores/useCourseDetailContentStore";

/** Applies server-fetched merged content before paint (call from SiteContentBootstrap during render). */
export function applySiteContentBootstrap(payload: SiteContentBootstrapPayload): void {
  if (payload.homepage) {
    useHomeContentStore.setState({ content: payload.homepage, isDirty: false });
  }
  if (payload.footer) {
    useFooterContentStore.setState({ content: payload.footer, isDirty: false });
  }
  if (payload.courses) {
    useCoursesContentStore.setState({
      content: payload.courses.content,
      courseIds: payload.courses.courseIds,
      cardIds: payload.courses.cardIds,
      isDirty: false,
    });
  }
  if (payload.courseDetails) {
    // Also ensure courseIds align to courses' cardIds when present.
    const courseIds = payload.courses?.cardIds ?? useCourseDetailContentStore.getState().courseIds;
    useCourseDetailContentStore.setState({
      content: payload.courseDetails,
      courseIds,
      isDirty: false,
    });
  }
  if (payload.theSlab) {
    useTheSlabContentStore.setState({ content: payload.theSlab, isDirty: false });
  }
  if (payload.slibrary) {
    useSLibraryContentStore.setState({ content: payload.slibrary, isDirty: false });
  }
}
