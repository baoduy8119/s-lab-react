"use client";

import React from "react";
import Image from "next/image";
import styles from "./Hero.module.scss";

const Hero = React.memo(function Hero() {
  return (
    <section className={styles.section}>
      {/* Background Grid */}
      <div className={styles.gridBackground} />

      {/* Scrolling Banner */}
      <div className={styles.scrollingBanner}>
        <div className={styles.scrollContent}>
          <span>THE S-LAB</span>
          <span>THE S-LAB</span>
          <span>THE S-LAB</span>
          <span>THE S-LAB</span>
          <span>THE S-LAB</span>
          <span>THE S-LAB</span>
          <span>THE S-LAB</span>
          <span>THE S-LAB</span>
        </div>
      </div>

      {/* Top Markers */}
      <div className={styles.topMarkers}>
        <span className={styles.markerA}>A</span>
        <span className={styles.markerB}>B</span>
        <div className={styles.markerGroupC}>
          <span className={styles.markerArrow}>(→.)</span>
          <span className={styles.markerC}>C</span>
        </div>
        <div className={styles.markerDot} />
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>/Shape Tomorrow Today</h1>
        <h2 className={styles.subtitle}>Where Vision Meets Action</h2>
        <h2 className={styles.subtitle}>in Business and Creativity</h2>

        <div className={styles.descriptions}>
          <p className={styles.description}>
            Our courses in business, marketing, and creativity are the launchpad for visionaries
            ready to challenge the status quo.
          </p>
          <p className={styles.descriptionSecondary}>
            Transform your dreams into reality and carve your path in the ever-evolving landscape
            of industry and imagination.
          </p>
        </div>

        {/* Course Cards */}
        <div className={styles.courseCards}>
          <div className={styles.cardLarge}>
            <Image
              src="/images/slib/marketing-hero.png"
              alt="Marketing"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className={styles.cardLabelTopRight}>Marketing</div>
          </div>

          <div className={styles.cardMedium}>
            <Image
              src="/images/slib/marketing-planning-hero.png"
              alt="Marketing Planning"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className={styles.cardLabelBottomLeft}>Marketing Planning</div>
          </div>

          <div className={styles.cardSmall}>
            <Image
              src="/images/slib/person-hero.png"
              alt="Expert"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
});
Hero.displayName = "Hero";

export default Hero;
