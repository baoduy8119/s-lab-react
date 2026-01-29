"use client";

import React from "react";
import CTABannerCommon from "@/app/components/CTABanner";
import styles from "./NewsletterCTA.module.scss";

const NewsletterCTA = React.memo(function NewsletterCTA() {
  return (
    <CTABannerCommon height="565px">
      <div className={styles.content}>
        <h2 className={styles.title}>/Stay in the loop.</h2>

        <div className={styles.logoContainer}>
          <svg width="108" height="42" viewBox="0 0 108 42" fill="none">
            {/* S-LAB Logo SVG */}
            <path d="M0 0H33.76V21.09H0V0Z" fill="white" />
            <text x="3" y="15" fill="black" fontSize="12" fontWeight="700">
              THE S-LAB
            </text>
          </svg>
        </div>

        <p className={styles.subtitle}>Smart updates for smart people.</p>

        <div className={styles.emailForm}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.emailInput}
          />
          <button className={styles.submitButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </CTABannerCommon>
  );
});
NewsletterCTA.displayName = "NewsletterCTA";

export default NewsletterCTA;
