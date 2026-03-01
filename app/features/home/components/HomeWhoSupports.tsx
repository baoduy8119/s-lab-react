"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomeWhoSupports.module.scss";
import PolygonImage from "@/app/components/PolygonImage";
import Container from "@/app/components/Container";
import { useHomeContentStore } from "@/app/features/dashboard/stores/useHomeContentStore";

interface SupportItem {
  id: string;
  title: string;
  profession: string;
  description: string[];
  image: string;
  link: string;
}

const HomeWhoSupports = React.memo(function HomeWhoSupports() {
  const [activeId, setActiveId] = useState<string>("");
  const c = useHomeContentStore((s) => s.content.whoSupports);

  const items: SupportItem[] = useMemo(
    () => [
      {
        id: "students",
        title: c.item1Title,
        profession: c.item1Profession,
        description: c.item1Description.split("\n"),
        image: c.item1Image,
        link: "#",
      },
      {
        id: "early-career",
        title: c.item2Title,
        profession: c.item2Profession,
        description: c.item2Description.split("\n"),
        image: c.item2Image,
        link: "#",
      },
      {
        id: "professionals",
        title: c.item3Title,
        profession: c.item3Profession,
        description: c.item3Description.split("\n"),
        image: c.item3Image,
        link: "#",
      },
      {
        id: "teams",
        title: c.item4Title,
        profession: c.item4Profession,
        description: c.item4Description.split("\n"),
        image: c.item4Image,
        link: "#",
      },
    ],
    [c]
  );

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.mainHeading} data-aos="fade-up">
          {c.heading}
        </h2>
        <div className={styles.headerGrid}>
          <div className={styles.headerLeft}>
            <div className={styles.counterBlock}>
              <span className={styles.counterNumber}>
                /04<sup className={styles.plus}>+</sup>
              </span>
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
              data-aos="fade-left"
              data-aos-duration="1000"
            />
          </div>
        </div>

        <div className={styles.listLabels}>
          <span className={styles.labelCol} style={{ flex: "0 0 30%" }}>
            Support staff
          </span>
          <span className={styles.labelCol} style={{ flex: "0 0 30%" }}>
            Profession
          </span>
          <span className={styles.labelCol} style={{ flex: 1 }}>
            Description
          </span>
        </div>

        <div className={styles.accordionList} data-aos="fade-up">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.accordionItem} ${isActive ? styles.active : ""}`}
                onMouseEnter={() => setActiveId(item.id)}
              >
                {isActive && (
                  <div className={styles.itemBg}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={styles.bgImage}
                      unoptimized={item.image.startsWith("data:")}
                    />
                    <div className={styles.bgOverlay}></div>
                  </div>
                )}

                <div className={styles.itemContent}>
                  <div className={styles.colTitle}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                  </div>

                  {isActive && (
                    <>
                      <div className={styles.colProfession}>
                        <p className={styles.professionText}>
                          {item.profession}
                        </p>
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
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 17L17 7M17 7H7M17 7V17"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
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
