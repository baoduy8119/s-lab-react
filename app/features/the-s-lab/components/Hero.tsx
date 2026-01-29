"use client";

import PartnerLogos from "@/app/components/PartnerLogos";
import SLabLogoBlack from "@/app/components/SLabLogoBlack";
import Image from "next/image";
import React from "react";
import styles from "./Hero.module.scss";

// Highlight Component (for inline use with decorative pills)
interface HighlightProps {
  children: React.ReactNode;
  color: "yellow" | "pink";
  rotation?: 1 | -1 | -2 | 3 | -3;
  red?: boolean;
  pillPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  pillSize?: "short" | "medium" | "tall";
}

const Highlight = React.memo(function Highlight({
  children,
  color,
  rotation = 1,
  red = false,
  pillPosition,
  pillSize = "tall",
}: HighlightProps) {
  const colorClass = color === "yellow" ? styles.yellow : styles.pink;
  const rotateClass =
    rotation === 1
      ? styles.rotate1
      : rotation === -1
        ? styles["rotate-1"]
        : rotation === -2
          ? styles["rotate-2"]
          : rotation === 3
            ? styles.rotate3
            : styles["rotate-3"];
  const redClass = red ? styles.red : "";

  // Determine if circle should be at bottom based on pill position
  const circleAtBottom = pillPosition === "bottom-left" || pillPosition === "bottom-right";

  // Pill SVG based on size and position
  const getPillSVG = () => {
    if (circleAtBottom) {
      // Circle at bottom, rect at top
      switch (pillSize) {
        case "short":
          return (
            <svg width="23" height="69" viewBox="0 0 23 69" fill="none">
              <rect x="10" y="0" width="3" height="49.28" fill="#FBBF24" />
              <circle cx="11.5" cy="58.05" r="11.05" fill="#FBBF24" />
            </svg>
          );
        case "medium":
          return (
            <svg width="23" height="83" viewBox="0 0 23 83" fill="none">
              <rect x="10" y="0" width="3" height="63.28" fill="#FBBF24" />
              <circle cx="11.5" cy="72.05" r="11.05" fill="#FBBF24" />
            </svg>
          );
        case "tall":
        default:
          return (
            <svg width="23" height="95" viewBox="0 0 23 95" fill="none">
              <rect x="10" y="0" width="3" height="75.28" fill="#FBBF24" />
              <circle cx="11.5" cy="84.05" r="11.05" fill="#FBBF24" />
            </svg>
          );
      }
    } else {
      // Circle at top, rect at bottom
      switch (pillSize) {
        case "short":
          return (
            <svg width="23" height="69" viewBox="0 0 23 69" fill="none">
              <circle cx="11.5" cy="11.05" r="11.05" fill="#FBBF24" />
              <rect x="10" y="19.77" width="3" height="49.28" fill="#FBBF24" />
            </svg>
          );
        case "medium":
          return (
            <svg width="23" height="83" viewBox="0 0 23 83" fill="none">
              <circle cx="11.5" cy="11.05" r="11.05" fill="#FBBF24" />
              <rect x="10" y="19.77" width="3" height="63.28" fill="#FBBF24" />
            </svg>
          );
        case "tall":
        default:
          return (
            <svg width="23" height="95" viewBox="0 0 23 95" fill="none">
              <circle cx="11.5" cy="11.05" r="11.05" fill="#FBBF24" />
              <rect x="10" y="19.77" width="3" height="75.28" fill="#FBBF24" />
            </svg>
          );
      }
    }
  };

  return (
    <span className={`${styles.highlightWrapper} ${colorClass} ${rotateClass} ${redClass}`}>
      <span className={styles.highlight}>{children}</span>
      {pillPosition && (
        <span className={`${styles.pill} ${styles[`pill-${pillPosition}`]}`}>{getPillSVG()}</span>
      )}
    </span>
  );
});
Highlight.displayName = "Highlight";

const Hero = React.memo(function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.innerContent}>
        {/* Background Images - decorative, kept absolute for layering */}
        <Image
          src="/images/slab/bg-image-top-7c576e.png"
          alt="3D Asset"
          width={408}
          height={330}
          className={styles.bgImageTop}
        />
        <Image
          src="/images/slab/bg-image-left-4bf67d.png"
          alt="3D Asset"
          width={173}
          height={452}
          className={styles.bgImageLeft}
        />

        {/* Main Content Container */}
        <div className={styles.contentWrapper}>
          {/* Header Section */}
          <div className={styles.headerSection}>
            <h1 className={styles.title}>/About THE S-LAB.</h1>
            <div className={styles.logoGroup}>
              <SLabLogoBlack width={90} height={33} />
            </div>
          </div>

          {/* Description Text with Inline Highlights */}
          <div className={styles.description}>
            <p>
              Where{" "}
              <Highlight color="yellow" rotation={1} pillPosition="top-left" pillSize="tall">
                knowledge meets action
              </Highlight>{" "}
              <Highlight color="pink" rotation={-1} pillPosition="bottom-right" pillSize="medium">
                empowering
              </Highlight>{" "}
              learners, professionals, and enterprises.
            </p>
            <p>
              <Highlight color="yellow" pillPosition="top-left" pillSize="medium">
                Bridging
              </Highlight>{" "}
              theory and practice at The S-LAB,{" "}
              <Highlight color="pink" rotation={3} red pillPosition="top-right" pillSize="medium">
                fostering
              </Highlight>{" "}
              a diverse community.
            </p>
            <p>
              Transforming learning at The S-LAB:{" "}
              <Highlight color="yellow" rotation={1} pillPosition="top-left" pillSize="tall">
                theory in
              </Highlight>{" "}
              <Highlight color="yellow" pillPosition="bottom-right" pillSize="medium">
                action
              </Highlight>
              ,{" "}
              <Highlight color="pink" rotation={-2} red>
                connecting
              </Highlight>{" "}
              all for growth.
            </p>
          </div>
        </div>

        {/* Footer Section */}
      </div>
      <div className="mt-[100px]">
        <PartnerLogos />
      </div>
    </section>
  );
});
Hero.displayName = "Hero";

export default Hero;
