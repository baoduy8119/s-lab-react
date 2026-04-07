"use client";

import DashboardShell from "@/app/features/dashboard/components/DashboardShell";
import CoursesEditor from "@/app/features/dashboard/components/CoursesEditor";
import { useCoursesContentStore } from "@/app/features/dashboard/stores/useCoursesContentStore";
import { useLanguageStore } from "@/app/features/dashboard/stores/useLanguageStore";
import { useTranslations } from "@/app/features/dashboard/i18n/translations";

export default function DashboardCoursesPage() {
  const isContentReady = useCoursesContentStore((s) => s.isRemoteHydrated);
  const isDirty = useCoursesContentStore((s) => s.isDirty);
  const isSaving = useCoursesContentStore((s) => s.isSaving);
  const saveContent = useCoursesContentStore((s) => s.saveContent);
  const resetContent = useCoursesContentStore((s) => s.resetContent);
  const locale = useLanguageStore((s) => s.locale);
  const tt = useTranslations(locale);

  return (
    <DashboardShell
      pageTitle={tt.pageCourses}
      isDirty={isDirty}
      isSaving={isSaving}
      onSave={saveContent}
      onReset={resetContent}
      isContentReady={isContentReady}
    >
      <CoursesEditor />
    </DashboardShell>
  );
}
