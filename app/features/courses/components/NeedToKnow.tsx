"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./NeedToKnow.module.scss";
import Container from "@/app/components/Container";
import StickyBox from "react-sticky-box";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import {
  detailSectionId,
  useCourseDetailContentStore,
} from "@/app/features/dashboard/stores/useCourseDetailContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";

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

function splitLines(v: string): string[] {
  return v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

interface NeedToKnowProps {
  courseId: string;
}

const NeedToKnow = React.memo(function NeedToKnow({ courseId }: NeedToKnowProps) {
  const section = useLocalizedContent(
    useCourseDetailContentStore((s) =>
      s.getSection(detailSectionId(courseId, "needToKnow"))
    )
  );

  const faqItems = useMemo(() => {
    const indices = new Set<number>();
    for (const k of Object.keys(section)) {
      const m = /^faq(\d+)Q$/.exec(k);
      if (!m) continue;
      const n = Number(m[1]);
      if (Number.isFinite(n) && n > 0) indices.add(n);
    }
    const sorted = Array.from(indices).sort((a, b) => a - b);
    return sorted
      .map((n) => ({
        question: (section[`faq${n}Q` as keyof typeof section] as string) || "",
        answer: (section[`faq${n}A` as keyof typeof section] as string) || "",
      }))
      .filter((x) => x.question || x.answer);
  }, [section]);

  const tabsData: Record<TabType, TabData> = {
    who_its_for: {
      label: (section.tab1Label as string) || "Who it's for",
      layout: "list",
      items: [
        {
          title: (section.tab1Item1Title as string) || "",
          description: (section.tab1Item1Desc as string) || "",
          imageSrc: (section.tab1Item1Image as string) || "",
        },
        {
          title: (section.tab1Item2Title as string) || "",
          description: (section.tab1Item2Desc as string) || "",
          imageSrc: (section.tab1Item2Image as string) || "",
        },
        {
          title: (section.tab1Item3Title as string) || "",
          description: (section.tab1Item3Desc as string) || "",
          imageSrc: (section.tab1Item3Image as string) || "",
        },
      ].filter((x) => x.title || x.description || x.imageSrc),
    },
    what_you_get: {
      label: (section.tab2Label as string) || "What you'll get",
      layout: "split",
      bullets: splitLines((section.tab2Bullets as string) || ""),
      image: (section.tab2Image as string) || "",
    },
    faqs: {
      label: (section.tab3Label as string) || "FAQs",
      layout: "faq",
      image: (section.tab3Image as string) || "",
      faqItems,
    },
  };

  const [activeTab, setActiveTab] = useState<TabType>("who_its_for");
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(faqItems.length > 0 ? 0 : -1);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const currentTab = tabsData[activeTab];

  const toggleFAQ = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  return (
    <section className={styles.section}>
      <Container>
        {/* ... Header ... */}
        <h2 className={styles.mainHeading} data-aos="fade-up">
          {((section.heading as string) || "/Your need-to-know\nabout this course.")
            .split("\n")
            .map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
        </h2>

        {/* ... Overview ... */}
        <div className={styles.overviewGrid} data-aos="fade-up" data-aos-delay="100">
          <h3 className={styles.overviewLabel}>
            {(section.overviewLabel as string) || "/Overview information"}
          </h3>
          <div className={styles.overviewText}>
            <p>
              {(section.overviewP1 as string) || ""}
            </p>
            <p>
              {(section.overviewP2 as string) || ""}
            </p>
          </div>
        </div>

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
                {isMobile ? (
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
                ) : (
                  <StickyBox className={styles.faqLeftContent} offsetTop={120} offsetBottom={20}>
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
                  </StickyBox>
                )}
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
