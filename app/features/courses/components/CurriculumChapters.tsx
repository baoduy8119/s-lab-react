"use client";

import React, { useState } from "react";
import styles from "./CurriculumChapters.module.scss";

interface ChapterContent {
  title: string;
  subtitle?: string;
  bulletPoints: string[];
}

interface Chapter {
  id: number;
  week: string;
  title: string;
  time: string;
  content: ChapterContent;
}

const chaptersData: Chapter[] = [
  {
    id: 1,
    week: "WEEK 01",
    title: "Marketing System Overview",
    time: "Time",
    content: {
      title: "Marketing System Overview",
      bulletPoints: [
        "Marketing system overview (Logic → Strategy → Execution → Measurement)",
        "Framework & Terminology"
      ]
    }
  },
  {
    id: 2,
    week: "WEEK 01",
    title: "Audience & Customer Insight",
    time: "Time",
    content: {
      title: "Audience & Customer Insight",
      subtitle: "Understand your customers",
      bulletPoints: [
        "Buyer journey mapping"
      ]
    }
  },
  {
    id: 3,
    week: "WEEK 01",
    title: "Positioning & Messaging",
    time: "Time",
    content: {
      title: "Positioning & Messaging",
      bulletPoints: [
        "Value proposition + differentiation",
        "Messaging house (core message, proof, tone)"
      ]
    }
  },
  {
    id: 4,
    week: "WEEK 01",
    title: "Channels & Execution Planning",
    time: "Time",
    content: {
      title: "Channels & Execution Planning",
      bulletPoints: [
        "Channel selection (own channels/paid/earned/community)",
        "Basic campaign plan + content planning"
      ]
    }
  }
];

const CurriculumChapters = React.memo(function CurriculumChapters() {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const toggleChapter = (chapterId: number) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  return (
    <section className={styles.curriculumSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Curriculum</h2>

        <div className={styles.chaptersContainer}>
          {chaptersData.map((chapter) => (
            <div key={chapter.id} className={styles.chapterCard}>
              {/* Chapter Header - Always Visible */}
              <div
                className={`${styles.chapterHeader} ${expandedChapter === chapter.id ? styles.expanded : ''}`}
                onClick={() => toggleChapter(chapter.id)}
              >
                <div className={styles.chapterInfo}>
                  <div className={styles.chapterMeta}>
                    <span className={styles.chapterNumber}>Chapter {chapter.id}</span>
                    <span className={styles.weekLabel}>{chapter.week}</span>
                  </div>
                  <h3 className={styles.chapterTitle}>{chapter.title}</h3>
                </div>

                <div className={styles.chapterRight}>
                  <span className={styles.timeLabel}>{chapter.time}</span>
                  <button
                    className={styles.expandButton}
                    aria-label={expandedChapter === chapter.id ? "Collapse chapter" : "Expand chapter"}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={expandedChapter === chapter.id ? styles.rotated : ''}
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Chapter Content - Expandable */}
              {expandedChapter === chapter.id && (
                <div className={styles.chapterContent}>
                  <h4 className={styles.contentTitle}>{chapter.content.title}</h4>
                  {chapter.content.subtitle && (
                    <p className={styles.contentSubtitle}>{chapter.content.subtitle}</p>
                  )}
                  <ul className={styles.bulletList}>
                    {chapter.content.bulletPoints.map((point, index) => (
                      <li key={index} className={styles.bulletItem}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

CurriculumChapters.displayName = "CurriculumChapters";

export default CurriculumChapters;
