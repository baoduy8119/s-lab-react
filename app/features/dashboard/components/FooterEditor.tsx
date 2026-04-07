"use client";

import React from "react";
import SectionEditor from "./SectionEditor";
import { footerSections, useFooterContentStore } from "../stores/useFooterContentStore";
import DashboardEditorLoading from "./DashboardEditorLoading";

const FooterEditor = React.memo(function FooterEditor() {
  const isRemoteHydrated = useFooterContentStore((s) => s.isRemoteHydrated);
  const content = useFooterContentStore((s) => s.content);
  const updateField = useFooterContentStore((s) => s.updateField);
  const resetSection = useFooterContentStore((s) => s.resetSection);

  if (!isRemoteHydrated) return <DashboardEditorLoading />;

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

