"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./NeedToKnow.module.scss";
import Container from "@/app/components/Container";

type TabType = "who_its_for" | "what_you_get" | "faqs";

interface ContentItem {
  title: string;
  description: string;
  imageSrc: string;
}

interface TabData {
  label: string;
  layout: "list" | "split";
  items?: ContentItem[]; // For "list" layout
  bullets?: string[];    // For "split" layout
  image?: string;        // For "split" layout
}

const tabsData: Record<TabType, TabData> = {
  who_its_for: {
    label: "Who it's for",
    layout: "list",
    items: [
      {
        title: "Students & Career Switchers",
        description: "You need a clear foundation and a structured roadmap—so you stop learning random tips and understand how marketing actually works.",
        imageSrc: "/images/courses/mar-1.png"
      },
      {
        title: "Early-career Marketers\n(Freshers/Juniors)",
        description: "You're doing tasks but lack a system—this course helps you connect goals → strategy → execution → basic measurement.",
        imageSrc: "/images/courses/marketing-essentials.png"
      },
      {
        title: "Founders & Non-Marketing\nProfessionals",
        description: "You need marketing clarity to make better decisions, manage teams/agencies, and evaluate performance without guesswork.",
        imageSrc: "/images/courses/mar-2.png"
      }
    ]
  },
  what_you_get: {
    label: "What you'll get",
    layout: "split",
    bullets: [
      "A clear end-to-end marketing framework (goals → strategy → execution → measurement)",
      "Practical tools to define audience, positioning, and messaging",
      "Guidance to choose the right channels and set basic KPIs",
      "Simple templates/checklists they can apply immediately to real projects"
    ],
    image: "/images/courses/september-pro.png"
  },
  faqs: {
    label: "FAQs",
    layout: "list",
    items: [] // Placeholder
  }
};

const NeedToKnow = React.memo(function NeedToKnow() {
  const [activeTab, setActiveTab] = useState<TabType>("who_its_for");
  const currentTab = tabsData[activeTab];

  return (
    <section className={styles.section}>
      <Container>
        {/* Header Section */}
        <h2 className={styles.mainHeading}>
          /Your need-to-know<br />
          about this course
        </h2>

        {/* Overview Section */}
        <div className={styles.overviewGrid}>
          <div className={styles.overviewLabel}>/Overview information</div>
          <div className={styles.overviewText}>
            <p>
              Today, marketing content is everywhere—but most learners are still piecing things together from scattered tips, random tools, and channel-by-channel tutorials. The result is common: you try a few tactics, feel busy, but struggle to explain why it works, what to do next, or how to measure progress.
            </p>
            <p>
              Marketing Essentials is necessary because it builds the foundation many people skip. It helps you understand how marketing actually works as a system—audience, positioning, channels, and measurement—so you can make smarter decisions, execute with clarity, and improve consistently. Instead of chasing trends, you leave with a structured framework you can apply to any project, role, or industry.
            </p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabList}>
            {(Object.keys(tabsData) as TabType[]).map((tabKey) => (
              <button
                key={tabKey}
                className={`${styles.tabButton} ${activeTab === tabKey ? styles.active : ""}`}
                onClick={() => setActiveTab(tabKey)}
              >
                {tabsData[tabKey].label}
              </button>
            ))}
          </div>

          {/* Content Section */}
          <div className={styles.contentContainer}>
            {/* List Layout (Who it's for) */}
            {currentTab.layout === "list" && currentTab.items && (
              <div className={styles.contentList}>
                {currentTab.items.map((item, index) => (
                  <div key={index} className={styles.contentRow}>
                    <div className={styles.rowTitle}>
                      {item.title.split('\n').map((line, i) => (
                        <span key={i} className={styles.titleLine}>{line}</span>
                      ))}
                    </div>
                    <div className={styles.rowDescription}>{item.description}</div>
                    <div className={styles.rowImageWrapper}>
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          e.currentTarget.style.backgroundColor = '#d1d5db';
                        }}
                      />
                    </div>
                  </div>
                ))}
                {currentTab.items.length === 0 && (
                  <div className={styles.emptyState}>Content coming soon.</div>
                )}
              </div>
            )}

            {/* Split Layout (What you'll get) */}
            {currentTab.layout === "split" && (
              <div className={styles.splitLayout}>
                <div className={styles.bulletList}>
                  {currentTab.bullets?.map((bullet, index) => (
                    <div key={index} className={styles.bulletItem}>
                      <span className={styles.bulletDash}>-</span>
                      <p className={styles.bulletText}>{bullet}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.splitImageWrapper}>
                  {currentTab.image && (
                    <Image
                      src={currentTab.image}
                      alt="Course Content Preview"
                      fill
                      style={{ objectFit: "contain", objectPosition: "right" }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
});

NeedToKnow.displayName = "NeedToKnow";

export default NeedToKnow;
