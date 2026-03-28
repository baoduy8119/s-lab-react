"use client";

import React, { useCallback } from "react";
import { useLanguageStore } from "../stores/useLanguageStore";
import styles from "./LanguageToggle.module.scss";

const LanguageToggle = React.memo(function LanguageToggle() {
  const locale = useLanguageStore((s) => s.locale);
  const toggleLocale = useLanguageStore((s) => s.toggleLocale);

  const handleClick = useCallback(() => {
    toggleLocale();
  }, [toggleLocale]);

  return (
    <button
      className={styles.toggle}
      onClick={handleClick}
      type="button"
      aria-label={`Switch language to ${locale === "en" ? "Vietnamese" : "English"}`}
    >
      <span className={styles.label}>{locale === "en" ? "EN" : "VI"}</span>
    </button>
  );
});

LanguageToggle.displayName = "LanguageToggle";

export default LanguageToggle;
