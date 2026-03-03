"use client";

import React from "react";
import Image from "next/image";
import styles from "./CourseHero.module.scss";
import SLabLogoWhite from "@/app/components/SLabLogoWhite";
import Container from "@/app/components/Container";
import { useCoursesContentStore } from "@/app/features/dashboard/stores/useCoursesContentStore";

const CourseHero = React.memo(function CourseHero() {
  const c = useCoursesContentStore((s) => s.content.courseHero);

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
                <input type="text" placeholder="Your career *" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <input type="email" placeholder="Email *" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <input type="tel" placeholder="Phone number *" className={styles.input} />
              </div>
              <div className={styles.row}>
                <div className={styles.formGroup} style={{ flex: 1 }}>
                  <input type="text" placeholder="Your career" className={styles.input} />
                </div>
                <div className={styles.formGroup} style={{ flex: 1 }}>
                  <input type="text" placeholder="Your age" className={styles.input} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <input type="text" placeholder="More about your need..." className={styles.input} />
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
