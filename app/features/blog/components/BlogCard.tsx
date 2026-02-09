"use client";

import React from "react";
import Image from "next/image";

import styles from "./BlogCard.module.scss";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
  slug: string;
}

const BlogCard = React.memo(function BlogCard({
  title,
  excerpt,
  date,
  image,
  authorName,
  authorRole,
  authorImage,
  slug
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={title}
          width={655}
          height={484}
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
    </Link>
  );
});

BlogCard.displayName = "BlogCard";

export default BlogCard;
