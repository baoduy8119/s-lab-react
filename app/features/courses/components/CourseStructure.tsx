"use client";

import React from "react";
import styles from "./CourseStructure.module.scss";
import Container from "@/app/components/Container";
import {
  detailSectionId,
  useCourseDetailContentStore,
} from "@/app/features/dashboard/stores/useCourseDetailContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";

interface Chapter {
  id: string;
  number: number;
  title: string;
  theme: "light" | "dark";
  content: string[];
  time: string;
}

function splitLines(v: string): string[] {
  return v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

interface CourseStructureProps {
  courseId: string;
}

const CourseStructure = React.memo(function CourseStructure({
  courseId,
}: CourseStructureProps) {
  const section = useLocalizedContent(
    useCourseDetailContentStore((s) =>
      s.getSection(detailSectionId(courseId, "structure"))
    )
  );

  const heading = (section.heading as string) || "/Course Structure.";
  const chapters: Chapter[] = [1, 2, 3, 4, 5].map((n) => {
    const themeRaw = (section[`ch${n}Theme`] as string) || "light";
    const theme: "light" | "dark" = themeRaw === "dark" ? "dark" : "light";
    return {
      id: `ch${n}`,
      number: n,
      title: (section[`ch${n}Title`] as string) || "",
      theme,
      content: splitLines((section[`ch${n}Content`] as string) || ""),
      time: (section[`ch${n}Time`] as string) || "",
    };
  });

  const renderCard = (chapter: Chapter) => (
    <div key={chapter.id} className={`${styles.card} ${styles[`card${chapter.number}`]}`}>
      <div className={`${styles.header} ${styles[chapter.theme]}`}>
        <span className={styles.chapterNum}>Chapter {chapter.number}</span>
        <span className={styles.chapterTitle}>{chapter.title}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.contentList}>
          {chapter.content.map((item, idx) => (
            <p key={idx} className={styles.contentItem}>- {item}</p>
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.timeLabel}>Time</span>
          <span className={styles.timeValue}>{chapter.time}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.heading}>{heading}</h2>

        {/* Desktop View: Staggered columns */}
        <div className={styles.desktopLayout}>
          <div className={styles.column}>
            {renderCard(chapters[0])}
            {renderCard(chapters[3])}
          </div>
          <div className={`${styles.column} ${styles.colOffset1}`}>
            {renderCard(chapters[1])}
            {renderCard(chapters[4])}
          </div>
          <div className={`${styles.column} ${styles.colOffset2}`}>
            {renderCard(chapters[2])}
          </div>
        </div>

        {/* Mobile View: Sequential 1-5 */}
        <div className={styles.mobileLayout}>
          {chapters.map(renderCard)}
        </div>
      </Container>
    </section>
  );
});

CourseStructure.displayName = "CourseStructure";

export default CourseStructure;
