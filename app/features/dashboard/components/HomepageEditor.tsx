"use client";

import React from "react";
import {
  homepageSections,
  useHomeContentStore,
} from "../stores/useHomeContentStore";
import SectionEditor from "./SectionEditor";
import DashboardEditorLoading from "./DashboardEditorLoading";

const HomepageEditor = React.memo(function HomepageEditor() {
  const isRemoteHydrated = useHomeContentStore((s) => s.isRemoteHydrated);
  const content = useHomeContentStore((s) => s.content);
  const updateField = useHomeContentStore((s) => s.updateField);
  const resetSection = useHomeContentStore((s) => s.resetSection);

  if (!isRemoteHydrated) return <DashboardEditorLoading />;

  return (
    <div>
      {homepageSections.map((section) => (
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

HomepageEditor.displayName = "HomepageEditor";

export default HomepageEditor;
