"use client";

import React from "react";
import styles from "./SLibraryFooter.module.scss";

const SLibraryFooter = React.memo(function SLibraryFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftSection}>
        <div className={styles.copyright}>20© 26</div>

        <p className={styles.tagline}>
          A sturdy backpack on your journey to conquer business knowledge and practical experience
        </p>

        <div className={styles.contact}>
          <span className={styles.phone}>(312) 555-2468</span>
          <span className={styles.email}>hello@theslab.agency</span>
        </div>

        <div className={styles.socialIcons}>
          <a href="#" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 1.67H16.67V16.67"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect
                x="4"
                y="4"
                width="12"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 2.5H11.67V17.34"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>

        <div className={styles.location}>Lorem ipsum Location is here. Danang</div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.navTitle}>/Navigation</div>
        <a href="/" className={styles.navLink}>
          /Home
        </a>
        <a href="/the-s-lab" className={styles.navLink}>
          /The S-Lab
        </a>
        <a href="/courses" className={styles.navLink}>
          /Course
        </a>
        <a href="/blog" className={styles.navLink}>
          /Blog
        </a>
        <a href="/event" className={styles.navLink}>
          /Event
        </a>
      </div>
    </footer>
  );
});
SLibraryFooter.displayName = "SLibraryFooter";

export default SLibraryFooter;
