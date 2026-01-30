"use client";

import React, { useState } from "react";
import ArrowRightIcon from "@/app/components/icons/ArrowRightIcon";
import PolygonImage from "@/app/components/PolygonImage";
import styles from "./LimitlessDesire.module.scss";
import Container from "@/app/components/Container";

const LimitlessDesire = React.memo(function LimitlessDesire() {
  const [openItem, setOpenItem] = useState<string>("desire");

  const accordionData = [
    {
      id: "desire",
      title: "/Our Desire",
      subtitle: "We work for the Limitless Desire",
      description:
        "The S-LAB is where theory and practice unite to empower marketers and businessmen in their pursuit of real-world success. We serve as a dynamic platform for hands-on learning, fostering collaboration among students, professionals, businesses, and promoting the harmonious coexistence of education, innovation, practical experience.",
      images: [
        "/images/slab/desire-img-1.png",
        "/images/slab/desire-img-2.png",
        "/images/slab/desire-img-3.png",
      ],
    },
    {
      id: "mission",
      title: "/Our Mission",
      subtitle: "Empowering the Next Generation",
      description:
        "Our mission is to bridge the gap between academic knowledge and real-world application. We provide hands-on training, mentorship, and resources to help individuals and businesses thrive in today's competitive landscape.",
      images: [
        "/images/slab/desire-img-1.png",
        "/images/slab/desire-img-2.png",
        "/images/slab/desire-img-3.png",
      ],
    },
    {
      id: "vision",
      title: "/Our Vision",
      subtitle: "Building a Thriving Community",
      description:
        "We envision a world where learning is accessible, practical, and transformative. Through our programs, we aim to create a community of skilled professionals who drive innovation and growth in their respective fields.",
      images: [
        "/images/slab/desire-img-1.png",
        "/images/slab/desire-img-2.png",
        "/images/slab/desire-img-3.png",
      ],
    },
  ];

  const handleToggle = (id: string) => {
    setOpenItem(openItem === id ? "" : id);
  };

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>/We work for the Limitless Desire. </h2>
        <div className={styles.accordion}>
          {accordionData.map((item) => {
            const isOpen = openItem === item.id;

            return (
              <div
                key={item.id}
                className={`${styles.accordionItem} ${!isOpen ? styles.collapsedItem : ""}`}
                onClick={() => handleToggle(item.id)}
              >
                <div className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
                  <ArrowRightIcon color="#0F172A" />
                </div>
                <div className={styles.content}>
                  <div className={styles.textContent}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    {isOpen && (
                      <div className={styles.expandedContent}>
                        <h4 className={styles.subtitle}>{item.subtitle}</h4>
                        <p className={styles.description}>{item.description}</p>
                      </div>
                    )}
                  </div>
                  {isOpen && (
                    <div className={styles.images}>
                      {item.images.map((img, index) => (
                        <PolygonImage
                          key={index}
                          src={img}
                          alt={item.title}
                          width={270}
                          height={197}
                          topLeftCut={25}
                        />
                      ))}
                    </div>
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
LimitlessDesire.displayName = "LimitlessDesire";

export default LimitlessDesire;
