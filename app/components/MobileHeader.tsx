"use client";

import React, { useState } from "react";
import Image from "next/image";
import TheSLabLogo from "./TheSLabLogo";
import MobileMenu from "./MobileMenu";
import styles from "./MobileHeader.module.scss";

const MobileHeader = React.memo(function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.iconArea}>
          <Image
            src="/images/logo-left-menu.svg"
            alt=""
            width={38}
            height={43}
            className={styles.sLogo}
          />
        </div>
        <div className={styles.logoArea}>
          <TheSLabLogo width={160} height={18} className={styles.logoWhite} />
          <svg
            className={styles.arrowUp}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M18 6L6 18M6 18V9M6 18H15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <button
          className={styles.gridMenu}
          aria-label="Menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <svg
            className={styles.gridDots}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <circle cx="5" cy="5" r="1.5" fill="#9CA3AF" />
            <circle cx="12" cy="5" r="1.5" fill="#9CA3AF" />
            <circle cx="19" cy="5" r="1.5" fill="#9CA3AF" />
            <circle cx="5" cy="12" r="1.5" fill="#9CA3AF" />
            <circle cx="12" cy="12" r="1.5" fill="#9CA3AF" />
            <circle cx="19" cy="12" r="1.5" fill="#9CA3AF" />
            <circle cx="5" cy="19" r="1.5" fill="#9CA3AF" />
            <circle cx="12" cy="19" r="1.5" fill="#9CA3AF" />
            <circle cx="19" cy="19" r="1.5" fill="#9CA3AF" />
          </svg>
        </button>
      </header>

      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
});

MobileHeader.displayName = "MobileHeader";

export default MobileHeader;
