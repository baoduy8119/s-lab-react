"use client";

import React from "react";
import {
  theSlabSections,
  useTheSlabContentStore,
} from "../stores/useTheSlabContentStore";
import SectionEditor from "./SectionEditor";

const TheSlabEditor = React.memo(function TheSlabEditor() {
  const content = useTheSlabContentStore((s) => s.content);
  const updateField = useTheSlabContentStore((s) => s.updateField);
  const resetSection = useTheSlabContentStore((s) => s.resetSection);

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
