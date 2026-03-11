"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TheSLabLogo from "./TheSLabLogo";
import styles from "./MobileMenu.module.scss";

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = React.memo(function MobileMenu({ onClose }: MobileMenuProps) {
  const [isSLabOpen, setIsSLabOpen] = React.useState(false);

  return (
    <div className={styles.overlay}>
      {/* Figma: Header row (icon | logo+arrow | close) */}
      <header className={styles.menuHeader}>
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
          <svg className={styles.arrowUp} width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M18 6L6 18M6 18V9M6 18H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {/* Body: Left strip 56px + Right content */}
      <div className={styles.body}>
        <div className={styles.sidebarStrip}>
          <span className={styles.stripText}><TheSLabLogo width={42} height={6} /></span>
          <div className={styles.stripBottom}>
            <span className={styles.langLabel}>EN</span>
            <div className={styles.avatar} aria-hidden />
          </div>
        </div>

        <div className={styles.contentArea}>
          <div className={styles.menuSection}>
            <Link href="/" className={styles.menuItem} onClick={onClose}>
              /Home
            </Link>
            <div className={styles.menuGroup}>
              <div className={styles.menuItemWrapper}>
                <Link href="/the-s-lab" className={styles.menuItem} onClick={onClose}>
                  /The S-Lab
                </Link>
                <button
                  className={`${styles.submenuToggle} ${isSLabOpen ? styles.open : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSLabOpen(!isSLabOpen);
                  }}
                >
                  <svg width={16} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              {isSLabOpen && (
                <div className={styles.submenu}>
                  <Link href="/s-library" className={styles.submenuItem} onClick={onClose}>
                    /S-library
                  </Link>
                </div>
              )}
            </div>
            <Link href="/courses" className={styles.menuItem} onClick={onClose}>
              /Course
              <span className={styles.hotTag}>/HOT/</span>
            </Link>
            <Link href="/blog" className={styles.menuItem} onClick={onClose}>
              /Blog
            </Link>
            <Link href="/events" className={styles.menuItem} onClick={onClose}>
              /Event
            </Link>
          </div>

          <div className={styles.contentBottom}>
            <div className={styles.divider} aria-hidden />
            <div className={styles.contactInfo}>
              <span className={styles.phone}>(312) 555-2468</span>
              <a href="mailto:hello@theslab.agency" className={styles.email}>hello@theslab.agency</a>
            </div>
            <p className={styles.copyright}>
              © 2026 the s-lab.<br />
              All rights reserved.
            </p>
            <div className={styles.socials}>
              <Image src="/images/social-icons.svg" alt="Socials" width={80} height={20} />
            </div>
            <p className={styles.year}>20© 26</p>
          </div>
        </div>
      </div>
    </div>
  );
});

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;
