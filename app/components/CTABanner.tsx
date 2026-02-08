"use client";

import React from "react";
import styles from "./CTABanner.module.scss";

interface CTABannerProps {
  children: React.ReactNode;
  className?: string;
  height?: string | number;
}

const CTABanner = React.memo(function CTABanner({
  children,
  className,
  height = "785px",
}: CTABannerProps) {
  return (
    <section
      className={`${styles.banner} ${className || ""}`}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      <div className={styles.content}>{children}</div>
    </section>
  );
});
CTABanner.displayName = "CTABanner";

export default CTABanner;
