"use client";

import React from "react";
import Link from "next/link";
import styles from "./RelatedCourses.module.scss";
import Container from "@/app/components/Container";

interface CourseCard {
  id: number;
  title: string;
  duration: string;
  originalPrice: string;
  price: string;
  popular?: boolean;
  features: string[];
  buttonColor: "black" | "red";
  checkboxColor: "black" | "red";
  nextAvailable: string;
}

const courses: CourseCard[] = [
  {
    id: 1,
    title: "/Operations & Execution Systems",
    duration: "3-4 hours/class",
    originalPrice: "$150",
    price: "$100",
    popular: false,
    features: [
      "The S-LAB is where theory and practice",
      "The S-LAB is where theory and practice",
      "The S-LAB is where theory and practice",
      "The S-LAB is where theory and practice",
      "The S-LAB is where theory and practice"
    ],
    buttonColor: "black",
    checkboxColor: "black",
    nextAvailable: "Jan 14, 2026"
  },
  {
    id: 2,
    title: "/Decision Intelligence with Data & AI",
    duration: "3-4 hours/class",
    originalPrice: "$550",
    price: "$350",
    popular: true,
    features: [
      "The S-LAB is where theory and practice",
      "The S-LAB is where theory and practice",
      "The S-LAB is where theory and practice",
      "The S-LAB is where theory and practice",
      "The S-LAB is where theory and practice"
    ],
    buttonColor: "red",
    checkboxColor: "red",
    nextAvailable: "Jan 20, 2026"
  }
];

const RelatedCourses = React.memo(function RelatedCourses() {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.sectionHeading}>/Other related courses.</h2>

        <div className={styles.grid}>
          {courses.map((course) => (
            <div key={course.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>{course.title}</h3>
                </div>

                <div className={styles.metaRow}>
                  <span className={styles.duration}>{course.duration}</span>
                  {course.popular && <span className={styles.popularBadge}>Popular</span>}
                </div>

                <div className={styles.priceRow}>
                  <span className={styles.originalPrice}>{course.originalPrice}</span>
                  <span className={styles.price}>{course.price}</span>
                  <span className={styles.perPerson}>/person</span>
                </div>
              </div>

              <div className={styles.divider}></div>

              <ul className={styles.featuresList}>
                {course.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <div className={`${styles.checkbox} ${styles[course.checkboxColor]}`}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className={styles.featureText}>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.cardFooter}>
                <Link
                  href="#"
                  className={`${styles.registerBtn} ${styles[course.buttonColor]}`}
                >
                  Register now
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L11 1M11 1H3M11 1V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <div className={styles.nextDate}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 2.66669H3.33333C2.59695 2.66669 2 3.26364 2 4.00002V13.3334C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3334V4.00002C14 3.26364 13.403 2.66669 12.6667 2.66669Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.6667 1.33331V3.99998" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.33334 1.33331V3.99998" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.00001 6.66669H14" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Next available: <strong>{course.nextAvailable}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
});

RelatedCourses.displayName = "RelatedCourses";

export default RelatedCourses;
