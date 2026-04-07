"use client";

import React, { useMemo, useCallback } from "react";
import Link from "next/link";
import {
  staticSections,
  buildCourseSectionConfig,
  buildCardSectionConfig,
  useCoursesContentStore,
} from "../stores/useCoursesContentStore";
import { useLanguageStore } from "../stores/useLanguageStore";
import { useTranslations } from "../i18n/translations";
import SectionEditor from "./SectionEditor";
import DashboardEditorLoading from "./DashboardEditorLoading";
import styles from "./CoursesEditor.module.scss";
import { courseIdAndTitleToSlug } from "@/app/lib/courseSlugs";

const CoursesEditor = React.memo(function CoursesEditor() {
  const isRemoteHydrated = useCoursesContentStore((s) => s.isRemoteHydrated);
  const content = useCoursesContentStore((s) => s.content);
  const courseIds = useCoursesContentStore((s) => s.courseIds);
  const cardIds = useCoursesContentStore((s) => s.cardIds);
  const updateField = useCoursesContentStore((s) => s.updateField);
  const resetSection = useCoursesContentStore((s) => s.resetSection);
  const addCourse = useCoursesContentStore((s) => s.addCourse);
  const removeCourse = useCoursesContentStore((s) => s.removeCourse);
  const addCard = useCoursesContentStore((s) => s.addCard);
  const removeCard = useCoursesContentStore((s) => s.removeCard);
  const locale = useLanguageStore((s) => s.locale);
  const tt = useTranslations(locale);

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
      if (window.confirm(tt.removeCourseConfirm(courseName))) {
        removeCourse(courseId);
      }
    },
    [removeCourse, tt]
  );

  const handleRemoveCard = useCallback(
    (cardId: string, cardTitle: string) => {
      if (window.confirm(tt.removeCardConfirm(cardTitle))) {
        removeCard(cardId);
      }
    },
    [removeCard, tt]
  );

  if (!isRemoteHydrated) return <DashboardEditorLoading />;

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
            {tt.coursesCount(courseIds.length)}
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
            {tt.addCourse}
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
                  ? tt.atLeastOneCourse
                  : tt.removeTooltip(section.title)
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
              {tt.remove}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.courseGroup}>
        <div className={styles.courseGroupHeader}>
          <h3 className={styles.courseGroupTitle}>
            {tt.cardsCount(cardIds.length)}
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
            {tt.addCard}
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
            <div className={styles.cardActions}>
              <Link
                className={styles.detailLinkBtn}
                href={`/dashboard/courses/${courseIdAndTitleToSlug(section.id, (content[section.id]?.title as string) || "")}`}
              >
                Edit detail
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11L11 1M11 1H3M11 1V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

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
                    ? tt.atLeastOneCard
                    : tt.removeTooltip(section.title)
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
                {tt.remove}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

CoursesEditor.displayName = "CoursesEditor";

export default CoursesEditor;
