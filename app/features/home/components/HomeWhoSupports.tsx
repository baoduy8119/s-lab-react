"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomeWhoSupports.module.scss";
import PolygonImage from "@/app/components/PolygonImage";
import Container from "@/app/components/Container";

interface SupportItem {
  id: string;
  title: string;
  profession: string;
  description: string[];
  image: string; // Background image for expanded state
  link: string;
}

const items: SupportItem[] = [
  {
    id: "students",
    title: "/Students",
    profession: "High School & University",
    description: [
      "Build strong foundations and a portfolio you can show.",
      "Guided learning path + clear track selection",
      "Project-based assignments with mentor feedback"
    ],
    image: "/images/hero-image-76f7dd.png", // Placeholder, ideally specific student bg
    link: "#"
  },
  {
    id: "early-career",
    title: "/Early-Career",
    profession: "Junior & Mid-level",
    description: [
      "Accelerate your career growth with practical skills.",
      "Real-world case studies + industry mentorship",
      "Networking opportunities with peers and experts"
    ],
    image: "/images/hero-image-76f7dd.png",
    link: "#"
  },
  {
    id: "professionals",
    title: "/Professionals",
    profession: "Senior & Executives",
    description: [
      "Deepen your expertise and stay ahead of trends.",
      "Advanced workshops + strategic frameworks",
      "Peer-to-peer learning in executive cohorts"
    ],
    image: "/images/hero-image-76f7dd.png",
    link: "#"
  },
  {
    id: "teams",
    title: "/Teams & Companies",
    profession: "Corporate Training",
    description: [
      "Upskill your entire team with customized programs.",
      "Tailored curriculum + progress tracking",
      "Scalable learning solutions for organizations"
    ],
    image: "/images/hero-image-76f7dd.png",
    link: "#"
  }
];

const HomeWhoSupports = React.memo(function HomeWhoSupports() {
  const [activeId, setActiveId] = useState<string>("students");

  return (
    <section className={styles.section}>
      <Container>
        {/* Header Layout */}
        <h2 className={styles.mainHeading}>Who The Slab Supports</h2>
        <div className={styles.headerGrid}>
          <div className={styles.headerLeft}>
            <div className={styles.counterBlock}>
              <span className={styles.counterNumber}>/04<sup className={styles.plus}>+</sup></span>
              <span className={styles.counterLabel}>The S-Lab supports</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <PolygonImage
              src="/images/hero-image-76f7dd1.jpg"
              alt="Students working together"
              topLeftCut={40}
              width={800}
              height={500}
              className={styles.headerImage}
            />
          </div>
        </div>

        {/* List Header Labels */}
        <div className={styles.listLabels}>
          <span className={styles.labelCol} style={{ flex: '0 0 30%' }}>Support staff</span>
          <span className={styles.labelCol} style={{ flex: '0 0 30%' }}>Profession</span>
          <span className={styles.labelCol} style={{ flex: 1 }}>Description</span>
        </div>

        {/* Accordion List */}
        <div className={styles.accordionList}>
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.accordionItem} ${isActive ? styles.active : ''}`}
                onClick={() => setActiveId(item.id)}
              >
                {/* Background Image for Active State */}
                {isActive && (
                  <div className={styles.itemBg}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={styles.bgImage}
                    />
                    <div className={styles.bgOverlay}></div>
                  </div>
                )}

                <div className={styles.itemContent}>
                  {/* Title Column */}
                  <div className={styles.colTitle}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                  </div>

                  {/* Profession Column (Only visible if active or specific design?) 
                      Screenshot shows Collapsed items having JUST title.
                      Expanded item shows All 3 columns.
                  */}

                  {isActive && (
                    <>
                      <div className={styles.colProfession}>
                        <p className={styles.professionText}>{item.profession}</p>
                      </div>

                      <div className={styles.colDescription}>
                        <ul className={styles.descList}>
                          {item.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.colAction}>
                        <Link href={item.link} className={styles.arrowBtn}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
});

HomeWhoSupports.displayName = "HomeWhoSupports";

export default HomeWhoSupports;
