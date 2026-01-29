"use client";

import React from "react";
import styles from "./CourseStructure.module.scss";

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
  // Split data into 3 columns
  const col1 = [chapters[0], chapters[3]]; // Ch 1, 4
  const col2 = [chapters[1], chapters[4]]; // Ch 2, 5
  const col3 = [chapters[2]];              // Ch 3

  const renderCard = (chapter: Chapter) => (
    <div key={chapter.id} className={styles.card}>
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
      <div className={styles.container}>
        <h2 className={styles.heading}>/Course Structure.</h2>

        <div className={styles.columnsWrapper}>
          <div className={styles.column}>
            {col1.map(renderCard)}
          </div>
          <div className={`${styles.column} ${styles.colOffset1}`}>
            {col2.map(renderCard)}
          </div>
          <div className={`${styles.column} ${styles.colOffset2}`}>
            {col3.map(renderCard)}
          </div>
        </div>
      </div>
    </section>
  );
});

CourseStructure.displayName = "CourseStructure";

export default CourseStructure;
