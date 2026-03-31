"use client";

import React from "react";
import {
  sLibrarySections,
  useSLibraryContentStore,
} from "../stores/useSLibraryContentStore";
import SectionEditor from "./SectionEditor";

const SLibraryEditor = React.memo(function SLibraryEditor() {
  const content = useSLibraryContentStore((s) => s.content);
  const updateField = useSLibraryContentStore((s) => s.updateField);
  const resetSection = useSLibraryContentStore((s) => s.resetSection);

  return (
    <div>
      {sLibrarySections.map((section) => (
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

SLibraryEditor.displayName = "SLibraryEditor";

export default SLibraryEditor;
