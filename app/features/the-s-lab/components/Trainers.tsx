"use client";

import React, { useState } from "react";
import PolygonImage from "@/app/components/PolygonImage";
import QuoteIcon from "@/app/components/icons/QuoteIcon";
import { useTheSlabContentStore } from "@/app/features/dashboard/stores/useTheSlabContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";
import styles from "./Trainers.module.scss";
import Container from "@/app/components/Container";

const Trainers = React.memo(function Trainers() {
  const c = useLocalizedContent(useTheSlabContentStore((s) => s.content.slabTrainers));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const trainers = [
    {
      number: "/001/",
      name: c.t1Name,
      role: c.t1Role,
      image: c.t1Image,
      bio: c.t1Bio,
    },
    {
      number: "/002/",
      name: c.t2Name,
      role: c.t2Role,
      image: c.t2Image,
      bio: c.t2Bio,
    },
    {
      number: "/003/",
      name: c.t3Name,
      role: c.t3Role,
      image: c.t3Image,
      bio: c.t3Bio,
    },
    {
      number: "/004/",
      name: c.t4Name,
      role: c.t4Role,
      image: c.t4Image,
      bio: c.t4Bio,
    },
  ];

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.quoteIconWrapper}>
          <div className={styles.quoteIcon}>
            <QuoteIcon />
          </div>
          <h2 className={styles.title}>{c.title}</h2>
          <p className={styles.subtitle}>{c.subtitle}</p>
        </div>


        <div className={styles.trainersGrid}>
          {trainers.map((trainer, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className={`${styles.trainerCard} ${isHovered ? styles.expanded : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={styles.cardNumber}>{trainer.number}</div>
                <div className={`${styles.imageContainer} ${isHovered ? styles.expanded : ""}`}>
                  <PolygonImage
                    src={trainer.image}
                    alt={trainer.name}
                    fill={true}
                    topLeftCut={25}
                  />
                  <div className={`${styles.overlay} ${isHovered ? styles.expanded : ""}`}>
                    <div>
                      <p className={styles.trainerName}>{trainer.name}</p>
                      <p className={styles.trainerRole}>{trainer.role}</p>
                    </div>
                    {isHovered && trainer.bio && (
                      <p className={styles.trainerBio}>{trainer.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
});
Trainers.displayName = "Trainers";

export default Trainers;
