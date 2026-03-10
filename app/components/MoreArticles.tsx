"use client";

import React, { useMemo } from "react";
import Container from "@/app/components/Container";
import BlogGridCard from "@/app/features/blog/components/BlogGridCard";
import SectionHeader from "@/app/components/SectionHeader";
import styles from "./MoreArticles.module.scss";
import TheSLabLogo from "./TheSLabLogo";
import Link from "next/link";
import { useHomeContentStore } from "@/app/features/dashboard/stores/useHomeContentStore";

const MoreArticles = React.memo(function MoreArticles() {
  const c = useHomeContentStore((s) => s.content.articles);

  const articles = useMemo(
    () => [
      { id: 1, title: c.a1Title, excerpt: c.a1Excerpt, date: c.a1Date, image: c.a1Image },
      { id: 2, title: c.a2Title, excerpt: c.a2Excerpt, date: c.a2Date, image: c.a2Image },
      { id: 3, title: c.a3Title, excerpt: c.a3Excerpt, date: c.a3Date, image: c.a3Image },
    ],
    [c]
  );

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeader title={c.heading} className={styles.title} />
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

          <Link href="/blog" className={styles.sidebar}>
            <div className={styles.sidebarLabel}>
              <div className="hidden lg:block">
                <TheSLabLogo width={155} height={18} />
              </div>
              <div className="block lg:hidden">
                <TheSLabLogo width={121} height={14} />
              </div>
            </div>
            <div className={styles.arrowBtn}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
});

MoreArticles.displayName = "MoreArticles";

export default MoreArticles;
