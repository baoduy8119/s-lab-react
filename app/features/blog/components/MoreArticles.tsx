"use client";

import React from "react";
import Container from "@/app/components/Container";
import BlogGridCard from "./BlogGridCard";
import styles from "./MoreArticles.module.scss";

const articles = [
  {
    id: 1,
    title: "How integration drives success",
    excerpt: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    date: "May 29, 2026",
    image: "/images/blogs/blog1.jpg" // Reuse placeholders
  },
  {
    id: 2,
    title: "How integration drives success",
    excerpt: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    date: "May 29, 2026",
    image: "/images/blogs/blog2.jpg"
  },
  {
    id: 3,
    title: "How integration drives success",
    excerpt: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    date: "May 29, 2026",
    image: "/images/blogs/blog3.jpg"
  }
];

const MoreArticles = React.memo(function MoreArticles() {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>/More articles.</h2>
        <div className={styles.grid}>
          {articles.map((article) => (
            <div key={article.id} className={styles.borderWrapper}>
              <div className={styles.paddingWrapper}>
                <BlogGridCard
                  title={article.title}
                  excerpt={article.excerpt}
                  date={article.date}
                  image={article.image}
                />
              </div>
            </div>
          ))}

          <div className={styles.sidebar}>
            <button className={styles.arrowBtn}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={styles.sidebarLabel}>THE S-LAB</div>
          </div>
        </div>
      </Container>
    </section>
  );
});

MoreArticles.displayName = "MoreArticles";

export default MoreArticles;
