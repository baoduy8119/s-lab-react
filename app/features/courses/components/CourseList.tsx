"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import SectionHeader from "@/app/components/SectionHeader";
import StickyBox from "react-sticky-box";
import styles from "./CourseList.module.scss";
import Container from "@/app/components/Container";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { useCoursesContentStore } from "@/app/features/dashboard/stores/useCoursesContentStore";

interface CourseItem {
  id: string;
  name: string;
  duration: string;
  price: string;
  oldPrice: string;
  features: string[];
  availability: string;
}

const CourseList = React.memo(function CourseList() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const general = useCoursesContentStore((s) => s.content.courseListGeneral);
  const courseIds = useCoursesContentStore((s) => s.courseIds);
  const content = useCoursesContentStore((s) => s.content);

  const courses: CourseItem[] = useMemo(
    () =>
      courseIds
        .map((id) => {
          const c = content[id];
          if (!c) return null;
          return {
            id,
            name: (c.name as string) ?? "",
            duration: (c.duration as string) ?? "",
            price: (c.price as string) ?? "",
            oldPrice: (c.oldPrice as string) ?? "",
            features: ((c.features as string) ?? "").split("\n").filter(Boolean),
            availability: (c.availability as string) ?? "",
          };
        })
        .filter((c): c is CourseItem => c !== null),
    [courseIds, content]
  );

  const leftContent = (
    <div className={styles.leftContent}>
      <SectionHeader title={general.heading} />
      <p className={styles.description}>{general.description}</p>
      <div className={styles.visualDivider}>
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className={styles.dividerLine}
            style={{ opacity: i % 3 === 0 || i % 4 === 1 ? 1 : 0.4 }}
          ></span>
        ))}
      </div>

      <div className={styles.socialProof}>
        <div className={styles.avatarGroup}>
          <Image src="/images/avar-1.png" alt="User Avatar 1" width={48} height={48} className={styles.avatar} />
          <Image src="/images/avar-2.png" alt="User Avatar 2" width={48} height={48} className={styles.avatar} />
          <Image src="/images/avar-3.png" alt="User Avatar 3" width={48} height={48} className={styles.avatar} />
        </div>
        <div className={styles.socialText}>
          <div className={styles.ratingRow}>
            <div className={styles.stars}>★★★★★</div>
            <span className={styles.ratingScore}>{general.rating}</span>
          </div>
          <p className={styles.socialDesc}>{general.socialProof}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.container}>
          {isMobile ? leftContent : (
            <StickyBox className={styles.leftContent} offsetTop={100} offsetBottom={20}>
              {leftContent}
            </StickyBox>
          )}

          <div className={styles.rightContent}>
            <div className={styles.courseList}>
              {courses.map((course) => (
                <div key={course.id} className={styles.courseItem}>
                  <div className={styles.courseHeader}>
                    <h3 className={styles.courseTitle}>/{course.name}</h3>
                    <p className={styles.duration}>{course.duration}</p>
                    <div className={styles.priceWrapper}>
                      {course.oldPrice && (
                        <span className={styles.oldPrice}>{course.oldPrice}</span>
                      )}
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
                      <span
                        style={{ backgroundColor: course.name.includes("Decision") ? "#EF4444" : "#000000" }}
                        className={styles.btnBg}
                      ></span>
                      <span className={styles.btnText}>{general.registerBtn}</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 11L11 1M11 1H4M11 1V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <div className={styles.availability}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: "8px" }}>
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="#111827" strokeWidth="2" />
                        <path d="M16 2V6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 2V6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 10H21" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {course.availability}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});

CourseList.displayName = "CourseList";

export default CourseList;
