"use client";

import React, { useMemo, useCallback } from "react";
import {
  staticSections,
  buildCourseSectionConfig,
  buildCardSectionConfig,
  useCoursesContentStore,
} from "../stores/useCoursesContentStore";
import SectionEditor from "./SectionEditor";
import styles from "./CoursesEditor.module.scss";

const CoursesEditor = React.memo(function CoursesEditor() {
  const content = useCoursesContentStore((s) => s.content);
  const courseIds = useCoursesContentStore((s) => s.courseIds);
  const cardIds = useCoursesContentStore((s) => s.cardIds);
  const updateField = useCoursesContentStore((s) => s.updateField);
  const resetSection = useCoursesContentStore((s) => s.resetSection);
  const addCourse = useCoursesContentStore((s) => s.addCourse);
  const removeCourse = useCoursesContentStore((s) => s.removeCourse);
  const addCard = useCoursesContentStore((s) => s.addCard);
  const removeCard = useCoursesContentStore((s) => s.removeCard);

  const courseSections = useMemo(
    () =>
      courseIds.map((id, idx) =>
        buildCourseSectionConfig(id, idx, content[id]?.name as string)
      ),
    [courseIds, content]
  );

  const cardSections = useMemo(
    () =>
      cardIds.map((id, idx) =>
        buildCardSectionConfig(id, idx, content[id]?.title as string)
      ),
    [cardIds, content]
  );

  const handleRemoveCourse = useCallback(
    (courseId: string, courseName: string) => {
      if (window.confirm(`Remove "${courseName}"? This cannot be undone.`)) {
        removeCourse(courseId);
      }
    },
    [removeCourse]
  );

  const handleRemoveCard = useCallback(
    (cardId: string, cardTitle: string) => {
      if (window.confirm(`Remove "${cardTitle}"? This cannot be undone.`)) {
        removeCard(cardId);
      }
    },
    [removeCard]
  );

  return (
    <div>
      {staticSections.map((section) => (
        <SectionEditor
          key={section.id}
          config={section}
          content={content[section.id] ?? {}}
          updateField={updateField}
          resetSection={resetSection}
        />
      ))}

      <div className={styles.courseGroup}>
        <div className={styles.courseGroupHeader}>
          <h3 className={styles.courseGroupTitle}>
            Courses ({courseIds.length})
          </h3>
          <button
            type="button"
            className={styles.addBtn}
            onClick={addCourse}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="8" y1="3" x2="8" y2="13" />
              <line x1="3" y1="8" x2="13" y2="8" />
            </svg>
            Add Course
          </button>
        </div>

        {courseSections.map((section) => (
          <div key={section.id} className={styles.dynamicItem}>
            <SectionEditor
              config={section}
              content={content[section.id] ?? {}}
              updateField={updateField}
              resetSection={resetSection}
            />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() =>
                handleRemoveCourse(
                  section.id,
                  (content[section.id]?.name as string) || section.title
                )
              }
              disabled={courseIds.length <= 1}
              title={
                courseIds.length <= 1
                  ? "At least one course is required"
                  : `Remove ${section.title}`
              }
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M1.5 3.5h11M5.5 6v4M8.5 6v4M2.5 3.5l.5 8a1 1 0 001 1h6a1 1 0 001-1l.5-8M4.5 3.5V2a1 1 0 011-1h3a1 1 0 011 1v1.5" />
              </svg>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className={styles.courseGroup}>
        <div className={styles.courseGroupHeader}>
          <h3 className={styles.courseGroupTitle}>
            Marketing Cards ({cardIds.length})
          </h3>
          <button
            type="button"
            className={styles.addBtn}
            onClick={addCard}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="8" y1="3" x2="8" y2="13" />
              <line x1="3" y1="8" x2="13" y2="8" />
            </svg>
            Add Card
          </button>
        </div>

        {cardSections.map((section) => (
          <div key={section.id} className={styles.dynamicItem}>
            <SectionEditor
              config={section}
              content={content[section.id] ?? {}}
              updateField={updateField}
              resetSection={resetSection}
            />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() =>
                handleRemoveCard(
                  section.id,
                  (content[section.id]?.title as string) || section.title
                )
              }
              disabled={cardIds.length <= 1}
              title={
                cardIds.length <= 1
                  ? "At least one card is required"
                  : `Remove ${section.title}`
              }
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M1.5 3.5h11M5.5 6v4M8.5 6v4M2.5 3.5l.5 8a1 1 0 001 1h6a1 1 0 001-1l.5-8M4.5 3.5V2a1 1 0 011-1h3a1 1 0 011 1v1.5" />
              </svg>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

CoursesEditor.displayName = "CoursesEditor";

export default CoursesEditor;
