"use client";

import React from "react";
import SectionHeader from "@/app/components/SectionHeader";
import styles from "./CourseList.module.scss";

const CourseList = React.memo(function CourseList() {
  const courses = [
    {
      id: 1,
      name: "Operations & Execution Systems",
      duration: "2-4 hours/class",
      price: "$100",
      oldPrice: "$150",
      popular: false,
      features: [
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice"
      ],
      availability: "Next available: Jan 18.2026"
    },
    {
      id: 2,
      name: "Marketing Essentials",
      duration: "3 hours/class",
      price: "$250",
      oldPrice: "$350",
      popular: false,
      features: [
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice"
      ],
      availability: "Next available: Jun 10.2024"
    },
    {
      id: 3,
      name: "Decision Intelligence with Data & AI",
      duration: "2-4 hours/class",
      price: "$350",
      oldPrice: "$550",
      popular: true,
      features: [
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice"
      ],
      availability: "Next available: Jan 20.2026"
    },
    {
      id: 4,
      name: "DePIN / AI / Infra Overview",
      duration: "3-5 hours/class",
      price: "$250",
      oldPrice: "$350",
      popular: false,
      features: [
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice",
        "The S-LAB is where theory meet practice"
      ],
      availability: "Next available: Feb 1.2026"
    },
  ];

  return (
    <section className={styles.section}>
      <SectionHeader
        title="/Most choices courses."
      />
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <p className={styles.description}>
            The course is transparent, covering every stage of your development. No
            hidden fees. No long-term contracts.
          </p>
          <div className={styles.visualDivider}>
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className={styles.dividerLine} style={{ opacity: (i % 3 === 0 || i % 4 === 1) ? 1 : 0.4 }}></span>
            ))}
          </div>

          <div className={styles.socialProof}>
            <div className={styles.avatarGroup}>
              {/* Placeholder avatars using simple colored circles or images if available */}
              <div className={styles.avatar} style={{ background: '#D1D5DB' }}></div>
              <div className={styles.avatar} style={{ background: '#9CA3AF' }}></div>
              <div className={styles.avatar} style={{ background: '#6B7280' }}></div>
            </div>
            <div className={styles.socialText}>
              <div className={styles.ratingRow}>
                <div className={styles.stars}>★★★★★</div>
                <span className={styles.ratingScore}>4.9 / 5</span>
              </div>
              <p className={styles.socialDesc}>
                We've helped over <span className={styles.bold}>105+ people</span><br />
                achieve their goals — you could be the next one.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.courseList}>
            {courses.map((course) => (
              <div key={course.id} className={styles.courseItem}>
                <div className={styles.courseHeader}>
                  <h3 className={styles.courseTitle}>
                    /{course.name}
                  </h3>
                  <p className={styles.duration}>{course.duration}</p>
                  <div className={styles.priceWrapper}>
                    {course.oldPrice && <span className={styles.oldPrice}>{course.oldPrice}</span>}
                    <span className={styles.price}>{course.price}</span>
                    <span className={styles.perPerson}>/person</span>
                  </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.courseContent}>
                  <ul className={styles.featuresList}>
                    {course.features.map((feature, idx) => (
                      <li key={idx} className={styles.featureItem}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.checkIcon}>
                          <rect x="2" y="2" width="20" height="20" rx="6" fill="#111827" />
                          <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className={styles.registerButton}>
                    {/* Dynamic background color logic handled in SCSS or inline if needed, but keeping simple black for now as per snippet default */}
                    <span style={{ backgroundColor: course.name.includes("Decision") ? '#EF4444' : '#000000' }} className={styles.btnBg}></span>
                    <span className={styles.btnText}>Register now</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div className={styles.availability}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#111827" strokeWidth="2" />
                      <path d="M16 2V6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 2V6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 10H21" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Next available: <span className={styles.boldDate}>Jan 14, 2026</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

CourseList.displayName = "CourseList";

export default CourseList;
