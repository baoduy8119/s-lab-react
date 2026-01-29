"use client";

import React from "react";
import Image from "next/image";
import styles from "./CourseHero.module.scss";
import SLabLogoWhite from "@/app/components/SLabLogoWhite";

const CourseHero = React.memo(function CourseHero() {
  return (
    <section className={styles.heroSection}>
      {/* Background Image */}
      <div className={styles.heroBackground}>
        {/* Placeholder for the hero image - using a generic office/student image if available or color */}
        <div style={{ width: "100%", height: "100%", backgroundColor: "#333" }}>
          <Image
            src="/images/courses/hero-bg.jpg"
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            onError={(e) => {
              // Fallback if image not found
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>

      <div className={styles.contentContainer}>
        {/* Left Side */}
        <div className={styles.leftContent}>
          <div className={styles.logo}>
            {/* Logo Icon */}
            <SLabLogoWhite />
          </div>
          <h1 className={styles.title}>
            /The S-LAB<br />
            Programmes and<br />
            Courses
          </h1>
          <p className={styles.subtitle}>
            Learning goes beyond textbooks
          </p>
        </div>

        {/* Right Side - Form */}
        <div className={styles.formContainer}>
          <h3 className={styles.formTitle}>FILL FOR REGISTRATION</h3>

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
              Send your answer
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 4H12V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});

CourseHero.displayName = "CourseHero";

export default CourseHero;
