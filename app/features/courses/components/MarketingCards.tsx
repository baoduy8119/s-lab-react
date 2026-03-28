"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./MarketingCards.module.scss";
import { useCoursesContentStore } from "@/app/features/dashboard/stores/useCoursesContentStore";
import { useLocalizedFullContent } from "@/app/hooks/useLocalizedContent";

interface CardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const MarketingCards = React.memo(function MarketingCards() {
  const [activeTab, setActiveTab] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cardIds = useCoursesContentStore((s) => s.cardIds);
  const content = useLocalizedFullContent(useCoursesContentStore((s) => s.content));

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

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsDropdownOpen(false);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Desktop Tabs */}
        <div className={styles.tabs}>
          {categories.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ""} ${tab === "All" ? styles.tabAll : ""}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className={styles.mobileDropdownContainer}>
          <button className={styles.dropdownButton} onClick={toggleDropdown}>
            <span>{activeTab}</span>
            <svg
              className={`${styles.chevron} ${isDropdownOpen ? styles.rotated : ""}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {categories.map((tab) => (
                <button
                  key={tab}
                  className={`${styles.dropdownItem} ${activeTab === tab ? styles.dropdownActive : ""}`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
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
                  <span className={styles.badge}>Popular</span>
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
