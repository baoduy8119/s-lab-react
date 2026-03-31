"use client";

import DashboardShell from "@/app/features/dashboard/components/DashboardShell";
import HomepageEditor from "@/app/features/dashboard/components/HomepageEditor";
import { useHomeContentStore } from "@/app/features/dashboard/stores/useHomeContentStore";
import { useLanguageStore } from "@/app/features/dashboard/stores/useLanguageStore";
import { useTranslations } from "@/app/features/dashboard/i18n/translations";

export default function DashboardPage() {
  const isDirty = useHomeContentStore((s) => s.isDirty);
  const isSaving = useHomeContentStore((s) => s.isSaving);
  const saveContent = useHomeContentStore((s) => s.saveContent);
  const resetContent = useHomeContentStore((s) => s.resetContent);
  const locale = useLanguageStore((s) => s.locale);
  const tt = useTranslations(locale);

  return (
    <DashboardShell
      pageTitle={tt.pageHomepage}
      isDirty={isDirty}
      isSaving={isSaving}
      onSave={saveContent}
      onReset={resetContent}
    >
      <HomepageEditor />
    </DashboardShell>
  );
}
