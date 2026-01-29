"use client";

import React from "react";
import Image from "next/image";
import styles from "./CourseDetailHero.module.scss";

interface CourseDetailHeroProps {
  courseId: string;
}

const CourseDetailHero = React.memo(function CourseDetailHero({ courseId }: CourseDetailHeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.gridContainer}>
        {/* --- Header Row --- */}
        <div className={styles.headerCell}>A</div>
        <div className={styles.headerCell}>B</div>
        <div className={styles.headerCell}>(→.)</div>
        <div className={styles.headerCell}>
          C
          <div className={styles.dotIndicator} />
        </div>

        {/* --- Top Row Items --- */}
        <div className={styles.gridCell} /> {/* A-2 Empty */}

        {/* B-2: Woman Image */}
        <div className={styles.gridCell}>
          <div className={styles.imageTopCenter}>
            <Image
              src="/images/courses/marketing-essentials.png"
              alt="Marketing professional"
              fill
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.backgroundColor = '#d1d5db';
              }}
            />
          </div>
        </div>

        <div className={styles.gridCell} /> {/* Arrow-2 Empty */}

        {/* C-2: Laptop Image */}
        <div className={styles.gridCell}>
          <div className={styles.imageTopRight}>
            <Image
              src="/images/courses/mar-3.png"
              alt="Marketing materials"
              fill
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.backgroundColor = '#d1d5db';
              }}
            />
          </div>
        </div>

        {/* --- Middle Row Items --- */}
        {/* A-3: Logo */}
        <div className={`${styles.gridCell} ${styles.cellCenterLeft}`}>
          <div className={styles.logoGroup}>
            <span>The S-Labs</span>
            <span className={styles.hash}>#</span>
          </div>
        </div>

        {/* B-3: Title */}
        <div className={`${styles.gridCell} ${styles.cellCenter}`}>
          <h1 className={styles.courseTitle}>
            /Marketing<br />
            <span className={styles.bracketArrow}>[→]</span> Essentials
          </h1>
        </div>

        <div className={styles.gridCell} /> {/* Arrow-3 Empty */}

        {/* C-3: Info Text */}
        <div className={`${styles.gridCell} ${styles.cellCenterLeft} ${styles.alignTop}`}>
          <div className={styles.infoGroup}>
            <div className={styles.dateBlock}>
              <span className={styles.icon}>📅</span>
              <div className={styles.dateText}>
                <span className={styles.label}>Next available:</span>
                <span className={styles.value}>Jan 14, 2026</span>
              </div>
            </div>
            <div className={styles.duration}>2 hours/class</div>
          </div>
        </div>

        {/* --- Bottom Row Items --- */}
        {/* A-4: Couch Image */}
        <div className={`${styles.gridCell} ${styles.noBorderBottom}`}>
          <div className={styles.imageBottomLeft}>
            <Image
              src="/images/courses/mar-1.png"
              alt="Team collaboration"
              fill
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.backgroundColor = '#d1d5db';
              }}
            />
          </div>
        </div>

        {/* B-4: Button */}
        <div className={`${styles.gridCell} ${styles.noBorderBottom} ${styles.cellTopCenter}`}>
          <button className={styles.ctaButton}>
            Sign up now
          </button>
        </div>

        <div className={`${styles.gridCell} ${styles.noBorderBottom}`} /> {/* Arrow-4 Empty */}

        {/* C-4: Working Image */}
        <div className={`${styles.gridCell} ${styles.noBorderBottom}`}>
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
