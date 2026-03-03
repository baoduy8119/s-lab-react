"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./MarketingCards.module.scss";
import { useCoursesContentStore } from "@/app/features/dashboard/stores/useCoursesContentStore";

interface CardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const MarketingCards = React.memo(function MarketingCards() {
  const [activeTab, setActiveTab] = useState("All");
  const cardIds = useCoursesContentStore((s) => s.cardIds);
  const content = useCoursesContentStore((s) => s.content);

  const cards: CardItem[] = useMemo(
    () =>
      cardIds
        .map((id) => {
          const c = content[id];
          if (!c) return null;
          return {
            id,
            title: (c.title as string) ?? "",
            description: (c.description as string) ?? "",
            image: (c.image as string) ?? "",
            category: (c.category as string) ?? "",
          };
        })
        .filter((c): c is CardItem => c !== null),
    [cardIds, content]
  );

  const categories = useMemo(() => {
    const unique = new Set(cards.map((c) => c.category).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [cards]);

  const filteredCards =
    activeTab === "All"
      ? cards
      : cards.filter((card) => card.category === activeTab);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.tabs}>
          {categories.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ""} ${tab === "All" ? styles.tabAll : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredCards.map((card) => (
            <Link key={card.id} href={`/courses/${card.id}`} className={styles.card}>
              <div className={styles.imageContainer}>
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={416}
                    height={240}
                    className={styles.cardImage}
                    unoptimized={card.image.startsWith("data:")}
                  />
                )}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
                <div className={styles.cardFooter}>
                  {card.category && (
                    <span className={styles.badge}>{card.category}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

MarketingCards.displayName = "MarketingCards";

export default MarketingCards;
