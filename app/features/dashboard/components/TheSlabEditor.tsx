"use client";

import React from "react";
import {
  theSlabSections,
  useTheSlabContentStore,
} from "../stores/useTheSlabContentStore";
import SectionEditor from "./SectionEditor";
import DashboardEditorLoading from "./DashboardEditorLoading";

const TheSlabEditor = React.memo(function TheSlabEditor() {
  const isRemoteHydrated = useTheSlabContentStore((s) => s.isRemoteHydrated);
  const content = useTheSlabContentStore((s) => s.content);
  const updateField = useTheSlabContentStore((s) => s.updateField);
  const resetSection = useTheSlabContentStore((s) => s.resetSection);

  if (!isRemoteHydrated) return <DashboardEditorLoading />;

  return (
    <div>
      {theSlabSections.map((section) => (
        <SectionEditor
          key={section.id}
          config={section}
          content={content[section.id] ?? {}}
          updateField={updateField}
          resetSection={resetSection}
        />
      ))}
    </div>
  );
});

TheSlabEditor.displayName = "TheSlabEditor";

export default TheSlabEditor;
