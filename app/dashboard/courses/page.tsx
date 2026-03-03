"use client";

import DashboardShell from "@/app/features/dashboard/components/DashboardShell";
import CoursesEditor from "@/app/features/dashboard/components/CoursesEditor";
import { useCoursesContentStore } from "@/app/features/dashboard/stores/useCoursesContentStore";

export default function DashboardCoursesPage() {
  const isDirty = useCoursesContentStore((s) => s.isDirty);
  const saveContent = useCoursesContentStore((s) => s.saveContent);
  const resetContent = useCoursesContentStore((s) => s.resetContent);

  return (
    <DashboardShell
      pageTitle="Courses Content"
      isDirty={isDirty}
      onSave={saveContent}
      onReset={resetContent}
    >
      <CoursesEditor />
    </DashboardShell>
  );
}
