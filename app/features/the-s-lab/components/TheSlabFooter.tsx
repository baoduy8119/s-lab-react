"use client";

import React from "react";
import styles from "./TheSlabFooter.module.scss";

const TheSlabFooter = React.memo(function TheSlabFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftSection}>
        <div className={styles.copyright}>
          20©
          <br />
          26
        </div>
        <p className={styles.tagline}>
          A sturdy backpack on your journey to conquer business knowledge and practical experience
        </p>
      </div>

      <div className={styles.middleSection}>
        <div className={styles.contact}>
          <div className={styles.phone}>(312) 555-2468</div>
          <div className={styles.email}>hello@theslab.agency</div>
        </div>

        <div className={styles.socialIcons}>
          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 1.67h9.17v16.67H5V1.67z" />
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="10" r="7.29" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <rect x="1.67" y="1.67" width="16.67" height="16.67" rx="4" />
            </svg>
          </a>
          <a href="#" aria-label="TikTok">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.17 2.5h11.67v17.34H4.17V2.5z" />
            </svg>
          </a>
        </div>

        <div className={styles.location}>Lorem ipsum Location is here. Danang</div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.navTitle}>/Navigation</div>
        <a href="/" className={styles.navLink}>
          Home
        </a>
        <a href="/the-s-lab" className={styles.navLink}>
          The S-Lab
        </a>
        <a href="/courses" className={styles.navLink}>
          Course
        </a>
        <a href="/blog" className={styles.navLink}>
          Blog
        </a>
        <a href="/events" className={styles.navLink}>
          Event
        </a>
      </div>
    </footer>
  );
});
TheSlabFooter.displayName = "TheSlabFooter";

export default TheSlabFooter;
