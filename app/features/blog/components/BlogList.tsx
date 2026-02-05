"use client";

import React from "react";
import Container from "@/app/components/Container";
import BlogCard from "./BlogCard";
import styles from "./BlogList.module.scss";

const posts = [
  {
    id: 1,
    title: "How integration drives success",
    excerpt: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    date: "May 29, 2026",
    image: "/images/blogs/blog1.jpg", // Placeholder
    authorName: "Lora K.",
    authorRole: "Student, InnovateHealth",
    authorImage: "/images/avatar.png",
    slug: "how-integration-drives-success-1"
  },
  {
    id: 2,
    title: "How integration drives success",
    excerpt: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    date: "May 27, 2026",
    image: "/images/blogs/blog2.jpg", // Placeholder
    authorName: "Lora K.",
    authorRole: "Student, InnovateHealth",
    authorImage: "/images/avatar.png",
    slug: "how-integration-drives-success-2"
  },
  {
    id: 3,
    title: "How integration drives success",
    excerpt: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    date: "May 21, 2026",
    image: "/images/blogs/blog3.jpg", // Placeholder
    authorName: "Lora K.",
    authorRole: "Student, InnovateHealth",
    authorImage: "/images/avatar.png",
    slug: "how-integration-drives-success-3"
  },
  {
    id: 4,
    title: "How integration drives success",
    excerpt: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
    date: "May 21, 2026",
    image: "/images/blogs/blog4.jpg", // Placeholder if exists, else hero
    authorName: "Lora K.",
    authorRole: "Student, InnovateHealth",
    authorImage: "/images/avatar.png",
    slug: "how-integration-drives-success-4"
  }
];

const BlogList = React.memo(function BlogList() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.list}>
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              image={post.image}
              authorName={post.authorName}
              authorRole={post.authorRole}
              authorImage={post.authorImage}
              slug={post.slug}
            />
          ))}
        </div>
      </Container>
    </section>
  );
});

BlogList.displayName = "BlogList";

export default BlogList;
