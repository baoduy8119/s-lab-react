"use client";

import React from "react";
import Image from "next/image";
import styles from "./CourseDetailHero.module.scss";
import CalendarIcon from "@/app/components/icons/CalendarIcon";

interface CourseDetailHeroProps {
  courseId: string;
}

const CourseDetailHero = React.memo(function CourseDetailHero({ courseId }: CourseDetailHeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.gridContainer}>
        {/* --- Header Row --- */}
        <div className={`${styles.headerCell} ${styles.cellA}`}>A</div>
        <div className={`${styles.headerCell} ${styles.cellB}`} style={{ justifyContent: 'space-between' }}>
          B
          <span>(→.)</span>
        </div>
        <div className={`${styles.headerCell} ${styles.cellC}`}>
          C
          <div className={styles.dotIndicator} />
        </div>

        {/* --- Top Row Items --- */}
        {/* A-2: Logo */}
        <div className={`${styles.gridCell} ${styles.logoCell}`}>
          <div className={styles.logoGroup}>
            <span className={styles.logoText}>The S-Labs</span>
            <span className={styles.hash}>#</span>
          </div>
        </div>

        {/* B-2: Woman Image */}
        <div className={`${styles.gridCell} ${styles.womanImageCell}`}>
          <div className={styles.imageTopCenter}>
            <Image
              src="/images/courses/mar-7.jpg"
              alt="Marketing professional"
              fill
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.backgroundColor = '#d1d5db';
              }}
            />
          </div>
        </div>

        {/* C-2: Laptop Image & Date Block */}
        <div className={`${styles.gridCell} ${styles.laptopImageCell}`}>
          <div className={styles.imageTopRight}>
            <Image
              src="/images/courses/mar-5.jpg"
              alt="Marketing materials"
              fill
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.backgroundColor = '#d1d5db';
              }}
            />
          </div>

          <div className={styles.dateBlockWrapper}>
            <div className={styles.dateBlockOverlay}>
              <span className={styles.icon}><CalendarIcon /></span>
              <div className={styles.dateText}>
                <span className={styles.label}>Next available:</span>
                <span className={styles.value}>Jan 14, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Middle Row Items --- */}
        {/* A-3: Couch Image */}
        <div className={`${styles.gridCell} ${styles.couchImageCell}`}>
          <div className={styles.imageBottomLeft}>
            <Image
              src="/images/courses/mar-6.jpg"
              alt="Team collaboration"
              fill
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.backgroundColor = '#d1d5db';
              }}
            />
          </div>
        </div>

        {/* B-3: Title & Button */}
        <div className={`${styles.gridCell} ${styles.titleButtonCell}`}>
          <h1 className={styles.courseTitle}>
            /Marketing<br />
            <span className={styles.bracketArrow}>[→]</span> Essentials
          </h1>
          <button className={styles.ctaButton}>
            <span>Sign up now</span>
          </button>
        </div>

        {/* C-3: Info Text (Duration only) */}
        <div className={`${styles.gridCell} ${styles.durationCell}`}>
          <div className={styles.infoGroup}>
            <div className={styles.duration}>2 hours/class</div>
          </div>
        </div>

        {/* --- Bottom Row Items --- */}
        {/* A-4: Empty */}
        <div className={`${styles.gridCell} ${styles.emptyA}`} />

        {/* B-4: Empty */}
        <div className={`${styles.gridCell} ${styles.emptyB}`} />

        {/* C-4: Working Image */}
        <div className={`${styles.gridCell} ${styles.workingImageCell}`}>
          <div className={styles.imageBottomRight}>
            <Image
              src="/images/courses/mar-4.jpg"
              alt="Team working"
              fill
              onError={(e) => {
                e.currentTarget.style.backgroundColor = '#d1d5db';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

CourseDetailHero.displayName = "CourseDetailHero";

export default CourseDetailHero;
