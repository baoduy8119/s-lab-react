"use client";

import React from "react";
import Image from "next/image";
import styles from "./Hero.module.scss";
import Container from "@/app/components/Container";
import Marquee from "@/app/components/Marquee";

const Hero = React.memo(function Hero() {
  return (
    <section className={styles.section}>
      <Container>

        {/* Background Grid */}
        <div className={styles.gridBackground} />

        {/* Scrolling Banner */}
        <div className={styles.scrollingBanner}>
          <Marquee />
        </div>

        {/* Top Markers */}
        <div className={styles.topMarkers} data-aos="fade-down">
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
          <h1 className={styles.title} data-aos="fade-up">/Shape Tomorrow Today</h1>
          <h2 className={styles.subtitle} data-aos="fade-up" data-aos-delay="100">Where Vision Meets Action</h2>
          <h2 className={styles.subtitle} data-aos="fade-up" data-aos-delay="150">in Business and Creativity</h2>

          <div className={styles.descriptions} data-aos="fade-up" data-aos-delay="200">
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
            <div className={styles.cardLarge} data-aos="fade-up" data-aos-delay="300">
              <Image
                src="/images/slib/marketing-hero.png"
                alt="Marketing"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className={styles.cardLabelTopRight}>Marketing</div>
            </div>

            <div className={styles.cardMedium} data-aos="fade-up" data-aos-delay="400">
              <Image
                src="/images/slib/marketing-planning-hero.jpg"
                alt="Marketing Planning"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className={styles.cardLabelBottomLeft}>Marketing Planning</div>
            </div>

            <div className={styles.cardSmall} data-aos="fade-up" data-aos-delay="500">
              <Image
                src="/images/slib/person-hero.png"
                alt="Expert"
                fill
                style={{ objectFit: "cover" }}
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
