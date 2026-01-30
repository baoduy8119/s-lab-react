"use client";

import React from "react";
import CTABannerCommon from "@/app/components/CTABanner";
import ArrowRightIcon from "@/app/components/icons/ArrowRightIcon";
import styles from "./CTABanner.module.scss";
import PolygonSection from "@/app/components/PolygonSection";

const CTABanner = React.memo(function CTABanner() {
  return (
    <PolygonSection topLeftCut={60}>
      <CTABannerCommon>
        <div className={styles.textContent}>
          <h2 className={styles.mainText}>
            At The S-Lab, learning goes <span className={styles.whiteText}>beyond textbooks.</span>
          </h2>

          <p className={styles.secondaryText}>
            Join us at The S-Lab to <span className={styles.highlight}>gain the knowledge and mentorship</span> you need to succeed in the business world.
          </p>
        </div>

        <div className={styles.ctaGroup}>
          <button className={styles.primaryButton}>Our courses</button>

          <a href="#" className={styles.secondaryLink}>
            <ArrowRightIcon color="#FFFFFF" width={20} height={17} />
            <span>Meet the minds behind your success</span>
          </a>
        </div>
      </CTABannerCommon>
    </PolygonSection>
  );
});
CTABanner.displayName = "CTABanner";

export default CTABanner;
