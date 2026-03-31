"use client";

import React, { useMemo } from "react";
import SectionEditor from "./SectionEditor";
import FaqListEditor from "./FaqListEditor";
import TestimonialSliderItemsEditor from "./TestimonialSliderItemsEditor";
import TestimonialsListItemsEditor from "./TestimonialsListItemsEditor";
import {
  buildCourseDetailSectionConfigs,
  useCourseDetailContentStore,
} from "../stores/useCourseDetailContentStore";

interface CourseDetailEditorProps {
  courseId: string;
}

const CourseDetailEditor = React.memo(function CourseDetailEditor({
  courseId,
}: CourseDetailEditorProps) {
  const content = useCourseDetailContentStore((s) => s.content);
  const updateField = useCourseDetailContentStore((s) => s.updateField);
  const deleteFields = useCourseDetailContentStore((s) => s.deleteFields);
  const resetSection = useCourseDetailContentStore((s) => s.resetSection);

  const sections = useMemo(
    () => buildCourseDetailSectionConfigs(courseId),
    [courseId]
  );

  return (
    <div>
      {sections.map((section) => {
        const isNeedToKnow = section.id.endsWith("__needToKnow");
        const isTestimonialSlider = section.id.endsWith("__testimonialSlider");
        const isTestimonialsList = section.id.endsWith("__testimonialsList");

        const extra = isNeedToKnow ? (
          <FaqListEditor
            sectionId={section.id}
            content={content[section.id] ?? {}}
            updateField={updateField}
            deleteFields={deleteFields}
            title="FAQs"
          />
        ) : isTestimonialSlider ? (
          <TestimonialSliderItemsEditor
            sectionId={section.id}
            content={content[section.id] ?? {}}
            updateField={updateField}
            deleteFields={deleteFields}
          />
        ) : isTestimonialsList ? (
          <TestimonialsListItemsEditor
            sectionId={section.id}
            content={content[section.id] ?? {}}
            updateField={updateField}
            deleteFields={deleteFields}
          />
        ) : null;

        return (
          <div key={section.id}>
            <SectionEditor
              config={section}
              content={content[section.id] ?? {}}
              updateField={updateField}
              resetSection={resetSection}
              extra={extra}
            />
          </div>
        );
      })}
    </div>
  );
});

CourseDetailEditor.displayName = "CourseDetailEditor";

export default CourseDetailEditor;

