"use client";

import React from "react";
import Image from "next/image";
import styles from "./LibrarySystem.module.scss";

const LibrarySystem = React.memo(function LibrarySystem() {
  const categories = [
    {
      id: 1,
      name: "Design and Media",
      image: "/images/slib/design-media.png",
    },
    {
      id: 2,
      name: "Content Writing",
      image: "/images/slib/content-writing.png",
    },
    {
      id: 3,
      name: "Data Analytics",
      image: "/images/slib/data-analytics.png",
    },
    {
      id: 4,
      name: "Marketing Planning",
      image: "/images/slib/marketing-planning-lib.png",
    },
  ];

  /* Order: Far Left -> Left -> Center -> Right -> Far Right */
  const libraryCards = [
    {
      id: 1,
      title: "Data Analytics",
      image: "/images/slib/data-analytics.png",
      positionClass: styles.card1,
    },
    {
      id: 2,
      title: "Content Writing",
      image: "/images/slib/content-writing.png",
      positionClass: styles.card2,
    },
    {
      id: 3,
      title: "Marketing Planning",
      image: "/images/slib/marketing-planning-lib.png",
      positionClass: styles.card3,
    },
    {
      id: 4,
      title: "Design and Media",
      image: "/images/slib/design-media.png",
      positionClass: styles.card4,
    },
    {
      id: 5,
      title: "Logo/Illustration",
      image: "/images/slib/lib-card-5.svg",
      positionClass: styles.card5,
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>/The S-Lab library system.</h2>

      {/* Library Cards Display */}
      <div className={styles.cardsContainer}>
        {libraryCards.map((card) => (
          <div
            key={card.id}
            className={`${styles.card} ${card.positionClass}`}
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className={styles.cardLabel}>
              {card.title.split("/").map((part, index) => (
                <React.Fragment key={index}>
                  {part}
                  {index < card.title.split("/").length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className={styles.viewAllContainer}>
        <button className={styles.viewAllButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Category Tags */}
      <div className={styles.categories}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryTag}>
            <div className={styles.categoryImage}>
              <Image src={category.image} alt={category.name} fill style={{ objectFit: "cover" }} />
            </div>
            <span className={styles.categoryName}>{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
});
LibrarySystem.displayName = "LibrarySystem";

export default LibrarySystem;
