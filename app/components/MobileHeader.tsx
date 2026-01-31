"use client";

import React, { useState } from "react";
import SLabLogoWhite from "./SLabLogoWhite";
import MobileMenu from "./MobileMenu";
import styles from "./MobileHeader.module.scss";

const MobileHeader = React.memo(function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <SLabLogoWhite width={120} height={16} />

        <button
          className={styles.hamburger}
          aria-label="Menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
});

MobileHeader.displayName = "MobileHeader";

export default MobileHeader;
