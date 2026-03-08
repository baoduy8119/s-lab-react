"use client";

import React from "react";
import styles from "./CourseStructure.module.scss";
import Container from "@/app/components/Container";

interface Chapter {
  id: string;
  number: number;
  title: string;
  theme: "light" | "dark";
  content: string[];
  time: string;
}

const chapters: Chapter[] = [
  {
    id: "ch1",
    number: 1,
    title: "Marketing System Overview",
    theme: "light",
    content: [
      "How marketing works end-to-end (goals → strategy → execution → measurement)",
      "Key frameworks & terminology"
    ],
    time: "WEEK 01"
  },
  {
    id: "ch2",
    number: 2,
    title: "Audience & Customer Insight",
    theme: "dark",
    content: [
      "ICP definition + segmentation basics",
      "Buyer journey mapping"
    ],
    time: "WEEK 01"
  },
  {
    id: "ch3",
    number: 3,
    title: "Positioning & Messaging",
    theme: "light",
    content: [
      "Value proposition + differentiation",
      "Messaging house (core message, proof, tone)"
    ],
    time: "WEEK 01"
  },
  {
    id: "ch4",
    number: 4,
    title: "Channels & Execution Planning",
    theme: "light",
    content: [
      "Channel selection logic (organic/paid/owned/community)",
      "Basic campaign plan + content planning"
    ],
    time: "WEEK 01"
  },
  {
    id: "ch5",
    number: 5,
    title: "Measurement & Optimization Basics",
    theme: "dark",
    content: [
      "KPI selection + dashboard basics",
      "How to review results and iterate"
    ],
    time: "WEEK 01"
  }
];

const CourseStructure = React.memo(function CourseStructure() {
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
        <h2 className={styles.heading}>/Course Structure.</h2>

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
