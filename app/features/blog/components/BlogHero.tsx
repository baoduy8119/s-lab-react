"use client";

import React, { useState } from "react";
import Container from "@/app/components/Container";
import styles from "./BlogHero.module.scss";
import SLabLogoBlack from "@/app/components/SLabLogoBlack";

const BlogHero = React.memo(function BlogHero() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categories = ["All", "blog1", "blog2", "blog3", "blog4"];

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.headerRow}>
          <h1 className={styles.mainTitle}>/Insights & Stories.</h1>
          <SLabLogoBlack className={styles.logoAbs} />
        </div>

        <div className={styles.introBlock}>
          <span className={styles.label}>/Blog/</span>
          <div className={styles.textWrapper}>
            <p className={styles.description}>
              No jargon. Just practical thoughts from our team.
              Written for designers, marketers, devs—and
              anyone building things online.
            </p>
            <p className={styles.subDescription}>
              Think of it as a working notebook we’ve made
              public. We keep it clear, honest, and useful.
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div
            className={styles.categoryDropdown}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>Category</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={`${styles.chevron} ${isDropdownOpen ? styles.rotate : ''}`}
            >
              <path d="M7 14.5L12 9.5L17 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {categories.map((category) => (
                  <div key={category} className={`${styles.dropdownItem} ${category === "All" ? styles.selected : ""}`}>
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.searchBar}>
            <input type="text" placeholder="Search blogs..." className={styles.searchInput} />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.searchIcon}>
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
});

BlogHero.displayName = "BlogHero";

export default BlogHero;
