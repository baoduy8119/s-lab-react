"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./FAQ.module.scss";
import Container from "@/app/components/Container";

const FAQ = React.memo(function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs = [
    {
      question: "How do I purchase a course on S-Lab?",
      answer:
        "To purchase a course, simply navigate to the course catalog on the S-Lab website, select the course you're interested in, and click the \"Buy Now\" button. You'll be prompted to complete your payment information. Once the purchase is confirmed, you'll have immediate access to the course materials.",
    },
    {
      question: "Can I preview a course before purchasing?",
      answer: "Yes, you can preview select course materials before making a purchase.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, PayPal, and bank transfers.",
    },
    {
      question: "How long do I have access to a course after purchasing it?",
      answer: "You have lifetime access to all purchased courses.",
    },
    {
      question: "How can I track my progress in a course?",
      answer: "Your progress is automatically tracked and displayed on your dashboard.",
    },
    {
      question: "Can I interact with instructors or other students?",
      answer: "Yes, you can interact through our community forums and live Q&A sessions.",
    },
    {
      question: "Are there any assessments or certifications upon completing a course?",
      answer: "Yes, most courses include assessments and provide certificates upon completion.",
    },
    {
      question: "What should I do if I encounter technical issues with a course?",
      answer: "Please contact our support team at hello@theslab.agency for assistance.",
    },
    {
      question: "How can I make the most out of the courses I enroll in?",
      answer:
        "Stay consistent, participate in discussions, complete all assignments, and apply what you learn.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.container}>
          {/* Left Side - Image */}
          <div className={styles.imageContainer}>
            <Image
              src="/images/slib/faq-image.png"
              alt="FAQ"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Right Side - FAQ List */}
          <div className={styles.faqContainer}>
            <h2 className={styles.title}>
              /Frequently
              <br />
              asked questions.
            </h2>

            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
                    <h3 className={styles.questionText}>{faq.question}</h3>
                    <button
                      className={`${styles.toggleButton} ${openIndex !== index ? styles.active : ""
                        }`}
                    >
                      {openIndex === index ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M18 12H6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 6V18M18 12H6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {openIndex === index && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                    </div>
                  )}

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
