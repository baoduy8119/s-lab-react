"use client";

import React from "react";
import SectionEditor from "./SectionEditor";
import { footerSections, useFooterContentStore } from "../stores/useFooterContentStore";

const FooterEditor = React.memo(function FooterEditor() {
  const content = useFooterContentStore((s) => s.content);
  const updateField = useFooterContentStore((s) => s.updateField);
  const resetSection = useFooterContentStore((s) => s.resetSection);

  return (
    <div>
      {footerSections.map((section) => (
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

FooterEditor.displayName = "FooterEditor";

export default FooterEditor;

