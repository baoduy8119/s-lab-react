"use client";

import React from "react";
import QuoteIcon from "@/app/components/icons/QuoteIcon";
import styles from "./AdvisorsCredentials.module.scss";
import Container from "@/app/components/Container";

const AdvisorsCredentials = React.memo(function AdvisorsCredentials() {
  const credentials = [
    {
      number: "/001/",
      title: "Extensive Business Background.",
      description:
        "Our trainers boast extensive experience in the business realm. They have been at the forefront of various industries, bringing a wealth of knowledge to the classroom.",
    },
    {
      number: "/002/",
      title: "Theoretical Expertise.",
      description:
        "Beyond their practical know-how, our trainers have a solid foundation in business theory, ensuring that they can provide learners with a well-rounded education.",
    },
    {
      number: "/003/",
      title: "Real-World Insights.",
      description:
        "What sets our trainers apart is their ability to translate theory into practice. They use real case studies to mentor and coach learners, helping them apply their knowledge effectively.",
    },
    {
      number: "/004/",
      title: "Mentors and Guides.",
      description:
        "Our trainers don't just deliver lessons; they provide personalized guidance and mentorship. They're here to support learners every step of the way, making sure they understand how to navigate the business landscape.",
    },
    {
      number: "/005/",
      title: "Practical Learning.",
      description:
        "With our trainers, learners don't just gain theoretical knowledge. They acquire practical skills and insights that can be immediately applied in the business world.",
    },
  ];

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.container}>
          <div className={styles.leftContent}>
            <h2 className={styles.title}>/Advisors' Credentials</h2>

            <div className={styles.quoteIcon}>
              <QuoteIcon />
            </div>

            <p className={styles.subtitle}>
              Each phase is handled by specialists who work together seamlessly, ensuring nothing
              falls through the cracks.
            </p>
          </div>

          <div className={styles.timeline}>
            {credentials.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <div
                    className={`${styles.circle} ${index === 0 ? styles.circleActive : ""}`}
                  />
                  {index < credentials.length - 1 && (
                    <div
                      className={`${styles.line} ${index === 0 ? styles.lineActive : ""}`}
                    />
                  )}
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.itemNumber}>{item.number}</div>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
});
AdvisorsCredentials.displayName = "AdvisorsCredentials";

export default AdvisorsCredentials;
