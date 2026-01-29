"use client";

import Image from "next/image";
import React from "react";
import styles from "./KeyActivities.module.scss";

const KeyActivities = React.memo(function KeyActivities() {
  const activities = [
    {
      number: "/001/",
      title: "Business and Marketing Courses:",
      description:
        "Explore our comprehensive courses designed to enhance your business and marketing skills, led by industry experts.",
    },
    {
      number: "/002/",
      title: "Valuable Events",
      description:
        "Join our exclusive events tailored to businessmen, offering networking opportunities, knowledge sharing, and insights.",
      highlighted: true,
    },
    {
      number: "/003/",
      title: "Insightful Market Content",
      description:
        "Stay updated with our informative content, providing valuable market insights and new trends.",
    },
    {
      number: "/004/",
      title: "Web 3 Industry Community",
      description:
        "Be a part of our thriving community dedicated to building and advancing the web 3 industry in Central Vietnam.",
    },
  ];

  return (
    <section className={styles.section}>
      {/* Background Image with Content */}
      <div className={styles.backgroundWrapper}>
        <div className={styles.background}>
          <Image
            src="/images/slab/key-activities-bg.png"
            alt="Key Activities Background"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Our Key Activities</h2>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.playButton}>Join us now</button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={styles.cards}>
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`${styles.card}`}
          >
            <h3 className={styles.cardTitle}>{activity.title}</h3>
            <p className={styles.cardDescription}>{activity.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
});
KeyActivities.displayName = "KeyActivities";

export default KeyActivities;
