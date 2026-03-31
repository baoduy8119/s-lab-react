"use client";

import React, { useState } from "react";
import ArrowRightIcon from "@/app/components/icons/ArrowRightIcon";
import PolygonImage from "@/app/components/PolygonImage";
import { useTheSlabContentStore } from "@/app/features/dashboard/stores/useTheSlabContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";
import styles from "./LimitlessDesire.module.scss";
import Container from "@/app/components/Container";

const LimitlessDesire = React.memo(function LimitlessDesire() {
  const c = useLocalizedContent(
    useTheSlabContentStore((s) => s.content.slabLimitlessDesire)
  );
  const [openItem, setOpenItem] = useState<string>("desire");

  const accordionData = [
    {
      id: "desire",
      title: c.item1Title,
      subtitle: c.item1Subtitle,
      description: c.item1Description,
      images: [
        c.item1Image1,
        c.item1Image2,
        c.item1Image3,
      ],
    },
    {
      id: "mission",
      title: c.item2Title,
      subtitle: c.item2Subtitle,
      description: c.item2Description,
      images: [
        c.item2Image1,
        c.item2Image2,
        c.item2Image3,
      ],
    },
    {
      id: "vision",
      title: c.item3Title,
      subtitle: c.item3Subtitle,
      description: c.item3Description,
      images: [
        c.item3Image1,
        c.item3Image2,
        c.item3Image3,
      ],
    },
  ];

  const handleToggle = (id: string) => {
    setOpenItem(openItem === id ? "" : id);
  };

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title} data-aos="fade-up">{c.sectionTitle}</h2>
        <div className={styles.accordion} data-aos="fade-up" data-aos-delay="200">
          {accordionData.map((item) => {
            const isOpen = openItem === item.id;

            return (
              <div
                key={item.id}
                className={`${styles.accordionItem} ${isOpen ? styles.open : ""}`}
                onClick={() => handleToggle(item.id)}
              >
                <div className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
                  <ArrowRightIcon color="#0F172A" />
                </div>
                <div className={styles.content}>
                  <div className={styles.textContent}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                  </div>

                  <div className={styles.accordionContentWrapper}>
                    <div className={styles.expandedContent}>
                      <h4 className={styles.subtitle}>{item.subtitle}</h4>
                      <p className={styles.description}>{item.description}</p>
                    </div>

                    <div className={styles.images}>
                      {item.images.map((img, index) => (
                        <div key={index} className={styles.imageItem}>
                          <PolygonImage
                            src={img}
                            alt={item.title}
                            width={270}
                            height={197}
                            topLeftCut={25}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
});
LimitlessDesire.displayName = "LimitlessDesire";

export default LimitlessDesire;
