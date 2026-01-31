"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./MobileMenu.module.scss";

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = React.memo(function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className={styles.overlay}>
      {/* Main Layout: Sidebar Strip + Content */}
      <div className={styles.body}>
        {/* Left Sidebar Strip */}
        <div className={styles.sidebarStrip}>
          <div className={styles.stripLogo}>
            {/* Use the logo from LeftMenu or simplified */}
            <Image src="/images/logo-left-menu.svg" alt="S" width={24} height={24} />
          </div>
          <div className={styles.stripText}>THE S-LAB</div>
          {/* Spacer for bottom alignment */}
          <div></div>
        </div>

        {/* Right Content Area */}
        <div className={styles.contentArea}>
          {/* Header Bar */}
          <div className={styles.topBar}>
            <div className={styles.blackLabHeader}>
              <Image
                src="/images/logo-main.svg"
                alt="The S-Lab"
                width={156}
                height={19}
                className="w-auto h-auto"
              />
            </div>
            <button className={styles.topCloseBtn} onClick={onClose} aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className={styles.menuList}>
            <Link href="/" className={styles.menuItem} onClick={onClose}>
              /Home
            </Link>

            <div className={`${styles.menuItem} ${styles.activeItem}`}>
              /The S-Lab
              {/* Chevron Up */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <ul className={styles.subMenu}>
              <li>The S-Library</li>
            </ul>

            <Link href="/courses" className={styles.menuItem} onClick={onClose}>
              /Course
              <span className={styles.hotTag}>/HOT/</span>
            </Link>

            <Link href="/blog" className={styles.menuItem} onClick={onClose}>
              /Blog
            </Link>

            <Link href="/event" className={styles.menuItem} onClick={onClose}>
              /Event
            </Link>
          </div>

          {/* Divider / Barcode */}
          <div className={styles.divider}></div>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <span className={styles.phone}>(312) 555-2468</span>
            <a href="mailto:hello@theslab.agency" className={styles.email}>hello@theslab.agency</a>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.copyright}>
              © 2026 the s-lab.<br />
              All rights reserved.
            </p>

            <div className={styles.socials}>
              {/* Facebook, LinkedIn, Instagram, TikTok placeholder icons */}
              <Image src="/images/social-icons.svg" alt="Socials" width={100} height={20} />
            </div>

            <p className={styles.year}>
              20©<br />26
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;
