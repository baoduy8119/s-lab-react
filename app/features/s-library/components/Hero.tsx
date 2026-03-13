"use client";

import React from "react";
import Image from "next/image";
import styles from "./Hero.module.scss";
import Container from "@/app/components/Container";
import Marquee from "@/app/components/Marquee";
import { useSLibraryContentStore } from "@/app/features/dashboard/stores/useSLibraryContentStore";

const Hero = React.memo(function Hero() {
  const c = useSLibraryContentStore((s) => s.content.slibHero);

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.gridBackground} />

        <div className={styles.scrollingBanner}>
          <Marquee />
        </div>

        <div className={styles.topMarkers} data-aos="fade-down">
          <span className={styles.markerA}>A</span>
          <span className={styles.markerB}>B</span>
          <div className={styles.markerGroupC}>
            <span className={styles.markerArrow}>(→.)</span>
            <span className={styles.markerC}>C</span>
          </div>
          <div className={styles.markerDot} />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title} data-aos="fade-up">
            {c.title}
          </h1>
          <h2 className={styles.subtitle} data-aos="fade-up" data-aos-delay="100">
            {c.subtitle1}
          </h2>
          <h2 className={styles.subtitle} data-aos="fade-up" data-aos-delay="150">
            {c.subtitle2}
          </h2>

          <div className={styles.descriptions} data-aos="fade-up" data-aos-delay="200">
            <p className={styles.description}>{c.description1}</p>
            <p className={styles.descriptionSecondary}>{c.description2}</p>
          </div>

          <div className={styles.courseCards}>
            <div className={styles.cardLarge} data-aos="fade-up" data-aos-delay="300">
              <Image
                src={c.heroImage1}
                alt={c.cardLabel}
                fill
                style={{ objectFit: "cover" }}
                unoptimized={c.heroImage1.startsWith("data:")}
              />
              <div className={styles.cardLabelTopRight}>{c.cardLabel}</div>
            </div>

            <div className={styles.cardMedium} data-aos="fade-up" data-aos-delay="400">
              <Image
                src={c.heroImage2}
                alt={c.cardLabel2 || "Course"}
                fill
                style={{ objectFit: "cover" }}
                unoptimized={c.heroImage2.startsWith("data:")}
              />
              {/* {c.cardLabel2 && <div className={styles.cardLabelBottomLeft}>{c.cardLabel2}</div>} */}
            </div>

            <div className={styles.cardSmall} data-aos="fade-up" data-aos-delay="500">
              <Image
                src={c.heroImage3}
                alt="Expert"
                fill
                style={{ objectFit: "cover" }}
                unoptimized={c.heroImage3.startsWith("data:")}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});
Hero.displayName = "Hero";

export default Hero;
