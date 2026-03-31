"use client";

import React from "react";
import Image from "next/image";
import Container from "@/app/components/Container";
import SLabLogoBlack from "@/app/components/SLabLogoBlack";
import styles from "./BlogDetailHeader.module.scss";
import PolygonImage from "@/app/components/PolygonImage";

interface BlogDetailHeaderProps {
  date: string;
  title: string;
  subtitle: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
  heroImage: string;
}

const BlogDetailHeader = React.memo(function BlogDetailHeader({
  date,
  title,
  subtitle,
  authorName,
  authorRole,
  authorImage,
  heroImage
}: BlogDetailHeaderProps) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.topLogo} data-aos="fade-down">
          <SLabLogoBlack />
        </div>

        <div className={styles.grid}>
          {/* Row 1 / Col 1: Date */}
          <div className={styles.dateArea} data-aos="fade-right">
            <span className={styles.date}>{date}</span>
          </div>

          {/* Row 1 / Col 2: Title & Subtitle */}
          <div className={styles.headerArea} data-aos="fade-up">
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>

          {/* Row 2 / Col 1: Author */}
          <div className={styles.authorArea} data-aos="fade-right" data-aos-delay="100">
            <div className={styles.authorBlock}>
              <div className={styles.authorImageWrapper}>
                <Image
                  src={authorImage}
                  alt={authorName}
                  width={48}
                  height={48}
                  className={styles.authorImage}
                />
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>/{authorName}</span>
                <span className={styles.authorRole}>{authorRole}</span>
              </div>
            </div>
          </div>

          {/* Row 2 / Col 2: Hero Image (Formerly Col 1 in my previous step) */}
          <div className={styles.heroArea} data-aos="fade-left" data-aos-delay="200">
            <div className={styles.heroImageWrapper}>
              <PolygonImage
                src={heroImage}
                alt={title}
                fill
                className={styles.heroImage}
                priority
                topLeftCut={60}
                topLeftCutMobile={30}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});

BlogDetailHeader.displayName = "BlogDetailHeader";

export default BlogDetailHeader;
