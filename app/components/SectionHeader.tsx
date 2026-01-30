"use client";

import React from "react";
import QuoteIcon from "@/app/components/icons/QuoteIcon";
import styles from "./SectionHeader.module.scss";

interface SectionHeaderProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SectionHeader = React.memo(function SectionHeader({
  title,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={`${styles.container} ${className || ""}`}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
});

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
