"use client";

import DashboardShell from "@/app/features/dashboard/components/DashboardShell";
import SLibraryEditor from "@/app/features/dashboard/components/SLibraryEditor";
import { useSLibraryContentStore } from "@/app/features/dashboard/stores/useSLibraryContentStore";

export default function DashboardSLibraryPage() {
  const isDirty = useSLibraryContentStore((s) => s.isDirty);
  const saveContent = useSLibraryContentStore((s) => s.saveContent);
  const resetContent = useSLibraryContentStore((s) => s.resetContent);

  return (
    <DashboardShell
      pageTitle="S-Library Content"
      isDirty={isDirty}
      onSave={saveContent}
      onReset={resetContent}
    >
      <SLibraryEditor />
    </DashboardShell>
  );
}
