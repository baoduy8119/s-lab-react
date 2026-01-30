"use client";

import React from "react";
import Image from "next/image";
import PolygonImage from "@/app/components/PolygonImage";
import styles from "./BlogCard.module.scss";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
}

const BlogCard = React.memo(function BlogCard({
  title,
  excerpt,
  date,
  image,
  authorName,
  authorRole,
  authorImage
}: BlogCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <PolygonImage
          src={image}
          alt={title}
          width={655}
          height={484}
          topLeftCut={40}
          className={styles.postImage}
        />
        <div className={styles.dateOverlay}>
          <span className={styles.dateText}>{date}</span>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>

        <div className={styles.authorBlock}>
          <div className={styles.authorImageWrapper}>
            <Image
              src={authorImage}
              alt={authorName}
              width={40}
              height={40}
              className={styles.authorImage}
            />
          </div>
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>/{authorName}</span>
            <span className={styles.authorRole}>{authorRole}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

BlogCard.displayName = "BlogCard";

export default BlogCard;
