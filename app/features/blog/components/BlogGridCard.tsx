"use client";

import React from "react";
import PolygonImage from "@/app/components/PolygonImage";
import styles from "./BlogGridCard.module.scss";

interface BlogGridCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

const BlogGridCard = React.memo(function BlogGridCard({
  title,
  excerpt,
  date,
  image
}: BlogGridCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <PolygonImage
          src={image}
          alt={title}
          fill
          topLeftCut={40}
          className={styles.postImage}
        />
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.contentCol}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.excerpt}>{excerpt}</p>
        </div>

        <div className={styles.dateCol}>
          <span className={styles.dateText}>{date}</span>
        </div>
      </div>
    </div>
  );
});

BlogGridCard.displayName = "BlogGridCard";

export default BlogGridCard;
