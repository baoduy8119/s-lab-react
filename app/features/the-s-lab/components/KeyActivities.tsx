"use client";

import Image from "next/image";
import React from "react";
import styles from "./KeyActivities.module.scss";
import { useTheSlabContentStore } from "@/app/features/dashboard/stores/useTheSlabContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";

const KeyActivities = React.memo(function KeyActivities() {
  const c = useLocalizedContent(
    useTheSlabContentStore((s) => s.content.slabKeyActivities)
  );
  const activities = [
    {
      number: "/001/",
      title: c.item1Title,
      description: c.item1Description,
    },
    {
      number: "/002/",
      title: c.item2Title,
      description: c.item2Description,
      highlighted: true,
    },
    {
      number: "/003/",
      title: c.item3Title,
      description: c.item3Description,
    },
    {
      number: "/004/",
      title: c.item4Title,
      description: c.item4Description,
    },
  ];

  return (
    <section className={styles.section}>
      {/* Background Image with Content (Desktop Only) */}
      <div className={styles.backgroundWrapper}>
        <div className={styles.background}>
          <Image
            src={c.backgroundImage}
            alt="Key Activities Background"
            fill
            style={{ objectFit: "cover" }}
            unoptimized={c.backgroundImage.startsWith("data:")}
          />
        </div>

        <div className={styles.patternBg}>
          <Image
            src={c.patternImage}
            alt="Key Activities Background"
            fill
            style={{ objectFit: "cover" }}
            unoptimized={c.patternImage.startsWith("data:")}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title} data-aos="fade-up">{c.titleDesktop}</h2>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.playButton} data-aos="fade-up" data-aos-delay="200">{c.joinButtonText}</button>
          </div>
        </div>
      </div>

      <div className={styles.mobileHeader}>
        <h2 className={styles.mobileTitle} data-aos="fade-up">{c.titleMobile}</h2>
      </div>

      {/* Cards Grid */}
      <div className={styles.cards}>
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`${styles.card}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <h3 className={styles.cardTitle}>{activity.title}</h3>
            <p className={styles.cardDescription}>{activity.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.mobileActions}>
        <button className={styles.joinButton}>{c.joinButtonText}</button>
      </div>
    </section>
  );
});
KeyActivities.displayName = "KeyActivities";

export default KeyActivities;
