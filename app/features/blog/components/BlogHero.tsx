"use client";

import React from "react";
import Container from "@/app/components/Container";
import styles from "./BlogHero.module.scss";

const BlogHero = React.memo(function BlogHero() {
  return (
    <section className={styles.section}>
      <Container>
        <h1 className={styles.mainTitle}>/Insights & Stories.</h1>

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
          <div className={styles.categoryDropdown}>
            <span>Category</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className={styles.chevron}>
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className={styles.searchBar}>
            <input type="text" placeholder="Search blogs..." className={styles.searchInput} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.searchIcon}>
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
});

BlogHero.displayName = "BlogHero";

export default BlogHero;
