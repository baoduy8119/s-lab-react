"use client";

import React from "react";
import Image from "next/image";
import styles from "./KeyLearningPoints.module.scss";
import Container from "@/app/components/Container";

const points = [
  {
    iconSrc: "/images/courses/icons/document.svg",
    iconAlt: "Document Icon",
    text: "Understand modern marketing as a system: audience → positioning → channels → measurement"
  },
  {
    iconSrc: "/images/courses/icons/shield.svg",
    iconAlt: "Shield Icon",
    text: "Define an ideal customer profile (ICP) and map the buyer journey"
  },
  {
    iconSrc: "/images/courses/icons/puzzle.svg",
    iconAlt: "Puzzle Icon",
    text: "Craft clear positioning, value propositions, and core messaging"
  },
  {
    iconSrc: "/images/courses/icons/lightbulb.svg",
    iconAlt: "Lightbulb Icon",
    text: "Choose channels based on strategy—not trends—and plan execution basics"
  },
  {
    iconSrc: "/images/courses/icons/rocket.svg",
    iconAlt: "Rocket Icon",
    text: "Set meaningful KPIs and build a simple reporting/dashboard rhythm"
  }
];

const KeyLearningPoints = React.memo(function KeyLearningPoints() {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.heading}>/Key Learning Points.</h2>
        <div className={styles.grid}>
          {points.map((point, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Image
                  src={point.iconSrc}
                  alt={point.iconAlt}
                  width={48}
                  height={48}
                  style={{ width: '48px', height: '48px' }}
                />
              </div>
              <p className={styles.cardText}>{point.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
});

KeyLearningPoints.displayName = "KeyLearningPoints";

export default KeyLearningPoints;
