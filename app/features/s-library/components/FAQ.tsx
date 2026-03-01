"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import StickyBox from "react-sticky-box";
import styles from "./FAQ.module.scss";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import Container from "@/app/components/Container";
import { useSLibraryContentStore } from "@/app/features/dashboard/stores/useSLibraryContentStore";

const FAQ = React.memo(function FAQ() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [openIndex, setOpenIndex] = useState<number>(0);
  const c = useSLibraryContentStore((s) => s.content.slibFaq);

  const headingLines = c.heading.split("\n");

  const faqs = useMemo(
    () => [
      { question: c.q1, answer: c.a1 },
      { question: c.q2, answer: c.a2 },
      { question: c.q3, answer: c.a3 },
      { question: c.q4, answer: c.a4 },
      { question: c.q5, answer: c.a5 },
      { question: c.q6, answer: c.a6 },
      { question: c.q7, answer: c.a7 },
      { question: c.q8, answer: c.a8 },
      { question: c.q9, answer: c.a9 },
    ],
    [c]
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const titleContent = (
    <h2 className={styles.title}>
      {headingLines.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < headingLines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </h2>
  );

  const imageContent = (
    <div className={styles.imageContainer}>
      <Image
        src={c.faqImage}
        alt="FAQ"
        fill
        style={{ objectFit: "cover" }}
        unoptimized={c.faqImage.startsWith("data:")}
      />
    </div>
  );

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.container}>
          {isMobile ? (
            <div>
              {titleContent}
              {imageContent}
            </div>
          ) : (
            <StickyBox offsetTop={120} offsetBottom={20}>
              {titleContent}
              {imageContent}
            </StickyBox>
          )}

          <div className={styles.faqContainer}>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
                    <h3 className={styles.questionText}>{faq.question}</h3>
                    <button
                      className={`${styles.toggleButton} ${openIndex !== index ? styles.active : ""}`}
                    >
                      {openIndex === index ? (
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

                  <div className={`${styles.faqAnswer} ${openIndex === index ? styles.open : ""}`}>
                    <div className={styles.answerInner}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>

                  {index < faqs.length - 1 && <div className={styles.divider} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});
FAQ.displayName = "FAQ";

export default FAQ;
