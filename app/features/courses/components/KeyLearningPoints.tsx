"use client";

import React from "react";
import Image from "next/image";
import styles from "./KeyLearningPoints.module.scss";
import Container from "@/app/components/Container";
import {
  detailSectionId,
  useCourseDetailContentStore,
} from "@/app/features/dashboard/stores/useCourseDetailContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";

const icons = [
  {
    iconSrc: "/images/courses/icons/document.svg",
    iconAlt: "Document Icon",
  },
  {
    iconSrc: "/images/courses/icons/shield.svg",
    iconAlt: "Shield Icon",
  },
  {
    iconSrc: "/images/courses/icons/puzzle.svg",
    iconAlt: "Puzzle Icon",
  },
  {
    iconSrc: "/images/courses/icons/lightbulb.svg",
    iconAlt: "Lightbulb Icon",
  },
  {
    iconSrc: "/images/courses/icons/rocket.svg",
    iconAlt: "Rocket Icon",
  }
];

interface KeyLearningPointsProps {
  courseId: string;
}

const KeyLearningPoints = React.memo(function KeyLearningPoints({
  courseId,
}: KeyLearningPointsProps) {
  const section = useLocalizedContent(
    useCourseDetailContentStore((s) =>
      s.getSection(detailSectionId(courseId, "keyLearning"))
    )
  );

  const heading = (section.heading as string) || "/Key Learning Points.";
  const points = [
    section.p1 as string,
    section.p2 as string,
    section.p3 as string,
    section.p4 as string,
    section.p5 as string,
  ].map((t) => (t ?? "").toString());

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.grid}>
          {icons.map((icon, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Image
                  src={icon.iconSrc}
                  alt={icon.iconAlt}
                  width={48}
                  height={48}
                  style={{ width: '48px', height: '48px' }}
                />
              </div>
              <p className={styles.cardText}>{points[index] ?? ""}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
});

KeyLearningPoints.displayName = "KeyLearningPoints";

export default KeyLearningPoints;
