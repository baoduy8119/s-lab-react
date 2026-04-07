"use client";

import DashboardShell from "@/app/features/dashboard/components/DashboardShell";
import SLibraryEditor from "@/app/features/dashboard/components/SLibraryEditor";
import { useSLibraryContentStore } from "@/app/features/dashboard/stores/useSLibraryContentStore";
import { useLanguageStore } from "@/app/features/dashboard/stores/useLanguageStore";
import { useTranslations } from "@/app/features/dashboard/i18n/translations";

export default function DashboardSLibraryPage() {
  const isContentReady = useSLibraryContentStore((s) => s.isRemoteHydrated);
  const isDirty = useSLibraryContentStore((s) => s.isDirty);
  const isSaving = useSLibraryContentStore((s) => s.isSaving);
  const saveContent = useSLibraryContentStore((s) => s.saveContent);
  const resetContent = useSLibraryContentStore((s) => s.resetContent);
  const locale = useLanguageStore((s) => s.locale);
  const tt = useTranslations(locale);

  return (
    <DashboardShell
      pageTitle={tt.pageSLibrary}
      isDirty={isDirty}
      isSaving={isSaving}
      onSave={saveContent}
      onReset={resetContent}
      isContentReady={isContentReady}
    >
      <SLibraryEditor />
    </DashboardShell>
  );
}
