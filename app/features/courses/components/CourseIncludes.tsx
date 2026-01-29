"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CourseIncludes.module.scss";
import PolygonSection from "@/app/components/PolygonSection";
import Container from "@/app/components/Container";

const CourseIncludes = React.memo(function CourseIncludes() {
  return (
    <PolygonSection topLeftCut={40}>
      <section className={styles.section}>
        {/* Background Image Overlay */}
        <div className={styles.bgOverlay}>
          <Image
            src="/images/courses/course-includes-bg.jpg" // Using existing bg, assuming dark texture
            alt="Background"
            fill
            className={styles.bgImage}
            priority
          />
          <div className={styles.bgGradient}></div>
        </div>

        <Container className={styles.innerContainer}>
          <div className={styles.contentWrapper}>
            {/* Left Column: Pricing */}
            <div className={styles.leftColumn}>
              <div className={styles.badge}>FOR YOU</div>

              <div className={styles.priceBlock}>
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>Price: </span>
                  <span className={styles.originalPrice}>15.000.000 VND</span>
                </div>
                <p className={styles.earlyBirdText}>Early bird register before 1/11/2023</p>
                <h2 className={styles.finalPrice}>8.350.000 VND</h2>
              </div>
            </div>

            {/* Right Column: Includes List */}
            <div className={styles.rightColumn}>
              <h3 className={styles.columnTitle}>/Course includes:</h3>

              <ul className={styles.benefitList}>
                <li className={styles.benefitItem}>
                  <div className={styles.iconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="20" height="20" rx="4" fill="white" />
                      <path d="M6 10L9 13L14 7" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className={styles.benefitText}>
                    <strong>10 lessons cover</strong> a deep range of knowledge about digital marketing.
                  </p>
                </li>

                <li className={styles.benefitItem}>
                  <div className={styles.iconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="20" height="20" rx="4" fill="white" />
                      <path d="M6 10L9 13L14 7" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className={styles.benefitText}>
                    <strong>Mentorship</strong> for students' work in the class and even in real
                  </p>
                </li>

                <li className={styles.benefitItem}>
                  <div className={styles.iconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="20" height="20" rx="4" fill="white" />
                      <path d="M6 10L9 13L14 7" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className={styles.benefitText}>
                    <strong>Forever discount</strong> for events held by The S-LAB
                  </p>
                </li>

                <li className={styles.benefitItem}>
                  <div className={styles.iconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="20" height="20" rx="4" fill="white" />
                      <path d="M6 10L9 13L14 7" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className={styles.benefitText}>
                    <strong>Become a member</strong> in the S-Community
                  </p>
                </li>

                <li className={styles.benefitItem}>
                  <div className={styles.iconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="20" height="20" rx="4" fill="white" />
                      <path d="M6 10L9 13L14 7" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className={styles.benefitText}>
                    <strong>Completion certificate</strong>
                  </p>
                </li>
              </ul>

              <Link href="#" className={styles.ctaButton}>
                Register now
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>

        {/* Marquee Footer Strip */}
        <div className={styles.marqueeStrip}>
          <div className={styles.marqueeContent}>
            {Array(20).fill("THE S-LAB").map((text, i) => (
              <span key={i} className={styles.marqueeItem}>{text}</span>
            ))}
          </div>
        </div>
      </section>
    </PolygonSection>
  );
});

CourseIncludes.displayName = "CourseIncludes";

export default CourseIncludes;
