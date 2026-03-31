"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomeWhoSupports.module.scss";
import PolygonImage from "@/app/components/PolygonImage";
import Container from "@/app/components/Container";
import { useHomeContentStore } from "@/app/features/dashboard/stores/useHomeContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";

interface SupportItem {
  id: string;
  title: string;
  profession: string;
  description: string[];
  image: string;
  link: string;
}

const HomeWhoSupports = React.memo(function HomeWhoSupports() {
  const c = useLocalizedContent(useHomeContentStore((s) => s.content.whoSupports));

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
      {
        id: "career-switchers",
        title: c.item5Title,
        profession: c.item5Profession,
        description: c.item5Description.split("\n"),
        image: c.item5Image,
        link: "#",
      },
    ],
    [c]
  );

  const [activeId, setActiveId] = useState<string>(() => items[0]?.id ?? "");

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.mainHeading} data-aos="fade-up">
          {c.heading}
        </h2>

        <div className={styles.topRow}>
          <div className={styles.counterSection}>
            <div className={styles.counterBlock}>
              <span className={styles.counterNumber}>
                {c.counterNumber || "/5+"}<span className={styles.plus}></span>
              </span>
              <span className={styles.counterLabel}>{c.counterLabel || "The S-Lab supports"}</span>
            </div>
            {/* Mobile Barcode Icon */}
            <div className={styles.barcodeIcon}>
              <svg width="41" height="12" viewBox="0 0 41 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H2V12H0V0ZM4 0H5V12H4V0ZM7 0H10V12H7V0ZM12 0H13V12H12V0ZM15 0H17V12H15V0ZM20 0H21V12H20V0ZM23 0H26V12H23V0ZM28 0H29V12H28V0ZM31 0H33V12H31V0ZM36 0H37V12H36V0ZM39 0H41V12H39V0Z" fill="#111827" />
              </svg>
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

        <div className={styles.listSection}>
          <div className={styles.listLabels}>
            <span className={styles.labelCol} style={{ flex: "0 0 30%" }}>
              {c.labelSupport || "Support staff"}
            </span>
            <span className={[styles.labelCol, styles.professionCol].join(" ")} style={{ flex: "0 0 30%" }}>
              {c.labelProfession || "Profession"}
            </span>
            <span className={styles.labelCol} style={{ flex: 1 }}>
              {c.labelDescription || "Description"}
            </span>
          </div>

          {/* Mobile Label */}
          <div className={styles.mobileLabel}>{c.labelSupport || "Support staff"}</div>

          <div className={styles.accordionList} data-aos="fade-up">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id}
                  className={`${styles.accordionItem} ${isActive ? styles.active : ""}`}
                  onMouseEnter={() => setActiveId(item.id)}
                >
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

                  <div className={styles.itemContent}>
                    <div className={styles.colTitle}>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                    </div>

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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
});

HomeWhoSupports.displayName = "HomeWhoSupports";

export default HomeWhoSupports;
