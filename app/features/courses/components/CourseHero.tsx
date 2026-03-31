"use client";

import React from "react";
import Image from "next/image";
import styles from "./CourseHero.module.scss";
import SLabLogoWhite from "@/app/components/SLabLogoWhite";
import Container from "@/app/components/Container";
import { useCoursesContentStore } from "@/app/features/dashboard/stores/useCoursesContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";

const CourseHero = React.memo(function CourseHero() {
  const c = useLocalizedContent(useCoursesContentStore((s) => s.content.courseHero));

  const titleLines = c.title.split("\n");

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <div style={{ width: "100%", height: "100%", backgroundColor: "#333" }}>
          <Image
            src={c.heroImage}
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            unoptimized={c.heroImage.startsWith("data:")}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
      <div className={styles.patternOverlay}>
        <Image
          src="/images/pattern-frame-16.png"
          alt="Pattern"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <Container>
        <div className={styles.contentContainer}>
          <div className={styles.leftContent}>
            <div className={styles.logo}>
              <SLabLogoWhite />
            </div>
            <h1 className={styles.title}>
              {titleLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <p className={styles.subtitle}>{c.subtitle}</p>
          </div>

          <div className={styles.formContainer}>
            <h3 className={styles.formTitle}>{c.formTitle}</h3>

            <form>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder={c.placeholderName}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={c.placeholderEmail}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder={c.placeholderPhone}
                  className={styles.input}
                />
              </div>
              <div className={styles.row}>
                <div className={`${styles.formGroup} ${styles.rowField}`}>
                  <input
                    type="text"
                    name="career"
                    autoComplete="organization-title"
                    placeholder={c.placeholderCareer}
                    className={styles.input}
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.rowField}`}>
                  <input type="text" name="age" placeholder={c.placeholderAge} className={styles.input} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <textarea
                  name="needs"
                  placeholder={c.placeholderNeeds}
                  className={`${styles.input} ${styles.textarea}`}
                  rows={4}
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                {c.submitButton}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M5 4H12V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
});

CourseHero.displayName = "CourseHero";

export default CourseHero;
