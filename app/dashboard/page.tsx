"use client";

import DashboardShell from "@/app/features/dashboard/components/DashboardShell";
import HomepageEditor from "@/app/features/dashboard/components/HomepageEditor";
import { useHomeContentStore } from "@/app/features/dashboard/stores/useHomeContentStore";

export default function DashboardPage() {
  const isDirty = useHomeContentStore((s) => s.isDirty);
  const saveContent = useHomeContentStore((s) => s.saveContent);
  const resetContent = useHomeContentStore((s) => s.resetContent);

  return (
    <DashboardShell
      pageTitle="Homepage Content"
      isDirty={isDirty}
      onSave={saveContent}
      onReset={resetContent}
    >
      <HomepageEditor />
    </DashboardShell>
  );
}
