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

interface FaqItem {
  question: string;
  answer: string;
}

interface TabData {
  label: string;
  layout: "list" | "split" | "faq";
  items?: ContentItem[]; // For "list" layout
  bullets?: string[];    // For "split" layout
  image?: string;        // For "split" layout
  faqItems?: FaqItem[];  // For "faq" layout
}

const tabsData: Record<TabType, TabData> = {
  who_its_for: {
    label: "Who it's for",
    layout: "list",
    items: [
      {
        title: "Students & Career Switchers",
        description: "You need a clear foundation and a structured roadmap—so you stop learning random tips and understand how marketing actually works.",
        imageSrc: "/images/courses/be-strong.jpg"
      },
      {
        title: "Early-career Marketers\n(Freshers/Juniors)",
        description: "You're doing tasks but lack a system—this course helps you connect goals → strategy → execution → basic measurement.",
        imageSrc: "/images/courses/marketing-essentials.png"
      },
      {
        title: "Founders & Non-Marketing\nProfessionals",
        description: "You need marketing clarity to make better decisions, manage teams/agencies, and evaluate performance without guesswork.",
        imageSrc: "/images/courses/mar-8.jpg"
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
    layout: "faq",
    image: "/images/slib/faq-image.png",
    faqItems: [
      {
        question: "Do I get templates and learning materials?",
        answer: "Yes. You’ll receive a set of practical templates and checklists (e.g., audience/ICP, messaging, channel plan, KPI tracker) to apply immediately."
      },
      {
        question: "How difficult is the course?",
        answer: "The course is designed to be accessible for beginners but deep enough for early-career professionals. We break down complex concepts into actionable steps."
      },
      {
        question: "How should I study to get the best results?",
        answer: "We recommend setting aside dedicated time each week, completing the practical exercises, and joining the community discussions."
      }
    ]
  }
};

const NeedToKnow = React.memo(function NeedToKnow() {
  const [activeTab, setActiveTab] = useState<TabType>("who_its_for");
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const currentTab = tabsData[activeTab];

  const toggleFAQ = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  return (
    <section className={styles.section}>
      <Container>
        {/* ... Header ... */}
        {/* ... Overview ... */}
        {/* ... Tabs ... */}
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

          <div className={styles.contentContainer}>
            {/* List Layout */}
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

            {/* Split Layout */}
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

            {/* FAQ Layout */}
            {currentTab.layout === "faq" && currentTab.faqItems && (
              <div className={styles.faqLayout}>
                <div className={styles.faqLeftContent}>
                  <h3 className={styles.faqTitle}>
                    Friendly Asked<br />Questions.
                  </h3>
                  {currentTab.image && (
                    <div className={styles.faqImageWrapper}>
                      <Image
                        src={currentTab.image}
                        alt="FAQ Illustration"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.faqList}>
                  {currentTab.faqItems.map((faq, index) => (
                    <div key={index} className={styles.faqItem}>
                      <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
                        <h3 className={styles.questionText}>{faq.question}</h3>
                        <button
                          className={`${styles.toggleButton} ${openFaqIndex !== index ? styles.active : ""}`}
                        >
                          {openFaqIndex === index ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M12 6V18M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className={`${styles.faqAnswer} ${openFaqIndex === index ? styles.open : ""}`}>
                        <div className={styles.answerInner}>
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
