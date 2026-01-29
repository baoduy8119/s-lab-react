"use client";

import React from "react";
import Image from "next/image";
import styles from "./HomePartners.module.scss";

const partnerImages = [
  "/images/partners/logo-partner-1.png",
  "/images/partners/logo-partner-2.png",
  "/images/partners/logo-partner-3.png",
  "/images/partners/logo-partner-4.png",
  "/images/partners/logo-partner-5.png",
  "/images/partners/logo-partner-6.png",
  "/images/partners/logo-partner-7.png",
  "/images/partners/logo-partner-8.png",
  "/images/partners/logo-partner-9.png",
  "/images/partners/logo-partner-10.png",
  "/images/partners/logo-partner-11.png",
  "/images/partners/logo-partner-12.png",
  "/images/partners/logo-partner-13.png",
  "/images/partners/logo-partner-14.png",
  "/images/partners/logo-partner.png"
];

const HomePartners = React.memo(function HomePartners() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>The S-Lab’s Partners</h2>
      <div className={styles.grid}>
        {partnerImages.map((src, index) => (
          <div key={index} className={styles.logoCard}>
            <div className={styles.imageWrapper}>
              <img src={src} alt={`Partner ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

HomePartners.displayName = "HomePartners";

export default HomePartners;
