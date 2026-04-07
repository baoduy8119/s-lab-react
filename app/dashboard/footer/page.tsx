"use client";

import DashboardShell from "@/app/features/dashboard/components/DashboardShell";
import FooterEditor from "@/app/features/dashboard/components/FooterEditor";
import { useFooterContentStore } from "@/app/features/dashboard/stores/useFooterContentStore";
import { useLanguageStore } from "@/app/features/dashboard/stores/useLanguageStore";
import { useTranslations } from "@/app/features/dashboard/i18n/translations";

export default function DashboardFooterPage() {
  const isContentReady = useFooterContentStore((s) => s.isRemoteHydrated);
  const isDirty = useFooterContentStore((s) => s.isDirty);
  const isSaving = useFooterContentStore((s) => s.isSaving);
  const saveContent = useFooterContentStore((s) => s.saveContent);
  const resetContent = useFooterContentStore((s) => s.resetContent);
  const locale = useLanguageStore((s) => s.locale);
  const tt = useTranslations(locale);

  return (
    <DashboardShell
      pageTitle={tt.pageFooter}
      isDirty={isDirty}
      isSaving={isSaving}
      onSave={saveContent}
      onReset={resetContent}
      isContentReady={isContentReady}
    >
      <FooterEditor />
    </DashboardShell>
  );
}

