"use client";

import React from "react";
import Image from "next/image";
import styles from "./CourseDetailHero.module.scss";
import CalendarIcon from "@/app/components/icons/CalendarIcon";
import { useCourseDetailContentStore, detailSectionId } from "@/app/features/dashboard/stores/useCourseDetailContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";

interface CourseDetailHeroProps {
  courseId: string;
}

const CourseDetailHero = React.memo(function CourseDetailHero({
  courseId,
}: CourseDetailHeroProps) {
  const section = useLocalizedContent(
    useCourseDetailContentStore((s) => s.getSection(detailSectionId(courseId, "hero")))
  );

  const title = (section.title as string) || "/Marketing\n[→] Essentials";
  const ctaText = (section.ctaText as string) || "Sign up now";
  const duration = (section.duration as string) || "2 hours/class";
  const nextLabel = (section.nextAvailableLabel as string) || "Next available:";
  const nextValue = (section.nextAvailableValue as string) || "Jan 14, 2026";
  const imageTopCenter = (section.imageTopCenter as string) || "/images/courses/mar-7.jpg";
  const imageTopRight = (section.imageTopRight as string) || "/images/courses/mar-5.jpg";
  const imageBottomLeft = (section.imageBottomLeft as string) || "/images/courses/mar-6.jpg";
  const imageBottomRight = (section.imageBottomRight as string) || "/images/courses/mar-4.jpg";

  const [line1, line2] = title.split("\n");

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
              src={imageTopCenter}
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
              src={imageTopRight}
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
                <span className={styles.label}>{nextLabel}</span>
                <span className={styles.value}>{nextValue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Middle Row Items --- */}
        {/* A-3: Couch Image */}
        <div className={`${styles.gridCell} ${styles.couchImageCell}`}>
          <div className={styles.imageBottomLeft}>
            <Image
              src={imageBottomLeft}
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
            {line1 || "/Marketing"}
            <br />
            {line2 ? (
              <>
                <span className={styles.bracketArrow}>[→]</span>{" "}
                {line2.replace("[→]", "").trim()}
              </>
            ) : (
              <>
                <span className={styles.bracketArrow}>[→]</span> Essentials
              </>
            )}
          </h1>
          <button className={styles.ctaButton}>
            <span>{ctaText}</span>
          </button>
        </div>

        {/* C-3: Info Text (Duration only) */}
        <div className={`${styles.gridCell} ${styles.durationCell}`}>
          <div className={styles.infoGroup}>
            <div className={styles.duration}>{duration}</div>
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
              src={imageBottomRight}
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
