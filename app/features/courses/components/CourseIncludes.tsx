"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CourseIncludes.module.scss";
import PolygonSection from "@/app/components/PolygonSection";
import Container from "@/app/components/Container";
import Marquee from "@/app/components/Marquee";
import {
  detailSectionId,
  useCourseDetailContentStore,
} from "@/app/features/dashboard/stores/useCourseDetailContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";

interface CourseIncludesProps {
  courseId: string;
}

const CourseIncludes = React.memo(function CourseIncludes({
  courseId,
}: CourseIncludesProps) {
  const section = useLocalizedContent(
    useCourseDetailContentStore((s) =>
      s.getSection(detailSectionId(courseId, "includes"))
    )
  );

  const bgImage = (section.bgImage as string) || "/images/courses/hero-bg.png";
  const badge = (section.badge as string) || "FOR YOU";
  const priceLabel = (section.priceLabel as string) || "Price:";
  const originalPrice = (section.originalPrice as string) || "";
  const earlyBirdText = (section.earlyBirdText as string) || "";
  const finalPrice = (section.finalPrice as string) || "";
  const includesTitle = (section.includesTitle as string) || "/Course includes:";
  const ctaHref = (section.ctaHref as string) || "#";
  const ctaText = (section.ctaText as string) || "Register now";
  const benefits = [
    {
      strong: (section.benefit1Strong as string) || "",
      text: (section.benefit1Text as string) || "",
    },
    {
      strong: (section.benefit2Strong as string) || "",
      text: (section.benefit2Text as string) || "",
    },
    {
      strong: (section.benefit3Strong as string) || "",
      text: (section.benefit3Text as string) || "",
    },
    {
      strong: (section.benefit4Strong as string) || "",
      text: (section.benefit4Text as string) || "",
    },
    {
      strong: (section.benefit5Strong as string) || "",
      text: (section.benefit5Text as string) || "",
    },
  ].filter((b) => b.strong || b.text);

  return (
    <PolygonSection topLeftCut={40}>
      <section className={styles.section}>
        {/* Background Image Overlay */}
        <div className={styles.bgOverlay}>
          <Image
            src={bgImage}
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
              <div className={styles.badge}>{badge}</div>

              <div className={styles.priceBlock}>
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>{priceLabel} </span>
                  <span className={styles.originalPrice}>{originalPrice}</span>
                </div>
                <p className={styles.earlyBirdText}>{earlyBirdText}</p>
                <h2 className={styles.finalPrice}>{finalPrice}</h2>
              </div>
            </div>

            {/* Right Column: Includes List */}
            <div className={styles.rightColumn}>
              <h3 className={styles.columnTitle}>{includesTitle}</h3>

              <ul className={styles.benefitList}>
                {benefits.map((b, idx) => (
                  <li key={idx} className={styles.benefitItem}>
                    <div className={styles.iconWrapper}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="20" height="20" rx="4" fill="white" />
                        <path
                          d="M6 10L9 13L14 7"
                          stroke="#111827"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className={styles.benefitText}>
                      {b.strong ? <strong>{b.strong}</strong> : null}{" "}
                      {b.text}
                    </p>
                  </li>
                ))}
              </ul>

              <Link href={ctaHref} className={styles.ctaButton}>
                {ctaText}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>

        {/* Marquee Footer Strip */}
        <Marquee className={styles.marqueeStrip} />
      </section>
    </PolygonSection>
  );
});

CourseIncludes.displayName = "CourseIncludes";

export default CourseIncludes;
