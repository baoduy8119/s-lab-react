"use client";

import React from "react";
import CTABannerCommon from "@/app/components/CTABanner";
import ArrowRightIcon from "@/app/components/icons/ArrowRightIcon";
import { useTheSlabContentStore } from "@/app/features/dashboard/stores/useTheSlabContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";
import styles from "./CTABanner.module.scss";
import PolygonSection from "@/app/components/PolygonSection";
import Link from "next/link";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";


const CTABanner = React.memo(function CTABanner() {
  const c = useLocalizedContent(useTheSlabContentStore((s) => s.content.slabCtaBanner));
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <PolygonSection topLeftCut={60} topLeftCutMobile={40} >
      <CTABannerCommon className={styles.content} height={isMobile ? 600 : undefined}>
        <div className={styles.textContent}>
          <h2 className={styles.mainText}>
            {c.mainTextPrefix} <span className={styles.whiteText}>{c.mainTextHighlight}</span>
          </h2>

          <p className={styles.secondaryText}>
            {c.secondaryPrefix} <span className={styles.highlight}>{c.secondaryHighlight}</span>{" "}
            {c.secondarySuffix}
          </p>
        </div>

        <div className={styles.ctaGroup}>
          <Link href="/courses" className={styles.primaryButton}>{c.primaryButtonText}</Link>

          <div className={styles.secondaryLink}>
            <ArrowRightIcon color="#FFFFFF" width={20} height={17} />
            <span>{c.secondaryLinkText}</span>
          </div>
        </div>
      </CTABannerCommon>
    </PolygonSection>
  );
});
CTABanner.displayName = "CTABanner";

export default CTABanner;
