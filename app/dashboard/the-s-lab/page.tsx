"use client";

import DashboardShell from "@/app/features/dashboard/components/DashboardShell";
import TheSlabEditor from "@/app/features/dashboard/components/TheSlabEditor";
import { useTheSlabContentStore } from "@/app/features/dashboard/stores/useTheSlabContentStore";
import { useLanguageStore } from "@/app/features/dashboard/stores/useLanguageStore";
import { useTranslations } from "@/app/features/dashboard/i18n/translations";

export default function DashboardTheSlabPage() {
  const isDirty = useTheSlabContentStore((s) => s.isDirty);
  const isSaving = useTheSlabContentStore((s) => s.isSaving);
  const saveContent = useTheSlabContentStore((s) => s.saveContent);
  const resetContent = useTheSlabContentStore((s) => s.resetContent);
  const locale = useLanguageStore((s) => s.locale);
  const tt = useTranslations(locale);

  return (
    <DashboardShell
      pageTitle={tt.pageTheSlab}
      isDirty={isDirty}
      isSaving={isSaving}
      onSave={saveContent}
      onReset={resetContent}
    >
      <TheSlabEditor />
    </DashboardShell>
  );
}
