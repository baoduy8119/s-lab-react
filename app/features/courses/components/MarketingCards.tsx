"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./MarketingCards.module.scss";

import PolygonImage from "@/app/components/PolygonImage";

// ... (imports remain)

const MarketingCards = React.memo(function MarketingCards() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    "All",
    "Marketing Foundations",
    "Business Fundamentals",
    "Advanced Marketing",
    "Entrepreneurship",
    "Web3 Technologies"
  ];

  const cards = [
    {
      id: 1,
      title: "Marketing Essentials",
      description: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
      image: "/images/courses/mar-1.png",
      popular: true,
      category: "Marketing Foundations"
    },
    {
      id: 2,
      title: "Business Model & Offer Design",
      description: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
      image: "/images/courses/mar-2.png",
      popular: true,
      category: "Business Fundamentals"
    },
    {
      id: 3,
      title: "Customer & Market Insight",
      description: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
      image: "/images/courses/mar-3.png",
      popular: true,
      category: "Advanced Marketing"
    },
    {
      id: 4,
      title: "Marketing Essentials",
      description: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
      image: "/images/courses/mar-1.png",
      popular: true,
      category: "Entrepreneurship"
    },
    {
      id: 5,
      title: "Business Model & Offer Design",
      description: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
      image: "/images/courses/mar-2.png",
      popular: true,
      category: "Web3 Technologies"
    },
    {
      id: 6,
      title: "Customer & Market Insight",
      description: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
      image: "/images/courses/mar-3.png",
      popular: true,
      category: "Marketing Foundations"
    },
    {
      id: 7,
      title: "Marketing Essentials",
      description: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
      image: "/images/courses/mar-1.png",
      popular: true,
      category: "Business Fundamentals"
    },
    {
      id: 8,
      title: "Business Model & Offer Design",
      description: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
      image: "/images/courses/mar-2.png",
      popular: true,
      category: "Advanced Marketing"
    },
    {
      id: 9,
      title: "Customer & Market Insight",
      description: "Our clients don’t just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.",
      image: "/images/courses/mar-3.png",
      popular: true,
      category: "Entrepreneurship"
    },
  ];

  const filteredCards = activeTab === "All"
    ? cards
    : cards.filter(card => card.category === activeTab);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Filter Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filteredCards.map((card) => (
            <Link key={card.id} href={`/courses/${card.id}`} className={styles.card}>
              <div className={styles.imageContainer}>
                <PolygonImage
                  src={card.image}
                  alt={card.title}
                  width={416}
                  height={240}
                  className={styles.cardImage}
                  topLeftCut={30}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
                <div className={styles.cardFooter}>
                  {card.popular && <span className={styles.badge}>Popular</span>}
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
