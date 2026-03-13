"use client";

import React, { useState } from "react";
import PolygonImage from "@/app/components/PolygonImage";
import QuoteIcon from "@/app/components/icons/QuoteIcon";
import styles from "./Trainers.module.scss";
import Container from "@/app/components/Container";

const Trainers = React.memo(function Trainers() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const trainers = [
    {
      number: "/001/",
      name: "/Alex Morgan",
      role: "Technical Lead",
      image: "/images/slab/trainer-1.png",
      bio: "Having completed a degree in philosophy, Mike Trow started out in fashion working on Bizarre magazine as photo editor and photographer. He has been the picture editor of British Vogue 2005-2018 – responsible for commissioning, production and art direction of most of the portraits, reportage and house shoots of the magazine.",
    },
    {
      number: "/002/",
      name: "/Alex Morgan",
      role: "Technical Lead",
      image: "/images/slab/trainer-2.png",
      bio: "A seasoned marketing strategist with over 10 years of experience in digital transformation and brand development.",
    },
    {
      number: "/003/",
      name: "/Alex Morgan",
      role: "Technical Lead",
      image: "/images/slab/trainer-3.png",
      bio: "Specializing in business analytics and data-driven decision making, bringing innovative solutions to complex challenges.",
    },
    {
      number: "/004/",
      name: "/Alex Morgan",
      role: "Technical Lead",
      image: "/images/slab/trainer-4.png",
      bio: "Expert in Web3 technologies and blockchain implementation, leading the charge in decentralized business models.",
    },
  ];

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.quoteIconWrapper}>
          <div className={styles.quoteIcon}>
            <QuoteIcon />
          </div>
          <h2 className={styles.title}>Our Trainers: The Heart of The S-Lab</h2>
          <p className={styles.subtitle}>Who brings value to leverage the talents</p>
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
